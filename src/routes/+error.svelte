<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import triondaUrl from '$lib/assets/trionda.png';

	const status = $derived(page.status);
	const isNotFound = $derived(status === 404);
	const title = $derived(isNotFound ? '404' : `${status}`);
	const heading = $derived(isNotFound ? 'Page introuvable' : 'Erreur inattendue');
	const message = $derived(
		isNotFound
			? 'Hors-jeu total : la page que tu cherches a envoyé sa frappe directement en tribune.'
			: (page.error?.message ?? 'Le match a été interrompu côté serveur.')
	);
	const helper = $derived(
		isNotFound
			? "Même la VAR n'a rien trouvé. Retourne au vestiaire et relance depuis l'accueil."
			: "Retourne à l'accueil pour relancer la partie."
	);
	const pageTitle = $derived(isNotFound ? '404 | CDM 2026' : `${status} | CDM 2026`);
	const ballAlt = 'Ballon officiel Trionda';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 max-[560px]:px-4"
	aria-labelledby="error-title"
>
	<div class="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
		<div
			class="absolute top-1/2 left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(123,111,189,0.1)_24%,rgba(8,8,15,0)_72%)] blur-2xl"
		></div>
	</div>

	<div class="relative z-10 flex w-full max-w-none flex-col items-center text-center">
		{#if isNotFound}
			<div class="error-score" aria-hidden="true">
				<span class="error-digit">4</span>
				<img class="error-ball" src={triondaUrl} alt={ballAlt} />
				<span class="error-digit">4</span>
			</div>
		{:else}
			<p class="error-code" aria-hidden="true">{title}</p>
		{/if}

		<h1
			id="error-title"
			class="mt-8 text-[clamp(1.8rem,4vw,3.4rem)] font-black text-white uppercase"
		>
			{heading}
		</h1>

		<p class="mt-4 max-w-3xl text-[clamp(1.05rem,2vw,1.45rem)] text-white/88">
			{message}
		</p>

		<p
			class="mt-3 max-w-2xl text-sm tracking-[0.18em] text-white/55 uppercase max-[560px]:tracking-[0.12em]"
		>
			{helper}
		</p>

		<a
			class="mt-8 inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-6 py-3 text-sm font-black tracking-[0.2em] text-white uppercase transition hover:border-white/22 hover:bg-white/12"
			href={resolve('/')}
		>
			Retour à l'accueil
		</a>
	</div>
</section>

<style>
	.error-score {
		--symbol-size: clamp(9rem, 24vw, 17rem);
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 0;
	}

	.error-digit,
	.error-ball,
	.error-code {
		filter: drop-shadow(0 0 28px rgba(255, 255, 255, 0.08));
	}

	.error-digit {
		display: flex;
		width: auto;
		height: var(--symbol-size);
		align-items: center;
		justify-content: center;
		font-size: calc(var(--symbol-size) * 0.8);
		line-height: 1;
		font-weight: 900;
		color: white;
	}

	.error-ball {
		display: block;
		width: var(--symbol-size);
		height: var(--symbol-size);
		flex: none;
		object-fit: contain;
	}

	.error-code {
		font-size: clamp(8rem, 22vw, 16rem);
		line-height: 0.9;
		font-weight: 900;
		color: white;
	}

	@media (max-width: 560px) {
		.error-score {
			--symbol-size: clamp(7rem, 26vw, 10rem);
			gap: 0;
		}
	}
</style>
