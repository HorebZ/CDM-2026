<script lang="ts">
	import { getFlagUrl } from '$lib/config/site.js';
	import { NATIONS } from '$lib/data/nations.js';
	import { STADIUMS } from '$lib/data/stadiums.js';
	import type { Match } from '$lib/types/index.js';
	import { getMatchDates, isMatchDatePassed } from '$lib/utils/date.js';
	import MatchLocation from './MatchLocation.svelte';
	import MatchMeta from './MatchMeta.svelte';
	import MatchResult from './MatchResult.svelte';
	import MatchTeam from './MatchTeam.svelte';

	interface Props {
		match: Match;
	}

	const { match }: Props = $props();

	const side1 = $derived(match.sides[0]);
	const side2 = $derived(match.sides[1]);
	const nation1 = $derived(side1.nationId ? NATIONS[side1.nationId] : null);
	const nation2 = $derived(side2.nationId ? NATIONS[side2.nationId] : null);
	const side1Label = $derived(nation1?.name ?? side1.label ?? 'TBD');
	const side2Label = $derived(nation2?.name ?? side2.label ?? 'TBD');
	const stadium = $derived(STADIUMS[match.stadiumId]);
	const dates = $derived(getMatchDates(match.localDate, stadium.timezone));
	const isMatchPassed = $derived(isMatchDatePassed(match.localDate, stadium.timezone));
	const stadiumLocalTime = $derived(dates.stadiumDate.replace(':', 'h'));

	const winner = $derived(isMatchPassed ? (match.result?.winner ?? 0) : 0);

	const displayScore1 = $derived(side1.score?.regularTime);
	const displayScore2 = $derived(side2.score?.regularTime);
	const hasScore = $derived(typeof displayScore1 === 'number' && typeof displayScore2 === 'number');

	const hasPenalties = $derived(match.result?.resolution === 'penalties');
	const hasPenaltyScores = $derived(
		side1.score?.penalties !== undefined && side2.score?.penalties !== undefined
	);
</script>

<div class="match-row">
	<MatchMeta phase={match.phase} group={match.group} userDate={dates.userDate} />

	<div class="match-score-row">
		<MatchTeam
			side={side1}
			nation={nation1}
			label={side1Label}
			align="left"
			isWinner={winner === 1}
			{isMatchPassed}
		/>

		<MatchResult
			{isMatchPassed}
			{hasScore}
			score1={displayScore1}
			score2={displayScore2}
			{hasPenalties}
			{hasPenaltyScores}
			penalties1={side1.score?.penalties}
			penalties2={side2.score?.penalties}
		/>

		<MatchTeam
			side={side2}
			nation={nation2}
			label={side2Label}
			align="right"
			isWinner={winner === 2}
			{isMatchPassed}
		/>
	</div>

	<MatchLocation
		stadiumName={stadium.name}
		countryCode={stadium.countryCode}
		{stadiumLocalTime}
		flagUrl={getFlagUrl(stadium.countryCode)}
	/>
</div>
