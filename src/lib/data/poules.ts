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
	EGYPTE: {
		played: 2,
		won: 1,
		drawn: 1,
		lost: 0,
		goalsFor: 4,
		goalsAgainst: 2,
		goalDifference: 2,
		points: 4,
		fairPlayPoints: 0
	},
	IRAN: {
		played: 2,
		won: 0,
		drawn: 2,
		lost: 0,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 2,
		fairPlayPoints: 0
	},
	BELGIQUE: {
		played: 2,
		won: 0,
		drawn: 2,
		lost: 0,
		goalsFor: 1,
		goalsAgainst: 1,
		goalDifference: 0,
		points: 2,
		fairPlayPoints: -3
	},
	NEW_ZEALAND: {
		played: 2,
		won: 0,
		drawn: 1,
		lost: 1,
		goalsFor: 3,
		goalsAgainst: 5,
		goalDifference: -2,
		points: 1,
		fairPlayPoints: 0
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_H = {
	ESPAGNE: {
		played: 2,
		won: 1,
		drawn: 1,
		lost: 0,
		goalsFor: 4,
		goalsAgainst: 0,
		goalDifference: 4,
		points: 4,
		fairPlayPoints: 0
	},
	URUGUAY: {
		played: 2,
		won: 0,
		drawn: 2,
		lost: 0,
		goalsFor: 3,
		goalsAgainst: 3,
		goalDifference: 0,
		points: 2,
		fairPlayPoints: 0
	},
	CAP_VERT: {
		played: 2,
		won: 0,
		drawn: 2,
		lost: 0,
		goalsFor: 2,
		goalsAgainst: 2,
		goalDifference: 0,
		points: 2,
		fairPlayPoints: 0
	},
	ARABIE_SAOUDITE: {
		played: 2,
		won: 0,
		drawn: 1,
		lost: 1,
		goalsFor: 1,
		goalsAgainst: 5,
		goalDifference: -4,
		points: 1,
		fairPlayPoints: 0
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
		played: 2,
		won: 2,
		drawn: 0,
		lost: 0,
		goalsFor: 5,
		goalsAgainst: 0,
		goalDifference: 5,
		points: 6,
		fairPlayPoints: 0
	},
	AUTRICHE: {
		played: 2,
		won: 1,
		drawn: 0,
		lost: 1,
		goalsFor: 3,
		goalsAgainst: 3,
		goalDifference: 0,
		points: 3,
		fairPlayPoints: 0
	},
	ALGERIE: {
		played: 2,
		won: 1,
		drawn: 0,
		lost: 1,
		goalsFor: 2,
		goalsAgainst: 4,
		goalDifference: -2,
		points: 3,
		fairPlayPoints: 0
	},
	JORDANIE: {
		played: 2,
		won: 0,
		drawn: 0,
		lost: 2,
		goalsFor: 2,
		goalsAgainst: 5,
		goalDifference: -3,
		points: 0,
		fairPlayPoints: 0
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_K = {
	COLOMBIE: {
		played: 2,
		won: 2,
		drawn: 0,
		lost: 0,
		goalsFor: 4,
		goalsAgainst: 1,
		goalDifference: 3,
		points: 6,
		fairPlayPoints: 0
	},
	PORTUGAL: {
		played: 2,
		won: 1,
		drawn: 1,
		lost: 0,
		goalsFor: 6,
		goalsAgainst: 1,
		goalDifference: 5,
		points: 4,
		fairPlayPoints: 0
	},
	RDC: {
		played: 2,
		won: 0,
		drawn: 1,
		lost: 1,
		goalsFor: 1,
		goalsAgainst: 2,
		goalDifference: -1,
		points: 1,
		fairPlayPoints: 0
	},
	OUZBEKISTAN: {
		played: 2,
		won: 0,
		drawn: 0,
		lost: 2,
		goalsFor: 1,
		goalsAgainst: 8,
		goalDifference: -7,
		points: 0,
		fairPlayPoints: 0
	}
} as const satisfies Record<string, PouleTeamStanding>;

const POULE_L = {
	ANGLETERRE: {
		played: 2,
		won: 1,
		drawn: 1,
		lost: 0,
		goalsFor: 4,
		goalsAgainst: 2,
		goalDifference: 2,
		points: 4,
		fairPlayPoints: 0
	},
	GHANA: {
		played: 2,
		won: 1,
		drawn: 1,
		lost: 0,
		goalsFor: 1,
		goalsAgainst: 0,
		goalDifference: 1,
		points: 4,
		fairPlayPoints: 0
	},
	CROATIE: {
		played: 2,
		won: 1,
		drawn: 0,
		lost: 1,
		goalsFor: 3,
		goalsAgainst: 4,
		goalDifference: -1,
		points: 3,
		fairPlayPoints: 0
	},
	PANAMA: {
		played: 2,
		won: 0,
		drawn: 0,
		lost: 2,
		goalsFor: 0,
		goalsAgainst: 2,
		goalDifference: -2,
		points: 0,
		fairPlayPoints: 0
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
