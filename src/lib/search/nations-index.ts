import MiniSearch from 'minisearch';
import { NATIONS } from '$lib/data/nations.js';
import type { GroupId } from '$lib/types/index.js';

export interface NationSearchResult {
	id: string;
	name: string;
	group: GroupId;
	code: string;
}

const documents = Object.entries(NATIONS).map(([id, nation]) => ({
	id,
	name: nation.name,
	group: nation.group,
	code: nation.code
}));

export const nationSearch = new MiniSearch<(typeof documents)[number]>({
	fields: ['name'],
	storeFields: ['name', 'group', 'code'],
	searchOptions: {
		prefix: true,
		fuzzy: 0.2,
		boost: { name: 2 }
	}
});

nationSearch.addAll(documents);
