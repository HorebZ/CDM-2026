<script lang="ts">
	interface Props {
		color: 'red' | 'yellow';
		count: number;
	}

	const { color, count }: Props = $props();

	const cardIndexes = $derived(Array.from({ length: count }, (_, index) => index));
	const cardType = $derived(
		color === 'red'
			? count > 1
				? 'cartons rouges'
				: 'carton rouge'
			: count > 1
				? 'cartons jaunes'
				: 'carton jaune'
	);
	const label = $derived(`${count} ${cardType}`);
</script>

<span class="inline-flex shrink-0 items-center gap-[2px]" aria-label={label}>
	{#each cardIndexes as cardIndex (cardIndex)}
		<span
			class={[
				'inline-block h-[10px] w-[7px] shrink-0 rounded-[1.5px]',
				color === 'red' && 'bg-[#e03030]',
				color === 'yellow' && 'bg-[#f5c518]'
			]}
			aria-hidden="true"
		></span>
	{/each}
</span>
