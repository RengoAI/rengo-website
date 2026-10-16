import { defineTokens } from "@chakra-ui/react";

export const fonts = defineTokens.fonts({
  // Editorial display face for the rebrand — pull quotes, stat figures,
  // accordion titles. Self-hosted from /public/fonts (Light 300, Regular 400).
  display: {
    value: `Serrif, "Noto Serif", "Source Serif 4", Georgia, ui-serif, serif`,
  },
  heading: {
    value: `"Noto Serif", "Source Serif 4", Georgia, "Times New Roman", ui-serif, serif`,
  },
  body: {
    value: `Geist, "Inter Tight", Inter, ui-sans-serif, -apple-system, system-ui, sans-serif`,
  },
  mono: {
    value: `"Geist Mono", "Space Mono", SFMono-Regular, Menlo, Monaco, ui-monospace, monospace`,
  },
  // Numeric / label mono used for case-study indices
  numeric: {
    value: `"Chivo Mono", "Geist Mono", SFMono-Regular, ui-monospace, monospace`,
  },
});
