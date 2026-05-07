import { SITE_URL } from '$lib/config/site.js';

export const prerender = true;

const PAGES = [{ path: '/', changefreq: 'daily', priority: '1.0' }] as const;

export function GET(): Response {
	const lastmod = new Date().toISOString().slice(0, 10);

	const urls = PAGES.map(
		({ path, changefreq, priority }) => `	<url>
		<loc>${SITE_URL}${path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`
	).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
