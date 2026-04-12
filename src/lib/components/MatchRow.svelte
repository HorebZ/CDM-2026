<script lang="ts">
	import type { Match } from '$lib/types/index.js';
	import { NATIONS } from '$lib/data/nations.js';
	import { STADIUMS } from '$lib/data/stadiums.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import { getMatchDates, isMatchDatePassed } from '$lib/utils/date.js';
	import NationTooltip from './NationTooltip.svelte';

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

	let hoveredTeam = $state<0 | 1 | 2>(0);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleFlagMouseEnter(team: 1 | 2) {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}

		hoverTimeout = setTimeout(() => {
			hoveredTeam = team;
			hoverTimeout = null;
		}, 500);
	}

	function handleFlagMouseLeave(team: 1 | 2) {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}

		if (hoveredTeam === team) {
			hoveredTeam = 0;
		}
	}

	const PHASE_LABELS: Record<Match['phase'], string> = {
		group: 'Groupe',
		'round-of-16': '8e de finale',
		quarter: 'Quart',
		semi: 'Demi',
		'small-final': 'Petite finale',
		final: 'Finale'
	};
</script>

<div class="match-row">
	<!-- Phase + dates (col gauche) -->
	<div class="match-meta">
		<div class="match-info">
			<div class="match-phase-line">
				<span class="match-type" class:match-type--final={match.phase === 'final'}>
					{PHASE_LABELS[match.phase]}
					{match.phase === 'group' ? match.group : ''}
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
			{#if isMatchPassed && side1.stats.redCards > 0}
				<span class="card-stat" aria-label="carton rouge">
					<span class="card card--red" aria-hidden="true"></span>
					<span class="card-count">{side1.stats.redCards}</span>
				</span>
			{/if}
			{#if isMatchPassed && side1.stats.yellowCards > 0}
				<span class="card-stat" aria-label="carton jaune">
					<span class="card card--yellow" aria-hidden="true"></span>
					<span class="card-count">{side1.stats.yellowCards}</span>
				</span>
			{/if}
			{#if nation1}
				<div
					class="flag-wrapper match-flag-wrapper"
					onmouseenter={() => handleFlagMouseEnter(1)}
					onmouseleave={() => handleFlagMouseLeave(1)}
					role="group"
				>
					<img
						class="team-flag"
						class:team-flag--winner={winner === 1}
						src={getFlagUrl(nation1.code)}
						alt={side1Label}
						width={32}
						height={21}
						loading="lazy"
					/>
					{#if hoveredTeam === 1}
						<NationTooltip nation={nation1} />
					{/if}
				</div>
			{:else}
				<span class="team-placeholder" aria-label={side1Label}>{side1Label}</span>
			{/if}
		</div>

		<div class="match-result">
			{#if isMatchPassed && hasScore}
				<span class="match-goals">{displayScore1}</span>
				<span class="match-separator">–</span>
				<span class="match-goals">{displayScore2}</span>
			{:else}
				<span class="match-separator" aria-label="score non disponible">-</span>
			{/if}
			{#if isMatchPassed && hasPenalties && hasPenaltyScores}
				<span class="match-resolution">
					({side1.score?.penalties} – {side2.score?.penalties} tab)
				</span>
			{/if}
		</div>

		<!-- Nation 2 -->
		<div class="match-team match-team--right">
			{#if nation2}
				<div
					class="flag-wrapper match-flag-wrapper"
					onmouseenter={() => handleFlagMouseEnter(2)}
					onmouseleave={() => handleFlagMouseLeave(2)}
					role="group"
				>
					<img
						class="team-flag"
						class:team-flag--winner={winner === 2}
						src={getFlagUrl(nation2.code)}
						alt={side2Label}
						width={32}
						height={21}
						loading="lazy"
					/>
					{#if hoveredTeam === 2}
						<NationTooltip nation={nation2} />
					{/if}
				</div>
			{:else}
				<span class="team-placeholder" aria-label={side2Label}>{side2Label}</span>
			{/if}
			{#if isMatchPassed && side2.stats.redCards > 0}
				<span class="card-stat" aria-label="carton rouge">
					<span class="card card--red" aria-hidden="true"></span>
					<span class="card-count">{side2.stats.redCards}</span>
				</span>
			{/if}
			{#if isMatchPassed && side2.stats.yellowCards > 0}
				<span class="card-stat" aria-label="carton jaune">
					<span class="card card--yellow" aria-hidden="true"></span>
					<span class="card-count">{side2.stats.yellowCards}</span>
				</span>
			{/if}
		</div>
	</div>

	<!-- Stade (col droite) -->
	<div class="match-location">
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
