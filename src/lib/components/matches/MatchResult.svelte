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

	const showPenalties = $derived(isMatchPassed && hasPenalties && hasPenaltyScores);
</script>

<div class="relative flex min-w-[52px] shrink-0 items-center justify-center">
	{#if isMatchPassed && hasScore}
		<span class="text-[20px] leading-none font-black tracking-[-0.5px] text-text-primary">
			{score1}
		</span>
		<span class="mx-1.5 text-sm font-bold text-text-muted">–</span>
		<span class="text-[20px] leading-none font-black tracking-[-0.5px] text-text-primary">
			{score2}
		</span>
	{:else}
		<span
			class="flex items-center justify-center text-sm font-bold text-text-muted"
			aria-label="score non disponible"
		>
			-
		</span>
	{/if}

	{#if showPenalties}
		<span
			class="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 text-[10px] leading-none font-bold whitespace-nowrap text-text-muted"
		>
			({penalties1} – {penalties2} tab)
		</span>
	{/if}
</div>
