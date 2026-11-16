# 0003. Private primitives, public semantic tokens

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

Tokens are the main way apps adapt Timbre to their brand. Whatever is public becomes a promise that is hard to break later.

## Decision

- **Primitives** (`--_timbre-terracotta-600`) describe a raw colour. The leading underscore marks them private: only the token file reads them.
- **Semantic tokens** (`--timbre-color-primary`, `--timbre-space-4`, `--timbre-radius-control`, `--timbre-control-md`, `--timbre-shadow-sm`, `--timbre-focus-ring`) describe a purpose. They are the public API.
- Components use semantic tokens only: no primitives, no hex values.

## Consequences

- The palette can change without breaking apps, as long as the semantic names keep their meaning.
- Branding means redefining a few semantic tokens on a container.
- The focus ring is built from other semantic tokens, so it follows the theme and the brand by itself.
