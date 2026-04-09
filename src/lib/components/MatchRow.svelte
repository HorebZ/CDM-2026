<script lang="ts">
	import type { Match } from '$lib/types/index.js';
	import { NATIONS } from '$lib/data/nations.js';
	import { STADIUMS } from '$lib/data/stadiums.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import { getMatchDates, isMatchDatePassed } from '$lib/utils/date.js';

	interface Props {
		match: Match;
	}

	const { match }: Props = $props();

	const nation1 = $derived(NATIONS[match.nation1.nationId]);
	const nation2 = $derived(NATIONS[match.nation2.nationId]);
	const stadium = $derived(STADIUMS[match.stadiumId]);
	const dates = $derived(getMatchDates(match.localDate, stadium.timezone));
	const isMatchPassed = $derived(isMatchDatePassed(match.localDate, stadium.timezone));
	const stadiumLocalTime = $derived(dates.stadiumDate.replace(':', 'h'));

	const goals1 = $derived(match.nation1.matchStats.goals);
	const goals2 = $derived(match.nation2.matchStats.goals);
	const winner = $derived(isMatchPassed ? (goals1 > goals2 ? 1 : goals2 > goals1 ? 2 : 0) : 0);

	const TYPE_LABELS: Record<Match['type'], string> = {
		group: 'groupe',
		knockout: 'phase finales',
		quarter: 'quart',
		semi: 'demi',
		'small-final': 'petite finale',
		final: 'Finale'
	};
</script>

<div class="match-row">
	<!-- Phase + dates (col gauche) -->
	<div class="match-meta">
		<div class="match-info">
			<div class="match-phase-line">
				<span class="match-type" class:match-type--final={match.type === 'final'}>
					{TYPE_LABELS[match.type]}
					{match.type === 'group' ? match.group : ''}
				</span>
			</div>
			<div class="match-date-line">
				<span class="match-date-user">{dates.userDate}</span>
			</div>
		</div>
	</div>

	<!-- Score centré (col centrale auto) -->
	<div class="match-score-row">
		<!-- Nation 1 -->
		<div class="match-team match-team--left">
			{#if isMatchPassed && match.nation1.matchStats.redCards > 0}
				<span class="card-stat" aria-label="carton rouge">
					<span class="card card--red" aria-hidden="true"></span>
					<span class="card-count">{match.nation1.matchStats.redCards}</span>
				</span>
			{/if}
			{#if isMatchPassed && match.nation1.matchStats.yellowCards > 0}
				<span class="card-stat" aria-label="carton jaune">
					<span class="card card--yellow" aria-hidden="true"></span>
					<span class="card-count">{match.nation1.matchStats.yellowCards}</span>
				</span>
			{/if}
			<img
				class="team-flag"
				class:team-flag--winner={winner === 1}
				src={getFlagUrl(nation1.code)}
				alt={nation1.name}
				width={32}
				height={21}
				loading="lazy"
			/>
		</div>

		<div class="match-result">
			{#if isMatchPassed}
				<span class="match-goals">{match.nation1.matchStats.goals}</span>
				<span class="match-separator">–</span>
				<span class="match-goals">{match.nation2.matchStats.goals}</span>
			{:else}
				<span class="match-separator" aria-label="score non disponible">-</span>
			{/if}
		</div>

		<!-- Nation 2 -->
		<div class="match-team match-team--right">
			<img
				class="team-flag"
				class:team-flag--winner={winner === 2}
				src={getFlagUrl(nation2.code)}
				alt={nation2.name}
				width={32}
				height={21}
				loading="lazy"
			/>
			{#if isMatchPassed && match.nation2.matchStats.redCards > 0}
				<span class="card-stat" aria-label="carton rouge">
					<span class="card card--red" aria-hidden="true"></span>
					<span class="card-count">{match.nation2.matchStats.redCards}</span>
				</span>
			{/if}
			{#if isMatchPassed && match.nation2.matchStats.yellowCards > 0}
				<span class="card-stat" aria-label="carton jaune">
					<span class="card card--yellow" aria-hidden="true"></span>
					<span class="card-count">{match.nation2.matchStats.yellowCards}</span>
				</span>
			{/if}
		</div>
	</div>

	<!-- Stade (col droite) -->
	<div class="flex flex-col items-end">
		<div class="match-stadium">
			<span class="stadium-name">{stadium.name}</span>
			<img
				class="stadium-flag"
				src={getFlagUrl(stadium.countryCode)}
				alt={stadium.countryCode}
				width={28}
				height={18}
				loading="lazy"
			/>
		</div>
		<span class="match-date-stadium">({stadiumLocalTime} heure locale)</span>
	</div>
</div>
