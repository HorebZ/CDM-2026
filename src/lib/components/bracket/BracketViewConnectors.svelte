<script lang="ts">
	import type { BracketSlot } from '$lib/utils/bracket.js';
	import { BRACKET_GRID_MIN_HEIGHT, getSlotCenterY } from '$lib/utils/bracket.js';

	interface Props {
		sourceSlots: BracketSlot[];
		targetSlots: BracketSlot[];
		width: number;
	}

	const { sourceSlots, targetSlots, width }: Props = $props();

	const paths = $derived(
		targetSlots.flatMap((targetSlot, targetIndex) => {
			const feederSlots = sourceSlots.slice(targetIndex * 2, targetIndex * 2 + 2);

			if (feederSlots.length < 2) return [];

			const targetY = getSlotCenterY(targetSlot);
			const sourceY1 = getSlotCenterY(feederSlots[0]);
			const sourceY2 = getSlotCenterY(feederSlots[1]);
			const midX = width / 2;

			return [
				`M 0 ${sourceY1} H ${midX} V ${targetY} H ${width}`,
				`M 0 ${sourceY2} H ${midX} V ${targetY}`
			];
		})
	);
</script>

<div class="flex w-[28px] shrink-0 flex-col gap-3">
	<h2
		class="invisible text-center text-[11px] font-bold tracking-[0.08em] text-text-muted uppercase"
		aria-hidden="true"
	>
		&nbsp;
	</h2>

	<svg
		class="shrink-0"
		{width}
		height={BRACKET_GRID_MIN_HEIGHT}
		viewBox={`0 0 ${width} ${BRACKET_GRID_MIN_HEIGHT}`}
		aria-hidden="true"
	>
		{#each paths as path (path)}
			<path
				d={path}
				fill="none"
				stroke="rgba(255,255,255,0.12)"
				stroke-width="1.5"
				stroke-linecap="square"
				stroke-linejoin="miter"
			/>
		{/each}
	</svg>
</div>
