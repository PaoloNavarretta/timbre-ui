# The Timbre stack

Every tool in the repository, what it does, where it is configured and which command uses it. When something breaks, find the tool here first: the error usually tells you which one it is.

## From source to an app

```
src/**/*.tsx ──── Vite ────► dist/index.js, dist/icons.js, dist/styles.css   the code
             └─── tsc ─────► dist/**/*.d.ts                                  the types
package.json "exports" ────► which of those files an app can import
the app's bundler ─────────► bundles Timbre with the app, drops unused code, minifies
```

## Runtime and packages

| Tool                              | What it does                                                                                         | Configured in                                                                   | Used by                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------- |
| [Node.js](https://nodejs.org/) 26 | Runs every tool, and runs `scripts/*.ts` directly, without compiling them first                      | `.nvmrc`, `devEngines` in `package.json`                                        | Everything                      |
| [pnpm](https://pnpm.io/) 12       | Installs the dependencies and runs the scripts; Corepack picks the version in `packageManager`       | `package.json`, `pnpm-lock.yaml` (exact versions), `pnpm-workspace.yaml`        | `pnpm install`, `pnpm <script>` |
| [React](https://react.dev/) 19    | The components are React components. A peer dependency: the app installs it, Timbre does not ship it | `peerDependencies` in `package.json`; left out of the build in `vite.config.ts` | The app                         |

## Code and build

| Tool                                                      | What it does                                                                                                       | Configured in                                                                                           | Used by                        |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [TypeScript](https://www.typescriptlang.org/) 7           | Checks the types in strict mode, and writes the `.d.ts` files into `dist/`                                         | `tsconfig.json` (src), `tsconfig.node.json` (config files and scripts), `tsconfig.build.json` (`.d.ts`) | `pnpm typecheck`, `pnpm build` |
| TypeScript 6                                              | Installed under the name `typescript` only for typescript-eslint, which supports TypeScript up to 6.0              | `package.json` (alias)                                                                                  | `pnpm lint`                    |
| [Vite](https://vite.dev/) 8                               | Builds the library: two entries (`index`, `icons`), ES modules only, React left out, one stylesheet                | `vite.config.ts` (`build`)                                                                              | `pnpm build`                   |
| [CSS Modules](https://github.com/css-modules/css-modules) | Gives each component class names that cannot clash with the app's; the styles sit in the `timbre.*` cascade layers | `*.module.css` next to each component                                                                   | Vite                           |
| Icon script                                               | Turns every SVG in `src/docs/assets/icons` into a React component in `src/icons`                                   | `scripts/generate-icons.ts`                                                                             | `pnpm icons`                   |

## Quality

| Tool                                              | What it does                                                                                          | Configured in                         | Used by                        |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------ |
| [ESLint](https://eslint.org/) 10                  | Finds mistakes: typescript-eslint (strict), React hooks rules, JSX accessibility rules (`jsx-a11y-x`) | `eslint.config.js`                    | `pnpm lint`, VS Code           |
| [Prettier](https://prettier.io/)                  | Formats every file the same way; ESLint leaves formatting to it                                       | `.prettierrc.json`, `.prettierignore` | `pnpm format`, VS Code on save |
| [GitHub Actions](https://docs.github.com/actions) | On every pull request and push to `main`: format check, lint, typecheck, tests, both builds           | `.github/workflows/ci.yml`            | GitHub                         |

## Docs and tests

How the testing tools fit together is explained in [testing.md](./testing.md).

| Tool                                                                                            | What it does                                                                                    | Configured in                                    | Used by                                  |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| [Storybook](https://storybook.js.org/) 10                                                       | Shows every component state as a story, and the MDX docs pages                                  | `.storybook/main.ts`, `preview.ts`, `manager.ts` | `pnpm storybook`, `pnpm build-storybook` |
| [Vitest](https://vitest.dev/) 5                                                                 | The test runner: runs the tests and decides pass or fail                                        | `vite.config.ts` (`test.projects`)               | `pnpm test`                              |
| [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) | Turns every story into a Vitest test                                                            | `vite.config.ts` (`storybookTest()`)             | `pnpm test`                              |
| [Playwright](https://playwright.dev/)                                                           | Opens Chromium, so the tests run in a real browser                                              | `vite.config.ts` (`browser`)                     | `pnpm test`                              |
| [Testing Library](https://testing-library.com/) and jest-dom                                    | Find elements by role and name, act like a user, check the DOM; re-exported by `storybook/test` | Nothing to configure                             | The `play` functions in `*.stories.tsx`  |
| [axe](https://github.com/dequelabs/axe-core) (Storybook a11y addon)                             | Checks accessibility on every story; a violation fails the test                                 | `.storybook/preview.ts` (`a11y.test: "error"`)   | `pnpm test`, the Accessibility panel     |
| [jsdom](https://github.com/jsdom/jsdom)                                                         | A browser simulated in Node, for unit tests of hooks and utilities (none yet)                   | `vite.config.ts` (`unit` project)                | `pnpm test`                              |
