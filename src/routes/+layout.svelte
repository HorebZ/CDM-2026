<script lang="ts">
  import './layout.css';
  import trophyUrl from '$lib/assets/trophy.png';

  const { children } = $props();
</script>

<svelte:head>
  <title>CDM 2026 — Compte à rebours</title>
  <meta name="description" content="Compte à rebours avant le match d'ouverture de la Coupe du Monde FIFA 2026" />
  <link rel="icon" type="image/png" href={trophyUrl} />
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
  <link rel="preload" href={trophyUrl} as="image" type="image/png" />
</svelte:head>

{@render children()}
