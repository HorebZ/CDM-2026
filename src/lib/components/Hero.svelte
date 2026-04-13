<script lang="ts">
	import Counter from './Counter.svelte';
	import trophyUrl from '$lib/assets/trophy.webp';
	import type { Nation } from '$lib/types/index.js';

	interface Props {
		targetDate: Date;
		nations?: Nation[];
	}

	const { targetDate, nations = [] }: Props = $props();
	const sectionClasses =
		'flex w-full items-center justify-center max-[800px]:w-[min(100%,calc(var(--flag-size)*6+var(--flag-gap)*5))] max-[560px]:w-[min(100%,calc(var(--flag-size)*5+var(--flag-gap)*4))] max-[420px]:w-[min(100%,calc(var(--flag-size)*4+var(--flag-gap)*3))]';
	const cardClasses =
		'flex items-center gap-[18px] rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[#0b0b18] px-[26px] py-[18px] pr-[26px] pl-5 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] max-[800px]:w-full max-[800px]:box-border max-[800px]:justify-center max-[420px]:px-5 max-[420px]:py-[14px] max-[420px]:pr-5 max-[420px]:pl-4';
	const trophyClasses =
		'flex h-[104px] w-[78px] select-none items-center justify-center leading-none transition-[filter] duration-400 max-[420px]:h-[78px] max-[420px]:w-[58px]';

	function getDaysRemaining(date: Date): number {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const diffMs = target.getTime() - today.getTime();
		return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
	}

	const trophyColored = $derived(getDaysRemaining(targetDate) === 0);
</script>

<section class={sectionClasses}>
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
</section>
