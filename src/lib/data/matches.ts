import type { Match } from '$lib/types/index.js';
import { STADIUM_IDS } from './stadiums';
import { NATION_IDS } from './nations';

const GROUP_MATCHES_A: Match[] = [
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-11T13:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		sides: [
			{
				nationId: NATION_IDS.MEXIQUE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AFRIQUE_DU_SUD,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-11T20:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		sides: [
			{
				nationId: NATION_IDS.COREE_DU_SUD,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.TCHEQUIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-18T12:00:00',
		stadiumId: STADIUM_IDS.ATLANTA,
		sides: [
			{
				nationId: NATION_IDS.TCHEQUIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AFRIQUE_DU_SUD,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-18T19:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		sides: [
			{
				nationId: NATION_IDS.MEXIQUE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.COREE_DU_SUD,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-24T19:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		sides: [
			{
				nationId: NATION_IDS.TCHEQUIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.MEXIQUE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-24T19:00:00',
		stadiumId: STADIUM_IDS.MONTERREY,
		sides: [
			{
				nationId: NATION_IDS.AFRIQUE_DU_SUD,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.COREE_DU_SUD,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_B: Match[] = [
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-12T15:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.CANADA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.BOSNIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-13T12:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.QATAR,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.SUISSE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-18T12:00:00',
		stadiumId: STADIUM_IDS.LOS_ANGELES,
		sides: [
			{
				nationId: NATION_IDS.SUISSE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.BOSNIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-18T18:00:00',
		stadiumId: STADIUM_IDS.VANCOUVER,
		sides: [
			{
				nationId: NATION_IDS.CANADA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.QATAR,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-24T12:00:00',
		stadiumId: STADIUM_IDS.VANCOUVER,
		sides: [
			{
				nationId: NATION_IDS.SUISSE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CANADA,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-24T15:00:00',
		stadiumId: STADIUM_IDS.SEATTLE,
		sides: [
			{
				nationId: NATION_IDS.BOSNIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.QATAR,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_C: Match[] = [
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-13T18:00:00',
		stadiumId: STADIUM_IDS.NEW_YORK,
		sides: [
			{
				nationId: NATION_IDS.BRESIL,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.MAROC,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-13T21:00:00',
		stadiumId: STADIUM_IDS.BOSTON,
		sides: [
			{
				nationId: NATION_IDS.HAITI,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ECOSSE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-19T18:00:00',
		stadiumId: STADIUM_IDS.BOSTON,
		sides: [
			{
				nationId: NATION_IDS.ECOSSE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.MAROC,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-19T20:30:00',
		stadiumId: STADIUM_IDS.PHILADELPHIE,
		sides: [
			{
				nationId: NATION_IDS.BRESIL,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.HAITI,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-24T18:00:00',
		stadiumId: STADIUM_IDS.MIAMI,
		sides: [
			{
				nationId: NATION_IDS.ECOSSE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.BRESIL,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'C',
		localDate: '2026-06-24T18:00:00',
		stadiumId: STADIUM_IDS.ATLANTA,
		sides: [
			{
				nationId: NATION_IDS.MAROC,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.HAITI,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_D: Match[] = [
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-12T18:00:00',
		stadiumId: STADIUM_IDS.LOS_ANGELES,
		sides: [
			{
				nationId: NATION_IDS.USA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.PARAGUAY,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-13T21:00:00',
		stadiumId: STADIUM_IDS.VANCOUVER,
		sides: [
			{
				nationId: NATION_IDS.AUSTRALIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.TURQUIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-19T20:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.TURQUIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.PARAGUAY,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-19T12:00:00',
		stadiumId: STADIUM_IDS.SEATTLE,
		sides: [
			{
				nationId: NATION_IDS.USA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AUSTRALIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-25T19:00:00',
		stadiumId: STADIUM_IDS.LOS_ANGELES,
		sides: [
			{
				nationId: NATION_IDS.TURQUIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.USA,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'D',
		localDate: '2026-06-25T19:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.PARAGUAY,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AUSTRALIE,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_E: Match[] = [
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-14T12:00:00',
		stadiumId: STADIUM_IDS.HOUSTON,
		sides: [
			{
				nationId: NATION_IDS.ALLEMAGNE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CURACAO,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-14T19:00:00',
		stadiumId: STADIUM_IDS.PHILADELPHIE,
		sides: [
			{
				nationId: NATION_IDS.COTE_IVOIRE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.EQUATEUR,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-20T16:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.ALLEMAGNE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.COTE_IVOIRE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-20T19:00:00',
		stadiumId: STADIUM_IDS.KANSAS_CITY,
		sides: [
			{
				nationId: NATION_IDS.EQUATEUR,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CURACAO,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-25T16:00:00',
		stadiumId: STADIUM_IDS.NEW_YORK,
		sides: [
			{
				nationId: NATION_IDS.EQUATEUR,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ALLEMAGNE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'E',
		localDate: '2026-06-25T16:00:00',
		stadiumId: STADIUM_IDS.PHILADELPHIE,
		sides: [
			{
				nationId: NATION_IDS.CURACAO,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.COTE_IVOIRE,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_F: Match[] = [
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-14T15:00:00',
		stadiumId: STADIUM_IDS.ARLINGTON,
		sides: [
			{
				nationId: NATION_IDS.PAYS_BAS,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.JAPON,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-14T20:00:00',
		stadiumId: STADIUM_IDS.MONTERREY,
		sides: [
			{
				nationId: NATION_IDS.SUEDE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.TUNISIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-20T12:00:00',
		stadiumId: STADIUM_IDS.HOUSTON,
		sides: [
			{
				nationId: NATION_IDS.PAYS_BAS,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.SUEDE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-20T22:00:00',
		stadiumId: STADIUM_IDS.MONTERREY,
		sides: [
			{
				nationId: NATION_IDS.TUNISIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.JAPON,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-25T18:00:00',
		stadiumId: STADIUM_IDS.ARLINGTON,
		sides: [
			{
				nationId: NATION_IDS.JAPON,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.SUEDE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'F',
		localDate: '2026-06-25T18:00:00',
		stadiumId: STADIUM_IDS.KANSAS_CITY,
		sides: [
			{
				nationId: NATION_IDS.TUNISIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.PAYS_BAS,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_G: Match[] = [
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-15T18:00:00',
		stadiumId: STADIUM_IDS.LOS_ANGELES,
		sides: [
			{
				nationId: NATION_IDS.IRAN,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.NEW_ZEALAND,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-15T12:00:00',
		stadiumId: STADIUM_IDS.SEATTLE,
		sides: [
			{
				nationId: NATION_IDS.BELGIQUE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.EGYPTE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-21T12:00:00',
		stadiumId: STADIUM_IDS.LOS_ANGELES,
		sides: [
			{
				nationId: NATION_IDS.BELGIQUE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.IRAN,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-21T18:00:00',
		stadiumId: STADIUM_IDS.VANCOUVER,
		sides: [
			{
				nationId: NATION_IDS.NEW_ZEALAND,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.EGYPTE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-26T20:00:00',
		stadiumId: STADIUM_IDS.SEATTLE,
		sides: [
			{
				nationId: NATION_IDS.EGYPTE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.IRAN,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'G',
		localDate: '2026-06-26T20:00:00',
		stadiumId: STADIUM_IDS.VANCOUVER,
		sides: [
			{
				nationId: NATION_IDS.NEW_ZEALAND,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.BELGIQUE,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_H: Match[] = [
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-15T12:00:00',
		stadiumId: STADIUM_IDS.ATLANTA,
		sides: [
			{
				nationId: NATION_IDS.ESPAGNE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CAP_VERT,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-15T18:00:00',
		stadiumId: STADIUM_IDS.MIAMI,
		sides: [
			{
				nationId: NATION_IDS.ARABIE_SAOUDITE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.URUGUAY,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-21T12:00:00',
		stadiumId: STADIUM_IDS.ATLANTA,
		sides: [
			{
				nationId: NATION_IDS.ESPAGNE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ARABIE_SAOUDITE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-21T18:00:00',
		stadiumId: STADIUM_IDS.MIAMI,
		sides: [
			{
				nationId: NATION_IDS.URUGUAY,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CAP_VERT,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-26T19:00:00',
		stadiumId: STADIUM_IDS.HOUSTON,
		sides: [
			{
				nationId: NATION_IDS.CAP_VERT,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ARABIE_SAOUDITE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'H',
		localDate: '2026-06-26T18:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		sides: [
			{
				nationId: NATION_IDS.URUGUAY,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ESPAGNE,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_I: Match[] = [
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-16T15:00:00',
		stadiumId: STADIUM_IDS.NEW_YORK,
		sides: [
			{
				nationId: NATION_IDS.FRANCE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.SENEGAL,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-16T18:00:00',
		stadiumId: STADIUM_IDS.BOSTON,
		sides: [
			{
				nationId: NATION_IDS.IRAK,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.NORVEGE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-22T17:00:00',
		stadiumId: STADIUM_IDS.PHILADELPHIE,
		sides: [
			{
				nationId: NATION_IDS.FRANCE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.IRAK,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-22T20:00:00',
		stadiumId: STADIUM_IDS.NEW_YORK,
		sides: [
			{
				nationId: NATION_IDS.NORVEGE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.SENEGAL,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-26T15:00:00',
		stadiumId: STADIUM_IDS.BOSTON,
		sides: [
			{
				nationId: NATION_IDS.NORVEGE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.FRANCE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'I',
		localDate: '2026-06-26T15:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.SENEGAL,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.IRAK,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_J: Match[] = [
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-16T20:00:00',
		stadiumId: STADIUM_IDS.KANSAS_CITY,
		sides: [
			{
				nationId: NATION_IDS.ARGENTINE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ALGERIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-16T21:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.AUTRICHE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.JORDANIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-22T12:00:00',
		stadiumId: STADIUM_IDS.ARLINGTON,
		sides: [
			{
				nationId: NATION_IDS.ARGENTINE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AUTRICHE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-22T20:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.JORDANIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ALGERIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-27T21:00:00',
		stadiumId: STADIUM_IDS.KANSAS_CITY,
		sides: [
			{
				nationId: NATION_IDS.ALGERIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.AUTRICHE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'J',
		localDate: '2026-06-27T21:00:00',
		stadiumId: STADIUM_IDS.ARLINGTON,
		sides: [
			{
				nationId: NATION_IDS.JORDANIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ARGENTINE,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_K: Match[] = [
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-17T12:00:00',
		stadiumId: STADIUM_IDS.HOUSTON,
		sides: [
			{
				nationId: NATION_IDS.PORTUGAL,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.RDC,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-17T20:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		sides: [
			{
				nationId: NATION_IDS.OUZBEKISTAN,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.COLOMBIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-23T12:00:00',
		stadiumId: STADIUM_IDS.HOUSTON,
		sides: [
			{
				nationId: NATION_IDS.PORTUGAL,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.OUZBEKISTAN,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-23T20:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		sides: [
			{
				nationId: NATION_IDS.COLOMBIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.RDC,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-27T19:30:00',
		stadiumId: STADIUM_IDS.MIAMI,
		sides: [
			{
				nationId: NATION_IDS.COLOMBIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.PORTUGAL,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'K',
		localDate: '2026-06-27T19:30:00',
		stadiumId: STADIUM_IDS.ATLANTA,
		sides: [
			{
				nationId: NATION_IDS.RDC,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.OUZBEKISTAN,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES_L: Match[] = [
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-17T15:00:00',
		stadiumId: STADIUM_IDS.ARLINGTON,
		sides: [
			{
				nationId: NATION_IDS.ANGLETERRE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CROATIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-17T19:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.GHANA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.PANAMA,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-23T16:00:00',
		stadiumId: STADIUM_IDS.BOSTON,
		sides: [
			{
				nationId: NATION_IDS.ANGLETERRE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.GHANA,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-23T19:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.PANAMA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.CROATIE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-27T17:00:00',
		stadiumId: STADIUM_IDS.NEW_YORK,
		sides: [
			{
				nationId: NATION_IDS.PANAMA,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.ANGLETERRE,
				score: { regularTime: 0 }
			}
		]
	},
	{
		phase: 'group',
		group: 'L',
		localDate: '2026-06-27T17:00:00',
		stadiumId: STADIUM_IDS.PHILADELPHIE,
		sides: [
			{
				nationId: NATION_IDS.CROATIE,
				score: { regularTime: 0 }
			},
			{
				nationId: NATION_IDS.GHANA,
				score: { regularTime: 0 }
			}
		]
	}
];

const GROUP_MATCHES: Match[] = [
	...GROUP_MATCHES_A,
	...GROUP_MATCHES_B,
	...GROUP_MATCHES_C,
	...GROUP_MATCHES_D,
	...GROUP_MATCHES_E,
	...GROUP_MATCHES_F,
	...GROUP_MATCHES_G,
	...GROUP_MATCHES_H,
	...GROUP_MATCHES_I,
	...GROUP_MATCHES_J,
	...GROUP_MATCHES_K,
	...GROUP_MATCHES_L
].sort((a, b) => a.localDate.localeCompare(b.localDate));

export const MATCHES: Match[] = [...GROUP_MATCHES];
