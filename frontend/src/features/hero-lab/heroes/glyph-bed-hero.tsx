import { DESCRIPTION, HEADLINE } from "@/features/hero-lab/hero-shared";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import React from "react";

/** Every distinct letter in a piece of copy, case kept, sorted. */
const lettersOf = (text: string) =>
  [...new Set(text.replace(/[^A-Za-z]/g, ""))].sort().join("");

/** Code-ish symbols and punctuation mixed in with the letters. */
const SYMBOLS = "/\\<>%+=*#:;.,-_()[]{}!?&@|";

/** The glyph bed's characters: the copy's letters plus SYMBOLS. */
export const heroCharset = (description = DESCRIPTION) =>
  lettersOf(HEADLINE + description) + SYMBOLS;

/**
 * 09 — Glyph bed. Glyph's characters, settling into Sediment's bed instead
 * of the plane. Lines sit 11px apart, not 4px, so the 9px glyphs stay
 * legible, and fill the hero from about 151px under the copy down to its
 * bottom edge, resting on the first content section, each as dense as one
 * of the original 12. Characters come from the letters used in the hero
 * copy plus a set of symbols and punctuation. For 1.5s glyphs just wander,
 * each on its own path through the noise so they never gather into
 * streamlines; then the pull toward the bed begins, and the opening float
 * after that is half as long as in the other layer heroes. Once formed,
 * each glyph keeps fading out and back in as a new character.
 *
 * Also the live /v3 hero, which passes its own description.
 */
export const GlyphBedHero: React.FC<{
  description?: string;
  underNav?: boolean;
}> = ({ description = DESCRIPTION, underNav }) => {
  const charset = React.useMemo(() => heroCharset(description), [description]);
  return (
    <LayerHero
      glyphs
      charset={charset}
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
      twinkle
    />
  );
};
