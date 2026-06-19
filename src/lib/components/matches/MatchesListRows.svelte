<script lang="ts">
	import type { Match } from '$lib/types/index.js';
	import MatchRow from './MatchRow.svelte';

	interface Props {
		matches: Match[];
		emptyMessage?: string;
		tv?: boolean;
	}

	const {
		matches,
		emptyMessage = 'Aucun match trouvé pour cette recherche.',
		tv = false
	}: Props = $props();
</script>

{#if matches.length > 0}
	<ul class="list-none p-0" role="list">
		{#each matches as match (`${match.stadiumId}-${match.localDate}`)}
			<li
				class="border-b border-[rgba(255,255,255,0.05)] first:border-t first:border-[rgba(255,255,255,0.05)]"
			>
				<MatchRow {match} {tv} />
			</li>
		{/each}
	</ul>
{:else}
	<div
		class="flex min-h-[240px] flex-1 items-center justify-center text-center text-[13px] text-text-muted italic"
	>
		<p>{emptyMessage}</p>
	</div>
{/if}
