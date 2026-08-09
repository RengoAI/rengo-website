import React from "react";

/**
 * "Structure Knowledge" — unstructured material on one side, the same records
 * typed and ordered on the other.
 *
 * A static figure: blocks are drawn twice, scattered on the left and aligned in
 * typed rows on the right, both at full opacity. The input and the result are
 * the two halves of the claim, and showing them side by side states it without
 * the reader having to wait for anything.
 */

const ACCENT = "#0071e3";
const RULE_SOFT = "#a9b7c6";
const INK = "#124476";

const VB_W = 380;

/** Rhombus half-height ÷ half-width, from the deck's isometric geometry. */
const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

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
 * Vertical breathing room between a cube and its band's edges.
 *
 * The pitch is this padding either side of a cube's full drawn height, so this
 * is the single knob for how airy the rows feel: it sets the row spacing, each
 * band's height (the frame pads by half a pitch), and the viewBox height, all
 * of which follow from it.
 */
const ROW_PAD_Y = 6;
const CUBE_H = 2 * R * TOP_RATIO + R * BODY_RATIO;
const ROW_PITCH = CUBE_H + 2 * ROW_PAD_Y;

/** Margin between the frame and the viewBox, top and bottom. */
const FRAME_MARGIN_Y = 14;

/** Placed so the first band's centre sits one half-pitch below the frame top. */
const ROW_TOP_Y = FRAME_MARGIN_Y + ROW_PITCH / 2 - (R * BODY_RATIO) / 2;
const ROW_X = 198;

/**
 * Scatter origins. The y values span the frame's vertical extent so the two
 * halves read as the same height; the x values stay irregular, which is what
 * makes the left side read as unsorted.
 */
const BLOCKS = [
  { id: "a", from: { x: 22, y: 23 }, tag: "Audio" },
  { id: "b", from: { x: 58, y: 73 }, tag: "Embeddings" },
  { id: "c", from: { x: 16, y: 124 }, tag: "Text" },
  { id: "d", from: { x: 62, y: 174 }, tag: "Time series" },
].map((b, i) => ({
  ...b,
  to: { x: ROW_X, y: ROW_TOP_Y + i * ROW_PITCH },
}));

/** The ordered frame starts clear of the scatter's right edge so the two zones
 *  read as distinct halves with a wider gutter at the center divide. */
const GRID_X = 172;
const GRID_W = 156;

/**
 * The divider sits midway between the two halves' facing edges, so each side is
 * the same distance from it. The right-hand edge is the dashed frame, not the
 * first cube — the frame is drawn, so it is what the eye measures from.
 *
 * Derived rather than offset from GRID_X: a fixed offset drifts out of balance
 * whenever the gutter changes, which is what left the line 73px from one half
 * and 22px from the other.
 */
const SCATTER_RIGHT_EDGE = Math.max(...BLOCKS.map((b) => b.from.x)) + R;
const DIVIDER_X = (SCATTER_RIGHT_EDGE + GRID_X) / 2;

/**
 * A cube's visual centre sits half a body-drop below its drawing origin, so
 * midpoints have to be computed from the centres — using the raw origins put
 * every rule ~9px high, which read as uneven spacing.
 */
const rowCentre = (i: number) =>
  ROW_TOP_Y + i * ROW_PITCH + (R * BODY_RATIO) / 2;

const ROW_RULES = [0, 1, 2].map((i) => (rowCentre(i) + rowCentre(i + 1)) / 2);

/**
 * Frame bounds derived from the rows it contains.
 *
 * The top and bottom padding is half a row pitch, which makes the four bands
 * the rules divide the frame into exactly ROW_PITCH tall each — and therefore
 * puts every cube dead centre in its own band. A fixed padding instead
 * stretched only the outer two bands and pushed the first and last cubes off
 * centre by the difference.
 */
const GRID_Y = rowCentre(0) - ROW_PITCH / 2;
const GRID_H = rowCentre(3) + ROW_PITCH / 2 - GRID_Y;

/** Tall enough for the frame plus its margin, so the frame stays centred
 *  vertically however the pitch changes. */
const VB_H = GRID_Y + GRID_H + FRAME_MARGIN_Y;

/**
 * The figure's own bounds. The two halves are positioned relative to each other
 * rather than to the viewBox, so their combined extent is not centred in it —
 * the content sat 25px left of centre. Shifting the whole group by the
 * difference centres it without disturbing the gutter or either half's
 * internal spacing, and it stays centred if the geometry changes again.
 *
 * The left edge is the scatter's outermost cube; the right edge is the frame,
 * since the type tags sit inside it.
 */
const CONTENT_LEFT = Math.min(...BLOCKS.map((b) => b.from.x)) - R;
const CONTENT_RIGHT = GRID_X + GRID_W;
const CENTRE_SHIFT = VB_W / 2 - (CONTENT_LEFT + CONTENT_RIGHT) / 2;

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
      maxWidth: variant === "compact" ? "220px" : "340px",
      /** Matches the viewBox's aspect so the taller rows are not letterboxed. */
      height: variant === "compact" ? "160px" : "192px",
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
        /* Both halves render at full, constant opacity. The input and the
           result are the two halves of the claim, and the figure reads as a
           single static composition — dimming either one made the tile flicker
           between states rather than simply showing both. */
      `}</style>

      {/* Shifted so the figure sits centred in the viewBox; see CENTRE_SHIFT. */}
      <g transform={`translate(${CENTRE_SHIFT} 0)`}>
        {/* Ordered half: frame, row rules, aligned blocks and type tags. */}
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

        {/* The divide between the two halves, in the same soft slate as the cube
        edges so it reads as part of the composition. */}
        <line
          x1={DIVIDER_X}
          x2={DIVIDER_X}
          y1={GRID_Y}
          y2={GRID_Y + GRID_H}
          stroke={RULE_SOFT}
          strokeOpacity={0.55}
          strokeWidth={1.25}
        />

        {/* Scattered half, drawn last so it sits above the divider. */}
        <g>
          {BLOCKS.map((b) => (
            <Block key={`from-${b.id}`} cx={b.from.x} cy={b.from.y} r={R} />
          ))}
        </g>
      </g>
    </svg>
  </div>
);
