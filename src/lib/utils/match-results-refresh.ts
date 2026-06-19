import { Temporal } from '@js-temporal/polyfill';

export const MATCH_RESULTS_REFRESH_TIMEZONE = 'Europe/Paris';
export const MATCH_RESULTS_REFRESH_HOUR = 9;
export const MATCH_RESULTS_REFRESH_END_DATE = '2026-07-20';

const refreshEndDate = Temporal.PlainDate.from(MATCH_RESULTS_REFRESH_END_DATE);

function refreshAt(date: Temporal.PlainDate, hour: number): Temporal.ZonedDateTime {
	return date.toZonedDateTime({
		timeZone: MATCH_RESULTS_REFRESH_TIMEZONE,
		plainTime: Temporal.PlainTime.from({ hour })
	});
}

export function getNextMatchResultsRefresh(
	now: Temporal.Instant = Temporal.Now.instant()
): Temporal.ZonedDateTime | null {
	const current = now.toZonedDateTimeISO(MATCH_RESULTS_REFRESH_TIMEZONE);
	const today = current.toPlainDate();
	const refreshToday = refreshAt(today, MATCH_RESULTS_REFRESH_HOUR);
	const tomorrow = today.add({ days: 1 });
	const refreshTomorrow = refreshAt(tomorrow, MATCH_RESULTS_REFRESH_HOUR);
	const nextRefresh =
		Temporal.ZonedDateTime.compare(refreshToday, current) > 0 ? refreshToday : refreshTomorrow;

	if (Temporal.PlainDate.compare(nextRefresh.toPlainDate(), refreshEndDate) > 0) {
		return null;
	}

	return nextRefresh;
}

export function scheduleMatchResultsRefresh(reload: () => void): () => void {
	const nextRefresh = getNextMatchResultsRefresh();
	let delay: number | null = null;

	if (nextRefresh !== null) {
		const now = Temporal.Now.instant();
		delay = Number(nextRefresh.epochMilliseconds - now.epochMilliseconds);
	}

	if (delay === null) {
		return () => undefined;
	}

	const timeout = setTimeout(reload, Math.max(0, delay));

	return () => {
		clearTimeout(timeout);
	};
}
