import { CONFEDERATIONS, type Nation } from '$lib/types/index.js';

export const NATIONS: Nation[] = [
  // CONCACAF (6)
  { code: 'ca', name: 'Canada', confederation: CONFEDERATIONS.CONCACAF, participation: 3, enabled: false },
  { code: 'cw', name: 'Curaçao', confederation: CONFEDERATIONS.CONCACAF, participation: 1, enabled: false },
  { code: 'ht', name: 'Haïti', confederation: CONFEDERATIONS.CONCACAF, participation: 2, enabled: false },
  { code: 'mx', name: 'Mexique', confederation: CONFEDERATIONS.CONCACAF, participation: 18, enabled: false },
  { code: 'pa', name: 'Panama', confederation: CONFEDERATIONS.CONCACAF, participation: 2, enabled: false },
  { code: 'us', name: 'États-Unis', confederation: CONFEDERATIONS.CONCACAF, participation: 12, enabled: false },

  // CONMEBOL (6)
  { code: 'ar', name: 'Argentine', confederation: CONFEDERATIONS.CONMEBOL, participation: 19, enabled: false },
  { code: 'br', name: 'Brésil', confederation: CONFEDERATIONS.CONMEBOL, participation: 23, enabled: false },
  { code: 'co', name: 'Colombie', confederation: CONFEDERATIONS.CONMEBOL, participation: 7, enabled: false },
  { code: 'ec', name: 'Équateur', confederation: CONFEDERATIONS.CONMEBOL, participation: 5, enabled: false },
  { code: 'py', name: 'Paraguay', confederation: CONFEDERATIONS.CONMEBOL, participation: 9, enabled: false },
  { code: 'uy', name: 'Uruguay', confederation: CONFEDERATIONS.CONMEBOL, participation: 15, enabled: false },

  // UEFA (16)
  { code: 'at', name: 'Autriche', confederation: CONFEDERATIONS.UEFA, participation: 8, enabled: false },
  { code: 'ba', name: 'Bosnie-Herzégovine', confederation: CONFEDERATIONS.UEFA, participation: 2, enabled: false },
  { code: 'be', name: 'Belgique', confederation: CONFEDERATIONS.UEFA, participation: 15, enabled: false },
  { code: 'ch', name: 'Suisse', confederation: CONFEDERATIONS.UEFA, participation: 13, enabled: false },
  { code: 'cz', name: 'Tchéquie', confederation: CONFEDERATIONS.UEFA, participation: 2, enabled: false },
  { code: 'de', name: 'Allemagne', confederation: CONFEDERATIONS.UEFA, participation: 21, enabled: false },
  { code: 'es', name: 'Espagne', confederation: CONFEDERATIONS.UEFA, participation: 17, enabled: false },
  { code: 'fr', name: 'France', confederation: CONFEDERATIONS.UEFA, participation: 17, enabled: false },
  { code: 'gb-eng', name: 'Angleterre', confederation: CONFEDERATIONS.UEFA, participation: 17, enabled: false },
  { code: 'gb-sct', name: 'Écosse', confederation: CONFEDERATIONS.UEFA, participation: 9, enabled: false },
  { code: 'hr', name: 'Croatie', confederation: CONFEDERATIONS.UEFA, participation: 7, enabled: false },
  { code: 'nl', name: 'Pays-Bas', confederation: CONFEDERATIONS.UEFA, participation: 12, enabled: false },
  { code: 'no', name: 'Norvège', confederation: CONFEDERATIONS.UEFA, participation: 4, enabled: false },
  { code: 'pt', name: 'Portugal', confederation: CONFEDERATIONS.UEFA, participation: 9, enabled: false },
  { code: 'se', name: 'Suède', confederation: CONFEDERATIONS.UEFA, participation: 13, enabled: false },
  { code: 'tr', name: 'Turquie', confederation: CONFEDERATIONS.UEFA, participation: 3, enabled: false },

  // CAF (10)
  { code: 'cd', name: 'République démocratique du Congo', confederation: CONFEDERATIONS.CAF, participation: 2, enabled: false },
  { code: 'ci', name: "Côte d'Ivoire", confederation: CONFEDERATIONS.CAF, participation: 4, enabled: false },
  { code: 'cv', name: 'Cap-Vert', confederation: CONFEDERATIONS.CAF, participation: 1, enabled: false },
  { code: 'dz', name: 'Algérie', confederation: CONFEDERATIONS.CAF, participation: 5, enabled: false },
  { code: 'eg', name: 'Égypte', confederation: CONFEDERATIONS.CAF, participation: 4, enabled: false },
  { code: 'gh', name: 'Ghana', confederation: CONFEDERATIONS.CAF, participation: 5, enabled: false },
  { code: 'ma', name: 'Maroc', confederation: CONFEDERATIONS.CAF, participation: 7, enabled: false },
  { code: 'sn', name: 'Sénégal', confederation: CONFEDERATIONS.CAF, participation: 4, enabled: false },
  { code: 'tn', name: 'Tunisie', confederation: CONFEDERATIONS.CAF, participation: 7, enabled: false },
  { code: 'za', name: 'Afrique du Sud', confederation: CONFEDERATIONS.CAF, participation: 4, enabled: false },

  // AFC (9)
  { code: 'au', name: 'Australie', confederation: CONFEDERATIONS.AFC, participation: 7, enabled: false },
  { code: 'iq', name: 'Irak', confederation: CONFEDERATIONS.AFC, participation: 2, enabled: false },
  { code: 'ir', name: 'Iran', confederation: CONFEDERATIONS.AFC, participation: 7, enabled: false },
  { code: 'jo', name: 'Jordanie', confederation: CONFEDERATIONS.AFC, participation: 1, enabled: false },
  { code: 'jp', name: 'Japon', confederation: CONFEDERATIONS.AFC, participation: 8, enabled: false },
  { code: 'kr', name: 'Corée du Sud', confederation: CONFEDERATIONS.AFC, participation: 12, enabled: false },
  { code: 'qa', name: 'Qatar', confederation: CONFEDERATIONS.AFC, participation: 2, enabled: false },
  { code: 'sa', name: 'Arabie saoudite', confederation: CONFEDERATIONS.AFC, participation: 7, enabled: false },
  { code: 'uz', name: 'Ouzbékistan', confederation: CONFEDERATIONS.AFC, participation: 1, enabled: false },

  // OFC (1)
  { code: 'nz', name: 'Nouvelle-Zélande', confederation: CONFEDERATIONS.OFC, participation: 3, enabled: false },
];
