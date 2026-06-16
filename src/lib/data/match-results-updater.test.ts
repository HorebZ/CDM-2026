import { describe, expect, it } from 'vitest';
import { NATION_IDS } from './nations';
import { parseWikipediaResults, updateMatchResults } from '../../../scripts/update-match-results';

describe('parseWikipediaResults', () => {
	it('ignore les dates qui ressemblent à un score', () => {
		expect.hasAssertions();

		const results = parseWikipediaResults(
			`<table>
				<tr>
					<td>Canada</td>
					<td>2026-06-12 15:00 UTC-4</td>
					<td>Bosnie-Herzégovine</td>
				</tr>
				<tr>
					<td>Canada</td>
					<td>12-06</td>
					<td>Bosnie-Herzégovine</td>
				</tr>
			</table>`,
			'https://example.test/wiki'
		);

		expect(results).toEqual([]);
	});

	it('normalise les alias de nations et les scores aux tirs au but', () => {
		expect.hasAssertions();

		const results = parseWikipediaResults(
			`<table>
				<tr>
					<td>Match 99</td>
					<td>États-Unis</td>
					<td>1 – 1 (4 - 3 t.a.b.)</td>
					<td>RD Congo</td>
					<td>Stade fictif</td>
				</tr>
			</table>`,
			'https://example.test/wiki'
		);

		expect(results).toEqual([
			{
				sourceUrl: 'https://example.test/wiki',
				homeNationId: NATION_IDS.USA,
				awayNationId: NATION_IDS.RDC,
				homeScore: 1,
				awayScore: 1,
				homePenalties: 4,
				awayPenalties: 3
			}
		]);
	});
});

describe('updateMatchResults', () => {
	it('écrit une victoire trouvée pour un match passé sans résultat', async () => {
		expect.hasAssertions();

		let writtenContent = '';
		const summary = await updateMatchResults({
			now: new Date('2026-06-19T18:00:00Z'),
			existingResults: {},
			sourceUrls: ['https://example.test/group-a'],
			fetchHtml: async () => `<table>
				<tr>
					<td>Tchéquie</td>
					<td>1 - 0</td>
					<td>Afrique du Sud</td>
				</tr>
			</table>
			<table>
				<tr><th>TCHÉQUIE :</th></tr>
				<tr>
					<td>04</td>
					<td>Joueur</td>
					<td><img alt="Carton jaune" /></td>
				</tr>
			</table>
			<table>
				<tr><th>AFRIQUE DU SUD :</th></tr>
				<tr>
					<td>05</td>
					<td>Joueur</td>
					<td><img alt="Carton rouge" /></td>
				</tr>
			</table>`,
			writeResults: async (content) => {
				writtenContent = content;
			}
		});

		const results = JSON.parse(writtenContent);

		expect(summary.updated).toEqual([
			{
				key: '2026-06-18T12:00:00|ATLANTA',
				label: 'Tchéquie - Afrique du Sud',
				sourceUrl: 'https://example.test/group-a'
			}
		]);
		expect(results['2026-06-18T12:00:00|ATLANTA']).toMatchObject({
			result: { resolution: 'regular', winner: 1 },
			sides: [
				{ score: { regularTime: 1 }, stats: { yellowCards: 1, redCards: 0 } },
				{ score: { regularTime: 0 }, stats: { yellowCards: 0, redCards: 1 } }
			]
		});
	});

	it('écrit un match nul sans vainqueur', async () => {
		expect.hasAssertions();

		let writtenContent = '';
		await updateMatchResults({
			now: new Date('2026-06-13T23:00:00Z'),
			existingResults: {},
			sourceUrls: ['https://example.test/group-b'],
			fetchHtml: async () => `<table>
				<tr>
					<td>États-Unis</td>
					<td>0 – 0</td>
					<td>Paraguay</td>
				</tr>
			</table>`,
			writeResults: async (content) => {
				writtenContent = content;
			}
		});

		const results = JSON.parse(writtenContent);

		expect(results['2026-06-12T18:00:00|LOS_ANGELES']).toEqual({
			result: { resolution: 'regular' },
			sides: [{ score: { regularTime: 0 } }, { score: { regularTime: 0 } }]
		});
	});
});
