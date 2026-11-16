# Contributing to Timbre

Thank you for your interest. This guide explains how the project is set up and what "done" means for a change.

## Setup

1. Install Node 26. The repository has an `.nvmrc`, so with [fnm](https://github.com/Schniz/fnm) `fnm use` is enough.
2. Enable pnpm through Corepack: `corepack enable`.
3. Install the dependencies: `pnpm install`.
4. Install the browser used by the tests: `pnpm exec playwright install chromium`.

## Scripts

| Script                 | What it does                                              |
| ---------------------- | --------------------------------------------------------- |
| `pnpm storybook`       | Storybook in development mode, at `http://localhost:6006` |
| `pnpm test`            | Every story as a test in Chromium, plus any unit tests    |
| `pnpm test:watch`      | The same, rerun on every change                           |
| `pnpm lint`            | ESLint, including JSX accessibility rules                 |
| `pnpm typecheck`       | TypeScript on the source and on the configuration files   |
| `pnpm format`          | Prettier on every file                                    |
| `pnpm build`           | The library in `dist/`                                    |
| `pnpm build-storybook` | The static Storybook in `storybook-static/`               |

Before every commit: `pnpm format && pnpm lint && pnpm typecheck && pnpm test`. Before a pull request that touches configuration or `src/index.ts`, also `pnpm build && pnpm build-storybook`. CI runs all of them.

## Workflow

- Branch from an up-to-date `main`: `git switch main && git pull && git switch -c feat/text-field`.
- Branch names follow `type/description`: `feat/`, `fix/`, `docs/`, `build/`, `chore/`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) with a scope: `feat(button): add loading state`.
- Open a pull request. It is merged with **squash and merge** once CI is green.

## Writing a component

Each component lives in its own folder:

```
src/components/text-field/
├─ TextField.tsx            the component and its props, with JSDoc on every prop
├─ TextField.module.css     styles, inside @layer timbre.components
├─ TextField.stories.tsx    stories and tests (play functions)
├─ TextField.mdx            the docs page: usage, variants, accessibility, props
└─ index.ts                 exports the component and its props type
```

Then export it from `src/index.ts`.

The API rules and the reasons behind them are in Storybook, under **Guides → Component guidelines**, and in [docs/decisions](./docs/decisions/README.md).

## Tests

Tests are written as `play` functions in the stories, with the Testing Library queries and user-event re-exported by `storybook/test`. Find elements by role and accessible name. Stories that exist only as tests carry `tags: ["!dev", "!autodocs"]`, so they stay out of the sidebar but still run. Every story is also checked with axe, and an accessibility violation fails the test.

## Definition of done

A component is ready only when it has all of these:

- [ ] A coherent API, following the component guidelines
- [ ] Styles with semantic tokens only, in `timbre.components`
- [ ] Tests for every behaviour and for the API contract
- [ ] A story for every variant and state, without accessibility violations
- [ ] Both themes checked in Storybook
- [ ] A manual check with the keyboard and VoiceOver, and at 200% zoom
- [ ] A docs page with usage, variants, accessibility notes and props
- [ ] An export from `src/index.ts`
