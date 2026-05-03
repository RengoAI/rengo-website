import { defineTokens } from "@chakra-ui/react";

export const fonts = defineTokens.fonts({
  heading: {
    value: `"Source Serif 4", Georgia, "Times New Roman", ui-serif, serif`,
  },
  body: {
    value: `"Inter Tight", Inter, ui-sans-serif, -apple-system, system-ui, sans-serif`,
  },
  mono: {
    value: `"JetBrains Mono", SFMono-Regular, Menlo, Monaco, ui-monospace, monospace`,
  },
});
