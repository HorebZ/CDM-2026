<script lang="ts">
  import './layout.css';
  import trophyUrl from '$lib/assets/trophy.svg';

  const { children } = $props();
</script>

<svelte:head>
  <title>CDM 2026 — Compte à rebours</title>
  <meta name="description" content="Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026" />
  <link rel="icon" type="image/svg+xml" href={trophyUrl} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}
