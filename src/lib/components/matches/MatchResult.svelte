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

<div class="flex min-w-[52px] shrink-0 items-center justify-center gap-1.5">
	{#if isMatchPassed && hasScore}
		<span class="text-[20px] leading-none font-black tracking-[-0.5px] text-[--text-primary]">
			{score1}
		</span>
		<span class="text-sm font-bold text-[--text-muted]">–</span>
		<span class="text-[20px] leading-none font-black tracking-[-0.5px] text-[--text-primary]">
			{score2}
		</span>
	{:else}
		<span
			class="flex items-center justify-center text-sm font-bold text-[--text-muted]"
			aria-label="score non disponible"
		>
			-
		</span>
	{/if}

	{#if isMatchPassed && hasPenalties && hasPenaltyScores}
		<span>({penalties1} – {penalties2} tab)</span>
	{/if}
</div>
