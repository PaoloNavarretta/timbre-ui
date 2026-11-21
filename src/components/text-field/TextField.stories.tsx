import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  args: { label: "Project name" },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hidden from the sidebar and the Docs page: these stories exist only as tests. */
const testOnly = ["!dev", "!autodocs"];

// States

export const Default: Story = {
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).toBeInTheDocument();
  },
};

export const Password: Story = {
  args: { label: "Password", type: "password" },
  play: async ({ canvas }) => {
    const textField = canvas.getByLabelText("Password");

    await expect(textField).toHaveAttribute("type", "password");
  },
};

export const WithDescription: Story = {
  args: { description: "Visible to everyone in the workspace." },
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).toHaveAccessibleDescription("Visible to everyone in the workspace.");
  },
};

export const WithError: Story = {
  args: { description: "Visible to everyone in the workspace.", error: "Enter a project name." },
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).toHaveAttribute("aria-invalid", "true");
    await expect(textField).toHaveAccessibleDescription(
      "Visible to everyone in the workspace. Enter a project name.",
    );
  },
};

export const Disabled: Story = {
  args: { defaultValue: "Design review", disabled: true },
  play: async ({ canvas, userEvent }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await userEvent.type(textField, " notes");

    await expect(textField).toBeDisabled();
    await expect(textField).toHaveValue("Design review");
  },
};

/** Long texts must wrap, also at 200% zoom. */
export const LongContent: Story = {
  args: {
    label: "Name of the project as it appears in invoices and reports",
    description:
      "Shown on every document we send. You can change it later, but past documents keep the old name.",
    error: "This name is already used by another project in your workspace.",
  },
};

// Overview

function TextFieldGallery() {
  return (
    <div style={{ display: "grid", gap: "var(--timbre-space-6)", maxWidth: 320 }}>
      <TextField label="Project name" placeholder="e.g. Design review" />
      <TextField label="Project name" description="Visible to everyone in the workspace." />
      <TextField
        label="Project name"
        description="Visible to everyone in the workspace."
        error="Enter a project name."
      />
      <TextField label="Project name" defaultValue="Design review" disabled />
    </div>
  );
}

export const Overview: Story = {
  render: () => <TextFieldGallery />,
};

/** Forces the dark theme, so the a11y checks cover every state in it. */
export const OverviewDark: Story = {
  globals: { theme: "dark" },
  render: () => <TextFieldGallery />,
};

// Tests

export const KeepsAppDescription: Story = {
  tags: testOnly,
  args: { "aria-describedby": "app-hint", description: "Visible to everyone in the workspace." },
  render: (args) => (
    <>
      <TextField {...args} />
      <p id="app-hint">Max 40 characters.</p>
    </>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toHaveAccessibleDescription(
      "Max 40 characters. Visible to everyone in the workspace.",
    );
  },
};

export const ClassNameOnWrapper: Story = {
  tags: testOnly,
  args: { className: "custom" },
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).not.toHaveClass("custom");
    await expect(textField.closest(".custom")).toContainElement(canvas.getByText("Project name"));
  },
};

export const ForwardsNativeAttributes: Story = {
  tags: testOnly,
  args: { name: "project", maxLength: 40, required: true },
  play: async ({ canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(textField).toHaveAttribute("name", "project");
    await expect(textField).toHaveAttribute("maxlength", "40");
    await expect(textField).toBeRequired();
  },
};

export const ForwardsRef: Story = {
  tags: testOnly,
  args: { ref: fn() },
  play: async ({ args, canvas }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await expect(args.ref).toHaveBeenCalledWith(textField);
  },
};

export const Controlled: Story = {
  tags: testOnly,
  args: { value: "Design review", onChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await userEvent.type(textField, "x");

    await expect(args.onChange).toHaveBeenCalled();
    await expect(textField).toHaveValue("Design review");
  },
};
