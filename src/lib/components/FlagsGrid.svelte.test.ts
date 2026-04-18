import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import FlagsGrid from './FlagsGrid.svelte';
import { NATIONS } from '$lib/data/nations.js';

describe('FlagsGrid.svelte', () => {
	describe('rendu', () => {
		it('rend exactement 48 drapeaux (pas de double rendu desktop/mobile)', async () => {
			const nations = Object.values(NATIONS);
			const screen = render(FlagsGrid, { nations });

			await expect.element(screen.container.querySelector('section')!).toBeInTheDocument();
			const imgs = screen.container.querySelectorAll('section img');
			expect(imgs.length).toBe(nations.length);
			expect(nations.length).toBe(48);
		});

		it('conserve l’ordre naturel (groupe par groupe) dans le DOM', () => {
			const nations = Object.values(NATIONS);
			const screen = render(FlagsGrid, { nations });

			const imgs = screen.container.querySelectorAll<HTMLImageElement>('section img');
			const altsInDom = Array.from(imgs).map((img) => img.alt);
			const expected = nations.map((n) => n.name);

			expect(altsInDom).toEqual(expected);
		});

		it('préserve la sémantique des groupes : toutes les nations d’un même groupe sont consécutives dans l’ordre DOM', () => {
			const nations = Object.values(NATIONS);
			const screen = render(FlagsGrid, { nations });

			const imgs = screen.container.querySelectorAll<HTMLImageElement>('section img');
			const groupsInOrder = Array.from(imgs).map((img) => {
				const nation = nations.find((n) => n.name === img.alt);
				return nation?.group;
			});

			const seenGroups = new Set<string>();
			let previousGroup: string | undefined;
			for (const group of groupsInOrder) {
				if (group !== previousGroup) {
					expect(seenGroups.has(group!)).toBe(false);
					seenGroups.add(group!);
					previousGroup = group;
				}
			}
			expect(seenGroups.size).toBe(12);
		});
	});
});
