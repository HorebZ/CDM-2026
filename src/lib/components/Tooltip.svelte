<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		className?: string;
	}

	const { children, className = '' }: Props = $props();
</script>

<div
	class={[
		'tooltip absolute top-[calc(100%+10px)] left-1/2 z-100 flex animate-[tooltipFadeIn_0.5s_ease] items-center gap-4.5 rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[#151522] px-4.5 py-2.5 whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]',
		className
	]}
	role="tooltip"
>
	<span
		class="tooltip-arrow absolute bottom-full left-1/2 h-0 w-0 border-[6px] border-transparent border-b-[rgba(255,255,255,0.12)]"
		aria-hidden="true"
	></span>
	<span
		class="tooltip-arrow absolute bottom-full left-1/2 h-0 w-0 border-[5px] border-transparent border-b-[#151522]"
		aria-hidden="true"
	></span>

	{@render children()}
</div>

<style>
	.tooltip {
		transform: translateX(calc(-50% + var(--tooltip-shift, 0px)));
	}

	.tooltip-arrow {
		transform: translateX(calc(-50% - var(--tooltip-shift, 0px)));
	}

	@keyframes tooltipFadeIn {
		from {
			opacity: 0;
			transform: translateX(calc(-50% + var(--tooltip-shift, 0px))) translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateX(calc(-50% + var(--tooltip-shift, 0px))) translateY(0);
		}
	}
</style>
