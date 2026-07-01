<script lang="ts">
	import { getFlagUrlSmall } from '$lib/config/site.js';
	import type { BracketMatchDisplay, BracketMatchSideDisplay } from '$lib/utils/bracket.js';

	interface Props {
		display: BracketMatchDisplay;
		highlight?: boolean;
	}

	const { display, highlight = false }: Props = $props();

	const flagClasses = 'h-4 w-6 shrink-0 rounded-[2px] border border-ring-medium object-cover';
	const placeholderClasses =
		'inline-flex h-4 min-w-6 shrink-0 items-center justify-center rounded-[2px] border border-dashed border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.04)] px-1 text-[9px] leading-none font-bold tracking-[0.04em] text-[rgba(255,255,255,0.75)] uppercase';
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
			'grid h-[52px] w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1 overflow-hidden rounded-[8px] border px-2.5 py-2',
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
	{#if team.flagCode}
		<img
			class={[flagClasses, 'col-start-1', team.isLoser && 'grayscale-80']}
			src={getFlagUrlSmall(team.flagCode)}
			alt=""
			width={24}
			height={16}
			loading="lazy"
			decoding="async"
		/>
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
		<span
			class={[placeholderClasses, 'col-start-1', team.isLoser && 'grayscale-80']}
			aria-label={team.label}
		>
			{team.label}
		</span>
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
