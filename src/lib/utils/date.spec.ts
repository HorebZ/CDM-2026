import { describe, it, expect } from 'vitest';
import { Temporal } from '@js-temporal/polyfill';
import { fromLocal, isMatchDatePassed } from './date';

describe('fromLocal', () => {
	it('retourne un ZonedDateTime avec le bon fuseau horaire', () => {
		const result = fromLocal('2026-06-11T13:00:00', 'America/Mexico_City');
		expect(result.timeZoneId).toBe('America/Mexico_City');
	});

	it('retourne un ZonedDateTime avec la bonne date et heure locales', () => {
		const result = fromLocal('2026-06-11T13:00:00', 'America/Mexico_City');
		expect(result.year).toBe(2026);
		expect(result.month).toBe(6);
		expect(result.day).toBe(11);
		expect(result.hour).toBe(13);
		expect(result.minute).toBe(0);
		expect(result.second).toBe(0);
	});

	it('retourne une instance de Temporal.ZonedDateTime', () => {
		const result = fromLocal('2026-06-11T13:00:00', 'America/Mexico_City');
		expect(result).toBeInstanceOf(Temporal.ZonedDateTime);
	});

	it('gère correctement différents fuseaux horaires', () => {
		const nyResult = fromLocal('2026-07-14T20:00:00', 'America/New_York');
		expect(nyResult.timeZoneId).toBe('America/New_York');
		expect(nyResult.hour).toBe(20);

		const parisResult = fromLocal('2026-07-14T20:00:00', 'Europe/Paris');
		expect(parisResult.timeZoneId).toBe('Europe/Paris');
		expect(parisResult.hour).toBe(20);
	});

	it('lève une erreur pour un fuseau horaire invalide', () => {
		expect(() => fromLocal('2026-06-11T13:00:00', 'Fuseau/Invalide')).toThrow();
	});

	it('lève une erreur pour une date invalide', () => {
		expect(() => fromLocal('2026-13-99T25:00:00', 'America/Mexico_City')).toThrow();
	});
});

describe('isMatchDatePassed', () => {
	it('retourne true quand la date du match est passée', () => {
		const now = Temporal.Instant.from('2026-06-11T19:00:01Z');

		expect(isMatchDatePassed('2026-06-11T13:00:00', 'America/Mexico_City', now)).toBe(true);
	});

	it("retourne false quand la date du match n'est pas encore passée", () => {
		const now = Temporal.Instant.from('2026-06-11T18:59:59Z');

		expect(isMatchDatePassed('2026-06-11T13:00:00', 'America/Mexico_City', now)).toBe(false);
	});
});
