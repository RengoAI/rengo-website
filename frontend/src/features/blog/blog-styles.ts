import { BAND_WASH } from "@/components/site/site-wash";

/**
 * The blog's colour: the header band from the site's wash (site-wash.ts);
 * the figures in the Business Overview's own colours (`site.figure.*`).
 */

/** The header band. */
export const HEADER_WASH = BAND_WASH;

/** The figures' well: the Business Overview's flat panel grey, with no
 * wash, so the chart reads as it does there. */
export const FIGURE_WELL = { bg: "site.figure.panel" } as const;
