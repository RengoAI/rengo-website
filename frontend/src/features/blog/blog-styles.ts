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

/** The figures' well: mist, with blue gathering under the graphic. No
 * grain, so the chart stays crisp. */
export const FIGURE_WASH = {
  bg: `rgb(${MIST})`,
  bgImage: [
    `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(${SKY}, 0.55) 0%, transparent 75%)`,
    `radial-gradient(ellipse 50% 50% at 0% 0%, rgba(255, 255, 255, 0.6) 0%, transparent 70%)`,
    `radial-gradient(ellipse 40% 40% at 100% 10%, rgba(${BLUSH}, 0.06) 0%, transparent 70%)`,
  ].join(", "),
} as const;

/** Fills for the flowcharts' marks, from the same palette. */
export const FIGURE_TINTS = {
  sky: `rgb(${SKY})`,
  mist: `rgb(${MIST})`,
  blush: `rgba(${BLUSH}, 0.18)`,
} as const;
