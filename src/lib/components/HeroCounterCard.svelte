<script lang="ts">
	import trophyUrl from '$lib/assets/trophy.webp';
	import type { Nation } from '$lib/types/index.js';
	import { getDaysRemaining } from '$lib/utils/date.js';
	import Counter from './Counter.svelte';

	interface Props {
		targetDate: Date;
		nations?: Nation[];
		variant?: 'card' | 'plain';
	}

	const { targetDate, nations = [], variant = 'card' }: Props = $props();

	const cardClasses = $derived(
		variant === 'card'
			? 'hero-counter-card flex items-center border border-[rgba(255,255,255,0.06)] bg-[#0b0b18] shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] max-[800px]:w-full max-[800px]:box-border max-[800px]:justify-center'
			: 'hero-counter-card flex items-center max-[800px]:justify-center'
	);
	const trophyClasses =
		'hero-counter-card-trophy flex select-none items-center justify-center leading-none transition-[filter] duration-400';

	let currentTime = $state(Date.now());
	const trophyColored = $derived(getDaysRemaining(targetDate, new Date(currentTime)) === 0);

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = Date.now();
		}, 60_000);

		return () => clearInterval(interval);
	});
</script>

<div class={cardClasses}>
	<div
		class={trophyClasses}
		class:filter-[grayscale(100%)_brightness(0.55)_contrast(0.85)]={!trophyColored}
		aria-label="Coupe du monde FIFA"
	>
		<img class="block size-full object-contain" src={trophyUrl} alt="Coupe du monde FIFA 2026" />
	</div>
	<Counter {targetDate} {nations} />
</div>

<style>
	.hero-counter-card {
		gap: var(--hero-card-gap, 18px);
		border-radius: var(--hero-card-radius, 22px);
		padding-top: var(--hero-card-py, 18px);
		padding-right: var(--hero-card-px, 26px);
		padding-bottom: var(--hero-card-py, 18px);
		padding-left: var(--hero-card-pl, 20px);
	}

	.hero-counter-card-trophy {
		width: var(--hero-trophy-width, 78px);
		height: var(--hero-trophy-height, 104px);
	}

	@media (max-width: 420px) {
		.hero-counter-card {
			padding-top: var(--hero-card-py-mobile, 14px);
			padding-right: var(--hero-card-px-mobile, 20px);
			padding-bottom: var(--hero-card-py-mobile, 14px);
			padding-left: var(--hero-card-pl-mobile, 16px);
		}

		.hero-counter-card-trophy {
			width: var(--hero-trophy-width-mobile, 58px);
			height: var(--hero-trophy-height-mobile, 78px);
		}
	}
</style>
