import {
  HERO_BLUES,
  HERO_DOT,
  HERO_GREYS,
  HERO_PALE,
} from "@/components/site/canvas/hero-dots";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import { WAVE_AMP_RANGE } from "@/features/hero-lab/heroes/quick-sediment-hero";
import React from "react";

/*
 * Lab variant 11: a copy of the live /v3 hero as of 2026-10-13
 * (QuickSedimentHero's settings, with /v3's own description), iterated on
 * separately from v10 and /v3. Since then: the copy block stays centred on
 * the page, with its text and CTA left-aligned inside it.
 */

/** /v3's hero description. */
const DESCRIPTION =
  "Rengo is the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm’s knowledge.";

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
    copyAlign="start"
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
    pale={HERO_PALE}
    dotSize={HERO_DOT}
    pulse
    greys={HERO_GREYS}
    blues={HERO_BLUES}
    flow={false}
    glow={false}
    titleSize={TITLE_SIZE}
    descriptionWeight={400}
    descriptionGap={11}
    ctaGap={44}
    ctaHeight="28px"
  />
);
