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

/** Global left/right padding for every content section, nav, and footer. */
export const SECTION_GUTTER = "40px";

/** Global top/bottom padding for a content section. */
export const SECTION_GUTTER_Y = "100px";

export const layoutSpacing = defineTokens.spacing({
  /** Global section inset — use as `px="gutter"`. */
  gutter: { value: SECTION_GUTTER },
  /** Global section top/bottom rhythm — use as `py="gutterY"`. */
  gutterY: { value: SECTION_GUTTER_Y },
  /** Tighter vertical rhythm, for bands that sit closer together. */
  gutterYTight: { value: "80px" },
  /** Tightest, for the logo strip. */
  gutterYCompact: { value: "60px" },
  /** Grid column gap — use as `gap="gridGutter"`. */
  gridGutter: { value: GRID_GUTTER },
});

export const layoutSizes = defineTokens.sizes({
  /** Full design frame width from Figma. Opt-in; sections are full-bleed. */
  frame: { value: "1424px" },
  /** Narrower centered column used by the footer. */
  content: { value: "1320px" },
});
