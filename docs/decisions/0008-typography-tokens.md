# 0008. Typography tokens

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

The design system defines a type scale (display, title, heading, body, label, caption, code). Components wrote font sizes as numbers, and the scale existed only in the docs.

## Decision

- Each style becomes three public tokens: `--timbre-text-{style}-size`, `-line-height` and `-weight`, plus `-tracking` where the style has letter-spacing.
- A new style, `body-lg` (16/24, weight 400), joins the scale so that the large button keeps its 16px text.
- Separate tokens instead of one `font` shorthand, so a component can combine the size of one style with the weight of another.

## Consequences

- Components use tokens for text, like they do for colour and space.
- The Typography page documents the tokens as API.
