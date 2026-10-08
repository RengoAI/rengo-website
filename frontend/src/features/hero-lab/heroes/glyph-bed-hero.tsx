import { DESCRIPTION, HEADLINE } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import React from "react";

/** Every distinct letter in a piece of copy, case kept, sorted. */
const lettersOf = (text: string) =>
  [...new Set(text.replace(/[^A-Za-z]/g, ""))].sort().join("");

/**
 * 09 — Glyph bed. Glyph's characters, settling into Sediment's bed instead
 * of the plane. Lines sit 11px apart, not 4px, so the 9px glyphs stay
 * legible, and there are 12 of them rather than 20 to keep the deeper bed
 * inside the hero. Characters come only from the letters used in the hero
 * copy, and the opening float in the flow field is half as long as in the
 * other layer heroes.
 *
 * Also the live /v3 hero, which passes its own description.
 */
export const GlyphBedHero: React.FC<{ description?: string }> = ({
  description = DESCRIPTION,
}) => {
  const charset = React.useMemo(
    () => lettersOf(HEADLINE + description),
    [description],
  );
  return (
    <LayerHero
      glyphs
      charset={charset}
      description={description}
      lines={12}
      lineGap={11}
      dots={1800}
      layerGap={56}
      drift={0.5}
    />
  );
};
