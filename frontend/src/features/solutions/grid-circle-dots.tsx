import { CanvasFill } from "@/components/site/canvas/canvas-fill";
import { easeInOut, lerp } from "@/components/site/canvas/canvas-utils";
import {
  firstPulseAt,
  HERO_DOT,
  heroDotColor,
  pulseGrowth,
} from "@/components/site/canvas/hero-dots";
import { INK } from "@/components/site/canvas/ink";
import { useCanvasLoop } from "@/components/site/canvas/use-canvas-loop";
import React from "react";

/**
 * The hero's marks, in its colours, moving between an even grid and a
 * filled circle on a seamless loop. In the grid they are squares; as each
 * one travels to the circle its corners round off into a dot, and back.
 * Like the hero's dots, each one now and then swells 2px and settles.
 *
 * Grid cells are paired with circle spots by distance from the centre, so
 * the middle of the grid becomes the middle of the circle and the marks
 * mostly travel outward or inward rather than across one another. They set
 * off from the centre first, so the change ripples out.
 */

const COLS = 56;
const ROWS = 18;
const PITCH = 14; // px, grid spacing at full size
/** The whole figure, spacing and marks, at this scale. */
const SCALE = 1.2;
/** Share of marks in the site's accent red; the rest take the hero's mix. */
const ACCENT_SHARE = 0.1;
/** Seconds held as a grid, and as a circle; seconds for each change. */
const HOLD = 1.6;
const MORPH = 2.4;
const CYCLE = 2 * (HOLD + MORPH);
/** Seconds the outermost marks set off after the centre's. */
const RIPPLE = 0.6;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
/** The circle's radius in pitches: the same area as the grid. */
const CIRCLE_R = Math.sqrt((COLS * ROWS) / Math.PI);
/** Half the figure's height at its tallest (grid or circle), in pitches. */
const HALF_H = Math.max(ROWS / 2, CIRCLE_R);

type Mark = {
  /** Grid and circle positions, relative to the figure's centre, in pitches. */
  gx: number;
  gy: number;
  cx: number;
  cy: number;
  /** 0 at the centre, 1 at the edge: when this mark sets off. */
  delay: number;
  color: string;
  pulseAt: number;
};

const makeMarks = (): Mark[] => {
  const n = COLS * ROWS;
  const grid = Array.from({ length: n }, (_, k) => {
    const gx = (k % COLS) - (COLS - 1) / 2;
    const gy = Math.floor(k / COLS) - (ROWS - 1) / 2;
    return { gx, gy, d: Math.hypot(gx, gy), a: Math.atan2(gy, gx) };
  }).sort((p, q) => p.d - q.d || p.a - q.a);
  // A sunflower spiral fills the circle evenly, innermost spot first.
  const radius = CIRCLE_R;
  const maxD = grid[n - 1].d;
  return grid.map((g, i) => {
    const r = radius * Math.sqrt((i + 0.5) / n);
    return {
      gx: g.gx,
      gy: g.gy,
      cx: r * Math.cos(i * GOLDEN),
      cy: r * Math.sin(i * GOLDEN),
      delay: g.d / maxD,
      color: Math.random() < ACCENT_SHARE ? INK.crimson : heroDotColor(),
      pulseAt: firstPulseAt(),
    };
  });
};

/** 0 → 1 → 0 over a cycle: grid, change, circle, change back. */
const progress = (t: number, delay: number) => {
  const span = MORPH - RIPPLE;
  const local = (u: number) =>
    easeInOut(Math.min(Math.max((u - delay * RIPPLE) / span, 0), 1));
  const c = ((t % CYCLE) + CYCLE) % CYCLE;
  if (c < HOLD) return 0;
  if (c < HOLD + MORPH) return local(c - HOLD);
  if (c < 2 * HOLD + MORPH) return 1;
  return 1 - local(c - 2 * HOLD - MORPH);
};

export const GridCircleDots: React.FC<{
  /** The copy above the figure: its tallest shape starts at this element's
   * bottom edge. */
  below?: React.RefObject<HTMLElement | null>;
  /** Multiplier on the figure's full size. */
  scale?: number;
}> = ({ below, scale = 1 }) => {
  const marks = React.useMemo(makeMarks, []);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, reduced }) => {
    // Fit the grid to narrow screens, never past full size, then scale.
    const pitch = Math.min(PITCH, (w - 32) / COLS) * SCALE * scale;
    // A quarter of the band's width right of centre, less 120px, its
    // tallest shape (the circle) starting right at the bottom of the copy.
    const ox = w * 0.75 - 120;
    const el = below?.current;
    const canvas = canvasRef.current;
    const top =
      el && canvas
        ? el.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top
        : 0;
    const oy = top + HALF_H * pitch;

    ctx.clearRect(0, 0, w, h);
    for (const m of marks) {
      // Reduced motion: the grid, still.
      const p = reduced ? 0 : progress(t, m.delay);
      const x = ox + lerp(m.gx, m.cx, p) * pitch;
      const y = oy + lerp(m.gy, m.cy, p) * pitch;

      const r =
        (HERO_DOT * SCALE * scale) / 2 + (reduced ? 0 : pulseGrowth(m, t));

      ctx.fillStyle = m.color;
      ctx.beginPath();
      // Square in the grid, round in the circle.
      ctx.roundRect(x - r, y - r, r * 2, r * 2, r * p);
      ctx.fill();
    }
  });

  return <CanvasFill ref={canvasRef} pointerEvents="none" />;
};
