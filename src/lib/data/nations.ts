import type { Nation } from '$lib/types/index.js';

export const NATIONS: Nation[] = [
  // CONCACAF (6)
  { code: 'us', name: 'États-Unis', enabled: false },
  { code: 'ca', name: 'Canada', enabled: false },
  { code: 'mx', name: 'Mexique', enabled: false },
  { code: 'pa', name: 'Panama', enabled: false },
  { code: 'ht', name: 'Haïti', enabled: false },
  { code: 'cw', name: 'Curaçao', enabled: false },

  // CONMEBOL (6)
  { code: 'ar', name: 'Argentine', enabled: false },
  { code: 'br', name: 'Brésil', enabled: false },
  { code: 'uy', name: 'Uruguay', enabled: false },
  { code: 'ec', name: 'Équateur', enabled: false },
  { code: 'co', name: 'Colombie', enabled: false },
  { code: 'py', name: 'Paraguay', enabled: false },

  // UEFA (16)
  { code: 'gb-eng', name: 'Angleterre', enabled: false },
  { code: 'fr', name: 'France', enabled: false },
  { code: 'hr', name: 'Croatie', enabled: false },
  { code: 'pt', name: 'Portugal', enabled: false },
  { code: 'no', name: 'Norvège', enabled: false },
  { code: 'de', name: 'Allemagne', enabled: false },
  { code: 'nl', name: 'Pays-Bas', enabled: false },
  { code: 'es', name: 'Espagne', enabled: false },
  { code: 'gb-sct', name: 'Écosse', enabled: false },
  { code: 'ch', name: 'Suisse', enabled: false },
  { code: 'at', name: 'Autriche', enabled: false },
  { code: 'be', name: 'Belgique', enabled: false },
  { code: 'se', name: 'Suède', enabled: false },
  { code: 'tr', name: 'Turquie', enabled: false },
  { code: 'cz', name: 'Tchéquie', enabled: false },
  { code: 'ba', name: 'Bosnie-Herzégovine', enabled: false },

  // CAF (10)
  { code: 'ma', name: 'Maroc', enabled: false },
  { code: 'tn', name: 'Tunisie', enabled: false },
  { code: 'eg', name: 'Égypte', enabled: false },
  { code: 'dz', name: 'Algérie', enabled: false },
  { code: 'gh', name: 'Ghana', enabled: false },
  { code: 'cv', name: 'Cap-Vert', enabled: false },
  { code: 'za', name: 'Afrique du Sud', enabled: false },
  { code: 'sn', name: 'Sénégal', enabled: false },
  { code: 'ci', name: "Côte d'Ivoire", enabled: false },
  { code: 'cd', name: 'République démocratique du Congo', enabled: false },

  // AFC (9)
  { code: 'jp', name: 'Japon', enabled: false },
  { code: 'ir', name: 'Iran', enabled: false },
  { code: 'uz', name: 'Ouzbékistan', enabled: false },
  { code: 'jo', name: 'Jordanie', enabled: false },
  { code: 'kr', name: 'Corée du Sud', enabled: false },
  { code: 'au', name: 'Australie', enabled: false },
  { code: 'qa', name: 'Qatar', enabled: false },
  { code: 'sa', name: 'Arabie saoudite', enabled: false },
  { code: 'iq', name: 'Irak', enabled: false },

  // OFC (1)
  { code: 'nz', name: 'Nouvelle-Zélande', enabled: false },
];
