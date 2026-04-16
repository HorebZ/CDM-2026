<script lang="ts">
	const wrapperClasses =
		'fixed bottom-6 left-6 z-120 max-[560px]:bottom-[18px] max-[560px]:left-[18px] max-[420px]:bottom-[14px] max-[420px]:left-[14px]';
	const badgeClasses =
		'flex aspect-square h-5 cursor-pointer items-center justify-center rounded-full border-2 bg-[#050509] p-0';
	const popupClasses =
		'absolute bottom-[calc(100%+12px)] left-0 z-120 w-auto min-w-[min(360px,calc(100vw-48px))] max-w-[min(420px,calc(100vw-48px))] whitespace-normal rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[#151522] px-4 py-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] animate-[infoTooltipFadeIn_0.5s_ease] max-[560px]:min-w-[min(320px,calc(100vw-36px))] max-[560px]:max-w-[min(360px,calc(100vw-36px))] max-[420px]:min-w-[min(280px,calc(100vw-28px))] max-[420px]:max-w-[min(320px,calc(100vw-28px))]';
	const sectionTitleClasses =
		'text-[11px] font-bold uppercase tracking-[0.06em] text-[rgba(255,255,255,0.72)]';
	const sectionValueClasses = 'text-[11px] leading-[1.45] text-text-muted';

	let showPopup = $state(false);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
	let wrapper: HTMLDivElement | null = null;

	function clearHoverTimeout() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
	}

	function openPopup() {
		clearHoverTimeout();
		showPopup = true;
	}

	function handleMouseEnter() {
		clearHoverTimeout();
		hoverTimeout = setTimeout(() => {
			showPopup = true;
		}, 250);
	}

	function handleMouseLeave(event: MouseEvent) {
		if (wrapper?.contains(event.relatedTarget as Node)) {
			return;
		}

		clearHoverTimeout();
		hoverTimeout = setTimeout(() => {
			showPopup = false;
		}, 120);
	}

	function handleFocusIn() {
		openPopup();
	}

	function handleBlur(event: FocusEvent) {
		if (wrapper?.contains(event.relatedTarget as Node)) {
			return;
		}

		clearHoverTimeout();
		showPopup = false;
	}
</script>

<div
	bind:this={wrapper}
	class={wrapperClasses}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="group"
>
	<button
		type="button"
		class={badgeClasses}
		aria-label="Informations sur le site"
		aria-expanded={showPopup}
		aria-controls="site-info-popup"
		onfocus={handleFocusIn}
		onblur={handleBlur}
	>
		<span>?</span>
	</button>

	{#if showPopup}
		<div
			id="site-info-popup"
			class={popupClasses}
			role="tooltip"
			onmouseenter={openPopup}
			onmouseleave={handleMouseLeave}
		>
			<span
				class="absolute top-full left-[34px] h-0 w-0 border-[6px] border-transparent border-t-[rgba(255,255,255,0.12)]"
				aria-hidden="true"
			></span>
			<span
				class="absolute top-full left-[35px] h-0 w-0 border-[5px] border-transparent border-t-[#151522]"
				aria-hidden="true"
			></span>

			<div class="flex flex-col gap-2.5">
				<span class="text-[11px] font-extrabold tracking-[0.08em] text-text-primary uppercase">
					A propos du site
				</span>

				<div class="flex flex-col gap-1">
					<span class={sectionTitleClasses}>Inspiration</span>
					<span class={sectionValueClasses}
						>Reproduction libre de l'infographie utilisé par
						<a href="https://www.youtube.com/@wiloo" target="_blank">Wiloo</a> dans ses vidéos youtube
						sur le mondiale 2026. Avant le mondial, les nations sont activées au fur et à mesure en suivant
						les vidéos de présentation de Wiloo. Pendant le mondial, les nations seront désactivées à
						leur sortie.
					</span>
				</div>

				<div class="flex flex-col gap-1">
					<span class={sectionTitleClasses}>Développement</span>
					<span class={sectionValueClasses}
						>Site développé par <a href="https://github.com/HorebZ" target="_blank">Horebz</a></span
					>
				</div>

				<div class="flex flex-col gap-1">
					<span class={sectionTitleClasses}>Source de données</span>
					<span class={sectionValueClasses}>
						drapeaux (CDN) :
						<a href="https://flagpedia.net/download/api" target="_blank">Flagpedia - API</a>
					</span>

					<span class={sectionValueClasses}>
						Données sur les équipes, stades et matchs :
						<a href="https://fr.wikipedia.org/wiki/Coupe_du_monde_de_football_2026#" target="_blank"
							>Wikipédia - Coupe du monde de football 2026</a
						>
					</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes infoTooltipFadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
