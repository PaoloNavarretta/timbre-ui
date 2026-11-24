import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: "src/library.ts",
        icons: "src/icons/index.ts",
      },
      formats: ["es"],
      cssFileName: "styles",
    },
    cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"],
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/],
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,tsx}"],
          environment: "jsdom",
          setupFiles: ["src/test/setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [storybookTest()],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
