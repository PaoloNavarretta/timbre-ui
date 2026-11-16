# 0007. Component tests as Storybook play functions

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

Components need behaviour tests and accessibility checks. Stories already render every variant and state. A separate test file per component would render the same states again, in jsdom, which has no layout and no CSS.

## Decision

- Component tests are **`play` functions** in the stories, using the Testing Library queries and user-event re-exported by `storybook/test`.
- The `storybook` Vitest project runs every story in Chromium through Playwright, with axe in error mode: an accessibility violation fails the test.
- Stories that exist only as tests carry `tags: ["!dev", "!autodocs"]`: hidden from the sidebar and the docs, still run.
- The jsdom `unit` project stays for hooks and utilities.

## Consequences

- One file holds the examples and the tests, and every documented state is tested.
- Tests run in a real browser: focus, keyboard and CSS behave as they do for users.
- Limits: user-event does not trigger the CSS `:hover` state, and axe skips disabled controls. Hover and disabled states still need a look by hand.
- Results also appear in the Storybook sidebar through the Vitest addon.

## Alternatives considered

- **`*.test.tsx` files in jsdom:** faster, but a second rendering of the same states, without CSS.
