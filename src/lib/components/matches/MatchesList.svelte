<script lang="ts">
	import type { Match } from '$lib/types/index.js';
	import MatchRow from './MatchRow.svelte';
	import MatchRowSkeleton from './MatchRowSkeleton.svelte';
	import MatchSearchBar from './MatchSearchBar.svelte';
	import { applyFilters, filters } from './match-filters.svelte.js';

	const skeletonItems = Array.from({ length: 10 }, (_, i) => i);

	let matches: Match[] = $state([]);
	let loaded = $state(false);

	$effect(() => {
		import('$lib/data/matches.js').then((mod) => {
			matches = mod.MATCHES;
			loaded = true;
		});
	});

	const filteredMatches = $derived(applyFilters({ matches, filters }));
</script>

<section
	id="matches"
	class="w-full px-6 pt-10 pb-20 max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-[60px]"
>
	<MatchSearchBar />

	<div
		class="mx-auto flex min-h-[700px] w-[min(100%,var(--shell-width))] flex-col max-[800px]:min-h-[980px]"
	>
		<ul class="list-none p-0" role="list" aria-busy={!loaded}>
			{#if !loaded}
				{#each skeletonItems as i (i)}
					<li
						class="border-b border-[rgba(255,255,255,0.05)] first:border-t first:border-[rgba(255,255,255,0.05)]"
					>
						<MatchRowSkeleton />
					</li>
				{/each}
			{:else}
				{#each filteredMatches as match (`${match.stadiumId}-${match.localDate}`)}
					<li
						class="border-b border-[rgba(255,255,255,0.05)] first:border-t first:border-[rgba(255,255,255,0.05)]"
					>
						<MatchRow {match} />
					</li>
				{/each}
			{/if}
		</ul>

		{#if loaded && filteredMatches.length === 0}
			<div
				class="flex flex-1 items-center justify-center text-center text-[13px] text-text-muted italic"
			>
				<p>Aucun match trouvé pour cette recherche.</p>
			</div>
		{/if}
	</div>
</section>
