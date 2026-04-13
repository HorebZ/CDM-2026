<script lang="ts">
	interface Props {
		targetId: string;
	}

	const { targetId }: Props = $props();

	function scrollToTarget() {
		const el = document.getElementById(targetId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<button
	class="absolute bottom-7 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-transparent p-0 text-[rgba(255,255,255,0.45)] transition-[color,border-color,transform] duration-200 hover:border-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.85)] max-[560px]:hidden animate-[chevron-bounce_2.4s_ease-in-out_infinite]"
	onclick={scrollToTarget}
	aria-label="Voir les matchs"
	type="button"
>
	<svg
		class="size-[18px]"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<polyline points="6 9 12 15 18 9" />
	</svg>
</button>

<style>
	@keyframes chevron-bounce {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(5px);
		}
	}
</style>
