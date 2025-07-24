import { defineTokens } from "@chakra-ui/react";

const fallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const fonts = defineTokens.fonts({
  heading: {
    value: `Inter, sans-serif, ${fallback}`,
  },
  body: {
    value: `Inter, sans-serif, ${fallback}`,
  },
  mono: {
    value: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
});
