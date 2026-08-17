import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

/** Diamond edge length in px. The field repeats every 2× this. */
const TILE = 60;
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
/** Perlin spatial and temporal frequencies. */
const NOISE_SPACE = 0.38;
const NOISE_TIME = 0.30;

// Very low contrast — the grid reads as ambient texture, not UI chrome.
const GRID_LINE = "rgba(169, 183, 198, 0.13)";
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

// ── Component ────────────────────────────────────────────────────────────────
export const HeroGridCanvas: React.FC = () => {
  const gridRef  = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HTMLCanvasElement>(null);
  const hostRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridCanvas  = gridRef.current;
    const hoverCanvas = hoverRef.current;
    const host        = hostRef.current;
    if (!gridCanvas || !hoverCanvas || !host) return;

    const gCtx = gridCanvas.getContext("2d");
    const hCtx = hoverCanvas.getContext("2d");
    if (!gCtx || !hCtx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0, height = 0;
    let offset  = 0;   // accumulated drift
    let elapsed = 0;   // accumulated time in seconds
    let pointer: { x: number; y: number } | null = null;
    let hovCell: { gx: number; gy: number } | null = null;
    let visible = true;
    let frame   = 0;
    let lastTime = performance.now();

    // ── Grid layer ──────────────────────────────────────────────────────────
    const drawGrid = () => {
      if (!width || !height) return;
      gCtx.clearRect(0, 0, width, height);
      gCtx.strokeStyle = GRID_LINE;
      gCtx.lineWidth   = 1;
      gCtx.setLineDash([3, 3]);

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
    const drawHover = (t: number) => {
      hCtx.clearRect(0, 0, width, height);
      if (!hovCell) return;

      const { gx: hgx, gy: hgy } = hovCell;
      const ox = offset % PERIOD;
      const R  = Math.ceil(HOVER_RADIUS) + 1;

      hCtx.save();
      hCtx.setLineDash([]); // solid borders on all affected diamonds

      for (let dgx = -R; dgx <= R; dgx++) {
        for (let dgy = -R; dgy <= R; dgy++) {
          const dist = Math.sqrt(dgx * dgx + dgy * dgy);
          if (dist > HOVER_RADIUS) continue;

          const gx = hgx + dgx;
          const gy = hgy + dgy;
          const [cx, cy] = cellCenter(width, height, gx, gy, ox);
          const isHov    = dgx === 0 && dgy === 0;

          // Perlin: each cell gets independent organic scale variation
          const n = (noise2(
            gx * NOISE_SPACE + t * NOISE_TIME,
            gy * NOISE_SPACE - t * NOISE_TIME * 0.65,
          ) + 1) / 2; // 0 → 1

          const falloff  = Math.max(0, 1 - dist / HOVER_RADIUS);
          const scaleMod = falloff * falloff * (0.4 + 0.6 * n);
          const s        = 1 + scaleMod * CELL_MAX_SCALE * (isHov ? 1.0 : 0.55);

          // Draw scaled diamond path
          const corners = diamond(cx, cy, s);
          hCtx.beginPath();
          hCtx.moveTo(corners[0][0], corners[0][1]);
          for (let i = 1; i < corners.length; i++)
            hCtx.lineTo(corners[i][0], corners[i][1]);
          hCtx.closePath();

          if (isHov) {
            // Soft animated gradient: direction and intensity driven by Perlin
            const angle = noise2(t * 0.42, hgx * 0.18 + hgy * 0.21) * Math.PI * 2;
            const r     = TILE * COS * s;
            const grd   = hCtx.createLinearGradient(
              cx + Math.cos(angle) * r, cy + Math.sin(angle) * r,
              cx - Math.cos(angle) * r, cy - Math.sin(angle) * r,
            );
            const intensity =
              0.10 + 0.09 * ((noise2(t * 0.65 + 5, hgx * 0.3 + hgy * 0.2) + 1) / 2);
            grd.addColorStop(0,    `rgba(${HOVER_RGB}, 0)`);
            grd.addColorStop(0.28, `rgba(${HOVER_RGB}, ${(intensity * 0.5).toFixed(3)})`);
            grd.addColorStop(0.62, `rgba(${HOVER_RGB}, ${intensity.toFixed(3)})`);
            grd.addColorStop(1,    `rgba(${HOVER_RGB}, 0)`);
            hCtx.fillStyle = grd;
          } else {
            // Surrounding cells: very faint grey, noise-modulated
            hCtx.fillStyle = `rgba(169,183,198,${(falloff * 0.065 * n).toFixed(3)})`;
          }
          hCtx.fill();

          // Hairline border — very faint so it reinforces shape without distracting
          hCtx.strokeStyle = `rgba(169,183,198,${(falloff * 0.14 * n).toFixed(3)})`;
          hCtx.lineWidth   = 0.6;
          hCtx.stroke();
        }
      }

      // Finance label at centre of hovered cell
      const [hcx, hcy] = cellCenter(width, height, hgx, hgy, ox);
      hCtx.font          = '7px "Chivo Mono","Geist Mono",monospace';
      hCtx.textAlign     = "center";
      hCtx.textBaseline  = "middle";
      hCtx.fillStyle     = "rgba(130,152,175,0.58)";
      hCtx.fillText(cellLabel(hgx, hgy), hcx, hcy);

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

      drawGrid();

      hovCell = pointer
        ? cellAt(width, height, pointer.x, pointer.y, offset % PERIOD)
        : null;

      drawHover(elapsed);
    };

    const resize = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width  = rect.width;
      height = rect.height;
      for (const canvas of [gridCanvas, hoverCanvas]) {
        canvas.width  = Math.round(width  * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width  = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      gCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGrid();
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer =
        x >= 0 && x <= r.width && y >= 0 && y <= r.height ? { x, y } : null;
    };
    const onLeave = () => { pointer = null; hovCell = null; };

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
      // Fade the field out at the top/bottom edges so it blends into the page.
      css={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 78%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 78%, transparent)",
      }}
    >
      <Box as="canvas" ref={gridRef}  position="absolute" top={0} left={0} w="full" h="full" />
      <Box as="canvas" ref={hoverRef} position="absolute" top={0} left={0} w="full" h="full" />
    </Box>
  );
};
