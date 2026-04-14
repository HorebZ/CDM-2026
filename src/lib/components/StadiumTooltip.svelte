<script lang="ts">
	interface Props {
		cityName: string;
		stadiumName: string;
		stadiumCapacity: number;
		stadiumUtcOffset: string;
		flagUrl: string;
	}

	const { cityName, stadiumName, stadiumCapacity, stadiumUtcOffset, flagUrl }: Props = $props();

	const formattedCapacity = $derived(new Intl.NumberFormat('fr-FR').format(stadiumCapacity));
	const tooltipClasses =
		'absolute top-[calc(100%+10px)] left-1/2 z-100 flex min-w-[260px] -translate-x-1/2 items-center gap-4.5 whitespace-nowrap rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[#151522] px-4.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] animate-[tooltipFadeIn_0.5s_ease]';
	const tooltipArrowOuterClasses =
		'absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-[6px] border-transparent border-b-[rgba(255,255,255,0.12)]';
	const tooltipArrowInnerClasses =
		'absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-[5px] border-transparent border-b-[#151522]';
</script>

<div class={tooltipClasses} role="tooltip">
	<span class={tooltipArrowOuterClasses} aria-hidden="true"></span>
	<span class={tooltipArrowInnerClasses} aria-hidden="true"></span>

	<div
		class="flag-badge relative size-13 shrink-0 overflow-hidden rounded-full border-[1.5px] border-(--ring) bg-[rgba(255,255,255,0.02)] p-0"
	>
		<img class="block size-full object-cover" src={flagUrl} alt="" width={52} height={52} loading="lazy" />
	</div>

	<div class="flex min-w-0 flex-col gap-0.5">
		<span class="text-[13px] font-bold text-(--text-primary)">{cityName}</span>
		<span class="text-[11px] font-medium text-(--text-muted)">{stadiumName}</span>
		<span class="text-[11px] font-medium text-(--text-muted)"
			>{formattedCapacity} places · {stadiumUtcOffset}</span
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

	.flag-badge::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
		pointer-events: none;
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
