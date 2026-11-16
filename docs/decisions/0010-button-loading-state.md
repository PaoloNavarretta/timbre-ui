# 0010. Button loading state

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

While an action runs, the button must not be pressed again. The native `disabled` attribute would do that, but it also removes the button from the tab order: keyboard users would lose focus right after pressing it. The design system export used `aria-busy`, which screen readers do not announce reliably on buttons.

## Decision

- `loading` sets `aria-disabled="true"` and `data-loading`, shows a decorative spinner (`aria-hidden`) and ignores clicks with `preventDefault()`, so a submit button does not submit the form.
- The button stays focusable and keeps the colours of its variant. Only the native `disabled` state is grey.
- The label says what is happening, for example "Saving".
- Hover styles apply only to enabled buttons that are not loading.

## Consequences

- Screen readers announce the button as unavailable without moving focus.
- Apps pass `loading` and change the label; Timbre does the rest.
