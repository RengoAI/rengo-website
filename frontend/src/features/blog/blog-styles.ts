import {
  BAND_WASH,
  WASH_BLUSH as BLUSH,
  WASH_MIST as MIST,
  WASH_SKY as SKY,
} from "@/components/site/site-wash";

/**
 * The blog's colour, from the site's wash (site-wash.ts): the header band,
 * and the figures' wells and fills from the same palette.
 */

/** The header band. */
export const HEADER_WASH = BAND_WASH;

/** The figures' well: the Business Overview's flat panel grey (its
 * `--tint`), with no wash, so the chart reads as it does there. */
export const FIGURE_WELL = { bg: "#F4F6F8" } as const;

/** Fills for the flowcharts' marks, from the same palette. */
export const FIGURE_TINTS = {
  sky: `rgb(${SKY})`,
  mist: `rgb(${MIST})`,
  blush: `rgba(${BLUSH}, 0.18)`,
} as const;
