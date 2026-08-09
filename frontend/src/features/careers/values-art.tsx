import React from "react";

/**
 * Isometric figures for the careers "why join" sections.
 *
 * Same flat isometric language as the landing bento: 1px slate strokes, white
 * top faces, one accent per figure, monospace micro-labels, no gradients and no
 * motion. Static by design — the figures sit beside body copy, where movement
 * would pull attention off the text.
 */

const ACCENT = "#0071e3";
const RULE = "#d3dde1";
const RULE_SOFT = "#a9b7c6";
const INK = "#124476";

/** Rhombus half-height ÷ half-width, from the deck's isometric geometry. */
const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

const VB_W = 320;
const VB_H = 210;

/** A single isometric cube, drawn from its top face's waist. */
const Cube: React.FC<{
  cx: number;
  cy: number;
  r: number;
  tone?: "plain" | "accent" | "dark";
}> = ({ cx, cy, r, tone = "plain" }) => {
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  const stroke = tone === "accent" ? ACCENT : tone === "dark" ? INK : RULE_SOFT;
  const left =
    tone === "accent"
      ? "rgba(0,113,227,0.16)"
      : tone === "dark"
        ? "rgba(18,68,118,0.16)"
        : "rgba(118,140,166,0.12)";
  const right =
    tone === "accent"
      ? ACCENT
      : tone === "dark"
        ? "rgba(18,68,118,0.46)"
        : "rgba(118,140,166,0.24)";
  return (
    <g
      strokeLinejoin="round"
      strokeWidth={Math.max(0.8, r * 0.05)}
      stroke={stroke}
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
        fill="#ffffff"
      />
    </g>
  );
};

/** Visual centre of a cube — half a body-drop below its drawing origin. */
const centreY = (cy: number, r: number) => cy + (r * BODY_RATIO) / 2;

/**
 * Each figure declares the box its content actually occupies. A shared
 * full-size viewBox left the ink filling barely half the width, so the figures
 * rendered small in a wide panel with dead space around them.
 */
const Figure: React.FC<
  React.PropsWithChildren<{ label: string; box?: string }>
> = ({ label, box, children }) => (
  <svg
    viewBox={box ?? `0 0 ${VB_W} ${VB_H}`}
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label={label}
    style={{ display: "block", width: "100%", height: "100%" }}
  >
    <style>{`
      /* font-size via CSS: the attribute loses to inherited CSS font rules. */
      .rengo-val-label {
        font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
        font-size: 8.5px;
        letter-spacing: 0.6px;
      }
    `}</style>
    {children}
  </svg>
);

/* ── 01 · Hard problems ─────────────────────────────────────────────────
   Many systems converging on one deployment: the shape of the actual work. */

const HARD_HUB = { x: 172, y: 82, r: 34 };
const HARD_SATS = [
  { id: "s1", x: 52, y: 40, r: 17 },
  { id: "s2", x: 40, y: 96, r: 17 },
  { id: "s3", x: 58, y: 148, r: 17 },
] as const;

export const HardProblemsArt: React.FC = () => (
  <Figure
    label="Several systems converging on one deployment."
    box="13 20 206 167"
  >
    {HARD_SATS.map((s) => {
      const y0 = centreY(s.y, s.r);
      const y1 = centreY(HARD_HUB.y, HARD_HUB.r);
      const x0 = s.x + s.r;
      const x1 = HARD_HUB.x - HARD_HUB.r;
      const mid = x0 + (x1 - x0) * 0.55;
      const vdir = y0 < y1 ? 1 : -1;
      const bend = 8;
      const d =
        Math.abs(y0 - y1) < 2
          ? `M${x0} ${y0} H${x1}`
          : [
              `M${x0} ${y0}`,
              `H${mid - bend}`,
              `Q${mid} ${y0} ${mid} ${y0 + bend * vdir}`,
              `V${y1 - bend * vdir}`,
              `Q${mid} ${y1} ${mid + bend} ${y1}`,
              `H${x1}`,
            ].join(" ");
      return (
        <path
          key={s.id}
          d={d}
          fill="none"
          stroke={RULE}
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
      );
    })}
    {HARD_SATS.map((s) => (
      <Cube key={s.id} cx={s.x} cy={s.y} r={s.r} />
    ))}
    <Cube cx={HARD_HUB.x} cy={HARD_HUB.y} r={HARD_HUB.r} tone="accent" />
    <text
      className="rengo-val-label"
      x={HARD_HUB.x}
      y={centreY(HARD_HUB.y, HARD_HUB.r) + HARD_HUB.r * BODY_RATIO + 22}
      textAnchor="middle"
      fill={INK}
      fillOpacity={0.7}
    >
      IN PRODUCTION
    </text>
  </Figure>
);

/* ── 02 · Small team ───────────────────────────────────────────────────
   Equal cubes, no hierarchy. The absence of a pyramid is the point. */

const PEER_R = 24;
const PEERS = [
  { id: "p1", x: 96, y: 58 },
  { id: "p2", x: 172, y: 46 },
  { id: "p3", x: 78, y: 128 },
  { id: "p4", x: 158, y: 122 },
] as const;

export const SmallTeamArt: React.FC = () => (
  <Figure
    label="Four equally sized blocks in a loose cluster, none above another."
    box="44 22 162 185"
  >
    {/* Peer links, drawn first so the cubes sit over them. */}
    {[
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [0, 3],
    ].map(([a, b]) => (
      <line
        key={`${a}-${b}`}
        x1={PEERS[a].x}
        y1={centreY(PEERS[a].y, PEER_R)}
        x2={PEERS[b].x}
        y2={centreY(PEERS[b].y, PEER_R)}
        stroke={RULE}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    ))}
    {PEERS.map((p, i) => (
      <Cube
        key={p.id}
        cx={p.x}
        cy={p.y}
        r={PEER_R}
        tone={i === 1 ? "accent" : "plain"}
      />
    ))}
    <text
      className="rengo-val-label"
      x={(PEERS[2].x + PEERS[3].x) / 2}
      y={centreY(PEERS[2].y, PEER_R) + PEER_R * BODY_RATIO + 26}
      textAnchor="middle"
      fill={INK}
      fillOpacity={0.7}
    >
      NO LAYERS
    </text>
  </Figure>
);

/* ── 03 · Institutional rigor ──────────────────────────────────────────
   A sealed boundary: the model outside, the firm's records inside. */

const SEAL_Y = 96;
const VAULT = { x: 58, y: SEAL_Y + 14, w: 204, h: 62 };
const MODEL = { x: 160, y: 34, r: 24 };
const RECORDS = [88, 128, 168, 208];

export const RigorArt: React.FC = () => (
  <Figure
    label="Firm data held inside a sealed boundary, with the model outside it."
    box="42 -8 236 208"
  >
    <Cube cx={MODEL.x} cy={MODEL.y} r={MODEL.r} />
    <text
      className="rengo-val-label"
      x={MODEL.x}
      y={MODEL.y - MODEL.r * TOP_RATIO - 10}
      textAnchor="middle"
      fill={INK}
      fillOpacity={0.7}
    >
      MODEL
    </text>

    {/* The request reaches the boundary and stops short of it. */}
    <line
      x1={MODEL.x}
      x2={MODEL.x}
      y1={centreY(MODEL.y, MODEL.r) + MODEL.r * BODY_RATIO * 0.5}
      y2={SEAL_Y - 6}
      stroke={ACCENT}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <circle cx={MODEL.x} cy={SEAL_Y - 6} r={2.5} fill={ACCENT} />

    {/* Solid, unlike every other run in the set: a dashed line would read as
      permeable, which is the opposite of the claim. */}
    <line
      x1={VAULT.x - 6}
      x2={VAULT.x + VAULT.w + 6}
      y1={SEAL_Y}
      y2={SEAL_Y}
      stroke={ACCENT}
      strokeWidth={1.75}
    />
    <rect
      x={VAULT.x}
      y={VAULT.y}
      width={VAULT.w}
      height={VAULT.h}
      rx={3}
      fill="rgba(0,113,227,0.03)"
      stroke={RULE_SOFT}
      strokeOpacity={0.55}
      strokeDasharray="3 3"
    />
    {RECORDS.map((x) => (
      <Cube key={x} cx={x} cy={VAULT.y + 16} r={13} />
    ))}
    <text
      className="rengo-val-label"
      x={VAULT.x + VAULT.w / 2}
      y={VAULT.y + VAULT.h + 16}
      textAnchor="middle"
      fill={INK}
      fillOpacity={0.7}
    >
      YOUR DATA
    </text>
  </Figure>
);

/* ── 04 · Ship fast ───────────────────────────────────────────────────
   The deployment path, with the month-long span bracketed. */

const STAGES = [
  { id: "migrate", label: "MIGRATE" },
  { id: "unify", label: "UNIFY" },
  { id: "automate", label: "AUTOMATE" },
  { id: "deploy", label: "DEPLOY" },
] as const;

const TRACK_Y = 104;
const TRACK_X0 = 34;
const TRACK_X1 = 286;
const STEP = (TRACK_X1 - TRACK_X0) / (STAGES.length - 1);

export const ShipFastArt: React.FC = () => (
  <Figure
    label="A four-stage deployment path completed within one month."
    box="4 54 309 92"
  >
    {/* The span bracket. */}
    <path
      d={`M${TRACK_X0} ${TRACK_Y - 18} V${TRACK_Y - 28} H${TRACK_X1} V${TRACK_Y - 18}`}
      fill="none"
      stroke={RULE_SOFT}
      strokeOpacity={0.7}
      strokeWidth={1}
    />
    <text
      className="rengo-val-label"
      x={(TRACK_X0 + TRACK_X1) / 2}
      y={TRACK_Y - 36}
      textAnchor="middle"
      fill={INK}
      fillOpacity={0.75}
    >
      ONE MONTH
    </text>

    <line
      x1={TRACK_X0}
      x2={TRACK_X1}
      y1={TRACK_Y}
      y2={TRACK_Y}
      stroke={RULE}
      strokeWidth={1.25}
      strokeDasharray="4 4"
    />
    {/* The travelled portion, solid to the last stage. */}
    <line
      x1={TRACK_X0}
      x2={TRACK_X1}
      y1={TRACK_Y}
      y2={TRACK_Y}
      stroke={ACCENT}
      strokeWidth={1.5}
      strokeOpacity={0.9}
    />
    {STAGES.map((s, i) => {
      const x = TRACK_X0 + i * STEP;
      const isLast = i === STAGES.length - 1;
      return (
        <g key={s.id}>
          <circle
            cx={x}
            cy={TRACK_Y}
            r={isLast ? 5 : 4}
            fill={isLast ? ACCENT : "#ffffff"}
            stroke={ACCENT}
            strokeWidth={1.5}
          />
          <text
            className="rengo-val-label"
            x={x}
            y={TRACK_Y + 24}
            textAnchor="middle"
            fill={INK}
            fillOpacity={0.75}
          >
            {s.label}
          </text>
        </g>
      );
    })}
  </Figure>
);
