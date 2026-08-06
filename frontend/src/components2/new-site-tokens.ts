/**
 * Shared design tokens and layout constants for the new site.
 * Import from here instead of re-declaring in each component file.
 */
import type { ComponentType } from "react";
import { Heading, type HeadingProps } from "@chakra-ui/react";

// ─── Heading recipe variant type + typed alias ────────────────────────────────
export type V2HeadingVariant =
  | "h1Regular" | "h1Light"
  | "h2Regular" | "h2Light"
  | "h3Regular" | "h3Light"
  | "h5Regular" | "h5Light";

/**
 * Chakra's Heading cast to accept the v2 recipe `variant` prop.
 * Needed because HeadingProps doesn't include custom recipe names
 * without running `chakra typegen` against theme2/system.ts.
 */
export const V2Heading = Heading as ComponentType<
  HeadingProps & { variant?: V2HeadingVariant }
>;

// ─── Color token shorthands ───────────────────────────────────────────────────
export const C = {
  grey10:    "var(--v2-colors-grey10)",
  grey20:    "var(--v2-colors-grey20)",
  grey30:    "var(--v2-colors-grey30)",
  grey40:    "var(--v2-colors-grey40)",
  grey50:    "var(--v2-colors-grey50)",
  grey60:    "var(--v2-colors-grey60)",
  concrete:  "var(--v2-colors-concrete)",
  concrete2: "var(--v2-colors-concrete2)",
  indigo1:   "var(--v2-colors-indigo1)",
  indigo2:   "var(--v2-colors-indigo2)",
  indigo4:   "var(--v2-colors-indigo4)",
} as const;

// ─── Font token shorthands ────────────────────────────────────────────────────
export const F = {
  serif: "var(--v2-fonts-serif)",
  sans:  "var(--v2-fonts-sans)",
} as const;

// ─── Noto Serif variable-font axes ───────────────────────────────────────────
export const serifAxes = { fontVariationSettings: '"CTGR" 0, "wdth" 100' } as const;

// ─── Layout constants ─────────────────────────────────────────────────────────
/** Horizontal padding shared by nav and every section — keeps all content edges aligned. */
export const sectionPx = { base: "20px", md: "40px", lg: "100px" };

/** Vertical padding used by most content sections. */
export const sectionPy = { base: "120px", md: "140px", lg: "160px" };

/**
 * Max width of the inner content column.
 * Below this: sectionPx gutters apply. Above this: equal auto-margins grow on both sides.
 */
export const PAGE_MAX_W = "1440px";
