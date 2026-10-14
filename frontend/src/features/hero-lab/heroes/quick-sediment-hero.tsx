import { DESCRIPTION, INK } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import { mix } from "color2k";
import React from "react";

/** The light greys: a cool, silvery ramp. */
const GREYS = ["#D3D9E3", "#C3CCD7", "#ACB6C5"];
/** 40% of all dots in a solid pale grey-blue, lighter than #D3D9E3. */
const PALE = { color: "#E7EDF5", share: 0.4 };
/** The light blues: just the brighter two, #94AED6 in place of Sky. */
const BLUES = ["#94AED6", INK.rengo300];
/** Share of dots in the accent blue. */
const ACCENT_SHARE = 0.25;
/** The accent: #ABC8F7 greyed down a touch. */
const ACCENT_COLOR = "#B9CCE9";
/** 10% of dots in the hero description's dark navy (slate.100). */
const HIGHLIGHT = { color: "#425366", share: 0.1 };

/**
 * The hero's dot palette, for other surfaces that echo it (the footer):
 * the accent's share, then the highlight blue's, then the pale share, then
 * half greys and half blues,
 * each a random mix of two shades of its family.
 */
export const HERO_DOT_PALETTE = {
  accent: { color: ACCENT_COLOR, share: ACCENT_SHARE },
  highlight: HIGHLIGHT,
  pale: PALE,
  greys: GREYS,
  blues: BLUES,
} as const;

const pick = <T,>(xs: readonly T[]) =>
  xs[Math.floor(Math.random() * xs.length)];

/** One colour, drawn the way the hero draws its dots'. */
export const heroDotColor = () => {
  const { accent, highlight, pale, greys, blues } = HERO_DOT_PALETTE;
  const u = Math.random();
  if (u < accent.share) return accent.color;
  if (u < accent.share + highlight.share) return highlight.color;
  if (u < accent.share + highlight.share + pale.share) return pale.color;
  const family = Math.random() < 0.5 ? greys : blues;
  return mix(pick(family), pick(family), Math.random());
};

/** Each line's wave height, as a share of 24px: 12–24px. */
const WAVE_AMP_RANGE: [number, number] = [0.5, 1];

/** The title in Geist, held at the size it had in Serrif's d3. */
const TITLE_SIZE = { base: "32px", md: "36px" };

/**
 * The live /v3 hero (lab variant 10), in v12's split layout: the title on
 * the left in Geist at 36px, broken before "intelligent"; the description
 * and a "Book a call" button right-aligned opposite it, in a centred 1100px
 * measure. The copy sits 138px above centre and the bed forms 144px under
 * it.
 *
 * The bed: 3,000 dots, 3.4px across, start scattered across a 400px band
 * 190px below the middle and hold still until pulled in (no flow field,
 * start delays spread over about a second). Twenty lines 4px apart, each
 * rolling in its own wave, 12–24px high, with three lines at 3×. Every 1–6s
 * each dot swells 2px and eases back. A quarter are a greyed light blue
 * (#B9CCE9), 10% the description's dark navy (#425366), 40% a solid pale
 * grey (#E7EDF5), the rest half light greys and half the brighter light
 * blues. No background glow.
 */
export const QuickSedimentHero: React.FC<{
  description?: string;
  underNav?: boolean;
}> = ({ description = DESCRIPTION, underNav }) => (
  <LayerHero
    // v12's layout: title left, description and CTA right-aligned opposite.
    split
    ctaLabel="Book a call"
    description={description}
    underNav={underNav}
    lines={20}
    lineGap={4}
    dots={3000}
    layerGap={144}
    shift
    drift={0.2}
    floatBand={400}
    floatOffset={190}
    wave
    waveAmp={24}
    waveAmpRange={WAVE_AMP_RANGE}
    waveBigLines={3}
    waveBigScale={3}
    lift={138}
    shorten={60}
    accentShare={ACCENT_SHARE}
    accentColor={ACCENT_COLOR}
    pale={PALE}
    highlight={HIGHLIGHT}
    dotSize={3.4}
    pulse
    greys={GREYS}
    blues={BLUES}
    flow={false}
    glow={false}
    titleSize={TITLE_SIZE}
    descriptionColor="site.fg"
  />
);
