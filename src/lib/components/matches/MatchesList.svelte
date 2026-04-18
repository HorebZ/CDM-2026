<script lang="ts">
	import MatchRow from './MatchRow.svelte';
	import MatchSearchBar from './MatchSearchBar.svelte';
	import { MATCHES } from '$lib/data/matches.js';
	import { applyFilters, filters } from './match-filters.svelte.js';

	const filteredMatches = $derived(applyFilters({ matches: MATCHES, filters }));
</script>

<section
	id="matches"
	class="w-full px-6 pt-10 pb-20 max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-[60px]"
>
	<MatchSearchBar />

	<div
		class="mx-auto flex min-h-[700px] w-[min(100%,var(--shell-width))] flex-col max-[800px]:min-h-[980px]"
	>
		<ul class="list-none p-0" role="list">
			{#each filteredMatches as match (`${match.stadiumId}-${match.localDate}`)}
				<li
					class="border-b border-[rgba(255,255,255,0.05)] first:border-t first:border-[rgba(255,255,255,0.05)]"
				>
					<MatchRow {match} />
				</li>
			{/each}
		</ul>

		{#if filteredMatches.length === 0}
			<div
				class="flex flex-1 items-center justify-center text-center text-[13px] text-text-muted italic"
			>
				<p>Aucun match trouvé pour cette recherche.</p>
			</div>
		{/if}
	</div>
</section>
