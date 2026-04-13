<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import NationTooltip from './NationTooltip.svelte';
	import TooltipTrigger from './TooltipTrigger.svelte';

	interface Props {
		nation: Nation;
		celebrating?: boolean;
	}

	const { nation, celebrating = false }: Props = $props();

	function codeToDelay(code: string): string {
		let hash = 0;
		for (const c of code) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
		return `${hash % 900}ms`;
	}

	const jumpDelay = $derived(celebrating ? codeToDelay(nation.code) : '0ms');
</script>

<TooltipTrigger className="group relative" role="group">
	{#snippet trigger()}
		<div
			class="flag-badge relative size-(--flag-size) shrink-0 overflow-hidden rounded-full border-[1.5px] border-(--ring) bg-[rgba(255,255,255,0.02)] p-0 transition-[border-color,transform] duration-300 group-hover:scale-[1.08] group-hover:border-(--ring-active)"
			class:border-(--ring-active)={nation.enabled}
			class:animate-[celebrate-jump_0.85s_ease-in-out_infinite]={celebrating}
			class:border-[#ffd700]={celebrating}
			class:shadow-[0_0_10px_2px_rgba(255,215,0,0.35)]={celebrating}
			style="--jump-delay: {jumpDelay}"
		>
			<img
				class="block size-full object-cover transition-[filter] duration-400"
				class:filter-none={nation.enabled || celebrating}
				class:filter-[grayscale(100%)_brightness(0.55)_contrast(0.85)]={!nation.enabled && !celebrating}
				src={getFlagUrl(nation.code)}
				alt={nation.name}
				width={80}
				height={60}
				loading="lazy"
			/>
		</div>
	{/snippet}

	{#snippet tooltip()}
		<NationTooltip {nation} />
	{/snippet}
</TooltipTrigger>

<style>
	.flag-badge {
		animation-delay: var(--jump-delay, 0ms);
	}

	.flag-badge::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
		pointer-events: none;
	}

	@keyframes celebrate-jump {
		0% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
		20% {
			transform: translateY(-14px) rotate(-4deg) scale(1.07);
		}
		40% {
			transform: translateY(-6px) rotate(3deg) scale(1.04);
		}
		60% {
			transform: translateY(-16px) rotate(-3deg) scale(1.08);
		}
		80% {
			transform: translateY(-4px) rotate(2deg) scale(1.03);
		}
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
	}
</style>
