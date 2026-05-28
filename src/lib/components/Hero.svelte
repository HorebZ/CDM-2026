<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import HeroCounterCard from './HeroCounterCard.svelte';

	interface Props {
		targetDate: Date;
		nations?: Nation[];
	}

	const { targetDate, nations = [] }: Props = $props();
	const sectionClasses =
		'flex w-full items-center justify-center max-[800px]:w-[min(100%,calc(var(--flag-size)*6+var(--flag-gap)*5))] max-[560px]:w-[min(100%,calc(var(--flag-size)*5+var(--flag-gap)*4))] max-[420px]:w-[min(100%,calc(var(--flag-size)*4+var(--flag-gap)*3))]';
</script>

<section class={sectionClasses}>
	<HeroCounterCard {targetDate} {nations} />
</section>
