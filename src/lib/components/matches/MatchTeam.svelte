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
	class="flex flex-1 items-center gap-[5px]"
	class:justify-end={align === 'left'}
	class:justify-start={align === 'right'}
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
					class="block h-[21px] w-8 shrink-0 rounded-[3px] border-[1.5px] border-[rgba(255,255,255,0.12)] object-cover transition-[border-color]"
					class:border-[#ffd700]={isWinner}
					class:shadow-[0_0_8px_1px_rgba(255,215,0,0.35)]={isWinner}
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
		<span
			class="inline-flex h-[21px] min-w-8 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-dashed border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.04)] px-1.5 text-[10px] leading-none font-bold tracking-[0.04em] text-[rgba(255,255,255,0.75)] uppercase"
			aria-label={label}
		>
			{label}
		</span>
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
