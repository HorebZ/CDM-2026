<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    targetDate: Date;
  }

  const { targetDate }: Props = $props();

  function getDaysRemaining(date: Date): number {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffMs = target.getTime() - today.getTime();

    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  let days = $state(getDaysRemaining(targetDate));

  onMount(() => {
    const interval = setInterval(() => {
      days = getDaysRemaining(targetDate);
    }, 60 * 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="counter">
  <div class="counter-days">
    <span class="counter-value">{days}</span>
    <span class="counter-label">JOURS</span>
  </div>
</div>
