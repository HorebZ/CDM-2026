<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import MatchSearchBar from './MatchSearchBar.svelte';
	import MatchesListRows from './MatchesListRows.svelte';
	import { MATCHES } from '$lib/data/matches.js';
	import {
		applyFilters,
		filters,
		filtersToSearchParams,
		hydrateFiltersFromSearchParams
	} from './match-filters.svelte.js';

	const filteredMatches = $derived(applyFilters({ matches: MATCHES, filters }));

	let hydrated = $state(false);

	onMount(() => {
		hydrateFiltersFromSearchParams(new URLSearchParams(window.location.search));
		hydrated = true;
	});

	$effect(() => {
		if (!browser || !hydrated) return;

		const qs = filtersToSearchParams(filters).toString();
		const { pathname, hash, search } = window.location;
		const nextSearch = qs ? `?${qs}` : '';

		if (nextSearch === search) return;

		window.history.replaceState(window.history.state, '', `${pathname}${nextSearch}${hash}`);
	});
</script>

<section
	id="matches"
	class="w-full px-6 pt-10 pb-20 max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-[60px]"
>
	<MatchSearchBar />

	<div
		class="mx-auto flex min-h-[700px] w-[min(100%,var(--shell-width))] flex-col max-[800px]:min-h-[980px]"
	>
		<MatchesListRows matches={filteredMatches} />
	</div>
</section>
