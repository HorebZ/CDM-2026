<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import FlagsGrid from '$lib/components/FlagsGrid.svelte';
  import { NATIONS } from '$lib/data/nations.js';
  import { OPENING_MATCH_DATE } from '$lib/config/site.js';
</script>

<div class="page-wrapper">
  <main class="layout-shell">
    <Hero targetDate={OPENING_MATCH_DATE} nations={NATIONS} />
    <FlagsGrid nations={NATIONS} />
  </main>
</div>
