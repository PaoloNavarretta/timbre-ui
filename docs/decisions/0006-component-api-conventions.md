# 0006. Component API conventions

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

A library feels consistent when every component answers the same questions the same way: which props it accepts, where `ref` goes, how to style a variant.

## Decision

- **Native props forwarded** to the main element, typed with `ComponentPropsWithRef<"button">` and similar.
- **`ref` is a regular prop** (React 19). No `forwardRef`.
- **`className` is merged**, never replaced.
- **Variants are values, not booleans:** `variant="primary"`, `size="lg"`. They are exposed as `data-variant` and `data-size`.
- **On/off states are data attributes that are present or absent:** `data-loading`, later `data-invalid`.
- **Safe defaults:** a `Button` is `type="button"` unless told otherwise.
- **Every prop has JSDoc**, which Storybook shows in the props table.

## Consequences

- Data attributes are public API, documented on each component page, and safe to use in app CSS and tests.
- For fields with several elements, native props and `ref` go to the input and `className` goes to the wrapper (see TextField).
