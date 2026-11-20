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

export const KeepsAppDescription: Story = {
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

// Test-only stories: the API contract

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

export const Disabled: Story = {
  args: { defaultValue: "Design review", disabled: true },
  play: async ({ canvas, userEvent }) => {
    const textField = canvas.getByRole("textbox", { name: "Project name" });

    await userEvent.type(textField, " notes");

    await expect(textField).toBeDisabled();
    await expect(textField).toHaveValue("Design review");
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

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { description: "Visible to everyone in the workspace.", error: "Enter a project name." },
};
