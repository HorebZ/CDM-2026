import { CONFEDERATIONS, type Nation } from '$lib/types/index.js';
import { createIdMap } from '$lib/utils/ids';

export const NATIONS: Record<string, Nation> = {
	// CONCACAF (6)
	CANADA: {
		code: 'ca',
		name: 'Canada',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 3,
		enabled: false
	},
	CURACAO: {
		code: 'cw',
		name: 'Curaçao',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 1,
		enabled: false
	},
	HAITI: {
		code: 'ht',
		name: 'Haïti',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 2,
		enabled: false
	},
	MEXIQUE: {
		code: 'mx',
		name: 'Mexique',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 18,
		enabled: false
	},
	PANAMA: {
		code: 'pa',
		name: 'Panama',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 2,
		enabled: false
	},
	USA: {
		code: 'us',
		name: 'États-Unis',
		confederation: CONFEDERATIONS.CONCACAF,
		participation: 12,
		enabled: false
	},

	// CONMEBOL (6)
	ARGENTINE: {
		code: 'ar',
		name: 'Argentine',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 19,
		enabled: false
	},
	BRESIL: {
		code: 'br',
		name: 'Brésil',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 23,
		enabled: false
	},
	COLOMBIE: {
		code: 'co',
		name: 'Colombie',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 7,
		enabled: false
	},
	EQUATEUR: {
		code: 'ec',
		name: 'Équateur',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 5,
		enabled: false
	},
	PARAGUAY: {
		code: 'py',
		name: 'Paraguay',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 9,
		enabled: false
	},
	URUGUAY: {
		code: 'uy',
		name: 'Uruguay',
		confederation: CONFEDERATIONS.CONMEBOL,
		participation: 15,
		enabled: false
	},

	// UEFA (16)
	AUTRICHE: {
		code: 'at',
		name: 'Autriche',
		confederation: CONFEDERATIONS.UEFA,
		participation: 8,
		enabled: false
	},
	BOSNIE: {
		code: 'ba',
		name: 'Bosnie-Herzégovine',
		confederation: CONFEDERATIONS.UEFA,
		participation: 2,
		enabled: false
	},
	BELGIQUE: {
		code: 'be',
		name: 'Belgique',
		confederation: CONFEDERATIONS.UEFA,
		participation: 15,
		enabled: false
	},
	SUISSE: {
		code: 'ch',
		name: 'Suisse',
		confederation: CONFEDERATIONS.UEFA,
		participation: 13,
		enabled: false
	},
	TCHEQUIE: {
		code: 'cz',
		name: 'Tchéquie',
		confederation: CONFEDERATIONS.UEFA,
		participation: 2,
		enabled: false
	},
	ALLEMAGNE: {
		code: 'de',
		name: 'Allemagne',
		confederation: CONFEDERATIONS.UEFA,
		participation: 21,
		enabled: false
	},
	ESPAGNE: {
		code: 'es',
		name: 'Espagne',
		confederation: CONFEDERATIONS.UEFA,
		participation: 17,
		enabled: false
	},
	FRANCE: {
		code: 'fr',
		name: 'France',
		confederation: CONFEDERATIONS.UEFA,
		participation: 17,
		enabled: false
	},
	ANGLETERRE: {
		code: 'gb-eng',
		name: 'Angleterre',
		confederation: CONFEDERATIONS.UEFA,
		participation: 17,
		enabled: false
	},
	ECOSSE: {
		code: 'gb-sct',
		name: 'Écosse',
		confederation: CONFEDERATIONS.UEFA,
		participation: 9,
		enabled: false
	},
	CROATIE: {
		code: 'hr',
		name: 'Croatie',
		confederation: CONFEDERATIONS.UEFA,
		participation: 7,
		enabled: false
	},
	PAYS_BAS: {
		code: 'nl',
		name: 'Pays-Bas',
		confederation: CONFEDERATIONS.UEFA,
		participation: 12,
		enabled: false
	},
	NORVEGE: {
		code: 'no',
		name: 'Norvège',
		confederation: CONFEDERATIONS.UEFA,
		participation: 4,
		enabled: false
	},
	PORTUGAL: {
		code: 'pt',
		name: 'Portugal',
		confederation: CONFEDERATIONS.UEFA,
		participation: 9,
		enabled: false
	},
	SUEDE: {
		code: 'se',
		name: 'Suède',
		confederation: CONFEDERATIONS.UEFA,
		participation: 13,
		enabled: false
	},
	TURQUIE: {
		code: 'tr',
		name: 'Turquie',
		confederation: CONFEDERATIONS.UEFA,
		participation: 3,
		enabled: false
	},

	// CAF (10)
	RDC: {
		code: 'cd',
		name: 'République démocratique du Congo',
		confederation: CONFEDERATIONS.CAF,
		participation: 2,
		enabled: false
	},
	COTE_IVOIRE: {
		code: 'ci',
		name: "Côte d'Ivoire",
		confederation: CONFEDERATIONS.CAF,
		participation: 4,
		enabled: false
	},
	CAP_VERT: {
		code: 'cv',
		name: 'Cap-Vert',
		confederation: CONFEDERATIONS.CAF,
		participation: 1,
		enabled: false
	},
	ALGERIE: {
		code: 'dz',
		name: 'Algérie',
		confederation: CONFEDERATIONS.CAF,
		participation: 5,
		enabled: false
	},
	EGYPTE: {
		code: 'eg',
		name: 'Égypte',
		confederation: CONFEDERATIONS.CAF,
		participation: 4,
		enabled: false
	},
	GHANA: {
		code: 'gh',
		name: 'Ghana',
		confederation: CONFEDERATIONS.CAF,
		participation: 5,
		enabled: false
	},
	MAROC: {
		code: 'ma',
		name: 'Maroc',
		confederation: CONFEDERATIONS.CAF,
		participation: 7,
		enabled: false
	},
	SENEGAL: {
		code: 'sn',
		name: 'Sénégal',
		confederation: CONFEDERATIONS.CAF,
		participation: 4,
		enabled: false
	},
	TUNISIE: {
		code: 'tn',
		name: 'Tunisie',
		confederation: CONFEDERATIONS.CAF,
		participation: 7,
		enabled: false
	},
	AFRIQUE_DU_SUD: {
		code: 'za',
		name: 'Afrique du Sud',
		confederation: CONFEDERATIONS.CAF,
		participation: 4,
		enabled: false
	},

	// AFC (9)
	AUSTRALIE: {
		code: 'au',
		name: 'Australie',
		confederation: CONFEDERATIONS.AFC,
		participation: 7,
		enabled: false
	},
	IRAK: {
		code: 'iq',
		name: 'Irak',
		confederation: CONFEDERATIONS.AFC,
		participation: 2,
		enabled: false
	},
	IRAN: {
		code: 'ir',
		name: 'Iran',
		confederation: CONFEDERATIONS.AFC,
		participation: 7,
		enabled: false
	},
	JORDANIE: {
		code: 'jo',
		name: 'Jordanie',
		confederation: CONFEDERATIONS.AFC,
		participation: 1,
		enabled: false
	},
	JAPON: {
		code: 'jp',
		name: 'Japon',
		confederation: CONFEDERATIONS.AFC,
		participation: 8,
		enabled: false
	},
	COREE_DU_SUD: {
		code: 'kr',
		name: 'Corée du Sud',
		confederation: CONFEDERATIONS.AFC,
		participation: 12,
		enabled: false
	},
	QATAR: {
		code: 'qa',
		name: 'Qatar',
		confederation: CONFEDERATIONS.AFC,
		participation: 2,
		enabled: false
	},
	ARABIE_SAOUDITE: {
		code: 'sa',
		name: 'Arabie saoudite',
		confederation: CONFEDERATIONS.AFC,
		participation: 7,
		enabled: false
	},
	OUZBEKISTAN: {
		code: 'uz',
		name: 'Ouzbékistan',
		confederation: CONFEDERATIONS.AFC,
		participation: 1,
		enabled: false
	},

	// OFC (1)
	NEW_ZEALAND: {
		code: 'nz',
		name: 'Nouvelle-Zélande',
		confederation: CONFEDERATIONS.OFC,
		participation: 3,
		enabled: false
	}
};

export type NationId = keyof typeof NATIONS;
export const NATION_IDS = createIdMap(NATIONS);
