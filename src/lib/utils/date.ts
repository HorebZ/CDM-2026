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
