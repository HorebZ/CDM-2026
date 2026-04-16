# Architecture

This document gives a high-level overview of how the CDM 2026 project is structured. It complements the main [`README.md`](../README.md).

## Stack

- **Framework**: [SvelteKit 2](https://kit.svelte.dev) with [Svelte 5](https://svelte.dev) (runes, snippets)
- **Runtime / package manager**: [Bun](https://bun.sh)
- **Bundler**: [Vite 7](https://vitejs.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Deployment target**: [Cloudflare Pages](https://pages.cloudflare.com) via `@sveltejs/adapter-cloudflare`
- **Testing**: [Vitest](https://vitest.dev) (unit + browser mode via Playwright)
- **Dates / time zones**: [`@js-temporal/polyfill`](https://github.com/js-temporal/temporal-polyfill)
- **Search**: [MiniSearch](https://lucaong.github.io/minisearch/)

## Directory layout

```
src/
├── app.d.ts              # SvelteKit app types
├── app.html              # HTML shell
├── lib/
│   ├── assets/           # Static SVGs and images imported from Svelte
│   ├── components/       # Reusable UI components
│   │   └── matches/      # Match-specific components (list, row, search, filters…)
│   ├── config/           # Site-level configuration (e.g. opening match date)
│   ├── data/             # Domain data (nations, matches)
│   ├── search/           # MiniSearch setup and helpers
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Pure utilities (dates, formatting…)
│   └── index.ts          # `$lib` entry
└── routes/
    ├── +layout.svelte    # Root layout
    ├── +page.svelte      # Home page
    └── layout.css        # Global layout styles
static/                   # Files served as-is from the site root
docs/                     # Extended documentation (this file, etc.)
readme-ressources/        # Screenshots used in the README
```

## Data flow

The site is fully **static / client-rendered** on top of SvelteKit; there is no backend or database. Domain data lives in typed TypeScript modules:

- `src/lib/data/nations.ts` — list of nations, confederations, appearances, `enabled` flag
- `src/lib/data/matches.ts` — match schedule
- `src/lib/config/site.ts` — site-level config (e.g. opening match date)

Components consume this data through the `$lib` alias and derive UI state with Svelte 5 **runes** (`$state`, `$derived`, `$effect`). Time zones and match timing rely on `Temporal` (via the polyfill) to stay correct across regions.

## Conventions

- **Svelte 5** features are preferred: runes for reactivity, snippets over slots where it makes sense.
- **TypeScript** everywhere, with shared types in `src/lib/types/`.
- **Tailwind v4** for styling, with a few scoped styles inside components when needed.
- **Prettier** + **ESLint** enforce formatting and linting (`bun run lint`, `bun run format`).
- **Tests** are colocated next to the code they cover (`*.test.ts` / `*.spec.ts` for Node, `*.svelte.test.ts` for browser mode).

## Where to change what

| You want to…                                   | Edit…                                                |
| ---------------------------------------------- | ---------------------------------------------------- |
| Update the opening match date or site metadata | `src/lib/config/site.ts`                             |
| Add / update a nation, flag, or confederation  | `src/lib/data/nations.ts`                            |
| Add / update the match schedule                | `src/lib/data/matches.ts`                            |
| Tweak the countdown UI                         | `src/lib/components/Hero.svelte` and related         |
| Tweak the match list / search                  | `src/lib/components/matches/*`                       |
| Adjust global styles or layout                 | `src/routes/+layout.svelte`, `src/routes/layout.css` |

## Deployment

The production build targets **Cloudflare Pages** via `@sveltejs/adapter-cloudflare`. The output is generated in `.svelte-kit/cloudflare` and can be previewed locally with:

```sh
bun run preview
```

which runs `wrangler pages dev` against the built output.
