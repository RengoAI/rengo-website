/**
 * Style fragments the rebrand pages repeat, spread onto Chakra elements.
 */

/**
 * A colour token as its CSS variable, for values Chakra doesn't resolve
 * tokens inside of: gradients, and outline or border shorthands.
 */
export const colorVar = (token: string) =>
  // Chakra kebab-cases camelCase segments: dashedOnTint → dashed-on-tint.
  `var(--rengo-colors-${token
    .replace(/\./g, "-")
    .replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)})`;

/** The text links' hover: a quick fade. */
export const hoverFade = {
  transition: "opacity 150ms ease",
  _hover: { opacity: 0.6 },
} as const;

/**
 * The light bands' ground grain (hero, footer): a duotone of fine speckles,
 * a light grey and white, each on about half the pixels of a stitched 200px
 * tile and laid on faintly, so the ground reads as paper rather than flat
 * colour. Two noise seeds, so the tones don't share pixels. Lay it at
 * `bgSize="200px 200px"`.
 */
export const GRAIN_TILE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">` +
    `<filter id="a"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" stitchTiles="stitch"/>` +
    `<feColorMatrix values="0 0 0 0 0.8255 0 0 0 0 0.8255 0 0 0 0 0.8333 20 0 0 0 -10"/></filter>` +
    `<filter id="b"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" stitchTiles="stitch"/>` +
    `<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 20 0 0 0 -10"/></filter>` +
    `<rect width="100%" height="100%" filter="url(#a)" opacity="0.45"/>` +
    `<rect width="100%" height="100%" filter="url(#b)" opacity="0.6"/></svg>`,
)}")`;

/** The primary CTAs' soft lift, in the nav shadow's navy. */
export const CTA_SHADOW =
  "0 1px 2px rgba(12, 29, 52, 0.10), 0 6px 16px rgba(12, 29, 52, 0.10)";

/** A 1px dotted rule along the top edge, in the site's dashed-rule colour. */
export const dottedTop = (color = "site.border.dashed") =>
  ({
    borderTopWidth: "1px",
    borderTopStyle: "dotted",
    borderTopColor: color,
  }) as const;

/** As `dottedTop`, along the bottom edge. */
export const dottedBottom = (color = "site.border.dashed") =>
  ({
    borderBottomWidth: "1px",
    borderBottomStyle: "dotted",
    borderBottomColor: color,
  }) as const;

/** As `dottedTop`, along the left edge. */
export const dottedLeft = (color = "site.border.dashed") =>
  ({
    borderLeftWidth: "1px",
    borderLeftStyle: "dotted",
    borderLeftColor: color,
  }) as const;

/*
 * CSS `dotted` borders don't let you set the gap, so the tiled rules below
 * are drawn as a strip of repeating 2px tiles instead: one 1px dot, then 1px
 * of nothing.
 */

/**
 * A tiled rule down the left edge, in `token`. Makes the element the
 * rule's containing block.
 */
export const tiledRuleLeft = (token: string) => ({
  position: "relative" as const,
  _before: {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "1px",
    bgImage: `linear-gradient(to bottom, ${colorVar(token)} 1px, transparent 1px)`,
    bgSize: "1px 2px",
    bgRepeat: "repeat-y",
    pointerEvents: "none",
  },
});

/**
 * A tiled rule along the top or bottom edge, in the dashed-rule colour.
 * The element must be positioned. Drawn in `::after`.
 */
export const tiledRuleX = (edge: "top" | "bottom") =>
  ({
    _after: {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      top: edge === "top" ? 0 : undefined,
      bottom: edge === "bottom" ? 0 : undefined,
      height: "1px",
      bgImage: `linear-gradient(to right, ${colorVar("site.border.dashed")} 1px, transparent 1px)`,
      bgSize: "2px 1px",
      bgRepeat: "repeat-x",
      pointerEvents: "none",
    },
  }) as const;
