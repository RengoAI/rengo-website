import { defineTokens } from "@chakra-ui/react";

export const colors = defineTokens.colors({
  // ─── Neutrals ────────────────────────────────────────────────────────────
  // Use grey10 for all page backgrounds
  grey10: { value: "#F5F5F6" },
  // Use grey20 for divider lines
  grey20: { value: "#EAEDEE" },
  grey30: { value: "#D3DDE1" },
  grey40: { value: "#A9B7C6" },
  grey50: { value: "#768CA6" },
  // Use grey60 for secondary text, foreground elements, icons
  grey60: { value: "#425366" },

  // ─── Surface tokens ──────────────────────────────────────────────────────
  // Use for cards or container backgrounds (lighter)
  concrete: { value: "#EAEDEE" },
  // Use for cards or container backgrounds (slightly darker)
  concrete2: { value: "#D3DDE1" },

  // ─── Brand / Indigo ──────────────────────────────────────────────────────
  // Use for primary text
  indigo1: { value: "#213044" },
  // Use for CTAs and primary actions
  indigo2: { value: "#124476" },
  // Use for accents
  indigo4: { value: "#0071E3" },

  // ─── Accents ─────────────────────────────────────────────────────────────
  // Use for accents
  violet1: { value: "#698AF5" },
});
