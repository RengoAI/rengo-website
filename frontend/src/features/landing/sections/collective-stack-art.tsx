import React from "react";

/**
 * "Unlock collective intelligence" — context accumulating into a shared store.
 *
 * Each pass of work leaves something behind, so the stack is taller than any
 * single contribution to it. That is the compounding claim the label makes, and
 * it is why the figure is a growing stack rather than the vendor logo row it
 * replaces — three logos said "we integrate with AI tools", which is what the
 * "Connect with your systems" tile already says.
 *
 * Drawn in the same vocabulary as its neighbours: slate rules at #a9b7c6,
 * `slate.10` card surfaces on a `slate.30` border, one accent element, and no
 * raster brand assets.
 */

const ACCENT = "#0071e3";
/** Matches agents-act-art rules / divider and manage-agents-art connectors. */
const RULE_SOFT = "#a9b7c6";
const SLATE_30 = "#d3dde1";
const INK = "#124476";

const VB_W = 300;
const VB_H = 190;

/**
 * Layers, oldest at the bottom. `w` widens as the stack grows so the silhouette
 * reads as accumulation even in a still frame — the newest layer is both on top
 * and the broadest.
 */
const LAYERS = [
  { id: "l1", w: 96, label: null },
  { id: "l2", w: 122, label: null },
  { id: "l3", w: 148, label: null },
  { id: "l4", w: 174, label: "This week" },
] as const;

const LAYER_H = 22;
const LAYER_GAP = 7;
const LAYER_RX = 3;

/** Contributions feeding the newest layer, centred on the stack's axis. */
const FEED_SPREAD = 50;
const FEEDS = [
  { id: "f1", dx: -FEED_SPREAD },
  { id: "f2", dx: 0 },
  { id: "f3", dx: FEED_SPREAD },
] as const;

const STACK_CX = VB_W / 2;
const STACK_BOTTOM = 168;
/** High enough that the runs down to the stack are ~24px and read as feeding
 *  in; at 34 they were 10px and the relationship barely registered. */
const FEED_Y = 20;
const FEED_R = 9;

/** Top edge of layer i, counting from the bottom. */
const layerTop = (i: number) =>
  STACK_BOTTOM - (i + 1) * LAYER_H - i * LAYER_GAP;

const TOP_INDEX = LAYERS.length - 1;
const TOP_LAYER_Y = layerTop(TOP_INDEX);

type CollectiveStackArtProps = {
  variant?: "tile" | "compact";
};

export const CollectiveStackArt: React.FC<CollectiveStackArtProps> = ({
  variant = "tile",
}) => (
  <div
    style={{
      width: "100%",
      maxWidth: variant === "compact" ? "220px" : "280px",
      margin: "0 auto",
    }}
  >
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Separate contributions feeding a shared store that grows with each one."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <style>{`
        /* font-size via CSS: the attribute loses to inherited CSS font rules. */
        .rengo-stack-label {
          font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
          font-size: 8.5px;
          letter-spacing: 0.6px;
        }
      `}</style>

      {/* Contributions, and their runs down into the newest layer. */}
      {FEEDS.map((f) => {
        const fx = STACK_CX + f.dx;
        return (
          <g key={f.id}>
            <line
              x1={fx}
              x2={fx}
              y1={FEED_Y + FEED_R + 3}
              y2={TOP_LAYER_Y - 3}
              stroke={RULE_SOFT}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <rect
              x={fx - FEED_R}
              y={FEED_Y - FEED_R}
              width={FEED_R * 2}
              height={FEED_R * 2}
              rx={2}
              fill="#f5f5f6"
              stroke={RULE_SOFT}
              strokeWidth={1}
            />
          </g>
        );
      })}

      {/* The stack. The newest layer carries the accent; the ones beneath it
        are what earlier work already left behind. */}
      {LAYERS.map((l, i) => {
        const isTop = i === TOP_INDEX;
        return (
          <rect
            key={l.id}
            x={STACK_CX - l.w / 2}
            y={layerTop(i)}
            width={l.w}
            height={LAYER_H}
            rx={LAYER_RX}
            fill={isTop ? "rgba(0,113,227,0.10)" : "#f5f5f6"}
            stroke={isTop ? ACCENT : SLATE_30}
            strokeWidth={1}
          />
        );
      })}

      {/* Caption on the newest layer only, so the eye reads top-down as recent
        work landing on top of everything already there. */}
      <text
        className="rengo-stack-label"
        x={STACK_CX}
        y={TOP_LAYER_Y + LAYER_H / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ACCENT}
      >
        {LAYERS[TOP_INDEX].label}
      </text>

      <text
        className="rengo-stack-label"
        x={STACK_CX}
        y={STACK_BOTTOM + 14}
        textAnchor="middle"
        fill={INK}
        fillOpacity={0.7}
      >
        SHARED CONTEXT
      </text>
    </svg>
  </div>
);
