import { MATCHES } from '$lib/data/matches.js';
import type { GroupId, Match } from '$lib/types/index.js';

export const FINAL_STAGE_FILTERS = [
	{ id: '16e', label: '16e' },
	{ id: '8e', label: '8e' },
	{ id: '1/4', label: '1/4' },
	{ id: 'PF', label: 'Phase finale' }
] as const;

export type FinalStageFilterId = (typeof FINAL_STAGE_FILTERS)[number]['id'];

export class MatchFilters {
	query = $state('');
	selectedNationId = $state<string | null>(null);
	selectedNationName = $state<string | null>(null);
	selectedNationCode = $state<string | null>(null);
	selectedGroup = $state<GroupId | null>(null);
	selectedFinalStage = $state<FinalStageFilterId | null>(null);

	readonly filtered = $derived.by<Match[]>(() =>
		MATCHES.filter((match) => {
			const matchesNation =
				!this.selectedNationId ||
				match.sides.some((side) => side.nationId === this.selectedNationId);
			const matchesGroup = !this.selectedGroup || match.group === this.selectedGroup;
			const matchesFinalStage =
				!this.selectedFinalStage ||
				(this.selectedFinalStage === '16e' && match.phaseLabel === '16e de finale') ||
				(this.selectedFinalStage === '8e' && match.phaseLabel === '8e de finale') ||
				(this.selectedFinalStage === '1/4' && match.phaseLabel === 'Quart de finale') ||
				(this.selectedFinalStage === 'PF' &&
					['Demi-finale', 'Petite finale', 'Finale'].includes(match.phaseLabel ?? ''));
			return matchesNation && matchesGroup && matchesFinalStage;
		})
	);

	selectNation(result: { id: string; name: string; code: string }) {
		this.selectedNationId = result.id;
		this.selectedNationName = result.name;
		this.selectedNationCode = result.code;
		this.query = '';
	}

	clearNation() {
		this.selectedNationId = null;
		this.selectedNationName = null;
		this.selectedNationCode = null;
		this.query = '';
	}

	toggleGroup(group: GroupId) {
		this.selectedFinalStage = null;
		this.selectedGroup = this.selectedGroup === group ? null : group;
	}

	toggleFinalStage(filterId: FinalStageFilterId) {
		this.selectedGroup = null;
		this.selectedFinalStage = this.selectedFinalStage === filterId ? null : filterId;
	}
}
