import { GRAIN_TILE } from "@/components/site/site-styles";

/**
 * The site's colour wash: soft, grainy fields of its sky blue with a faint
 * blush of its crimson, over mist. Blurred rather than drawn, so it reads as
 * light on paper. The company pages (blog, careers) use it; the product
 * pages keep the dot and automaton graphics.
 */

export const WASH_SKY = "176, 199, 235"; // colors.sky, #B0C7EB
export const WASH_MIST = "225, 233, 239"; // the testimonial cards' mist
export const WASH_BLUSH = "170, 72, 103"; // colors.crimson, #AA4867

/** The site's grain over the colour, laid at its tile size. */
const grain = {
  bgSize: "200px 200px, auto, auto, auto",
  bgRepeat: "repeat, no-repeat, no-repeat, no-repeat",
} as const;

/**
 * A short band (a blog post's header): blue pooling in from the top right,
 * a blush low on the left, mist between.
 */
export const BAND_WASH = {
  bg: `rgb(${WASH_MIST})`,
  bgImage: [
    GRAIN_TILE,
    `radial-gradient(ellipse 60% 110% at 90% 0%, rgba(${WASH_SKY}, 0.95) 0%, transparent 70%)`,
    `radial-gradient(ellipse 45% 90% at 5% 100%, rgba(${WASH_BLUSH}, 0.16) 0%, transparent 70%)`,
    `radial-gradient(ellipse 50% 70% at 35% 30%, rgba(255, 255, 255, 0.55) 0%, transparent 75%)`,
  ].join(", "),
  ...grain,
} as const;

/**
 * The same light over a full screen (the careers hero): the fields drawn
 * larger for the taller box, with a soft white glow at the centre behind
 * the heading.
 */
export const SCREEN_WASH = {
  bg: `rgb(${WASH_MIST})`,
  bgImage: [
    GRAIN_TILE,
    `radial-gradient(ellipse 70% 75% at 88% 8%, rgba(${WASH_SKY}, 0.95) 0%, transparent 70%)`,
    `radial-gradient(ellipse 55% 60% at 6% 96%, rgba(${WASH_BLUSH}, 0.17) 0%, transparent 70%)`,
    `radial-gradient(ellipse 45% 40% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 75%)`,
  ].join(", "),
  ...grain,
} as const;
