/** Height of the site nav bar, px. Heroes that run up behind it add it back. */
export const NAV_H = 52;

/**
 * Tallest the big sections stretch to fill the screen, px. Past this a tall
 * monitor would leave them mostly empty, so they stop there and the next
 * section shows below.
 */
export const FEATURE_BAND_CAP = 900;

/**
 * Minimum height of the landing's sections after the hero (and the careers
 * roles): the screen left under the nav, up to FEATURE_BAND_CAP. One screen
 * each on a laptop, one shared height on a tall monitor. A minimum, so a
 * section whose content needs more room still grows to fit it.
 */
export const FEATURE_BAND_MIN_H = `min(calc(100svh - ${NAV_H}px), ${FEATURE_BAND_CAP}px)`;

/** The footer's height from tablets up (one row: 20px, 44px, 20px, 1px rule). */
export const FOOTER_H = 85;

/**
 * The closing band's minimum: the shared height less the footer's from
 * tablets up, so the close and the footer fill one screen together. Phones
 * stack the footer tall, so the close keeps the shared height there.
 */
export const CLOSE_BAND_MIN_H = {
  base: FEATURE_BAND_MIN_H,
  md: `calc(${FEATURE_BAND_MIN_H} - ${FOOTER_H}px)`,
};

/** Where every "Book a call" CTA leads. */
export const CONTACT_HREF = "mailto:sales@rengoai.com";
