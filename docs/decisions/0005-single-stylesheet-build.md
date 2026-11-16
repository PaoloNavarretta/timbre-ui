# 0005. One stylesheet, imported once

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

The package must ship JavaScript, type declarations and CSS. If `src/index.ts` imported the CSS, the import would end up in the generated `.d.ts` files and break type checking in consumer projects.

## Decision

- `src/index.ts` is the public API and imports no CSS.
- `src/library.ts` imports the token stylesheet and re-exports `./index`. It is the Vite entry point and is excluded from the declaration build.
- Vite writes all CSS (tokens and CSS Modules) into one file, `dist/styles.css`, exported as `timbre-ui/styles.css`.

## Consequences

- Apps import the stylesheet once: `import "timbre-ui/styles.css"`.
- The JavaScript never injects styles, which keeps it free of side effects and friendly to server rendering.
- The cost: an app that uses one component still loads every component's CSS. Acceptable while the library is small.
