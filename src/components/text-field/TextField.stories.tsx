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
