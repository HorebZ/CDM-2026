<script lang="ts">
	import type { MatchSide, Nation } from '$lib/types/index.js';
	import FlagImage from '../FlagImage.svelte';
	import FlagPlaceholder from '../FlagPlaceholder.svelte';
	import TooltipNation from '../TooltipNation.svelte';
	import TooltipTrigger from '../TooltipTrigger.svelte';
	import MatchCardStat from './MatchCardStat.svelte';

	interface Props {
		side: MatchSide;
		nation: Nation | null;
		label: string;
		align: 'left' | 'right';
		isWinner: boolean;
		isLoser: boolean;
		isMatchPassed: boolean;
	}

	const { side, nation, label, align, isWinner, isLoser, isMatchPassed }: Props = $props();
	const containerClasses = 'flex flex-1 items-center gap-[5px]';

	const showRedCards = $derived(isMatchPassed && side.stats.redCards > 0);
</script>

<div
	class={[
		containerClasses,
		align === 'left' && 'justify-end',
		align === 'right' && 'justify-start'
	]}
>
	{#if align === 'left'}
		{#if showRedCards}
			<MatchCardStat color="red" count={side.stats.redCards} />
		{/if}
	{/if}

	{#if nation}
		<TooltipTrigger className="relative block h-[21px] w-8 shrink-0" role="group">
			{#snippet trigger()}
				<FlagImage
					code={nation.code}
					alt={label}
					winner={isWinner}
					loser={isLoser}
					width={32}
					height={21}
					class="block h-[21px] w-8 rounded-[3px] border-[1.5px] transition-[border-color,filter]"
				/>
			{/snippet}

			{#snippet tooltip()}
				<TooltipNation {nation} />
			{/snippet}
		</TooltipTrigger>
	{:else}
		<FlagPlaceholder
			{label}
			loser={isLoser}
			class="h-[21px] min-w-8 rounded-[3px] border-[1.5px] px-1.5 text-[10px] leading-none transition-[filter]"
		/>
	{/if}

	{#if align === 'right'}
		{#if showRedCards}
			<MatchCardStat color="red" count={side.stats.redCards} />
		{/if}
	{/if}
</div>
