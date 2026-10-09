import { defineTextStyles } from "@chakra-ui/react";

/**
 * Typographic scale for the marketing rebrand (Figma: Rengo Marketing Site).
 *
 * Two scales, two voices:
 * - `h1`–`h6`  Geist Regular — the structural headings. Tight negative
 *              tracking that grows with size (-0.04em → -0.06em), near-solid
 *              leading.
 * - `d1`–`d5`  Serrif Light — the display voice, set at the same sizes as
 *              the heading scale so the two can be swapped at a given level.
 *              Tracking runs looser than the Geist equivalent at every step:
 *              a serif already carries more visual weight, and tightening it
 *              the same amount closes the counters up.
 * - `body.*`   Geist at the two sizes the design actually uses: 16 and 14.
 *
 * Tracking is expressed in `em` so it scales with any size override. The
 * values are the Figma pixel values divided by their font size, e.g. the
 * 32px heading's -1.6px becomes -0.05em.
 *
 * The display sizes (h1–h4, d1–d3) step down on mobile, below `md`, so the
 * headlines still fit a phone in a few lines. `body.sm` steps down with them.
 *
 * Note the sign flip below 14px: the small labels in the design open up to
 * +0.02em rather than tightening, which is what keeps 10–12px legible.
 */
export const textStyles = defineTextStyles({
  // Geist — the structural headings.
  h1: {
    value: {
      fontFamily: "body",
      fontSize: { base: "2.5rem", md: "3.75rem" }, // 40px → 60px
      fontWeight: "350",
      letterSpacing: "-0.05em",
      lineHeight: "1",
    },
  },
  h2: {
    value: {
      fontFamily: "body",
      fontSize: { base: "2rem", md: "2.5rem" }, // 32px → 40px
      fontWeight: "350",
      letterSpacing: "-0.04em",
      lineHeight: "1.1",
    },
  },
  h3: {
    value: {
      fontFamily: "body",
      fontSize: { base: "1.625rem", md: "2.125rem" }, // 26px → 32px
      fontWeight: "350",
      letterSpacing: "-0.04em",
      lineHeight: "1.1",
    },
  },
  h4: {
    value: {
      fontFamily: "body",
      fontSize: { base: "1.375rem", md: "1.625rem" }, // 22px → 26px
      fontWeight: "350",
      letterSpacing: "-0.025em",
      lineHeight: "1.2",
    },
  },
  h5: {
    value: {
      fontFamily: "body",
      fontSize: { base: "1.125rem", md: "1.5rem" }, // 20px → 24px
      fontWeight: "350",
      letterSpacing: "-0.02em",
      lineHeight: "1.2",
    },
  },
  h6: {
    value: {
      fontFamily: "body",
      fontSize: "1.25rem", // 20px — accordion titles
      fontWeight: "350",
      letterSpacing: "-0.02em",
      lineHeight: "1.2",
    },
  },

  // Serrif Light — the display voice. Sizes track the heading scale, except
  // d4 and d5, which sit at the two sizes the design actually sets in Serrif.
  d1: {
    value: {
      fontFamily: "display",
      fontSize: { base: "2.5rem", md: "3.75rem" }, // 40px → 60px
      fontWeight: "300",
      letterSpacing: "-0.04em",
      lineHeight: "1",
    },
  },
  d2: {
    value: {
      fontFamily: "display",
      fontSize: { base: "2.25rem", md: "2.75rem" }, // 36px → 44px — stat figures
      fontWeight: "300",
      letterSpacing: "-0.04em",
      lineHeight: "1",
    },
  },
  d3: {
    value: {
      fontFamily: "display",
      fontSize: { base: "2rem", md: "2.5rem" }, // 32px → 36px
      fontWeight: "300",
      letterSpacing: "-0.04em",
      lineHeight: "1",
    },
  },
  d4: {
    value: {
      fontFamily: "display",
      fontSize: "1.625rem", // 26px — accordion titles
      fontWeight: "300",
      letterSpacing: "-0.03em",
      lineHeight: "1",
    },
  },
  d5: {
    value: {
      fontFamily: "display",
      fontSize: { base: "1.125rem", md: "1.25rem" }, // 20px → 24px — pull quotes, compliance titles
      fontWeight: "300",
      letterSpacing: "-0.02em",
      lineHeight: "1.25",
    },
  },

  body: {
    md: {
      value: {
        fontFamily: "body",
        fontSize: "1rem", // 16px
        fontWeight: "400",
        letterSpacing: "-0.02em",
        lineHeight: "1.4",
      },
    },
    sm: {
      value: {
        fontFamily: "body",
        fontSize: { base: "0.75rem", md: "0.875rem" }, // 12px → 14px
        fontWeight: "400",
        letterSpacing: "-0.01em",
        lineHeight: "1.4",
      },
    },
  },

  /** 12px eyebrow / category label. Positive tracking — see note above. */
  label: {
    value: {
      fontFamily: "body",
      fontSize: "0.75rem", // 12px
      fontWeight: "400",
      letterSpacing: "0.02em",
      lineHeight: "1.25",
    },
  },
  /** 10px annotation, the smallest type in the design. */
  caption: {
    value: {
      fontFamily: "body",
      fontSize: "0.625rem", // 10px
      fontWeight: "300",
      letterSpacing: "0.02em",
      lineHeight: "1.15",
    },
  },
  /** 11px Geist Mono — copyright, metadata. */
  mono: {
    value: {
      fontFamily: "mono",
      fontSize: "0.6875rem", // 11px
      fontWeight: "400",
      letterSpacing: "0",
      lineHeight: "1.5",
    },
  },
});
