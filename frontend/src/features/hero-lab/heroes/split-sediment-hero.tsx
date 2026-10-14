import {
  HERO_BLUES,
  HERO_DOT,
  HERO_GREYS,
  HERO_PALE,
} from "@/components/site/canvas/hero-dots";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import {
  TITLE_SIZE,
  WAVE_AMP_RANGE,
} from "@/features/hero-lab/heroes/quick-sediment-hero";
import React from "react";

/*
 * Lab variant 12: v11's dot bed with the copy split across the hero, after
 * the Figma frame "Frame 162606" (node 559:224). The title sits top left
 * in Geist at 36px; the description and a "Book a call" button sit right-aligned
 * opposite it, inside a centred 1100px measure. The bed forms 144px under
 * the copy and runs the full width.
 */

/** The description as set in the frame. */
const DESCRIPTION =
  "We’re the embedded partner that builds the data layer for AI systems to learn and act from your firm’s knowledge.";

export const SplitSedimentHero: React.FC = () => (
  <LayerHero
    split
    titleSize={TITLE_SIZE}
    description={DESCRIPTION}
    ctaLabel="Book a call"
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
    lift={138}
    shorten={60}
    accentShare={0.25}
    pale={HERO_PALE}
    dotSize={HERO_DOT}
    pulse
    greys={HERO_GREYS}
    blues={HERO_BLUES}
    flow={false}
    glow={false}
  />
);
