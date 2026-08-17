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
 * coloured modality pills; icon + label centred inside each pill.
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

const PILL_W = 104;
const PILL_H = 34;
const PILL_RX = 5;
const PILL_ICON_SIZE = 13;
const PILL_FONT_SIZE = 9.5;

/** Rounded pill with icon + label centred as a group. */
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
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Icon size={PILL_ICON_SIZE} strokeWidth={1.75} color={fg} aria-hidden />
          <span
            style={{
              fontFamily: "var(--chakra-fonts-body, system-ui, sans-serif)",
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
 * Modalities ordered top-to-bottom (matching Figma reference).
 * cubeX alternates between two columns, echoing the scattered-nodes feel.
 */
const BLOCKS: Array<{ kind: ModalityKind; cubeX: number }> = [
  { kind: "text", cubeX: 38 },
  { kind: "tables", cubeX: 80 },
  { kind: "audio", cubeX: 38 },
  { kind: "timeSeries", cubeX: 80 },
];

const VB_H = rowCY(BLOCKS.length - 1) + ROW_PITCH / 2 + 12;

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
        aria-label="Cube nodes connected by dotted lines to typed modality pills."
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        {/* Horizontal dotted lines: cube right-face centre → pill left edge */}
        {BLOCKS.map((b, i) => (
          <line
            key={`line-${b.kind}`}
            x1={b.cubeX + CUBE_R}
            y1={rowCY(i)}
            x2={PILL_LEFT}
            y2={rowCY(i)}
            stroke={RULE_SOFT}
            strokeWidth={1}
            strokeDasharray="3 3"
            strokeOpacity={0.6}
          />
        ))}

        {/* Isometric cube nodes */}
        {BLOCKS.map((b, i) => (
          <ScatterBlock key={`cube-${b.kind}`} cx={b.cubeX} midY={rowCY(i)} />
        ))}

        {/* Coloured modality pills */}
        {BLOCKS.map((b, i) => (
          <ModalityPill
            key={`pill-${b.kind}`}
            cx={PILL_CX}
            cy={rowCY(i)}
            kind={b.kind}
          />
        ))}
      </svg>
    </div>
  );
};
