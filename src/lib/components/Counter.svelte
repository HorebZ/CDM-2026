<script lang="ts">
  interface Props {
    targetDate: Date;
  }

  const { targetDate }: Props = $props();

  function getDaysRemaining(date: Date): number {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }

  let days = $state(0);

  $effect(() => {
    days = getDaysRemaining(targetDate);

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
