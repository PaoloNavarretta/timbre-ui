import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
  staticDirs: [
    { from: "../src/docs/assets/logos", to: "/logos" },
    // A file named favicon.svg in a static folder becomes the browser tab icon.
    "./public",
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
  // Storybook builds with its own Vite config and ignores build.cssTarget in vite.config.ts.
  // Same browsers as the library, so light-dark() stays native and nested themes keep working.
  viteFinal(viteConfig) {
    viteConfig.build = {
      ...viteConfig.build,
      cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"],
    };
    return viteConfig;
  },
};

export default config;
