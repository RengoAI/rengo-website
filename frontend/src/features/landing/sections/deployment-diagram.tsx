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
const RULE_SOFT = "#a9b7c6"; // slate.40

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

const FLOAT_CYCLE = "2.83s";
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
    top: "#ffffff",
    left: "rgba(0,113,227,0.10)",
    right: "rgba(0,113,227,0.20)",
    edge: "rgba(0,113,227,0.45)",
  },
  out: {
    top: "#ffffff",
    left: "rgba(118,140,166,0.12)",
    right: "rgba(118,140,166,0.26)",
    edge: RULE_SOFT,
  },
  hub: {
    top: "#ffffff",
    left: "rgba(0,113,227,0.26)",
    right: ACCENT,
    edge: ACCENT,
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
  const sw = Math.max(1, r * 0.026);
  return (
    <g strokeLinejoin="round" strokeWidth={sw} stroke={edge}>
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

/** Rounded elbow from a satellite edge to the hub edge, as in the source. */
/**
 * A cube's drawing origin (cy) sits at the top rhombus's waist, so its visual
 * centre is half a body-drop lower. Connectors aim at that centre.
 */
const cubeCentreY = (cy: number, r: number) => cy + (r * BODY_RATIO) / 2;

const connectorPath = (sat: (typeof SATELLITES)[number]) => {
  const isLeft = sat.x < HUB.x;
  const from = isLeft ? sat.x + SAT_R : sat.x - SAT_R;
  const to = isLeft ? HUB.x - HUB_R * 0.62 : HUB.x + HUB_R * 0.62;
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
 * down inside a bento cell and leaving margin so nothing clips.
 */
const TILE_VIEWBOX = { x: 34, y: 40, w: 692, h: 280 };

/** Hub drawn in its own overlay so the float can animate on an HTML wrapper —
 *  CSS transforms do not reliably animate on SVG <g> elements. */
const HubOverlay: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      animation: `rengo-hub-float ${FLOAT_CYCLE} ease-in-out infinite`,
      pointerEvents: "none",
    }}
  >
    <svg
      viewBox={
        compact
          ? `${TILE_VIEWBOX.x} ${TILE_VIEWBOX.y} ${TILE_VIEWBOX.w} ${TILE_VIEWBOX.h}`
          : `0 0 ${VB_W} ${VB_H}`
      }
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <Cube cx={HUB.x} cy={HUB.y} r={HUB_R} tone="hub" />
    </svg>
  </div>
);

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
    <style>{`
      @keyframes rengo-hub-float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-5px); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="rengo-hub-float"] { animation: none !important; }
      }
    `}</style>
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
      </defs>

      <style>{`
      }
      @keyframes rengo-hub-float {
        0%, 100% { transform: translate(0px, 0px); }
        50%      { transform: translate(0px, -5px); }
      }
      .rengo-hub {
        animation: rengo-hub-float ${FLOAT_CYCLE} ease-in-out infinite;
        transform-box: view-box;
        transform-origin: center;
      }
      @keyframes rengo-pulse-run {
        0%        { stroke-dashoffset: var(--run); opacity: 0; }
        6%        { opacity: 1; }
        45%       { stroke-dashoffset: 0; opacity: 1; }
        60%, 100% { stroke-dashoffset: 0; opacity: 0; }
      }
      .rengo-pulse { animation: rengo-pulse-run ${LOOP}s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .rengo-hub { animation: none; }
        .rengo-pulse { animation: none; opacity: 0; }
      }
    `}</style>

      <g mask="url(#rengo-labs-mask)">
        {/* ── Connector runs, with a pulse travelling each one ─────── */}
        {SATELLITES.map((sat) => {
          const d = connectorPath(sat);
          const run = 420;
          const isLeft = sat.tone === "in";
          return (
            <g key={`link-${sat.id}`} fill="none">
              <path
                d={d}
                stroke={isLeft ? "rgba(0,113,227,0.34)" : RULE}
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                className="rengo-pulse"
                d={d}
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                style={
                  {
                    strokeDasharray: `54 ${run}`,
                    animationDelay: `${sat.delay}s`,
                    ["--run" as string]: `${run}`,
                  } as React.CSSProperties
                }
              />
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

        {/* ── Hub ─────────────────────────────────────────────────── */}
      </g>

      {/* Outside the mask: a masked subtree suppresses this animation, and the
        hub is central enough that it never needs the edge fade. */}
    </svg>
    <HubOverlay compact={size === "tile"} />
  </div>
);
