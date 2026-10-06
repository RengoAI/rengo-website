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
} from "@/features/hero-lab/use-canvas-loop";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * 04 — Core. After ref 4: concentric arcs crossed by horizontal rules on a
 * dark ground, a bright disc at the right edge, lit cells thickening toward
 * it.
 *
 * The lit cells are pieces of knowledge — a memo, a thread, a meeting —
 * scattered thin at the edge of the firm. Each ring is a stage of the work
 * Rengo does: connect, structure, permission, act. Cells step inward one ring
 * at a time, and crowd as they near the centre, until they're absorbed into
 * the core: the data layer that agents read from.
 *
 * The arcs cross the horizon on the column seams, so the ring spacing is the
 * site grid bent around the core.
 */

const ROW = 18;
/** Arcs per grid column. */
const ARCS_PER_COL = 2;
/** Stage labels sit on these columns, outermost first. */
const STAGES: [string, number][] = [
  ["Connect", 9],
  ["Structure", 11],
  ["Permission", 12.5],
  ["Act", 13.5],
];
const CORE_COL = 14;
/** The bottom-left block the copy occupies, which motes keep out of. */
const COPY_COLS = 9;
const COPY_HEIGHT = 340;

type Geo = {
  copyTop: number;
  copyRight: number;
  cx: number;
  cy: number;
  r0: number;
  radii: number[];
  rows: number;
};
type Mote = { ring: number; row: number; next: number };

export const CoreHero: React.FC = () => {
  const geo = React.useRef<Geo>();
  const motes = React.useRef<Mote[]>([]);
  const grain = React.useRef<HTMLCanvasElement>();
  const stageEls = React.useRef<(HTMLElement | null)[]>([]);
  const pulse = React.useRef(0);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    grain.current ??= makeGrain(200, 40);

    if (resized || !geo.current) {
      const g = gridGeometry(w);
      const r0 = Math.min(h * 0.3, 290);
      const cx = g.colLeft(CORE_COL) + r0;
      const cy = Math.round((h * 0.42) / ROW) * ROW;
      // Arcs cross the horizon at every half column, from the core's edge
      // out past the left edge of the page.
      const radii = [r0];
      for (
        let x = g.colLeft(CORE_COL) - g.pitch / ARCS_PER_COL;
        x > -g.pitch;
        x -= g.pitch / ARCS_PER_COL
      )
        radii.push(cx - x);
      geo.current = {
        copyTop: h - COPY_HEIGHT,
        copyRight: g.colLeft(COPY_COLS + 1),
        cx,
        cy,
        r0,
        radii,
        rows: Math.ceil(h / ROW) + 1,
      };
      motes.current = Array.from({ length: 80 }, (_, i) => ({
        ring: 1 + Math.floor(hash2(i, 1) * (radii.length - 2)),
        row: Math.floor(hash2(i, 2) * geo.current!.rows) - Math.floor(cy / ROW),
        next: hash2(i, 3) * 2,
      }));
      STAGES.forEach(([, col], i) => {
        const el = stageEls.current[i];
        if (el) el.style.left = `${g.colLeft(col)}px`;
        if (el) el.style.top = `${cy - ROW + 4}px`;
      });
    }
    const { copyTop, copyRight, cx, cy, r0, radii, rows } = geo.current;
    const rowTop = (j: number) => cy + j * ROW;
    const arcX = (r: number, y: number) => {
      const dy = y - cy;
      return dy * dy < r * r ? cx - Math.sqrt(r * r - dy * dy) : null;
    };

    ctx.fillStyle = INK.soot800;
    ctx.fillRect(0, 0, w, h);

    // The rules: horizontals, then arcs.
    ctx.strokeStyle = "rgba(255,255,255,0.13)";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    for (let y = cy % ROW; y < h; y += ROW) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    for (const r of radii) {
      ctx.moveTo(cx + r, cy);
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }
    ctx.stroke();

    const fillCell = (ring: number, j: number, alpha: number) => {
      const rin = radii[ring];
      const rout = radii[ring + 1];
      if (rout === undefined) return;
      const y0 = rowTop(j) + 1.5;
      const y1 = rowTop(j + 1) - 1.5;
      const a = arcX(rin, y0);
      const b = arcX(rin, y1);
      const c = arcX(rout, y1);
      const d = arcX(rout, y0);
      if (a === null || b === null || c === null || d === null) return;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(d + 1.5, y0);
      ctx.lineTo(a - 1.5, y0);
      ctx.lineTo(b - 1.5, y1);
      ctx.lineTo(c + 1.5, y1);
      ctx.closePath();
      ctx.fill();
    };

    ctx.fillStyle = INK.canvas200;
    // A settled halo in the innermost rings — structure that has already
    // formed. Re-drawn from a slow clock so it shifts, but rarely.
    const epoch = Math.floor(t / 2.5);
    const j0 = -Math.ceil(cy / ROW);
    for (let ring = 0; ring < 4; ring++)
      for (let j = j0; j < j0 + rows; j++)
        if (hash2(ring, j, epoch + ring) < [0.55, 0.32, 0.16, 0.07][ring])
          fillCell(ring, j, 0.92);

    // Motes in transit. They step one ring at a time and dwell longer the
    // closer they get, which is what makes them crowd near the core.
    for (const m of motes.current) {
      m.next -= dt;
      if (m.next <= 0) {
        m.ring -= 1;
        if (m.ring < 0) {
          pulse.current = 1;
          m.ring = radii.length - 2;
          m.row = Math.floor(Math.random() * rows) + j0;
        }
        m.next = 0.2 + 2.6 * Math.exp(-m.ring / 3.5) + Math.random() * 0.3;
      }
      // Cells crossing the copy drop back so the headline stays clean.
      const y = rowTop(m.row);
      const inCopy = y > copyTop && (arcX(radii[m.ring], y) ?? 0) < copyRight;
      fillCell(m.ring, m.row, inCopy ? 0.1 : 0.95);
    }
    ctx.globalAlpha = 1;

    // The core: a pale disc, ruled like the field it sits in, that brightens
    // briefly each time something reaches it.
    pulse.current = Math.max(0, pulse.current - dt * 1.5);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = INK.canvas200;
    ctx.fillRect(cx - r0, cy - r0, r0 * 2, r0 * 2);
    ctx.strokeStyle = `rgba(21,23,24,${0.16 - pulse.current * 0.08})`;
    ctx.beginPath();
    for (let y = cy % ROW; y < h; y += ROW) {
      ctx.moveTo(cx - r0, y);
      ctx.lineTo(cx + r0, y);
    }
    ctx.stroke();
    ctx.restore();

    // Print texture over everything.
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = ctx.createPattern(grain.current, "repeat")!;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  });

  return (
    <Box {...HERO_BOX} bg="site.bg.darkRaised">
      <CanvasFill ref={canvasRef} />
      <Box position="absolute" inset={0} pointerEvents="none">
        {STAGES.map(([label], i) => (
          <Text
            key={label}
            ref={(el: HTMLElement | null) => {
              stageEls.current[i] = el;
            }}
            textStyle="caption"
            color="site.fg.onDarkMuted"
            bg="site.bg.darkRaised"
            px="3px"
            py="2px"
            position="absolute"
            whiteSpace="nowrap"
          >
            {label}
          </Text>
        ))}
      </Box>
      <Section
        rhythm="none"
        position="relative"
        h="full"
        pt="32px"
        pb="64px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        pointerEvents="none"
      >
        <Text
          textStyle="caption"
          color="site.fg.onDarkSubtle"
          bg="site.bg.darkRaised"
          alignSelf="flex-start"
          py="2px"
        >
          Fig. 04 — scattered knowledge, converging
        </Text>
        <Grid rowGap="32px" alignItems="end">
          <GridCol span={8}>
            {/* Light, per the dark-band convention on the landing page. */}
            <Text
              as="h1"
              textStyle="h1"
              fontWeight={300}
              color="site.fg.onDark"
              maxW="600px"
            >
              {HEADLINE}
              <Cursor />
            </Text>
          </GridCol>
          <GridCol span={4} start={1}>
            <Text
              textStyle="body.md"
              fontWeight={300}
              color="site.fg.onDarkMuted"
            >
              {DESCRIPTION}
            </Text>
          </GridCol>
          <GridCol span={3} start={6} pointerEvents="auto">
            <SolidCta tone="light" />
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
