import { defineRecipe } from "@chakra-ui/react";

/**
 * Heading recipe for the new site design system.
 *
 * Variant naming follows the Figma spec exactly so component usage maps
 * 1-to-1: <Heading variant="h1Regular">, <Heading variant="h2Light">, etc.
 *
 * Serif stack (h1–h3): Noto Serif, variable weight
 *   - Regular: 350
 *   - Light:   300
 *   - Size:    44px / 32px / 24px
 *   - Tracking: -3px
 *   - Leading:  110%
 *
 * Sans stack (h4–h5): Geist, variable weight
 *   - Regular: 400
 *   - Light:   300
 *   - Size:    24px / 20px
 *   - Tracking: -0.8px
 *   - Leading:  120%
 */
export const headingRecipe = defineRecipe({
  className: "v2-heading",

  base: {
    margin: 0,
    padding: 0,
  },

  variants: {
    variant: {
      // ─── Noto Serif — h1 ───────────────────────────────────────────────
      h1Regular: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "44px",
        fontWeight: 350,
        letterSpacing: "-3px",
        lineHeight: "110%",
      },
      h1Light: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "44px",
        fontWeight: 200,
        letterSpacing: "-3px",
        lineHeight: "110%",
      },

      // ─── Noto Serif — h2 ───────────────────────────────────────────────
      h2Regular: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "32px",
        fontWeight: 350,
        letterSpacing: "-1px",
        lineHeight: "110%",
      },
      h2Light: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "32px",
        fontWeight: 200,
        letterSpacing: "-1px",
        lineHeight: "110%",
      },

      // ─── Noto Serif — h3 ───────────────────────────────────────────────
      h3Regular: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "24px",
        fontWeight: 350,
        letterSpacing: "-1px",
        lineHeight: "110%",
      },
      h3Light: {
        fontFamily: "var(--v2-fonts-serif)",
        fontSize: "24px",
        fontWeight: 300,
        letterSpacing: "-1px",
        lineHeight: "110%",
      },

      // ─── Geist Sans — h4 ───────────────────────────────────────────────
      h4Regular: {
        fontFamily: "var(--v2-fonts-sans)",
        fontSize: "24px",
        fontWeight: 400,
        letterSpacing: "-0.8px",
        lineHeight: "120%",
      },
      h4Light: {
        fontFamily: "var(--v2-fonts-sans)",
        fontSize: "24px",
        fontWeight: 300,
        letterSpacing: "-0.8px",
        lineHeight: "120%",
      },

      // ─── Geist Sans — h5 ───────────────────────────────────────────────
      h5Regular: {
        fontFamily: "var(--v2-fonts-sans)",
        fontSize: "20px",
        fontWeight: 400,
        letterSpacing: "-0.8px",
        lineHeight: "120%",
      },
      h5Light: {
        fontFamily: "var(--v2-fonts-sans)",
        fontSize: "20px",
        fontWeight: 300,
        letterSpacing: "-0.8px",
        lineHeight: "120%",
      },
    },
  },

  defaultVariants: {
    variant: "h2Regular",
  },
});
