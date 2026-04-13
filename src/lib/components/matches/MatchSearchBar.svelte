<script lang="ts">
	import { getFlagUrl } from '$lib/config/site.js';
	import { MATCHES } from '$lib/data/matches.js';
	import { nationSearch, type NationSearchResult } from '$lib/search/nations-index.js';
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
				!selectedNationId || match.sides.some((side) => side.nationId === selectedNationId);
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

<div class="mx-auto mb-6 flex w-[min(100%,var(--shell-width))] flex-col gap-2.5">
	<div class="relative flex items-center">
		<span
			class="pointer-events-none absolute left-3 z-[1] flex items-center text-[var(--text-muted)]"
			aria-hidden="true"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5" />
				<line
					x1="10.354"
					y1="10.646"
					x2="14.354"
					y2="14.646"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		</span>

		{#if selectedNation}
			<div
				class="flex h-10 w-full min-w-0 items-center gap-2 rounded-[10px] border border-[var(--ring-active)] bg-[var(--bg-card)] pr-2.5 pl-[38px]"
			>
				<img
					src={getFlagUrl(selectedNation.code)}
					alt={selectedNation.name}
					width={24}
					height={16}
					class="shrink-0 rounded-[2px] object-cover"
				/>
				<span
					class="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold italic text-[var(--text-primary)]"
				>
					{selectedNation.name}
				</span>
				<button
					class="flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-[var(--text-muted)] transition-[color,background] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--text-primary)]"
					onclick={clearNation}
					aria-label="Supprimer le filtre pays"
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line
							x1="1"
							y1="1"
							x2="11"
							y2="11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
						<line
							x1="11"
							y1="1"
							x2="1"
							y2="11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
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
				class="h-10 w-full rounded-[10px] border border-[var(--ring)] bg-[var(--bg-card)] px-3 pl-[38px] text-[13px] font-medium italic text-[var(--text-primary)] outline-none transition-[border-color] duration-150 placeholder:text-[var(--text-muted)] focus:border-[var(--ring-active)]"
				style="font-family: inherit"
				placeholder="Rechercher un pays..."
				autocomplete="off"
				spellcheck="false"
			/>
		{/if}

		{#if showDropdown && suggestions.length > 0}
			<ul
				class="absolute top-[calc(100%+4px)] right-0 left-0 z-[100] m-0 max-h-[280px] list-none overflow-y-auto rounded-[10px] border border-[var(--ring-active)] bg-[#131322] p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
				role="listbox"
			>
				{#each suggestions as result (result.id)}
					<li role="option" aria-selected="false">
						<button
							class="flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] border-0 bg-transparent px-2.5 py-2 text-left transition-[background] duration-[120ms] hover:bg-[rgba(255,255,255,0.06)]"
							onmousedown={() => selectNation(result)}
							type="button"
						>
							<img
								src={getFlagUrl(result.code)}
								alt={result.name}
								width={24}
								height={16}
								class="shrink-0 rounded-[2px] object-cover"
							/>
							<span class="flex-1 text-[13px] font-semibold italic text-[var(--text-primary)]">
								{result.name}
							</span>
							<span class="shrink-0 text-[11px] font-medium italic text-[var(--text-muted)]">
								Groupe {result.group}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par groupe">
		{#each GROUP_IDS as group (group)}
			<button
				class="h-[26px] min-w-[30px] cursor-pointer rounded-[6px] border border-[var(--ring)] bg-transparent px-2 text-[12px] font-bold italic text-[var(--text-muted)] transition-[color,border-color,background] duration-150 hover:border-[var(--ring-active)] hover:text-[var(--text-primary)]"
				class:border-[var(--ring-active)]={selectedGroup === group}
				class:bg-[rgba(255,255,255,0.1)]={selectedGroup === group}
				class:text-[var(--text-primary)]={selectedGroup === group}
				onclick={() => toggleGroup(group)}
				type="button"
				style="font-family: inherit"
				aria-pressed={selectedGroup === group}
			>
				{group}
			</button>
		{/each}
	</div>
</div>
