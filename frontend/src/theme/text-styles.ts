import { defineTextStyles } from "@chakra-ui/react";

/**
 * Typographic scale for the marketing rebrand (Figma: Rengo Marketing Site).
 *
 * Three families, three jobs:
 * - `h1`–`h5`   Geist, the structural headings. Tight negative tracking that
 *               grows with size (-0.04em → -0.06em), near-solid leading.
 * - `display.*` Serrif, the editorial voice — pull quotes, stat figures,
 *               accordion titles. Looser tracking than the Geist headings
 *               because the serif already carries the weight.
 * - `body.*`    Geist at the two sizes the design actually uses: 16 and 14.
 *
 * Tracking is expressed in `em` so it scales with any size override. The
 * values are the Figma pixel values divided by their font size, e.g. the
 * 32px heading's -1.6px becomes -0.05em.
 *
 * Note the sign flip below 14px: the small labels in the design open up to
 * +0.02em rather than tightening, which is what keeps 10–12px legible.
 */
export const textStyles = defineTextStyles({
  h1: {
    value: {
      fontFamily: "body",
      fontSize: "3.75rem", // 60px
      fontWeight: "400",
      letterSpacing: "-0.06em",
      lineHeight: "1",
    },
  },
  h2: {
    value: {
      fontFamily: "body",
      fontSize: "2.75rem", // 44px
      fontWeight: "400",
      letterSpacing: "-0.05em",
      lineHeight: "1.05",
    },
  },
  h3: {
    value: {
      fontFamily: "body",
      fontSize: "2.25rem", // 36px
      fontWeight: "400",
      letterSpacing: "-0.05em",
      lineHeight: "1",
    },
  },
  h4: {
    value: {
      fontFamily: "body",
      fontSize: "2rem", // 32px
      fontWeight: "400",
      letterSpacing: "-0.05em",
      lineHeight: "1.1",
    },
  },
  h5: {
    value: {
      fontFamily: "body",
      fontSize: "1.5rem", // 24px
      fontWeight: "400",
      letterSpacing: "-0.04em",
      lineHeight: "1.15",
    },
  },

  // Serrif — the display voice.
  display: {
    lg: {
      value: {
        fontFamily: "display",
        fontSize: "2.75rem", // 44px — stat figures
        fontWeight: "300",
        letterSpacing: "-0.04em",
        lineHeight: "1",
      },
    },
    md: {
      value: {
        fontFamily: "display",
        fontSize: "1.625rem", // 26px — accordion titles
        fontWeight: "400",
        letterSpacing: "-0.03em",
        lineHeight: "1",
      },
    },
    sm: {
      value: {
        fontFamily: "display",
        fontSize: "1.25rem", // 20px — pull quotes, compliance titles
        fontWeight: "400",
        letterSpacing: "-0.02em",
        lineHeight: "1.25",
      },
    },
  },

  body: {
    md: {
      value: {
        fontFamily: "body",
        fontSize: "1rem", // 16px
        fontWeight: "400",
        letterSpacing: "-0.04em",
        lineHeight: "1.4",
      },
    },
    sm: {
      value: {
        fontFamily: "body",
        fontSize: "0.875rem", // 14px
        fontWeight: "400",
        letterSpacing: "-0.02em",
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
      lineHeight: "1.2",
    },
  },
  /** 10px annotation, the smallest type in the design. */
  caption: {
    value: {
      fontFamily: "body",
      fontSize: "0.625rem", // 10px
      fontWeight: "300",
      letterSpacing: "0.02em",
      lineHeight: "1",
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
