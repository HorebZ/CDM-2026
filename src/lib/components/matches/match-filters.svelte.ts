import { NATIONS } from '$lib/data/nations.js';
import type { GroupId, Match, MatchPhase } from '$lib/types/index.js';
import { SvelteURLSearchParams } from 'svelte/reactivity';

export const FINAL_STAGE_FILTERS = [
	{ id: '16e', label: '16e' },
	{ id: '8e', label: '8e' },
	{ id: '1/4', label: '1/4' },
	{ id: 'PF', label: 'Phase finale' }
] as const;

export type FinalStageFilterId = (typeof FINAL_STAGE_FILTERS)[number]['id'];

const FINAL_STAGE_PHASES: Record<FinalStageFilterId, ReadonlyArray<MatchPhase>> = {
	'16e': ['round-of-32'],
	'8e': ['round-of-16'],
	'1/4': ['quarter'],
	PF: ['semi', 'small-final', 'final']
};

const STAGE_TO_PARAM: Record<FinalStageFilterId, string> = {
	'16e': 'r32',
	'8e': 'r16',
	'1/4': 'qf',
	PF: 'final'
};

const PARAM_TO_STAGE: Record<string, FinalStageFilterId> = Object.fromEntries(
	Object.entries(STAGE_TO_PARAM).map(([id, param]) => [param, id as FinalStageFilterId])
);

const VALID_GROUPS: ReadonlySet<GroupId> = new Set<GroupId>([
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L'
]);

export interface FiltersState {
	query: string;
	selectedNationId: string | null;
	selectedNationName: string | null;
	selectedNationCode: string | null;
	selectedGroup: GroupId | null;
	selectedFinalStage: FinalStageFilterId | null;
}

const INITIAL_STATE: FiltersState = {
	query: '',
	selectedNationId: null,
	selectedNationName: null,
	selectedNationCode: null,
	selectedGroup: null,
	selectedFinalStage: null
};

export const filters: FiltersState = $state({ ...INITIAL_STATE });

export function resetFilters(): void {
	Object.assign(filters, INITIAL_STATE);
}

export function selectNation({ id, name, code }: { id: string; name: string; code: string }): void {
	filters.selectedNationId = id;
	filters.selectedNationName = name;
	filters.selectedNationCode = code;
	filters.query = '';
}

export function clearNation(): void {
	filters.selectedNationId = null;
	filters.selectedNationName = null;
	filters.selectedNationCode = null;
	filters.query = '';
}

export function toggleGroup({ group }: { group: GroupId }): void {
	filters.selectedFinalStage = null;
	filters.selectedGroup = filters.selectedGroup === group ? null : group;
}

export function toggleFinalStage({ filterId }: { filterId: FinalStageFilterId }): void {
	filters.selectedGroup = null;
	filters.selectedFinalStage = filters.selectedFinalStage === filterId ? null : filterId;
}

export function filtersToSearchParams(state: FiltersState): SvelteURLSearchParams {
	const params = new SvelteURLSearchParams();

	if (state.selectedNationCode) params.set('nation', state.selectedNationCode);
	if (state.selectedGroup) params.set('group', state.selectedGroup);
	if (state.selectedFinalStage) params.set('stage', STAGE_TO_PARAM[state.selectedFinalStage]);

	return params;
}

export function hydrateFiltersFromSearchParams(params: URLSearchParams): void {
	const nationCode = params.get('nation')?.toLowerCase() ?? null;
	if (nationCode) {
		const entry = Object.entries(NATIONS).find(([, nation]) => nation.code === nationCode);
		if (entry) {
			filters.selectedNationId = entry[0];
			filters.selectedNationName = entry[1].name;
			filters.selectedNationCode = entry[1].code;
		}
	}

	const stageParam = params.get('stage');
	const stageId = stageParam ? PARAM_TO_STAGE[stageParam] : null;

	if (stageId) {
		filters.selectedFinalStage = stageId;
	} else {
		const groupParam = params.get('group')?.toUpperCase() as GroupId | null;
		if (groupParam && VALID_GROUPS.has(groupParam)) {
			filters.selectedGroup = groupParam;
		}
	}
}

export function applyFilters({
	matches,
	filters
}: {
	matches: Match[];
	filters: FiltersState;
}): Match[] {
	return matches.filter((match) => {
		const matchesNation =
			!filters.selectedNationId ||
			match.sides.some((side) => side.nationId === filters.selectedNationId);
		const matchesGroup = !filters.selectedGroup || match.group === filters.selectedGroup;
		const matchesFinalStage =
			!filters.selectedFinalStage ||
			FINAL_STAGE_PHASES[filters.selectedFinalStage].includes(match.phase);

		return matchesNation && matchesGroup && matchesFinalStage;
	});
}
