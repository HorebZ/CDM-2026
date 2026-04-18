<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		nation: Nation;
	}

	const { nation }: Props = $props();
</script>

<Tooltip>
	<div class="size-13 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
		<img
			src={getFlagUrl(nation.code)}
			alt=""
			width={48}
			height={36}
			decoding="async"
			referrerpolicy="no-referrer"
		/>
	</div>
	<div class="flex flex-col gap-0.5">
		<span class="text-[13px] font-bold text-text-primary">{nation.name}</span>
		<span class="text-[11px] font-medium text-text-muted">
			{nation.confederation} · Groupe {nation.group}
		</span>
		<span class="text-[11px] font-medium text-text-muted"
			>{nation.participation} participation{nation.participation > 1 ? 's' : ''}</span
		>
	</div>
</Tooltip>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
