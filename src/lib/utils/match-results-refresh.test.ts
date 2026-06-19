import { Temporal } from '@js-temporal/polyfill';
import { describe, expect, it } from 'vitest';
import {
	getNextMatchResultsRefresh,
	MATCH_RESULTS_REFRESH_TIMEZONE
} from './match-results-refresh.js';

function instantFromParis(isoDateTime: string): Temporal.Instant {
	return Temporal.ZonedDateTime.from(
		`${isoDateTime}[${MATCH_RESULTS_REFRESH_TIMEZONE}]`
	).toInstant();
}

describe('getNextMatchResultsRefresh', () => {
	it('programme le refresh de 9h quand la page est ouverte avant 9h', () => {
		expect.hasAssertions();

		const nextRefresh = getNextMatchResultsRefresh(instantFromParis('2026-06-19T08:30:00'));

		expect(nextRefresh?.toPlainDateTime().toString()).toBe('2026-06-19T09:00:00');
	});

	it('programme le refresh du lendemain apres 9h', () => {
		expect.hasAssertions();

		const nextRefresh = getNextMatchResultsRefresh(instantFromParis('2026-06-19T09:00:00'));

		expect(nextRefresh?.toPlainDateTime().toString()).toBe('2026-06-20T09:00:00');
	});

	it('inclut le dernier refresh du 20 juillet a 9h', () => {
		expect.hasAssertions();

		const nextRefresh = getNextMatchResultsRefresh(instantFromParis('2026-07-20T08:30:00'));

		expect(nextRefresh?.toPlainDateTime().toString()).toBe('2026-07-20T09:00:00');
	});

	it('ne programme plus de refresh apres la finale', () => {
		expect.hasAssertions();

		const nextRefresh = getNextMatchResultsRefresh(instantFromParis('2026-07-20T09:00:00'));

		expect(nextRefresh).toBeNull();
	});
});
