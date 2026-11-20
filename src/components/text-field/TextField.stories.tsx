import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  args: { label: "Project name" },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

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
