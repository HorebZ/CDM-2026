import { applyFilters, type FiltersState } from '$lib/components/matches/match-filters.svelte.js';
import {
	MATCHES,
	compareMatchesByKickoff,
	getMatchKickoffEpochMilliseconds
} from '$lib/data/matches.js';
import { NATIONS, type NationId } from '$lib/data/nations.js';
import type { Match, Nation } from '$lib/types/index.js';

const EMPTY_FILTERS_STATE: FiltersState = {
	query: '',
	selectedNationId: null,
	selectedNationName: null,
	selectedNationCode: null,
	selectedGroup: null,
	selectedFinalStage: null
};

const nationEntries = Object.entries(NATIONS) as [NationId, Nation][];
const nationsByCode = new Map(
	nationEntries.map(([nationId, nation]) => [nation.code, { nationId, nation }])
);

export interface TvFollowMatches {
	recent: Match[];
	upcoming: Match[];
}

export const TV_COUNTRY_ROUTE_ENTRIES = nationEntries.map(([, nation]) => ({
	nationCode: nation.code
}));

export function resolveTvNationByCode(
	nationCode: string
): { nationId: NationId; nation: Nation } | null {
	return nationsByCode.get(nationCode.trim().toLowerCase()) ?? null;
}

export function getTvCountryMatches({
	nationId,
	nation
}: {
	nationId: NationId;
	nation: Nation;
}): Match[] {
	const filters: FiltersState = {
		...EMPTY_FILTERS_STATE,
		selectedNationId: nationId,
		selectedNationName: nation.name,
		selectedNationCode: nation.code
	};

	return applyFilters({ matches: MATCHES, filters });
}

function getTvMatchKey(match: Match): string {
	return `${match.stadiumId}-${match.localDate}`;
}

function isExcludedMatch(match: Match, excludedMatchKeys: Set<string>): boolean {
	return excludedMatchKeys.has(getTvMatchKey(match));
}

function isCompletedMatch(match: Match, nowEpochMilliseconds: number): boolean {
	return (
		getMatchKickoffEpochMilliseconds(match) <= nowEpochMilliseconds && match.result !== undefined
	);
}

export function getTvFollowMatches({
	matches = MATCHES,
	excludedMatches,
	now = new Date(),
	limit = 3
}: {
	matches?: Match[];
	excludedMatches: Match[];
	now?: Date;
	limit?: number;
}): TvFollowMatches {
	if (limit <= 0) {
		return { recent: [], upcoming: [] };
	}

	const excludedMatchKeys = new Set(excludedMatches.map(getTvMatchKey));
	const nowEpochMilliseconds = now.getTime();
	const otherMatches = matches.filter((match) => !isExcludedMatch(match, excludedMatchKeys));

	const recent = otherMatches
		.filter((match) => isCompletedMatch(match, nowEpochMilliseconds))
		.sort((matchA, matchB) => compareMatchesByKickoff(matchB, matchA))
		.slice(0, limit);

	const upcoming = otherMatches
		.filter((match) => getMatchKickoffEpochMilliseconds(match) > nowEpochMilliseconds)
		.sort(compareMatchesByKickoff)
		.slice(0, limit);

	return { recent, upcoming };
}
