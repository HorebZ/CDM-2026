<script lang="ts">
	import { getFlagUrl } from '$lib/config/site.js';
	import type { MatchSide, Nation } from '$lib/types/index.js';
	import NationTooltip from '../NationTooltip.svelte';
	import TooltipTrigger from '../TooltipTrigger.svelte';
	import MatchCardStat from './MatchCardStat.svelte';

	interface Props {
		side: MatchSide;
		nation: Nation | null;
		label: string;
		align: 'left' | 'right';
		isWinner: boolean;
		isMatchPassed: boolean;
	}

	const { side, nation, label, align, isWinner, isMatchPassed }: Props = $props();

	const showRedCards = $derived(isMatchPassed && side.stats.redCards > 0);
	const showYellowCards = $derived(isMatchPassed && side.stats.yellowCards > 0);
</script>

<div
	class="match-team"
	class:match-team--left={align === 'left'}
	class:match-team--right={align === 'right'}
>
	{#if align === 'left'}
		{#if showRedCards}
			<MatchCardStat color="red" count={side.stats.redCards} />
		{/if}
		{#if showYellowCards}
			<MatchCardStat color="yellow" count={side.stats.yellowCards} />
		{/if}
	{/if}

	{#if nation}
		<TooltipTrigger className="flag-wrapper match-flag-wrapper" role="group">
			{#snippet trigger()}
				<img
					class="team-flag"
					class:team-flag--winner={isWinner}
					src={getFlagUrl(nation.code)}
					alt={label}
					width={32}
					height={21}
					loading="lazy"
				/>
			{/snippet}

			{#snippet tooltip()}
				<NationTooltip {nation} />
			{/snippet}
		</TooltipTrigger>
	{:else}
		<span class="team-placeholder" aria-label={label}>{label}</span>
	{/if}

	{#if align === 'right'}
		{#if showRedCards}
			<MatchCardStat color="red" count={side.stats.redCards} />
		{/if}
		{#if showYellowCards}
			<MatchCardStat color="yellow" count={side.stats.yellowCards} />
		{/if}
	{/if}
</div>
