import { Temporal } from '@js-temporal/polyfill';

/**
 * Crée un ZonedDateTime à partir d'une heure locale et d'un fuseau horaire IANA.
 *
 * @param localIso - Date/heure locale au format ISO sans fuseau (ex: "2026-06-11T13:00:00")
 * @param timezone - Fuseau horaire IANA (ex: "America/Mexico_City")
 */
export function fromLocal(localIso: string, timezone: string): Temporal.ZonedDateTime {
	return Temporal.ZonedDateTime.from(`${localIso}[${timezone}]`);
}

/**
 * Indique si la date/heure prévue du match est déjà passée.
 *
 * @param localIso - Heure locale du stade au format ISO sans fuseau
 * @param timezone - Fuseau IANA du stade
 * @param now - Instant de référence, utile pour les tests
 */
export function isMatchDatePassed(
	localIso: string,
	timezone: string,
	now: Temporal.Instant = Temporal.Now.instant()
): boolean {
	const matchInstant = fromLocal(localIso, timezone).toInstant();

	return Temporal.Instant.compare(now, matchInstant) > 0;
}

/**
 * Renvoie le nombre de jours calendaires restants entre `now` et `target`.
 * Les deux dates sont normalisées à minuit local pour éviter les erreurs d'arrondi liées à l'heure.
 *
 * @param target - Date cible
 * @param now - Instant de référence (par défaut l'instant courant), utile pour les tests
 */
export function getDaysRemaining(target: Date, now: Date = new Date()): number {
	const todayAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const targetAtMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
	const diffMs = targetAtMidnight.getTime() - todayAtMidnight.getTime();

	return Math.max(0, Math.round(diffMs / 86_400_000));
}

export interface MatchDates {
	/** Date/heure dans le fuseau de l'utilisateur */
	userDate: string;
	/** Heure locale du stade */
	stadiumDate: string;
}

/**
 * Formate une date de match dans le fuseau de l'utilisateur et dans celui du stade.
 *
 * @param localIso - Heure locale du stade au format ISO sans fuseau
 * @param stadiumTimezone - Fuseau IANA du stade
 */
export function getMatchDates(localIso: string, stadiumTimezone: string): MatchDates {
	const zdt = fromLocal(localIso, stadiumTimezone);
	const date = new Date(Number(zdt.epochMilliseconds));

	const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const userDate = new Intl.DateTimeFormat('fr-FR', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: userTz,
		hour12: false
	}).format(date);

	const stadiumDate = new Intl.DateTimeFormat('fr-FR', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: stadiumTimezone,
		hour12: false
	}).format(date);

	return { userDate, stadiumDate };
}
