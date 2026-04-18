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
	class="flex min-w-[122px] flex-row items-center justify-center leading-[0.95] max-[420px]:min-w-0 max-[420px]:gap-1.5"
>
	{#if showSingleFlag}
		<div class="flex flex-col items-center gap-3 text-center">
			<img
				src={getFlagUrl(enabledNations[0].code)}
				alt={enabledNations[0].name}
				width={120}
				height={90}
			/>
			<span
				class="text-[40px] font-black tracking-[2px] text-[rgba(255,255,255,0.82)] uppercase max-[420px]:text-[28px] max-[420px]:tracking-[1.5px]"
			>
				{enabledNations[0].name.toUpperCase()}
			</span>
		</div>
	{:else if showTeamCount}
		<div class="flex flex-col items-start gap-0 max-[420px]:gap-1.5">
			<span
				class="text-[66px] font-black tracking-[-2px] text-white uppercase max-[800px]:text-5xl"
			>
				{enabledNations.length}
			</span>
			<span
				class="text-[40px] font-black tracking-[2px] text-[rgba(255,255,255,0.82)] uppercase max-[420px]:text-[28px] max-[420px]:tracking-[1.5px]"
			>
				ÉQUIPE{enabledNations.length > 1 ? 'S' : ''}
			</span>
		</div>
	{:else if showDays}
		<div class="flex flex-col items-start gap-0 max-[420px]:gap-1.5">
			<span
				class="text-[66px] font-black tracking-[-2px] text-white uppercase max-[800px]:text-5xl"
			>
				{days}
			</span>
			<span
				class="text-[40px] font-black tracking-[2px] text-[rgba(255,255,255,0.82)] uppercase max-[420px]:text-[28px] max-[420px]:tracking-[1.5px]"
			>
				JOURS
			</span>
		</div>
	{/if}
</div>
