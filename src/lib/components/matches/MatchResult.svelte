<script lang="ts">
	interface Props {
		isMatchPassed: boolean;
		hasScore: boolean;
		score1?: number;
		score2?: number;
		hasPenalties: boolean;
		hasPenaltyScores: boolean;
		penalties1?: number;
		penalties2?: number;
	}

	const {
		isMatchPassed,
		hasScore,
		score1,
		score2,
		hasPenalties,
		hasPenaltyScores,
		penalties1,
		penalties2
	}: Props = $props();
</script>

<div class="match-result">
	{#if isMatchPassed && hasScore}
		<span class="match-goals">{score1}</span>
		<span class="match-separator">–</span>
		<span class="match-goals">{score2}</span>
	{:else}
		<span class="match-separator" aria-label="score non disponible">-</span>
	{/if}

	{#if isMatchPassed && hasPenalties && hasPenaltyScores}
		<span class="match-resolution">({penalties1} – {penalties2} tab)</span>
	{/if}
</div>
