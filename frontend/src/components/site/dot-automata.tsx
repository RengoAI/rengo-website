import { CanvasFill } from "@/features/hero-lab/hero-shared";
import { heroDotColor } from "@/features/hero-lab/heroes/quick-sediment-hero";
import { hash2, useCanvasLoop } from "@/features/hero-lab/use-canvas-loop";
import React from "react";

/**
 * Cellular automata in the hero's dots: small clusters of dots and squares
 * that appear on a plain ground. Each cluster runs its own CA rule. It
 * grows out from its centre, seeding cells as its edge reaches them, runs
 * its rule for a while with cells flipping between dot and square, then
 * shrinks away; another starts elsewhere.
 *
 * Every cell takes a colour from the hero's palette, in the hero's shares.
 * Clusters stay clear of any `[data-automata-avoid]` element inside the
 * `avoid` container (the copy over the canvas).
 */

const CELL = 8; // px, grid pitch
const DOT = 5.4; // px, a fully inked mark's size — the hero's dot plus 2px
/** Seconds for a cluster to grow out, and to shrink away. */
const GROW = 1.6;
const SHRINK = 2.4;
/** Seconds a cluster lives, min and max, growth and shrinking included. */
const LIFE = [8, 16] as const;
/** Seconds between a cluster's CA steps, min and max. */
const STEP = [0.14, 0.4] as const;
/** Seconds before a gone cluster is replaced, min and max. */
const RESPAWN = [0.4, 2.5] as const;
/** Chance per 60fps frame that a live cell flips between dot and square. */
const FLICKER = 0.012;
/** How quickly a cell inks in and fades out, per second. */
const INK_IN = 12;
const INK_OUT = 5;
/** One cluster per this many grid cells, within a floor and a ceiling. */
const CELLS_PER_CLUSTER = 700;
const CLUSTERS = [3, 8] as const;
/**
 * Cluster size in cells, min and max: about 300px tall (38 cells, 304px)
 * and 200–480px wide.
 */
const SPAN_W = [25, 60] as const;
const SPAN_H = [38, 38] as const;
/** Cells kept between a cluster and anything it avoids. */
const MARGIN = 2;

type Kind = "life" | "seeds" | "brain" | "cyclic" | "majority";
const KINDS: Kind[] = ["life", "life", "seeds", "brain", "cyclic", "majority"];
/** Share of cells seeded alive as the cluster's edge reaches them. */
const DENSITY: Record<Kind, number> = {
  life: 0.35,
  seeds: 0.12,
  brain: 0.3,
  cyclic: 1,
  majority: 0.5,
};

type Cluster = {
  kind: Kind;
  /** Position and size in grid cells. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Per-cell state, displayed ink (0–1), shape (1 = square), colour and
   * mask membership. */
  g: Uint8Array;
  ink: Float32Array;
  square: Uint8Array;
  color: string[];
  inside: Uint8Array;
  states: number;
  seed: number;
  born: number;
  life: number;
  every: number;
  acc: number;
  stall: number;
  lastSum: number;
};

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randInt = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));
const pick = <T,>(xs: readonly T[]) =>
  xs[Math.floor(Math.random() * xs.length)];
const smooth = (x: number) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

type Rect = { x: number; y: number; w: number; h: number };
const overlaps = (a: Rect, b: Rect, m: number) =>
  !(
    a.x + a.w + m <= b.x ||
    b.x + b.w + m <= a.x ||
    a.y + a.h + m <= b.y ||
    b.y + b.h + m <= a.y
  );

/** How far grown the cluster is: 0 → 1 as it grows, back to 0 as it goes. */
const envelope = (c: Cluster, now: number) => {
  const age = now - c.born;
  return Math.min(smooth(age / GROW), smooth((c.life - age) / SHRINK));
};

/**
 * Whether a cell is inside the cluster's blob at this envelope: an ellipse
 * with a ragged, per-cell edge, so clusters grow and recede organically.
 */
const inMask = (c: Cluster, i: number, j: number, env: number) => {
  const u = ((i + 0.5) / c.w) * 2 - 1;
  const v = ((j + 0.5) / c.h) * 2 - 1;
  const r = Math.sqrt(u * u + v * v) + hash2(i, j, c.seed) * 0.4;
  return r < env * 1.5;
};

const seedState = (c: Cluster) =>
  c.kind === "cyclic"
    ? Math.floor(Math.random() * c.states)
    : Math.random() < DENSITY[c.kind]
      ? 1
      : 0;

/** Live (state 1) neighbours, with bounded edges to keep clusters compact. */
const neighbours = (c: Cluster, i: number, j: number, state = 1) => {
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const a = i + dx;
      const b = j + dy;
      if (a >= 0 && a < c.w && b >= 0 && b < c.h && c.g[b * c.w + a] === state)
        n++;
    }
  }
  return n;
};

const ruleStep = (c: Cluster, i: number, j: number) => {
  const s = c.g[j * c.w + i];
  switch (c.kind) {
    case "life": {
      // B3/S23
      const n = neighbours(c, i, j);
      return (s === 1 && (n === 2 || n === 3)) || (s === 0 && n === 3) ? 1 : 0;
    }
    case "seeds":
      // B2/S
      return s === 0 && neighbours(c, i, j) === 2 ? 1 : 0;
    case "brain":
      // Brian's Brain: 1 on, 2 dying.
      return s === 1 ? 2 : s === 2 ? 0 : neighbours(c, i, j) === 2 ? 1 : 0;
    case "cyclic": {
      // Advance when a neighbour is one state ahead.
      const next = (s + 1) % c.states;
      return neighbours(c, i, j, next) > 0 ? next : s;
    }
    case "majority": {
      // Vichniac's anneal.
      const t = neighbours(c, i, j) + s;
      return t === 4 || t >= 6 ? 1 : 0;
    }
  }
};

/** Whether a cell shows as a square, from its state and surroundings. */
const squareFor = (c: Cluster, i: number, j: number, s: number) => {
  switch (c.kind) {
    case "life":
    case "majority":
      // Crowded cells square up.
      return neighbours(c, i, j) >= 3 ? 1 : 0;
    case "cyclic":
      return s % 2;
    case "brain":
      // Dying cells are squares.
      return s === 2 ? 1 : 0;
    default:
      return Math.random() < 0.5 ? 1 : 0;
  }
};

/** How strongly a live cell is inked, before its fade. */
const strength = (c: Cluster, s: number) => {
  if (!s) return 0;
  if (c.kind === "brain") return s === 1 ? 1 : 0.55;
  if (c.kind === "cyclic") return 0.5 + (0.5 * s) / c.states;
  return 1;
};

/**
 * One CA step: cells newly inside the blob are seeded, cells outside it
 * cleared, the rest follow the rule. A cluster that freezes or dies out
 * while fully grown gets a few cells flipped to keep it going.
 */
const step = (c: Cluster, now: number) => {
  const env = envelope(c, now);
  const next = new Uint8Array(c.g.length);
  let pop = 0;
  let sum = 0;
  for (let j = 0; j < c.h; j++) {
    for (let i = 0; i < c.w; i++) {
      const k = j * c.w + i;
      const inside = inMask(c, i, j, env);
      let s = 0;
      if (inside) s = c.inside[k] ? ruleStep(c, i, j) : seedState(c);
      c.inside[k] = inside ? 1 : 0;
      next[k] = s;
      if (s) pop++;
      sum = (sum * 31 + s * (k + 1)) | 0;
    }
  }
  const prev = c.g;
  c.g = next;
  for (let j = 0; j < c.h; j++) {
    for (let i = 0; i < c.w; i++) {
      const k = j * c.w + i;
      if (next[k] && next[k] !== prev[k])
        c.square[k] = squareFor(c, i, j, next[k]);
    }
  }

  c.stall = sum === c.lastSum ? c.stall + 1 : 0;
  c.lastSum = sum;
  if (env === 1 && (pop < 3 || c.stall > 5)) {
    for (let n = randInt(4, 7); n > 0; n--) {
      const i = Math.floor(Math.random() * c.w);
      const j = Math.floor(Math.random() * c.h);
      const k = j * c.w + i;
      if (!c.inside[k]) continue;
      c.g[k] =
        c.kind === "cyclic"
          ? Math.floor(Math.random() * c.states)
          : c.g[k]
            ? 0
            : 1;
      if (c.g[k]) c.square[k] = squareFor(c, i, j, c.g[k]);
    }
    c.stall = 0;
  }
};

const makeCluster = (spot: Rect, now: number): Cluster => {
  const kind = pick(KINDS);
  const n = spot.w * spot.h;
  return {
    kind,
    ...spot,
    g: new Uint8Array(n),
    ink: new Float32Array(n),
    square: new Uint8Array(n),
    color: Array.from({ length: n }, heroDotColor),
    inside: new Uint8Array(n),
    states: kind === "cyclic" ? randInt(4, 6) : 3,
    seed: randInt(1, 1e6),
    born: now,
    life: rand(LIFE[0], LIFE[1]),
    every: rand(STEP[0], STEP[1]),
    acc: 0,
    stall: 0,
    lastSum: 0,
  };
};

export const DotAutomata: React.FC<{
  /** Container whose `[data-automata-avoid]` elements clusters keep clear of. */
  avoid?: React.RefObject<HTMLElement | null>;
}> = ({ avoid }) => {
  const sim = React.useRef({
    clusters: [] as Cluster[],
    /** Times at which to try starting a cluster. */
    pending: [] as number[],
    cols: 0,
    rows: 0,
    ox: 0,
    oy: 0,
  });
  const reduced = React.useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    const s = sim.current;
    const canvas = canvasRef.current;

    // A free spot for a cluster, clear of the others and of the copy.
    const findSpot = (): Rect | null => {
      const keepOut: Rect[] = s.clusters.map((c) => c);
      const root = avoid?.current;
      if (root && canvas) {
        const cr = canvas.getBoundingClientRect();
        root.querySelectorAll("[data-automata-avoid]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const x = Math.floor((r.left - cr.left - s.ox) / CELL);
          const y = Math.floor((r.top - cr.top - s.oy) / CELL);
          keepOut.push({
            x,
            y,
            w: Math.ceil((r.right - cr.left - s.ox) / CELL) - x,
            h: Math.ceil((r.bottom - cr.top - s.oy) / CELL) - y,
          });
        });
      }
      for (let tries = 0; tries < 60; tries++) {
        const cw = randInt(SPAN_W[0], SPAN_W[1]);
        const ch = randInt(SPAN_H[0], SPAN_H[1]);
        if (cw > s.cols - 2 || ch > s.rows - 2) return null;
        const spot = {
          x: randInt(1, s.cols - cw - 1),
          y: randInt(1, s.rows - ch - 1),
          w: cw,
          h: ch,
        };
        if (!keepOut.some((o) => overlaps(o, spot, MARGIN))) return spot;
      }
      return null;
    };

    if (resized) {
      s.cols = Math.floor(w / CELL);
      s.rows = Math.floor(h / CELL);
      s.ox = (w - s.cols * CELL) / 2;
      s.oy = (h - s.rows * CELL) / 2;

      // A fresh composition. Reduced motion gets it fully grown and still.
      const target = Math.min(
        Math.max(
          Math.round((s.cols * s.rows) / CELLS_PER_CLUSTER),
          CLUSTERS[0],
        ),
        CLUSTERS[1],
      );
      s.clusters = [];
      s.pending = [];
      for (let k = 0; k < target; k++) {
        if (!reduced) {
          s.pending.push(t + rand(0, 3));
          continue;
        }
        const spot = findSpot();
        if (!spot) continue;
        const c = makeCluster(spot, t - GROW);
        c.life = Infinity;
        for (let n = randInt(3, 16); n > 0; n--) step(c, t);
        c.g.forEach((v, k) => (c.ink[k] = strength(c, v)));
        s.clusters.push(c);
      }
    }

    // Start any clusters that are due; retry shortly if there's no room.
    s.pending = s.pending.flatMap((at) => {
      if (at > t) return [at];
      const spot = findSpot();
      if (!spot) return [t + 1];
      s.clusters.push(makeCluster(spot, t));
      return [];
    });

    const f = dt * 60;
    const easeIn = 1 - Math.exp(-dt * INK_IN);
    const easeOut = 1 - Math.exp(-dt * INK_OUT);

    ctx.clearRect(0, 0, w, h);
    s.clusters = s.clusters.filter((c) => {
      c.acc += dt;
      while (c.acc >= c.every) {
        c.acc -= c.every;
        step(c, t);
      }

      let showing = false;
      for (let j = 0; j < c.h; j++) {
        for (let i = 0; i < c.w; i++) {
          const k = j * c.w + i;
          const v = c.g[k];
          const target = strength(c, v);
          const a = c.ink[k];
          c.ink[k] = a + (target - a) * (target > a ? easeIn : easeOut);
          if (c.ink[k] < 0.01) continue;
          showing = true;

          if (v && Math.random() < FLICKER * f) c.square[k] ^= 1;

          // Marks swell in with their ink, a touch off the grid.
          const cx = s.ox + (c.x + i + 0.5) * CELL;
          const cy = s.oy + (c.y + j + 0.5) * CELL;
          const h1 = hash2(i, j, c.seed);
          const h2 = hash2(j, i, c.seed + 1);
          const x = cx + (h1 - 0.5) * 1.2;
          const y = cy + (h2 - 0.5) * 1.2;
          const r = (DOT / 2) * (0.4 + 0.6 * c.ink[k]);
          ctx.globalAlpha = c.ink[k];
          ctx.fillStyle = c.color[k];
          if (c.square[k]) {
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
          } else {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const done = t - c.born > c.life && !showing;
      if (done) s.pending.push(t + rand(RESPAWN[0], RESPAWN[1]));
      return !done;
    });
    ctx.globalAlpha = 1;
  });

  return <CanvasFill ref={canvasRef} pointerEvents="none" />;
};
