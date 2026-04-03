<script lang="ts">
  import Counter from './Counter.svelte';
  import trophyUrl from '$lib/assets/trophy-light.webp';
  import type { Nation } from '$lib/types/index.js';

  interface Props {
    targetDate: Date;
    trophyColored?: boolean;
    nations?: Nation[];
  }

  const { targetDate, trophyColored = false, nations = [] }: Props = $props();
</script>

<section class="hero">
  <div class="hero-card" class:trophy-active={trophyColored}>
    <div class="trophy-wrap" aria-label="Coupe du monde FIFA">
      <img src={trophyUrl} alt="Coupe du monde FIFA 2026" />
    </div>
    <Counter {targetDate} {nations} />
  </div>
</section>
