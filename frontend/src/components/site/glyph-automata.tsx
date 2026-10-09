import { CanvasFill, INK } from "@/features/hero-lab/hero-shared";
import { heroCharset } from "@/features/hero-lab/heroes/glyph-bed-hero";
import { DARK_SWATCHES } from "@/features/hero-lab/heroes/layer-hero";
import { hash2, useCanvasLoop } from "@/features/hero-lab/use-canvas-loop";
import React from "react";

/**
 * Typewriter cellular automata: a graph-paper dot grid with small clusters
 * of the hero's characters typed over it. Each cluster runs its own CA rule
 * with its own handful of characters and one ink. A cluster grows out from
 * its centre, seeding cells as its edge reaches them, runs its rule for a
 * while with characters flickering, then shrinks away; another starts
 * elsewhere. Typed cells cover the grid's dot beneath them.
 *
 * Clusters stay clear of the `avoid` element (the copy over the canvas).
 */

const CELL = 14; // px, grid pitch
const FONT = `400 11px Serrif, "Noto Serif", Georgia, ui-serif, serif`;
const DOT_R = 0.7; // px, grid dot radius
const DOT_COLOR = INK.soot500;
const DOT_ALPHA = 0.4;
/** Characters per cluster, drawn from the hero's set. */
const CLUSTER_GLYPHS = 9;
/** Seconds for a cluster to grow out, and to shrink away. */
const GROW = 1.6;
const SHRINK = 2.4;
/** Seconds a cluster lives, min and max, growth and shrinking included. */
const LIFE = [8, 16] as const;
/** Seconds between a cluster's CA steps, min and max. */
const STEP = [0.14, 0.4] as const;
/** Seconds before a gone cluster is replaced, min and max. */
const RESPAWN = [0.4, 2.5] as const;
/** Chance per 60fps frame that a typed cell swaps to another character. */
const FLICKER = 0.012;
/** How quickly a cell inks in and fades out, per second. */
const INK_IN = 12;
const INK_OUT = 5;
/** One cluster per this many grid cells, within a floor and a ceiling. */
const CELLS_PER_CLUSTER = 380;
const CLUSTERS = [4, 12] as const;

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
  /** Per-cell state, displayed ink (0–1), character, and mask membership. */
  g: Uint8Array;
  ink: Float32Array;
  glyph: Uint8Array;
  inside: Uint8Array;
  glyphs: string;
  states: number;
  color: string;
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

const pick = <T,>(xs: readonly T[]) =>
  xs[Math.floor(Math.random() * xs.length)];

/** A few distinct characters from the set, in random order. */
const sample = (chars: string, n: number) =>
  [...chars]
    .sort(() => Math.random() - 0.5)
    .slice(0, n)
    .join("");

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

/** The character a cell is typed with, from its state and surroundings. */
const glyphFor = (c: Cluster, i: number, j: number, s: number) => {
  const n = c.glyphs.length;
  switch (c.kind) {
    case "life":
    case "majority":
      return Math.min(neighbours(c, i, j), n - 1);
    case "cyclic":
      return s % n;
    default:
      return Math.floor(Math.random() * n);
  }
};

/** How strongly a live cell is typed, before its fade. */
const strength = (c: Cluster, s: number) => {
  if (!s) return 0;
  if (c.kind === "brain") return s === 1 ? 1 : 0.45;
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
        c.glyph[k] = glyphFor(c, i, j, next[k]);
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
      if (c.g[k]) c.glyph[k] = glyphFor(c, i, j, c.g[k]);
    }
    c.stall = 0;
  }
};

const makeCluster = (spot: Rect, charset: string, now: number): Cluster => {
  const kind = pick(KINDS);
  const n = spot.w * spot.h;
  return {
    kind,
    ...spot,
    g: new Uint8Array(n),
    ink: new Float32Array(n),
    glyph: new Uint8Array(n),
    inside: new Uint8Array(n),
    glyphs: sample(charset, CLUSTER_GLYPHS),
    states: kind === "cyclic" ? randInt(4, 6) : 3,
    color: pick(DARK_SWATCHES),
    seed: randInt(1, 1e6),
    born: now,
    life: rand(LIFE[0], LIFE[1]),
    every: rand(STEP[0], STEP[1]),
    acc: 0,
    stall: 0,
    lastSum: 0,
  };
};

export const GlyphAutomata: React.FC<{
  /** Characters to type with. Defaults to the hero's. */
  charset?: string;
  /** Element whose box the clusters keep clear of. */
  avoid?: React.RefObject<HTMLElement | null>;
}> = ({ charset = heroCharset(), avoid }) => {
  const sim = React.useRef({
    clusters: [] as Cluster[],
    /** Times at which to try starting a cluster. */
    pending: [] as number[],
    grid: null as HTMLCanvasElement | null,
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
      const el = avoid?.current;
      if (el && canvas) {
        const r = el.getBoundingClientRect();
        const cr = canvas.getBoundingClientRect();
        const x = Math.floor((r.left - cr.left - s.ox) / CELL);
        const y = Math.floor((r.top - cr.top - s.oy) / CELL);
        keepOut.push({
          x,
          y,
          w: Math.ceil((r.right - cr.left - s.ox) / CELL) - x,
          h: Math.ceil((r.bottom - cr.top - s.oy) / CELL) - y,
        });
      }
      for (let tries = 0; tries < 60; tries++) {
        const cw = randInt(5, 14);
        const ch = randInt(4, 10);
        if (cw > s.cols - 2 || ch > s.rows - 2) return null;
        const spot = {
          x: randInt(1, s.cols - cw - 1),
          y: randInt(1, s.rows - ch - 1),
          w: cw,
          h: ch,
        };
        if (!keepOut.some((o) => overlaps(o, spot, 2))) return spot;
      }
      return null;
    };

    if (resized) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.cols = Math.floor(w / CELL);
      s.rows = Math.floor(h / CELL);
      s.ox = (w - s.cols * CELL) / 2;
      s.oy = (h - s.rows * CELL) / 2;

      // The dot grid, drawn once.
      const grid = document.createElement("canvas");
      grid.width = Math.round(w * dpr);
      grid.height = Math.round(h * dpr);
      const g = grid.getContext("2d");
      if (g) {
        g.scale(dpr, dpr);
        g.fillStyle = DOT_COLOR;
        g.globalAlpha = DOT_ALPHA;
        g.beginPath();
        for (let j = 0; j < s.rows; j++) {
          for (let i = 0; i < s.cols; i++) {
            const x = s.ox + (i + 0.5) * CELL;
            const y = s.oy + (j + 0.5) * CELL;
            g.moveTo(x + DOT_R, y);
            g.arc(x, y, DOT_R, 0, Math.PI * 2);
          }
        }
        g.fill();
      }
      s.grid = grid;

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
        const c = makeCluster(spot, charset, t - GROW);
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
      s.clusters.push(makeCluster(spot, charset, t));
      return [];
    });

    const f = dt * 60;
    const easeIn = 1 - Math.exp(-dt * INK_IN);
    const easeOut = 1 - Math.exp(-dt * INK_OUT);

    ctx.clearRect(0, 0, w, h);
    if (s.grid) ctx.drawImage(s.grid, 0, 0, w, h);
    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    s.clusters = s.clusters.filter((c) => {
      c.acc += dt;
      while (c.acc >= c.every) {
        c.acc -= c.every;
        step(c, t);
      }

      let showing = false;
      ctx.fillStyle = c.color;
      for (let j = 0; j < c.h; j++) {
        for (let i = 0; i < c.w; i++) {
          const k = j * c.w + i;
          const v = c.g[k];
          const target = strength(c, v);
          const a = c.ink[k];
          c.ink[k] = a + (target - a) * (target > a ? easeIn : easeOut);
          if (c.ink[k] < 0.01) continue;
          showing = true;

          if (v && Math.random() < FLICKER * f) {
            c.glyph[k] = Math.floor(Math.random() * c.glyphs.length);
          }

          // Cover the grid dot, then type the character slightly off the
          // grid with uneven ribbon pressure.
          const cx = s.ox + (c.x + i + 0.5) * CELL;
          const cy = s.oy + (c.y + j + 0.5) * CELL;
          ctx.clearRect(cx - 2, cy - 2, 4, 4);
          ctx.globalAlpha = DOT_ALPHA * (1 - c.ink[k]);
          ctx.fillStyle = DOT_COLOR;
          ctx.beginPath();
          ctx.arc(cx, cy, DOT_R, 0, Math.PI * 2);
          ctx.fill();

          const h1 = hash2(i, j, c.seed);
          const h2 = hash2(j, i, c.seed + 1);
          ctx.globalAlpha = c.ink[k] * (0.7 + 0.3 * h1);
          ctx.fillStyle = c.color;
          ctx.fillText(
            c.glyphs[c.glyph[k]],
            cx + (h1 - 0.5) * 1.4,
            cy + (h2 - 0.5) * 1.4 + 0.5,
          );
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
