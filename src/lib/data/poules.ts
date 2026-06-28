import type { GroupId } from '$lib/types/index.js';

export const GROUP_IDS = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L'
] as const satisfies readonly GroupId[];

export const BEST_THIRD_PLACES_COUNT = 8;

export interface PouleTeamStanding {
	played: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
	fairPlayPoints: number;
}

/** Classement de la poule A, du 1er au 4e. */
const POULE_A = {
	MEXIQUE: {
		played: 3,
		won: 3,
		drawn: 0,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 0,
		goalDifference: 6,
		points: 9,
		fairPlayPoints: -4
	},
	AFRIQUE_DU_SUD: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 3,
		goalDifference: -1,
		points: 4,
		fairPlayPoints: -8
	},
	COREE_DU_SUD: {
		played: 3,
		won: 1,
		drawn: 0,
		lost: 2,
		goalsFor: 2,
		goalsAgainst: 3,
		goalDifference: -1,
		points: 3,
		fairPlayPoints: 0
	},
	TCHEQUIE: {
		played: 3,
		won: 0,
		drawn: 1,
		lost: 2,
		goalsFor: 2,
		goalsAgainst: 6,
		goalDifference: -4,
		points: 1,
		fairPlayPoints: 0
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_B = {
	SUISSE: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 7,
		goalsAgainst: 3,
		goalDifference: 4,
		points: 7,
		fairPlayPoints: -1
	},
	CANADA: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 8,
		goalsAgainst: 3,
		goalDifference: 5,
		points: 4,
		fairPlayPoints: -2
	},
	BOSNIE: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 5,
		goalsAgainst: 6,
		goalDifference: -1,
		points: 4,
		fairPlayPoints: -6
	},
	QATAR: {
		played: 3,
		won: 0,
		drawn: 1,
		lost: 2,
		goalsFor: 2,
		goalsAgainst: 10,
		goalDifference: -8,
		points: 1,
		fairPlayPoints: -8
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_C = {
	BRESIL: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 7,
		goalsAgainst: 1,
		goalDifference: 6,
		points: 7,
		fairPlayPoints: -2
	},
	MAROC: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 3,
		goalDifference: 3,
		points: 7,
		fairPlayPoints: 0
	},
	ECOSSE: {
		played: 3,
		won: 1,
		drawn: 0,
		lost: 2,
		goalsFor: 1,
		goalsAgainst: 4,
		goalDifference: -3,
		points: 3,
		fairPlayPoints: -2
	},
	HAITI: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 2,
		goalsAgainst: 8,
		goalDifference: -6,
		points: 0,
		fairPlayPoints: -1
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_D = {
	USA: {
		played: 3,
		won: 2,
		drawn: 0,
		lost: 1,
		goalsFor: 8,
		goalsAgainst: 4,
		goalDifference: 4,
		points: 6,
		fairPlayPoints: -1
	},
	AUSTRALIE: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 4,
		fairPlayPoints: 0
	},
	PARAGUAY: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 4,
		goalDifference: -2,
		points: 4,
		fairPlayPoints: -8
	},
	TURQUIE: {
		played: 3,
		won: 1,
		drawn: 0,
		lost: 2,
		goalsFor: 3,
		goalsAgainst: 5,
		goalDifference: -2,
		points: 3,
		fairPlayPoints: -1
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_E = {
	ALLEMAGNE: {
		played: 3,
		won: 2,
		drawn: 0,
		lost: 1,
		goalsFor: 10,
		goalsAgainst: 4,
		goalDifference: 6,
		points: 6,
		fairPlayPoints: 0
	},
	COTE_IVOIRE: {
		played: 3,
		won: 2,
		drawn: 0,
		lost: 1,
		goalsFor: 4,
		goalsAgainst: 2,
		goalDifference: 2,
		points: 6,
		fairPlayPoints: -3
	},
	EQUATEUR: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 4,
		fairPlayPoints: -1
	},
	CURACAO: {
		played: 3,
		won: 0,
		drawn: 1,
		lost: 2,
		goalsFor: 1,
		goalsAgainst: 9,
		goalDifference: -8,
		points: 1,
		fairPlayPoints: 0
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_F = {
	PAYS_BAS: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 10,
		goalsAgainst: 4,
		goalDifference: 6,
		points: 7,
		fairPlayPoints: -2
	},
	JAPON: {
		played: 3,
		won: 1,
		drawn: 2,
		lost: 0,
		goalsFor: 7,
		goalsAgainst: 3,
		goalDifference: 4,
		points: 5,
		fairPlayPoints: 0
	},
	SUEDE: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 7,
		goalsAgainst: 7,
		goalDifference: 0,
		points: 4,
		fairPlayPoints: 0
	},
	TUNISIE: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 2,
		goalsAgainst: 12,
		goalDifference: -10,
		points: 0,
		fairPlayPoints: -1
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_G = {
	BELGIQUE: {
		played: 3,
		won: 1,
		drawn: 2,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 2,
		goalDifference: 4,
		points: 5,
		fairPlayPoints: -7
	},
	EGYPTE: {
		played: 3,
		won: 1,
		drawn: 2,
		lost: 0,
		goalsFor: 5,
		goalsAgainst: 3,
		goalDifference: 2,
		points: 5,
		fairPlayPoints: -6
	},
	IRAN: {
		played: 3,
		won: 0,
		drawn: 3,
		lost: 0,
		goalsFor: 3,
		goalsAgainst: 3,
		goalDifference: 0,
		points: 3,
		fairPlayPoints: -6
	},
	NEW_ZEALAND: {
		played: 3,
		won: 0,
		drawn: 1,
		lost: 2,
		goalsFor: 4,
		goalsAgainst: 10,
		goalDifference: -6,
		points: 1,
		fairPlayPoints: -4
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_H = {
	ESPAGNE: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 5,
		goalsAgainst: 0,
		goalDifference: 5,
		points: 7,
		fairPlayPoints: -2
	},
	CAP_VERT: {
		played: 3,
		won: 0,
		drawn: 3,
		lost: 0,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 3,
		fairPlayPoints: -4
	},
	URUGUAY: {
		played: 3,
		won: 0,
		drawn: 2,
		lost: 1,
		goalsFor: 3,
		goalsAgainst: 4,
		goalDifference: -1,
		points: 2,
		fairPlayPoints: -9
	},
	ARABIE_SAOUDITE: {
		played: 3,
		won: 0,
		drawn: 2,
		lost: 1,
		goalsFor: 1,
		goalsAgainst: 5,
		goalDifference: -4,
		points: 2,
		fairPlayPoints: -6
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_I = {
	FRANCE: {
		played: 3,
		won: 3,
		drawn: 0,
		lost: 0,
		goalsFor: 10,
		goalsAgainst: 2,
		goalDifference: 8,
		points: 9,
		fairPlayPoints: -1
	},
	NORVEGE: {
		played: 3,
		won: 2,
		drawn: 0,
		lost: 1,
		goalsFor: 8,
		goalsAgainst: 7,
		goalDifference: 1,
		points: 6,
		fairPlayPoints: -1
	},
	SENEGAL: {
		played: 3,
		won: 1,
		drawn: 0,
		lost: 2,
		goalsFor: 8,
		goalsAgainst: 6,
		goalDifference: 2,
		points: 3,
		fairPlayPoints: -2
	},
	IRAK: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 1,
		goalsAgainst: 12,
		goalDifference: -11,
		points: 0,
		fairPlayPoints: -8
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_J = {
	ARGENTINE: {
		played: 3,
		won: 3,
		drawn: 0,
		lost: 0,
		goalsFor: 8,
		goalsAgainst: 1,
		goalDifference: 7,
		points: 9,
		fairPlayPoints: -2
	},
	AUTRICHE: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 6,
		goalsAgainst: 6,
		goalDifference: 0,
		points: 4,
		fairPlayPoints: -3
	},
	ALGERIE: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 5,
		goalsAgainst: 7,
		goalDifference: -2,
		points: 4,
		fairPlayPoints: -1
	},
	JORDANIE: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 3,
		goalsAgainst: 8,
		goalDifference: -5,
		points: 0,
		fairPlayPoints: -3
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_K = {
	COLOMBIE: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 4,
		goalsAgainst: 1,
		goalDifference: 3,
		points: 7,
		fairPlayPoints: -4
	},
	PORTUGAL: {
		played: 3,
		won: 1,
		drawn: 2,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 1,
		goalDifference: 5,
		points: 5,
		fairPlayPoints: -4
	},
	RDC: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 4,
		goalsAgainst: 3,
		goalDifference: 1,
		points: 4,
		fairPlayPoints: -4
	},
	OUZBEKISTAN: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 2,
		goalsAgainst: 11,
		goalDifference: -9,
		points: 0,
		fairPlayPoints: -4
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_L = {
	ANGLETERRE: {
		played: 3,
		won: 2,
		drawn: 1,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 2,
		goalDifference: 4,
		points: 7,
		fairPlayPoints: -2
	},
	CROATIE: {
		played: 3,
		won: 2,
		drawn: 0,
		lost: 1,
		goalsFor: 5,
		goalsAgainst: 5,
		goalDifference: 0,
		points: 6,
		fairPlayPoints: -2
	},
	GHANA: {
		played: 3,
		won: 1,
		drawn: 1,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 4,
		fairPlayPoints: -3
	},
	PANAMA: {
		played: 3,
		won: 0,
		drawn: 0,
		lost: 3,
		goalsFor: 0,
		goalsAgainst: 4,
		goalDifference: -4,
		points: 0,
		fairPlayPoints: -5
	}
} as const satisfies Record<string, PouleTeamStanding>;

export const POULES = {
	A: POULE_A,
	B: POULE_B,
	C: POULE_C,
	D: POULE_D,
	E: POULE_E,
	F: POULE_F,
	G: POULE_G,
	H: POULE_H,
	I: POULE_I,
	J: POULE_J,
	K: POULE_K,
	L: POULE_L
} as const satisfies Record<GroupId, Record<string, PouleTeamStanding>>;
