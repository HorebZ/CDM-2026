<script lang="ts">
  import type { Nation } from '$lib/types/index.js';
  import { getFlagUrl } from '$lib/config/site.js';
  import Confetti from './Confetti.svelte';

  interface Props {
    targetDate: Date;
    nations?: Nation[];
  }

  const { targetDate, nations = [] }: Props = $props();

  function getDaysRemaining(date: Date, currentTime: number): number {
    const now = new Date(currentTime);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffMs = target.getTime() - today.getTime();

    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  let currentTime = $state(Date.now());
  const days = $derived(getDaysRemaining(targetDate, currentTime));

  $effect(() => {
    const interval = setInterval(() => {
      currentTime = Date.now();
    }, 60 * 1000);

    return () => clearInterval(interval);
  });

  const enabledNations = $derived(nations.filter((n) => n.enabled));
  const showTeamCount = $derived(days <= 8 && enabledNations.length > 1);
  const showSingleFlag = $derived(days <= 8 && enabledNations.length === 1);
  const showDays = $derived(!showTeamCount && !showSingleFlag);
  const showConfetti = $derived(days === 0 && enabledNations.length === 1);
</script>

<Confetti active={showConfetti} />

<div class="counter">
  {#if showSingleFlag}
    <div class="counter-flag">
      <img
        src={getFlagUrl(enabledNations[0].code)}
        alt={enabledNations[0].name}
        width={120}
        height={90}
      />
      <span class="counter-label">{enabledNations[0].name.toUpperCase()}</span>
    </div>
  {:else if showTeamCount}
    <div class="counter-days">
      <span class="counter-value">{enabledNations.length}</span>
      <span class="counter-label">ÉQUIPE{enabledNations.length > 1 ? 'S' : ''}</span>
    </div>
  {:else if showDays}
    <div class="counter-days">
      <span class="counter-value">{days}</span>
      <span class="counter-label">JOURS</span>
    </div>
  {/if}
</div>
