import { colors } from "@/theme/tokens/colors";
import { fonts } from "@/theme/tokens/fonts";
import { shadows } from "@/theme/tokens/shadows";
import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";
import { recipes } from "./recipes";
import { semanticColors } from "./semantic-tokens/colors";
import { semanticShadows } from "./semantic-tokens/shadows";
import { slotRecipes } from "./slot-recipes";

const config = defineConfig({
  preflight: true,
  cssVarsPrefix: "rengo",
  cssVarsRoot: ":where(html, .rengo-theme)",
  theme: {
    recipes,
    slotRecipes,
    tokens: {
      colors,
      shadows,
      fonts,
    },
    semanticTokens: {
      colors: semanticColors,
      shadows: semanticShadows,
    },
  },
});

export const system = createSystem(mergeConfigs(defaultConfig, config));
