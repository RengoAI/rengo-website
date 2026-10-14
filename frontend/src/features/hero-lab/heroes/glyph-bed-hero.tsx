import { DESCRIPTION } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import React from "react";

/**
 * Formerly the live /v3 hero. Same bed as the glyph version — lines 11px apart,
 * filling from about 151px under the copy down to the hero's bottom edge —
 * drawn as dots rather than characters, each one settling onto a dot of
 * the outro's sheet. Marks start high and only fall straight down: about
 * half as a short vertical streak, like the outro's lines, and the rest
 * as dots.
 */
export const GlyphBedHero: React.FC<{
  description?: string;
  underNav?: boolean;
}> = ({ description = DESCRIPTION, underNav }) => (
  <LayerHero
    description={description}
    underNav={underNav}
    lift={80}
    lines={12} // sets each line's density; toBottom sets the count
    lineGap={11}
    dots={1800}
    layerGap={151}
    toBottom
    hold={1.5}
    wander
    drift={0.5}
    mesh
    copyAlign="start"
    titleStyle="h1"
  />
);
