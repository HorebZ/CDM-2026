import { describe, expect, it } from 'vitest';
import { NATION_IDS, NATIONS } from '$lib/data/nations.js';
import {
	TV_COUNTRY_ROUTE_ENTRIES,
	getTvCountryMatches,
	getUpcomingTvCompetitionDays,
	resolveTvNationByCode
} from './tv-country.js';

describe('tv-country', () => {
	it('expose une entrée de prerender pour chaque nation', () => {
		expect(TV_COUNTRY_ROUTE_ENTRIES).toHaveLength(Object.values(NATIONS).length);
		expect(TV_COUNTRY_ROUTE_ENTRIES).toContainEqual({ nationCode: 'fr' });
		expect(TV_COUNTRY_ROUTE_ENTRIES).toContainEqual({ nationCode: 'gb-eng' });
	});

	it('résout les codes nation sans tenir compte de la casse', () => {
		const result = resolveTvNationByCode('FR');

		expect(result?.nationId).toBe(NATION_IDS.FRANCE);
		expect(result?.nation.code).toBe('fr');
	});

	it('renvoie null pour un code nation inconnu', () => {
		expect(resolveTvNationByCode('zz')).toBeNull();
	});

	it('renvoie uniquement les matchs de la nation demandée', () => {
		const result = resolveTvNationByCode('fr');

		if (!result) {
			throw new Error('France should resolve');
		}

		const matches = getTvCountryMatches(result);

		expect(matches).toHaveLength(3);
		for (const match of matches) {
			expect(match.sides.some((side) => side.nationId === NATION_IDS.FRANCE)).toBe(true);
		}
	});

	it('renvoie les deux prochains jours de compétition dans l’ordre chronologique', () => {
		const days = getUpcomingTvCompetitionDays({
			excludedMatches: [],
			now: new Date('2026-06-10T00:00:00Z')
		});

		expect(days).toHaveLength(2);
		expect(days.map((day) => day.date)).toEqual(['2026-06-11', '2026-06-12']);
		expect(days.every((day) => day.matches.length > 0)).toBe(true);
	});

	it('exclut les matchs déjà affichés pour la nation sélectionnée', () => {
		const result = resolveTvNationByCode('mx');

		if (!result) {
			throw new Error('Mexico should resolve');
		}

		const countryMatches = getTvCountryMatches(result);
		const days = getUpcomingTvCompetitionDays({
			excludedMatches: countryMatches,
			now: new Date('2026-06-10T00:00:00Z')
		});
		const displayedMatches = days.flatMap((day) => day.matches);

		expect(days[0].date).toBe('2026-06-11');
		expect(displayedMatches).not.toContain(countryMatches[0]);
		for (const match of displayedMatches) {
			expect(match.sides.some((side) => side.nationId === NATION_IDS.MEXIQUE)).toBe(false);
		}
	});
});
