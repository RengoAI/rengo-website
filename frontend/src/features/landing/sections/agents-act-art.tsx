import React from "react";

/**
 * "Agents act" — unstructured material arriving, then snapped into order.
 *
 * Blocks are drawn twice, once scattered and once aligned in typed rows, and
 * the two states cross-fade as a sweep passes. The transformation is the point:
 * agents impose structure on material that arrived without any.
 *
 * Cross-fading two static states rather than animating a CSS transform is
 * deliberate — transforms on SVG <g> interpolate inconsistently across
 * browsers, and percentage keyframes on them landed mid-ease rather than on
 * the intended plateau. Two positioned copies are unambiguous.
 */

const ACCENT = "#0071e3";
const RULE_SOFT = "#a9b7c6";
const INK = "#124476";

const VB_W = 320;
const VB_H = 190;

/** Rhombus half-height ÷ half-width, from the deck's isometric geometry. */
const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

const CYCLE = 7.5;
const R = 15;

/** A small isometric block; `r` is the top face's half-width. */
const Block: React.FC<{
  cx: number;
  cy: number;
  r: number;
  accent?: boolean;
}> = ({ cx, cy, r, accent = false }) => {
  const ry = r * TOP_RATIO;
  const body = r * BODY_RATIO;
  return (
    <g
      strokeLinejoin="round"
      strokeWidth={Math.max(0.8, r * 0.05)}
      stroke={accent ? ACCENT : RULE_SOFT}
    >
      <polygon
        points={`${cx - r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx - r},${cy + body}`}
        fill={accent ? "rgba(0,113,227,0.14)" : "rgba(118,140,166,0.12)"}
      />
      <polygon
        points={`${cx + r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx + r},${cy + body}`}
        fill={accent ? "rgba(0,113,227,0.26)" : "rgba(118,140,166,0.24)"}
      />
      <polygon
        points={`${cx},${cy - ry} ${cx + r},${cy} ${cx},${cy + ry} ${cx - r},${cy}`}
        fill="#ffffff"
      />
    </g>
  );
};

/**
 * Scattered origins and ordered destinations. Both are hand-placed so the
 * composition stays balanced and the animation is identical on every load.
 */
const BLOCKS = [
  { id: "a", from: { x: 46, y: 30 }, to: { x: 150, y: 42 }, tag: "Emails" },
  { id: "b", from: { x: 88, y: 60 }, to: { x: 252, y: 42 }, tag: null },
  { id: "c", from: { x: 38, y: 92 }, to: { x: 150, y: 90 }, tag: "PDFs" },
  { id: "d", from: { x: 96, y: 120 }, to: { x: 252, y: 90 }, tag: null },
  { id: "e", from: { x: 56, y: 148 }, to: { x: 150, y: 138 }, tag: "Excel" },
  { id: "f", from: { x: 104, y: 24 }, to: { x: 252, y: 138 }, tag: null },
] as const;

const GRID_X = 124;
const GRID_W = 172;
const ROW_RULES = [66, 114];

type AgentsActArtProps = {
  variant?: "tile" | "compact";
};

export const AgentsActArt: React.FC<AgentsActArtProps> = ({
  variant = "tile",
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: variant === "compact" ? "220px" : "300px",
      height: variant === "compact" ? "150px" : "180px",
      margin: "0 auto",
    }}
  >
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Scattered records being organised into typed, ordered rows."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <style>{`
        /* font-size must come from CSS: a font-size attribute loses to any
           inherited CSS font rule, which rendered these labels at 16px. */
        .rengo-act-tag {
          font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.4px;
        }
        @keyframes rengo-act-scattered {
          0%, 26%   { opacity: 1; }
          40%, 88%  { opacity: 0; }
          98%, 100% { opacity: 1; }
        }
        @keyframes rengo-act-ordered {
          0%, 30%   { opacity: 0; }
          46%, 86%  { opacity: 1; }
          96%, 100% { opacity: 0; }
        }
        @keyframes rengo-act-sweep {
          0%, 16%  { opacity: 0; }
          26%      { opacity: 1; }
          44%, 100% { opacity: 0; }
        }
        .rengo-act-scattered {
          animation: rengo-act-scattered ${CYCLE}s ease-in-out infinite;
        }
        .rengo-act-ordered {
          animation: rengo-act-ordered ${CYCLE}s ease-in-out infinite;
        }
        .rengo-act-sweep {
          animation: rengo-act-sweep ${CYCLE}s ease-in-out infinite;
        }
        /* Rest on the ordered state: it is the one that carries the meaning. */
        @media (prefers-reduced-motion: reduce) {
          .rengo-act-scattered { animation: none; opacity: 0; }
          .rengo-act-ordered { animation: none; opacity: 1; }
          .rengo-act-sweep { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Ordered state: frame, row rules, aligned blocks and type tags. */}
      <g className="rengo-act-ordered">
        <rect
          x={GRID_X}
          y={18}
          width={GRID_W}
          height={154}
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
          <Block
            key={`to-${b.id}`}
            cx={b.to.x}
            cy={b.to.y}
            r={R}
            accent={i === 0}
          />
        ))}
        {BLOCKS.filter((b) => b.tag).map((b) => (
          <text
            key={`tag-${b.id}`}
            className="rengo-act-tag"
            x={b.to.x + R + 6}
            y={b.to.y + (R * BODY_RATIO) / 2}
            dominantBaseline="middle"
            fill={INK}
            fillOpacity={0.75}
          >
            {b.tag}
          </text>
        ))}
      </g>

      {/* The organising sweep, crossing into the frame. */}
      <line
        className="rengo-act-sweep"
        x1={GRID_X - 10}
        x2={GRID_X - 10}
        y1={22}
        y2={168}
        stroke={ACCENT}
        strokeWidth={1.5}
      />

      {/* Scattered state, drawn last so it sits above while visible. */}
      <g className="rengo-act-scattered">
        {BLOCKS.map((b) => (
          <Block key={`from-${b.id}`} cx={b.from.x} cy={b.from.y} r={R} />
        ))}
      </g>
    </svg>
  </div>
);
