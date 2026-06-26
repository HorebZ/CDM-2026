import { describe, expect, it } from 'vitest';
import {
	BEST_THIRD_PLACES_COUNT,
	getBestThirdPlaces,
	getGroupStandings,
	getGroupStandingsWithQualification
} from './group-standings.js';

describe('getGroupStandings', () => {
	it('returns four teams per group', () => {
		expect(getGroupStandings('A')).toHaveLength(4);
	});

	it('ranks group A with Mexico on top', () => {
		const standings = getGroupStandings('A');

		expect(standings[0]?.nationId).toBe('MEXIQUE');
		expect(standings[0]?.points).toBe(9);
	});
});

describe('getGroupStandingsWithQualification', () => {
	it('qualifies the top two teams in each group', () => {
		const standings = getGroupStandingsWithQualification('A');

		expect(standings[0]?.isQualified).toBe(true);
		expect(standings[1]?.isQualified).toBe(true);
		expect(standings[3]?.isQualified).toBe(false);
	});

	it('qualifies third place only when among the best eight', () => {
		const qualifiedThirdPlaces = getBestThirdPlaces().filter((standing) => standing.isQualified);

		for (const thirdPlace of qualifiedThirdPlaces) {
			const standings = getGroupStandingsWithQualification(thirdPlace.group);

			expect(standings[2]?.isQualified).toBe(true);
		}
	});
});

describe('getBestThirdPlaces', () => {
	it('returns twelve third-placed teams', () => {
		expect(getBestThirdPlaces()).toHaveLength(12);
	});

	it('marks only the top eight as qualified', () => {
		const thirdPlaces = getBestThirdPlaces();
		const qualifiedCount = thirdPlaces.filter((standing) => standing.isQualified).length;

		expect(qualifiedCount).toBe(BEST_THIRD_PLACES_COUNT);
		expect(thirdPlaces[0]?.isQualified).toBe(true);
		expect(thirdPlaces[7]?.isQualified).toBe(true);
		expect(thirdPlaces[8]?.isQualified).toBe(false);
	});

	it('assigns consecutive ranks', () => {
		const thirdPlaces = getBestThirdPlaces();

		expect(thirdPlaces.map((standing) => standing.rank)).toEqual([
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
		]);
	});
});
