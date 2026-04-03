<script lang="ts">
  import type { Nation } from '$lib/types/index.js';
  import FlagBadge from './FlagBadge.svelte';

  interface Props {
    nations: Nation[];
    celebrating?: boolean;
  }

  const { nations, celebrating = false }: Props = $props();
</script>

<section class="flags-section" aria-label="48 nations qualifiées CDM 2026">
  <div class="flags-grid">
    {#each nations as nation (nation.code)}
      <FlagBadge {nation} {celebrating} />
    {/each}
  </div>
</section>
