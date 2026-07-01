<script lang="ts">
	interface Props {
		/** Libellé affiché et lu par les lecteurs d'écran (ex. « Vainqueur poule A »). */
		label: string;
		/** État « perdant » : désaturation. */
		loser?: boolean;
		/** Dimensions / arrondi / largeur de bordure / padding / typo — propres à chaque usage. */
		class?: string;
	}

	const { label, loser = false, class: className = '' }: Props = $props();
</script>

<span
	class={[
		'inline-flex shrink-0 items-center justify-center border-dashed border-ring-active bg-[rgba(255,255,255,0.04)] font-bold tracking-[0.04em] text-[rgba(255,255,255,0.75)] uppercase',
		className,
		loser && 'grayscale-80'
	]}
	aria-label={label}
>
	{label}
</span>
