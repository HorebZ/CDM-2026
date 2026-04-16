<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';

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

	onDestroy(() => {
		clearHoverTimeout();
	});
</script>

<div class={className} onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave} {role}>
	{@render trigger()}
	{#if isOpen}
		{@render tooltip()}
	{/if}
</div>
