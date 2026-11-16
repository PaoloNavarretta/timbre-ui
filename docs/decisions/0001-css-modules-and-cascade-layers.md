# 0001. CSS Modules and cascade layers

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

A component library ships styles into apps it does not control. Two problems follow: class names can collide with the app's, and the app must be able to override any library style without fighting specificity or reaching for `!important`.

## Decision

- Component styles are **CSS Modules**: class names are hashed per file, so they never collide.
- Every Timbre rule lives in a **cascade layer**: `timbre.reset`, `timbre.tokens`, `timbre.components`, declared in that order at the top of the stylesheet.
- No runtime styling library and no global reset. The library never styles `body`.

## Consequences

- Any app style written outside a layer beats every Timbre style, whatever its specificity. A single class is enough to override.
- Hashed class names are not API. Stable styling hooks are data attributes (see [0006](./0006-component-api-conventions.md)).
- Component styles declare what they need themselves (`box-sizing`, `font: inherit`) instead of relying on a reset.

## Alternatives considered

- **Tailwind:** fast for apps, but it leaks utility classes into the consumer's markup and build.
- **CSS-in-JS:** runtime cost, and server rendering needs extra setup.
- **BEM without layers:** avoids collisions by convention only, and overrides still depend on specificity.
