import { INK } from "@/components/site/canvas/ink";
import { rand } from "@/components/site/canvas/canvas-utils";
import { mix } from "color2k";

/**
 * The live /v3 hero's dots — their palette and their pulse — shared with the
 * surfaces that echo them: the outro's automaton and the /solutions figure.
 */

/** The light greys: a cool, silvery ramp. */
export const HERO_GREYS = ["#D3D9E3", "#C3CCD7", "#ACB6C5"];
/** 40% of all dots in a solid pale grey-blue, lighter than #D3D9E3. */
export const HERO_PALE = { color: "#E7EDF5", share: 0.4 };
/** The light blues: just the brighter two, #94AED6 in place of Sky. */
export const HERO_BLUES = ["#94AED6", INK.rengo300];
/** The accent: #ABC8F7 greyed down a touch, on a quarter of the dots. */
export const HERO_ACCENT = { color: "#B9CCE9", share: 0.25 };
/** 10% of dots in the hero description's dark navy (slate.100). */
export const HERO_HIGHLIGHT = { color: "#425366", share: 0.1 };

/**
 * Every dot figure's dot size, px, at every screen width: the size the app's
 * spaces empty state (rengo `space-landing-art.tsx`) draws its marks at full
 * width, 4/14 of its 6.4px spacing. Keep the two in step.
 */
export const SITE_DOT = 1.8;
/**
 * The figures' spacing was designed around 4px dots; this shrinks it by the
 * same ratio the dots shrank, so dots sit as densely as the app's do.
 */
export const SITE_SPACING = SITE_DOT / 4;
/** The hero's dot diameter, px, and how much wider a swell takes it (40%). */
export const HERO_DOT = SITE_DOT;
export const HERO_DOT_GROW = SITE_DOT * 0.4;

/**
 * How big the site's dot figures lay out on a canvas `w` px wide, as a share
 * of full size: full from 1440px, shrinking in proportion below that, to no
 * less than half. It scales spacing and shape only; the dots themselves stay
 * SITE_DOT, so they match from section to section at any width.
 */
const DOT_DESIGN_W = 1440;
const DOT_MIN_SCALE = 0.5;
export const dotScale = (w: number) =>
  Math.min(Math.max(w / DOT_DESIGN_W, DOT_MIN_SCALE), 1);

/**
 * A dot figure's dot diameter, px, at figure scale `k` (dotScale): SITE_DOT
 * up to the scale where the figures read best, about 860px wide, then
 * growing with the spacing so they don't thin out on large screens, to at
 * most SITE_DOT_MAX. The cap is set by the hero, whose lines sit only 1.8px
 * apart at full size: bigger dots would merge them into a solid band.
 */
const DOT_GROWS_FROM = 0.6;
export const SITE_DOT_MAX = 2.4;
export const siteDotAt = (k: number) =>
  Math.min(SITE_DOT * Math.max(1, k / DOT_GROWS_FROM), SITE_DOT_MAX);

const pick = <T>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];

/**
 * One colour, drawn the way the hero draws its dots': the accent's share,
 * then the highlight's, then the pale share, then half greys and half blues,
 * each a random mix of two shades of its family.
 */
export const heroDotColor = () => {
  const u = Math.random();
  if (u < HERO_ACCENT.share) return HERO_ACCENT.color;
  if (u < HERO_ACCENT.share + HERO_HIGHLIGHT.share) return HERO_HIGHLIGHT.color;
  if (u < HERO_ACCENT.share + HERO_HIGHLIGHT.share + HERO_PALE.share)
    return HERO_PALE.color;
  const family = Math.random() < 0.5 ? HERO_GREYS : HERO_BLUES;
  return mix(pick(family), pick(family), Math.random());
};

/**
 * The pulse: now and then each dot swells by PULSE_GROW px across, half its
 * size, as the app's marks do (unless
 * given its own amount) and eases back, over PULSE_DUR seconds, resting
 * PULSE_REST seconds between.
 */
const PULSE_GROW = SITE_DOT / 2;
const PULSE_DUR = 0.8;
const PULSE_REST = [1, 6] as const;

/** When a dot's first swell starts, seconds from the start. */
export const firstPulseAt = () => Math.random() * PULSE_REST[1];

/**
 * px a dot's radius grows at time `t` (seconds) from its pulse — a half
 * sine, so it swells and settles smoothly, `grow` px wider at its peak.
 * Once a swell ends, schedules the dot's next one.
 */
export const pulseGrowth = (
  dot: { pulseAt: number },
  t: number,
  grow = PULSE_GROW,
) => {
  if (t < dot.pulseAt) return 0;
  const k = (t - dot.pulseAt) / PULSE_DUR;
  if (k >= 1) {
    dot.pulseAt = t + rand(PULSE_REST[0], PULSE_REST[1]);
    return 0;
  }
  return (grow / 2) * Math.sin(k * Math.PI);
};
