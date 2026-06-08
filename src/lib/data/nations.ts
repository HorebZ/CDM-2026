import { CONFEDERATIONS, type Nation } from '$lib/types/index.js';
import { createIdMap } from '$lib/utils/ids';

const GROUP_A = {
	MEXIQUE: {
		code: 'mx',
		name: 'Mexique',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'A',
		participation: 18,
		enabled: true
	},
	COREE_DU_SUD: {
		code: 'kr',
		name: 'Corée du Sud',
		confederation: CONFEDERATIONS.AFC,
		group: 'A',
		participation: 12,
		enabled: true
	},
	AFRIQUE_DU_SUD: {
		code: 'za',
		name: 'Afrique du Sud',
		confederation: CONFEDERATIONS.CAF,
		group: 'A',
		participation: 4,
		enabled: true
	},
	TCHEQUIE: {
		code: 'cz',
		name: 'Tchéquie',
		confederation: CONFEDERATIONS.UEFA,
		group: 'A',
		participation: 2,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_B = {
	CANADA: {
		code: 'ca',
		name: 'Canada',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'B',
		participation: 3,
		enabled: true
	},
	SUISSE: {
		code: 'ch',
		name: 'Suisse',
		confederation: CONFEDERATIONS.UEFA,
		group: 'B',
		participation: 13,
		enabled: true
	},
	QATAR: {
		code: 'qa',
		name: 'Qatar',
		confederation: CONFEDERATIONS.AFC,
		group: 'B',
		participation: 2,
		enabled: true
	},
	BOSNIE: {
		code: 'ba',
		name: 'Bosnie-Herzégovine',
		confederation: CONFEDERATIONS.UEFA,
		group: 'B',
		participation: 2,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_C = {
	BRESIL: {
		code: 'br',
		name: 'Brésil',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'C',
		participation: 23,
		enabled: true
	},
	MAROC: {
		code: 'ma',
		name: 'Maroc',
		confederation: CONFEDERATIONS.CAF,
		group: 'C',
		participation: 7,
		enabled: true
	},
	ECOSSE: {
		code: 'gb-sct',
		name: 'Écosse',
		confederation: CONFEDERATIONS.UEFA,
		group: 'C',
		participation: 9,
		enabled: true
	},
	HAITI: {
		code: 'ht',
		name: 'Haïti',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'C',
		participation: 2,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_D = {
	USA: {
		code: 'us',
		name: 'États-Unis',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'D',
		participation: 12,
		enabled: true
	},
	AUSTRALIE: {
		code: 'au',
		name: 'Australie',
		confederation: CONFEDERATIONS.AFC,
		group: 'D',
		participation: 7,
		enabled: true
	},
	PARAGUAY: {
		code: 'py',
		name: 'Paraguay',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'D',
		participation: 9,
		enabled: true
	},
	TURQUIE: {
		code: 'tr',
		name: 'Turquie',
		confederation: CONFEDERATIONS.UEFA,
		group: 'D',
		participation: 3,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_E = {
	ALLEMAGNE: {
		code: 'de',
		name: 'Allemagne',
		confederation: CONFEDERATIONS.UEFA,
		group: 'E',
		participation: 21,
		enabled: true
	},
	EQUATEUR: {
		code: 'ec',
		name: 'Équateur',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'E',
		participation: 5,
		enabled: true
	},
	COTE_IVOIRE: {
		code: 'ci',
		name: "Côte d'Ivoire",
		confederation: CONFEDERATIONS.CAF,
		group: 'E',
		participation: 4,
		enabled: true
	},
	CURACAO: {
		code: 'cw',
		name: 'Curaçao',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'E',
		participation: 1,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_F = {
	PAYS_BAS: {
		code: 'nl',
		name: 'Pays-Bas',
		confederation: CONFEDERATIONS.UEFA,
		group: 'F',
		participation: 12,
		enabled: true
	},
	JAPON: {
		code: 'jp',
		name: 'Japon',
		confederation: CONFEDERATIONS.AFC,
		group: 'F',
		participation: 8,
		enabled: true
	},
	TUNISIE: {
		code: 'tn',
		name: 'Tunisie',
		confederation: CONFEDERATIONS.CAF,
		group: 'F',
		participation: 7,
		enabled: true
	},
	SUEDE: {
		code: 'se',
		name: 'Suède',
		confederation: CONFEDERATIONS.UEFA,
		group: 'F',
		participation: 13,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_G = {
	BELGIQUE: {
		code: 'be',
		name: 'Belgique',
		confederation: CONFEDERATIONS.UEFA,
		group: 'G',
		participation: 15,
		enabled: true
	},
	IRAN: {
		code: 'ir',
		name: 'Iran',
		confederation: CONFEDERATIONS.AFC,
		group: 'G',
		participation: 7,
		enabled: true
	},
	EGYPTE: {
		code: 'eg',
		name: 'Égypte',
		confederation: CONFEDERATIONS.CAF,
		group: 'G',
		participation: 4,
		enabled: true
	},
	NEW_ZEALAND: {
		code: 'nz',
		name: 'Nouvelle-Zélande',
		confederation: CONFEDERATIONS.OFC,
		group: 'G',
		participation: 3,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_H = {
	ESPAGNE: {
		code: 'es',
		name: 'Espagne',
		confederation: CONFEDERATIONS.UEFA,
		group: 'H',
		participation: 17,
		enabled: true
	},
	URUGUAY: {
		code: 'uy',
		name: 'Uruguay',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'H',
		participation: 15,
		enabled: true
	},
	ARABIE_SAOUDITE: {
		code: 'sa',
		name: 'Arabie saoudite',
		confederation: CONFEDERATIONS.AFC,
		group: 'H',
		participation: 7,
		enabled: true
	},
	CAP_VERT: {
		code: 'cv',
		name: 'Cap-Vert',
		confederation: CONFEDERATIONS.CAF,
		group: 'H',
		participation: 1,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_I = {
	FRANCE: {
		code: 'fr',
		name: 'France',
		confederation: CONFEDERATIONS.UEFA,
		group: 'I',
		participation: 17,
		enabled: true
	},
	SENEGAL: {
		code: 'sn',
		name: 'Sénégal',
		confederation: CONFEDERATIONS.CAF,
		group: 'I',
		participation: 4,
		enabled: true
	},
	NORVEGE: {
		code: 'no',
		name: 'Norvège',
		confederation: CONFEDERATIONS.UEFA,
		group: 'I',
		participation: 4,
		enabled: true
	},
	IRAK: {
		code: 'iq',
		name: 'Irak',
		confederation: CONFEDERATIONS.AFC,
		group: 'I',
		participation: 2,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_J = {
	ARGENTINE: {
		code: 'ar',
		name: 'Argentine',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'J',
		participation: 19,
		enabled: true
	},
	AUTRICHE: {
		code: 'at',
		name: 'Autriche',
		confederation: CONFEDERATIONS.UEFA,
		group: 'J',
		participation: 8,
		enabled: true
	},
	ALGERIE: {
		code: 'dz',
		name: 'Algérie',
		confederation: CONFEDERATIONS.CAF,
		group: 'J',
		participation: 5,
		enabled: true
	},
	JORDANIE: {
		code: 'jo',
		name: 'Jordanie',
		confederation: CONFEDERATIONS.AFC,
		group: 'J',
		participation: 1,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_K = {
	PORTUGAL: {
		code: 'pt',
		name: 'Portugal',
		confederation: CONFEDERATIONS.UEFA,
		group: 'K',
		participation: 9,
		enabled: true
	},
	COLOMBIE: {
		code: 'co',
		name: 'Colombie',
		confederation: CONFEDERATIONS.CONMEBOL,
		group: 'K',
		participation: 7,
		enabled: true
	},
	OUZBEKISTAN: {
		code: 'uz',
		name: 'Ouzbékistan',
		confederation: CONFEDERATIONS.AFC,
		group: 'K',
		participation: 1,
		enabled: true
	},
	RDC: {
		code: 'cd',
		name: 'République démocratique du Congo',
		confederation: CONFEDERATIONS.CAF,
		group: 'K',
		participation: 2,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

const GROUP_L = {
	ANGLETERRE: {
		code: 'gb-eng',
		name: 'Angleterre',
		confederation: CONFEDERATIONS.UEFA,
		group: 'L',
		participation: 17,
		enabled: true
	},
	CROATIE: {
		code: 'hr',
		name: 'Croatie',
		confederation: CONFEDERATIONS.UEFA,
		group: 'L',
		participation: 7,
		enabled: true
	},
	PANAMA: {
		code: 'pa',
		name: 'Panama',
		confederation: CONFEDERATIONS.CONCACAF,
		group: 'L',
		participation: 2,
		enabled: true
	},
	GHANA: {
		code: 'gh',
		name: 'Ghana',
		confederation: CONFEDERATIONS.CAF,
		group: 'L',
		participation: 5,
		enabled: true
	}
} as const satisfies Record<string, Nation>;

export const NATIONS = {
	...GROUP_A,
	...GROUP_B,
	...GROUP_C,
	...GROUP_D,
	...GROUP_E,
	...GROUP_F,
	...GROUP_G,
	...GROUP_H,
	...GROUP_I,
	...GROUP_J,
	...GROUP_K,
	...GROUP_L
} as const satisfies Record<string, Nation>;

export type NationId = keyof typeof NATIONS;
export const NATION_IDS = createIdMap(NATIONS);
