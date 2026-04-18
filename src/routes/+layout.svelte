<script lang="ts">
	import './layout.css';
	import trophyUrl from '$lib/assets/trophy.svg';

	const { children } = $props();
</script>

<svelte:head>
	<title>CDM 2026 — Compte à rebours</title>
	<meta
		name="description"
		content="Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="CDM 2026 — Compte à rebours" />
	<meta
		property="og:description"
		content="Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026"
	/>
	<meta property="og:locale" content="fr_FR" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="CDM 2026 — Compte à rebours" />
	<meta
		name="twitter:description"
		content="Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026"
	/>
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
