<script lang="ts">
	import { MATCHES } from '$lib/data/matches.js';
	import type { Match } from '$lib/types/index.js';
	import MatchRow from './MatchRow.svelte';
	import MatchSearchBar from './MatchSearchBar.svelte';

	let filteredMatches = $state<Match[]>(MATCHES);
</script>

<section
	id="matches"
	class="w-full px-6 pt-10 pb-20 max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-[60px]"
>
	<MatchSearchBar onfilter={(matches) => (filteredMatches = matches)} />

	<ul class="mx-auto flex w-[min(100%,var(--shell-width))] list-none flex-col gap-0 p-0" role="list">
		{#each filteredMatches as match, i (i)}
			<li class="border-b border-[rgba(255,255,255,0.05)] first:border-t first:border-[rgba(255,255,255,0.05)]">
				<MatchRow {match} />
			</li>
		{/each}
	</ul>

	{#if filteredMatches.length === 0}
		<div
			class="mx-auto my-10 w-[min(100%,var(--shell-width))] text-center text-[13px] italic text-[var(--text-muted)]"
		>
			<p>Aucun match trouvé pour cette recherche.</p>
		</div>
	{/if}

	<div class="flex items-center justify-center">
		<p class="text-sm text-gray-400">(la suite arrive bientôt...)</p>
	</div>
</section>
