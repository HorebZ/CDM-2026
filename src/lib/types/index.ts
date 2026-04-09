import type { NationId } from '$lib/data/nations';
import type { StadiumId } from '$lib/data/stadiums';

export interface SiteConfig {
	openingMatchDate: Date;
}

export interface Stadium {
	countryCode: string;
	city: string;
	name: string;
	capacity: number;
	timezone: string;
}

interface NationMatchStats {
	yellowCards: number;
	redCards: number;
	goals: number;
}

export type Confederation = 'CONCACAF' | 'CONMEBOL' | 'UEFA' | 'CAF' | 'AFC' | 'OFC';

export const CONFEDERATIONS = {
	CONCACAF: 'CONCACAF',
	CONMEBOL: 'CONMEBOL',
	UEFA: 'UEFA',
	CAF: 'CAF',
	AFC: 'AFC',
	OFC: 'OFC'
} as const;

export interface Nation {
	code: string;
	name: string;
	confederation: Confederation;
	participation: number;
	enabled: boolean;
}

export interface Match {
	type: 'group' | 'knockout' | 'quarter' | 'semi' | 'small-final' | 'final';
	group?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
	/** Heure locale du stade, format ISO sans fuseau : "YYYY-MM-DDTHH:mm:ss" */
	localDate: string;
	stadiumId: StadiumId;
	nation1: { nationId: NationId; matchStats: NationMatchStats };
	nation2: { nationId: NationId; matchStats: NationMatchStats };
}
