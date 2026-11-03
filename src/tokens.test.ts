import { describe, expect, it } from "vitest";
import { tokenName } from "./tokens";

describe("tokenName", () => {
  it("builds a grouped token name", () => {
    expect(tokenName("primary", "color")).toBe("--timbre-color-primary");
  });

  it("builds an ungrouped token name", () => {
    expect(tokenName("space-4")).toBe("--timbre-space-4");
  });
});
