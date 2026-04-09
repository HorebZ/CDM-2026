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
			matchStats: { yellowCards: 0, redCards: 0, goals: 2 }
		},
		nation2: {
			nationId: NATION_IDS.ARGENTINE,
			matchStats: { yellowCards: 1, redCards: 0, goals: 1 }
		}
	},
	{
		type: 'group',
		group: 'A',
		localDate: '2026-06-11T20:00:00',
		stadiumId: STADIUM_IDS.MEXICO,
		nation1: {
			nationId: NATION_IDS.COREE_DU_SUD,
			matchStats: { yellowCards: 0, redCards: 1, goals: 0 }
		},
		nation2: {
			nationId: NATION_IDS.TCHEQUIE,
			matchStats: { yellowCards: 2, redCards: 0, goals: 1 }
		}
	}
];

export const MATCHES: Match[] = [...GROUP_MATCHES];
