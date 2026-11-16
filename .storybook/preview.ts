import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "@fontsource-variable/instrument-sans";
import "../src/styles/tokens.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    a11y: {
      test: "error",
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          [
            "Theming",
            "Colors",
            "Typography",
            "Spacing and shape",
            "Elevation and motion",
            "Icons",
            "Logo",
          ],
          "Guides",
          ["Accessibility", "Component guidelines"],
          "Components",
        ],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "timbre-light",
        dark: "timbre-dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
