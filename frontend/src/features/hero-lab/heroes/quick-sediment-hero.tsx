import {
  HERO_ACCENT,
  HERO_BLUES,
  HERO_DOT,
  HERO_GREYS,
  HERO_HIGHLIGHT,
  HERO_PALE,
} from "@/components/site/canvas/hero-dots";
import { DESCRIPTION } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import React from "react";

/** Each line's wave height, as a share of 24px: 12–24px. */
export const WAVE_AMP_RANGE: [number, number] = [0.5, 1];

/**
 * The hero's own pale share: the lightest grey (#E7EDF5) on 60% of the
 * dots, 20 points more than the shared palette's 40%. That leaves 5% for the
 * mixed light greys and blues, after the accent's 25% and the navy's 10%.
 */
const PALE = { ...HERO_PALE, share: 0.6 };

/** The title in Geist, held at the size it had in Serrif's d3. */
export const TITLE_SIZE = { base: "32px", md: "36px" };

/**
 * The live /v3 hero (lab variant 10), in v12's split layout: the title on
 * the left in Geist at 36px, broken before "intelligent"; the description
 * and a "Book a call" button right-aligned opposite it, on columns 2–15
 * at lg and 3–14 from xl. The copy sits 138px above centre and the bed forms 144px under
 * it.
 *
 * The bed: 2,160 square dots, 3.4px across, start scattered across a 400px
 * band 190px below the middle and hold still until pulled in (no flow field,
 * start delays spread over about a second). Sixteen lines 4px apart, 135
 * dots to a line, each rolling in its own wave, 12–24px high, with three
 * lines at 3×. Every 1–6s each dot swells 2px and eases back. The palette is
 * the hero's, from `hero-dots`. No background glow.
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
    lines={16}
    lineGap={4}
    dots={2160}
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
    accentShare={HERO_ACCENT.share}
    accentColor={HERO_ACCENT.color}
    pale={PALE}
    highlight={HERO_HIGHLIGHT}
    dotSize={HERO_DOT}
    square
    pulse
    greys={HERO_GREYS}
    blues={HERO_BLUES}
    flow={false}
    glow={false}
    titleSize={TITLE_SIZE}
    // The heading scale's own weight and tracking.
    splitTitleWeight={350}
    splitTitleTracking="-0.025em"
    // The copy on columns 2–15 at lg, 3–14 from xl.
    splitOnGrid
    // Once formed, hold the wave 10s, drift back to the start, form again.
    loopHold={10}
    descriptionColor="site.fg"
  />
);
