<script lang="ts">
	import { MATCHES } from '$lib/data/matches.js';
	import MatchRow from './MatchRow.svelte';
</script>

<section id="matches" class="matches-section">
	<ul class="matches-list" role="list">
		{#each MATCHES as match, i (i)}
			<li class="matches-list-item">
				<MatchRow {match} />
			</li>
		{/each}
	</ul>

	<div class="flex items-center justify-center">
		<p class="text-sm text-gray-400">(la suite arrive bientôt...)</p>
	</div>
</section>
