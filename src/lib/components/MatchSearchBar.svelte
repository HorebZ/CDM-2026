<script lang="ts">
	import { nationSearch, type NationSearchResult } from '$lib/search/nations-index.js';
	import { MATCHES } from '$lib/data/matches.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import type { GroupId, Match } from '$lib/types/index.js';

	const GROUP_IDS: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

	interface Props {
		onfilter: (matches: Match[]) => void;
	}

	const { onfilter }: Props = $props();

	let query = $state('');
	let selectedNationId = $state<string | null>(null);
	let selectedNation = $state<NationSearchResult | null>(null);
	let selectedGroup = $state<GroupId | null>(null);
	let showDropdown = $state(false);
	let inputEl = $state<HTMLInputElement | null>(null);

	const suggestions = $derived.by(() => {
		const q = query.trim();
		if (!q || selectedNationId) return [];
		return nationSearch.search(q) as unknown as NationSearchResult[];
	});

	$effect(() => {
		const filtered = MATCHES.filter((match) => {
			const matchesNation =
				!selectedNationId ||
				match.sides.some((side) => side.nationId === selectedNationId);
			const matchesGroup = !selectedGroup || match.group === selectedGroup;
			return matchesNation && matchesGroup;
		});
		onfilter(filtered);
	});

	function selectNation(result: NationSearchResult) {
		selectedNationId = result.id;
		selectedNation = result;
		query = '';
		showDropdown = false;
	}

	function clearNation() {
		selectedNationId = null;
		selectedNation = null;
		query = '';
	}

	function toggleGroup(group: GroupId) {
		selectedGroup = selectedGroup === group ? null : group;
	}

	function handleInput() {
		showDropdown = true;
		if (selectedNationId) {
			selectedNationId = null;
			selectedNation = null;
		}
	}

	function handleBlur() {
		setTimeout(() => {
			showDropdown = false;
		}, 150);
	}

	function handleFocus() {
		if (query.trim()) showDropdown = true;
	}
</script>

<div class="match-search-bar">
	<div class="match-search-input-wrapper">
		<span class="match-search-icon" aria-hidden="true">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5" />
				<line x1="10.354" y1="10.646" x2="14.354" y2="14.646" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		</span>

		{#if selectedNation}
			<div class="match-search-chip">
				<img
					src={getFlagUrl(selectedNation.code)}
					alt={selectedNation.name}
					width={24}
					height={16}
					class="match-search-chip-flag"
				/>
				<span class="match-search-chip-name">{selectedNation.name}</span>
				<button class="match-search-chip-clear" onclick={clearNation} aria-label="Supprimer le filtre pays">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
						<line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</button>
			</div>
		{:else}
			<input
				bind:this={inputEl}
				bind:value={query}
				oninput={handleInput}
				onblur={handleBlur}
				onfocus={handleFocus}
				type="text"
				class="match-search-input"
				placeholder="Rechercher un pays..."
				autocomplete="off"
				spellcheck="false"
			/>
		{/if}

		{#if showDropdown && suggestions.length > 0}
			<ul class="match-search-dropdown" role="listbox">
				{#each suggestions as result (result.id)}
					<li role="option" aria-selected="false">
						<button
							class="match-search-dropdown-item"
							onmousedown={() => selectNation(result)}
							type="button"
						>
							<img
								src={getFlagUrl(result.code)}
								alt={result.name}
								width={24}
								height={16}
								class="match-search-dropdown-flag"
							/>
							<span class="match-search-dropdown-name">{result.name}</span>
							<span class="match-search-dropdown-group">Groupe {result.group}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="match-search-groups" role="group" aria-label="Filtrer par groupe">
		{#each GROUP_IDS as group (group)}
			<button
				class="match-search-group-pill"
				class:is-active={selectedGroup === group}
				onclick={() => toggleGroup(group)}
				type="button"
				aria-pressed={selectedGroup === group}
			>
				{group}
			</button>
		{/each}
	</div>
</div>
