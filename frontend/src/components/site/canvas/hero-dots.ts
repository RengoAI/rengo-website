import { INK } from "@/components/site/canvas/ink";
import { rand } from "@/components/site/canvas/canvas-utils";
import { mix } from "color2k";

/**
 * The live /v3 hero's dots — their palette and their pulse — shared with the
 * surfaces that echo them: the outro's automaton and the /solutions figure.
 */

/*
 * The palette is the Business Overview's ramp (proposal.css), so the dots
 * sit with the page's steel and navy rather than the brighter periwinkle
 * they had: its haze, rule and line for the greys, its steel and
 * slate-light for the blues, tint-2 for the pale, navy for the highlight.
 * The crimson flecks stay: the site's tertiary colour, mixed in.
 */

/** The light greys: the Overview's haze, rule and line. */
export const HERO_GREYS = [INK.ovHaze, INK.ovRule, INK.ovLine];
/** 40% of all dots in a solid pale: the Overview's tint-2. */
export const HERO_PALE = { color: INK.ovTint2, share: 0.4 };
/** The blues: the Overview's steel and slate-light. */
export const HERO_BLUES = [INK.ovSteel, INK.ovSteelLight];
/** The accent, on a quarter of the dots: between haze and slate-light. */
export const HERO_ACCENT = { color: "#A9C0D0", share: 0.25 };
/** 10% of dots in the Overview's navy. */
export const HERO_HIGHLIGHT = { color: INK.ovNavy, share: 0.1 };
/**
 * The few flecks that set the field off (8% of the dots where a figure
 * uses them): the site's crimson, its tertiary colour.
 */
export const DOT_FLECK = INK.crimson;

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
