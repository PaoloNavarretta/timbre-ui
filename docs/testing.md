# How Timbre is tested

Timbre components are tested in a real browser, through their Storybook stories. This page explains the tools, how they fit together, and how we decide what to test.

## The tools and their jobs

| Tool                                                                                            | Job                                                                                                   | Where you meet it                                            |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Storybook](https://storybook.js.org/docs/writing-stories)                                      | Describes the states of a component as stories (`Default`, `WithError`, `Disabled`…)                  | `*.stories.tsx`                                              |
| [Testing Library](https://testing-library.com/docs/)                                            | Finds elements the way a person does (`getByRole`) and acts like one (`userEvent.type`)               | Inside each `play` function, re-exported by `storybook/test` |
| [jest-dom](https://github.com/testing-library/jest-dom#custom-matchers)                         | Assertions about the DOM (`toHaveAttribute`, `toBeDisabled`, `toHaveAccessibleDescription`)           | After `expect(...)`                                          |
| [Vitest](https://vitest.dev/guide/)                                                             | The test runner: finds the tests, runs them, decides pass or fail, reports, sets the exit code for CI | `pnpm test`, `vite.config.ts`                                |
| [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) | The bridge: turns every story into a Vitest test                                                      | `storybookTest()` in `vite.config.ts`                        |
| [Playwright](https://playwright.dev/)                                                           | Opens and drives Chromium, so tests run in a real browser                                             | Behind the scenes                                            |
| [axe](https://github.com/dequelabs/axe-core)                                                    | Checks accessibility on every story; a violation fails the test (`a11y.test: "error"`)                | Behind the scenes                                            |

In one sentence: **Storybook says what to try, Testing Library how to look at it and touch it, Vitest runs it and decides.**

## What happens on `pnpm test`

```
Vitest                          two projects from vite.config.ts
├─ unit                         *.test.ts(x) in jsdom (hooks and utilities; empty today)
└─ storybook                    every story in *.stories.tsx
    └─ Playwright → Chromium
        └─ for each story:
            1. render           Storybook renders the component with the story's args
            2. play             Testing Library finds and acts, expect checks
            3. axe              accessibility check, always, even without a play
```

A story without a `play` function is still a test: it must render without errors and pass axe.

## Anatomy of a test

```tsx
export const WithDescription: Story = {
  args: { description: "Visible to everyone in the workspace." },
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).toHaveAccessibleDescription("Visible to everyone in the workspace.");
  },
};
```

1. **Arrange:** `args` put the component in the state we want.
2. **Act** (when needed): `userEvent.click`, `userEvent.type`, `userEvent.tab`.
3. **Assert:** `expect` with a jest-dom matcher. Always `await` it.

Find elements by **role and accessible name** first (`getByRole`), then by label (`getByLabelText`, for fields without a role such as passwords). Never by CSS class: class names are hashed and change on every build. See [Testing Library, query priority](https://testing-library.com/docs/queries/about#priority).

## Deciding what to test

Three questions, asked for every component before writing its stories.

**1. What does the component promise?** Every prop is a promise. For each one: what does a person see or hear when I pass it, and when I don't?

**2. Where does the code branch?** Every `if`, `? :` or `&&` is a fork, and each path deserves a test.

**3. If I delete this line, which test fails?** If none does, either a test is missing or the line is not needed. Before opening a pull request, try it for real on a line you just wrote: break it, watch the test fail, put it back.

Applied to `Icon`:

| Line                    | Question            | Covered by                                                   |
| ----------------------- | ------------------- | ------------------------------------------------------------ |
| `size = 20`             | 1: without `size`?  | `Decorative` checks `width="20"`                             |
| `width={size}`          | 1: with `size: 24`? | `Labelled` checks `width="24"`                               |
| `labelled ? … : …`      | 2: the fork         | `Decorative` and `Labelled`                                  |
| `{...props}`            | 3: if removed?      | `Labelled` fails: the `aria-label` never reaches the `<svg>` |
| `stroke="currentColor"` | 3: if removed?      | Nothing, by design: a constant, checked by eye in Storybook  |

## What we test, and what we don't

| We test                                                                 | We don't test                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------ |
| Behaviour a person relies on: clicking, typing, keyboard                | Hashed class names or the internal DOM structure |
| Accessibility: roles, names, descriptions, states                       | What React or the browser guarantee on their own |
| The API contract: `ref`, native attributes, `className`, controlled use | Constant values that do not depend on props      |

## Visible stories and test-only stories

- **States** (`Default`, `WithError`, `Disabled`…) are visible: they document the component.
- **Overview** and **OverviewDark** show every state at once; the dark one makes axe check the dark theme, since all other stories run in the default light theme.
- **Contract tests** (`ForwardsRef`, `ClassNameOnWrapper`, `Controlled`…) carry `tags: ["!dev", "!autodocs"]`: hidden from the sidebar and the Docs page, still run by `pnpm test`.

## Reading a red test

1. Read the story name and the first line of the error: `× Loading` with _expected "spy" to not be called_ already says that a click reached `onClick` while loading.
2. _Unable to find an accessible element with the role … and name …_: compare the name in the message with the text on screen, character by character. Capitals count.
3. An accessibility failure names the axe rule (`color-contrast`, `button-name`…) with a link to its explanation.
4. Open the story in Storybook and use the **Interactions** panel to step through the `play`.
5. Run one story: `pnpm exec vitest run --project storybook -t "With Error"` (the name as Storybook shows it).

When a test fails, fix the cause, not the test, unless the test itself is wrong (it expects a promise the component does not make).

## Blind spots

Some things the tests cannot see, so we check them by hand before every release:

- **Hover:** `userEvent.hover` fires events but does not trigger the CSS `:hover` state.
- **Disabled controls:** axe skips their contrast, as WCAG allows.
- **What a screen reader actually says:** check with VoiceOver.
- **Zoom:** stories run at one size; check at 200%.

## Commands

| Command                                              | When                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `pnpm test`                                          | Before every commit, like CI                               |
| `pnpm test:watch`                                    | While writing tests                                        |
| `pnpm exec vitest run --project storybook -t "Name"` | One story                                                  |
| Storybook → **Run component tests**                  | Same tests, with results next to each story in the sidebar |
