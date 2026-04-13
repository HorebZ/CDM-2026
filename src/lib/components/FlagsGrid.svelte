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
		class="grid w-[min(100%,calc(var(--flag-size)*12+var(--flag-gap)*11))] auto-cols-auto grid-cols-[repeat(12,var(--flag-size))] grid-rows-[repeat(4,var(--flag-size))] auto-flow-col justify-center gap-y-(--flag-row-gap) gap-x-(--flag-gap) max-[1150px]:grid-cols-[repeat(10,var(--flag-size))] max-[1150px]:grid-rows-none max-[1150px]:auto-flow-row max-[980px]:grid-cols-[repeat(8,var(--flag-size))] max-[800px]:grid-cols-[repeat(6,var(--flag-size))] max-[560px]:w-[min(100%,calc(var(--flag-size)*5+var(--flag-gap)*4))] max-[560px]:grid-cols-[repeat(4,var(--flag-size))] max-[560px]:justify-between max-[420px]:grid-cols-[repeat(4,var(--flag-size))]"
	>
		{#each nations as nation (nation.code)}
			<FlagBadge {nation} {celebrating} />
		{/each}
	</div>
</section>
