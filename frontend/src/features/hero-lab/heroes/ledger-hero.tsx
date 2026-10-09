import { cssColLeft, gridGeometry } from "@/features/hero-lab/grid-geometry";
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
import { parseToRgba } from "color2k";
import React from "react";

/**
 * 06 — Ledger. After ref 6: a sheet of tall pencil-shaded swatches in a
 * strict grid, one tone each, with a dark band snaking through the whole.
 *
 * The sheet is a table of the firm. Each row is a field of the ontology —
 * sector, EBITDA, IC memo — and each column a record: a deal, a company, a
 * document. Tone is relevance to the question an agent is answering right
 * now. Because every record is described by the same fields, relevance moves
 * through the table as one continuous band rather than scattered noise —
 * that smoothness is what a governed data layer looks like. Each new
 * question redraws the band.
 *
 * Swatches run three to a grid column across all 16, so every third swatch
 * starts on a column line.
 */

/** One row per ontology field. */
const ROWS = 10;
const PER_COL = 3;
/** Hairline gap between swatches, both ways — the sheet reads as one mass. */
const BAR_GAP = 1;
const ROW_GAP = 1;
const PAD_Y = 40;
/**
 * The copy window: columns 1–7, as many rows down as the copy needs
 * (measured), with one swatch of air on its right.
 */
const COPY_COLS = 7;

/**
 * Each question's band: centre row at x∈[0,1] is
 * `a + slope·x + amp·sin(2π·freq·x + phase)`, `width` rows thick.
 */
const QUESTIONS = [
  {
    q: "Compare this deal to past IC memos",
    a: 0.5,
    slope: 7,
    amp: 1.4,
    freq: 0.9,
    phase: 0,
    width: 1.5,
  },
  {
    q: "Draft the LP update from verified numbers",
    a: 8.5,
    slope: -5,
    amp: 1.1,
    freq: 1.3,
    phase: 1.2,
    width: 1.3,
  },
  {
    q: "Pull this quarter’s portfolio financials",
    a: 4.5,
    slope: -0.5,
    amp: 2.8,
    freq: 1.1,
    phase: 2.4,
    width: 1.7,
  },
];
type Band = Omit<(typeof QUESTIONS)[number], "q">;
const HOLD = 6;
const MORPH = 2;

/**
 * Tone ramp — deliberately shallow. Paper-white silver to a mid silver,
 * never darker, so the whole sheet stays a whisper of grey-blue.
 */
const STOPS = [INK.silver100, INK.silver200, INK.silver300, INK.silver400].map(
  (c) => parseToRgba(c),
);
const tone = (v: number) => {
  const x = Math.min(Math.max(v, 0), 0.999) * (STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return `rgb(${a[0] + (b[0] - a[0]) * f},${a[1] + (b[1] - a[1]) * f},${
    a[2] + (b[2] - a[2]) * f
  })`;
};

const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

/** Vertical pencil strokes, built once: the hand-shaded texture. */
const makeStreaks = (w: number, h: number, scale: number) => {
  const c = document.createElement("canvas");
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  const g = c.getContext("2d")!;
  g.scale(scale, scale);
  g.lineWidth = 0.6;
  for (let i = 0; i < w * h * 0.004; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const len = 6 + Math.random() * 30;
    g.strokeStyle = `rgba(43,50,59,${0.04 + Math.random() * 0.08})`;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (Math.random() - 0.5) * 1.5, y + len);
    g.stroke();
  }
  return c;
};

export const LedgerHero: React.FC = () => {
  const grain = React.useRef<HTMLCanvasElement>();
  const streaks = React.useRef<HTMLCanvasElement>();
  const copy = React.useRef<HTMLDivElement>(null);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, pointer, resized }) => {
    grain.current ??= makeGrain(160, 22);
    if (resized || !streaks.current)
      streaks.current = makeStreaks(w, h, ctx.getTransform().a);

    const g = gridGeometry(w);
    const barPitch = g.pitch / PER_COL;
    const barW = barPitch - BAR_GAP;
    const x0 = g.colLeft(1);
    const cols = Math.floor((w - g.inset - x0 + BAR_GAP) / barPitch);
    const rowH = (h - PAD_Y * 2 - ROW_GAP * (ROWS - 1)) / ROWS;
    const rowTop = (r: number) => PAD_Y + r * (rowH + ROW_GAP);
    const windowRight = g.colLeft(COPY_COLS + 1) + barPitch / 2;
    const copyH = copy.current?.offsetHeight ?? 0;
    const windowRows = Math.min(
      ROWS - 2,
      Math.ceil((copyH + ROW_GAP) / (rowH + ROW_GAP)),
    );

    // Which question, and how far into the morph to the next.
    const cycle = HOLD + MORPH;
    const k = Math.floor(t / cycle);
    const qi = k % QUESTIONS.length;
    const next = QUESTIONS[(qi + 1) % QUESTIONS.length];
    const m = ease(Math.max(0, (t - k * cycle - HOLD) / MORPH));
    const cur = QUESTIONS[qi];
    const lerp = (key: keyof Band) => cur[key] + (next[key] - cur[key]) * m;
    const band: Band = {
      a: lerp("a"),
      slope: lerp("slope"),
      amp: lerp("amp"),
      freq: lerp("freq"),
      phase: lerp("phase"),
      width: lerp("width"),
    };

    ctx.fillStyle = INK.canvas100;
    ctx.fillRect(0, 0, w, h);

    const bars = new Path2D();
    for (let i = 0; i < cols; i++) {
      const x = x0 + i * barPitch;
      const fx = i / (cols - 1);
      const centre =
        band.a +
        band.slope * fx +
        band.amp *
          Math.sin(Math.PI * 2 * band.freq * fx + band.phase + t * 0.08);
      for (let r = 0; r < ROWS; r++) {
        if (r < windowRows && x < windowRight) continue;
        const y = rowTop(r);
        // The band, plus faint echoes a sheet-height away, as in the ref.
        let v = 0;
        for (const off of [0, ROWS + 1, -(ROWS + 1)]) {
          const d = (r - centre - off) / band.width;
          v += (off === 0 ? 1 : 0.55) * Math.exp(-d * d);
        }
        if (pointer) {
          const dx = (x + barW / 2 - pointer.x) / (barPitch * 4);
          const dy = (y + rowH / 2 - pointer.y) / (rowH * 1.2);
          v += 0.5 * Math.exp(-(dx * dx + dy * dy));
        }
        // Hand-shading never lands two swatches on quite the same tone.
        v += (valueNoise(i * 0.4, r * 0.7, 3) - 0.5) * 0.12;
        v += (hash2(i, r, 5) - 0.5) * 0.05;

        ctx.fillStyle = tone(0.08 + v * 0.9);
        ctx.fillRect(x, y, barW, rowH);
        bars.rect(x, y, barW, rowH);
      }
    }

    // Pencil: streaks and tooth, inside the swatches only.
    ctx.save();
    ctx.clip(bars);
    ctx.globalAlpha = 0.55;
    ctx.drawImage(streaks.current, 0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = ctx.createPattern(grain.current, "repeat")!;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  });

  return (
    <Box {...HERO_BOX} bg="site.bg.surface">
      <CanvasFill ref={canvasRef} />

      {/* The copy window, cut out of the top-left of the table. */}
      <Box position="absolute" inset={0} pointerEvents="none">
        <Box
          position="absolute"
          top={`${PAD_Y}px`}
          left="gutter"
          // Columns 1–7: up to the start of column 8, less one gutter.
          w={`calc(${cssColLeft(COPY_COLS + 1)} - 56px)`}
          ref={copy}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="24px"
          pt="24px"
          pb="8px"
        >
          <Text as="h1" textStyle="h1" color="site.fg.strong" maxW="560px">
            {HEADLINE}
            <Cursor />
          </Text>
          <Text
            textStyle="body.md"
            fontWeight={300}
            color="site.fg.muted"
            maxW="400px"
          >
            {DESCRIPTION}
          </Text>
          <Box pointerEvents="auto">
            <SolidCta tone="light" bg="site.bg.tint" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
