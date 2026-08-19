import React from "react";

/**
 * "Reduce days of work to hours" bento art.
 *
 * Inline SVG from collapsing_stack_grey_to_blue_dissolve.svg.
 * 26 isometric sheets (--i 0–25) driven by CSS custom-property stagger:
 *
 *   Phase 1  0 – 15 %   hold: tall grey spread
 *   Phase 2  15 – 45 %  compress + grey → blue
 *   Phase 3  45 – 65 %  hold: short blue stack
 *   Phase 4  65 – 90 %  expand + blue → grey
 *   Phase 5  90 – 100 % hold: tall grey spread (match phase 1)
 *
 * Total cycle: 7 s.
 * Per-sheet stagger delay: i × 12 ms  (last sheet 300 ms behind first).
 *
 * Geometry:
 *   SHEETS = 26, SPREAD_STEP = 9 px
 *   Spread height = 25 × 9 = 225 px  →  top of stack at y = 330 − 225 = 105
 *   Diamond peak  = 105 − 34 = 71    →  fits viewBox "0 0 680 400" with room
 *   Compressed    = 25 × 2 = 50 px   →  indicator scale k ≈ 0.222
 */

// ─── colour palette ──────────────────────────────────────────────────────────
const GREY_FILL    = "rgb(205, 215, 222)";
const BLUE_FILL    = "rgb(169, 212, 254)";
const STROKE       = "rgb(121, 142, 167)";
const GUIDE_STROKE = "rgb(169, 183, 198)";

// ─── sheet geometry ──────────────────────────────────────────────────────────
const SHEETS        = 26;
const SPREAD_STEP   = 9;   // px between sheets when spread
const COMPRESS_STEP = 2;   // px between sheets when compressed
// Indicator line spans from base (y=330) to top of spread (y=85)
const INDICATOR_TOP    = 330 - (SHEETS - 1) * SPREAD_STEP;  // 85
const INDICATOR_HEIGHT = (SHEETS - 1) * SPREAD_STEP;         // 245
const COMPRESS_K = ((SHEETS - 1) * COMPRESS_STEP / INDICATOR_HEIGHT).toFixed(3); // ≈ 0.286

// Ghost diamond: top is at INDICATOR_TOP, diamond half-height = 34
const GHOST_CENTER_Y = INDICATOR_TOP;                  // 85
const GHOST_PEAK_Y   = INDICATOR_TOP - 34;             // 51
const GHOST_TROUGH_Y = INDICATOR_TOP + 34;             // 119
// Back-corner guide ends at the back trough of the ghost diamond (y = INDICATOR_TOP + 34)

const STYLES = `
  @keyframes csSheet {
    0%,  15%  { transform: translateY(calc(var(--i) * -${SPREAD_STEP}px));
                fill: ${GREY_FILL}; }
    45%, 65%  { transform: translateY(calc(var(--i) * -${COMPRESS_STEP}px));
                fill: ${BLUE_FILL}; }
    90%, 100% { transform: translateY(calc(var(--i) * -${SPREAD_STEP}px));
                fill: ${GREY_FILL}; }
  }

  @keyframes csIndicator {
    0%,  15%  { transform: scaleY(1); }
    45%, 65%  { transform: scaleY(${COMPRESS_K}); }
    90%, 100% { transform: scaleY(1); }
  }

  .cs-sheet {
    animation: csSheet 7s ease-in-out infinite;
    animation-delay: calc(var(--i) * 12ms);
  }
  .cs-indicator {
    animation: csIndicator 7s ease-in-out infinite;
    transform-origin: 530px 330px;
  }
`;

export const CollapsingStackArt: React.FC = () => (
  <svg
    width="100%"
    viewBox="0 0 680 400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    focusable="false"
  >
    <style>{STYLES}</style>

    <defs>
      {/* base isometric diamond — all sheets share this path */}
      <path id="cs-sh" d="M210 330 L340 296 L470 330 L340 364 Z" />
    </defs>

    {/* ghost bounding-box guides — mark the full spread extent */}
    <path
      d={`M210 ${GHOST_CENTER_Y} L340 ${GHOST_PEAK_Y} L470 ${GHOST_CENTER_Y} L340 ${GHOST_TROUGH_Y} Z`}
      fill="none"
      stroke={GUIDE_STROKE}
      strokeWidth={1}
      strokeDasharray="2 4"
      opacity={0.55}
    />
    <line x1="210" y1="330" x2="210" y2={GHOST_CENTER_Y} stroke={GUIDE_STROKE} strokeWidth={1} strokeDasharray="2 4" opacity={0.55} />
    <line x1="470" y1="330" x2="470" y2={GHOST_CENTER_Y} stroke={GUIDE_STROKE} strokeWidth={1} strokeDasharray="2 4" opacity={0.55} />
    <line x1="340" y1="364" x2="340" y2={GHOST_TROUGH_Y} stroke={GUIDE_STROKE} strokeWidth={1} strokeDasharray="2 4" opacity={0.55} />

    {/* 36 animated sheets */}
    {Array.from({ length: SHEETS }, (_, i) => (
      <use
        key={i}
        href="#cs-sh"
        className="cs-sheet"
        style={{ "--i": i } as React.CSSProperties}
        stroke={STROKE}
        strokeWidth={1}
      />
    ))}

    {/* right-side height indicator */}
    <line
      x1="530" y1="330" x2="530" y2={INDICATOR_TOP}
      className="cs-indicator"
      stroke={STROKE}
      strokeWidth={1}
      strokeDasharray="2 4"
    />
    {/* fixed end-caps */}
    <line x1="522" y1={INDICATOR_TOP} x2="538" y2={INDICATOR_TOP} stroke={STROKE} strokeWidth={1} />
    <line x1="522" y1="330"           x2="538" y2="330"           stroke={STROKE} strokeWidth={1} />
  </svg>
);
