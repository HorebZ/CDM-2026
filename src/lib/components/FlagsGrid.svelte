<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import FlagBadge from './FlagBadge.svelte';

	interface Props {
		nations: Nation[];
		celebrating?: boolean;
	}

	const { nations, celebrating = false }: Props = $props();

	function buildDesktopNations(nations: Nation[]): Nation[] {
		const nationsByGroup = Object.values(
			nations.reduce<Record<string, Nation[]>>((groups, nation) => {
				(groups[nation.group] ??= []).push(nation);
				return groups;
			}, {})
		);
		const maxGroupSize = Math.max(...nationsByGroup.map((group) => group.length), 0);
		const ordered: Nation[] = [];

		for (let rowIndex = 0; rowIndex < maxGroupSize; rowIndex += 1) {
			for (const group of nationsByGroup) {
				const nation = group[rowIndex];
				if (nation) ordered.push(nation);
			}
		}

		return ordered;
	}

	const desktopNations = $derived(buildDesktopNations(nations));
	const desktopGridClasses =
		'grid w-[min(100%,calc(var(--flag-size)*12+var(--flag-gap)*11))] auto-cols-auto grid-cols-[repeat(12,var(--flag-size))] grid-rows-[repeat(4,var(--flag-size))] justify-center gap-y-(--flag-row-gap) gap-x-(--flag-gap)';
	const mobileGridClasses =
		'grid w-[min(100%,calc(var(--flag-size)*12+var(--flag-gap)*11))] auto-cols-auto grid-cols-[repeat(10,var(--flag-size))] justify-center gap-y-(--flag-row-gap) gap-x-(--flag-gap) max-[980px]:grid-cols-[repeat(8,var(--flag-size))] max-[800px]:grid-cols-[repeat(6,var(--flag-size))] max-[560px]:w-[min(100%,calc(var(--flag-size)*5+var(--flag-gap)*4))] max-[560px]:grid-cols-[repeat(4,var(--flag-size))] max-[560px]:justify-between max-[420px]:grid-cols-[repeat(4,var(--flag-size))]';
</script>

<section class="flex w-full justify-center" aria-label="48 nations qualifiées CDM 2026">
	<div class={`flags-grid-desktop ${desktopGridClasses}`}>
		{#each desktopNations as nation (nation.code)}
			<FlagBadge {nation} {celebrating} />
		{/each}
	</div>

	<div class={`flags-grid-mobile ${mobileGridClasses}`}>
		{#each nations as nation (nation.code)}
			<FlagBadge {nation} {celebrating} />
		{/each}
	</div>
</section>

<style>
	.flags-grid-mobile {
		display: none;
	}

	@media (max-width: 1150px) {
		.flags-grid-desktop {
			display: none;
		}

		.flags-grid-mobile {
			display: grid;
		}
	}
</style>
