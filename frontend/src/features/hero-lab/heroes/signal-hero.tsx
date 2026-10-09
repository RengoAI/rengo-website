import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
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
 * 02 — Signal. After ref 2: glyph cells on a pale ground, tracing
 * interference contours between a handful of sources.
 *
 * Each source is one of the firm's systems, emitting what it knows as a
 * wave. Alone, a wave is just rings. Where two meet, they interfere, and the
 * cells that light up trace the overlap — the connections between systems
 * that nobody wrote down. The ledger bar on the left is the record those
 * connections are written to. The pointer is a seventh source: an agent's
 * query, bending every contour toward it.
 */

/** Positions are fractions of the instrument band. */
const SOURCES = [
  { label: "CRM", x: 0.09, y: 0.3, phase: 0 },
  { label: "Shared drive", x: 0.31, y: 0.76, phase: 1.7 },
  { label: "Inbox", x: 0.5, y: 0.22, phase: 3.1 },
  { label: "IC memos", x: 0.71, y: 0.66, phase: 0.8 },
  { label: "Meeting notes", x: 0.9, y: 0.28, phase: 2.4 },
];

/** Glyph cell size. Matches the reference's ~80 cells across, scaled up. */
const CELL = 9;

export const SignalHero: React.FC = () => {
  const queryLabel = React.useRef<HTMLDivElement>(null);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, pointer }) => {
    ctx.fillStyle = INK.canvas400;
    ctx.fillRect(0, 0, w, h);

    const cols = Math.floor(w / CELL);
    const rows = Math.floor(h / CELL);
    const ox = (w - cols * CELL) / 2;
    const oy = (h - rows * CELL) / 2;
    const k = 0.05; // wavenumber, per pixel — a ~125px wavelength
    const omega = 1.1;
    const falloff = Math.max(w, h) * 0.3;

    const emitters = SOURCES.map((s) => ({
      x: s.x * w,
      y: s.y * h,
      phase: s.phase,
      amp: 1,
    }));
    if (pointer) emitters.push({ ...pointer, phase: 0, amp: 1.6 });
    if (queryLabel.current) {
      queryLabel.current.style.opacity = pointer ? "1" : "0";
      if (pointer)
        queryLabel.current.style.transform = `translate(${pointer.x + 14}px, ${
          pointer.y - 18
        }px)`;
    }

    // Sample the summed field once per cell…
    const field = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const cx = ox + (i + 0.5) * CELL;
        const cy = oy + (j + 0.5) * CELL;
        let v = 0;
        for (const e of emitters) {
          const d = Math.hypot(cx - e.x, cy - e.y);
          v +=
            e.amp *
            Math.exp(-d / falloff) *
            Math.cos(k * d - omega * t + e.phase);
        }
        field[j * cols + i] = v;
      }

    const solid = (x: number, y: number) =>
      ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
    const hatch = (x: number, y: number) => {
      // The ref's ⊞: four sub-squares.
      const q = (CELL - 3) / 2;
      ctx.fillRect(x + 1, y + 1, q, q);
      ctx.fillRect(x + 2 + q, y + 1, q, q);
      ctx.fillRect(x + 1, y + 2 + q, q, q);
      ctx.fillRect(x + 2 + q, y + 2 + q, q, q);
    };

    const flicker = Math.floor(t * 2);
    ctx.fillStyle = INK.soot800;
    for (let j = 0; j < rows; j++) {
      const y = oy + j * CELL;
      // Column 0 is the ledger.
      if (j % 3 !== 2) ctx.fillRect(ox, y, CELL - 2, CELL - 1);

      for (let i = 2; i < cols - 1; i++) {
        const x = ox + i * CELL;
        const v = field[j * cols + i];
        const r = field[j * cols + i + 1];
        const b = j + 1 < rows ? field[(j + 1) * cols + i] : v;
        // …then light only the cells where it changes sign: the zero
        // contours, one cell thick. The steeper the crossing, the heavier
        // the glyph.
        if (v > 0 !== r > 0 || v > 0 !== b > 0) {
          const steep = Math.abs(v - r) + Math.abs(v - b);
          if (steep > 0.09) solid(x, y);
          else hatch(x, y);
        } else if (hash2(i, j, flicker) < 0.004) {
          solid(x, y);
        }
      }
    }

    // A dense knot at each source: the system itself.
    for (const e of emitters) {
      const ci = Math.round((e.x - ox) / CELL - 0.5);
      const cj = Math.round((e.y - oy) / CELL - 0.5);
      for (let dj = -4; dj <= 4; dj++)
        for (let di = -4; di <= 4; di++) {
          const d = Math.hypot(di, dj) / 4.5;
          if (d > 1 || ci + di < 2) continue;
          if (hash2(ci + di, cj + dj, flicker + 99) < 0.85 * (1 - d))
            hatch(ox + (ci + di) * CELL, oy + (cj + dj) * CELL);
        }
    }

    // A tick on the ledger for each source, level with it.
    ctx.fillStyle = INK.crimson;
    for (const e of emitters.slice(0, SOURCES.length)) {
      const j = Math.round((e.y - oy) / CELL - 0.5);
      ctx.fillRect(ox + CELL, oy + j * CELL + 3, CELL, 3);
    }
  });

  return (
    <Box
      {...HERO_BOX}
      bg="site.bg.surface"
      display="flex"
      flexDirection="column"
    >
      <Section rhythm="none" pt="64px" pb="40px">
        <Grid alignItems="end">
          <GridCol span={10}>
            <Text as="h1" textStyle="h1" color="site.fg.strong" maxW="640px">
              {HEADLINE}
              <Cursor />
            </Text>
          </GridCol>
          <GridCol
            span={4}
            start={13}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="20px"
          >
            <Text textStyle="body.sm" color="site.fg">
              {DESCRIPTION}
            </Text>
            <Box
              as="button"
              h="40px"
              px="14px"
              borderWidth="1px"
              borderColor="site.fg.strong"
              borderRadius="2px"
              display="inline-flex"
              alignItems="center"
              cursor="pointer"
              transition="background 150ms ease"
              _hover={{ bg: "site.bg.raised" }}
            >
              <ArrowLink color="site.fg.strong" gap="40px" _hover={{}}>
                Get started
              </ArrowLink>
            </Box>
          </GridCol>
        </Grid>
      </Section>

      {/* The instrument: the full grid width, everything left below the copy. */}
      <Section rhythm="none" flex="1" minH={0} pb="40px">
        <Box position="relative" h="full">
          <CanvasFill ref={canvasRef} />
          {SOURCES.map((s) => (
            <Text
              key={s.label}
              textStyle="caption"
              color="site.fg.strong"
              bg="site.bg.surface"
              px="4px"
              py="3px"
              position="absolute"
              left={`calc(${s.x * 100}% + 14px)`}
              top={`calc(${s.y * 100}% - 20px)`}
              whiteSpace="nowrap"
              pointerEvents="none"
            >
              {s.label}
            </Text>
          ))}
          <Text
            ref={queryLabel}
            textStyle="caption"
            color="site.fg.onDark"
            bg="site.accent"
            px="4px"
            py="3px"
            position="absolute"
            left={0}
            top={0}
            opacity={0}
            whiteSpace="nowrap"
            pointerEvents="none"
          >
            Agent query
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between" pt="10px">
          <Text textStyle="caption" color="site.fg.subtle">
            Fig. 02 — five systems, one field
          </Text>
          <Text textStyle="caption" color="site.fg.subtle">
            Move the pointer to query
          </Text>
        </Box>
      </Section>
    </Box>
  );
};
