import { applyFilters, type FiltersState } from '$lib/components/matches/match-filters.svelte.js';
import { MATCHES } from '$lib/data/matches.js';
import { NATIONS, type NationId } from '$lib/data/nations.js';
import { STADIUMS } from '$lib/data/stadiums.js';
import type { Match, Nation } from '$lib/types/index.js';
import { fromLocal } from './date.js';

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

export interface TvCompetitionDay {
	date: string;
	matches: Match[];
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

function getMatchInstant(match: Match) {
	return fromLocal(match.localDate, STADIUMS[match.stadiumId].timezone).toInstant();
}

function compareMatchesByKickoff(matchA: Match, matchB: Match): number {
	const instantComparison =
		getMatchInstant(matchA).epochMilliseconds - getMatchInstant(matchB).epochMilliseconds;

	if (instantComparison !== 0) {
		return instantComparison;
	}

	return getTvMatchKey(matchA).localeCompare(getTvMatchKey(matchB));
}

export function getUpcomingTvCompetitionDays({
	matches = MATCHES,
	excludedMatches,
	now = new Date(),
	limit = 2
}: {
	matches?: Match[];
	excludedMatches: Match[];
	now?: Date;
	limit?: number;
}): TvCompetitionDay[] {
	if (limit <= 0) {
		return [];
	}

	const excludedMatchKeys = new Set(excludedMatches.map(getTvMatchKey));
	const nowEpochMilliseconds = now.getTime();
	const matchesByDay = new Map<string, Match[]>();

	for (const match of matches
		.filter(
			(match) =>
				!excludedMatchKeys.has(getTvMatchKey(match)) &&
				getMatchInstant(match).epochMilliseconds > nowEpochMilliseconds
		)
		.sort(compareMatchesByKickoff)) {
		const date = match.localDate.slice(0, 10);
		const dayMatches = matchesByDay.get(date);

		if (dayMatches) {
			dayMatches.push(match);
		} else {
			matchesByDay.set(date, [match]);
		}
	}

	return Array.from(matchesByDay, ([date, dayMatches]) => ({
		date,
		matches: dayMatches
	})).slice(0, limit);
}
