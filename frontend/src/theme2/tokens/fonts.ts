import { defineTokens } from "@chakra-ui/react";

export const fonts = defineTokens.fonts({
  // h1–h3 headings: Noto Serif (variable weight, supports 100–900)
  serif: {
    value: `"Noto Serif", Georgia, "Times New Roman", ui-serif, serif`,
  },
  // h4–h5 headings + body: Geist Sans (variable weight, supports 100–900)
  sans: {
    value: `"Geist", ui-sans-serif, -apple-system, system-ui, sans-serif`,
  },
  // Inherit as Chakra's `heading` and `body` tokens so primitives work out-of-the-box
  heading: {
    value: `"Noto Serif", Georgia, "Times New Roman", ui-serif, serif`,
  },
  body: {
    value: `"Geist", ui-sans-serif, -apple-system, system-ui, sans-serif`,
  },
});
