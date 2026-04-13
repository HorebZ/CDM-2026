<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';

	interface Props {
		nation: Nation;
	}

	const { nation }: Props = $props();
</script>

<div
	class="absolute top-[calc(100%+10px)] left-1/2 z-100 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[#151522] px-[14px] py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] animate-[tooltipFadeIn_0.5s_ease]"
	role="tooltip"
>
	<span
		class="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-[6px] border-transparent border-b-[rgba(255,255,255,0.12)]"
		aria-hidden="true"
	></span>
	<span
		class="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-[5px] border-transparent border-b-[#151522]"
		aria-hidden="true"
	></span>

	<div class="size-9 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
		<img src={getFlagUrl(nation.code)} alt="" width={48} height={36} />
	</div>
	<div class="flex flex-col gap-0.5">
		<span class="text-[13px] font-bold text-(--text-primary)">{nation.name}</span>
		<span class="text-[11px] font-medium text-(--text-muted)">
			{nation.confederation} · Groupe {nation.group}
		</span>
		<span class="text-[11px] font-medium text-(--text-muted)"
			>{nation.participation} participation{nation.participation > 1 ? 's' : ''}</span
		>
	</div>
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@keyframes tooltipFadeIn {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
