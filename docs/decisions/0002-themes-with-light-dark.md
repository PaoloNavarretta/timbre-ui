# 0002. Themes with `color-scheme` and `light-dark()`

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

Timbre has a light and a dark theme. They must follow the system preference, be selectable with an attribute, and work nested: a dark panel inside a light page, and a light card inside that panel. The design system export repeats every dark value twice (once for `[data-theme]`, once in a `prefers-color-scheme` media query).

## Decision

- Every semantic colour is written **once** with `light-dark(light, dark)`.
- `:root` sets `color-scheme: light dark`, so the system preference decides by default.
- `[data-theme="timbre-light"]` and `[data-theme="timbre-dark"]` only set `color-scheme`. Because `light-dark()` resolves on each element, themes nest correctly.
- Shadows use `light-dark()` on the colour of each layer, with `transparent` for layers that the dark theme does not have.

## Consequences

- One declaration per token instead of three, and no media query to keep in sync.
- Browser support: Chrome and Edge 123, Firefox 120, Safari 17.5. The build sets `cssTarget` to these versions. Without it, Lightning CSS rewrites `light-dark()` into a fallback based on hidden variables that breaks nested themes. Storybook builds with its own Vite configuration, so `.storybook/main.ts` sets the same target in `viteFinal`. Check: no `lightningcss` in the built CSS.

## Alternatives considered

- **Duplicated blocks per theme** (the design system export): works, but every dark value lives in two places.
- **Theme classes switching variables in JavaScript:** needs a provider and does not work before hydration.
