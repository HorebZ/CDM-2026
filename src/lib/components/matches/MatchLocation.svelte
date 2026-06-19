<script lang="ts">
	import TooltipStadium from '$lib/components/TooltipStadium.svelte';
	import TooltipTrigger from '$lib/components/TooltipTrigger.svelte';

	interface Props {
		cityName: string;
		stadiumName: string;
		stadiumCapacity: number;
		stadiumUtcOffset: string;
		countryCode: string;
		stadiumLocalTime: string;
		flagUrl: string;
		tv?: boolean;
	}

	const {
		cityName,
		stadiumName,
		stadiumCapacity,
		stadiumUtcOffset,
		countryCode,
		stadiumLocalTime,
		flagUrl,
		tv = false
	}: Props = $props();

	const flagClasses =
		'block h-[14px] w-[22px] shrink-0 rounded-[2px] border border-[rgba(255,255,255,0.1)] object-cover';
</script>

<TooltipTrigger
	className={['relative inline-flex w-fit justify-self-end', tv ? '' : 'max-[800px]:hidden'].join(
		' '
	)}
	role="group"
>
	{#snippet trigger()}
		<div class="flex min-w-0 flex-col items-end gap-[3px]">
			<div class="flex min-w-0 items-center justify-end gap-[7px]">
				{#if tv}
					<span class="text-[12px] font-semibold tracking-[0.01em] text-text-muted">
						({stadiumLocalTime})
					</span>
				{:else}
					<span
						class="overflow-hidden text-[12px] font-semibold tracking-[0.01em] text-ellipsis whitespace-nowrap text-text-muted"
					>
						{cityName}
					</span>
				{/if}
				<img
					class={flagClasses}
					src={flagUrl}
					alt={countryCode}
					width={28}
					height={18}
					loading="lazy"
				/>
			</div>
			{#if tv}
				<span
					class="overflow-hidden text-[11px] font-medium tracking-[0.01em] text-ellipsis whitespace-nowrap text-[rgba(240,240,240,0.32)]"
				>
					{cityName}
				</span>
			{:else}
				<span class="text-[11px] font-medium tracking-[0.01em] text-[rgba(240,240,240,0.32)]">
					({stadiumLocalTime} heure locale)
				</span>
			{/if}
		</div>
	{/snippet}

	{#snippet tooltip()}
		<TooltipStadium {cityName} {stadiumName} {stadiumCapacity} {stadiumUtcOffset} {flagUrl} />
	{/snippet}
</TooltipTrigger>
