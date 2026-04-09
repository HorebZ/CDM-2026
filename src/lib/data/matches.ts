import type { Match } from '$lib/types/index.js';
import { STADIUM_IDS } from './stadiums';
import { NATION_IDS } from './nations';

const GROUP_MATCHES: Match[] = [
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-11T13:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		sides: [
			{
				nationId: NATION_IDS.MEXIQUE,
				score: { regularTime: 3 },
				stats: { yellowCards: 1, redCards: 1 }
			},
			{
				nationId: NATION_IDS.AFRIQUE_DU_SUD,
				score: { regularTime: 2 },
				stats: { yellowCards: 1, redCards: 1 }
			}
		],
		result: { resolution: 'regular', winner: 1 }
	},
	{
		phase: 'group',
		group: 'A',
		localDate: '2026-06-11T20:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		sides: [
			{
				nationId: NATION_IDS.COREE_DU_SUD,
				score: { regularTime: 10 },
				stats: { yellowCards: 0, redCards: 1 }
			},
			{
				nationId: NATION_IDS.TCHEQUIE,
				score: { regularTime: 1 },
				stats: { yellowCards: 2, redCards: 0 }
			}
		],
		result: { resolution: 'regular', winner: 1 }
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-12T15:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		sides: [
			{
				nationId: NATION_IDS.CANADA,
				score: { regularTime: 2 },
				stats: { yellowCards: 0, redCards: 0 }
			},
			{
				nationId: NATION_IDS.BOSNIE,
				score: { regularTime: 2 },
				stats: { yellowCards: 0, redCards: 0 }
			}
		],
		result: { resolution: 'regular' }
	},
	{
		phase: 'group',
		group: 'B',
		localDate: '2026-06-13T12:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		sides: [
			{
				nationId: NATION_IDS.QATAR,
				score: { regularTime: 10 },
				stats: { yellowCards: 2, redCards: 0 }
			},
			{
				nationId: NATION_IDS.SUISSE,
				score: { regularTime: 6 },
				stats: { yellowCards: 2, redCards: 1 }
			}
		],
		result: { resolution: 'regular', winner: 1 }
	}
];

export const MATCHES: Match[] = [...GROUP_MATCHES];
