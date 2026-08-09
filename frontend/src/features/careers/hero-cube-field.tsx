import React from "react";

/**
 * Careers hero backdrop — a drifting field of isometric cubes.
 *
 * Deliberately abstract: no connectors, no labels, no topology. It sets a tone
 * with the same material the rest of the site is built from rather than making
 * a product claim, which is what a careers hero should do.
 *
 * Occupies the right half of the hero and fades out toward the left so it never
 * competes with the headline. Depth comes from scale and opacity together —
 * larger and more opaque toward the centre, smaller and fainter at the edges —
 * which reads as a field receding rather than a flat sprinkle.
 */

const ACCENT = "#0071e3";
const RULE_SOFT = "#a9b7c6";

/** Rhombus half-height ÷ half-width, from the deck's isometric geometry. */
const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

const VB_W = 720;
const VB_H = 900;

/**
 * Placement is hand-authored rather than random so the composition stays
 * balanced and the field is identical on every load.
 *
 * `r` is the cube's top-face half-width; `o` scales its opacity. The two move
 * together, so a small cube is also a faint one.
 */
const CUBES: { x: number; y: number; r: number; o: number }[] = [
  // Dense, larger cluster through the middle band.
  { x: 386, y: 300, r: 52, o: 1 },
  { x: 500, y: 372, r: 44, o: 0.92 },
  { x: 300, y: 404, r: 40, o: 0.88 },
  { x: 432, y: 470, r: 48, o: 0.95 },
  { x: 566, y: 268, r: 34, o: 0.76 },
  { x: 268, y: 250, r: 30, o: 0.7 },
  { x: 356, y: 560, r: 36, o: 0.78 },
  { x: 512, y: 556, r: 30, o: 0.66 },
  { x: 606, y: 452, r: 28, o: 0.6 },
  { x: 236, y: 520, r: 26, o: 0.58 },

  // Sparser, smaller, fainter toward the edges.
  { x: 630, y: 348, r: 20, o: 0.46 },
  { x: 190, y: 340, r: 18, o: 0.4 },
  { x: 470, y: 194, r: 22, o: 0.5 },
  { x: 320, y: 162, r: 16, o: 0.36 },
  { x: 596, y: 596, r: 22, o: 0.44 },
  { x: 426, y: 648, r: 24, o: 0.46 },
  { x: 268, y: 640, r: 18, o: 0.34 },
  { x: 660, y: 520, r: 15, o: 0.3 },
  { x: 164, y: 442, r: 14, o: 0.28 },
  { x: 542, y: 132, r: 15, o: 0.3 },
  { x: 372, y: 96, r: 13, o: 0.24 },
  { x: 646, y: 216, r: 13, o: 0.26 },
  { x: 214, y: 214, r: 12, o: 0.24 },
  { x: 496, y: 712, r: 18, o: 0.3 },
  { x: 322, y: 736, r: 14, o: 0.24 },
  { x: 604, y: 672, r: 13, o: 0.22 },
  { x: 176, y: 590, r: 13, o: 0.24 },
  { x: 682, y: 424, r: 11, o: 0.2 },
  { x: 258, y: 106, r: 11, o: 0.18 },
  { x: 448, y: 800, r: 14, o: 0.2 },
  { x: 240, y: 800, r: 11, o: 0.16 },
  { x: 560, y: 792, r: 11, o: 0.16 },
];

/** The two cubes carrying the accent, by index into CUBES. */
const ACCENT_AT = new Set([0, 3]);

const Cube: React.FC<{
  cx: number;
  cy: number;
  r: number;
  accent: boolean;
}> = ({ cx, cy, r, accent }) => {
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  return (
    <g
      strokeLinejoin="round"
      strokeWidth={Math.max(0.9, r * 0.032)}
      stroke={accent ? ACCENT : RULE_SOFT}
    >
      <polygon
        points={`${cx - r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx - r},${cy + body}`}
        fill={accent ? "rgba(0,113,227,0.14)" : "rgba(118,140,166,0.10)"}
      />
      <polygon
        points={`${cx + r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx + r},${cy + body}`}
        fill={accent ? "rgba(0,113,227,0.26)" : "rgba(118,140,166,0.20)"}
      />
      <polygon
        points={`${cx},${cy - ry} ${cx + r},${cy} ${cx},${cy + ry} ${cx - r},${cy}`}
        fill="#ffffff"
      />
    </g>
  );
};

export const HeroCubeField: React.FC = () => (
  <svg
    viewBox={`0 0 ${VB_W} ${VB_H}`}
    /* Anchored right and cropped rather than fitted: the field should bleed off
       the edges of the hero, not sit inside it as a picture. */
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      /*
        Just over half the hero on desktop. The `max(0px, 100% - 340px)` term
        keeps the field clear of the copy column on narrow viewports: at 480px
        an unconditional 58% put the field under the CTA button.
      */
      width: "min(58%, 860px, max(0px, 100% - 340px))",
      height: "100%",
      display: "block",
    }}
  >
    <defs>
      {/*
        One radial gradient rather than two crossed linear ones: mixBlendMode
        inside a <mask> is not reliably supported, so the second rect painted
        over the first instead of multiplying with it and the left-hand fade
        was lost. A radial falloff centred right-of-middle does both jobs —
        clears the headline on the left and softens every other edge.
      */}
      <radialGradient
        id="rengo-field-fade"
        cx="0.62"
        cy="0.5"
        r="0.72"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stopColor="#fff" stopOpacity="1" />
        <stop offset="0.52" stopColor="#fff" stopOpacity="1" />
        <stop offset="0.8" stopColor="#fff" stopOpacity="0.45" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="rengo-field-mask">
        <rect width={VB_W} height={VB_H} fill="url(#rengo-field-fade)" />
      </mask>
    </defs>

    <g mask="url(#rengo-field-mask)">
      {CUBES.map((c, i) => (
        <g key={`${c.x}-${c.y}`} opacity={c.o}>
          <Cube cx={c.x} cy={c.y} r={c.r} accent={ACCENT_AT.has(i)} />
        </g>
      ))}
    </g>
  </svg>
);
