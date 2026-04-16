<script lang="ts">
	import { onDestroy, tick, type Snippet } from 'svelte';

	interface Props {
		trigger: Snippet;
		tooltip: Snippet;
		delay?: number;
		className?: string;
		role?: string;
	}

	const { trigger, tooltip, delay = 500, className = '', role = 'group' }: Props = $props();

	let isOpen = $state(false);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
	let wrapperEl = $state<HTMLDivElement | null>(null);

	const VIEWPORT_PADDING = 8;

	function clearHoverTimeout() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
	}

	function handleMouseEnter() {
		clearHoverTimeout();
		hoverTimeout = setTimeout(() => {
			isOpen = true;
			hoverTimeout = null;
		}, delay);
	}

	function handleMouseLeave() {
		clearHoverTimeout();
		isOpen = false;
	}

	async function adjustTooltipPosition() {
		if (!wrapperEl) return;
		await tick();
		const tooltipEl = wrapperEl.querySelector<HTMLElement>('[role="tooltip"]');
		if (!tooltipEl) return;

		tooltipEl.style.setProperty('--tooltip-shift', '0px');

		const rect = tooltipEl.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		let shift = 0;

		if (rect.right > viewportWidth - VIEWPORT_PADDING) {
			shift = viewportWidth - VIEWPORT_PADDING - rect.right;
		} else if (rect.left < VIEWPORT_PADDING) {
			shift = VIEWPORT_PADDING - rect.left;
		}

		if (shift !== 0) {
			tooltipEl.style.setProperty('--tooltip-shift', `${shift}px`);
		}
	}

	$effect(() => {
		if (isOpen) {
			adjustTooltipPosition();
		}
	});

	onDestroy(() => {
		clearHoverTimeout();
	});
</script>

<div
	bind:this={wrapperEl}
	class={className}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	{role}
>
	{@render trigger()}
	{#if isOpen}
		{@render tooltip()}
	{/if}
</div>
