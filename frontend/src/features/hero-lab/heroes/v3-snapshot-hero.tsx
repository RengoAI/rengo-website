import { INK } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import React from "react";

/*
 * Lab variant 11: a copy of the live /v3 hero as of 2026-10-13
 * (QuickSedimentHero's settings, with /v3's own description), iterated on
 * separately from v10 and /v3.
 */

/** /v3's hero description. */
const DESCRIPTION =
  "Rengo is the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm’s knowledge.";

/** The light greys: a cool, silvery ramp. */
const GREYS = ["#D3D9E3", "#C3CCD7", "#ACB6C5"];
/** 40% of all dots in a solid pale grey-blue, lighter than #D3D9E3. */
const PALE = { color: "#E7EDF5", share: 0.4 };
/** The light blues: just the brighter two, #94AED6 in place of Sky. */
const BLUES = ["#94AED6", INK.rengo300];

/** Each line's wave height, as a share of 24px: 12–24px. */
const WAVE_AMP_RANGE: [number, number] = [0.5, 1];

/** The title: h3, held at 30px on desktop rather than its 32px. */
const TITLE_SIZE = { base: "26px", md: "30px" };

/** The live /v3 hero, forked. */
export const V3SnapshotHero: React.FC = () => (
  <LayerHero
    description={DESCRIPTION}
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
    lift={90}
    shorten={60}
    accentShare={0.25}
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
    ctaGap={44}
    ctaHeight="28px"
  />
);
