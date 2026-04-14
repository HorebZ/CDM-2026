<script lang="ts">
	import StadiumTooltip from '$lib/components/StadiumTooltip.svelte';
	import TooltipTrigger from '$lib/components/TooltipTrigger.svelte';

	interface Props {
		cityName: string;
		stadiumName: string;
		stadiumCapacity: number;
		stadiumUtcOffset: string;
		countryCode: string;
		stadiumLocalTime: string;
		flagUrl: string;
	}

	const {
		cityName,
		stadiumName,
		stadiumCapacity,
		stadiumUtcOffset,
		countryCode,
		stadiumLocalTime,
		flagUrl
	}: Props = $props();
</script>

<TooltipTrigger className="relative inline-flex w-fit justify-self-end max-[800px]:hidden" role="group">
	{#snippet trigger()}
		<div class="flex min-w-0 flex-col items-end gap-[3px]">
			<div class="flex min-w-0 items-center justify-end gap-[7px]">
				<span
					class="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-semibold tracking-[0.01em] text-(--text-muted)"
				>
					{cityName}
				</span>
				<img
					class="block h-[14px] w-[22px] shrink-0 rounded-[2px] border border-[rgba(255,255,255,0.1)] object-cover"
					src={flagUrl}
					alt={countryCode}
					width={28}
					height={18}
					loading="lazy"
				/>
			</div>
			<span class="text-[11px] font-medium tracking-[0.01em] text-[rgba(240,240,240,0.32)]">
				({stadiumLocalTime} heure locale)
			</span>
		</div>
	{/snippet}

	{#snippet tooltip()}
		<StadiumTooltip
			{cityName}
			{stadiumName}
			{stadiumCapacity}
			{stadiumUtcOffset}
			{flagUrl}
		/>
	{/snippet}
</TooltipTrigger>
