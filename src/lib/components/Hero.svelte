<script lang="ts">
  import Counter from './Counter.svelte';
  import trophyUrl from '$lib/assets/trophy-light.webp';

  interface Props {
    targetDate: Date;
    trophyColored?: boolean;
  }

  const { targetDate, trophyColored = false }: Props = $props();
</script>

<section class="hero">
  <div class="hero-card" class:trophy-active={trophyColored}>
    <div class="trophy-wrap" aria-label="Coupe du monde FIFA">
      <img src={trophyUrl} alt="Coupe du monde FIFA 2026" />
    </div>
    <Counter {targetDate} />
  </div>
</section>
