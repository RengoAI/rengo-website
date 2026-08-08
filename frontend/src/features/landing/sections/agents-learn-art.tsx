import React from "react";

/**
 * "Agents learn" — context accumulating across passes.
 *
 * A pass sweeps the DO → STORE → ACT run each cycle; on completion a bar is
 * added to a stack that persists, and the next pass begins with that stack
 * already taller. The claim is a ratchet, not a wheel: each decision becomes
 * context for the next, so the still frame has to show how much has been
 * stored. Four passes, then reset.
 */

const ACCENT = "#0071e3";
const RULE = "#d3dde1";
const RULE_SOFT = "#a9b7c6";
const INK = "#124476";

const VB_W = 320;
const VB_H = 190;

const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

/**
 * One pass; the stack has PASSES bars, so the full loop is PASSES × PASS.
 * Kept short deliberately: at 6s per pass the full accumulation took 24s, so a
 * visitor scrolling by only ever saw an empty stack — the one thing the tile
 * exists to show.
 */
const PASS = 3.2;
const PASSES = 4;
const LOOP = PASS * PASSES;

const NODE_R = 26;
const NODE_Y = 54;
const NODES = [
  { id: "do", x: 52, label: "DO" },
  { id: "store", x: 160, label: "STORE" },
  { id: "act", x: 268, label: "ACT" },
] as const;

const Cube: React.FC<{
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
      strokeWidth={Math.max(0.9, r * 0.045)}
      stroke={accent ? ACCENT : RULE_SOFT}
    >
      <polygon
        points={`${cx - r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx - r},${cy + body}`}
        fill={accent ? "rgba(0,113,227,0.16)" : "rgba(118,140,166,0.12)"}
      />
      <polygon
        points={`${cx + r},${cy} ${cx},${cy + ry} ${cx},${cy + ry + body} ${cx + r},${cy + body}`}
        fill={accent ? ACCENT : "rgba(118,140,166,0.24)"}
      />
      <polygon
        points={`${cx},${cy - ry} ${cx + r},${cy} ${cx},${cy + ry} ${cx - r},${cy}`}
        fill="#ffffff"
      />
    </g>
  );
};

/** Vertical centre of a cube, for aligning runs and labels to its waist. */
const centreY = (cy: number, r: number) => cy + (r * BODY_RATIO) / 2;

const RUN_Y = centreY(NODE_Y, NODE_R);

/** The memory stack: bars fill bottom-up, one per completed pass, centred
 *  under the STORE node it belongs to. */
const STACK_W = 96;
const STACK_X = 160 - STACK_W / 2;
const BAR_H = 9;
const BAR_GAP = 4;
const STACK_BASE = 160;

type AgentsLearnArtProps = {
  variant?: "tile" | "compact";
};

export const AgentsLearnArt: React.FC<AgentsLearnArtProps> = ({
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
      aria-label="An agent repeating a task, with stored context accumulating each pass."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <style>{`
        /* font-size must come from CSS: a font-size attribute loses to any
           inherited CSS font rule, which rendered these labels at 16px. */
        .rengo-learn-label {
          font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.6px;
        }
        @keyframes rengo-learn-run {
          0%, 4%   { stroke-dashoffset: 200; }
          70%, 100% { stroke-dashoffset: 0; }
        }
        /* Each bar appears at the end of its own pass and stays for the rest
           of the loop, so the stack reads as growing rather than blinking. */
        .rengo-learn-run {
          animation: rengo-learn-run ${PASS}s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rengo-learn-run { animation: none; stroke-dashoffset: 0; }
          .rengo-learn-bar { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Resting run through the three stages. */}
      <path
        d={`M${NODES[0].x + NODE_R} ${RUN_Y} H${NODES[2].x - NODE_R}`}
        stroke={RULE}
        strokeWidth="1.25"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* The pass sweeping along it. */}
      <path
        className="rengo-learn-run"
        d={`M${NODES[0].x + NODE_R} ${RUN_Y} H${NODES[2].x - NODE_R}`}
        stroke={ACCENT}
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="200"
      />

      {NODES.map((n, i) => (
        <g key={n.id}>
          <Cube cx={n.x} cy={NODE_Y} r={NODE_R} accent={i === 1} />
          <text
            className="rengo-learn-label"
            x={n.x}
            y={NODE_Y - NODE_R * TOP_RATIO - 9}
            textAnchor="middle"
            fill={INK}
            fillOpacity={0.7}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Feedback leg: what STORE holds feeds the next DO. */}
      <path
        d={`M${NODES[1].x} ${RUN_Y + NODE_R * BODY_RATIO + 6}
            V${STACK_BASE - 4}`}
        stroke={RULE}
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* The accumulating stack. */}
      <rect
        x={STACK_X}
        y={STACK_BASE - PASSES * (BAR_H + BAR_GAP) - 6}
        width={STACK_W}
        height={PASSES * (BAR_H + BAR_GAP) + 10}
        rx={3}
        fill="none"
        stroke={RULE_SOFT}
        strokeOpacity={0.45}
        strokeDasharray="3 3"
      />
      {Array.from({ length: PASSES }, (_, i) => {
        const y = STACK_BASE - (i + 1) * (BAR_H + BAR_GAP);
        return (
          <rect
            key={i}
            className={`rengo-learn-bar rengo-learn-bar-${i}`}
            x={STACK_X + 6}
            y={y}
            width={STACK_W - 12}
            height={BAR_H}
            rx={1.5}
            fill={i === PASSES - 1 ? ACCENT : "rgba(118,140,166,0.34)"}
          />
        );
      })}
      {/* One keyframe set per bar: bar i turns on 70% of the way through pass
        i (when that pass's token lands) and stays on until the loop resets.
        Percentages are of the whole LOOP, so they are written out rather than
        derived — a shared keyframe with negative delays proved hard to read. */}
      <style>{`
        .rengo-learn-bar { opacity: 0; }
        ${Array.from({ length: PASSES }, (_, i) => {
          const on = (((i + 0.7) * PASS) / LOOP) * 100;
          return `
          @keyframes rengo-learn-bar-k${i} {
            0%, ${on.toFixed(2)}%   { opacity: 0; }
            ${(on + 0.01).toFixed(2)}%, 100% { opacity: 1; }
          }
          .rengo-learn-bar-${i} {
            animation: rengo-learn-bar-k${i} ${LOOP}s linear infinite;
          }`;
        }).join("\n")}
      `}</style>

      <text
        className="rengo-learn-label"
        x={STACK_X + STACK_W / 2}
        y={STACK_BASE + 16}
        textAnchor="middle"
        fill={INK}
        fillOpacity={0.7}
      >
        CONTEXT
      </text>
    </svg>
  </div>
);
