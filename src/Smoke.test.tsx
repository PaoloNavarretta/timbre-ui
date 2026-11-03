import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Smoke } from "./Smoke";

it("counts clicks", async () => {
  render(<Smoke />);
  await userEvent.click(screen.getByRole("button", { name: "Clicked 0" }));
  expect(screen.getByRole("button")).toHaveTextContent("Clicked 1");
});
