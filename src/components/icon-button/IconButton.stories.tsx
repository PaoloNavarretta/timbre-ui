import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { IconButton } from "./IconButton";
import { SearchIcon, CloseIcon, TrashIcon } from "../../icons";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  args: { "aria-label": "Search", onClick: fn(), children: <SearchIcon /> },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// States
export const Default: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Search" });

    const { width, height } = button.getBoundingClientRect();
    await expect(width).toBe(height);
  },
};

// Sizes

export const Small: Story = {
  args: { size: "sm", children: <SearchIcon size={16} /> },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Search" });

    await expect(button).toHaveAttribute("data-size", "sm");

    const { width, height } = button.getBoundingClientRect();
    await expect(width).toBe(height);
  },
};

export const Large: Story = {
  args: { size: "lg", children: <SearchIcon size={24} /> },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Search" });

    await expect(button).toHaveAttribute("data-size", "lg");

    const { width, height } = button.getBoundingClientRect();
    await expect(width).toBe(height);
  },
};

// Overview

function IconButtonGallery() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--timbre-space-3)" }}>
      <IconButton aria-label="Search" variant="primary">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="Close" variant="ghost">
        <CloseIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="danger">
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="primary" disabled>
        <TrashIcon />
      </IconButton>
    </div>
  );
}

export const Overview: Story = {
  render: () => <IconButtonGallery />,
};

export const OverviewDark: Story = {
  globals: { theme: "dark" },
  render: () => <IconButtonGallery />,
};
