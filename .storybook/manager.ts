import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// Storybook's own interface (sidebar, toolbar), not the stories.
addons.setConfig({
  theme: create({
    base: "light",
    // Timbre primary (light theme): selected sidebar item, links and focus in the manager.
    colorSecondary: "#a8543b",
    brandTitle: `<span style="display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700;">
      <img src="./logos/monogram-small.svg" alt="" width="28" height="28" />
      Timbre
    </span>`,
    brandUrl: "./",
  }),
});
