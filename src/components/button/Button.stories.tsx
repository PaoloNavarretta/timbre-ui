// The model for every component's stories: copy its structure for new components.
// Each story is one state of the component (a page in Storybook) and, through its
// `play` function, a test that `pnpm test` runs in a real browser. Every story is also
// checked by axe for accessibility, even without a `play` function.
// How we decide what to test: docs/testing.md.

// `Meta` types the default export below, `StoryObj` types each story.
import type { Meta, StoryObj } from "@storybook/react-vite";
// `expect` makes the assertions (with the jest-dom matchers: toHaveAttribute, toBeDisabled…).
// `fn` creates a mock function: it does nothing, but remembers every call.
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

// The meta describes the whole file: where it sits in the sidebar, which component it
// shows, and the args every story starts from.
const meta = {
  // "Components/Button": the folder "Components", the page "Button".
  title: "Components/Button",
  component: Button,
  // Default props for every story. A story's own `args` replace only the keys it lists.
  args: {
    children: "Save changes",
    // A mock instead of a real handler, so tests can check whether a click arrived.
    onClick: fn(),
  },
  // `satisfies` checks the object against `Meta` but keeps its exact type, so
  // `StoryObj<typeof meta>` below knows these args exist.
} satisfies Meta<typeof Button>;

// Storybook reads the default export to know which component the file is about.
export default meta;

// The type of every story in this file: the props of Button, plus the args above.
type Story = StoryObj<typeof meta>;

/** Hidden from the sidebar and the Docs page: these stories exist only as tests. */
const testOnly = ["!dev", "!autodocs"];

// Variants

// Each named export is a story. Its name becomes the label in the sidebar ("Primary").
export const Primary: Story = {
  // Arrange: put the component in the state we want to test.
  args: { variant: "primary" },
  // The test. `args` are the final props, `canvas` holds the Testing Library queries
  // scoped to this story, `userEvent` acts like a person (click, type, tab).
  play: async ({ args, canvas, userEvent }) => {
    // Find the element the way a person does: by role and accessible name.
    // If it is not there, the test fails on this line.
    const button = canvas.getByRole("button", { name: "Save changes" });

    // Act.
    await userEvent.click(button);

    // Assert. Always `await` an expect.
    await expect(button).toHaveAttribute("data-variant", "primary");
    // The mock from the meta remembers the click.
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  // `children` replaces the meta's "Save changes"; `onClick` stays the meta's.
  args: { children: "Cancel" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Cancel" });

    // No args for these three: this story checks the defaults of Button.
    await expect(button).toHaveAttribute("type", "button");
    await expect(button).toHaveAttribute("data-variant", "secondary");
    await expect(button).toHaveAttribute("data-size", "md");
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Add field" },
  play: async ({ canvas }) => {
    // Only one button on the canvas, so the role alone is enough to find it.
    await expect(canvas.getByRole("button")).toHaveAttribute("data-variant", "ghost");
  },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete project" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toHaveAttribute("data-variant", "danger");
  },
};

// Sizes

export const Small: Story = {
  args: { variant: "primary", size: "sm", children: "Small" },
  play: async ({ canvas }) => {
    // The attribute, not the pixel height: the CSS values are checked by eye in Storybook.
    await expect(canvas.getByRole("button")).toHaveAttribute("data-size", "sm");
  },
};

export const Large: Story = {
  args: { variant: "primary", size: "lg", children: "Large" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toHaveAttribute("data-size", "lg");
  },
};

// States

export const Disabled: Story = {
  args: { variant: "primary", disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button");

    // A person tries to click: a disabled button must not react.
    await userEvent.click(button);

    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Saving" },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Saving" });

    // Tab first: unlike `disabled`, a loading button must stay reachable by keyboard.
    await userEvent.tab();
    await userEvent.click(button);

    await expect(button).toHaveFocus();
    // Screen readers announce it as dimmed, while it keeps the focus.
    await expect(button).toHaveAttribute("aria-disabled", "true");
    // Present-or-absent attribute: no value to compare, only whether it is there.
    await expect(button).toHaveAttribute("data-loading");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// No `play`: still a test. It must render and pass axe; the layout is checked by eye.
export const LongLabel: Story = {
  args: { children: "Save changes and notify everyone in the project" },
};

// Overview

// Every state side by side, for the eye and for axe. A plain component, not a story:
// it is not exported, so Storybook does not list it.
function ButtonGallery() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--timbre-space-3)" }}>
      <Button variant="primary">Save changes</Button>
      <Button>Cancel</Button>
      <Button variant="ghost">Add field</Button>
      <Button variant="danger">Delete project</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" loading>
        Saving
      </Button>
    </div>
  );
}

export const Overview: Story = {
  // `render` replaces the default rendering (`<Button {...args} />`) with our own JSX.
  render: () => <ButtonGallery />,
};

/** Forces the dark theme, so the a11y checks cover every state in it. */
export const OverviewDark: Story = {
  // `globals` sets the toolbar's theme switch for this story only (addon-themes).
  globals: { theme: "dark" },
  render: () => <ButtonGallery />,
};

// Tests
// The API contract: things an app relies on that are not visible in a state.

export const KeyboardActivation: Story = {
  tags: testOnly,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button")).toHaveFocus();

    // A native <button> reacts to both keys: we check it still does.
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");

    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const KeepsGivenType: Story = {
  tags: testOnly,
  // The default is "button"; an app inside a form must be able to ask for "submit".
  args: { type: "submit" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toHaveAttribute("type", "submit");
  },
};

export const MergesClassName: Story = {
  tags: testOnly,
  args: { className: "custom" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button");

    // The app's class is there…
    await expect(button).toHaveClass("custom");
    // …and Timbre's own (a hashed CSS Modules name) is still there too.
    await expect(button.classList.length).toBeGreaterThan(1);
  },
};

export const ForwardsNativeAttributes: Story = {
  tags: testOnly,
  // Three attributes Button knows nothing about: they must reach the <button> anyway.
  args: { name: "intent", value: "save", title: "Save the draft" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button");

    await expect(button).toHaveAttribute("name", "intent");
    await expect(button).toHaveAttribute("value", "save");
    await expect(button).toHaveAttribute("title", "Save the draft");
  },
};

export const ForwardsRef: Story = {
  tags: testOnly,
  // A ref can be a function: React calls it with the DOM element. A mock records that call.
  args: { ref: fn() },
  play: async ({ args, canvas }) => {
    await expect(args.ref).toHaveBeenCalledWith(canvas.getByRole("button"));
  },
};
