import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SearchIcon } from "./SearchIcon";

const meta = {
  title: "Components/Icon",
  component: SearchIcon,
} satisfies Meta<typeof SearchIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Decorative: Story = {
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");

    await expect(svg).toHaveAttribute("aria-hidden", "true");
    await expect(svg).toHaveAttribute("width", "20");
  },
};

export const Labelled: Story = {
  args: { "aria-label": "Search", size: 24 },
  play: async ({ canvas }) => {
    const svg = canvas.getByRole("img", { name: "Search" });

    await expect(svg).not.toHaveAttribute("aria-hidden");
    await expect(svg).toHaveAttribute("width", "24");
  },
};
