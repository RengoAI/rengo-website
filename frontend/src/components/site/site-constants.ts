/** Height of the site nav bar, px. Heroes that run up behind it add it back. */
export const NAV_H = 52;

/**
 * Minimum height of the landing's statement-style bands (the problem line
 * and the closing call): most of the screen left under the nav, not all of
 * it, so they read as a beat rather than a stop.
 */
export const FEATURE_BAND_MIN_H = `calc((100svh - ${NAV_H}px) * 0.7)`;

/** Where every "Book a call" CTA leads. */
export const CONTACT_HREF = "mailto:sales@rengoai.com";
