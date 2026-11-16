# 0004. The library does not ship font files

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

Timbre is designed with Instrument Sans. Shipping the font would add weight to every install and take the loading strategy (self-hosting, preloading, subsetting) away from the app.

## Decision

- No `@font-face` in the library.
- `--timbre-font-sans` starts with `"Instrument Sans Variable"` (the name Fontsource registers), then `"Instrument Sans"`, then system fallbacks.
- Storybook loads the font through `@fontsource-variable/instrument-sans`, as an example of what an app does.

## Consequences

- Without the font, Timbre falls back to the system sans-serif and stays usable.
- The README and the Introduction page explain how to load it.
