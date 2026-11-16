import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Save changes",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hidden from the sidebar and the Docs page: these stories exist only as tests. */
const testOnly = ["!dev", "!autodocs"];

// Variants

export const Primary: Story = {
  args: { variant: "primary" },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save changes" });

    await userEvent.click(button);

    await expect(button).toHaveAttribute("data-variant", "primary");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: { children: "Cancel" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Cancel" });

    await expect(button).toHaveAttribute("type", "button");
    await expect(button).toHaveAttribute("data-variant", "secondary");
    await expect(button).toHaveAttribute("data-size", "md");
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Add field" },
  play: async ({ canvas }) => {
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

    await userEvent.click(button);

    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Saving" },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Saving" });

    await userEvent.tab();
    await userEvent.click(button);

    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).toHaveAttribute("data-loading");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LongLabel: Story = {
  args: { children: "Save changes and notify everyone in the project" },
};

// Both themes, every variant and state at once

function AllStates() {
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

export const Light: Story = {
  globals: { theme: "light" },
  render: () => <AllStates />,
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: () => <AllStates />,
};

// Test-only stories: the API contract

export const KeyboardActivation: Story = {
  tags: testOnly,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button")).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");

    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const KeepsGivenType: Story = {
  tags: testOnly,
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

    await expect(button).toHaveClass("custom");
    await expect(button.classList.length).toBeGreaterThan(1);
  },
};

export const ForwardsNativeAttributes: Story = {
  tags: testOnly,
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
  args: { ref: fn() },
  play: async ({ args, canvas }) => {
    await expect(args.ref).toHaveBeenCalledWith(canvas.getByRole("button"));
  },
};
