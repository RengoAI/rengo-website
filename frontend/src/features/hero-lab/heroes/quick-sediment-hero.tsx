import { DESCRIPTION, INK } from "@/features/hero-lab/hero-shared";
import {
  ACCENT_BLUE_HEX,
  LayerHero,
} from "@/features/hero-lab/heroes/layer-hero";
import { mix } from "color2k";
import React from "react";

/** The light greys: a cool, silvery ramp. */
const GREYS = ["#D3D9E3", "#C3CCD7", "#ACB6C5"];
/** 40% of all dots in a solid pale grey-blue, lighter than #D3D9E3. */
const PALE = { color: "#E7EDF5", share: 0.4 };
/** The light blues: just the brighter two, #94AED6 in place of Sky. */
const BLUES = ["#94AED6", INK.rengo300];
/** Share of dots in the vivid accent blue. */
const ACCENT_SHARE = 0.25;

/**
 * The hero's dot palette, for other surfaces that echo it (the footer):
 * the accent's share, then the pale share, then half greys and half blues,
 * each a random mix of two shades of its family.
 */
export const HERO_DOT_PALETTE = {
  accent: { color: ACCENT_BLUE_HEX, share: ACCENT_SHARE },
  pale: PALE,
  greys: GREYS,
  blues: BLUES,
} as const;

const pick = <T,>(xs: readonly T[]) =>
  xs[Math.floor(Math.random() * xs.length)];

/** One colour, drawn the way the hero draws its dots'. */
export const heroDotColor = () => {
  const { accent, pale, greys, blues } = HERO_DOT_PALETTE;
  const u = Math.random();
  if (u < accent.share) return accent.color;
  if (u < accent.share + pale.share) return pale.color;
  const family = Math.random() < 0.5 ? greys : blues;
  return mix(pick(family), pick(family), Math.random());
};

/** Each line's wave height, as a share of 24px: 12–24px. */
const WAVE_AMP_RANGE: [number, number] = [0.5, 1];

/** The title: h3, held at 30px on desktop rather than its 32px. */
const TITLE_SIZE = { base: "26px", md: "30px" };

/**
 * The live /v3 hero (lab variant 10). Sediment with the opening float cut
 * to about a second: start delays spread over 1s instead of 5s, and the
 * pull takes hold five times sooner. Title set in Geist (h3, 30px, Regular)
 * rather than Serrif, the description in Regular, and the CTA 28px tall,
 * the title and description side by side in one row (the description
 * left-aligned), centred on the page, with the CTA centred below. The dots
 * start scattered at random across a 400px band 190px below the middle of
 * the hero and hold still until the pull takes them (no flow field). The
 * copy sits 90px above centre in a hero 60px shorter than the others, and
 * the bed forms 152px under the CTA. Once formed, each line of the bed
 * rolls in its own wave, each line its own height between 12 and 24px, with
 * three lines, picked at random, swelling to 72px. Dots are 3.4px across,
 * 1px larger than the other dot heroes, and a quarter of them are a vivid
 * light blue (#ABC8F7). Every 1–6s each dot, on its own, swells 2px wider
 * and eases back over 0.8s. 40% are a solid pale grey (#E7EDF5); the
 * remaining 35% are half light greys (#D3D9E3, #C3CCD7, #ACB6C5) and half
 * the brighter light blues (#94AED6, Rengo 300). No background glow: the
 * dots sit on the plain surface.
 */
export const QuickSedimentHero: React.FC<{
  description?: string;
  underNav?: boolean;
}> = ({ description = DESCRIPTION, underNav }) => (
  <LayerHero
    description={description}
    underNav={underNav}
    lines={20}
    lineGap={4}
    dots={3000}
    layerGap={152}
    shift
    drift={0.2}
    floatBand={400}
    floatOffset={190}
    wave
    waveAmp={24}
    waveAmpRange={WAVE_AMP_RANGE}
    waveBigLines={3}
    waveBigScale={3}
    lift={90}
    shorten={60}
    accentShare={ACCENT_SHARE}
    pale={PALE}
    dotSize={3.4}
    pulse
    greys={GREYS}
    blues={BLUES}
    flow={false}
    glow={false}
    titleSize={TITLE_SIZE}
    descriptionWeight={400}
    descriptionGap={11}
    titleBeside
    ctaGap={44}
    ctaHeight="28px"
  />
);
