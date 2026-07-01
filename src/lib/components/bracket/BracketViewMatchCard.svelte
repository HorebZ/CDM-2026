<script lang="ts">
	import { getFlagUrlSmall } from '$lib/config/site.js';
	import type { BracketMatchDisplay } from '$lib/utils/bracket.js';

	interface Props {
		display: BracketMatchDisplay;
		highlight?: boolean;
	}

	const { display, highlight = false }: Props = $props();

	const flagClasses =
		'h-4 w-6 shrink-0 rounded-[2px] border border-[rgba(255,255,255,0.12)] object-cover';
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
			highlight && 'text-[#ffd700]'
		]}
	>
		{display.dateLabel}
	</span>

	<article
		class={[
			'grid h-[52px] w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1 overflow-hidden rounded-[8px] border px-2.5 py-2',
			highlight
				? 'border-[rgba(255,215,0,0.45)] bg-[rgba(255,215,0,0.04)] shadow-[0_0_16px_rgba(255,215,0,0.08)]'
				: 'border-ring-subtle bg-surface-card'
		]}
	>
		{#if display.side1.flagCode}
			<img
				class={[flagClasses, 'col-start-1', display.side1.isLoser && 'grayscale-80']}
				src={getFlagUrlSmall(display.side1.flagCode)}
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
					display.side1.isWinner && 'text-[#ffd700]',
					display.side1.isLoser && 'text-text-muted opacity-50'
				]}
			>
				{display.side1.label}
			</span>
		{:else}
			<span
				class={[placeholderClasses, 'col-start-1', display.side1.isLoser && 'grayscale-80']}
				aria-label={display.side1.label}
			>
				{display.side1.label}
			</span>
		{/if}
		<span class={display.hasScore ? scoreClasses : noScoreClasses}>
			{#if display.hasScore}
				{#if display.side1.penalties !== undefined}<span class={penaltyClasses}
						>({display.side1.penalties})</span
					>{' '}{/if}{display.side1.score}
			{:else}
				-
			{/if}
		</span>

		{#if display.side2.flagCode}
			<img
				class={[flagClasses, 'col-start-1', display.side2.isLoser && 'grayscale-80']}
				src={getFlagUrlSmall(display.side2.flagCode)}
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
					display.side2.isWinner && 'text-[#ffd700]',
					display.side2.isLoser && 'text-text-muted opacity-50'
				]}
			>
				{display.side2.label}
			</span>
		{:else}
			<span
				class={[placeholderClasses, 'col-start-1', display.side2.isLoser && 'grayscale-80']}
				aria-label={display.side2.label}
			>
				{display.side2.label}
			</span>
		{/if}
		<span class={display.hasScore ? scoreClasses : noScoreClasses}>
			{#if display.hasScore}
				{#if display.side2.penalties !== undefined}<span class={penaltyClasses}
						>({display.side2.penalties})</span
					>{' '}{/if}{display.side2.score}
			{:else}
				-
			{/if}
		</span>
	</article>
</div>
