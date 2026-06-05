<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import FlagBadge from './FlagBadge.svelte';

	interface Props {
		nations: Nation[];
		celebrating?: boolean;
		columns?: number;
	}

	const { nations, celebrating = false, columns = 12 }: Props = $props();

	const rowCount = $derived(Math.ceil(nations.length / columns));
	const largeColumns = $derived(Math.min(columns, 10));
	const mediumColumns = $derived(Math.min(columns, 8));
	const smallColumns = $derived(Math.min(columns, 6));
	const narrowColumns = $derived(Math.min(columns, 4));
	const gridWidth = $derived(
		`min(100%, calc(var(--flag-size) * ${columns} + var(--flag-gap) * ${Math.max(columns - 1, 0)}))`
	);
	const narrowWidth = $derived(
		`min(100%, calc(var(--flag-size) * ${narrowColumns} + var(--flag-gap) * ${Math.max(narrowColumns - 1, 0)}))`
	);
	const ariaLabel = $derived(`${nations.length} nations qualifiées CDM 2026`);
</script>

<section class="flex w-full justify-center" aria-label={ariaLabel}>
	<div
		class="flags-grid grid w-[min(100%,calc(var(--flag-size)*12+var(--flag-gap)*11))] justify-center gap-x-(--flag-gap) gap-y-(--flag-row-gap)"
		style={`--grid-columns: ${columns}; --grid-rows: ${rowCount}; --grid-columns-lg: ${largeColumns}; --grid-columns-md: ${mediumColumns}; --grid-columns-sm: ${smallColumns}; --grid-columns-xs: ${narrowColumns}; width: ${gridWidth}; --grid-width-xs: ${narrowWidth};`}
	>
		{#each nations as nation (nation.code)}
			<FlagBadge {nation} {celebrating} />
		{/each}
	</div>
</section>

<style>
	/*
	 * Desktop (>1150px) : grille paramétrable, remplie colonne par colonne.
	 * L'ordre d'entrée étant "groupe par groupe" (A[0..3], B[0..3], ...), le
	 * remplissage colonne-par-colonne place chaque groupe dans sa propre colonne.
	 *
	 * Mobile (≤1150px) : grid-auto-flow: row (défaut) + colonnes variables selon
	 * le breakpoint. À 4 colonnes (≤560px), l'ordre d'entrée place chaque groupe
	 * sur sa propre ligne (4 consécutifs par groupe).
	 */
	.flags-grid {
		grid-auto-flow: column;
		grid-template-rows: repeat(var(--grid-rows), var(--flag-size));
		grid-template-columns: repeat(var(--grid-columns), var(--flag-size));
	}

	@media (max-width: 1150px) {
		.flags-grid {
			grid-auto-flow: row;
			grid-template-rows: none;
			grid-template-columns: repeat(var(--grid-columns-lg), var(--flag-size));
		}
	}

	@media (max-width: 980px) {
		.flags-grid {
			grid-template-columns: repeat(var(--grid-columns-md), var(--flag-size));
		}
	}

	@media (max-width: 800px) {
		.flags-grid {
			grid-template-columns: repeat(var(--grid-columns-sm), var(--flag-size));
		}
	}

	@media (max-width: 560px) {
		.flags-grid {
			width: var(--grid-width-xs);
			grid-template-columns: repeat(var(--grid-columns-xs), var(--flag-size));
			justify-content: space-between;
		}
	}
</style>
