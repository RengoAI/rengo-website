import React from "react";

/**
 * "Structure Knowledge" — unstructured material on one side, the same records
 * typed and ordered on the other.
 *
 * Blocks are drawn twice, scattered on the left and aligned in typed rows on
 * the right. Both halves stay visible for the whole cycle and trade emphasis
 * as a sweep passes: the input and the result are the two halves of the claim,
 * so hiding either would leave the tile telling half a story.
 *
 * Two positioned copies rather than an animated transform is deliberate —
 * transforms on SVG <g> interpolate inconsistently across browsers, and
 * percentage keyframes on them landed mid-ease rather than on the intended
 * plateau.
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
 *
 * Every block carries a type in the ordered state: an untagged block reads as
 * leftover rather than as structured, which undercuts the whole point. One
 * block per row, so each row is a labelled record instead of a pair.
 */
/**
 * Ordered rows: even pitch, first row's drawing origin. The pitch has to clear
 * a cube's full drawn height (top rhombus half + body drop ≈ 26) or the rows
 * visibly overlap — the body of one dropping into the cap of the next.
 */
const ROW_PITCH = 38;
const ROW_TOP_Y = 34;
const ROW_X = 166;

const BLOCKS = [
  { id: "a", from: { x: 34, y: 28 }, tag: "Emails" },
  { id: "b", from: { x: 74, y: 56 }, tag: "PDFs" },
  { id: "c", from: { x: 28, y: 88 }, tag: "Excel" },
  { id: "d", from: { x: 78, y: 118 }, tag: "Ledger" },
].map((b, i) => ({
  ...b,
  to: { x: ROW_X, y: ROW_TOP_Y + i * ROW_PITCH },
}));

/** The ordered frame starts clear of the scatter's right edge (78 + R = 93),
 *  so with both halves permanently visible the two zones stay legible. */
const GRID_X = 140;
const GRID_W = 156;

/**
 * A cube's visual centre sits half a body-drop below its drawing origin, so
 * midpoints have to be computed from the centres — using the raw origins put
 * every rule ~9px high, which read as uneven spacing.
 */
const rowCentre = (i: number) =>
  ROW_TOP_Y + i * ROW_PITCH + (R * BODY_RATIO) / 2;

const ROW_RULES = [0, 1, 2].map((i) => (rowCentre(i) + rowCentre(i + 1)) / 2);

/** Frame bounds derived from the rows it contains, so nothing overflows. */
const GRID_Y = rowCentre(0) - R * TOP_RATIO - (R * BODY_RATIO) / 2 - 12;
const GRID_H =
  rowCentre(3) + (R * BODY_RATIO) / 2 + R * TOP_RATIO + 12 - GRID_Y;

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
      aria-label="Scattered records on the left, the same records as typed ordered rows on the right."
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
        /* Both sides stay on screen for the whole cycle — the input and the
           result are the two halves of the claim, so hiding either leaves the
           tile telling half a story. They trade emphasis instead: each dims to
           a legible floor rather than to zero. */
        @keyframes rengo-act-scattered {
          0%, 22%   { opacity: 1; }
          42%, 84%  { opacity: 0.34; }
          98%, 100% { opacity: 1; }
        }
        @keyframes rengo-act-ordered {
          0%, 22%   { opacity: 0.42; }
          42%, 84%  { opacity: 1; }
          98%, 100% { opacity: 0.42; }
        }
        .rengo-act-scattered {
          animation: rengo-act-scattered ${CYCLE}s ease-in-out infinite;
        }
        .rengo-act-ordered {
          animation: rengo-act-ordered ${CYCLE}s ease-in-out infinite;
        }
        /* At rest, both halves are visible with the ordered side leading. */
        @media (prefers-reduced-motion: reduce) {
          .rengo-act-scattered { animation: none; opacity: 0.34; }
          .rengo-act-ordered { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Ordered state: frame, row rules, aligned blocks and type tags. */}
      <g className="rengo-act-ordered">
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
          <Block
            key={`to-${b.id}`}
            cx={b.to.x}
            cy={b.to.y}
            r={R}
            accent={i === 0}
          />
        ))}
        {BLOCKS.map((b) => (
          <text
            key={`tag-${b.id}`}
            className="rengo-act-tag"
            x={b.to.x + R + 10}
            y={b.to.y + (R * BODY_RATIO) / 2}
            dominantBaseline="middle"
            fill={INK}
            fillOpacity={0.75}
          >
            {b.tag}
          </text>
        ))}
      </g>

      {/* The divide between the two halves. Always drawn, in the same soft
        slate as the cube edges, so it reads as part of the composition rather
        than as a moving highlight. */}
      <line
        x1={GRID_X - 22}
        x2={GRID_X - 22}
        y1={GRID_Y}
        y2={GRID_Y + GRID_H}
        stroke={RULE_SOFT}
        strokeOpacity={0.55}
        strokeWidth={1.25}
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
