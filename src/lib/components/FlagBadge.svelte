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

<TooltipTrigger className="flag-wrapper" role="group">
	{#snippet trigger()}
		<div
			class="flag-badge"
			class:is-active={nation.enabled}
			class:is-celebrating={celebrating}
			style="--jump-delay: {jumpDelay}"
		>
			<img src={getFlagUrl(nation.code)} alt={nation.name} width={80} height={60} loading="lazy" />
		</div>
	{/snippet}

	{#snippet tooltip()}
		<NationTooltip {nation} />
	{/snippet}
</TooltipTrigger>
