<script lang="ts">
	import { getFlagUrl } from '$lib/config/site.js';
	import { nationSearch, type NationSearchResult } from '$lib/search/nations-index.js';
	import type { GroupId } from '$lib/types/index.js';
	import {
		FINAL_STAGE_FILTERS,
		clearNation,
		filters,
		selectNation,
		toggleFinalStage,
		toggleGroup
	} from './match-filters.svelte.js';

	const GROUP_IDS: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
	const LISTBOX_ID = 'match-search-listbox';
	const OPTION_ID_PREFIX = 'match-search-option-';

	let showDropdown = $state(false);
	let activeIndex = $state(-1);

	const suggestions = $derived.by<NationSearchResult[]>(() => {
		const q = filters.query.trim();
		if (!q || filters.selectedNationId) return [];
		return nationSearch.search(q) as unknown as NationSearchResult[];
	});

	const hasSuggestions = $derived(showDropdown && suggestions.length > 0);
	const activeOptionId = $derived(
		hasSuggestions && activeIndex >= 0 ? `${OPTION_ID_PREFIX}${activeIndex}` : null
	);

	function handleSelect(result: NationSearchResult): void {
		selectNation(result);
		showDropdown = false;
		activeIndex = -1;
	}

	function handleInput(): void {
		showDropdown = true;
		activeIndex = -1;
		if (filters.selectedNationId) {
			filters.selectedNationId = null;
			filters.selectedNationName = null;
			filters.selectedNationCode = null;
		}
	}

	function handleBlur(): void {
		showDropdown = false;
		activeIndex = -1;
	}

	function handleFocus(): void {
		if (filters.query.trim()) showDropdown = true;
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (!hasSuggestions && event.key !== 'ArrowDown') return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (!showDropdown && filters.query.trim()) showDropdown = true;
				activeIndex = activeIndex < suggestions.length - 1 ? activeIndex + 1 : 0;
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1;
				break;
			case 'Enter':
				if (activeIndex >= 0 && activeIndex < suggestions.length) {
					event.preventDefault();
					handleSelect(suggestions[activeIndex]);
				}
				break;
			case 'Escape':
				if (showDropdown) {
					event.preventDefault();
					showDropdown = false;
					activeIndex = -1;
				}
				break;
			case 'Home':
				if (showDropdown) {
					event.preventDefault();
					activeIndex = 0;
				}
				break;
			case 'End':
				if (showDropdown) {
					event.preventDefault();
					activeIndex = suggestions.length - 1;
				}
				break;
		}
	}
</script>

<div class="mx-auto mb-6 flex w-[min(100%,var(--shell-width))] flex-col gap-2.5">
	<div class="relative flex items-center">
		<span
			class="pointer-events-none absolute left-3 z-[1] flex items-center text-text-muted"
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

		{#if filters.selectedNationId && filters.selectedNationCode && filters.selectedNationName}
			<div
				class="flex h-10 w-full min-w-0 items-center gap-2 rounded-[10px] border border-ring-active bg-surface-card pr-2.5 pl-[38px]"
			>
				<img
					src={getFlagUrl(filters.selectedNationCode)}
					alt={filters.selectedNationName}
					width={24}
					height={16}
					class="shrink-0 rounded-[2px] object-cover"
				/>
				<span
					class="min-w-0 flex-1 overflow-hidden text-[13px] font-semibold text-ellipsis whitespace-nowrap text-text-primary italic"
				>
					{filters.selectedNationName}
				</span>
				<button
					class="flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-text-muted transition-[color,background] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-text-primary"
					onclick={() => clearNation()}
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
				bind:value={filters.query}
				oninput={handleInput}
				onblur={handleBlur}
				onfocus={handleFocus}
				onkeydown={handleKeyDown}
				type="text"
				class="h-10 w-full rounded-[10px] border border-ring-subtle bg-surface-card px-3 pl-[38px] text-[13px] font-medium text-text-primary italic transition-[border-color] duration-150 outline-none placeholder:text-text-muted focus:border-ring-active"
				style="font-family: inherit"
				placeholder="Rechercher un pays..."
				autocomplete="off"
				spellcheck="false"
				role="combobox"
				aria-expanded={hasSuggestions}
				aria-controls={LISTBOX_ID}
				aria-autocomplete="list"
				aria-activedescendant={activeOptionId ?? undefined}
				aria-label="Rechercher un pays"
			/>
		{/if}

		{#if hasSuggestions}
			<ul
				id={LISTBOX_ID}
				class="absolute top-[calc(100%+4px)] right-0 left-0 z-[100] m-0 max-h-[280px] list-none overflow-y-auto rounded-[10px] border border-ring-active bg-[#131322] p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
				role="listbox"
				aria-label="Suggestions de pays"
			>
				{#each suggestions as result, index (result.id)}
					<li
						id={`${OPTION_ID_PREFIX}${index}`}
						role="option"
						aria-selected={index === activeIndex}
						class={[
							'flex cursor-pointer items-center gap-2.5 rounded-[7px] px-2.5 py-2 transition-[background] duration-[120ms] hover:bg-[rgba(255,255,255,0.06)]',
							index === activeIndex && 'bg-[rgba(255,255,255,0.08)]'
						]}
						onmousedown={(event) => {
							event.preventDefault();
							handleSelect(result);
						}}
						onmouseenter={() => (activeIndex = index)}
					>
						<img
							src={getFlagUrl(result.code)}
							alt=""
							width={24}
							height={16}
							class="shrink-0 rounded-[2px] object-cover"
						/>
						<span class="flex-1 text-[13px] font-semibold text-text-primary italic">
							{result.name}
						</span>
						<span class="shrink-0 text-[11px] font-medium text-text-muted italic">
							Groupe {result.group}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par groupe ou phase finale">
		{#each GROUP_IDS as group (group)}
			<button
				class={[
					'h-[26px] min-w-[30px] cursor-pointer rounded-[6px] border border-ring-subtle bg-transparent px-2 text-[12px] font-bold text-text-muted italic transition-[color,border-color,background] duration-150 hover:border-ring-active hover:text-text-primary',
					filters.selectedGroup === group &&
						'border-ring-active bg-[rgba(255,255,255,0.1)] text-text-primary'
				]}
				onclick={() => toggleGroup({ group })}
				type="button"
				style="font-family: inherit"
				aria-pressed={filters.selectedGroup === group}
			>
				{group}
			</button>
		{/each}

		{#each FINAL_STAGE_FILTERS as filter (filter.id)}
			<button
				class={[
					'h-[26px] min-w-[38px] cursor-pointer rounded-[6px] border border-ring-subtle bg-transparent px-2 text-[12px] font-bold text-text-muted italic transition-[color,border-color,background] duration-150 hover:border-ring-active hover:text-text-primary',
					filters.selectedFinalStage === filter.id &&
						'border-ring-active bg-[rgba(255,255,255,0.1)] text-text-primary'
				]}
				onclick={() => toggleFinalStage({ filterId: filter.id })}
				type="button"
				style="font-family: inherit"
				aria-pressed={filters.selectedFinalStage === filter.id}
				aria-label={`Filtrer par ${filter.label}`}
			>
				{filter.label}
			</button>
		{/each}
	</div>
</div>
