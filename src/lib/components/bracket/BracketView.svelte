<script lang="ts">
	import {
		BRACKET_CONNECTOR_WIDTH,
		buildBracketColumns,
		getSmallFinalDisplay
	} from '$lib/utils/bracket.js';
	import BracketViewColumn from './BracketViewColumn.svelte';
	import BracketViewConnectors from './BracketViewConnectors.svelte';
	import BracketViewMatchCard from './BracketViewMatchCard.svelte';

	const columns = buildBracketColumns();
	const smallFinalDisplay = getSmallFinalDisplay();
</script>

<div class="overflow-x-auto pb-2">
	<div class="mx-auto flex w-max items-start gap-0 px-1">
		{#each columns as column, columnIndex (column.phase)}
			<BracketViewColumn {column} />

			{#if columnIndex < columns.length - 1}
				<BracketViewConnectors
					sourceSlots={column.slots}
					targetSlots={columns[columnIndex + 1].slots}
					width={BRACKET_CONNECTOR_WIDTH}
				/>
			{/if}
		{/each}
	</div>
</div>

{#if smallFinalDisplay}
	<div class="mx-auto mt-8 flex w-full max-w-[220px] flex-col items-center gap-2">
		<h2 class="text-[11px] font-bold tracking-[0.08em] text-white uppercase">Petite finale</h2>
		<BracketViewMatchCard display={smallFinalDisplay} />
	</div>
{/if}
