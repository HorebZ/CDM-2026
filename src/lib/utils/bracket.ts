import { MATCHES, compareMatchesByKickoff, getMatchResultKey } from '$lib/data/matches.js';
import { NATIONS } from '$lib/data/nations.js';
import { STADIUMS } from '$lib/data/stadiums.js';
import {
	BRACKET_COLUMN_PHASES,
	getBracketTreeOrderKeys,
	getFifaMatchNumber,
	SMALL_FINAL_FIFA_MATCH_NUMBER,
	type BracketColumnPhase
} from '$lib/data/bracket-order.js';
import type { Match, MatchPhase, MatchResultKey, Nation } from '$lib/types/index.js';
import { getMatchDates, isMatchDatePassed } from '$lib/utils/date.js';

export { BRACKET_COLUMN_PHASES, type BracketColumnPhase };

export const BRACKET_GRID_ROWS = 16;
export const BRACKET_GRID_MIN_HEIGHT = 1152;
export const BRACKET_GRID_GAP = 4;
export const BRACKET_CONNECTOR_WIDTH = 28;

export const BRACKET_COLUMN_LABELS: Record<BracketColumnPhase, string> = {
	'round-of-32': '16es',
	'round-of-16': '8es',
	quarter: 'Quarts',
	semi: 'Demis',
	final: 'Finale'
};

export interface BracketMatchSideDisplay {
	label: string;
	flagCode?: string;
	nation?: Nation;
	score?: number;
	penalties?: number;
	isWinner: boolean;
	isLoser: boolean;
}

export interface BracketMatchDisplay {
	side1: BracketMatchSideDisplay;
	side2: BracketMatchSideDisplay;
	hasScore: boolean;
	/** Date et heure du coup d'envoi dans le fuseau de l'utilisateur. */
	dateLabel: string;
}

export interface BracketSlot {
	matchKey: MatchResultKey;
	display: BracketMatchDisplay;
	gridRow: number;
	rowSpan: number;
}

export interface BracketColumn {
	phase: BracketColumnPhase;
	label: string;
	slots: BracketSlot[];
}

const KNOCKOUT_MATCHES = MATCHES.filter((match) => match.phase !== 'group');
const KNOCKOUT_MATCHES_BY_KEY = new Map(
	KNOCKOUT_MATCHES.map((match) => [getMatchResultKey(match), match])
);

function buildMatchDisplay(match: Match): BracketMatchDisplay {
	const timezone = STADIUMS[match.stadiumId].timezone;
	const isMatchPassed = isMatchDatePassed(match.localDate, timezone);
	const winner = isMatchPassed ? match.result?.winner : undefined;

	const buildSide = (sideIndex: 0 | 1): BracketMatchSideDisplay => {
		const side = match.sides[sideIndex];
		const nation = side.nationId ? NATIONS[side.nationId] : null;
		const teamIndex = sideIndex === 0 ? 1 : 2;

		return {
			label: nation?.name ?? side.label ?? 'TBD',
			flagCode: nation?.code,
			nation: nation ?? undefined,
			score: side.score?.regularTime,
			penalties: match.result?.resolution === 'penalties' ? side.score?.penalties : undefined,
			isWinner: winner === teamIndex,
			isLoser: winner !== undefined && winner !== teamIndex
		};
	};

	const side1 = buildSide(0);
	const side2 = buildSide(1);

	return {
		side1,
		side2,
		hasScore: isMatchPassed && typeof side1.score === 'number' && typeof side2.score === 'number',
		dateLabel: getMatchDates(match.localDate, timezone).userDate
	};
}

function getKnockoutMatch(key: MatchResultKey): Match {
	const match = KNOCKOUT_MATCHES_BY_KEY.get(key);

	if (!match) {
		throw new Error(`Missing knockout match for bracket slot ${key}`);
	}

	return match;
}

function getMatchesForPhase(phase: MatchPhase): Match[] {
	if (isBracketColumnPhase(phase)) {
		return getBracketTreeOrderKeys(phase).map(getKnockoutMatch);
	}

	return KNOCKOUT_MATCHES.filter((match) => match.phase === phase).sort(compareMatchesByKickoff);
}

function isBracketColumnPhase(phase: MatchPhase): phase is BracketColumnPhase {
	return (BRACKET_COLUMN_PHASES as readonly MatchPhase[]).includes(phase);
}

function buildBracketSlots(phase: BracketColumnPhase): BracketSlot[] {
	const matches = getMatchesForPhase(phase);
	const rowSpan = BRACKET_GRID_ROWS / matches.length;

	return matches.map((match, index) => ({
		matchKey: getMatchResultKey(match),
		display: buildMatchDisplay(match),
		gridRow: index * rowSpan + 1,
		rowSpan
	}));
}

function buildBracketColumnsInternal(): BracketColumn[] {
	return BRACKET_COLUMN_PHASES.map((phase) => ({
		phase,
		label: BRACKET_COLUMN_LABELS[phase],
		slots: buildBracketSlots(phase)
	}));
}

const BRACKET_COLUMNS = buildBracketColumnsInternal();

const SMALL_FINAL_MATCH = KNOCKOUT_MATCHES.find(
	(match) => getFifaMatchNumber(getMatchResultKey(match)) === SMALL_FINAL_FIFA_MATCH_NUMBER
);

const SMALL_FINAL_DISPLAY = SMALL_FINAL_MATCH ? buildMatchDisplay(SMALL_FINAL_MATCH) : undefined;

export function buildBracketColumns(): BracketColumn[] {
	return BRACKET_COLUMNS;
}

export function getBracketRowSpan(phase: BracketColumnPhase): number {
	return BRACKET_GRID_ROWS / getMatchesForPhase(phase).length;
}

/** @deprecated Prefer getSmallFinalDisplay() in UI code. */
export function getSmallFinalMatch(): Match | undefined {
	return SMALL_FINAL_MATCH;
}

export function getSmallFinalDisplay(): BracketMatchDisplay | undefined {
	return SMALL_FINAL_DISPLAY;
}

export function getSlotCenterRow(slot: BracketSlot): number {
	return slot.gridRow - 1 + slot.rowSpan / 2;
}

export function getGridTrackHeight(): number {
	return (BRACKET_GRID_MIN_HEIGHT - (BRACKET_GRID_ROWS - 1) * BRACKET_GRID_GAP) / BRACKET_GRID_ROWS;
}

/** Shared inline styles so column grids and connector SVGs use identical track sizing. */
export function getBracketGridStyle(): string {
	const trackHeight = getGridTrackHeight();

	return [
		`height: ${BRACKET_GRID_MIN_HEIGHT}px`,
		`grid-template-rows: repeat(${BRACKET_GRID_ROWS}, ${trackHeight}px)`,
		`row-gap: ${BRACKET_GRID_GAP}px`
	].join('; ');
}

/** Vertical center of a slot within the bracket grid, in pixels. */
export function getSlotCenterY(slot: BracketSlot): number {
	const trackHeight = getGridTrackHeight();
	const centerRow = getSlotCenterRow(slot);

	return (centerRow - 0.5) * (trackHeight + BRACKET_GRID_GAP) + trackHeight / 2;
}

// Exported for tests only.
export function buildBracketSlotsForPhase(phase: BracketColumnPhase): BracketSlot[] {
	return buildBracketSlots(phase);
}
