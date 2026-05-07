import type { SiteConfig } from '$lib/types/index.js';

export const OPENING_MATCH_DATE: Date = new Date(2026, 5, 11); // 11 juin 2026 (mois 0-indexé)

/** URL canonique du site, sans slash final. Utilisée pour le sitemap et les meta OG/Twitter. */
export const SITE_URL = 'https://cdm-2026.pages.dev';

/** Chemin (relatif au domaine) de l'image OG/Twitter partagée sur les réseaux sociaux. */
export const OG_IMAGE_PATH = '/og.jpg';

/** Type MIME de l'image OG (doit correspondre au format réel du fichier). */
export const OG_IMAGE_TYPE = 'image/jpeg';

export const SITE_CONFIG: SiteConfig = {
	openingMatchDate: OPENING_MATCH_DATE
};

export function getFlagUrl(code: string): string {
	return `https://flagcdn.com/h240/${code.toLowerCase()}.webp`;
}
