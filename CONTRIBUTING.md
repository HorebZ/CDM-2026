# Contributing

Thanks for taking the time to look at this project. It is primarily a **personal showcase**, but feedback and contributions are genuinely welcome.

## Ways to contribute

- **Bug reports** — open an [issue](../../issues) describing what you did, what you expected, and what happened.
- **Suggestions** — feel free to open an issue to propose an improvement or a new feature.
- **Pull requests** — small, focused PRs are easiest to review. For anything larger, please open an issue first to discuss the idea.

## Development setup

1. Install [Bun](https://bun.sh).
2. Clone the repo and install dependencies:
   ```sh
   bun install
   ```
3. Run the dev server:
   ```sh
   bun run dev
   ```

Before submitting a PR, please run:

```sh
bun run lint
bun run check
bun run test
```

## Style

- **TypeScript** and **Svelte 5** (runes / snippets) are preferred.
- Formatting is handled by **Prettier** (`bun run format`).
- Keep changes focused; avoid unrelated refactors in the same PR.

## AI agent skills

This repo ships with shared skills in [`.claude/skills/`](./.claude/skills/) that encode project conventions (Svelte 5 APIs, component structure, Tailwind v4, etc.). They are picked up automatically by [Claude Code](https://claude.com/claude-code) and [Cursor](https://cursor.com), and they also read well as plain documentation.

If you use an AI agent while contributing, please let it load these skills — it keeps PRs aligned with the project's conventions. Feel free to propose new skills via PR when you spot a recurring rule worth codifying.

Personal agent state (e.g. `.claude/settings.local.json`) is gitignored; only the shared `skills/` directory is versioned.

## Scope

This project is a fan-made showcase, maintained in spare time. Not every suggestion will be accepted, and response times may vary — please don't take it personally. See also the [Disclaimer in the README](./README.md#disclaimer).
