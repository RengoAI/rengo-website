import {
  AudioLines,
  ChartNoAxesCombined,
  ScanText,
  Table,
  type LucideIcon,
} from "lucide-react";
import React from "react";

/**
 * "Structure knowledge" — isometric cube nodes connected by dotted lines to
 * coloured modality pills; label left, icon right, space-between.
 */

// ─── Cube geometry ────────────────────────────────────────────────────────────
const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;
const CUBE_R = 12;
const RULE_SOFT = "#a9b7c6";

/**
 * Isometric block whose right-face centre sits at (cx + CUBE_R, midY), so the
 * horizontal dotted connector line leaves from that exact midpoint.
 */
const ScatterBlock: React.FC<{ cx: number; midY: number }> = ({ cx, midY }) => {
  const r = CUBE_R;
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  const top = midY - body / 2; // top of the vertical face
  return (
    <g strokeLinejoin="round" strokeWidth={0.8} stroke={RULE_SOFT}>
      {/* left face */}
      <polygon
        points={`${cx - r},${top} ${cx},${top + ry} ${cx},${top + ry + body} ${cx - r},${top + body}`}
        fill="rgba(118,140,166,0.12)"
      />
      {/* right face */}
      <polygon
        points={`${cx + r},${top} ${cx},${top + ry} ${cx},${top + ry + body} ${cx + r},${top + body}`}
        fill="rgba(118,140,166,0.24)"
      />
      {/* top cap */}
      <polygon
        points={`${cx},${top - ry} ${cx + r},${top} ${cx},${top + ry} ${cx - r},${top}`}
        fill="#ffffff"
      />
    </g>
  );
};

// ─── Modality pill ────────────────────────────────────────────────────────────
type ModalityKind = "text" | "tables" | "audio" | "timeSeries";

/** Accent colours sourced from the Figma reference (171-1335). */
const MODALITY: Record<
  ModalityKind,
  { Icon: LucideIcon; label: string; bg: string; fg: string }
> = {
  text: {
    Icon: ScanText,
    label: "Text",
    bg: "#d3dde1",
    fg: "#425366",
  },
  tables: {
    Icon: Table,
    label: "Tables",
    bg: "#a4c4b2",
    fg: "#2a533c",
  },
  audio: {
    Icon: AudioLines,
    label: "Audio",
    bg: "#f2e6b5",
    fg: "#4d3e1a",
  },
  timeSeries: {
    Icon: ChartNoAxesCombined,
    label: "Time series",
    bg: "#b3d0d4",
    fg: "#4d666b",
  },
};

const PILL_W = 118;
const PILL_H = 36;
const PILL_RX = 5;
const PILL_ICON_SIZE = 16;
const PILL_FONT_SIZE = 12;

/** Rounded pill with label left and icon right. */
const ModalityPill: React.FC<{
  cx: number;
  cy: number;
  kind: ModalityKind;
}> = ({ cx, cy, kind }) => {
  const { Icon, label, bg, fg } = MODALITY[kind];
  const x = cx - PILL_W / 2;
  const y = cy - PILL_H / 2;
  return (
    <g>
      <rect x={x} y={y} width={PILL_W} height={PILL_H} rx={PILL_RX} fill={bg} />
      <foreignObject
        x={x}
        y={y}
        width={PILL_W}
        height={PILL_H}
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--rengo-fonts-body, system-ui, sans-serif)",
              fontSize: `${PILL_FONT_SIZE}px`,
              fontWeight: 500,
              lineHeight: "1",
              letterSpacing: "-0.2px",
              color: fg,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          <Icon
            size={PILL_ICON_SIZE}
            strokeWidth={1.75}
            color={fg}
            aria-hidden
          />
        </div>
      </foreignObject>
    </g>
  );
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const VB_W = 380;
const ROW_PITCH = 54;
const ROW_TOP_Y = 32;
const rowCY = (i: number) => ROW_TOP_Y + i * ROW_PITCH;

/** X-centre of the right-side pill column. */
const PILL_CX = VB_W - 22 - PILL_W / 2; // ≈ 306
const PILL_LEFT = PILL_CX - PILL_W / 2; // ≈ 254

/**
 * Four cube nodes forming two T-junction pairs (matching Figma 173-1453).
 *
 * Topology:
 *   CUBE_LT ──→ trunk_a ──→ [Text arm]
 *                       └──→ CUBE_MT ──→ [Tables arm]
 *
 *   CUBE_LB ──→ trunk_b ──→ [Audio arm]
 *                       └──→ CUBE_MB ──→ [TimeSeries arm]
 *
 * midY is the right-face centre Y, placing the horizontal connector
 * between the two rows each cube serves.
 */
const CUBE_LT = { cx: 42, midY: 44 }; // main cube: Text + Tables (between rows 0 & 1)
const CUBE_LB = { cx: 52, midY: 169 }; // main cube: Audio + TimeSeries (between rows 2 & 3)
const CUBE_MT = { cx: 196, midY: rowCY(1) }; // junction cube at Tables row
const CUBE_MB = { cx: 162, midY: rowCY(3) }; // junction cube at TimeSeries row

/** X of the vertical trunk for each cluster. */
const TRUNK_A_X = 78; // top cluster (Text / Tables)
const TRUNK_B_X = 134; // bottom cluster (Audio / TimeSeries) — scaled from Figma Vector252

const VB_H = rowCY(3) + ROW_PITCH / 2 + 12; // ≈ 233

/**
 * All dotted line segments that form the tree.
 * Each entry is [x1, y1, x2, y2].
 */
const TREE_LINES: [number, number, number, number][] = [
  // ── Top cluster ───────────────────────────────────────────────────────────
  // Cube_LT right-face → trunk_a (horizontal)
  [CUBE_LT.cx + CUBE_R, CUBE_LT.midY, TRUNK_A_X, CUBE_LT.midY],
  // Trunk vertical: Text row → Tables row
  [TRUNK_A_X, rowCY(0), TRUNK_A_X, rowCY(1)],
  // Text arm: trunk_a top → Text pill left
  [TRUNK_A_X, rowCY(0), PILL_LEFT, rowCY(0)],
  // Tables arm: trunk_a bottom → Cube_MT left face
  [TRUNK_A_X, rowCY(1), CUBE_MT.cx - CUBE_R, rowCY(1)],
  // Cube_MT right face → Tables pill left
  [CUBE_MT.cx + CUBE_R, rowCY(1), PILL_LEFT, rowCY(1)],

  // ── Bottom cluster ────────────────────────────────────────────────────────
  // Cube_LB right-face → trunk_b (horizontal)
  [CUBE_LB.cx + CUBE_R, CUBE_LB.midY, TRUNK_B_X, CUBE_LB.midY],
  // Trunk vertical: Audio row → TimeSeries row
  [TRUNK_B_X, rowCY(2), TRUNK_B_X, rowCY(3)],
  // Audio arm: trunk_b top → Audio pill left
  [TRUNK_B_X, rowCY(2), PILL_LEFT, rowCY(2)],
  // TimeSeries arm: trunk_b bottom → Cube_MB left face
  [TRUNK_B_X, rowCY(3), CUBE_MB.cx - CUBE_R, rowCY(3)],
  // Cube_MB right face → TimeSeries pill left
  [CUBE_MB.cx + CUBE_R, rowCY(3), PILL_LEFT, rowCY(3)],
];

const PILL_ROWS: Array<{ kind: ModalityKind; row: number }> = [
  { kind: "text", row: 0 },
  { kind: "tables", row: 1 },
  { kind: "audio", row: 2 },
  { kind: "timeSeries", row: 3 },
];

// ─── Component ────────────────────────────────────────────────────────────────
type AgentsActArtProps = {
  variant?: "tile" | "compact";
};

export const AgentsActArt: React.FC<AgentsActArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isCompact ? "220px" : "340px",
        height: isCompact ? "180px" : "220px",
        margin: "0 auto",
      }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Cube nodes connected by a branching dotted-line tree to typed modality pills."
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        {/* T-junction tree: dotted line segments */}
        {TREE_LINES.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={RULE_SOFT}
            strokeWidth={1}
            strokeDasharray="3 3"
            strokeOpacity={0.6}
          />
        ))}

        {/* Isometric cube nodes */}
        <ScatterBlock cx={CUBE_LT.cx} midY={CUBE_LT.midY} />
        <ScatterBlock cx={CUBE_LB.cx} midY={CUBE_LB.midY} />
        <ScatterBlock cx={CUBE_MT.cx} midY={CUBE_MT.midY} />
        <ScatterBlock cx={CUBE_MB.cx} midY={CUBE_MB.midY} />

        {/* Coloured modality pills */}
        {PILL_ROWS.map(({ kind, row }) => (
          <ModalityPill
            key={kind}
            cx={PILL_CX}
            cy={rowCY(row)}
            kind={kind}
          />
        ))}
      </svg>
    </div>
  );
};
