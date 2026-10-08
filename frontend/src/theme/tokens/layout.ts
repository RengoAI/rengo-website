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

/** Global top/bottom padding for a content section, at desktop widths. */
export const SECTION_GUTTER_Y = "100px";

/**
 * The section insets step down with the viewport: mobile, then tablet (`md`,
 * 768px), then desktop (`lg`, 1024px). They are spacing tokens, which can't be
 * responsive themselves, so each token points at a CSS variable that this
 * redefines at the breakpoints. Spread into the system's global CSS.
 */
export const layoutVars = {
  ":root": {
    "--site-gutter": "16px",
    "--site-gutter-y": "64px",
    "--site-gutter-y-tight": "56px",
    "--site-gutter-y-compact": "40px",
    "@media screen and (min-width: 768px)": {
      "--site-gutter": "32px",
      "--site-gutter-y": "80px",
      "--site-gutter-y-tight": "64px",
      "--site-gutter-y-compact": "48px",
    },
    "@media screen and (min-width: 1024px)": {
      "--site-gutter": SECTION_GUTTER,
      "--site-gutter-y": SECTION_GUTTER_Y,
      "--site-gutter-y-tight": "80px",
      "--site-gutter-y-compact": "60px",
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
