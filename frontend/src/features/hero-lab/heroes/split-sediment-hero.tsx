import { INK } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
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

/** The light greys: a cool, silvery ramp. */
const GREYS = ["#D3D9E3", "#C3CCD7", "#ACB6C5"];
/** 40% of all dots in a solid pale grey-blue, lighter than #D3D9E3. */
const PALE = { color: "#E7EDF5", share: 0.4 };
/** The light blues: just the brighter two, #94AED6 in place of Sky. */
const BLUES = ["#94AED6", INK.rengo300];

/** Each line's wave height, as a share of 24px: 12–24px. */
const WAVE_AMP_RANGE: [number, number] = [0.5, 1];

/** The title in Geist, held at the size it had in Serrif's d3. */
const TITLE_SIZE = { base: "32px", md: "36px" };

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
    pale={PALE}
    dotSize={3.4}
    pulse
    greys={GREYS}
    blues={BLUES}
    flow={false}
    glow={false}
  />
);
