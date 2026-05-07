<script lang="ts">
	import './layout.css';
	import trophyUrl from '$lib/assets/trophy.svg';
	import { OG_IMAGE_PATH, OG_IMAGE_TYPE, SITE_URL } from '$lib/config/site.js';

	const { children } = $props();

	const title = 'CDM 2026 — Compte à rebours';
	const description = "Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026";
	const ogImageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={`${SITE_URL}/`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:url" content={`${SITE_URL}/`} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:type" content={OG_IMAGE_TYPE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Logo CDM 2026 — Compte à rebours" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
	<link rel="icon" type="image/webp" href={trophyUrl} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="preload"
		href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@1,700;1,900&display=swap"
		as="style"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@1,700;1,900&display=swap"
		rel="stylesheet"
	/>
	<link rel="preload" href={trophyUrl} as="image" type="image/webp" />
</svelte:head>

{@render children()}
