import { GRAIN_TILE } from "@/components/site/site-styles";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/*
 * The site's gradient graphics, after ode.com: blurred light on mist or
 * paper, under the site's grain, never drawn. One component, many named
 * variants, so the blog's tiles, the landing's strips and anything else
 * pick from the same set. /gradients shows them all.
 *
 * A variant is built from soft shapes (real elements blurred with a CSS
 * filter, for the organic edges of ode.com's blobs, beams and fog squares)
 * and/or plain gradient layers (for crisp spheres, like the blog's).
 */

// The site's colours, as RGB triples for alpha.
const SKY = "176, 199, 235"; // colors.sky
const STEEL = "143, 169, 188"; // overview.steel
const SLATE = "53, 86, 109"; // overview.slate
const BLUE = "41, 109, 219"; // site.highlight
const BLUSH = "170, 72, 103"; // colors.crimson
const WHITE = "255, 255, 255";
const MIST = "rgb(225, 233, 239)";
const PAPER = "#F8F8F8";
// The Business Overview's ramp (its proposal.css), light to dark.
const OV_TINT = "#F4F6F8";
const OV_TINT2 = "#E6EDF2";
const OV_HAZE = "201, 214, 224"; // on-dark-2 / haze, #C9D6E0
const OV_STEEL_LIGHT = "143, 176, 200"; // slate-light, #8FB0C8
const OV_SLATE = "53, 86, 109"; // #35566D
const OV_NAVY = "#253746";

type Shape = {
  /** Centre, as % of the field. */
  x: number;
  y: number;
  /** Size, as % of the field's width and height. */
  w: number;
  h: number;
  /** Colour as an RGB triple, and its alpha. */
  rgb: string;
  a: number;
  /** Blur, px. */
  blur: number;
  /** Degrees. */
  rotate?: number;
  /** Corner rounding: a blob, a soft square or a beam. */
  radius?: string;
};

type LightVariant = {
  /** What it's called on /gradients. */
  name: string;
  /** The ground under the light. */
  base: string;
  shapes?: Shape[];
  /** CSS gradient layers, top first, drawn under the shapes. */
  layers?: string[];
  /** The grain's strength, 0 to 1 (default 1). The grain is drawn for
   * light grounds; on a dark one it reads as static, so turn it down. */
  grain?: number;
  /** A dark ground, so type over it should be light. */
  dark?: boolean;
};

const BLOB = "50%";
const SQUARE = "18%";
const BEAM = "999px";

/** The blog index's spheres: a sphere of blue rising in mist. */
const sphere = (
  name: string,
  x: number,
  y: number,
  glow: string,
): LightVariant => ({
  name,
  base: MIST,
  layers: [
    `radial-gradient(circle at ${x}% ${y}%, rgba(${BLUE}, 0.6) 0%, rgba(${BLUE}, 0.28) 30%, transparent 60%)`,
    `radial-gradient(ellipse 80% 60% at ${100 - x}% 0%, rgba(${glow}, 0.18) 0%, transparent 70%)`,
    `linear-gradient(180deg, rgba(${WHITE}, 0.55) 0%, transparent 60%)`,
  ],
});

export const LIGHT_VARIANTS = {
  // Spheres: the blog index tiles.
  sphereLow: sphere("Sphere, low", 50, 82, BLUSH),
  sphereRight: sphere("Sphere, right", 72, 62, SKY),
  sphereLeft: sphere("Sphere, left", 28, 72, SKY),
  sphereLowRight: sphere("Sphere, low right", 62, 92, BLUSH),

  // Pools: the wash, pooled differently.
  poolSmall: {
    name: "Small pool",
    base: MIST,
    shapes: [
      { x: 25, y: 22, w: 70, h: 45, rgb: SKY, a: 0.9, blur: 40, radius: BLOB },
    ],
  },
  poolBeam: {
    name: "Low beam",
    base: MIST,
    shapes: [
      {
        x: 55,
        y: 42,
        w: 120,
        h: 22,
        rgb: SKY,
        a: 0.95,
        blur: 30,
        radius: BEAM,
      },
      {
        x: 10,
        y: 88,
        w: 50,
        h: 35,
        rgb: BLUSH,
        a: 0.18,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  poolBroad: {
    name: "Broad pool",
    base: MIST,
    shapes: [
      { x: 55, y: 38, w: 90, h: 60, rgb: SKY, a: 0.95, blur: 45, radius: BLOB },
      {
        x: 85,
        y: 95,
        w: 55,
        h: 35,
        rgb: BLUSH,
        a: 0.2,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  poolFull: {
    name: "Full sky",
    base: MIST,
    shapes: [
      { x: 60, y: 15, w: 140, h: 75, rgb: SKY, a: 1, blur: 50, radius: BLOB },
      {
        x: 15,
        y: 92,
        w: 60,
        h: 40,
        rgb: BLUSH,
        a: 0.22,
        blur: 40,
        radius: BLOB,
      },
    ],
  },

  // Beams: a long soft shaft of light at an angle (ode.com's hero).
  beamSky: {
    name: "Sky beam, rising",
    base: PAPER,
    shapes: [
      {
        x: 50,
        y: 55,
        w: 130,
        h: 16,
        rgb: SKY,
        a: 1,
        blur: 22,
        rotate: -24,
        radius: BEAM,
      },
    ],
  },
  beamBlush: {
    name: "Blush beam",
    base: PAPER,
    shapes: [
      {
        x: 50,
        y: 50,
        w: 130,
        h: 18,
        rgb: BLUSH,
        a: 0.28,
        blur: 24,
        rotate: -18,
        radius: BEAM,
      },
    ],
  },
  beamCrossed: {
    name: "Crossed beams",
    base: PAPER,
    shapes: [
      {
        x: 50,
        y: 45,
        w: 130,
        h: 14,
        rgb: SKY,
        a: 1,
        blur: 22,
        rotate: -28,
        radius: BEAM,
      },
      {
        x: 50,
        y: 60,
        w: 120,
        h: 12,
        rgb: BLUSH,
        a: 0.25,
        blur: 22,
        rotate: 16,
        radius: BEAM,
      },
    ],
  },
  beamSteel: {
    name: "Steel beam, low",
    base: MIST,
    shapes: [
      {
        x: 45,
        y: 72,
        w: 140,
        h: 20,
        rgb: STEEL,
        a: 0.75,
        blur: 26,
        rotate: -8,
        radius: BEAM,
      },
    ],
  },
  // The Business Overview's ramp: tint → tint-2 → slate → navy, its cycle
  // cards' progression, with steel and haze between.
  ovTint: {
    name: "Overview tint",
    base: OV_TINT,
    shapes: [
      {
        x: 55,
        y: 40,
        w: 100,
        h: 70,
        rgb: OV_HAZE,
        a: 0.75,
        blur: 45,
        radius: BLOB,
      },
    ],
  },
  ovHaze: {
    name: "Overview haze",
    base: OV_TINT2,
    shapes: [
      {
        x: 55,
        y: 38,
        w: 100,
        h: 70,
        rgb: OV_HAZE,
        a: 1,
        blur: 45,
        radius: BLOB,
      },
      {
        x: 60,
        y: 40,
        w: 50,
        h: 35,
        rgb: STEEL,
        a: 0.35,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  ovSteel: {
    name: "Overview steel",
    base: OV_TINT2,
    shapes: [
      {
        x: 55,
        y: 38,
        w: 110,
        h: 75,
        rgb: STEEL,
        a: 0.75,
        blur: 45,
        radius: BLOB,
      },
      {
        x: 60,
        y: 35,
        w: 50,
        h: 35,
        rgb: OV_SLATE,
        a: 0.18,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  ovHazeDeep: {
    name: "Overview haze, deep",
    base: OV_TINT2,
    shapes: [
      {
        x: 55,
        y: 38,
        w: 115,
        h: 80,
        rgb: OV_HAZE,
        a: 1,
        blur: 45,
        radius: BLOB,
      },
      {
        x: 58,
        y: 40,
        w: 80,
        h: 55,
        rgb: STEEL,
        a: 0.75,
        blur: 42,
        radius: BLOB,
      },
    ],
  },
  ovSteelBlue: {
    name: "Overview slate-light",
    base: OV_TINT2,
    shapes: [
      {
        x: 55,
        y: 38,
        w: 120,
        h: 80,
        rgb: OV_STEEL_LIGHT,
        a: 1,
        blur: 45,
        radius: BLOB,
      },
      {
        x: 60,
        y: 35,
        w: 55,
        h: 40,
        rgb: OV_SLATE,
        a: 0.25,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  ovSteelDeep: {
    name: "Overview steel, deep",
    base: OV_TINT2,
    shapes: [
      { x: 55, y: 38, w: 125, h: 85, rgb: STEEL, a: 1, blur: 45, radius: BLOB },
      {
        x: 60,
        y: 36,
        w: 70,
        h: 50,
        rgb: OV_SLATE,
        a: 0.5,
        blur: 42,
        radius: BLOB,
      },
    ],
  },
  ovSlate: {
    name: "Overview slate",
    base: "rgb(53, 86, 109)",
    grain: 0.1,
    dark: true,
    shapes: [
      {
        x: 60,
        y: 30,
        w: 100,
        h: 70,
        rgb: OV_STEEL_LIGHT,
        a: 0.35,
        blur: 50,
        radius: BLOB,
      },
    ],
  },
  ovNavy: {
    name: "Overview navy",
    base: OV_NAVY,
    grain: 0.08,
    dark: true,
    shapes: [
      {
        x: 60,
        y: 30,
        w: 100,
        h: 70,
        rgb: OV_SLATE,
        a: 0.9,
        blur: 50,
        radius: BLOB,
      },
      {
        x: 65,
        y: 25,
        w: 45,
        h: 35,
        rgb: OV_STEEL_LIGHT,
        a: 0.18,
        blur: 40,
        radius: BLOB,
      },
    ],
  },
  beamSteelDark: {
    name: "Steel beam on navy",
    base: "#1B2A36", // overview.navyDeep
    dark: true,
    grain: 0.08,
    shapes: [
      {
        x: 45,
        y: 74,
        w: 140,
        h: 18,
        rgb: STEEL,
        a: 0.32,
        blur: 34,
        rotate: -8,
        radius: BEAM,
      },
      {
        x: 60,
        y: 70,
        w: 90,
        h: 8,
        rgb: SKY,
        a: 0.18,
        blur: 22,
        rotate: -8,
        radius: BEAM,
      },
    ],
  },
  beamTapered: {
    name: "Tapered beam",
    base: PAPER,
    shapes: [
      {
        x: 35,
        y: 58,
        w: 70,
        h: 26,
        rgb: SKY,
        a: 0.9,
        blur: 30,
        rotate: -20,
        radius: BEAM,
      },
      {
        x: 70,
        y: 44,
        w: 70,
        h: 9,
        rgb: SKY,
        a: 1,
        blur: 14,
        rotate: -20,
        radius: BEAM,
      },
    ],
  },

  // Fog squares: a soft square fogging out to paper (ode.com's tab panel).
  fogSky: {
    name: "Sky fog",
    base: PAPER,
    shapes: [
      { x: 52, y: 55, w: 75, h: 70, rgb: SKY, a: 1, blur: 36, radius: SQUARE },
    ],
  },
  fogSteel: {
    name: "Steel fog",
    base: PAPER,
    shapes: [
      {
        x: 52,
        y: 55,
        w: 75,
        h: 70,
        rgb: STEEL,
        a: 0.9,
        blur: 36,
        radius: SQUARE,
      },
    ],
  },
  fogCorner: {
    name: "Fog off the corner",
    base: PAPER,
    shapes: [
      {
        x: 68,
        y: 70,
        w: 85,
        h: 80,
        rgb: STEEL,
        a: 0.85,
        blur: 34,
        radius: SQUARE,
      },
    ],
  },
  fogDeep: {
    name: "Deep fog",
    base: PAPER,
    shapes: [
      { x: 52, y: 55, w: 80, h: 75, rgb: SKY, a: 1, blur: 36, radius: SQUARE },
      {
        x: 55,
        y: 58,
        w: 40,
        h: 38,
        rgb: BLUE,
        a: 0.35,
        blur: 34,
        radius: SQUARE,
      },
    ],
  },
  fogSlate: {
    name: "Slate fog",
    base: MIST,
    shapes: [
      {
        x: 50,
        y: 50,
        w: 70,
        h: 65,
        rgb: SLATE,
        a: 0.45,
        blur: 40,
        radius: SQUARE,
      },
    ],
  },

  // Blobs: an off-centre organic haze (ode.com, behind copy).
  blobBlush: {
    name: "Blush blob",
    base: PAPER,
    shapes: [
      {
        x: 40,
        y: 45,
        w: 70,
        h: 80,
        rgb: BLUSH,
        a: 0.25,
        blur: 30,
        rotate: -20,
        radius: "60% 40% 55% 45%",
      },
    ],
  },
  blobSky: {
    name: "Sky blob",
    base: PAPER,
    shapes: [
      {
        x: 55,
        y: 45,
        w: 75,
        h: 75,
        rgb: SKY,
        a: 1,
        blur: 30,
        rotate: 15,
        radius: "55% 45% 40% 60%",
      },
    ],
  },
  blobPair: {
    name: "Blob pair",
    base: PAPER,
    shapes: [
      {
        x: 38,
        y: 40,
        w: 60,
        h: 55,
        rgb: SKY,
        a: 1,
        blur: 30,
        radius: "55% 45% 40% 60%",
      },
      {
        x: 68,
        y: 68,
        w: 45,
        h: 45,
        rgb: BLUSH,
        a: 0.22,
        blur: 30,
        radius: "45% 55% 60% 40%",
      },
    ],
  },
  blobTall: {
    name: "Tall blob",
    base: MIST,
    shapes: [
      {
        x: 50,
        y: 50,
        w: 45,
        h: 95,
        rgb: SKY,
        a: 1,
        blur: 32,
        rotate: 10,
        radius: "50% 50% 45% 55%",
      },
    ],
  },
  blobHigh: {
    name: "Small blob, high",
    base: PAPER,
    shapes: [
      { x: 70, y: 25, w: 45, h: 40, rgb: SKY, a: 1, blur: 26, radius: BLOB },
    ],
  },

  // Horizons and meshes: wider light.
  horizon: {
    name: "Horizon band",
    base: PAPER,
    shapes: [
      {
        x: 50,
        y: 55,
        w: 160,
        h: 30,
        rgb: SKY,
        a: 0.95,
        blur: 40,
        radius: BEAM,
      },
    ],
  },
  dawn: {
    name: "Dawn",
    base: PAPER,
    shapes: [
      { x: 50, y: 10, w: 160, h: 55, rgb: SKY, a: 1, blur: 45, radius: BLOB },
      {
        x: 50,
        y: 100,
        w: 140,
        h: 45,
        rgb: BLUSH,
        a: 0.2,
        blur: 45,
        radius: BLOB,
      },
    ],
  },
  cornerGlow: {
    name: "Corner glow",
    base: PAPER,
    shapes: [
      { x: 95, y: 5, w: 110, h: 90, rgb: SKY, a: 1, blur: 50, radius: BLOB },
    ],
  },
  mesh: {
    name: "Mesh",
    base: MIST,
    shapes: [
      { x: 25, y: 25, w: 70, h: 60, rgb: SKY, a: 1, blur: 40, radius: BLOB },
      {
        x: 80,
        y: 40,
        w: 55,
        h: 55,
        rgb: STEEL,
        a: 0.6,
        blur: 40,
        radius: BLOB,
      },
      {
        x: 45,
        y: 85,
        w: 70,
        h: 45,
        rgb: BLUSH,
        a: 0.18,
        blur: 40,
        radius: BLOB,
      },
      {
        x: 60,
        y: 55,
        w: 40,
        h: 35,
        rgb: WHITE,
        a: 0.7,
        blur: 30,
        radius: BLOB,
      },
    ],
  },
  blueCore: {
    name: "Blue core",
    base: MIST,
    shapes: [
      { x: 50, y: 50, w: 100, h: 90, rgb: SKY, a: 1, blur: 45, radius: BLOB },
      { x: 50, y: 52, w: 35, h: 30, rgb: BLUE, a: 0.3, blur: 30, radius: BLOB },
    ],
  },
} satisfies Record<string, LightVariant>;

export type LightFieldVariant = keyof typeof LIGHT_VARIANTS;

/** Whether a variant's ground is dark, so type over it should be light. */
export const isDarkLight = (variant: LightFieldVariant) =>
  Boolean((LIGHT_VARIANTS[variant] as LightVariant).dark);

/** The variants in families, in /gradients order. */
export const LIGHT_FAMILIES: {
  title: string;
  note: string;
  variants: LightFieldVariant[];
}[] = [
  {
    title: "Spheres",
    note: "The blog index tiles: a sphere of blue rising in mist.",
    variants: ["sphereLow", "sphereRight", "sphereLeft", "sphereLowRight"],
  },
  {
    title: "Pools",
    note: "The wash, pooled differently: what the approach strips use.",
    variants: ["poolSmall", "poolBeam", "poolBroad", "poolFull"],
  },
  {
    title: "Beams",
    note: "ode.com's hero: a long soft shaft of light at an angle.",
    variants: [
      "beamSky",
      "beamBlush",
      "beamCrossed",
      "beamSteel",
      "beamTapered",
    ],
  },
  {
    title: "Fog squares",
    note: "ode.com's tab panel: a soft square of colour fogging out to paper.",
    variants: ["fogSky", "fogSteel", "fogCorner", "fogDeep", "fogSlate"],
  },
  {
    title: "Blobs",
    note: "ode.com's haze behind copy: an off-centre organic shape.",
    variants: ["blobBlush", "blobSky", "blobPair", "blobTall", "blobHigh"],
  },
  {
    title: "Business Overview",
    note: "Its ramp, light to dark: tint, haze, steel, slate-light, slate, navy.",
    variants: [
      "ovTint",
      "ovHaze",
      "ovHazeDeep",
      "ovSteel",
      "ovSteelBlue",
      "ovSteelDeep",
      "ovSlate",
      "ovNavy",
    ],
  },
  {
    title: "Horizons and meshes",
    note: "Wider light: a band across, a dawn, a corner glow, colours meeting.",
    variants: ["horizon", "dawn", "cornerGlow", "mesh", "blueCore"],
  },
];

/**
 * A field of blurred light: `variant`'s shapes and layers on its ground,
 * under the site's grain. Fills whatever box it's given; decorative, so
 * hidden from screen readers.
 */
export const LightField: React.FC<
  { variant: LightFieldVariant } & Omit<BoxProps, "children">
> = ({ variant, ...props }) => {
  const v: LightVariant = LIGHT_VARIANTS[variant];
  return (
    <Box
      position="relative"
      overflow="hidden"
      // Keeps the blurs inside rounded corners.
      isolation="isolate"
      bg={v.base}
      bgImage={v.layers?.join(", ")}
      aria-hidden
      {...props}
    >
      {v.shapes?.map((s, i) => (
        <Box
          key={i}
          position="absolute"
          left={`${s.x - s.w / 2}%`}
          top={`${s.y - s.h / 2}%`}
          w={`${s.w}%`}
          h={`${s.h}%`}
          borderRadius={s.radius ?? BLOB}
          bg={`rgba(${s.rgb}, ${s.a})`}
          transform={s.rotate ? `rotate(${s.rotate}deg)` : undefined}
          filter={`blur(${s.blur}px)`}
        />
      ))}
      <Box
        position="absolute"
        inset={0}
        bgImage={GRAIN_TILE}
        bgSize="200px 200px"
        opacity={v.grain ?? 1}
      />
    </Box>
  );
};
