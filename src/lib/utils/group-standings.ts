import {
	BEST_THIRD_PLACES_COUNT,
	GROUP_IDS,
	POULES,
	type PouleTeamStanding
} from '$lib/data/poules.js';
import type { NationId } from '$lib/data/nations.js';
import type { GroupId } from '$lib/types/index.js';

export { BEST_THIRD_PLACES_COUNT, GROUP_IDS };

export interface GroupTeamStanding extends PouleTeamStanding {
	nationId: NationId;
	group: GroupId;
}

export interface ThirdPlaceStanding extends GroupTeamStanding {
	rank: number;
	isQualified: boolean;
}

export interface GroupTeamStandingWithQualification extends GroupTeamStanding {
	position: number;
	isQualified: boolean;
}

function compareByStandardCriteria(a: GroupTeamStanding, b: GroupTeamStanding): number {
	if (a.points !== b.points) {
		return b.points - a.points;
	}

	if (a.goalDifference !== b.goalDifference) {
		return b.goalDifference - a.goalDifference;
	}

	if (a.goalsFor !== b.goalsFor) {
		return b.goalsFor - a.goalsFor;
	}

	if (a.fairPlayPoints !== b.fairPlayPoints) {
		return b.fairPlayPoints - a.fairPlayPoints;
	}

	return a.nationId.localeCompare(b.nationId);
}

export function getGroupStandings(groupId: GroupId): GroupTeamStanding[] {
	return Object.entries(POULES[groupId]).map(([nationId, standing]) => ({
		nationId: nationId as NationId,
		group: groupId,
		...standing
	}));
}

function getQualifiedThirdPlaceIds(): Set<NationId> {
	return new Set(
		getBestThirdPlaces()
			.filter((standing) => standing.isQualified)
			.map((standing) => standing.nationId)
	);
}

export function getGroupStandingsWithQualification(
	groupId: GroupId
): GroupTeamStandingWithQualification[] {
	const qualifiedThirdPlaceIds = getQualifiedThirdPlaceIds();

	return getGroupStandings(groupId).map((standing, index) => ({
		...standing,
		position: index + 1,
		isQualified: index < 2 || (index === 2 && qualifiedThirdPlaceIds.has(standing.nationId))
	}));
}

export function getBestThirdPlaces(): ThirdPlaceStanding[] {
	const thirdPlaces = GROUP_IDS.map((groupId) => getGroupStandings(groupId)[2]).filter(
		(standing): standing is GroupTeamStanding => standing !== undefined
	);

	const rankedThirdPlaces = [...thirdPlaces].sort(compareByStandardCriteria);

	return rankedThirdPlaces.map((standing, index) => ({
		...standing,
		rank: index + 1,
		isQualified: index < BEST_THIRD_PLACES_COUNT
	}));
}
