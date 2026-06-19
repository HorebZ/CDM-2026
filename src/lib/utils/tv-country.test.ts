import { describe, expect, it } from 'vitest';
import { NATION_IDS, NATIONS } from '$lib/data/nations.js';
import {
	TV_COUNTRY_ROUTE_ENTRIES,
	getTvCountryMatches,
	getTvFollowMatches,
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

	it('renvoie les 3 derniers matchs terminés et les 3 prochains hors nation', () => {
		const result = resolveTvNationByCode('mx');

		if (!result) {
			throw new Error('Mexico should resolve');
		}

		const countryMatches = getTvCountryMatches(result);
		const followMatches = getTvFollowMatches({
			excludedMatches: countryMatches,
			now: new Date('2026-06-19T12:00:00Z')
		});

		expect(followMatches.recent).toHaveLength(3);
		expect(followMatches.upcoming).toHaveLength(3);
		expect(followMatches.recent.every((match) => match.result !== undefined)).toBe(true);
		for (const match of [...followMatches.recent, ...followMatches.upcoming]) {
			expect(match.sides.some((side) => side.nationId === NATION_IDS.MEXIQUE)).toBe(false);
		}
	});

	it('trie les derniers matchs du plus récent au plus ancien', () => {
		const result = resolveTvNationByCode('fr');

		if (!result) {
			throw new Error('France should resolve');
		}

		const { recent } = getTvFollowMatches({
			excludedMatches: getTvCountryMatches(result),
			now: new Date('2026-06-19T12:00:00Z')
		});

		for (let index = 1; index < recent.length; index += 1) {
			expect(recent[index - 1].localDate >= recent[index].localDate).toBe(true);
		}
	});
});
