import type { MatchResultKey } from '$lib/types/index.js';

export const BRACKET_COLUMN_PHASES = [
	'round-of-32',
	'round-of-16',
	'quarter',
	'semi',
	'final'
] as const;

export type BracketColumnPhase = (typeof BRACKET_COLUMN_PHASES)[number];

/**
 * FIFA World Cup 2026 knockout match numbers (73–104).
 * Bracket tree order follows the official FIFA bracket, not kickoff chronology.
 * @see https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums
 */
export const FIFA_MATCH_NUMBER_BY_KEY = {
	'2026-06-28T12:00:00|LOS_ANGELES': 73,
	'2026-06-29T16:30:00|BOSTON': 74,
	'2026-06-29T19:00:00|MONTERREY': 75,
	'2026-06-29T12:00:00|HOUSTON': 76,
	'2026-06-30T17:00:00|NEW_YORK': 77,
	'2026-06-30T12:00:00|ARLINGTON': 78,
	'2026-06-30T19:00:00|MEXICO': 79,
	'2026-07-01T12:00:00|ATLANTA': 80,
	'2026-07-01T17:00:00|SANTA_CLARA': 81,
	'2026-07-01T13:00:00|SEATTLE': 82,
	'2026-07-02T19:00:00|TORONTO': 83,
	'2026-07-02T12:00:00|LOS_ANGELES': 84,
	'2026-07-02T20:00:00|VANCOUVER': 85,
	'2026-07-03T18:00:00|MIAMI': 86,
	'2026-07-03T20:30:00|KANSAS_CITY': 87,
	'2026-07-03T13:00:00|ARLINGTON': 88,
	'2026-07-04T17:00:00|PHILADELPHIE': 89,
	'2026-07-04T12:00:00|HOUSTON': 90,
	'2026-07-05T16:00:00|NEW_YORK': 91,
	'2026-07-05T18:00:00|MEXICO': 92,
	'2026-07-06T14:00:00|ARLINGTON': 93,
	'2026-07-06T17:00:00|SEATTLE': 94,
	'2026-07-07T12:00:00|ATLANTA': 95,
	'2026-07-07T13:00:00|VANCOUVER': 96,
	'2026-07-09T16:00:00|BOSTON': 97,
	'2026-07-10T12:00:00|LOS_ANGELES': 98,
	'2026-07-11T17:00:00|MIAMI': 99,
	'2026-07-11T20:00:00|KANSAS_CITY': 100,
	'2026-07-14T14:00:00|ARLINGTON': 101,
	'2026-07-15T15:00:00|ATLANTA': 102,
	'2026-07-18T17:00:00|MIAMI': 103,
	'2026-07-19T15:00:00|NEW_YORK': 104
} as const satisfies Record<MatchResultKey, number>;

export const BRACKET_TREE_ORDER: Record<BracketColumnPhase, readonly number[]> = {
	// Top-to-bottom order from the Wikipedia/FIFA bracket tree (Germany first in R32).
	'round-of-32': [74, 77, 73, 75, 83, 84, 81, 82, 76, 78, 79, 80, 86, 88, 85, 87],
	'round-of-16': [89, 90, 93, 94, 91, 92, 95, 96],
	quarter: [97, 98, 99, 100],
	semi: [101, 102],
	final: [104]
};

export const SMALL_FINAL_FIFA_MATCH_NUMBER = 103;

const FIFA_MATCH_KEY_BY_NUMBER = Object.fromEntries(
	Object.entries(FIFA_MATCH_NUMBER_BY_KEY).map(([key, number]) => [number, key])
) as Record<number, MatchResultKey>;

export function getFifaMatchNumber(key: MatchResultKey): number | undefined {
	return FIFA_MATCH_NUMBER_BY_KEY[key as keyof typeof FIFA_MATCH_NUMBER_BY_KEY];
}

export function getMatchKeyByFifaNumber(number: number): MatchResultKey | undefined {
	return FIFA_MATCH_KEY_BY_NUMBER[number];
}

export function getBracketTreeOrderKeys(phase: BracketColumnPhase): MatchResultKey[] {
	return BRACKET_TREE_ORDER[phase].map((number) => {
		const key = getMatchKeyByFifaNumber(number);

		if (!key) {
			throw new Error(`Missing FIFA match key for match ${number}`);
		}

		return key;
	});
}
