import { load, type Cheerio, type CheerioAPI } from 'cheerio';
import type { AnyNode } from 'domhandler';
import { writeFile } from 'node:fs/promises';
import { MATCHES, getMatchResultKey } from '../src/lib/data/matches.js';
import existingResultsData from '../src/lib/data/match-results.json';
import { NATIONS, type NationId } from '../src/lib/data/nations.js';
import { STADIUMS } from '../src/lib/data/stadiums.js';
import type {
	Match,
	MatchResult,
	MatchResultEntry,
	MatchResultsMap,
	TeamMatchStats
} from '../src/lib/types/index.js';
import { fromLocal } from '../src/lib/utils/date.js';

const DEFAULT_SOURCE_URLS = [
	'https://fr.wikipedia.org/wiki/Coupe_du_monde_de_football_2026',
	...Array.from(
		{ length: 12 },
		(_, index) =>
			`https://fr.wikipedia.org/wiki/Groupe_${String.fromCharCode(65 + index)}_de_la_Coupe_du_monde_de_football_2026`
	)
];

const USER_AGENT = 'CDM-2026 result updater (https://cdm-2026.pages.dev)';

interface ParsedWikipediaResult {
	sourceUrl: string;
	homeNationId: NationId;
	awayNationId: NationId;
	homeScore: number;
	awayScore: number;
	homePenalties?: number;
	awayPenalties?: number;
	homeStats?: Partial<TeamMatchStats>;
	awayStats?: Partial<TeamMatchStats>;
}

interface CandidateMatch {
	match: Match;
	key: string;
	homeNationId: NationId;
	awayNationId: NationId;
	storedResult?: MatchResultEntry;
}

export interface UpdateMatchResultsOptions {
	dryRun?: boolean;
	force?: boolean;
	now?: Date;
	existingResults?: MatchResultsMap;
	sourceUrls?: string[];
	fetchHtml?: (url: string) => Promise<string>;
	writeResults?: (content: string) => Promise<void>;
}

export interface UpdateMatchResultsSummary {
	parsedCount: number;
	updated: Array<{ key: string; label: string; sourceUrl: string }>;
	missing: Array<{ key: string; label: string }>;
	ambiguous: Array<{ key: string; label: string; matches: number }>;
	unchanged: boolean;
	dryRun: boolean;
}

interface CliArgs {
	dryRun: boolean;
	force: boolean;
	help: boolean;
	now?: Date;
	sourceUrls: string[];
}

function normalizeText(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/&nbsp;/g, ' ')
		.replace(/[’'`]/g, ' ')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');
}

const nationAliases: Partial<Record<NationId, string[]>> = {
	USA: ['usa', 'etats unis', 'etats-unis'],
	RDC: ['rd congo', 'rdc', 'republique democratique du congo', 'congo rd'],
	COREE_DU_SUD: ['coree du sud', 'republique de coree'],
	COTE_IVOIRE: ['cote d ivoire', 'cote ivoire'],
	BOSNIE: ['bosnie', 'bosnie herzégovine', 'bosnie herzegovine'],
	PAYS_BAS: ['pays bas', 'hollande'],
	NEW_ZEALAND: ['nouvelle zelande'],
	ARABIE_SAOUDITE: ['arabie saoudite'],
	CAP_VERT: ['cap vert', 'iles du cap vert'],
	TCHEQUIE: ['tchequie', 'republique tcheque']
};

function buildNationLookup(): Map<string, NationId> {
	const lookup = new Map<string, NationId>();

	for (const [nationId, nation] of Object.entries(NATIONS) as [
		NationId,
		(typeof NATIONS)[NationId]
	][]) {
		lookup.set(normalizeText(nation.name), nationId);

		for (const alias of nationAliases[nationId] ?? []) {
			lookup.set(normalizeText(alias), nationId);
		}
	}

	return lookup;
}

const nationLookup = buildNationLookup();

function resolveNation(text: string): NationId | null {
	const normalized = normalizeText(text.replace(/\[[^\]]+\]/g, ''));

	if (!normalized) {
		return null;
	}

	const directMatch = nationLookup.get(normalized);

	if (directMatch) {
		return directMatch;
	}

	for (const [name, nationId] of nationLookup) {
		if (normalized.includes(name)) {
			return nationId;
		}
	}

	return null;
}

function cleanCellText(value: string): string {
	return value
		.replace(/\[[^\]]+\]/g, '')
		.replace(/\s+/g, ' ')
		.replace(/\u00a0/g, ' ')
		.trim();
}

function parseScore(value: string): {
	homeScore: number;
	awayScore: number;
	homePenalties?: number;
	awayPenalties?: number;
} | null {
	const scoreMatch = value.match(
		/^\s*(\d)\s*[-–−—]\s*(\d)(?:\s*a\.?\s*p\.?)?(?:\s*\(\s*\d\s*[-–−—]\s*\d\s*(?:t\.?\s*a\.?\s*b\.?|tab|pen|pén)\.?\s*\))?\s*$/i
	);

	if (!scoreMatch) {
		return null;
	}

	const penaltiesMatch = value.match(
		/\((\d)\s*[-–−—]\s*(\d)\s*(?:t\.?\s*a\.?\s*b\.?|tab|pen|pén)\.?\)/i
	);

	return {
		homeScore: Number(scoreMatch[1]),
		awayScore: Number(scoreMatch[2]),
		homePenalties: penaltiesMatch ? Number(penaltiesMatch[1]) : undefined,
		awayPenalties: penaltiesMatch ? Number(penaltiesMatch[2]) : undefined
	};
}

function parseResultFromCells(
	cells: string[],
	sourceUrl: string,
	cardStats: Map<NationId, Partial<TeamMatchStats>>
): ParsedWikipediaResult | null {
	const scoreIndex = cells.findIndex((cell) => parseScore(cell));

	if (scoreIndex < 1 || scoreIndex >= cells.length - 1) {
		return null;
	}

	const score = parseScore(cells[scoreIndex]);
	const homeNationId = resolveNation(cells[scoreIndex - 1]);
	const awayNationId = resolveNation(cells[scoreIndex + 1]);

	if (!score || !homeNationId || !awayNationId || homeNationId === awayNationId) {
		return null;
	}

	return {
		sourceUrl,
		homeNationId,
		awayNationId,
		homeStats: cardStats.get(homeNationId),
		awayStats: cardStats.get(awayNationId),
		...score
	};
}

function countCardsInTable(
	$: CheerioAPI,
	$table: Cheerio<AnyNode>,
	color: 'yellow' | 'red'
): number {
	const pattern = color === 'yellow' ? /(carton jaune|yellow card)/i : /(carton rouge|red card)/i;
	let count = 0;

	$table.find('img, a, span').each((_, element) => {
		const $element = $(element);
		const haystack = [
			$element.attr('alt'),
			$element.attr('title'),
			$element.attr('href'),
			$element.attr('src'),
			$element.attr('data-mw')
		]
			.filter(Boolean)
			.join(' ');

		if (pattern.test(haystack)) {
			count += 1;
		}
	});

	return count;
}

function parseCardStats(html: string): Map<NationId, Partial<TeamMatchStats>> {
	const $ = load(html);
	const stats = new Map<NationId, Partial<TeamMatchStats>>();

	$('table').each((_, table) => {
		const $table = $(table);
		const firstCell = cleanCellText($table.find('tr').first().children('th, td').first().text());
		const nationId = resolveNation(firstCell.replace(/:$/, ''));

		if (!nationId) {
			return;
		}

		stats.set(nationId, {
			yellowCards: countCardsInTable($, $table, 'yellow'),
			redCards: countCardsInTable($, $table, 'red')
		});
	});

	return stats.size === 2 ? stats : new Map();
}

export function parseWikipediaResults(html: string, sourceUrl: string): ParsedWikipediaResult[] {
	const $ = load(html);
	const cardStats = parseCardStats(html);
	const results: ParsedWikipediaResult[] = [];
	const seenKeys = new Set<string>();

	$('table tr').each((_, row) => {
		const cells = $(row)
			.children('th, td')
			.map((__, cell) => cleanCellText($(cell).text()))
			.get()
			.filter(Boolean);
		const result = parseResultFromCells(cells, sourceUrl, cardStats);

		if (!result) {
			return;
		}

		const key = [
			result.sourceUrl,
			result.homeNationId,
			result.awayNationId,
			result.homeScore,
			result.awayScore,
			result.homePenalties ?? '',
			result.awayPenalties ?? ''
		].join('|');

		if (!seenKeys.has(key)) {
			seenKeys.add(key);
			results.push(result);
		}
	});

	return results;
}

function getMatchNationId(match: Match, sideIndex: 0 | 1): NationId | null {
	return match.sides[sideIndex].nationId ?? null;
}

function isMatchPassed(match: Match, now: Date): boolean {
	return (
		fromLocal(match.localDate, STADIUMS[match.stadiumId].timezone).epochMilliseconds < now.getTime()
	);
}

function getCandidateMatches(
	matches: Match[],
	now: Date,
	force: boolean,
	existingResults: MatchResultsMap
): CandidateMatch[] {
	return matches.flatMap((match) => {
		const homeNationId = getMatchNationId(match, 0);
		const awayNationId = getMatchNationId(match, 1);
		const storedResult = existingResults[getMatchResultKey(match)];
		const hasMissingStoredStats = storedResult?.sides.some((side) => !side.stats);

		if (
			!homeNationId ||
			!awayNationId ||
			!isMatchPassed(match, now) ||
			(!force && storedResult && !hasMissingStoredStats)
		) {
			return [];
		}

		return [
			{
				match,
				key: getMatchResultKey(match),
				homeNationId,
				awayNationId,
				storedResult
			}
		];
	});
}

function buildResultEntry(
	candidate: CandidateMatch,
	parsed: ParsedWikipediaResult
): MatchResultEntry {
	const sameOrder =
		candidate.homeNationId === parsed.homeNationId &&
		candidate.awayNationId === parsed.awayNationId;
	const scores = sameOrder
		? [parsed.homeScore, parsed.awayScore]
		: [parsed.awayScore, parsed.homeScore];
	const stats = sameOrder
		? [parsed.homeStats, parsed.awayStats]
		: [parsed.awayStats, parsed.homeStats];
	const penalties =
		parsed.homePenalties === undefined || parsed.awayPenalties === undefined
			? undefined
			: sameOrder
				? [parsed.homePenalties, parsed.awayPenalties]
				: [parsed.awayPenalties, parsed.homePenalties];
	const result: MatchResult = penalties
		? {
				resolution: 'penalties',
				winner: penalties[0] > penalties[1] ? 1 : 2
			}
		: {
				resolution: 'regular',
				winner: scores[0] === scores[1] ? undefined : scores[0] > scores[1] ? 1 : 2
			};

	return {
		result,
		sides: [
			{
				score: {
					regularTime: scores[0],
					...(penalties ? { penalties: penalties[0] } : {})
				},
				...(stats[0] ? { stats: stats[0] } : {})
			},
			{
				score: {
					regularTime: scores[1],
					...(penalties ? { penalties: penalties[1] } : {})
				},
				...(stats[1] ? { stats: stats[1] } : {})
			}
		]
	};
}

function hasParsedStats(result: ParsedWikipediaResult): boolean {
	return Boolean(result.homeStats || result.awayStats);
}

function getComparableResultKey(candidate: CandidateMatch, result: ParsedWikipediaResult): string {
	const entry = buildResultEntry(candidate, result);

	return JSON.stringify({
		result: entry.result,
		sides: entry.sides.map((side) => ({ score: side.score }))
	});
}

function getWikipediaTitlePart(value: string): string {
	return value.trim().replace(/\s+/g, '_');
}

function getWikipediaMatchTemplateUrl(match: Match): string | null {
	const homeNationId = getMatchNationId(match, 0);
	const awayNationId = getMatchNationId(match, 1);

	if (!match.group || !homeNationId || !awayNationId) {
		return null;
	}

	const title = `Modèle:Groupe ${match.group} de la Coupe du monde de football 2026/${NATIONS[homeNationId].name} - ${NATIONS[awayNationId].name}`;

	return `https://fr.wikipedia.org/wiki/${encodeURI(getWikipediaTitlePart(title))}`;
}

function matchesParsedResult(candidate: CandidateMatch, parsed: ParsedWikipediaResult): boolean {
	return (
		(candidate.homeNationId === parsed.homeNationId &&
			candidate.awayNationId === parsed.awayNationId) ||
		(candidate.homeNationId === parsed.awayNationId &&
			candidate.awayNationId === parsed.homeNationId)
	);
}

function getMatchLabel(match: Match): string {
	return match.sides
		.map((side) => (side.nationId ? NATIONS[side.nationId].name : side.label))
		.join(' - ');
}

function sortResultsByMatchOrder(results: MatchResultsMap): MatchResultsMap {
	const sortedEntries = MATCHES.map((match) => getMatchResultKey(match))
		.filter((key) => results[key])
		.map((key) => [key, results[key]] as const);
	const knownKeys = new Set<string>(sortedEntries.map(([key]) => key));
	const extraEntries = Object.entries(results)
		.filter(([key]) => !knownKeys.has(key))
		.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

	return Object.fromEntries([...sortedEntries, ...extraEntries]) as MatchResultsMap;
}

function toMatchResultsMap(value: unknown): MatchResultsMap {
	return value as MatchResultsMap;
}

async function defaultFetchHtml(url: string): Promise<string> {
	const response = await fetch(url, {
		headers: {
			'User-Agent': USER_AGENT
		}
	});

	if (!response.ok) {
		throw new Error(`Impossible de récupérer ${url}: ${response.status} ${response.statusText}`);
	}

	return response.text();
}

async function defaultWriteResults(content: string): Promise<void> {
	await writeFile(new URL('../src/lib/data/match-results.json', import.meta.url), content);
}

export async function updateMatchResults({
	dryRun = false,
	force = false,
	now = new Date(),
	existingResults = toMatchResultsMap(existingResultsData),
	sourceUrls = DEFAULT_SOURCE_URLS,
	fetchHtml = defaultFetchHtml,
	writeResults = defaultWriteResults
}: UpdateMatchResultsOptions = {}): Promise<UpdateMatchResultsSummary> {
	const candidates = getCandidateMatches(MATCHES, now, force, existingResults);
	const resolvedSourceUrls =
		sourceUrls === DEFAULT_SOURCE_URLS
			? [
					...sourceUrls,
					...candidates
						.map(({ match }) => getWikipediaMatchTemplateUrl(match))
						.filter((url): url is string => Boolean(url))
				]
			: sourceUrls;
	const parsedResults = (
		await Promise.all(
			resolvedSourceUrls.map(async (sourceUrl) => {
				try {
					return parseWikipediaResults(await fetchHtml(sourceUrl), sourceUrl);
				} catch (error) {
					console.warn(
						`Source Wikipédia ignorée: ${sourceUrl} (${error instanceof Error ? error.message : String(error)})`
					);

					return [];
				}
			})
		)
	).flat();
	const nextResults = { ...existingResults };
	const updated: UpdateMatchResultsSummary['updated'] = [];
	const missing: UpdateMatchResultsSummary['missing'] = [];
	const ambiguous: UpdateMatchResultsSummary['ambiguous'] = [];

	for (const candidate of candidates) {
		const matchingResults = parsedResults.filter((result) =>
			matchesParsedResult(candidate, result)
		);
		const uniqueResultsByScore = new Map<string, ParsedWikipediaResult>();

		for (const result of matchingResults) {
			const comparableKey = getComparableResultKey(candidate, result);
			const existingResult = uniqueResultsByScore.get(comparableKey);

			if (!existingResult || (!hasParsedStats(existingResult) && hasParsedStats(result))) {
				uniqueResultsByScore.set(comparableKey, result);
			}
		}

		const uniqueResults = Array.from(uniqueResultsByScore.values());
		const label = getMatchLabel(candidate.match);

		if (uniqueResults.length === 0) {
			missing.push({ key: candidate.key, label });
			continue;
		}

		if (uniqueResults.length > 1) {
			ambiguous.push({ key: candidate.key, label, matches: uniqueResults.length });
			continue;
		}

		const parsedResult = uniqueResults[0];
		if (candidate.storedResult && !force && !hasParsedStats(parsedResult)) {
			continue;
		}
		nextResults[candidate.key] = buildResultEntry(candidate, parsedResult);
		updated.push({ key: candidate.key, label, sourceUrl: parsedResult.sourceUrl });
	}

	const sortedResults = sortResultsByMatchOrder(nextResults);
	const content = `${JSON.stringify(sortedResults, null, '\t')}\n`;
	const previousContent = `${JSON.stringify(sortResultsByMatchOrder(existingResults), null, '\t')}\n`;
	const unchanged = content === previousContent;

	if (!dryRun && !unchanged) {
		await writeResults(content);
	}

	return {
		parsedCount: parsedResults.length,
		updated,
		missing,
		ambiguous,
		unchanged,
		dryRun
	};
}

function parseCliArgs(args: string[]): CliArgs {
	const parsed: CliArgs = {
		dryRun: false,
		force: false,
		help: false,
		sourceUrls: []
	};

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];

		if (arg === '--dry-run') {
			parsed.dryRun = true;
		} else if (arg === '--force') {
			parsed.force = true;
		} else if (arg === '--help' || arg === '-h') {
			parsed.help = true;
		} else if (arg === '--now') {
			const value = args[index + 1];

			if (!value) {
				throw new Error('Option --now: valeur ISO manquante');
			}

			parsed.now = new Date(value);
			index += 1;
		} else if (arg === '--url') {
			const value = args[index + 1];

			if (!value) {
				throw new Error('Option --url: URL manquante');
			}

			parsed.sourceUrls.push(value);
			index += 1;
		} else {
			throw new Error(`Option inconnue: ${arg}`);
		}
	}

	if (parsed.now && Number.isNaN(parsed.now.getTime())) {
		throw new Error('Option --now: date invalide');
	}

	return parsed;
}

function printHelp(): void {
	console.info(`Usage: bun run results:update [-- --dry-run] [-- --force] [-- --now ISO] [-- --url URL]

Options:
  --dry-run  Affiche le résumé sans écrire match-results.json
  --force    Autorise la mise à jour de matchs qui ont déjà un résultat
  --now ISO  Date de référence pour filtrer les matchs passés
  --url URL  Source Wikipédia HTML à utiliser, répétable`);
}

function printSummary(summary: UpdateMatchResultsSummary): void {
	console.info(`Scores Wikipédia détectés avant filtre: ${summary.parsedCount}`);
	console.info(
		`Nouveaux résultats ${summary.dryRun ? 'à écrire' : 'écrits'}: ${summary.updated.length}`
	);

	for (const update of summary.updated) {
		console.info(`- ${update.key}: ${update.label} (${update.sourceUrl})`);
	}

	if (summary.ambiguous.length > 0) {
		console.warn(`Matchs ambigus ignorés: ${summary.ambiguous.length}`);
		for (const item of summary.ambiguous) {
			console.warn(`- ${item.key}: ${item.label} (${item.matches} résultats possibles)`);
		}
	}

	if (summary.missing.length > 0) {
		console.info(`Matchs passés sans score trouvé: ${summary.missing.length}`);
		for (const item of summary.missing) {
			console.info(`- ${item.key}: ${item.label}`);
		}
	}

	if (summary.unchanged) {
		console.info('Aucun changement à écrire.');
	}
}

if (import.meta.main) {
	try {
		const args = parseCliArgs(process.argv.slice(2));

		if (args.help) {
			printHelp();
			process.exit(0);
		}

		const summary = await updateMatchResults({
			dryRun: args.dryRun,
			force: args.force,
			now: args.now,
			sourceUrls: args.sourceUrls.length > 0 ? args.sourceUrls : undefined
		});
		printSummary(summary);
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	}
}
