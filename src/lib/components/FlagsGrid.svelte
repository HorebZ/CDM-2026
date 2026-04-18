<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import FlagBadge from './FlagBadge.svelte';

	interface Props {
		nations: Nation[];
		celebrating?: boolean;
	}

	const { nations, celebrating = false }: Props = $props();
</script>

<section class="flex w-full justify-center" aria-label="48 nations qualifiées CDM 2026">
	<div
		class="flags-grid grid w-[min(100%,calc(var(--flag-size)*12+var(--flag-gap)*11))] justify-center gap-x-(--flag-gap) gap-y-(--flag-row-gap)"
	>
		{#each nations as nation (nation.code)}
			<FlagBadge {nation} {celebrating} />
		{/each}
	</div>
</section>

<style>
	/*
	 * Desktop (>1150px) : 12 colonnes × 4 lignes, grid-auto-flow: column.
	 * L'ordre d'entrée étant "groupe par groupe" (A[0..3], B[0..3], ...), le
	 * remplissage colonne-par-colonne place chaque groupe dans sa propre colonne.
	 *
	 * Mobile (≤1150px) : grid-auto-flow: row (défaut) + colonnes variables selon
	 * le breakpoint. À 4 colonnes (≤560px), l'ordre d'entrée place chaque groupe
	 * sur sa propre ligne (4 consécutifs par groupe).
	 */
	.flags-grid {
		grid-auto-flow: column;
		grid-template-rows: repeat(4, var(--flag-size));
		grid-template-columns: repeat(12, var(--flag-size));
	}

	@media (max-width: 1150px) {
		.flags-grid {
			grid-auto-flow: row;
			grid-template-rows: none;
			grid-template-columns: repeat(10, var(--flag-size));
		}
	}

	@media (max-width: 980px) {
		.flags-grid {
			grid-template-columns: repeat(8, var(--flag-size));
		}
	}

	@media (max-width: 800px) {
		.flags-grid {
			grid-template-columns: repeat(6, var(--flag-size));
		}
	}

	@media (max-width: 560px) {
		.flags-grid {
			width: min(100%, calc(var(--flag-size) * 5 + var(--flag-gap) * 4));
			grid-template-columns: repeat(4, var(--flag-size));
			justify-content: space-between;
		}
	}
</style>
