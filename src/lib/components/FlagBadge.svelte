<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';

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

	let showTooltip = $state(false);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleMouseEnter() {
		hoverTimeout = setTimeout(() => {
			showTooltip = true;
		}, 500);
	}

	function handleMouseLeave() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
		showTooltip = false;
	}
</script>

<div
	class="flag-wrapper"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="group"
>
	<div
		class="flag-badge"
		class:is-active={nation.enabled}
		class:is-celebrating={celebrating}
		style="--jump-delay: {jumpDelay}"
	>
		<img src={getFlagUrl(nation.code)} alt={nation.name} width={80} height={60} loading="lazy" />
	</div>

	{#if showTooltip}
		<div class="flag-tooltip" role="tooltip">
			<div class="tooltip-flag">
				<img src={getFlagUrl(nation.code)} alt="" width={48} height={36} />
			</div>
			<div class="tooltip-content">
				<span class="tooltip-name">{nation.name}</span>
				<span class="tooltip-details"
					>{nation.confederation} · {nation.participation} participation{nation.participation > 1
						? 's'
						: ''}</span
				>
			</div>
		</div>
	{/if}
</div>
