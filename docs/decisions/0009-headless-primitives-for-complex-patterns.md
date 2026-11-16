# 0009. Headless primitives only for complex patterns

- **Status:** Proposed
- **Date:** 2026-11-16

## Context

Dialog, Popover, Tooltip, Menu, Tabs and Select need focus management, keyboard models and positioning that are hard to get right. Button and TextField need none of that.

## Decision

- Simple components use plain HTML and a few lines of React.
- Complex patterns build on a headless library. The choice between Base UI, Radix and React Aria will be made with a Dialog prototype, comparing accessibility, API, bundle size and styling freedom.

## Consequences

- Simple components carry no dependency.
- A Button rendered as a link (polymorphism with `render` or `asChild`) waits for this choice, so that it follows the same pattern as the headless library.
