# 0011. Icons as generated React components

- **Status:** Accepted
- **Date:** 2026-11-24

## Context

The design system exports 61 icons as SVG files. Apps need them as React components that take the text colour, come in the design system's sizes and stay silent for screen readers when they only decorate a label. An app that uses three icons should not download all 61, and an app that uses none should not download any.

## Decision

- **One component per icon**, like Lucide React: `SearchIcon`, `CloseIcon`… Each one is a shared `Icon` shell (the `<svg>` with `viewBox`, `fill="none"`, `stroke="currentColor"`) plus its own shapes.
- **Generated, not hand-written:** `pnpm icons` runs `scripts/generate-icons.ts`, which turns every file in `src/docs/assets/icons` into a component in `src/icons`. The SVG files stay the only source; the generated files say `Do not edit` and are committed, so pull requests show what changed. Our own script instead of SVGR: all 61 files share the same root and only use `path`, `circle`, `rect` and `g`, so three regular expressions are enough.
- **A separate entry point:** `import { SearchIcon } from "timbre-ui/icons"`, built as `dist/icons.js` next to `dist/index.js` and declared in `package.json` `exports`. The main entry does not import any icon.
- **Decorative by default:** `aria-hidden="true"`. With an `aria-label`, an icon becomes `role="img"` with that name.
- **Sizes 16, 20 and 24**, with 20 as the default. Colour comes from `currentColor`.

## Consequences

- Apps bundle only the icons they import: checked with a test app that imported `SearchIcon` and got only `Icon` and `SearchIcon`.
- A new icon is an SVG file in `src/docs/assets/icons` plus `pnpm icons`; the export is added to `src/icons/index.ts` by the script.
- The script relies on the shape of today's files. An SVG with a different root, hyphenated attributes or new elements needs a change to the script, or a move to SVGR.
- TextField still draws its error icon inline; it can switch to `ErrorIcon` later.
