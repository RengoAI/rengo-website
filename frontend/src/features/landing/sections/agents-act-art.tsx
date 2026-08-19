import {
  AudioLines,
  ChartNoAxesCombined,
  Table,
  type LucideIcon,
} from "lucide-react";
import React from "react";

/**
 * "Structure your knowledge" bento art.
 *
 * Three columns × three rows of data-type squares linked by a dotted
 * branching trunk. Fills stay on the marketing slate / ice-blue ramp used
 * by the other bento tiles (no green or yellow).
 */

// ─── Square type palette ─────────────────────────────────────────────────────
type SquareKind = "timeSeries" | "tables" | "audio" | "text";

const PALETTE: Record<
  SquareKind,
  { bg: string; fg: string; label: string; Icon: LucideIcon | null }
> = {
  timeSeries: {
    bg: "#A8D4FF",
    fg: "#124476",
    label: "Time series",
    Icon: ChartNoAxesCombined,
  },
  tables: { bg: "#A9B7C6", fg: "#425366", label: "Tables", Icon: Table },
  audio: { bg: "#FAFAFA", fg: "#768CA6", label: "Audio", Icon: AudioLines },
  text: { bg: "#D3DDE1", fg: "#768CA6", label: "Text", Icon: null },
};

// ─── Layout constants ────────────────────────────────────────────────────────
const SQ = 50; // large square side
const LINE_CLR = "#597299";

// Column x (left edge of each square) — matches Figma proportions
const C1X = 10; // left col
const C2X = 102; // middle col  (42px gap from col1 right edge)
const C3X = 177; // right col   (25px gap from col2 right edge)

// Row y (top edge of each square)
const R0Y = 12;
const R1Y = 82; // 70px pitch keeps gaps proportional to Figma
const R2Y = 152;

// Derived edges / centres
const C1R = C1X + SQ; // 60  — col1 right edge
const C2L = C2X; // 102 — col2 left edge
const C2R = C2X + SQ; // 152 — col2 right edge
const C3L = C3X; // 177 — col3 left edge
const R0CY = R0Y + SQ / 2; // 37
const R1CY = R1Y + SQ / 2; // 107
const R2CY = R2Y + SQ / 2; // 177

// Trunk x midpoint between col1 right and col2 left
const TX = Math.round((C1R + C2L) / 2); // 81

// ViewBox
const VB_W = C3X + SQ + 10; // 237
const VB_H = R2Y + SQ + 10; // 212

// ─── Grid definition ─────────────────────────────────────────────────────────
const GRID: Array<{ col: 0 | 1 | 2; row: 0 | 1 | 2; kind: SquareKind }> = [
  // Col 0 — left source squares
  { col: 0, row: 0, kind: "text" },
  { col: 0, row: 1, kind: "tables" },
  { col: 0, row: 2, kind: "audio" },
  // Col 1 — middle typed squares
  { col: 1, row: 0, kind: "timeSeries" },
  { col: 1, row: 1, kind: "text" },
  { col: 1, row: 2, kind: "tables" },
  // Col 2 — right grey squares
  { col: 2, row: 0, kind: "text" },
  { col: 2, row: 1, kind: "timeSeries" },
  { col: 2, row: 2, kind: "text" },
];

const COL_X: [number, number, number] = [C1X, C2X, C3X];
const ROW_Y: [number, number, number] = [R0Y, R1Y, R2Y];

// ─── Sub-components ──────────────────────────────────────────────────────────

const DataSquare: React.FC<{
  col: 0 | 1 | 2;
  row: 0 | 1 | 2;
  kind: SquareKind;
}> = ({ col, row, kind }) => {
  const x = COL_X[col];
  const y = ROW_Y[row];
  const { bg, fg, label, Icon } = PALETTE[kind];
  const LABEL_FS = 7.2;
  const ICON_SZ = 12;

  return (
    <g>
      <rect x={x} y={y} width={SQ} height={SQ} rx={1.8} fill={bg} />
      {/* Label — top-left of square */}
      <text
        x={x + 4}
        y={y + 4 + LABEL_FS}
        style={{
          fontFamily: "var(--rengo-fonts-body, system-ui, sans-serif)",
          fontSize: `${LABEL_FS}px`,
          fontWeight: 400,
          fill: fg,
          letterSpacing: "-0.36px",
        }}
      >
        {label}
      </text>
      {/* Icon — bottom-left of square (coloured types only) */}
      {Icon && (
        <foreignObject
          x={x + 3}
          y={y + SQ - ICON_SZ - 5}
          width={ICON_SZ}
          height={ICON_SZ}
        >
          <div
            style={{
              width: ICON_SZ,
              height: ICON_SZ,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={ICON_SZ} strokeWidth={1.5} color={fg} aria-hidden />
          </div>
        </foreignObject>
      )}
    </g>
  );
};

// ─── Dotted line presentation props ──────────────────────────────────────────
const D = {
  stroke: LINE_CLR,
  strokeWidth: 1,
  strokeDasharray: "3 3",
  strokeOpacity: 0.65,
};

// ─── Component ────────────────────────────────────────────────────────────────
type AgentsActArtProps = { variant?: "tile" | "compact" };

export const AgentsActArt: React.FC<AgentsActArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isCompact ? "220px" : "320px",
        height: isCompact ? "160px" : "200px",
        margin: "0 auto",
      }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Three-column grid of data-type squares connected by a branching dotted-line tree."
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        {/* ── Dotted connection lines ───────────────────────────────────── */}

        {/* Col1 right → trunk (horizontal stub per row) */}
        <line x1={C1R} y1={R0CY} x2={TX} y2={R0CY} {...D} />
        <line x1={C1R} y1={R1CY} x2={TX} y2={R1CY} {...D} />
        <line x1={C1R} y1={R2CY} x2={TX} y2={R2CY} {...D} />

        {/* Vertical trunk */}
        <line x1={TX} y1={R0CY} x2={TX} y2={R2CY} {...D} />

        {/* Trunk → Col2 left (horizontal stub per row) */}
        <line x1={TX} y1={R0CY} x2={C2L} y2={R0CY} {...D} />
        <line x1={TX} y1={R1CY} x2={C2L} y2={R1CY} {...D} />
        <line x1={TX} y1={R2CY} x2={C2L} y2={R2CY} {...D} />

        {/* Col2 right → Col3 left */}
        <line x1={C2R} y1={R0CY} x2={C3L} y2={R0CY} {...D} />
        <line x1={C2R} y1={R1CY} x2={C3L} y2={R1CY} {...D} />
        <line x1={C2R} y1={R2CY} x2={C3L} y2={R2CY} {...D} />

        {/* ── Large coloured squares ────────────────────────────────────── */}
        {GRID.map((sq, i) => (
          <DataSquare key={i} col={sq.col} row={sq.row} kind={sq.kind} />
        ))}
      </svg>
    </div>
  );
};
