import { applyFilters, type FiltersState } from '$lib/components/matches/match-filters.svelte.js';
import { MATCHES } from '$lib/data/matches.js';
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
