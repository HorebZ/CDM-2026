import { MATCHES, getMatchResultKey } from '$lib/data/matches.js';
import {
	BRACKET_TREE_ORDER,
	FIFA_MATCH_NUMBER_BY_KEY,
	getBracketTreeOrderKeys,
	getFifaMatchNumber
} from '$lib/data/bracket-order.js';
import { buildBracketSlotsForPhase } from '$lib/utils/bracket.js';
import { describe, expect, it } from 'vitest';

describe('bracket-order', () => {
	it('maps every knockout match to a FIFA match number', () => {
		const knockoutMatches = MATCHES.filter((match) => match.phase !== 'group');

		for (const match of knockoutMatches) {
			expect(getFifaMatchNumber(getMatchResultKey(match))).toBeTypeOf('number');
		}
	});

	it('starts the round of 32 with Germany (match 74)', () => {
		const slots = buildBracketSlotsForPhase('round-of-32');
		const firstMatchKey = slots[0]?.matchKey;

		expect(getFifaMatchNumber(firstMatchKey!)).toBe(74);
		expect(slots[0]?.display.side1.label).toBe('Allemagne');
	});

	it('uses the official FIFA bracket tree order for round of 32', () => {
		const slots = buildBracketSlotsForPhase('round-of-32');
		const fifaNumbers = slots.map((slot) => getFifaMatchNumber(slot.matchKey));

		expect(fifaNumbers).toEqual(BRACKET_TREE_ORDER['round-of-32']);
	});

	it('uses the official FIFA bracket tree order for quarter-finals', () => {
		const slots = buildBracketSlotsForPhase('quarter');
		const fifaNumbers = slots.map((slot) => getFifaMatchNumber(slot.matchKey));

		expect(fifaNumbers).toEqual(BRACKET_TREE_ORDER.quarter);
	});

	it('resolves every bracket slot key from the schedule', () => {
		for (const phase of Object.keys(BRACKET_TREE_ORDER) as Array<keyof typeof BRACKET_TREE_ORDER>) {
			expect(getBracketTreeOrderKeys(phase)).toHaveLength(BRACKET_TREE_ORDER[phase].length);
		}
	});

	it('keeps unique FIFA match numbers in the schedule map', () => {
		const numbers = Object.values(FIFA_MATCH_NUMBER_BY_KEY);

		expect(new Set(numbers).size).toBe(numbers.length);
		expect(Math.min(...numbers)).toBe(73);
		expect(Math.max(...numbers)).toBe(104);
	});
});
