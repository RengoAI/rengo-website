import {
  AudioLines,
  ChartNoAxesCombined,
  ScanText,
  Table,
  type LucideIcon,
} from "lucide-react";
import React from "react";

/**
 * "Structure knowledge" — unstructured isometric blocks on the left, the same
 * modalities as typed tiles in the ordered frame on the right.
 */

const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;
const CUBE_R = 15;

/** Isometric block for the scattered (unordered) half. */
const ScatterBlock: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const r = CUBE_R;
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  return (
    <g
      strokeLinejoin="round"
      strokeWidth={Math.max(0.8, r * 0.05)}
      stroke={RULE_SOFT}
    >
      <polygon
        points={`${cx - r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx - r},${cy + body}`}
        fill="rgba(118,140,166,0.12)"
      />
      <polygon
        points={`${cx + r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx + r},${cy + body}`}
        fill="rgba(118,140,166,0.24)"
      />
      <polygon
        points={`${cx},${cy - ry} ${cx + r},${cy} ${cx},${cy + ry} ${cx - r},${cy}`}
        fill="#ffffff"
      />
    </g>
  );
};

const RULE_SOFT = "#a9b7c6";
const GLYPH_STROKE = "#768ca6";
const INK = "#124476";
/** Bento vendor-tile styling (slate.10 surface, slate.30 border, 8px radius). */
const TILE_FILL = "#f5f5f6";
const TILE_BORDER = "#d3dde1";

const VB_W = 380;
/** Sized to read like the 54px vendor chips in the bento, scaled to this figure. */
const TILE_SIZE = 36;
const TILE_RX = 6;

type ModalityKind = "audio" | "tables" | "text" | "timeSeries";

const MODALITY_ICONS: Record<ModalityKind, LucideIcon> = {
  audio: AudioLines,
  tables: Table,
  text: ScanText,
  timeSeries: ChartNoAxesCombined,
};

const MODALITY_ICON_SIZE = 18;

const ModalityTile: React.FC<{
  cx: number;
  cy: number;
  kind: ModalityKind;
  shadowFilterId?: string;
}> = ({ cx, cy, kind, shadowFilterId }) => {
  const half = TILE_SIZE / 2;
  const Icon = MODALITY_ICONS[kind];
  return (
    <g filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}>
      <rect
        x={cx - half}
        y={cy - half}
        width={TILE_SIZE}
        height={TILE_SIZE}
        rx={TILE_RX}
        fill={TILE_FILL}
        stroke={TILE_BORDER}
        strokeWidth={1}
      />
      <foreignObject
        x={cx - half}
        y={cy - half}
        width={TILE_SIZE}
        height={TILE_SIZE}
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            size={MODALITY_ICON_SIZE}
            strokeWidth={1.75}
            color={GLYPH_STROKE}
            aria-hidden
          />
        </div>
      </foreignObject>
    </g>
  );
};

const ROW_PAD_Y = 12;
const ROW_PITCH = TILE_SIZE + 2 * ROW_PAD_Y;
const FRAME_MARGIN_Y = 18;

const ROW_TOP_Y = FRAME_MARGIN_Y + ROW_PITCH / 2;
const ROW_X = 198;

const BLOCKS = [
  {
    id: "a",
    kind: "audio" as ModalityKind,
    from: { x: 22, y: 28 },
    tag: "Audio",
  },
  {
    id: "b",
    kind: "tables" as ModalityKind,
    from: { x: 58, y: 88 },
    tag: "Tables",
  },
  {
    id: "c",
    kind: "text" as ModalityKind,
    from: { x: 16, y: 148 },
    tag: "Text",
  },
  {
    id: "d",
    kind: "timeSeries" as ModalityKind,
    from: { x: 62, y: 212 },
    tag: "Time series",
  },
].map((b, i) => ({
  ...b,
  to: { x: ROW_X, y: ROW_TOP_Y + i * ROW_PITCH },
}));

const GRID_X = 172;
const GRID_W = 156;

const TILE_HALF = TILE_SIZE / 2;
const SCATTER_RIGHT_EDGE = Math.max(...BLOCKS.map((b) => b.from.x)) + CUBE_R;
const DIVIDER_X = (SCATTER_RIGHT_EDGE + GRID_X) / 2;

const rowCentre = (i: number) => ROW_TOP_Y + i * ROW_PITCH;

const ROW_RULES = [0, 1, 2].map((i) => (rowCentre(i) + rowCentre(i + 1)) / 2);

const GRID_Y = rowCentre(0) - ROW_PITCH / 2;
const GRID_H = rowCentre(3) + ROW_PITCH / 2 - GRID_Y;
const VB_H = GRID_Y + GRID_H + FRAME_MARGIN_Y;

const CONTENT_LEFT = Math.min(...BLOCKS.map((b) => b.from.x)) - CUBE_R;
const CONTENT_RIGHT = GRID_X + GRID_W;
const CENTRE_SHIFT = VB_W / 2 - (CONTENT_LEFT + CONTENT_RIGHT) / 2;

type AgentsActArtProps = {
  variant?: "tile" | "compact";
};

export const AgentsActArt: React.FC<AgentsActArtProps> = ({
  variant = "tile",
}) => {
  const tileShadowId = `act-tile-shadow-${React.useId().replace(/:/g, "")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: variant === "compact" ? "220px" : "340px",
        height: variant === "compact" ? "180px" : "220px",
        margin: "0 auto",
      }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Scattered blocks on the left, the same modalities as ordered rows on the right."
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <style>{`
        .rengo-act-tag {
          font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.4px;
        }
      `}</style>

        <defs>
          <filter
            id={tileShadowId}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#213048"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        <g transform={`translate(${CENTRE_SHIFT} 0)`}>
          <g>
            <rect
              x={GRID_X}
              y={GRID_Y}
              width={GRID_W}
              height={GRID_H}
              rx={3}
              fill="none"
              stroke={RULE_SOFT}
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            {ROW_RULES.map((y) => (
              <line
                key={y}
                x1={GRID_X + 8}
                x2={GRID_X + GRID_W - 8}
                y1={y}
                y2={y}
                stroke={RULE_SOFT}
                strokeOpacity={0.4}
              />
            ))}
            {BLOCKS.map((b, i) => (
              <ModalityTile
                key={`to-${b.id}`}
                cx={b.to.x}
                cy={rowCentre(i)}
                kind={b.kind}
                shadowFilterId={tileShadowId}
              />
            ))}
            {BLOCKS.map((b, i) => (
              <text
                key={`tag-${b.id}`}
                className="rengo-act-tag"
                x={b.to.x + TILE_HALF + 10}
                y={rowCentre(i)}
                dominantBaseline="middle"
                fill={INK}
                fillOpacity={0.75}
              >
                {b.tag}
              </text>
            ))}
          </g>

          <line
            x1={DIVIDER_X}
            x2={DIVIDER_X}
            y1={GRID_Y}
            y2={GRID_Y + GRID_H}
            stroke={RULE_SOFT}
            strokeOpacity={0.55}
            strokeWidth={1.25}
          />

          <g>
            {BLOCKS.map((b) => (
              <ScatterBlock key={`from-${b.id}`} cx={b.from.x} cy={b.from.y} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
