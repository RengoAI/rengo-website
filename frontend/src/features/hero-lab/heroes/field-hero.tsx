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
  makeGrain,
  useCanvasLoop,
  valueNoise,
} from "@/features/hero-lab/use-canvas-loop";
import { Box, Text } from "@chakra-ui/react";
import { parseToRgba } from "color2k";
import React from "react";

/**
 * 01 — Field. After ref 1: a continuous gradient, quantized into stepped
 * plateaus, under a fixed lattice of dots.
 *
 * The field is the firm's knowledge — continuous, uneven, always moving. The
 * lattice is the data layer — fixed, evenly spaced, the same everywhere. Every
 * cell samples the field beneath it and snaps to one of five values: that
 * staircase edge is the moment knowledge becomes addressable.
 *
 * The lattice is the site grid itself: one dot on every column seam, so the
 * art and the copy share a coordinate system.
 */

/** Plateau colours, dark → light. Brand blues only. */
const LEVELS = [
  INK.rengo700,
  INK.rengo600,
  INK.rengo500,
  INK.rengo400,
  INK.sky,
];
const LEVEL_RGB = LEVELS.map((c) => parseToRgba(c));
/** Cells per grid column — the lattice dot lands every third cell. */
const CELLS_PER_COL = 3;
/** Field starts on column 7; columns 1–5 carry the copy, 6 is breathing room. */
const FIELD_COL = 7;

const fieldValue = (i: number, j: number, t: number) => {
  const a = valueNoise(i * 0.075 + t * 0.045, j * 0.075 - t * 0.03, 1);
  const b = valueNoise(i * 0.16 - t * 0.07, j * 0.16 + t * 0.02, 2);
  // Stretch the middle-heavy noise distribution so all five plateaus show.
  return 0.5 + (a * 0.7 + b * 0.3 - 0.5) * 2.1;
};

export const FieldHero: React.FC = () => {
  const grain = React.useRef<HTMLCanvasElement>();

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, pointer }) => {
    grain.current ??= makeGrain(180, 34);
    const g = gridGeometry(w);
    const cell = g.pitch / CELLS_PER_COL;
    // Cell edges pass through the column seams; rows hang from the bottom.
    const ox = g.seam(1) - cell * Math.ceil(g.seam(1) / cell);
    const oy = h - cell * Math.ceil(h / cell);
    const cols = Math.ceil((w - ox) / cell);
    const rows = Math.ceil((h - oy) / cell);
    const edgeBase = (g.seam(FIELD_COL) - ox) / cell;

    ctx.fillStyle = INK.canvas100;
    ctx.fillRect(0, 0, w, h);

    const region = new Path2D();
    const edges: number[] = [];
    for (let j = 0; j < rows; j++) {
      // The field's left edge breathes, but only in whole cells.
      const wobble = valueNoise(j * 0.12, t * 0.12, 7) * 4.8 - 1.6;
      const edge = Math.max(
        Math.round(edgeBase - 1),
        Math.round(edgeBase + wobble),
      );
      edges.push(edge);
      const y = oy + j * cell;
      region.rect(ox + edge * cell, y, w - (ox + edge * cell), cell);

      for (let i = edge; i < cols; i++) {
        const x = ox + i * cell;
        let v = fieldValue(i, j, t);
        if (pointer) {
          // The pointer is a query: it lifts the field locally, and the
          // lattice re-quantizes around it.
          const dx = x + cell / 2 - pointer.x;
          const dy = y + cell / 2 - pointer.y;
          v += 0.55 * Math.exp(-(dx * dx + dy * dy) / (2 * (cell * 3.3) ** 2));
        }
        // A slow light leak from the top, as in the reference.
        v += 0.25 * (1 - j / rows) - 0.12;
        const c = Math.min(Math.max(v, 0), 0.999);
        const q = Math.floor(c * LEVELS.length);
        // Keep a little of the continuous value inside each plateau so the
        // flats read as sampled gradient, not flat vector fill.
        const lo = LEVEL_RGB[q];
        const hi = LEVEL_RGB[Math.min(q + 1, LEVELS.length - 1)];
        const f = (c * LEVELS.length - q) * 0.22;
        ctx.fillStyle = `rgb(${lo[0] + (hi[0] - lo[0]) * f},${
          lo[1] + (hi[1] - lo[1]) * f
        },${lo[2] + (hi[2] - lo[2]) * f})`;
        ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
      }
    }

    // Grain, only where there is field.
    ctx.save();
    ctx.clip(region);
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = ctx.createPattern(grain.current, "repeat")!;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // The lattice: a dot on every column seam, every two cells down.
    for (let c = 1; c <= 17; c++) {
      const x = g.seam(c);
      const i = Math.round((x - ox) / cell);
      for (let j = 0; j <= rows; j += CELLS_PER_COL) {
        const y = oy + j * cell;
        if (y < 4) continue;
        const inField = i >= (edges[Math.min(j, rows - 1)] ?? cols);
        ctx.fillStyle = inField ? INK.canvas0 : INK.soot300;
        ctx.beginPath();
        ctx.arc(x, y, inField ? 1.7 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
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
        <Grid h="full">
          <GridCol
            span={5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box display="flex" flexDirection="column" gap="20px">
              <Text textStyle="caption" color="site.fg.subtle">
                Fig. 01 — knowledge, sampled to the lattice
              </Text>
              <Text as="h1" textStyle="h1" color="site.fg.strong">
                {HEADLINE}
                <Cursor />
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap="28px"
              pointerEvents="auto"
            >
              <Text
                textStyle="body.md"
                fontWeight={300}
                color="site.fg.muted"
                maxW="340px"
              >
                {DESCRIPTION}
              </Text>
              <SolidCta />
            </Box>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
