import { error } from '@sveltejs/kit';
import { NATIONS } from '$lib/data/nations.js';
import {
	TV_COUNTRY_ROUTE_ENTRIES,
	getTvCountryMatches,
	resolveTvNationByCode
} from '$lib/utils/tv-country.js';
import type { EntryGenerator, PageLoad } from './$types';

const nations = Object.values(NATIONS);

export const entries: EntryGenerator = () => TV_COUNTRY_ROUTE_ENTRIES;

export const load: PageLoad = ({ params }) => {
	const resolvedNation = resolveTvNationByCode(params.nationCode);

	if (!resolvedNation) {
		throw error(404, 'Nation inconnue');
	}

	return {
		matches: getTvCountryMatches(resolvedNation),
		nation: resolvedNation.nation,
		nations
	};
};
