import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { gridGeometry } from "@/features/hero-lab/grid-geometry";
import {
  CanvasFill,
  Cursor,
  DESCRIPTION,
  HEADLINE,
  HERO_BOX,
  INK,
  SolidCta,
} from "@/features/hero-lab/hero-shared";
import {
  hash2,
  makeGrain,
  useCanvasLoop,
  valueNoise,
} from "@/features/hero-lab/use-canvas-loop";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * 05 — Hatch. After ref 5: a pen-plotter drawing where one stroke rule
 * renders a density field, and the marks change character as density rises.
 *
 * Density is context. Where the firm knows little about something, marks are
 * loose fragments pointing every which way — a stray note, an orphaned file.
 * As context builds they align to one direction (a shared definition: the
 * same "EBITDA" everywhere), then join end to end into continuous threads
 * (linked records), then saturate into solid ink — knowledge dense enough to
 * act on. The pointer adds context wherever it rests.
 *
 * Every mark is a leg of the same zigzag. Sparse: legs scatter and stretch.
 * Mid: only the up-legs draw, as ////. Dense: both legs, as a thread.
 * Densest: a second thread interleaves and the paper closes up.
 */

/** Row direction: rising left to right, as in the reference. */
const THETA = -0.32;
const ROW_GAP = 6;
const STEP = 3.5;
const AMP = 3.6;
/** Density is sampled on a coarse lattice and interpolated. */
const SAMPLE = 8;

/** Anisotropic ink masses, in fractions of the hero. */
const MASSES = [
  { x: 0.19, y: 0.36, rx: 0.13, ry: 0.22, rot: -0.35, amp: 1.3 },
  { x: 0.5, y: 0.5, rx: 0.1, ry: 0.17, rot: -0.2, amp: 1.2 },
  { x: 0.35, y: 0.44, rx: 0.2, ry: 0.08, rot: -0.3, amp: 0.7 },
  { x: 0.88, y: 0.92, rx: 0.12, ry: 0.17, rot: 0.3, amp: 1.15 },
  { x: 0.7, y: 0.7, rx: 0.15, ry: 0.06, rot: 0.65, amp: 0.5 },
];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/** Soft-edged rectangle mask, 1 inside. */
const rectMask = (
  x: number,
  y: number,
  r: { x0: number; x1: number; y0: number; y1: number },
  f = 60,
) =>
  smooth(r.x0 - f, r.x0, x) *
  (1 - smooth(r.x1, r.x1 + f, x)) *
  smooth(r.y0 - f, r.y0, y) *
  (1 - smooth(r.y1, r.y1 + f, y));

export const HatchHero: React.FC = () => {
  const grain = React.useRef<HTMLCanvasElement>();
  const lastDraw = React.useRef(-1);
  const touch = React.useRef({ x: 0, y: 0, k: 0 });

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, pointer, resized }) => {
    grain.current ??= makeGrain(200, 30);

    // The pointer's influence eases in and out rather than snapping.
    const tc = touch.current;
    if (pointer) {
      tc.x = pointer.x;
      tc.y = pointer.y;
    }
    tc.k += ((pointer ? 1 : 0) - tc.k) * Math.min(1, dt * 3);

    // A plotter doesn't need 60fps; ~24 keeps it cheap and reads as drawn.
    if (!resized && t - lastDraw.current < 1 / 24) return;
    lastDraw.current = t;

    const g = gridGeometry(w);
    // The copy sits in two clearings the ink keeps out of: headline top
    // right, body and CTA bottom left.
    const clearings = [
      { x0: g.colLeft(9) - 20, x1: w, y0: 0, y1: 290 },
      { x0: 0, x1: g.colLeft(6), y0: h - 250, y1: h },
    ];

    // Density on a coarse lattice.
    const gw = Math.ceil(w / SAMPLE) + 2;
    const gh = Math.ceil(h / SAMPLE) + 2;
    const dens = new Float32Array(gw * gh);
    const clear = new Float32Array(gw * gh);
    const masses = MASSES.map((m, i) => ({
      x: (m.x + Math.sin(t * 0.06 + i * 1.9) * 0.025) * w,
      y: (m.y + Math.cos(t * 0.05 + i * 2.3) * 0.03) * h,
      rx: m.rx * w * (1 + Math.sin(t * 0.09 + i) * 0.08),
      ry: m.ry * h,
      cos: Math.cos(m.rot),
      sin: Math.sin(m.rot),
      amp: m.amp,
    }));
    for (let j = 0; j < gh; j++)
      for (let i = 0; i < gw; i++) {
        const x = i * SAMPLE;
        const y = j * SAMPLE;
        let d = 0.06 + valueNoise(x * 0.004 + t * 0.02, y * 0.004, 5) * 0.14;
        for (const m of masses) {
          const dx = x - m.x;
          const dy = y - m.y;
          const u = (dx * m.cos + dy * m.sin) / m.rx;
          const v = (-dx * m.sin + dy * m.cos) / m.ry;
          d += m.amp * Math.exp(-(u * u + v * v));
        }
        if (tc.k > 0.01) {
          const dx = x - tc.x;
          const dy = y - tc.y;
          d += tc.k * 0.95 * Math.exp(-(dx * dx + dy * dy) / (2 * 70 * 70));
        }
        let m = 0;
        for (const c of clearings) m = Math.max(m, rectMask(x, y, c));
        dens[j * gw + i] = d * (1 - 0.92 * m);
        clear[j * gw + i] = m;
      }
    const density = (x: number, y: number) => {
      const fx = Math.min(Math.max(x / SAMPLE, 0), gw - 1.001);
      const fy = Math.min(Math.max(y / SAMPLE, 0), gh - 1.001);
      const i = Math.floor(fx);
      const j = Math.floor(fy);
      const u = fx - i;
      const v = fy - j;
      const a = dens[j * gw + i];
      const b = dens[j * gw + i + 1];
      const c = dens[(j + 1) * gw + i];
      const e = dens[(j + 1) * gw + i + 1];
      return a + (b - a) * u + (c - a) * v + (a - b - c + e) * u * v;
    };

    ctx.fillStyle = INK.canvas100;
    ctx.fillRect(0, 0, w, h);

    const ux = Math.cos(THETA);
    const uy = Math.sin(THETA);
    const px = -uy;
    const py = ux;
    const half = Math.hypot(w, h) / 2 + 20;
    const cx = w / 2;
    const cy = h / 2;

    // Two pens: a fine one for everything, and a broad one that only comes
    // out in the cores, which is what lets them close up to solid black.
    const fine = new Path2D();
    const broad = new Path2D();
    for (let k = -half; k < half; k += ROW_GAP / 2) {
      const row = Math.round(k / (ROW_GAP / 2));
      // Half-rows only ink where it's densest.
      const interleaved = row % 2 !== 0;
      for (let s = -half, n = 0; s < half; s += STEP, n++) {
        const bx = cx + ux * s + px * k;
        const by = cy + uy * s + py * k;
        if (bx < -30 || bx > w + 30 || by < -30 || by > h + 30) continue;
        const d = density(bx, by);
        // No marks at all on the paper under the copy.
        const li = Math.round(bx / SAMPLE);
        const lj = Math.round(by / SAMPLE);
        if (
          li >= 0 &&
          lj >= 0 &&
          li < gw &&
          lj < gh &&
          clear[lj * gw + li] > 0.25
        )
          continue;
        const r = hash2(n, row, 17);
        const up = n % 2 === 0;

        let draw: boolean;
        if (interleaved) draw = d > 0.95 && r < smooth(0.95, 1.3, d);
        else if (d > 0.7) draw = r < 0.4 + smooth(0.7, 0.95, d);
        else if (d > 0.3) draw = up && r < 0.15 + smooth(0.3, 0.7, d) * 0.8;
        else draw = r < 0.0025 + smooth(0.14, 0.3, d) * 0.06;
        if (!draw) continue;

        // The leg: from this vertex of the zigzag to the next.
        const side = up ? -1 : 1;
        const x0 = bx + px * AMP * side;
        const y0 = by + py * AMP * side;
        let x1 = bx + ux * STEP - px * AMP * side;
        let y1 = by + uy * STEP - py * AMP * side;

        // Below the alignment threshold, legs come loose: they turn away
        // from the common direction and stretch into fragments.
        const loose = 1 - smooth(0.15, 0.45, d);
        if (loose > 0.01) {
          const ang =
            Math.atan2(y1 - y0, x1 - x0) +
            (hash2(n, row, 23) - 0.5) * Math.PI * loose;
          const len =
            Math.hypot(x1 - x0, y1 - y0) * (1 + 4 * loose * hash2(n, row, 29));
          x1 = x0 + Math.cos(ang) * len;
          y1 = y0 + Math.sin(ang) * len;
          fine.moveTo(x0, y0);
          fine.lineTo(x1, y1);
          // Some fragments hook into an L, as the pen lifts and turns.
          if (loose > 0.5 && hash2(n, row, 31) < 0.22) {
            const l2 = len * (0.3 + hash2(n, row, 37) * 0.5);
            fine.lineTo(x1 - Math.sin(ang) * l2, y1 + Math.cos(ang) * l2);
          }
          continue;
        }
        const pen =
          d > 1.0 && hash2(n, row, 41) < smooth(1.0, 1.25, d) ? broad : fine;
        pen.moveTo(x0, y0);
        pen.lineTo(x1, y1);
      }
    }
    ctx.strokeStyle = INK.soot800;
    ctx.lineCap = "round";
    ctx.lineWidth = 0.9;
    ctx.stroke(fine);
    ctx.lineWidth = 2.4;
    ctx.stroke(broad);

    // Paper tooth.
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = ctx.createPattern(grain.current, "repeat")!;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  });

  return (
    <Box {...HERO_BOX} bg="site.bg.surface">
      <CanvasFill ref={canvasRef} />
      <Section
        rhythm="none"
        position="relative"
        h="full"
        pt="72px"
        pb="64px"
        pointerEvents="none"
      >
        <Grid h="full" gridTemplateRows="auto 1fr auto">
          {/* Headline hangs from the top-right, set ragged-left. */}
          <GridCol span={8} start={9} textAlign="right">
            <Text as="h1" textStyle="h1" color="site.fg.strong">
              {HEADLINE}
              <Cursor />
            </Text>
          </GridCol>
          <GridCol span={16} />
          <GridCol
            span={4}
            start={1}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="24px"
            pointerEvents="auto"
          >
            <Text textStyle="body.md" fontWeight={300} color="site.fg">
              {DESCRIPTION}
            </Text>
            <SolidCta bg="site.bg.brand" />
          </GridCol>
          <GridCol
            span={4}
            start={13}
            alignSelf="end"
            display="flex"
            justifyContent="flex-end"
          >
            <Text
              textStyle="caption"
              color="site.fg.muted"
              bg="site.bg.surface"
              px="4px"
              py="3px"
            >
              Fig. 05 — fragment → aligned → threaded → solid
            </Text>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
