<script lang="ts">
	import { resolve } from '$app/paths';
	import { OG_IMAGE_PATH, OG_IMAGE_TYPE, SITE_URL } from '$lib/config/site.js';
	import BestThirdPlacesTable from '$lib/components/bracket/BestThirdPlacesTable.svelte';
	import BracketView from '$lib/components/bracket/BracketView.svelte';
	import GroupStandingsGrid from '$lib/components/bracket/GroupStandingsGrid.svelte';

	const title = 'Tableau éliminatoire — CDM 2026';
	const description = 'Tableau des phases finales de la Coupe du Monde FIFA 2026';
	const ogImageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={`${SITE_URL}/tableau`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:url" content={`${SITE_URL}/tableau`} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:type" content={OG_IMAGE_TYPE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Logo CDM 2026 — Compte à rebours" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<section class="w-full px-6 pt-10 pb-20 max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-[60px]">
	<header
		class="mx-auto mb-8 flex w-[min(100%,var(--shell-width))] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
	>
		<div>
			<a
				class="mb-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-text-muted no-underline transition-colors duration-150 hover:text-text-primary"
				href={resolve('/')}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M8.75 2.625L4.375 7L8.75 11.375"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Retour à l'accueil
			</a>
			<h1 class="text-[28px] font-black tracking-[-0.02em] text-white uppercase">
				Tableau éliminatoire
			</h1>
			<p class="mt-2 max-w-[520px] text-[13px] font-medium text-text-muted">
				Phases finales de la Coupe du Monde 2026, du 16e de finale à la finale.
			</p>
		</div>
		<a
			class="inline-flex h-9 shrink-0 items-center justify-center rounded-[8px] border border-ring-subtle px-3.5 text-[12px] font-bold text-text-muted no-underline transition-[color,border-color,background] duration-150 hover:border-ring-active hover:text-text-primary"
			href="{resolve('/')}#matches"
		>
			Voir la liste des matchs
		</a>
	</header>

	<BracketView />

	<BestThirdPlacesTable />

	<GroupStandingsGrid />
</section>
