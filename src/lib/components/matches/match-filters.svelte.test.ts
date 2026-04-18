import { describe, it, expect, beforeEach } from 'vitest';
import { flushSync } from 'svelte';
import {
	FINAL_STAGE_FILTERS,
	applyFilters,
	clearNation,
	filters,
	resetFilters,
	selectNation,
	toggleFinalStage,
	toggleGroup,
	type FiltersState
} from './match-filters.svelte';
import { MATCHES } from '$lib/data/matches.js';
import { NATION_IDS } from '$lib/data/nations.js';

function snapshot(): FiltersState {
	return {
		query: filters.query,
		selectedNationId: filters.selectedNationId,
		selectedNationName: filters.selectedNationName,
		selectedNationCode: filters.selectedNationCode,
		selectedGroup: filters.selectedGroup,
		selectedFinalStage: filters.selectedFinalStage
	};
}

describe('match-filters.svelte', () => {
	beforeEach(() => {
		resetFilters();
	});

	describe('resetFilters', () => {
		it('remet tous les champs à leur valeur initiale', () => {
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });
			toggleGroup({ group: 'I' });
			resetFilters();

			expect(snapshot()).toEqual({
				query: '',
				selectedNationId: null,
				selectedNationName: null,
				selectedNationCode: null,
				selectedGroup: null,
				selectedFinalStage: null
			});
		});
	});

	describe('applyFilters', () => {
		it("renvoie l'intégralité des matchs quand aucun filtre n'est actif", () => {
			expect(applyFilters({ matches: MATCHES, filters })).toEqual(MATCHES);
		});

		it('ne conserve que les matchs impliquant la nation sélectionnée', () => {
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });
			flushSync();

			const result = applyFilters({ matches: MATCHES, filters });

			expect(result.length).toBeGreaterThan(0);
			for (const match of result) {
				expect(match.sides.some((s) => s.nationId === NATION_IDS.FRANCE)).toBe(true);
			}
		});

		it('ne conserve que les matchs du groupe sélectionné', () => {
			toggleGroup({ group: 'I' });
			flushSync();

			const result = applyFilters({ matches: MATCHES, filters });

			expect(result.length).toBe(6);
			for (const match of result) {
				expect(match.group).toBe('I');
			}
		});

		const finalStageCases: Array<{
			id: (typeof FINAL_STAGE_FILTERS)[number]['id'];
			labels: string[];
		}> = [
			{ id: '16e', labels: ['16e de finale'] },
			{ id: '8e', labels: ['8e de finale'] },
			{ id: '1/4', labels: ['Quart de finale'] },
			{ id: 'PF', labels: ['Demi-finale', 'Petite finale', 'Finale'] }
		];

		for (const { id, labels } of finalStageCases) {
			it(`ne conserve que les matchs étiquetés ${labels.join(' / ')} pour le filtre ${id}`, () => {
				toggleFinalStage({ filterId: id });
				flushSync();

				const result = applyFilters({ matches: MATCHES, filters });

				expect(result.length).toBeGreaterThan(0);
				for (const match of result) {
					expect(labels).toContain(match.phaseLabel);
				}
			});
		}

		it('applique simultanément les filtres de nation et de groupe', () => {
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });
			toggleGroup({ group: 'I' });
			flushSync();

			const result = applyFilters({ matches: MATCHES, filters });

			expect(result.length).toBe(3);
			for (const match of result) {
				expect(match.group).toBe('I');
				expect(match.sides.some((s) => s.nationId === NATION_IDS.FRANCE)).toBe(true);
			}
		});

		it('applique simultanément les filtres de nation et de phase finale', () => {
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });
			toggleFinalStage({ filterId: '16e' });
			flushSync();

			const result = applyFilters({ matches: MATCHES, filters });

			expect(Array.isArray(result)).toBe(true);
			for (const match of result) {
				expect(match.phaseLabel).toBe('16e de finale');
				expect(match.sides.some((s) => s.nationId === NATION_IDS.FRANCE)).toBe(true);
			}
		});
	});

	describe('selectNation', () => {
		it('remplit les 3 champs selectedNation* et vide la query', () => {
			filters.query = 'fra';
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });

			expect(filters.selectedNationId).toBe(NATION_IDS.FRANCE);
			expect(filters.selectedNationName).toBe('France');
			expect(filters.selectedNationCode).toBe('fr');
			expect(filters.query).toBe('');
		});
	});

	describe('clearNation', () => {
		it('réinitialise les champs selectedNation* et la query', () => {
			selectNation({ id: NATION_IDS.FRANCE, name: 'France', code: 'fr' });
			filters.query = 'ignored';
			clearNation();

			expect(filters.selectedNationId).toBeNull();
			expect(filters.selectedNationName).toBeNull();
			expect(filters.selectedNationCode).toBeNull();
			expect(filters.query).toBe('');
		});
	});

	describe('toggleGroup', () => {
		it('active un groupe quand aucun n’est sélectionné', () => {
			toggleGroup({ group: 'A' });
			expect(filters.selectedGroup).toBe('A');
		});

		it('désactive le groupe déjà sélectionné quand on rebascule le même identifiant', () => {
			toggleGroup({ group: 'A' });
			toggleGroup({ group: 'A' });
			expect(filters.selectedGroup).toBeNull();
		});

		it('remplace la sélection quand on bascule sur un autre groupe', () => {
			toggleGroup({ group: 'A' });
			toggleGroup({ group: 'B' });
			expect(filters.selectedGroup).toBe('B');
		});

		it('remplace le filtre phase finale si actif', () => {
			toggleFinalStage({ filterId: '16e' });
			toggleGroup({ group: 'A' });
			expect(filters.selectedFinalStage).toBeNull();
			expect(filters.selectedGroup).toBe('A');
		});
	});

	describe('toggleFinalStage', () => {
		it('active une phase finale quand aucune n’est sélectionnée', () => {
			toggleFinalStage({ filterId: '16e' });
			expect(filters.selectedFinalStage).toBe('16e');
		});

		it('désactive la phase déjà sélectionnée quand on rebascule le même filtre', () => {
			toggleFinalStage({ filterId: '8e' });
			toggleFinalStage({ filterId: '8e' });
			expect(filters.selectedFinalStage).toBeNull();
		});

		it('remplace la sélection quand on bascule vers une autre phase finale', () => {
			toggleFinalStage({ filterId: '16e' });
			toggleFinalStage({ filterId: '1/4' });
			expect(filters.selectedFinalStage).toBe('1/4');
		});

		it('remplace le filtre groupe si actif', () => {
			toggleGroup({ group: 'C' });
			toggleFinalStage({ filterId: 'PF' });
			expect(filters.selectedGroup).toBeNull();
			expect(filters.selectedFinalStage).toBe('PF');
		});
	});
});
