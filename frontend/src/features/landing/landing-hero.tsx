import { colSpanWidth } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { CanvasFill } from "@/components/site/canvas/canvas-fill";
import { easeInOut, lerp } from "@/components/site/canvas/canvas-utils";
import {
  firstPulseAt,
  HERO_ACCENT,
  HERO_BLUES,
  HERO_DOT,
  HERO_DOT_GROW,
  HERO_GREYS,
  HERO_HIGHLIGHT,
  HERO_PALE,
  pulseGrowth,
} from "@/components/site/canvas/hero-dots";
import { INK } from "@/components/site/canvas/ink";
import { useCanvasLoop } from "@/components/site/canvas/use-canvas-loop";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { CTA_SHADOW, GRAIN_TILE } from "@/components/site/site-styles";
import { SolidCta } from "@/components/site/solid-cta";
import { Box, Text } from "@chakra-ui/react";
import { parseToRgba } from "color2k";
import React from "react";

/**
 * The /v3 hero: the title on the left, the description and a "Book a call"
 * button right-aligned opposite it, and under them a bed of dots — the data
 * layer — forming out of a scatter.
 *
 * 1,728 square dots start scattered across a 400px band below the middle
 * and are pulled, staggered over about a second, into sixteen lines 4px
 * apart, 36px under the copy. Slots are handed out by each dot's starting
 * x, so dots travel mostly vertically, and each line is slid along by a
 * golden-ratio step so the columns don't stack. Dots come up to full
 * strength as they land, then each line rolls in its own wave and every dot
 * now and then swells from 4px to 5.6px. Ten seconds after the bed forms,
 * every dot drifts back to where it started and the bed forms again. On
 * phones there are half as many dots, sitting 20px lower.
 *
 * Click the hero (or press R) to restart with a fresh scatter. Reduced
 * motion gets the formed bed, still.
 */

/** The hero's copy. */
const HEADLINE = "Building your intelligent data layer";
/** Where the title's second line starts: at "intelligent". */
const HEADLINE_BREAK = HEADLINE.indexOf("intelligent");
const DESCRIPTION =
  "We build the data layer that enables AI to learn from and act on your organization’s knowledge";

// ---- Formation ---------------------------------------------------------
const DOTS = 1728;
/**
 * The whole graphic — the starting scatter and the bed — is raised RAISE
 * px. Phones (canvas narrower than the `md` breakpoint) get half the dots,
 * raised PHONE_RAISE px more — negative, so they sit lower.
 */
const RAISE = 60;
const PHONE_MAX_W = 768;
const PHONE_DOTS = DOTS / 2;
const PHONE_RAISE = -20; // 80px lower than the earlier 60px raise
const LINES = 16;
const LINE_GAP = 4; // px, centre to centre
const LAYER_GAP = 96; // px below the copy where the first line forms
const DURATION = 25; // seconds until the last dot is fully pulled in
/** Spread of per-dot start delays, as a share of DURATION. */
const STAGGER = 0.04;
/**
 * The pull's ease-out exponent: front-loaded so dots leave the scatter
 * almost at once, with a long gentle settle that still ends at DURATION.
 */
const EASE = (() => {
  const half = (1 - 0.5 ** (1 / 3)) * 0.2;
  return Math.log(0.5) / Math.log(1 - half);
})();
const PULL = 0.02; // spring strength toward the slot
/** Dots start inside a band this tall, this far below the hero's middle. */
const FLOAT_BAND = 400;
const FLOAT_OFFSET = 190;

// ---- The wave ------------------------------------------------------------
// Each line of the formed bed rolls in its own slow travelling wave — its own
// phase, wavelength, speed and direction — so the rows move independently.
const WAVE_AMP = 24; // px, peak displacement
/** Each line's share of WAVE_AMP: 12–24px. */
const WAVE_AMP_RANGE: [number, number] = [0.5, 1];
/** This many lines, picked once, swell to WAVE_BIG_SCALE × WAVE_AMP. */
const WAVE_BIG_LINES = 3;
const WAVE_BIG_SCALE = 3;
const WAVE_LENGTH: [number, number] = [480, 800]; // px, crest to crest
const WAVE_PERIOD: [number, number] = [5, 9]; // seconds per cycle
/** px from its slot at which a landing dot starts to join the wave. */
const WAVE_JOIN = 8;

// ---- The loop ------------------------------------------------------------
/** Seconds the formed bed holds its wave before the dots drift back. */
const LOOP_HOLD = 10;
/**
 * Seconds the dots take to drift back to where they started, each one
 * setting off within the first LOOP_SCATTER_SPREAD of it so they peel away
 * gradually rather than all at once.
 */
const LOOP_SCATTER = 4.5;
const LOOP_SCATTER_SPREAD = 0.35;
/** The share of dots that must have landed for the bed to count as formed,
 * and how close (px) a dot must be to its slot. */
const LOOP_FORMED_SHARE = 0.98;
const LOOP_LANDED = 1;

// ---- Trails ----------------------------------------------------------------
/**
 * Each dot keeps its recent positions and draws them behind it, each step
 * back RETAIN dimmer, so moving dots leave a short trail.
 */
const RETAIN = 1 - 55 / 255;
const TRAIL_LEN = 14; // RETAIN^14 ≈ 3%, past which a trail point is invisible

// ---- Colour ----------------------------------------------------------------
/** The ground: the site surface. The canvas is transparent over it. */
const GROUND = parseToRgba(INK.canvas200);
/** Unsettled dots sit this far from the ground toward their shade; landed,
 * they take it in full. */
const DRIFT_STRENGTH = 0.6;
/** The lightest grey on 60% of the dots, more than the shared palette's. */
const PALE = { ...HERO_PALE, share: 0.6 };

/** Share of dots in the site's accent crimson. */
const CRIMSON_SHARE = 0.08;

const toRgb = (c: string) => parseToRgba(c).slice(0, 3);
const CRIMSON_RGB = toRgb(INK.crimson);
const ACCENT_RGB = toRgb(HERO_ACCENT.color);
const HIGHLIGHT_RGB = toRgb(HERO_HIGHLIGHT.color);
const PALE_RGB = toRgb(PALE.color);
const GREYS_RGB = HERO_GREYS.map(toRgb);
const BLUES_RGB = HERO_BLUES.map(toRgb);

/**
 * A dot's shade: CRIMSON_SHARE in crimson; the rest split as before — the
 * accent's share, then the navy's, then the pale grey's, then half greys
 * and half blues, each a random mix of two of its family.
 */
const dotShade = () => {
  if (Math.random() < CRIMSON_SHARE) return CRIMSON_RGB;
  let u = Math.random();
  if (u < HERO_ACCENT.share) return ACCENT_RGB;
  u -= HERO_ACCENT.share;
  if (u < HERO_HIGHLIGHT.share) return HIGHLIGHT_RGB;
  u -= HERO_HIGHLIGHT.share;
  if (u < PALE.share) return PALE_RGB;
  const family = Math.random() < 0.5 ? GREYS_RGB : BLUES_RGB;
  const a = family[Math.floor(Math.random() * family.length)];
  const b = family[Math.floor(Math.random() * family.length)];
  const f = Math.random();
  return [0, 1, 2].map((c) => lerp(a[c], b[c], f));
};

/** A dot's colour `k` of the way from the ground to its shade, as CSS. */
const groundToShade = (shade: number[], k: number) =>
  `rgb(${lerp(GROUND[0], shade[0], k)},${lerp(GROUND[1], shade[1], k)},${lerp(
    GROUND[2],
    shade[2],
    k,
  )})`;

/** A stable 0..1 value per line and channel. */
const lineHash = (line: number, k: number) => {
  const v = Math.sin(line * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/** One line's travelling wave. */
type WaveLine = {
  /** px, crest to crest. */
  length: number;
  /** Seconds per cycle. */
  period: number;
  /** Travel direction, ±1. */
  dir: number;
  /** Phase offset, in cycles. */
  offset: number;
  /** px, peak displacement. */
  amp: number;
};

/** The lines that swell to WAVE_BIG_SCALE, keyed by offset, rounded. */
const BIG_LINES = new Set(
  Array.from({ length: LINES }, (_, i) => Math.round(i * LINE_GAP))
    .sort((a, b) => lineHash(a, 4) - lineHash(b, 4))
    .slice(0, WAVE_BIG_LINES),
);

/** Each line's wave, worked out once per line rather than per dot. */
const WAVES = new Map<number, WaveLine>();
const waveLine = (line: number) => {
  let v = WAVES.get(line);
  if (!v) {
    v = {
      length: lerp(...WAVE_LENGTH, lineHash(line, 0)),
      period: lerp(...WAVE_PERIOD, lineHash(line, 1)),
      dir: lineHash(line, 2) < 0.5 ? -1 : 1,
      offset: lineHash(line, 3),
      amp: BIG_LINES.has(line)
        ? WAVE_AMP * WAVE_BIG_SCALE
        : WAVE_AMP * lerp(...WAVE_AMP_RANGE, lineHash(line, 5)),
    };
    WAVES.set(line, v);
  }
  return v;
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Share of DURATION before this dot's pull begins. */
  delay: number;
  /** Its slot: x, and its line's offset below the first line. */
  tx: number;
  ty: number;
  /** Its shade, [r, g, b]. */
  shade: number[];
  /** Seconds into the pass at which its current or next swell begins. */
  pulseAt: number;
  /** Last TRAIL_LEN positions as x,y pairs, a ring buffer at `head`. */
  trail: Float32Array;
  head: number;
  count: number;
  /** The strength `fill` was last built for, and that colour as CSS, so a
   * settled dot doesn't rebuild the same string every frame. */
  k: number;
  fill: string;
  /** Where it started, which it drifts back to; its strength when the
   * drift began; and when in the drift it sets off, 0..1. */
  sx: number;
  sy: number;
  sk: number;
  stagger: number;
};

/**
 * Evenly spaced slots along the lines, handed out in order of each dot's
 * starting x so dots travel mostly vertically and don't cross. Each run of
 * LINES dots shares a column, and within it the dot that starts highest
 * takes the top line. The smaller-wave lines' dots share each column's x,
 * so they stack on one vertical axis; the BIG_LINES are slid along by a
 * golden-ratio fraction of the spacing, off those columns.
 */
const assignSlots = (dots: Dot[], width: number) => {
  const cols = Math.ceil(dots.length / LINES);
  const spacing = width / cols;
  const byX = [...dots].sort((a, b) => a.x - b.x);
  for (let col = 0; col < cols; col++) {
    byX
      .slice(col * LINES, (col + 1) * LINES)
      .sort((a, b) => a.y - b.y)
      .forEach((d, line) => {
        const shift = BIG_LINES.has(Math.round(line * LINE_GAP))
          ? (line * 0.618034) % 1
          : 0;
        d.tx = ((col + shift) * spacing) % width;
        d.ty = line * LINE_GAP;
      });
  }
};

/** A square dot, half-width `r`, centred on x, y. */
const mark = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) =>
  ctx.fillRect(x - r, y - r, r * 2, r * 2);

/**
 * Hero height: exactly one viewport (the small viewport, so a phone's
 * toolbar can't push it past the fold), running up behind the overlaid nav.
 */
const HERO_BOX = { h: "100svh" } as const;

/**
 * The copy's box: full width below lg, then centred on the grid with the
 * same inset either side — one column at lg (columns 2–15), two from xl
 * (columns 3–14).
 */
const COPY_BOX = {
  w: { base: "full", lg: colSpanWidth(14), xl: colSpanWidth(12) },
  mx: "auto",
} as const;

export const LandingHero: React.FC = () => {
  const copy = React.useRef<HTMLDivElement>(null);
  const sim = React.useRef({
    dots: [] as Dot[],
    start: 0,
    restart: true,
    /** Whether the dots were laid out for a phone. */
    phone: false,
    /** When (seconds into this pass) the bed formed, and when the dots
     * began drifting back to their starts. */
    formedAt: null as number | null,
    scatterAt: null as number | null,
  });
  const restart = React.useCallback(() => {
    sim.current.restart = true;
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, reduced, resized }) => {
    const s = sim.current;
    const c = copy.current;
    const phone = w < PHONE_MAX_W;
    const raise = RAISE + (phone ? PHONE_RAISE : 0);
    const layerY =
      (c ? c.offsetTop + c.offsetHeight + LAYER_GAP : h * 0.5) - raise;
    // Crossing the breakpoint changes the dot count: start a fresh pass.
    if (resized && phone !== s.phone) s.restart = true;

    if (s.restart) {
      s.phone = phone;
      s.dots = Array.from({ length: phone ? PHONE_DOTS : DOTS }, () => ({
        x: Math.random() * w,
        y:
          (h - FLOAT_BAND) / 2 +
          FLOAT_OFFSET -
          raise +
          Math.random() * FLOAT_BAND,
        vx: 0,
        vy: 0,
        delay: Math.random() * STAGGER,
        tx: 0,
        ty: 0,
        shade: dotShade(),
        pulseAt: firstPulseAt(),
        trail: new Float32Array(TRAIL_LEN * 2),
        head: 0,
        count: 0,
        k: NaN,
        fill: "",
        sx: 0,
        sy: 0,
        sk: 1,
        stagger: Math.random(),
      }));
      assignSlots(s.dots, w);
      for (const d of s.dots) {
        d.sx = d.x;
        d.sy = d.y;
      }
      s.start = t;
      s.restart = false;
      s.formedAt = null;
      s.scatterAt = null;
    } else if (resized) {
      assignSlots(s.dots, w);
    }

    ctx.clearRect(0, 0, w, h);
    const r = HERO_DOT / 2;

    // Reduced motion: skip the journey, show the formed layer.
    if (reduced) {
      for (const d of s.dots) {
        ctx.fillStyle = `rgb(${d.shade[0]},${d.shade[1]},${d.shade[2]})`;
        mark(ctx, d.tx, layerY + d.ty, r);
      }
      return;
    }

    // The motion is tuned per 60fps frame; scale to real frame time.
    const f = dt * 60;
    const damp = 1 - (1 - 0.08) ** f;
    const elapsed = t - s.start;
    const global = Math.min(elapsed / DURATION, 1);
    // How far through drifting back to the start this pass is, or -1 while
    // forming and holding.
    const scatter =
      s.scatterAt !== null ? (elapsed - s.scatterAt) / LOOP_SCATTER : -1;
    let landed = 0;

    /** A dot's wave offset, eased in over its last few px of landing so the
     * bed only moves once it has formed. */
    const waveAt = (d: Dot) => {
      const join = Math.min(
        Math.max(1 - Math.abs(layerY + d.ty - d.y) / WAVE_JOIN, 0),
        1,
      );
      const { length, period, dir, offset, amp } = waveLine(Math.round(d.ty));
      const phase =
        (d.tx / length) * Math.PI * 2 +
        offset * Math.PI * 2 -
        dir * (elapsed / period) * Math.PI * 2;
      return amp * Math.sin(phase) * join * join * (3 - 2 * join);
    };

    /** One dot at x, y and strength k, behind its trail unless `still`. */
    const drawDot = (
      d: Dot,
      x: number,
      y: number,
      k: number,
      still: boolean,
    ) => {
      if (k !== d.k) {
        d.k = k;
        d.fill = groundToShade(d.shade, k);
      }
      ctx.fillStyle = d.fill;
      // The trail: oldest first, each step back one RETAIN dimmer.
      for (let age = still ? 0 : d.count; age >= 1; age--) {
        const i = (d.head - age + TRAIL_LEN) % TRAIL_LEN;
        ctx.globalAlpha = RETAIN ** age;
        ctx.fillRect(d.trail[i * 2] - r, d.trail[i * 2 + 1] - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      mark(ctx, x, y, r + pulseGrowth(d, elapsed, HERO_DOT_GROW));
      d.trail[d.head * 2] = x;
      d.trail[d.head * 2 + 1] = y;
      d.head = (d.head + 1) % TRAIL_LEN;
      d.count = Math.min(d.count + 1, TRAIL_LEN);
    };

    for (const d of s.dots) {
      if (scatter >= 0) {
        // Drifting back: from its place in the wave to where it started,
        // fading back to its starting strength, setting off at its own
        // moment early in the drift.
        const own =
          (scatter - d.stagger * LOOP_SCATTER_SPREAD) /
          (1 - LOOP_SCATTER_SPREAD);
        const e = easeInOut(Math.min(Math.max(own, 0), 1));
        drawDot(
          d,
          lerp(d.x, d.sx, e),
          lerp(d.y + waveAt(d), d.sy, e),
          lerp(d.sk, DRIFT_STRENGTH, e),
          false,
        );
        continue;
      }

      // Per-dot eased progress (staggered so they arrive gradually).
      let p = Math.min(Math.max((global - d.delay) / (1 - d.delay), 0), 1);
      p = 1 - (1 - p) ** EASE;

      // Spring toward the dot's slot (shortest wrapped distance in x).
      let dx = d.tx - d.x;
      if (dx > w / 2) dx -= w;
      if (dx < -w / 2) dx += w;
      d.vx = lerp(d.vx, dx * PULL * p, damp);
      d.vy = lerp(d.vy, (layerY + d.ty - d.y) * PULL * p, damp);
      d.x += d.vx * f;
      d.y += d.vy * f;
      if (d.x < 0) d.x += w;
      if (d.x > w) d.x -= w;

      if (
        p > 0.98 &&
        Math.abs(d.tx - d.x) < LOOP_LANDED &&
        Math.abs(layerY + d.ty - d.y) < LOOP_LANDED
      ) {
        landed++;
      }

      // Dots come up to full strength as they join the layer.
      drawDot(
        d,
        d.x,
        d.y + waveAt(d),
        lerp(DRIFT_STRENGTH, 1, p),
        p > 0.99 && Math.abs(d.vx) + Math.abs(d.vy) < 0.02,
      );
    }

    if (s.scatterAt === null) {
      if (s.formedAt === null && landed >= s.dots.length * LOOP_FORMED_SHARE) {
        s.formedAt = elapsed;
      }
      if (s.formedAt !== null && elapsed - s.formedAt >= LOOP_HOLD) {
        s.scatterAt = elapsed;
        for (const d of s.dots) d.sk = d.k;
      }
    } else if (scatter >= 1) {
      // Back where they started: form the bed again from here, keeping each
      // dot's pulse on its schedule across the new pass's clock.
      for (const d of s.dots) {
        d.x = d.sx;
        d.y = d.sy;
        d.vx = 0;
        d.vy = 0;
        d.count = 0;
        d.pulseAt -= elapsed;
      }
      s.start = t;
      s.formedAt = null;
      s.scatterAt = null;
    }
  });

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      {...HERO_BOX}
      bg="site.bg.surface"
      bgImage={GRAIN_TILE}
      bgSize="200px 200px"
      onClick={restart}
      cursor="default"
    >
      <CanvasFill ref={canvasRef} />
      {/* A div: the hero box itself is the section. */}
      <Section
        as="div"
        rhythm="none"
        position="relative"
        h="full"
        display="flex"
        alignItems="center"
        pointerEvents="none"
      >
        <Box
          ref={copy}
          // Centred on the viewport, then raised 80px + 4rem. The raise is a
          // transform, which the bed (hung off the box's laid-out bottom
          // edge) doesn't follow.
          position="relative"
          transform="translateY(calc(-80px - 4rem))"
          {...COPY_BOX}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          // Side by side, the title and the description + CTA share a
          // horizontal centre line.
          alignItems={{ base: "flex-start", md: "center" }}
          gap="32px"
        >
          <Text
            as="h1"
            textStyle="h2"
            fontSize={{ base: "32px", md: "36px" }}
            fontWeight={350}
            letterSpacing="-0.025em"
            color="site.fg"
            // Two set lines, broken before "intelligent"; held on them from
            // md up, free to wrap on phones.
            whiteSpace={{ md: "nowrap" }}
          >
            {HEADLINE.slice(0, HEADLINE_BREAK).trimEnd()}
            <br />
            {HEADLINE.slice(HEADLINE_BREAK)}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={{ base: "flex-start", md: "flex-end" }}
            // Stacked on mobile, it spans the column, so the description
            // caps at its edge; beside the title, it narrows to fit.
            w={{ base: "full", md: "auto" }}
            minW={0}
            gap="20px"
          >
            <Text
              textStyle="body.md"
              // A step down on phones: 14px, 16px from md.
              fontSize={{ base: "0.875rem", md: "1rem" }}
              lineHeight="1.2"
              color="site.fg"
              textAlign={{ base: "left", md: "right" }}
              // Beside the title it stays 420px wide, and the lines balance.
              w="420px"
              maxW="full"
              css={{ textWrap: "balance" }}
            >
              {DESCRIPTION}
            </Text>
            <Box
              pointerEvents="auto"
              // The CTA shouldn't restart the animation.
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <SolidCta
                h="27px"
                boxShadow={CTA_SHADOW}
                href={CONTACT_HREF}
                labelProps={{ gap: "8px" }}
              >
                Book a call
              </SolidCta>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};
