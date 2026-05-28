<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import { getDaysRemaining } from '$lib/utils/date.js';
	import Confetti from './Confetti.svelte';

	interface Props {
		targetDate: Date;
		nations?: Nation[];
	}

	const { targetDate, nations = [] }: Props = $props();

	let currentTime = $state(Date.now());
	const days = $derived(getDaysRemaining(targetDate, new Date(currentTime)));

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

<div
	class="counter-root flex min-w-[122px] flex-row items-center justify-center leading-[0.95] max-[420px]:min-w-0 max-[420px]:gap-1.5"
>
	{#if showSingleFlag}
		<div class="counter-single flex flex-col items-center gap-3 text-center">
			<img
				class="counter-flag"
				src={getFlagUrl(enabledNations[0].code)}
				alt={enabledNations[0].name}
				width={120}
				height={90}
			/>
			<span class="counter-label text-[rgba(255,255,255,0.82)] uppercase">
				{enabledNations[0].name.toUpperCase()}
			</span>
		</div>
	{:else if showTeamCount}
		<div class="flex flex-col items-start gap-0 max-[420px]:gap-1.5">
			<span class="counter-value text-white uppercase">
				{enabledNations.length}
			</span>
			<span class="counter-label text-[rgba(255,255,255,0.82)] uppercase">
				ÉQUIPE{enabledNations.length > 1 ? 'S' : ''}
			</span>
		</div>
	{:else if showDays}
		<div class="flex flex-col items-start gap-0 max-[420px]:gap-1.5">
			<span class="counter-value text-white uppercase">
				{days}
			</span>
			<span class="counter-label text-[rgba(255,255,255,0.82)] uppercase"> JOURS </span>
		</div>
	{/if}
</div>

<style>
	.counter-value {
		font-size: var(--counter-value-size, 66px);
		font-weight: 900;
		letter-spacing: var(--counter-value-tracking, -2px);
	}

	.counter-label {
		font-size: var(--counter-label-size, 40px);
		font-weight: 900;
		letter-spacing: var(--counter-label-tracking, 2px);
	}

	.counter-flag {
		width: var(--counter-flag-width, 120px);
		height: var(--counter-flag-height, 90px);
	}

	@media (max-width: 800px) {
		.counter-value {
			font-size: var(--counter-value-size-mobile, 48px);
		}
	}

	@media (max-width: 420px) {
		.counter-label {
			font-size: var(--counter-label-size-mobile, 28px);
			letter-spacing: var(--counter-label-tracking-mobile, 1.5px);
		}
	}
</style>
