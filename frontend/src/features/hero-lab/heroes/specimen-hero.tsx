import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { gridGeometry } from "@/features/hero-lab/grid-geometry";
import {
  CanvasFill,
  Cursor,
  DESCRIPTION,
  HEADLINE,
  HERO_BOX,
  INK,
} from "@/features/hero-lab/hero-shared";
import { hash2, useCanvasLoop } from "@/features/hero-lab/use-canvas-loop";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * 03 — Specimen. After ref 3: a plotter sheet on dot-grid paper, with
 * registration marks and a handful of mounted specimens.
 *
 * Each plate is one kind of firm knowledge in its native form: memos as dense
 * prose, models as a woven table, conversations as an unruly scatter, deal
 * history as a long dotted column, transcripts as a scrawl. One dotted bus
 * runs under all of them. Marks travel down from every plate, along the bus,
 * and land in the ordered matrix on the right — the same material, now
 * structured, and the only place colour appears on the sheet.
 *
 * Six paper dots to a grid column, so every plate edge sits on a column line.
 */

type Plate = {
  key: string;
  label: string;
  /** Grid column the plate starts on (fractional allowed), and its width. */
  col: number;
  cols: number;
  /** Top and bottom as fractions of the sheet height. */
  top: number;
  bottom: number;
  /**
   * How its marks leave for the bus: straight down from a point along its
   * bottom edge, or out of its right side to a lane on a (fractional) column,
   * for plates with another plate beneath them.
   */
  exit: { down: number } | { lane: number };
};

const PLATES: Plate[] = [
  {
    key: "memos",
    label: "A — IC memos",
    col: 1,
    cols: 3,
    top: 0.1,
    bottom: 0.31,
    exit: { lane: 4.1 },
  },
  {
    key: "models",
    label: "B — Portfolio models",
    col: 1,
    cols: 2,
    top: 0.42,
    bottom: 0.56,
    exit: { lane: 4.4 },
  },
  {
    key: "threads",
    label: "C — Email threads",
    col: 5,
    cols: 3,
    top: 0.1,
    bottom: 0.5,
    exit: { down: 0.55 },
  },
  {
    key: "history",
    label: "D — Deal history",
    col: 5,
    cols: 1,
    top: 0.58,
    bottom: 0.84,
    exit: { down: 0 },
  },
  {
    key: "notes",
    label: "E — Meeting notes",
    col: 1,
    cols: 3,
    top: 0.67,
    bottom: 0.76,
    exit: { down: 0.5 },
  },
];
const LAYER = {
  label: "F — The data layer",
  col: 11,
  cols: 2,
  top: 0.6,
  bottom: 0.84,
};
const BUS_Y = 0.91;
const MATRIX = 12; // slots per side

type Box2 = { x: number; y: number; w: number; h: number };
type Layout = {
  dp: number;
  plates: (Plate & Box2)[];
  layer: Box2;
  busY: number;
  paths: { pts: [number, number][]; len: number }[];
  threads: { x: number; y: number; r: number; hollow: boolean }[];
  stat: HTMLCanvasElement;
};

const mulberry = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const polyLen = (pts: [number, number][]) =>
  pts
    .slice(1)
    .reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

const pointAt = (pts: [number, number][], d: number): [number, number] => {
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const seg = Math.hypot(bx - ax, by - ay);
    if (d <= seg)
      return [ax + ((bx - ax) * d) / seg, ay + ((by - ay) * d) / seg];
    d -= seg;
  }
  return pts[pts.length - 1];
};

/** Everything that doesn't move, rendered once per resize. */
const buildLayout = (w: number, h: number, scale: number): Layout => {
  const g = gridGeometry(w);
  const dp = g.pitch / 6;
  const snapY = (f: number) => Math.round((f * h) / dp) * dp;
  const box = (p: {
    col: number;
    cols: number;
    top: number;
    bottom: number;
  }) => ({
    x: g.colLeft(p.col),
    y: snapY(p.top),
    w: p.cols * g.pitch - g.gap,
    h: snapY(p.bottom) - snapY(p.top),
  });
  const plates = PLATES.map((p) => ({ ...p, ...box(p) }));
  const layer = box(LAYER);
  const busY = snapY(BUS_Y);

  const stat = document.createElement("canvas");
  stat.width = Math.round(w * scale);
  stat.height = Math.round(h * scale);
  const c = stat.getContext("2d")!;
  c.scale(scale, scale);
  const rnd = mulberry(11);

  // Paper and its dot grid.
  c.fillStyle = INK.canvas100;
  c.fillRect(0, 0, w, h);
  c.fillStyle = INK.soot300;
  for (let x = g.colLeft(1); x < w - g.inset / 2; x += dp)
    for (let y = dp; y < h; y += dp) c.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);

  // Registration: × in both margins every eight rows, numbered on the left.
  c.strokeStyle = INK.soot400;
  c.fillStyle = INK.soot400;
  c.lineWidth = 0.8;
  c.font = "300 8px 'Geist Mono', ui-monospace, monospace";
  for (let y = dp * 8, n = 8; y < h - dp; y += dp * 8, n += 8) {
    for (const x of [g.inset / 2, w - g.inset / 2]) {
      c.beginPath();
      c.moveTo(x - 3, y - 3);
      c.lineTo(x + 3, y + 3);
      c.moveTo(x + 3, y - 3);
      c.lineTo(x - 3, y + 3);
      c.stroke();
    }
    c.fillText(String(n), g.inset / 2 - 4, y + 13);
  }

  const ink = INK.soot700;
  for (const p of plates) {
    c.fillStyle = ink;
    if (p.key === "memos") {
      // Typewritten prose: rows of glyph-sized marks, ragged right,
      // paragraph breaks.
      for (let y = p.y + 4; y < p.y + p.h; y += 5) {
        if (rnd() < 0.08) continue;
        const end =
          p.x + p.w * (rnd() < 0.12 ? 0.3 + rnd() * 0.4 : 0.86 + rnd() * 0.14);
        let x = p.x;
        while (x < end) {
          const word = 2 + Math.floor(rnd() * 7);
          for (let k = 0; k < word && x < end; k++, x += 3) {
            const gh = 1.6 + rnd() * 1.4;
            c.fillRect(x, y + (3 - gh), 2.2, gh);
          }
          x += 3;
        }
      }
    } else if (p.key === "models") {
      // A woven table: cells solid, hatched, or blank.
      const cw = 11;
      const ch = 7;
      for (let y = p.y; y + ch <= p.y + p.h; y += ch + 2)
        for (let x = p.x; x + cw <= p.x + p.w; x += cw + 2) {
          const r = rnd();
          if (r < 0.45) c.fillRect(x, y, cw, ch);
          else if (r < 0.85)
            for (let k = 0; k < cw; k += 2) c.fillRect(x + k, y, 1, ch);
        }
    } else if (p.key === "history") {
      // A long ledger column: two dots wide, dense, with the odd gap.
      for (let y = p.y; y <= p.y + p.h; y += dp / 2)
        for (const x of [p.x, p.x + dp / 2])
          if (rnd() > 0.06) {
            c.beginPath();
            c.arc(x, y, 1.6, 0, Math.PI * 2);
            c.fill();
          }
    } else if (p.key === "notes") {
      // A scrawl: small arcs stepping along a slight diagonal.
      c.strokeStyle = ink;
      c.lineWidth = 1.1;
      for (let x = p.x; x < p.x + p.w; x += 7) {
        const f = (x - p.x) / p.w;
        const y = p.y + p.h * (0.2 + f * 0.6) + Math.sin(f * 9) * 3;
        c.beginPath();
        c.arc(x, y, 3, Math.PI * 1.1, Math.PI * 1.9);
        c.stroke();
      }
    }
  }

  // Routes: down from each plate to the bus, along it, up into the layer.
  const entryX = layer.x + layer.w / 2;
  const snapX = (x: number) =>
    g.colLeft(1) + Math.round((x - g.colLeft(1)) / dp) * dp;
  const paths = plates.map((p) => {
    const head: [number, number][] =
      "down" in p.exit
        ? [[snapX(p.x + p.w * p.exit.down), p.y + p.h + dp]]
        : [
            [snapX(p.x + p.w + dp), snapY((p.top + p.bottom) / 2)],
            [snapX(g.colLeft(p.exit.lane)), snapY((p.top + p.bottom) / 2)],
          ];
    const x = head[head.length - 1][0];
    const pts: [number, number][] = [
      ...head,
      [x, busY],
      [entryX, busY],
      [entryX, layer.y + layer.h + dp],
    ];
    return { pts, len: polyLen(pts) };
  });
  c.fillStyle = INK.soot500;
  for (const { pts, len } of paths)
    for (let d = 0; d < len; d += dp / 2) {
      const [x, y] = pointAt(pts, d);
      c.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
    }

  // The bus itself: a heavy dotted bar from the first plate to the layer.
  c.fillStyle = ink;
  for (let x = g.colLeft(1); x <= entryX; x += dp / 2)
    for (const y of [busY - 3, busY + 3])
      c.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);

  // Conversations: a branching scatter, generated as a few random walks
  // rising from a common root.
  const t0 = plates.find((p) => p.key === "threads")!;
  const threads: Layout["threads"] = [];
  for (let b = 0; b < 7; b++) {
    let x = t0.x + t0.w * 0.55;
    let y = t0.y + t0.h;
    const lean = (rnd() - 0.5) * 1.6;
    while (y > t0.y) {
      x += (rnd() - 0.5 + lean * 0.3) * 14;
      y -= 6 + rnd() * 10;
      x = Math.min(Math.max(x, t0.x), t0.x + t0.w);
      threads.push({ x, y, r: 0.8 + rnd() * rnd() * 3.4, hollow: rnd() < 0.3 });
    }
  }

  return { dp, plates, layer, busY, paths, threads, stat };
};

export const SpecimenHero: React.FC = () => {
  const layout = React.useRef<Layout>();
  const labels = React.useRef<(HTMLElement | null)[]>([]);
  const sim = React.useRef({
    marks: [] as { path: number; d: number }[],
    filled: 84,
    hold: 0,
    nextSpawn: 0,
  });

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    if (resized || !layout.current) {
      layout.current = buildLayout(w, h, ctx.getTransform().a);
      const L = layout.current;
      const matrixTop = L.layer.y + L.layer.h - Math.min(L.layer.w, L.layer.h);
      [...L.plates, { ...L.layer, y: matrixTop }].forEach((p, i) => {
        const el = labels.current[i];
        if (!el) return;
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y - 18}px`;
      });
    }
    const L = layout.current;
    const s = sim.current;
    ctx.drawImage(L.stat, 0, 0, w, h);

    // Conversations drift a little — the only plate that won't hold still.
    ctx.fillStyle = INK.soot700;
    ctx.strokeStyle = INK.soot700;
    ctx.lineWidth = 0.9;
    L.threads.forEach((n, i) => {
      const x = n.x + Math.sin(t * 0.7 + i) * 1.8;
      const y = n.y + Math.cos(t * 0.5 + i * 1.3) * 1.2;
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      if (n.hollow) ctx.stroke();
      else ctx.fill();
    });

    // Marks in transit.
    if (t > s.nextSpawn) {
      s.marks.push({
        path: Math.floor(hash2(Math.floor(t * 10), 3) * L.paths.length),
        d: 0,
      });
      s.nextSpawn = t + 0.35 + hash2(Math.floor(t * 10), 9) * 0.5;
    }
    const speed = 110;
    ctx.fillStyle = INK.soot800;
    s.marks = s.marks.filter((m) => {
      m.d += speed * dt;
      const p = L.paths[m.path];
      if (m.d >= p.len) {
        if (s.filled < MATRIX * MATRIX) s.filled++;
        return false;
      }
      const [x, y] = pointAt(p.pts, m.d);
      ctx.fillRect(x - 2, y - 2, 4, 4);
      return true;
    });

    // The layer: an ordered matrix, filling bottom-up in Rengo blue. When
    // full it holds, then clears for the next batch.
    if (s.filled >= MATRIX * MATRIX) {
      s.hold += dt;
      if (s.hold > 2.5) {
        s.filled = 0;
        s.hold = 0;
      }
    }
    const step = Math.min(L.layer.w, L.layer.h) / MATRIX;
    for (let k = 0; k < MATRIX * MATRIX; k++) {
      const col = k % MATRIX;
      const row = MATRIX - 1 - Math.floor(k / MATRIX);
      const x = L.layer.x + (col + 0.5) * step;
      const y = L.layer.y + L.layer.h - (MATRIX - row - 0.5) * step;
      ctx.beginPath();
      ctx.arc(x, y, step * 0.3, 0, Math.PI * 2);
      if (k < s.filled) {
        ctx.fillStyle = INK.rengo500;
        ctx.fill();
      } else {
        ctx.strokeStyle = INK.soot300;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  });

  return (
    <Box {...HERO_BOX} bg="site.bg.surface">
      <CanvasFill ref={canvasRef} />
      <Box position="absolute" inset={0} pointerEvents="none">
        {[...PLATES, LAYER].map((p, i) => (
          <Text
            key={p.label}
            ref={(el: HTMLElement | null) => {
              labels.current[i] = el;
            }}
            textStyle="caption"
            color={p === LAYER ? "site.brand" : "site.fg.muted"}
            position="absolute"
            whiteSpace="nowrap"
          >
            {p.label}
          </Text>
        ))}
      </Box>
      <Section rhythm="none" position="relative" pt="72px" pointerEvents="none">
        <Grid>
          <GridCol
            span={7}
            start={9}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text
              as="h1"
              textStyle="d1"
              color="site.fg.strong"
              bg="site.bg.surface"
              boxDecorationBreak="clone"
            >
              {HEADLINE}
              <Cursor />
            </Text>
          </GridCol>
          <GridCol
            span={4}
            start={9}
            mt="28px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="20px"
            pointerEvents="auto"
          >
            <Text textStyle="body.sm" color="site.fg" bg="site.bg.surface">
              {DESCRIPTION}
            </Text>
            <ArrowLink href="#" underline color="site.fg.strong" gap="12px">
              Get started
            </ArrowLink>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
