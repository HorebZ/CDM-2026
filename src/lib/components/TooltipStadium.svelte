<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	interface Props {
		cityName: string;
		stadiumName: string;
		stadiumCapacity: number;
		stadiumUtcOffset: string;
		flagUrl: string;
	}

	const { cityName, stadiumName, stadiumCapacity, stadiumUtcOffset, flagUrl }: Props = $props();

	const formattedCapacity = $derived(new Intl.NumberFormat('fr-FR').format(stadiumCapacity));
</script>

<Tooltip className="min-w-[260px]">
	<div
		class="flag-badge relative size-13 shrink-0 overflow-hidden rounded-full border-[1.5px] border-(--ring) bg-[rgba(255,255,255,0.02)] p-0"
	>
		<img
			class="block size-full object-cover"
			src={flagUrl}
			alt=""
			width={52}
			height={52}
			loading="lazy"
		/>
	</div>

	<div class="flex min-w-0 flex-col gap-0.5">
		<span class="text-[13px] font-bold text-(--text-primary)">{cityName}</span>
		<span class="text-[11px] font-medium text-(--text-muted)">{stadiumName}</span>
		<span class="text-[11px] font-medium text-(--text-muted)"
			>{formattedCapacity} places · {stadiumUtcOffset}</span
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

	.flag-badge::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
		pointer-events: none;
	}
</style>
