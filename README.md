# CDM 2026

<div align="center">
    <img src="./src/lib/assets/trophy.svg" width="100" height="100" alt="FIFA World Cup 2026" />

Countdown, contenders & winner tracker

<a href="https://bun.sh"><img src="https://img.shields.io/badge/Bun-6b7280?logo=bun&logoColor=ffffff&color=F472B6" alt="Bun" /></a>
<a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-6b7280?logo=vite&logoColor=ffffff&color=4C1D95" alt="Vite" /></a>
<a href="https://svelte.dev"><img src="https://img.shields.io/badge/Svelte-6b7280?logo=svelte&logoColor=ffffff&color=ff3e00" alt="Svelte" /></a>
<a href="https://pages.cloudflare.com"><img src="https://img.shields.io/badge/Cloudflare-6b7280?logo=cloudflare&logoColor=ffffff&color=F38020" alt="Cloudflare Pages" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-6b7280?logo=tailwindcss&logoColor=ffffff&color=06b6d4" alt="Tailwind CSS" /></a>

</div>

A SvelteKit web app dedicated to the 2026 FIFA World Cup — a fan-made passion project, built by a football fan for football fans.

> **Fan-made project.** This site is **not affiliated with, endorsed by, or sponsored by** FIFA, the Wiloo YouTube channel, or any official organisation. It is an independent tribute made out of love for football and for the content Wiloo produces around the competition. See the [Disclaimer](#disclaimer) below.

## About this repository

This repo is primarily a **showcase**: the code is open so anyone curious can look under the hood, learn from it, or take inspiration from it.

Feedback, bug reports, suggestions and pull requests are **welcome and appreciated**, even if the project is driven by a single maintainer and does not aim to become a large collaborative platform. If you want to contribute, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Acknowledgements

Inspired by the infographic used by the great [Wiloo](https://www.youtube.com/@wiloo) in his YouTube videos about the 2026 World Cup. This site is meant to make following the tournament more engaging ⚽.

## Features

- Countdown to the opening match
  <img src="./readme-ressources/demo-countdown.png" alt="Countdown" />
- Remaining contenders tracker
  <img src="./readme-ressources/demo-contenders.png" alt="Remaining contenders tracker" />
- Match list and search
  <img src="./readme-ressources/demo-matches-list.png" alt="Match list" />
  <img src="./readme-ressources/demo-search.png" alt="Match search" />
- Winner celebration

  _revealed at the end of the tournament_

## Usage

#### Prerequisites

[`Bun`](https://bun.sh)

#### Install dependencies

```sh
bun install
```

#### Development server

```sh
bun run dev
bun run dev -- --port XXXX
```

The default port is `5173`. To change the configuration, follow the [Vite documentation](https://vite.dev/config/server-options.html#server-port).

#### Build and preview

```sh
bun run build
```

```sh
bun run preview
```

#### Deployment

The build is designed to work with [`Cloudflare Pages`](https://pages.cloudflare.com).

Make sure you are using Build system version >= 2.

Build command:

```sh
bun install && bun run build
```

## Configuration

The main files to update when evolving the site are:

- `src/lib/config/site.ts`: opening match date
- `src/lib/data/nations.ts`: list of nations, `enabled` status, appearances, and confederations
- `src/lib/data/matches.ts`: match schedule

## Architecture

A dedicated overview of the project structure, data flow and conventions lives in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Tooling & AI agent skills

Development on this project leans on a set of **personal agent skills** (Svelte 5, SvelteKit, Tailwind, etc.) maintained separately by the author. They are not bundled here — you can find them on my [GitHub profile](https://github.com/HorebZ).

## Sources

The site's content relies in particular on:

- [Flagpedia](https://flagpedia.net/download/api)
- [FIFA - World Cup 2026: Qualified teams](https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026/articles/coupe-du-monde-2026-equipes-qualifiees)
- [Wikipedia - National team appearances in the FIFA World Cup](https://fr.wikipedia.org/wiki/Apparition_des_%C3%A9quipes_dans_la_Coupe_du_monde_de_football)

## Community

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — how to report issues or propose changes
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) — expected behaviour in discussions and PRs
- [`SECURITY.md`](./SECURITY.md) — how to responsibly report a security issue

## Author

Developed by [Horebz](https://github.com/HorebZ).

## License

The source code in this repository is distributed under the [MIT](./LICENSE) license.

Trademarks, logos, visuals, data, and content from third-party sources remain subject to their respective
licenses and terms of use.

## Disclaimer

This project is an **independent, non-commercial fan project**. It is not affiliated with, endorsed by, sponsored by, or in any way officially connected to FIFA, the 2026 FIFA World Cup, any national football federation, any participating team, or the Wiloo YouTube channel.

All team names, national flags, competition names, logos, trademarks and related visuals referenced in this project remain the property of their respective owners. They are used here strictly for informational and illustrative purposes in the context of a fan tribute.

If you are a rights holder and believe a specific asset or reference should be removed or adjusted, please open an issue or reach out to the author.

<div align="center">
    <img src="./src/lib/assets/trionda.png" width="100" height="100" alt="Trionda ball" />
</div>
