import { describe, expect, it } from 'vitest';
import { getDaysRemaining, isOpeningMatchPassed } from './date.js';

describe('getDaysRemaining', () => {
	const opening = new Date(2026, 5, 11);

	it('returns positive days before the target', () => {
		const now = new Date(2026, 5, 5);
		expect(getDaysRemaining(opening, now)).toBe(6);
	});

	it('returns 0 on opening day', () => {
		const now = new Date(2026, 5, 11);
		expect(getDaysRemaining(opening, now)).toBe(0);
	});

	it('returns negative days after the target', () => {
		const now = new Date(2026, 5, 15);
		expect(getDaysRemaining(opening, now)).toBe(-4);
	});
});

describe('isOpeningMatchPassed', () => {
	const opening = new Date(2026, 5, 11);

	it('is false before opening day', () => {
		expect(isOpeningMatchPassed(opening, new Date(2026, 5, 10))).toBe(false);
	});

	it('is true on opening day', () => {
		expect(isOpeningMatchPassed(opening, new Date(2026, 5, 11))).toBe(true);
	});

	it('is true after opening day', () => {
		expect(isOpeningMatchPassed(opening, new Date(2026, 5, 20))).toBe(true);
	});
});
