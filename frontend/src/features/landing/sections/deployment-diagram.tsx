import React from "react";

/**
 * Deployment topology diagram.
 *
 * Recreates Baseten's "model-labs" figure — a large central cube with six
 * satellite cubes in two flanking columns, joined by rounded connector runs
 * that pulse toward the hub — in the Rengo palette.
 *
 * Geometry comes from the source Lottie (534×524 @ 24fps, 9.58s loop):
 *
 *   top face     84.2 × 48.0  (a 1.754:1 isometric rhombus)
 *   body drop    48.8         (1.159 × the top face's half-width)
 *   hub          2.37× the satellite
 *
 * The source distinguishes its two columns by hue (green in, pink out); here
 * that reads as accent-tinted inputs on the left and neutral slate outputs on
 * the right, with the hub carrying the strongest accent.
 */

const ACCENT = "#0071e3"; // accent.link
const RULE = "#d3dde1"; // slate.30
const SLATE_20 = "#eaedee";
const SLATE_10 = "#f5f5f6";
const SLATE_30 = "#d3dde1";
const SLATE_40 = "#a9b7c6";

/** Hub faces — white top, slightly richer blue sides. */
const HUB_TOP = "#ffffff";
const HUB_LEFT = "#dce8f5";
const HUB_RIGHT = "#9bb5d4";
const HUB_EDGE = "#b8cfe6";

const VB_W = 760;
const VB_H = 360;

/** Half-width of the source's top face. */
const SAT_UNIT = 42.1;
const HUB_SCALE = 2.37;
/** Satellites render larger than the raw ratio so they read as siblings
 * of the hub, matching how the source composition balances at this size. */
const SAT_BOOST = 1.42;
/** Scale the 534-wide source field into this 760×360 band. */
const FIT = 0.62;

const SAT_R = SAT_UNIT * FIT * SAT_BOOST; // ≈37
const HUB_R = SAT_UNIT * HUB_SCALE * FIT; // ≈62

/** Ratios lifted directly from the source paths. */
const TOP_RATIO = 48.0 / 84.2; // rhombus half-height ÷ half-width
const BODY_RATIO = 48.8 / 42.1; // body drop ÷ half-width

const HUB = { x: VB_W * 0.5, y: VB_H * 0.42 };

const LOOP = 9.58;

/**
 * Two families, as in the source: inputs feed the hub from the left, outputs
 * leave to the right. `delay` reproduces the source's staggered trim pulses.
 */
const SATELLITES = [
  { id: "l-top", x: VB_W * 0.13, y: VB_H * 0.2, delay: 0.75, tone: "in" },
  { id: "l-mid", x: VB_W * 0.13, y: VB_H * 0.46, delay: 3.88, tone: "in" },
  { id: "l-dwn", x: VB_W * 0.13, y: VB_H * 0.72, delay: 7.0, tone: "in" },
  { id: "r-top", x: VB_W * 0.87, y: VB_H * 0.2, delay: 2.08, tone: "out" },
  { id: "r-mid", x: VB_W * 0.87, y: VB_H * 0.46, delay: 5.21, tone: "out" },
  { id: "r-dwn", x: VB_W * 0.87, y: VB_H * 0.72, delay: 8.33, tone: "out" },
] as const;

type Tone = "in" | "out" | "hub";

/** Face fills per family, mirroring the source's light-top / mid / dark-side. */
const TONES: Record<
  Tone,
  { top: string; left: string; right: string; edge: string }
> = {
  in: {
    top: SLATE_10,
    left: SLATE_20,
    right: SLATE_40,
    edge: SLATE_30,
  },
  out: {
    top: SLATE_10,
    left: SLATE_20,
    right: SLATE_40,
    edge: SLATE_30,
  },
  hub: {
    top: HUB_TOP,
    left: HUB_LEFT,
    right: HUB_RIGHT,
    edge: HUB_EDGE,
  },
};

/**
 * A single isometric cube — top rhombus plus two body faces — drawn from its
 * centre using the source's face ratios.
 */
const Cube: React.FC<{ cx: number; cy: number; r: number; tone: Tone }> = ({
  cx,
  cy,
  r,
  tone,
}) => {
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  const { top, left, right, edge } = TONES[tone];
  const isHub = tone === "hub";
  return (
    <g
      filter={isHub ? "url(#rengo-hub-cube)" : "url(#rengo-cube-card)"}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth={1}
      stroke={edge}
    >
      <polygon
        points={`${cx - r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx - r},${cy + body}`}
        fill={left}
      />
      <polygon
        points={`${cx + r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx + r},${cy + body}`}
        fill={right}
      />
      <polygon
        points={`${cx},${cy - ry} ${cx + r},${cy} ${cx},${cy + ry} ${cx - r},${cy}`}
        fill={top}
      />
    </g>
  );
};

/**
 * A cube's drawing origin (cy) sits at the top rhombus's waist, so its visual
 * centre is half a body-drop lower. Connectors aim at that centre.
 */
const cubeCentreY = (cy: number, r: number) => cy + (r * BODY_RATIO) / 2;

/** Rounded elbow from a satellite edge to the hub edge, as in the source. */
const connectorPath = (sat: (typeof SATELLITES)[number]) => {
  const isLeft = sat.x < HUB.x;
  const from = isLeft ? sat.x + SAT_R : sat.x - SAT_R;
  const to = isLeft ? HUB.x - HUB_R : HUB.x + HUB_R;
  const mid = from + (to - from) * 0.28;
  const dir = isLeft ? 1 : -1;

  const satY = cubeCentreY(sat.y, SAT_R);
  const hubY = cubeCentreY(HUB.y, HUB_R);
  const vdir = satY < hubY ? 1 : -1;
  const R = 10;

  if (Math.abs(satY - hubY) < 2) return `M${from} ${satY} H${to}`;

  return [
    `M${from} ${satY}`,
    `H${mid - R * dir}`,
    `Q${mid} ${satY} ${mid} ${satY + R * vdir}`,
    `V${hubY - R * vdir}`,
    `Q${mid} ${hubY} ${mid + R * dir} ${hubY}`,
    `H${to}`,
  ].join(" ");
};

/**
 * Tile mode widens the viewBox around the same geometry, scaling the diagram
 * down inside a bento cell and leaving margin so shadows are not clipped.
 */
const TILE_VIEWBOX = { x: 34, y: 36, w: 692, h: 308 };

interface DeploymentDiagramProps {
  /** "band" fills the wide section; "tile" is the compact bento variant. */
  size?: "band" | "tile";
}

export const DeploymentDiagram: React.FC<DeploymentDiagramProps> = ({
  size = "band",
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: size === "tile" ? "180px" : "100%",
      maxHeight: size === "tile" ? "180px" : undefined,
    }}
  >
    <svg
      viewBox={
        size === "tile"
          ? `${TILE_VIEWBOX.x} ${TILE_VIEWBOX.y} ${TILE_VIEWBOX.w} ${TILE_VIEWBOX.h}`
          : `0 0 ${VB_W} ${VB_H}`
      }
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Connected systems feeding a central Rengo deployment."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="rengo-labs-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.16" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="0.84" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="rengo-labs-mask">
          <rect width={VB_W} height={VB_H} fill="url(#rengo-labs-fade)" />
        </mask>
        <filter
          id="rengo-cube-card"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#213044"
            floodOpacity="0.08"
          />
        </filter>
        <filter
          id="rengo-hub-cube"
          x="-55%"
          y="-55%"
          width="210%"
          height="210%"
        >
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="10"
            floodColor="#213044"
            floodOpacity="0.1"
          />
        </filter>
      </defs>

      <style>{`
      @media (prefers-reduced-motion: reduce) {
        .rengo-pulse { opacity: 0 !important; }
        .rengo-pulse animate { display: none; }
      }
    `}</style>

      <g mask="url(#rengo-labs-mask)">
        {/* ── Connector runs, with a pulse travelling each one ─────── */}
        {SATELLITES.map((sat) => {
          const d = connectorPath(sat);
          return (
            <g key={`link-${sat.id}`} fill="none">
              <path
                d={d}
                stroke={RULE}
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                className="rengo-pulse"
                d={d}
                pathLength={1}
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="0.22 1"
                strokeDashoffset={1}
                opacity={0}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="1;0;0"
                  keyTimes="0;0.88;1"
                  dur={`${LOOP}s`}
                  begin={`${sat.delay}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.04;0.88;1"
                  dur={`${LOOP}s`}
                  begin={`${sat.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}

        {/* ── Satellites ──────────────────────────────────────────── */}
        {SATELLITES.map((sat) => (
          <Cube
            key={sat.id}
            cx={sat.x}
            cy={sat.y}
            r={SAT_R}
            tone={sat.tone as Tone}
          />
        ))}
      </g>

      <Cube cx={HUB.x} cy={HUB.y} r={HUB_R} tone="hub" />
    </svg>
  </div>
);
