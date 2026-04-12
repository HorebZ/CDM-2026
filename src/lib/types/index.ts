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

export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export type MatchPhase = 'group' | 'round-of-16' | 'quarter' | 'semi' | 'small-final' | 'final';

export type MatchResolution = 'regular' | 'penalties';

export interface TeamMatchStats {
	yellowCards: number;
	redCards: number;
	possession?: number;
	shots?: number;
	shotsOnTarget?: number;
	corners?: number;
	fouls?: number;
}

/** Score d'une équipe : regularTime est toujours présent, penalties uniquement si le match se termine aux tirs au but */
export interface MatchScore {
	regularTime: number;
	penalties?: number;
}

export interface MatchSideBase {
	score?: MatchScore;
	stats: TeamMatchStats;
}

export type MatchSide =
	| (MatchSideBase & {
			nationId: NationId;
			label?: string;
	  })
	| (MatchSideBase & {
			nationId?: undefined;
			label: string;
	  });

export interface MatchResult {
	resolution: MatchResolution;
	winner?: 1 | 2;
}

export interface Match {
	phase: MatchPhase;
	group?: GroupId;
	/** Heure locale du stade, format ISO sans fuseau : "YYYY-MM-DDTHH:mm:ss" */
	localDate: string;
	stadiumId: StadiumId;
	sides: [MatchSide, MatchSide];
	result?: MatchResult;
}
