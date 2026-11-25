# 0012. IconButton

- **Status:** Accepted
- **Date:** 2026-11-24

## Context

A button that shows only an icon has no text, so it has no accessible name unless the app gives it one: screen readers would say only "button". `Button` already has the variants, sizes, focus and form behaviour an icon button needs, and its CSS sets a horizontal padding that would make a square button wide.

## Decision

- **Built on `Button`, not copied:** `IconButton` passes every prop to `Button` and adds `data-icon-only`. It is set after the props, so an app cannot remove it.
- **`aria-label` is required in the type:** `IconButtonProps` extends the props of `Button` and declares `"aria-label": string` without `?`. Forgetting it is a compile error.
- **No `loading`:** removed from the type with `Omit`, because a spinner and an icon do not fit in the square.
- **The square lives in `Button.module.css`:** `.root[data-icon-only] { aspect-ratio: 1; padding: 0 }`, written after the size rules. It has the same specificity as `.root[data-size="sm"]`, so it must come later in the same file; in a separate stylesheet the winner would depend on the order the bundler emits them. `aspect-ratio` makes one rule work for all three heights.
- **The app picks the icon and its size:** 16 for `sm`, 20 for `md`, 24 for `lg`. `IconButton` does not resize its children.

## Consequences

- TypeScript cannot check what the label says: `aria-label=""` compiles. The accessibility tests (axe `button-name`) catch an empty name; whether the name makes sense is checked by hand.
- `Button` knows about one of its uses through `data-icon-only`, which is documented as a styling hook on the IconButton page.
- The stories test only what `IconButton` adds: the name and the square shape at every size, measured in the browser without copying pixel values from the CSS.
