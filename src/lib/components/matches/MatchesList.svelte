<script lang="ts">
	import { MATCHES } from '$lib/data/matches.js';
	import type { Match } from '$lib/types/index.js';
	import MatchRow from './MatchRow.svelte';
	import MatchSearchBar from './MatchSearchBar.svelte';

	let filteredMatches = $state<Match[]>(MATCHES);
</script>

<section id="matches" class="matches-section">
	<MatchSearchBar onfilter={(matches) => (filteredMatches = matches)} />

	<ul class="matches-list" role="list">
		{#each filteredMatches as match, i (i)}
			<li class="matches-list-item">
				<MatchRow {match} />
			</li>
		{/each}
	</ul>

	{#if filteredMatches.length === 0}
		<div class="matches-empty">
			<p>Aucun match trouvé pour cette recherche.</p>
		</div>
	{/if}

	<div class="flex items-center justify-center">
		<p class="text-sm text-gray-400">(la suite arrive bientôt...)</p>
	</div>
</section>
