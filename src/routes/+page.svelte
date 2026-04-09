<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FlagsGrid from '$lib/components/FlagsGrid.svelte';
	import SiteInfoBadge from '$lib/components/SiteInfoBadge.svelte';
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

<div class="page-wrapper">
	<main class="layout-shell">
		<Hero targetDate={OPENING_MATCH_DATE} {nations} />
		<FlagsGrid {nations} {celebrating} />
	</main>

	<SiteInfoBadge />
</div>
