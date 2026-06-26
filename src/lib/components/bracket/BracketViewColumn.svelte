<script lang="ts">
	import type { BracketColumn } from '$lib/utils/bracket.js';
	import { getBracketGridStyle } from '$lib/utils/bracket.js';
	import BracketViewMatchCard from './BracketViewMatchCard.svelte';

	interface Props {
		column: BracketColumn;
	}

	const { column }: Props = $props();
</script>

<div class="flex shrink-0 flex-col gap-3">
	<h2
		class={[
			'text-center text-[11px] font-bold tracking-[0.08em] text-text-muted uppercase',
			column.phase === 'final' && 'text-[#ffd700]'
		]}
	>
		{column.label}
	</h2>

	<div class="grid w-[168px]" style={getBracketGridStyle()}>
		{#each column.slots as slot (slot.matchKey)}
			<div class="flex items-center" style={`grid-row: ${slot.gridRow} / span ${slot.rowSpan}`}>
				<BracketViewMatchCard display={slot.display} highlight={column.phase === 'final'} />
			</div>
		{/each}
	</div>
</div>
