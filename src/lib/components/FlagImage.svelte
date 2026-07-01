<script lang="ts">
	import { getFlagUrl, getFlagUrlSmall } from '$lib/config/site.js';

	interface Props {
		/** Code ISO du pays (ex. « fr »). L'URL du drapeau est construite en interne. */
		code: string;
		/** Texte alternatif. Chaîne vide si le drapeau est décoratif (nom affiché à côté). */
		alt: string;
		/** Utilise la variante légère du drapeau (petits formats : tableau, bracket). */
		small?: boolean;
		/** État « vainqueur » : liseré or + halo. */
		winner?: boolean;
		/** État « perdant » : désaturation. */
		loser?: boolean;
		width?: number;
		height?: number;
		/** Dimensions / arrondi / largeur de bordure / placement — propres à chaque usage. */
		class?: string;
	}

	const {
		code,
		alt,
		small = false,
		winner = false,
		loser = false,
		width,
		height,
		class: className = ''
	}: Props = $props();

	const src = $derived(small ? getFlagUrlSmall(code) : getFlagUrl(code));
</script>

<img
	class={[
		'shrink-0 border-ring-medium object-cover',
		className,
		winner &&
			'border-gold shadow-[0_0_8px_1px_color-mix(in_srgb,var(--color-gold)_35%,transparent)]',
		loser && 'grayscale-80'
	]}
	{src}
	{alt}
	{width}
	{height}
	loading="lazy"
	decoding="async"
/>
