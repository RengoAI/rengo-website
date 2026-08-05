import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

import { headingRecipe } from "./recipes/heading";
import { colors } from "./tokens/colors";
import { fonts } from "./tokens/fonts";

const config = defineConfig({
  preflight: true,
  // Isolated CSS var namespace — no collision with the existing "rengo" theme
  cssVarsPrefix: "v2",
  cssVarsRoot: ":where(html, .v2-theme)",

  globalCss: {
    "html, body": {
      fontFamily: "var(--v2-fonts-body)",
    } as any,
  },

  theme: {
    tokens: {
      colors,
      fonts,
    },
    recipes: {
      heading: headingRecipe,
    },
  },
});

export const v2System = createSystem(mergeConfigs(defaultConfig, config));
