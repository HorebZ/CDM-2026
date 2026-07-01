<script lang="ts">
	import type { BracketMatchDisplay, BracketMatchSideDisplay } from '$lib/utils/bracket.js';
	import FlagImage from '../FlagImage.svelte';
	import FlagPlaceholder from '../FlagPlaceholder.svelte';
	import TooltipNation from '../TooltipNation.svelte';
	import TooltipTrigger from '../TooltipTrigger.svelte';

	interface Props {
		display: BracketMatchDisplay;
		highlight?: boolean;
	}

	const { display, highlight = false }: Props = $props();

	const nameClasses = 'min-w-0 truncate text-[11px] font-semibold text-text-primary';
	const scoreClasses = 'col-start-3 shrink-0 text-[11px] font-black text-text-primary';
	const noScoreClasses = 'col-start-3 shrink-0 text-[11px] font-bold text-text-muted';
	const penaltyClasses = 'font-bold text-text-muted';
</script>

<div class="relative w-full min-w-[148px]">
	<span
		class={[
			'absolute bottom-full left-2.5 mb-0.5 max-w-[calc(100%-10px)] truncate text-[10px] font-bold tracking-[0.03em] text-text-muted',
			highlight && 'text-gold'
		]}
	>
		{display.dateLabel}
	</span>

	<article
		class={[
			'grid h-[52px] w-full grid-cols-[auto_1fr_auto] content-center items-center gap-x-2 gap-y-1 rounded-[8px] border px-2.5 py-2',
			highlight
				? 'border-gold/45 bg-gold/[0.04] shadow-[0_0_16px_color-mix(in_srgb,var(--color-gold)_8%,transparent)]'
				: 'border-ring-subtle bg-surface-card'
		]}
	>
		{@render side(display.side1)}
		{@render side(display.side2)}
	</article>
</div>

{#snippet side(team: BracketMatchSideDisplay)}
	{@const nation = team.nation}
	{#if nation}
		<TooltipTrigger className="relative col-start-1 block h-4 w-4 shrink-0" role="group">
			{#snippet trigger()}
				<FlagImage
					code={nation.code}
					alt={team.label}
					small
					loser={team.isLoser}
					width={16}
					height={16}
					class="block h-4 w-4 rounded-full border"
				/>
			{/snippet}

			{#snippet tooltip()}
				<TooltipNation {nation} />
			{/snippet}
		</TooltipTrigger>
		<span
			class={[
				nameClasses,
				'col-start-2',
				team.isWinner && 'text-gold',
				team.isLoser && 'text-text-muted opacity-50'
			]}
		>
			{team.label}
		</span>
	{:else}
		<FlagPlaceholder
			label={team.label}
			loser={team.isLoser}
			class="col-start-1 h-4 min-w-6 rounded-[2px] border px-1 text-[9px] leading-none"
		/>
	{/if}
	<span class={display.hasScore ? scoreClasses : noScoreClasses}>
		{#if display.hasScore}
			{#if team.penalties !== undefined}<span class={penaltyClasses}>({team.penalties})</span
				>{' '}{/if}{team.score}
		{:else}
			-
		{/if}
	</span>
{/snippet}
