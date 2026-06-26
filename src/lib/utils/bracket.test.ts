import { describe, expect, it } from 'vitest';
import {
	BRACKET_GRID_ROWS,
	buildBracketColumns,
	buildBracketSlotsForPhase,
	getGridTrackHeight,
	getSmallFinalMatch,
	getSlotCenterRow,
	getSlotCenterY
} from './bracket.js';

describe('bracket', () => {
	it('builds columns with the expected match counts per phase', () => {
		const columns = buildBracketColumns();

		expect(columns).toHaveLength(5);
		expect(columns.map((column) => column.slots.length)).toEqual([16, 8, 4, 2, 1]);
	});

	it('aligns slots on the shared grid rows', () => {
		const roundOf32 = buildBracketSlotsForPhase('round-of-32');
		const roundOf16 = buildBracketSlotsForPhase('round-of-16');

		expect(roundOf32[0]).toMatchObject({ gridRow: 1, rowSpan: 1 });
		expect(roundOf16[0]).toMatchObject({ gridRow: 1, rowSpan: 2 });
		expect(getSlotCenterRow(roundOf32[0])).toBe(0.5);
		expect(getSlotCenterRow(roundOf32[1])).toBe(1.5);
		expect(getSlotCenterRow(roundOf16[0])).toBe(1);
	});

	it('covers the full bracket grid height', () => {
		const roundOf32 = buildBracketSlotsForPhase('round-of-32');
		const lastSlot = roundOf32.at(-1);

		expect(lastSlot?.gridRow).toBe(BRACKET_GRID_ROWS);
		expect(lastSlot?.rowSpan).toBe(1);
	});

	it('maps slot centers to grid pixel coordinates', () => {
		const roundOf32 = buildBracketSlotsForPhase('round-of-32');
		const trackHeight = getGridTrackHeight();

		expect(getSlotCenterY(roundOf32[0])).toBe(trackHeight / 2);
		expect(getSlotCenterY(roundOf32[1])).toBe(trackHeight + 4 + trackHeight / 2);
	});

	it('exposes the third-place match separately', () => {
		const smallFinal = getSmallFinalMatch();

		expect(smallFinal?.phase).toBe('small-final');
		expect(smallFinal?.phaseLabel).toBe('Petite finale');
	});
});
