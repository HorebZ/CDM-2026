export type Confederation = 'CONCACAF' | 'CONMEBOL' | 'UEFA' | 'CAF' | 'AFC' | 'OFC';

export const CONFEDERATIONS: Record<Confederation, string> = {
  CONCACAF: 'CONCACAF',
  CONMEBOL: 'CONMEBOL',
  UEFA: 'UEFA',
  CAF: 'CAF',
  AFC: 'AFC',
  OFC: 'OFC',
}

export interface Nation {
  code: string;
  name: string;
  confederation: string;
  participation: number;
  enabled: boolean;
}

export interface SiteConfig {
  openingMatchDate: Date;
  trophyColored: boolean;
}
