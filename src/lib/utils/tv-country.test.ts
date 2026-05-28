import { describe, expect, it } from 'vitest';
import { NATION_IDS, NATIONS } from '$lib/data/nations.js';
import {
	TV_COUNTRY_ROUTE_ENTRIES,
	getTvCountryMatches,
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
});
