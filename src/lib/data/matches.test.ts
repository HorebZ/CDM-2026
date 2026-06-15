import { describe, expect, it } from 'vitest';
import type { Match } from '$lib/types/index.js';
import { STADIUM_IDS } from './stadiums.js';
import { MATCHES, compareMatchesByKickoff } from './matches.js';

function createMatch(localDate: string, stadiumId: Match['stadiumId']): Match {
	return {
		phase: 'group',
		group: 'A',
		localDate,
		stadiumId,
		sides: [
			{ label: 'Team A', score: { regularTime: 0 }, stats: { yellowCards: 0, redCards: 0 } },
			{ label: 'Team B', score: { regularTime: 0 }, stats: { yellowCards: 0, redCards: 0 } }
		]
	};
}

describe('matches', () => {
	it("trie les matchs exportes dans l'ordre reel des coups d'envoi", () => {
		for (let index = 1; index < MATCHES.length; index += 1) {
			expect(compareMatchesByKickoff(MATCHES[index - 1], MATCHES[index])).toBeLessThanOrEqual(0);
		}
	});

	it("tient compte de l'heure et pas seulement du jour", () => {
		const midnightInFrance = createMatch('2026-06-13T18:00:00', STADIUM_IDS.NEW_YORK);
		const twentyOneInFrance = createMatch('2026-06-13T12:00:00', STADIUM_IDS.SANTA_CLARA);

		const sortedMatches = [midnightInFrance, twentyOneInFrance].sort(compareMatchesByKickoff);

		expect(sortedMatches).toEqual([twentyOneInFrance, midnightInFrance]);
	});
});
