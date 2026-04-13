<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FlagsGrid from '$lib/components/FlagsGrid.svelte';
	import SiteInfoBadge from '$lib/components/SiteInfoBadge.svelte';
	import ScrollChevron from '$lib/components/ScrollChevron.svelte';
	import MatchesList from '$lib/components/matches/MatchesList.svelte';
	import { NATIONS } from '$lib/data/nations.js';
	import { OPENING_MATCH_DATE } from '$lib/config/site.js';

	function getDaysRemaining(date: Date): number {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		return Math.max(0, Math.round((target.getTime() - today.getTime()) / 86_400_000));
	}

	const nations = Object.values(NATIONS);

	const enabledCount = nations.filter((n) => n.enabled).length;
	const celebrating = getDaysRemaining(OPENING_MATCH_DATE) === 0 && enabledCount === 1;
</script>

<div class="flex flex-col items-center">
	<section
		class="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-11 pb-20 max-[800px]:pt-9"
	>
		<main class="flex w-[min(100%,var(--shell-width))] flex-col items-center gap-[52px] max-[800px]:gap-10">
			<Hero targetDate={OPENING_MATCH_DATE} {nations} />
			<FlagsGrid {nations} {celebrating} />
		</main>
		<ScrollChevron targetId="matches" />
	</section>

	<MatchesList />

	<SiteInfoBadge />
</div>
