<script lang="ts">
	import FlagsGrid from '$lib/components/FlagsGrid.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import MatchesListRows from '$lib/components/matches/MatchesListRows.svelte';
	import { OPENING_MATCH_DATE } from '$lib/config/site.js';
	import { getDaysRemaining } from '$lib/utils/date.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentTime = $state(Date.now());
	const forceActiveFlags = $derived(
		getDaysRemaining(OPENING_MATCH_DATE, new Date(currentTime)) > 0
	);
	const enabledCount = $derived(data.nations.filter((nation) => nation.enabled).length);
	const celebrating = $derived(
		getDaysRemaining(OPENING_MATCH_DATE, new Date(currentTime)) === 0 && enabledCount === 1
	);
	const matchCountLabel = $derived(
		`${data.matches.length} match${data.matches.length > 1 ? 's' : ''}`
	);
	const participationLabel = $derived(
		`${data.nation.participation} participation${data.nation.participation > 1 ? 's' : ''}`
	);

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = Date.now();
		}, 60_000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>{data.nation.name} | TV | CDM 2026</title>
</svelte:head>

<div class="tv-layout grid min-h-screen xl:grid-cols-[minmax(0,2fr)_minmax(420px,1fr)]">
	<section
		class="tv-stage flex min-h-[68vh] items-center justify-center px-6 pt-11 pb-20 max-[800px]:pt-9 max-[560px]:px-4 xl:min-h-screen xl:pb-11"
		aria-labelledby="tv-country-title"
	>
		<main
			class="flex w-[min(100%,var(--shell-width))] flex-col items-center gap-[52px] max-[800px]:gap-10"
		>
			<Hero targetDate={OPENING_MATCH_DATE} nations={data.nations} />
			<FlagsGrid nations={data.nations} {celebrating} forceActive={forceActiveFlags} />
		</main>
	</section>

	<aside
		class="tv-sidebar flex min-h-[32vh] flex-col overflow-hidden px-6 pb-6 max-[560px]:px-4 xl:min-h-screen xl:border-l xl:border-[rgba(255,255,255,0.06)] xl:px-0 xl:pb-0"
	>
		<header class="tv-sidebar-header px-0 py-5 max-[560px]:py-4 xl:px-6">
			<div class="flex items-end justify-between gap-3">
				<div class="min-w-0">
					<h1
						id="tv-country-title"
						class="tv-title truncate text-[34px] font-black text-white uppercase"
					>
						{data.nation.name}
					</h1>
					<div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-text-muted">
						<p class="tv-meta font-semibold uppercase">{data.nation.confederation}</p>
						<p class="tv-meta">{participationLabel}</p>
					</div>
				</div>
				<p class="tv-match-count shrink-0 text-[13px] font-semibold text-text-muted">
					{matchCountLabel}
				</p>
			</div>
		</header>

		<div class="tv-matches flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-2 xl:px-4">
			<MatchesListRows matches={data.matches} emptyMessage="Aucun match prévu pour cette nation." />
		</div>
	</aside>
</div>

<style>
	.tv-stage {
		--shell-width: 920px;
		--flag-size: 68px;
		--flag-gap: 28px;
		--flag-row-gap: 48px;
	}

	@media (min-width: 2200px) {
		.tv-layout {
			grid-template-columns: minmax(0, 2.1fr) minmax(520px, 1fr);
		}

		.tv-stage {
			--shell-width: 1220px;
			--flag-size: 82px;
			--flag-gap: 32px;
			--flag-row-gap: 54px;
			--hero-card-gap: 24px;
			--hero-card-radius: 28px;
			--hero-card-py: 22px;
			--hero-card-px: 34px;
			--hero-card-pl: 28px;
			--hero-trophy-width: 96px;
			--hero-trophy-height: 128px;
			--counter-value-size: 82px;
			--counter-value-size-mobile: 60px;
			--counter-label-size: 50px;
			--counter-label-size-mobile: 34px;
			--counter-label-tracking: 2.5px;
			--counter-flag-width: 150px;
			--counter-flag-height: 112px;
		}

		.tv-sidebar {
			padding-right: 1.5rem;
		}

		.tv-sidebar-header {
			padding-top: 2rem;
			padding-bottom: 1.5rem;
		}

		.tv-meta,
		.tv-match-count {
			font-size: 16px;
		}

		.tv-title {
			font-size: 52px;
		}
	}

	@media (min-width: 3000px) {
		.tv-layout {
			grid-template-columns: minmax(0, 2.2fr) minmax(620px, 1fr);
		}

		.tv-stage {
			--shell-width: 1480px;
			--flag-size: 94px;
			--flag-gap: 36px;
			--flag-row-gap: 62px;
			--hero-card-gap: 28px;
			--hero-card-radius: 34px;
			--hero-card-py: 26px;
			--hero-card-px: 40px;
			--hero-card-pl: 32px;
			--hero-trophy-width: 110px;
			--hero-trophy-height: 146px;
			--counter-value-size: 96px;
			--counter-value-size-mobile: 68px;
			--counter-label-size: 58px;
			--counter-label-size-mobile: 38px;
			--counter-label-tracking: 3px;
			--counter-flag-width: 170px;
			--counter-flag-height: 128px;
		}

		.tv-sidebar {
			padding-right: 2rem;
		}

		.tv-sidebar-header {
			padding-top: 2.5rem;
			padding-bottom: 1.75rem;
		}

		.tv-meta,
		.tv-match-count {
			font-size: 18px;
		}

		.tv-title {
			font-size: 64px;
		}
	}
</style>
