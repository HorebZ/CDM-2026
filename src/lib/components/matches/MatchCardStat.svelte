<script lang="ts">
	interface Props {
		color: 'red' | 'yellow';
		count: number;
	}

	const { color, count }: Props = $props();

	const label = $derived(color === 'red' ? 'carton rouge' : 'carton jaune');
</script>

<span class="inline-flex shrink-0 items-center gap-[3px]" aria-label={label}>
	<span
		class="inline-block h-[10px] w-[7px] shrink-0 rounded-[1.5px]"
		class:bg-[#e03030]={color === 'red'}
		class:bg-[#f5c518]={color === 'yellow'}
		aria-hidden="true"
	></span>
	<span class="text-[11px] leading-none">{count}</span>
</span>
