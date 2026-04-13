<script lang="ts">
	interface Props {
		color: 'red' | 'yellow';
		count: number;
	}

	const { color, count }: Props = $props();

	const label = $derived(color === 'red' ? 'carton rouge' : 'carton jaune');
</script>

<span class="card-stat" aria-label={label}>
	<span
		class="card"
		class:card--red={color === 'red'}
		class:card--yellow={color === 'yellow'}
		aria-hidden="true"
	></span>
	<span class="card-count">{count}</span>
</span>
