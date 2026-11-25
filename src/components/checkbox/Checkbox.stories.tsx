import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "Email me updates" },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

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
