import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

/** Diamond edge length in px. The field repeats every 2× this. */
const TILE = 74;
const PERIOD = TILE * 2;
const ANGLE = Math.PI / 6;
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);

/** Diagonal drift, px / second. */
const DRIFT = 9;
/** Cells drawn around the hovered cell (radius). */
const HOVER_RADIUS = 3.5;
/** Peak scale multiplier for the hovered cell itself. */
const CELL_MAX_SCALE = 0.30;
/**
 * Max shrink for surrounding cells (fraction of original size).
 * Nearest cells shrink this much; farther cells shrink less; Perlin noise adds
 * organic variation so no two cells move by the same amount.
 */
const SURROUND_MAX_SHRINK = 0.18;
/** ms to wait after hover enters a cell before the animation activates. */
const HOVER_DELAY_MS = 0;
/** ms over which the animation eases from 0 → 1 after the delay. */
const ANIM_IN_MS = 280;
/** ms for the fade-out when the pointer leaves. */
const ANIM_OUT_MS = 180;
/** Number of previously visited cells whose labels appear in the trail. */
const TRAIL_LENGTH = 12;
/** Perlin spatial and temporal frequencies. */
const NOISE_SPACE = 0.38;
const NOISE_TIME = 0.30;

// ── Cell color animation (Perlin noise: background grey → light blue-grey) ───
/** Spatial frequency of the color noise field. */
const COLOR_NOISE_SPACE = 0.09;
/** Temporal frequency — keep very low for a slow, dreamy drift. */
const COLOR_NOISE_TIME  = 0.06;
/** Low end of the color ramp — exactly matches slate.10 bg (#f5f5f6). */
const CLOW  = { r: 255, g: 255, b: 255 } as const;
/** High end of the color ramp — very subtle cool blue-grey. */
const CHIGH = { r: 232, g: 237, b: 245 } as const;

// Visible but light — blue-grey that reads clearly without competing with copy.
const GRID_LINE = "rgba(169, 183, 198, 0.85)";
/** RGB of the soft blue gradient fill on the hovered diamond. */
const HOVER_RGB = "108, 149, 203";

const LABELS = [
  "EBITDA_24", "NET_REV",  "CAGR_Q3",  "ARR_YTD",  "FCF_TTM",
  "GROSS_MRG", "EV_EBITDA","P_E_RATIO", "ROCE_Q4",  "NWC_Q4",
  "CAPEX_23",  "D_E_RATIO","IRR_Q3",   "MOIC_3X",  "LTV_CAC",
  "NET_NRR",   "OPEX_MRG", "RULE_40",
];

// ── Classic 2-D Perlin noise (fixed permutation for determinism) ─────────────
const _PERM = (() => {
  const src = [
    151,160,137, 91, 90, 15,131, 13,201, 95, 96, 53,194,233,  7,225,
    140, 36,103, 30, 69,142,  8, 99, 37,240, 21, 10, 23,190,  6,148,
    247,120,234, 75,  0, 26,197, 62, 94,252,219,203,117, 35, 11, 32,
     57,177, 33, 88,237,149, 56, 87,174, 20,125,136,171,168, 68,175,
     74,165, 71,134,139, 48, 27,166, 77,146,158,231, 83,111,229,122,
     60,211,133,230,220,105, 92, 41, 55, 46,245, 40,244,102,143, 54,
     65, 25, 63,161,  1,216, 80, 73,209, 76,132,187,208, 89, 18,169,
    200,196,135,130,116,188,159, 86,164,100,109,198,173,186,  3, 64,
     52,217,226,250,124,123,  5,202, 38,147,118,126,255, 82, 85,212,
    207,206, 59,227, 47, 16, 58, 17,182,189, 28, 42,223,183,170,213,
    119,248,152,  2, 44,154,163, 70,221,153,101,155,167, 43,172,  9,
    129, 22, 39,253, 19, 98,108,110, 79,113,224,232,178,185,112,104,
    218,246, 97,228,251, 34,242,193,238,210,144, 12,191,179,162,241,
     81, 51,145,235,249, 14,239,107, 49,192,214, 31,181,199,106,157,
    184, 84,204,176,115,121, 50, 45,127,  4,150,254,138,236,205, 93,
    222,114, 67, 29, 24, 72,243,141,128,195, 78, 66,215, 61,156,180,
  ];
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++) p[i] = p[i + 256] = src[i];
  return p;
})();

const _fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const _lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const _g2 = (h: number, x: number, y: number) =>
  (h & 1 ? -x : x) + (h & 2 ? -y : y);

const noise2 = (x: number, y: number): number => {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = _fade(xf);
  const v = _fade(yf);
  const aa = _PERM[_PERM[X] + Y];
  const ab = _PERM[_PERM[X] + Y + 1];
  const ba = _PERM[_PERM[X + 1] + Y];
  const bb = _PERM[_PERM[X + 1] + Y + 1];
  return _lerp(
    _lerp(_g2(aa, xf, yf),     _g2(ba, xf - 1, yf),     u),
    _lerp(_g2(ab, xf, yf - 1), _g2(bb, xf - 1, yf - 1), u),
    v,
  );
};

// ── Geometry helpers ─────────────────────────────────────────────────────────

/**
 * Screen-space centre of cell (gx, gy).
 * ox is the current drift offset (applied identically to both axes so the
 * field drifts diagonally).
 */
const cellCenter = (
  w: number,
  h: number,
  gx: number,
  gy: number,
  ox: number,
): [number, number] => {
  const lx = w / 2 + ((gx - gy) * TILE - ox) * COS;
  const ly = h / 2 + ((gx + gy) * TILE + ox) * SIN;
  return [lx + TILE * COS, ly];
};

/** Stable label for a given cell coordinate — consistent across frames. */
const cellLabel = (gx: number, gy: number) =>
  LABELS[Math.abs(gx * 127 + gy * 311) % LABELS.length];

/** Four diamond corners at scale s around (cx, cy). */
const diamond = (cx: number, cy: number, s: number) =>
  [
    [cx - TILE * COS * s, cy],
    [cx,                  cy + TILE * SIN * s],
    [cx + TILE * COS * s, cy],
    [cx,                  cy - TILE * SIN * s],
  ] as [number, number][];

/**
 * Analytic inverse of cellCenter — find the cell whose diamond contains
 * screen point (px, py), with a 3×3 neighbourhood search to handle the
 * ±0.5 cell rounding error near diamond edges.
 */
const cellAt = (
  w: number,
  h: number,
  px: number,
  py: number,
  ox: number,
): { gx: number; gy: number } | null => {
  // Analytic inverse gives (gx − gy + 1) and (gx + gy) in tile-units
  const a = (px - w / 2) / COS + ox; // ≈ (gx − gy + 1) × TILE
  const b = (py - h / 2) / SIN - ox; // ≈ (gx + gy)     × TILE
  const gxG = Math.floor((a + b) / PERIOD);
  const gyG = Math.floor((b - a) / PERIOD);
  let best: { gx: number; gy: number } | null = null;
  let bestD = Infinity;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const gx = gxG + dx;
      const gy = gyG + dy;
      const [cx, cy] = cellCenter(w, h, gx, gy, ox);
      // L1 containment test in isometric axes (exact for rhombus)
      if (Math.abs(px - cx) / (TILE * COS) + Math.abs(py - cy) / (TILE * SIN) <= 1)
        return { gx, gy };
      const d = (px - cx) ** 2 + (py - cy) ** 2;
      if (d < bestD) { bestD = d; best = { gx, gy }; }
    }
  }
  return best;
};

/** Smoothstep easing: t → 0‥1 ease-in-out (clamped). */
const smoothstep = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

// ── Component ────────────────────────────────────────────────────────────────
export const HeroGridCanvas: React.FC = () => {
  const colorRef = useRef<HTMLCanvasElement>(null);
  const gridRef  = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HTMLCanvasElement>(null);
  const hostRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colorCanvas = colorRef.current;
    const gridCanvas  = gridRef.current;
    const hoverCanvas = hoverRef.current;
    const host        = hostRef.current;
    if (!colorCanvas || !gridCanvas || !hoverCanvas || !host) return;

    const cCtx = colorCanvas.getContext("2d");
    const gCtx = gridCanvas.getContext("2d");
    const hCtx = hoverCanvas.getContext("2d");
    if (!cCtx || !gCtx || !hCtx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0, height = 0;
    let offset  = 0;   // accumulated drift (px)
    let elapsed = 0;   // accumulated time (seconds)
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let frame         = 0;
    let lastTime      = performance.now();
    let lastColorTime = 0;

    // Hover animation state ──────────────────────────────────────────────────
    /** Cell whose animation we are currently driving (persists during exit). */
    let animCell: { gx: number; gy: number } | null = null;
    /** performance.now() when the pointer first entered animCell. */
    let enterTime = 0;
    /**
     * 0 → 1 animation progress.
     * Stays 0 for the first HOVER_DELAY_MS ms, then eases to 1 over ANIM_IN_MS,
     * then decays back to 0 over ANIM_OUT_MS when the pointer leaves.
     */
    let animProg = 0;
    /** Last TRAIL_LENGTH cells visited, newest first. */
    let trail: Array<{ gx: number; gy: number }> = [];
    /** Shared 0→1 opacity multiplier for the entire trail. */
    let trailAlpha = 0;

    // ── Color layer (Perlin cell fills, sits below grid lines) ─────────────
    /**
     * Fills every visible diamond with a color sampled from the 2-D+time Perlin
     * noise field, mapped from CLOW (the page bg grey) to CHIGH (light blue-grey).
     * Runs at ~20 fps — the animation is slow enough that higher rates are wasted.
     */
    const drawColors = (t: number) => {
      if (!width || !height) return;
      cCtx.clearRect(0, 0, width, height);
      const ox   = offset % PERIOD;
      // Span wide enough to cover the full canvas in isometric coordinates.
      const span = Math.ceil(
        Math.max(width / (TILE * COS), height / (TILE * SIN)) / 2,
      ) + 3;
      for (let gx = -span; gx <= span; gx++) {
        for (let gy = -span; gy <= span; gy++) {
          const [cx, cy] = cellCenter(width, height, gx, gy, ox);
          // Coarse cull — skip cells whose centres are well off-screen.
          if (
            cx < -TILE * 2 || cx > width  + TILE * 2 ||
            cy < -TILE * 2 || cy > height + TILE * 2
          ) continue;
          // Perlin value in [0, 1]
          const n = (noise2(
            gx * COLOR_NOISE_SPACE + t * COLOR_NOISE_TIME,
            gy * COLOR_NOISE_SPACE - t * COLOR_NOISE_TIME * 0.2,
          ) + 1) / 2;
          const r = Math.round(CLOW.r + n * (CHIGH.r - CLOW.r));
          const g = Math.round(CLOW.g + n * (CHIGH.g - CLOW.g));
          const b = Math.round(CLOW.b + n * (CHIGH.b - CLOW.b));
          const corners = diamond(cx, cy, 1.0);
          cCtx.beginPath();
          cCtx.moveTo(corners[0][0], corners[0][1]);
          for (let i = 1; i < corners.length; i++) cCtx.lineTo(corners[i][0], corners[i][1]);
          cCtx.closePath();
          cCtx.fillStyle = `rgb(${r},${g},${b})`;
          cCtx.fill();
        }
      }
    };

    // ── Grid layer ──────────────────────────────────────────────────────────
    const drawGrid = () => {
      if (!width || !height) return;
      gCtx.clearRect(0, 0, width, height);
      gCtx.strokeStyle = GRID_LINE;
      gCtx.lineWidth   = 1.5;
      gCtx.lineCap     = "round";
      gCtx.setLineDash([0, 4]);

      const shift = offset % PERIOD;
      const span  = Math.ceil(Math.max(width, height) / (TILE * SIN)) + 2;

      for (let i = -span; i < span; i++) {
        // Down-right diagonal family
        gCtx.beginPath();
        const ax = width / 2 + (TILE * i - shift) * COS;
        const ay = height / 2 + (TILE * i + shift) * SIN;
        gCtx.moveTo(ax - width * COS, ay + width * SIN);
        gCtx.lineTo(ax + width * COS, ay - width * SIN);
        gCtx.stroke();

        // Up-right diagonal family
        gCtx.beginPath();
        const bx = width / 2 + (TILE * i - shift) * COS;
        const by = height / 2 - (TILE * i - shift) * SIN;
        gCtx.moveTo(bx - width * COS, by - width * SIN);
        gCtx.lineTo(bx + width * COS, by + width * SIN);
        gCtx.stroke();
      }
    };

    // ── Hover layer ─────────────────────────────────────────────────────────
    /**
     * Draws the hover animation driven by `prog` (0 → 1):
     *  - Surrounding cells: shrink with Perlin noise as a per-cell coefficient.
     *    A bg-colour fill covers the original diamond area first, then the shrunk
     *    outline is redrawn — making the contraction visually clear against the
     *    fixed grid beneath.
     *  - Hovered cell (drawn last, on top): expands with an animated gradient.
     *    Finance label fades in once prog > 0.6.
     */
    const drawHover = (t: number, prog: number) => {
      hCtx.clearRect(0, 0, width, height);

      const hasHover = prog > 0.001 && animCell != null;
      const hasTrail = trailAlpha > 0.002 && trail.length > 0;
      if (!hasHover && !hasTrail) return;

      const ox = offset % PERIOD;

      hCtx.save();
      hCtx.setLineDash([]);

      // ── Pass 1: surrounding cells shrink (only while actively hovering) ───
      if (hasHover) {
        const { gx: hgx, gy: hgy } = animCell!;
        const R = Math.ceil(HOVER_RADIUS) + 1;
        for (let dgx = -R; dgx <= R; dgx++) {
          for (let dgy = -R; dgy <= R; dgy++) {
            if (dgx === 0 && dgy === 0) continue;
            const dist = Math.sqrt(dgx * dgx + dgy * dgy);
            if (dist > HOVER_RADIUS) continue;

            const gx = hgx + dgx;
            const gy = hgy + dgy;
            const [cx, cy] = cellCenter(width, height, gx, gy, ox);
            const falloff   = Math.max(0, 1 - dist / HOVER_RADIUS);

            // Perlin noise as a per-cell transformation coefficient
            const n = (noise2(
              gx * NOISE_SPACE + t * NOISE_TIME,
              gy * NOISE_SPACE - t * NOISE_TIME * 0.65,
            ) + 1) / 2; // 0 → 1

            // Nearest cells shrink most; noise adds organic irregularity
            const shrinkCoef = falloff * falloff * (0.35 + 0.65 * n);
            const s = Math.max(0.68, 1 - prog * SURROUND_MAX_SHRINK * shrinkCoef);

            // Step A: flood full-size diamond with bg colour to erase grid lines
            //         inside it — makes the contraction legible.
            const fullC = diamond(cx, cy, 1.0);
            hCtx.beginPath();
            hCtx.moveTo(fullC[0][0], fullC[0][1]);
            for (let i = 1; i < fullC.length; i++) hCtx.lineTo(fullC[i][0], fullC[i][1]);
            hCtx.closePath();
            hCtx.fillStyle = `rgba(245,245,246,${(falloff * prog * 0.86).toFixed(3)})`;
            hCtx.fill();

            // Step B: redraw the shrunk outline (same colour as the grid)
            const shrC = diamond(cx, cy, s);
            hCtx.beginPath();
            hCtx.moveTo(shrC[0][0], shrC[0][1]);
            for (let i = 1; i < shrC.length; i++) hCtx.lineTo(shrC[i][0], shrC[i][1]);
            hCtx.closePath();
            hCtx.strokeStyle = `rgba(169,183,198,${(falloff * 0.55 * prog).toFixed(3)})`;
            hCtx.lineWidth   = 1;
            hCtx.stroke();
          }
        }
      }

      // ── Pass 2: trail labels — persist until overwritten by new hover ──────
      if (hasTrail) {
        hCtx.font         = '7px "Chivo Mono","Geist Mono",monospace';
        hCtx.textAlign    = "center";
        hCtx.textBaseline = "middle";

        for (let idx = trail.length - 1; idx >= 0; idx--) {
          const { gx, gy } = trail[idx];
          const [cx, cy]   = cellCenter(width, height, gx, gy, ox);
          // ageFactor: 0 (newest) → ~0.85, TRAIL_LENGTH-1 (oldest) → ~0.17
          const ageFactor  = 1 - (idx + 1) / (TRAIL_LENGTH + 1);
          const labelAlpha = ageFactor * trailAlpha * 0.65;
          if (labelAlpha < 0.003) continue;

          // Faint diamond fill to ground the text
          const corners = diamond(cx, cy, 1.0);
          hCtx.beginPath();
          hCtx.moveTo(corners[0][0], corners[0][1]);
          for (let i = 1; i < corners.length; i++) hCtx.lineTo(corners[i][0], corners[i][1]);
          hCtx.closePath();
          hCtx.fillStyle = `rgba(${HOVER_RGB}, ${(ageFactor * 0.055 * trailAlpha).toFixed(3)})`;
          hCtx.fill();

          // Finance label
          hCtx.fillStyle = `rgba(130,152,175,${labelAlpha.toFixed(3)})`;
          hCtx.fillText(cellLabel(gx, gy), cx, cy);
        }
      }

      // ── Pass 3: hovered cell expands on top (only while actively hovering) ─
      if (hasHover) {
        const { gx: hgx, gy: hgy } = animCell!;
        const [cx, cy] = cellCenter(width, height, hgx, hgy, ox);
        const s        = 1 + prog * CELL_MAX_SCALE;
        const corners  = diamond(cx, cy, s);

        hCtx.beginPath();
        hCtx.moveTo(corners[0][0], corners[0][1]);
        for (let i = 1; i < corners.length; i++) hCtx.lineTo(corners[i][0], corners[i][1]);
        hCtx.closePath();

        // Animated gradient: direction and intensity driven by Perlin
        const angle = noise2(t * 0.42, hgx * 0.18 + hgy * 0.21) * Math.PI * 2;
        const r     = TILE * COS * s;
        const grd   = hCtx.createLinearGradient(
          cx + Math.cos(angle) * r, cy + Math.sin(angle) * r,
          cx - Math.cos(angle) * r, cy - Math.sin(angle) * r,
        );
        const intensity =
          prog * (0.10 + 0.09 * ((noise2(t * 0.65 + 5, hgx * 0.3 + hgy * 0.2) + 1) / 2));
        grd.addColorStop(0,    `rgba(${HOVER_RGB}, 0)`);
        grd.addColorStop(0.28, `rgba(${HOVER_RGB}, ${(intensity * 0.5).toFixed(3)})`);
        grd.addColorStop(0.62, `rgba(${HOVER_RGB}, ${intensity.toFixed(3)})`);
        grd.addColorStop(1,    `rgba(${HOVER_RGB}, 0)`);
        hCtx.fillStyle = grd;
        hCtx.fill();

        // Hairline border
        hCtx.strokeStyle = `rgba(169,183,198,${(0.28 * prog).toFixed(3)})`;
        hCtx.lineWidth   = 0.6;
        hCtx.stroke();

        // Finance label — fades in after prog crosses 0.6
        const labelAlpha = Math.max(0, (prog - 0.6) / 0.4) * 0.58;
        if (labelAlpha > 0.001) {
          hCtx.font         = '7px "Chivo Mono","Geist Mono",monospace';
          hCtx.textAlign    = "center";
          hCtx.textBaseline = "middle";
          hCtx.fillStyle    = `rgba(130,152,175,${labelAlpha.toFixed(3)})`;
          hCtx.fillText(cellLabel(hgx, hgy), cx, cy);
        }
      }

      hCtx.restore();
    };

    // ── Main loop ───────────────────────────────────────────────────────────
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      if (!visible) return;

      offset  += (DRIFT * delta) / 1000;
      elapsed += delta / 1000;

      // Color layer: update at ~20 fps — slow noise drift doesn't need 60 fps.
      if (elapsed - lastColorTime >= 1 / 20) {
        drawColors(elapsed);
        lastColorTime = elapsed;
      }

      drawGrid();

      // Resolve which cell is under the pointer this frame
      const curCell = pointer
        ? cellAt(width, height, pointer.x, pointer.y, offset % PERIOD)
        : null;

      if (curCell) {
        const changed =
          !animCell ||
          animCell.gx !== curCell.gx ||
          animCell.gy !== curCell.gy;

        if (changed) {
          // Push outgoing cell to the front of the trail, cap at TRAIL_LENGTH
          if (animCell) {
            trail = [{ gx: animCell.gx, gy: animCell.gy }, ...trail].slice(0, TRAIL_LENGTH);
          }
          // Pointer entered a new cell — reset the delay timer and progress
          animCell  = { gx: curCell.gx, gy: curCell.gy };
          enterTime = now;
          animProg  = 0;
        } else {
          // Same cell: advance progress only after the HOVER_DELAY_MS window
          const waited = now - enterTime - HOVER_DELAY_MS;
          animProg = waited > 0
            ? smoothstep(Math.min(1, waited / ANIM_IN_MS))
            : 0;
        }
        // Trail fades in quickly while any cell is hovered
        trailAlpha = Math.min(1, trailAlpha + delta / 80);
      } else {
        // Pointer left — fade out the active-cell animation only.
        // Trail and trailAlpha are intentionally preserved; they persist
        // until a new hover session overwrites them with fresh cells.
        if (animProg > 0) {
          animProg = Math.max(0, animProg - delta / ANIM_OUT_MS);
        }
        if (animProg <= 0) {
          animCell = null;
        }
      }

      drawHover(elapsed, animProg);
    };

    const resize = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width  = rect.width;
      height = rect.height;
      for (const canvas of [colorCanvas, gridCanvas, hoverCanvas]) {
        canvas.width  = Math.round(width  * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width  = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawColors(elapsed);
      drawGrid();
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer =
        x >= 0 && x <= r.width && y >= 0 && y <= r.height ? { x, y } : null;
    };
    const onLeave = () => { pointer = null; };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    // Track on window so the trail isn't lost when the cursor crosses the headline
    window.addEventListener("pointermove", onMove);
    document.body.addEventListener("pointerleave", onLeave);

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; lastTime = performance.now(); },
      { threshold: 0.01 },
    );
    observer.observe(host);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.body.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Box
      ref={hostRef}
      position="absolute"
      inset={0}
      overflow="hidden"
      aria-hidden
    >
      <Box as="canvas" ref={colorRef} position="absolute" top={0} left={0} w="full" h="full" />
      <Box as="canvas" ref={gridRef}  position="absolute" top={0} left={0} w="full" h="full" />
      <Box as="canvas" ref={hoverRef} position="absolute" top={0} left={0} w="full" h="full" />
    </Box>
  );
};
