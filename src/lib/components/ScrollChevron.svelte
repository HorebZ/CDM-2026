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

<button class="scroll-chevron" onclick={scrollToTarget} aria-label="Voir les matchs" type="button">
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<polyline points="6 9 12 15 18 9" />
	</svg>
</button>
