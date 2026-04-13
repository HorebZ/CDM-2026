<script lang="ts">
	interface Props {
		stadiumName: string;
		countryCode: string;
		stadiumLocalTime: string;
		flagUrl: string;
	}

	const { stadiumName, countryCode, stadiumLocalTime, flagUrl }: Props = $props();
</script>

<div class="flex min-w-0 flex-col items-end gap-[3px] max-[800px]:hidden">
	<div class="flex min-w-0 items-center justify-end gap-[7px]">
		<span
			class="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-semibold tracking-[0.01em] text-[var(--text-muted)]"
		>
			{stadiumName}
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
