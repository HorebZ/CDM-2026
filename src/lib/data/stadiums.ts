import type { Stadium } from '$lib/types';
import { createIdMap } from '$lib/utils/ids';

export const STADIUMS: Record<string, Stadium> = {
	VANCOUVER: {
		countryCode: 'ca',
		city: 'Vancouver',
		name: 'BC Place',
		capacity: 54500,
		timezone: 'America/Vancouver'
	},
	TORONTO: {
		countryCode: 'ca',
		city: 'Toronto',
		name: 'BMO Field',
		capacity: 45736,
		timezone: 'America/Toronto'
	},
	NEW_YORK: {
		countryCode: 'us',
		city: 'New York',
		name: 'MetLife Stadium',
		capacity: 82500,
		timezone: 'America/New_York'
	},
	LOS_ANGELES: {
		countryCode: 'us',
		city: 'Los Angeles',
		name: 'SoFi Stadium',
		capacity: 70240,
		timezone: 'America/Los_Angeles'
	},
	ARLINGTON: {
		countryCode: 'us',
		city: 'Arlington',
		name: 'AT&T Stadium',
		capacity: 80000,
		timezone: 'America/Chicago'
	},
	HOUSTON: {
		countryCode: 'us',
		city: 'Houston',
		name: 'NRG Stadium',
		capacity: 72220,
		timezone: 'America/Chicago'
	},
	ATLANTA: {
		countryCode: 'us',
		city: 'Atlanta',
		name: 'Mercedes-Benz Stadium',
		capacity: 75000,
		timezone: 'America/New_York'
	},
	MIAMI: {
		countryCode: 'us',
		city: 'Miami',
		name: 'Hard Rock Stadium',
		capacity: 67518,
		timezone: 'America/New_York'
	},
	KANSAS_CITY: {
		countryCode: 'us',
		city: 'Kansas City',
		name: 'Arrowhead Stadium',
		capacity: 76640,
		timezone: 'America/Chicago'
	},
	SEATTLE: {
		countryCode: 'us',
		city: 'Seattle',
		name: 'Lumen Field',
		capacity: 69000,
		timezone: 'America/Los_Angeles'
	},
	SANTA_CLARA: {
		countryCode: 'us',
		city: 'Santa Clara',
		name: "Levi's Stadium",
		capacity: 70909,
		timezone: 'America/Los_Angeles'
	},
	BOSTON: {
		countryCode: 'us',
		city: 'Boston',
		name: 'Gillette Stadium',
		capacity: 65878,
		timezone: 'America/New_York'
	},
	PHILADELPHIE: {
		countryCode: 'us',
		city: 'Philadelphie',
		name: 'Lincoln Financial Field',
		capacity: 69328,
		timezone: 'America/New_York'
	},
	MEXICO: {
		countryCode: 'mx',
		city: 'Mexico',
		name: 'Estadio Azteca',
		capacity: 87523,
		timezone: 'America/Mexico_City'
	},
	GUADALAJARA: {
		countryCode: 'mx',
		city: 'Guadalajara',
		name: 'Estadio Akron',
		capacity: 46232,
		timezone: 'America/Mexico_City'
	},
	MONTERREY: {
		countryCode: 'mx',
		city: 'Monterrey',
		name: 'Estadio BBVA',
		capacity: 53460,
		timezone: 'America/Monterrey'
	}
};

export type StadiumId = keyof typeof STADIUMS;
export const STADIUM_IDS = createIdMap(STADIUMS);
