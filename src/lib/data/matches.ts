import type { Match } from '$lib/types/index.js';
import { STADIUM_IDS } from './stadiums';
import { NATION_IDS } from './nations';

const GROUP_MATCHES: Match[] = [
	{
		type: 'group',
		group: 'A',
		localDate: '2026-06-11T13:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		nation1: {
			nationId: NATION_IDS.MEXIQUE,
			matchStats: { yellowCards: 1, redCards: 1, goals: 3 }
		},
		nation2: {
			nationId: NATION_IDS.AFRIQUE_DU_SUD,
			matchStats: { yellowCards: 1, redCards: 1, goals: 2 }
		}
	},
	{
		type: 'group',
		group: 'A',
		localDate: '2026-06-11T20:00:00',
		stadiumId: STADIUM_IDS.GUADALAJARA,
		nation1: {
			nationId: NATION_IDS.COREE_DU_SUD,
			matchStats: { yellowCards: 0, redCards: 1, goals: 10 }
		},
		nation2: {
			nationId: NATION_IDS.TCHEQUIE,
			matchStats: { yellowCards: 2, redCards: 0, goals: 1 }
		}
	},
	{
		type: 'group',
		group: 'B',
		localDate: '2026-06-12T15:00:00',
		stadiumId: STADIUM_IDS.TORONTO,
		nation1: {
			nationId: NATION_IDS.CANADA,
			matchStats: { yellowCards: 0, redCards: 0, goals: 2 }
		},
		nation2: {
			nationId: NATION_IDS.BOSNIE,
			matchStats: { yellowCards: 0, redCards: 0, goals: 2 }
		}
	},
	{
		type: 'group',
		group: 'B',
		localDate: '2026-06-13T12:00:00',
		stadiumId: STADIUM_IDS.SANTA_CLARA,
		nation1: {
			nationId: NATION_IDS.QATAR,
			matchStats: { yellowCards: 2, redCards: 0, goals: 10 }
		},
		nation2: {
			nationId: NATION_IDS.SUISSE,
			matchStats: { yellowCards: 2, redCards: 1, goals: 6 }
		}
	}
];

export const MATCHES: Match[] = [...GROUP_MATCHES];
