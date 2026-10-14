import { CanvasFill } from "@/features/hero-lab/hero-shared";
import { heroDotColor } from "@/features/hero-lab/heroes/quick-sediment-hero";
import { useCanvasLoop } from "@/features/hero-lab/use-canvas-loop";
import React from "react";

/**
 * The /solutions grid of squares, spread over its whole box and run as a
 * cellular automaton (Conway's Life, B3/S23). Every so often a small random
 * patch is seeded somewhere new, so activity breaks out sporadically across
 * the spread, grows or settles, and dies back. Live cells ink in as the
 * hero's marks — same size and colours, without the red — and fade out when
 * they die, so steps read as a soft flicker rather than a hard switch. No
 * cell lives past MAX_AGE generations, so Life's still debris clears away
 * and the spread never silts up.
 */

const PITCH = 16.8; // px, the /solutions grid's spacing (14px × 1.2)
const MARK = 4.1; // px, its squares (the hero's 3.4px dot × 1.2)
/** Seconds between generations. */
const STEP = 0.32;
/** Seconds between new seeds, min–max, and a seed's radius in cells. */
const SEED_EVERY = [0.4, 1.4] as const;
const SEED_R = [2, 4] as const;
/** Share of a seed's cells set alive. */
const SEED_DENSITY = 0.45;
/** Share of cells alive at the start. */
const START_DENSITY = 0.08;
/** How quickly a cell inks in and fades out, per second. */
const INK_IN = 10;
const INK_OUT = 4;
/**
 * Generations a cell may live before it dies regardless, so the still
 * shapes Life leaves behind fade away instead of piling up.
 */
const MAX_AGE = 40;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

type Field = {
  cols: number;
  rows: number;
  ox: number;
  oy: number;
  live: Uint8Array;
  age: Uint8Array;
  ink: Float32Array;
  color: string[];
  acc: number;
  nextSeed: number;
};

const makeField = (w: number, h: number, t: number): Field => {
  const cols = Math.max(1, Math.floor(w / PITCH));
  const rows = Math.max(1, Math.floor(h / PITCH));
  const n = cols * rows;
  const live = new Uint8Array(n);
  for (let k = 0; k < n; k++) live[k] = Math.random() < START_DENSITY ? 1 : 0;
  return {
    cols,
    rows,
    ox: (w - (cols - 1) * PITCH) / 2,
    oy: (h - (rows - 1) * PITCH) / 2,
    live,
    age: new Uint8Array(n),
    ink: new Float32Array(n),
    color: Array.from({ length: n }, heroDotColor),
    acc: 0,
    nextSeed: t + rand(SEED_EVERY[0], SEED_EVERY[1]),
  };
};

/** One Life generation, wrapping at the edges, with the age limit. */
const generation = (f: Field) => {
  const { cols, rows, live, age } = f;
  const next = new Uint8Array(live.length);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const a = (i + dx + cols) % cols;
          const b = (j + dy + rows) % rows;
          n += live[b * cols + a];
        }
      }
      const k = j * cols + i;
      const alive = (live[k] && (n === 2 || n === 3)) || (!live[k] && n === 3);
      age[k] = alive ? Math.min(age[k] + 1, 255) : 0;
      next[k] = alive && age[k] <= MAX_AGE ? 1 : 0;
      if (!next[k]) age[k] = 0;
    }
  }
  f.live = next;
};

/** A small random patch, somewhere new. */
const seed = (f: Field) => {
  const r = Math.round(rand(SEED_R[0], SEED_R[1]));
  const ci = Math.floor(Math.random() * f.cols);
  const cj = Math.floor(Math.random() * f.rows);
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      if (dx * dx + dy * dy > r * r) continue;
      const i = (ci + dx + f.cols) % f.cols;
      const j = (cj + dy + f.rows) % f.rows;
      if (Math.random() < SEED_DENSITY) f.live[j * f.cols + i] = 1;
    }
  }
};

export const AutomataGrid: React.FC = () => {
  const field = React.useRef<Field | null>(null);
  const reduced = React.useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    if (resized || !field.current) {
      field.current = makeField(w, h, t);
      // Reduced motion: a settled, inked-in still.
      if (reduced) {
        for (let n = 0; n < 12; n++) generation(field.current);
        field.current.ink.set(field.current.live);
      }
    }
    const f = field.current;

    if (!reduced) {
      f.acc += dt;
      while (f.acc >= STEP) {
        f.acc -= STEP;
        generation(f);
      }
      if (t >= f.nextSeed) {
        seed(f);
        f.nextSeed = t + rand(SEED_EVERY[0], SEED_EVERY[1]);
      }
    }

    const easeIn = 1 - Math.exp(-dt * INK_IN);
    const easeOut = 1 - Math.exp(-dt * INK_OUT);
    ctx.clearRect(0, 0, w, h);
    for (let j = 0; j < f.rows; j++) {
      for (let i = 0; i < f.cols; i++) {
        const k = j * f.cols + i;
        const target = f.live[k];
        const a = f.ink[k];
        f.ink[k] = a + (target - a) * (target > a ? easeIn : easeOut);
        if (f.ink[k] < 0.02) continue;
        // Marks swell in with their ink.
        const r = (MARK / 2) * (0.5 + 0.5 * f.ink[k]);
        ctx.globalAlpha = f.ink[k];
        ctx.fillStyle = f.color[k];
        ctx.fillRect(f.ox + i * PITCH - r, f.oy + j * PITCH - r, r * 2, r * 2);
      }
    }
    ctx.globalAlpha = 1;
  });

  return <CanvasFill ref={canvasRef} pointerEvents="none" />;
};
