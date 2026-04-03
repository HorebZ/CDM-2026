import type { SiteConfig } from '$lib/types/index.js';

export const OPENING_MATCH_DATE: Date = new Date(2026, 5, 11); // 11 juin 2026 (mois 0-indexé)

export const SITE_CONFIG: SiteConfig = {
  openingMatchDate: OPENING_MATCH_DATE,
};

export function getFlagUrl(code: string): string {
  return `https://flagcdn.com/h240/${code.toLowerCase()}.png`;
}
