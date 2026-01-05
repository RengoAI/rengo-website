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
  globalCss: {
    // Global typography settings
    "html, body": {
      fontVariantNumeric: "lining-nums tabular-nums",
    },
    body: {
      WebkitFontSmoothing: "auto",
    } as any,
    // Remove scrollbar track styling but keep thumb visible
    "*::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "*::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, .5)",
      borderRadius: "5px",
      border: "2px solid transparent",
      backgroundClip: "padding-box",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0, 0, 0, .6)",
      backgroundClip: "padding-box",
    },
    // Add top border to scrollbar track for tables only
    ".data-table-scroll-container::-webkit-scrollbar-track": {
      background: "transparent",
      borderLeft: "1px solid",
      borderTop: "1px solid",
      borderColor: "gray.200",
    },
    // React-PDF styling to match provided HTML/CSS example
    ".react-pdf__Document": {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    ".react-pdf__Page": {
      backgroundColor: "white",
      position: "relative",
      minWidth: "min-content",
      minHeight: "min-content",
      marginBottom: "0.5rem",
      border: "1px solid",
      borderColor: "border.muted",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)",
      transition:
        "transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out",
    },
    ".react-pdf__Page__canvas": {
      display: "block",
      userSelect: "none",
    },
    ".react-pdf__Page__textContent": {
      userSelect: "text",
    },
    ".react-pdf__Page__textContent.selecting": {
      cursor: "text",
    },
    ".react-pdf__Page__annotations": {
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
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
