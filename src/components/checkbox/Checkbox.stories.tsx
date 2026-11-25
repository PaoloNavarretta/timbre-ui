import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "Email me updates" },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hidden from the sidebar and the Docs page: these stories exist only as tests. */
const testOnly = ["!dev", "!autodocs"];

// States
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const label = canvas.getByText("Email me updates");

    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await userEvent.click(label);

    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await userEvent.click(checkbox);

    await expect(checkbox).not.toBeChecked();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, userEvent }) => {
    const label = canvas.getByText("Email me updates");
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await userEvent.click(label);

    await expect(checkbox).toBeDisabled();
    await expect(checkbox).not.toBeChecked();
  },
};

// Overview

function CheckboxGallery() {
  return (
    <div style={{ display: "grid", gap: "var(--timbre-space-6)" }}>
      <Checkbox label="Email me updates" />
      <Checkbox label="Email me updates" defaultChecked />
      <Checkbox label="Email me updates" disabled />
      <Checkbox label="Email me updates" disabled defaultChecked />
    </div>
  );
}

export const Overview: Story = {
  render: () => <CheckboxGallery />,
};

/** Forces the dark theme, so the a11y checks cover every state in it. */
export const OverviewDark: Story = {
  globals: { theme: "dark" },
  render: () => <CheckboxGallery />,
};

// Tests
export const KeyboardToggle: Story = {
  tags: testOnly,
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await userEvent.tab();

    await expect(checkbox).toHaveFocus();

    await userEvent.keyboard(" ");

    await expect(checkbox).toBeChecked();
  },
};

export const Controlled: Story = {
  tags: testOnly,
  args: { checked: true, onChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await userEvent.click(checkbox);

    await expect(args.onChange).toHaveBeenCalled();
    await expect(checkbox).toBeChecked();
  },
};

export const ClassNameOnWrapper: Story = {
  tags: testOnly,
  args: { className: "custom" },
  play: async ({ canvas }) => {
    const label = canvas.getByText("Email me updates");
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await expect(label).toHaveClass("custom");
    await expect(checkbox).not.toHaveClass("custom");
  },
};

export const ForwardsRef: Story = {
  tags: testOnly,
  args: { ref: fn() },
  play: async ({ args, canvas }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Email me updates" });

    await expect(args.ref).toHaveBeenCalledWith(checkbox);
  },
};
