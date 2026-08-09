import React from "react";

/**
 * "Your data stays yours" — a sealed boundary around the firm's own data.
 *
 * The model sits outside; the data sits inside; requests cross inward and
 * answers cross back out, but the records themselves never leave. A probe
 * travels down to the boundary, is stamped, and returns — nothing continues
 * past it.
 *
 * The claim comes from the deck's governance slide: no training on customer
 * data, isolation enforced at the storage layer. Drawn in the same flat
 * isometric language as the sibling tiles so the row still reads as one system.
 */

const ACCENT = "#0071e3";
const RULE = "#d3dde1";
const RULE_SOFT = "#a9b7c6";
const INK = "#124476";

const VB_W = 320;
const VB_H = 190;

const TOP_RATIO = 48.0 / 84.2;
const BODY_RATIO = 48.8 / 42.1;

const CYCLE = 6.5;

/** Where the boundary is drawn — the line nothing crosses outward. */
const SEAL_Y = 92;

/** The vault: records held inside the firm's boundary, set below the seal so
 *  the two read as separate elements rather than one box. */
const VAULT_X = 60;
const VAULT_Y = SEAL_Y + 12;
const VAULT_W = 200;
const VAULT_H = 68;

const MODEL = { x: 160, y: 34, r: 24 };

/** Records inside the vault, as small isometric blocks. */
const RECORDS = [
  { id: "r1", x: 96, y: 124 },
  { id: "r2", x: 136, y: 124 },
  { id: "r3", x: 176, y: 124 },
  { id: "r4", x: 216, y: 124 },
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
      strokeWidth={Math.max(0.8, r * 0.05)}
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

type AgentsSecureArtProps = {
  variant?: "tile" | "compact";
};

export const AgentsSecureArt: React.FC<AgentsSecureArtProps> = ({
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
      aria-label="Firm data held inside a sealed boundary, with the model outside it."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <style>{`
        /* font-size via CSS: a font-size attribute loses to inherited CSS. */
        .rengo-sec-label {
          font-family: var(--chakra-fonts-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.6px;
        }
        /* The probe travels down to the seal and back — it never crosses.
           The shift must stop short of the boundary: the dot rests at
           SEAL_Y - 12, so travelling a full 12px would land it exactly on the
           line and anything more would put it inside, which reads as a breach. */
        @keyframes rengo-sec-probe {
          0%, 6%    { transform: translateY(0); opacity: 0; }
          14%       { opacity: 1; }
          40%, 52%  { transform: translateY(9px); opacity: 1; }
          78%       { transform: translateY(0); opacity: 1; }
          88%, 100% { transform: translateY(0); opacity: 0; }
        }
        /* The seal brightens on contact, then settles. */
        @keyframes rengo-sec-seal {
          0%, 34%   { stroke-opacity: 0.45; }
          44%, 56%  { stroke-opacity: 1; }
          70%, 100% { stroke-opacity: 0.45; }
        }
        .rengo-sec-probe {
          animation: rengo-sec-probe ${CYCLE}s ease-in-out infinite;
          transform-box: view-box;
        }
        .rengo-sec-seal {
          animation: rengo-sec-seal ${CYCLE}s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rengo-sec-probe { animation: none; opacity: 0; }
          .rengo-sec-seal { animation: none; stroke-opacity: 0.8; }
        }
      `}</style>

      {/* The model, outside the boundary. */}
      <Cube cx={MODEL.x} cy={MODEL.y} r={MODEL.r} />
      <text
        className="rengo-sec-label"
        x={MODEL.x}
        y={MODEL.y - MODEL.r * TOP_RATIO - 9}
        textAnchor="middle"
        fill={INK}
        fillOpacity={0.7}
      >
        MODEL
      </text>

      {/* The request reaching down toward the boundary. */}
      <g className="rengo-sec-probe">
        <line
          x1={MODEL.x}
          x2={MODEL.x}
          y1={MODEL.y + MODEL.r * BODY_RATIO + 4}
          y2={SEAL_Y - 12}
          stroke={ACCENT}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <circle cx={MODEL.x} cy={SEAL_Y - 12} r={2.5} fill={ACCENT} />
      </g>

      {/* The sealed boundary. Solid, unlike every other run in the set —
        a dashed line would read as permeable, which is the opposite claim. */}
      <line
        className="rengo-sec-seal"
        x1={VAULT_X - 6}
        x2={VAULT_X + VAULT_W + 6}
        y1={SEAL_Y}
        y2={SEAL_Y}
        stroke={ACCENT}
        strokeWidth={1.75}
      />

      {/* The vault holding the records. */}
      <rect
        x={VAULT_X}
        y={VAULT_Y}
        width={VAULT_W}
        height={VAULT_H}
        rx={3}
        fill="rgba(0,113,227,0.03)"
        stroke={RULE_SOFT}
        strokeOpacity={0.55}
        strokeDasharray="3 3"
      />
      {RECORDS.map((rec) => (
        <Cube key={rec.id} cx={rec.x} cy={rec.y} r={13} />
      ))}
      <text
        className="rengo-sec-label"
        x={VAULT_X + VAULT_W / 2}
        y={VAULT_Y + VAULT_H + 14}
        textAnchor="middle"
        fill={INK}
        fillOpacity={0.7}
      >
        YOUR DATA
      </text>

      {/* Side rails, closing the boundary visually on both flanks. */}
      {[VAULT_X - 6, VAULT_X + VAULT_W + 6].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={SEAL_Y}
          y2={SEAL_Y + 10}
          stroke={RULE}
          strokeWidth={1.25}
        />
      ))}
    </svg>
  </div>
);
