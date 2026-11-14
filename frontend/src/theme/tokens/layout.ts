import { defineTokens } from "@chakra-ui/react";

/**
 * Layout constants for the rebrand grid system.
 *
 * Exported as plain values as well as tokens because the grid column count is
 * needed in `repeat()` template strings, which Chakra does not resolve tokens
 * inside of.
 */

/** Columns in the site grid. Every on-grid element spans a subset of these. */
export const GRID_COLUMNS = 16;

/** Gap between grid columns. */
export const GRID_GUTTER = "16px";

/**
 * Global left/right padding for every content section, nav, and footer, at
 * desktop widths. Narrower screens step it down — see `layoutVars`.
 */
export const SECTION_GUTTER = "40px";

/**
 * The viewport width past which content stops growing. Wider screens get a
 * wider gutter instead, so lines and diagrams don't stretch across a large
 * monitor.
 */
export const SITE_CONTENT_CAP_AT = "1440px";

/** Global top/bottom padding for a content section, at desktop widths. */
export const SECTION_GUTTER_Y = "120px";

/**
 * The section insets step down with the viewport: mobile, then tablet (`md`,
 * 768px), then desktop (`lg`, 1024px). They are spacing tokens, which can't be
 * responsive themselves, so each token points at a CSS variable that this
 * redefines at the breakpoints. Spread into the system's global CSS.
 */
export const layoutVars = {
  ":root": {
    "--site-gutter": "16px",
    "--site-gutter-y": "84px",
    "--site-gutter-y-tight": "76px",
    "--site-gutter-y-compact": "60px",
    "@media screen and (min-width: 768px)": {
      "--site-gutter": "32px",
      "--site-gutter-y": "100px",
      "--site-gutter-y-tight": "84px",
      "--site-gutter-y-compact": "68px",
    },
    "@media screen and (min-width: 1024px)": {
      "--site-gutter": SECTION_GUTTER,
      "--site-gutter-y": SECTION_GUTTER_Y,
      "--site-gutter-y-tight": "100px",
      "--site-gutter-y-compact": "80px",
    },
    // Past 1440px the gutter grows instead of the content, so the content
    // holds at its 1440px width and centres; backgrounds still run edge to
    // edge. It meets the 40px gutter at 1440px, so there's no jump.
    [`@media screen and (min-width: ${SITE_CONTENT_CAP_AT})`]: {
      "--site-gutter": `calc((100vw - ${SITE_CONTENT_CAP_AT}) / 2 + ${SECTION_GUTTER})`,
    },
  },
};

export const layoutSpacing = defineTokens.spacing({
  /** Global section inset — use as `px="gutter"`. */
  gutter: { value: "var(--site-gutter)" },
  /** Global section top/bottom rhythm — use as `py="gutterY"`. */
  gutterY: { value: "var(--site-gutter-y)" },
  /** Tighter vertical rhythm, for bands that sit closer together. */
  gutterYTight: { value: "var(--site-gutter-y-tight)" },
  /** Tightest, for the logo strip. */
  gutterYCompact: { value: "var(--site-gutter-y-compact)" },
  /** Grid column gap — use as `gap="gridGutter"`. */
  gridGutter: { value: GRID_GUTTER },
});

export const layoutSizes = defineTokens.sizes({
  /** Full design frame width from Figma. Opt-in; sections are full-bleed. */
  frame: { value: "1424px" },
  /** Narrower centered column used by the footer. */
  content: { value: "1320px" },
});
