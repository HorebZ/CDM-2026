<script lang="ts">
  import Counter from './Counter.svelte';
  import trophyUrl from '$lib/assets/trophy.png';
  import type { Nation } from '$lib/types/index.js';

  interface Props {
    targetDate: Date;
    nations?: Nation[];
  }

  const { targetDate, nations = [] }: Props = $props();

  function getDaysRemaining(date: Date): number {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffMs = target.getTime() - today.getTime();
    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  const trophyColored = $derived(getDaysRemaining(targetDate) === 0);
</script>

<section class="hero">
  <div class="hero-card" class:trophy-active={trophyColored}>
    <div class="trophy-wrap" aria-label="Coupe du monde FIFA">
      <img src={trophyUrl} alt="Coupe du monde FIFA 2026" />
    </div>
    <Counter {targetDate} {nations} />
  </div>
</section>
