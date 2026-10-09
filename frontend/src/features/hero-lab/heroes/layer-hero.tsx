import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import {
  CanvasFill,
  DESCRIPTION,
  HEADLINE,
  HERO_BOX,
  HERO_BOX_UNDER_NAV,
  INK,
  SolidCta,
} from "@/features/hero-lab/hero-shared";
import { SimplexNoise } from "@/features/hero-lab/simplex-noise";
import { useCanvasLoop } from "@/features/hero-lab/use-canvas-loop";
import { Box, Text } from "@chakra-ui/react";
import { parseToRgba, rgba } from "color2k";
import React from "react";

/**
 * 07 — Layer. A port of the "dots coalescing into a layer" p5.js sketch to
 * a plain 2D canvas: same tunables, same motion, no p5 dependency.
 *
 * Each dot is one piece of the firm's knowledge, drifting in the currents of
 * day-to-day work — the flow field. Over time every dot is pulled out of the
 * current and into its own slot on a single horizontal line: the data
 * layer. Slots are handed out by each dot's starting x, so knowledge settles
 * where it already belongs instead of being reshuffled, and dots darken as
 * they join — loose to trusted.
 *
 * Departure from the sketch: `LAYER_Y` was the vertical centre, where the
 * line would strike through the centred copy. Here the layer forms just under
 * the CTA instead, as the baseline the copy stands on.
 *
 * `lines` > 1 stacks the layer into several parallel lines, `lineGap` px
 * apart (centre to centre), with the dots split evenly between them.
 * `layerGap` overrides how far under the copy the (first) line forms.
 * `toBottom` adds lines until the layer reaches the bottom of the hero,
 * keeping the density `dots` / `lines` per line.
 *
 * `plane` replaces the lines with a 2D target: a cols × rows dot grid laid
 * across a parallelogram (a flat sheet seen in perspective), given by three
 * corners in fractions of the hero. The plane sits behind the copy, so dots
 * that settle under the copy are held back to keep the text clean, and the
 * sheet itself fills in faintly as it forms.
 *
 * `glyphs` swaps each dot for a Serrif character drawn from a darker
 * palette (the deeper soot greys and silver/Rengo blues). A glyph keeps
 * scrambling while it drifts and locks to one character once it settles,
 * so the formed plane reads as a sheet of records rather than a dot grid.
 * `charset` narrows the characters glyphs are drawn from.
 *
 * Glyph mode only: `float={false}` skips the flow field — each glyph fades
 * in at its slot, scrambling as it appears, instead of drifting there.
 * `twinkle` keeps the formed layer alive: every few seconds each settled
 * glyph fades out, swaps to a new character, and fades back in.
 *
 * Click the hero (or press R) to restart.
 */

// ---- Tunables, as in the sketch ----------------------------------------
const NUM_DOTS = 600; // number of particles (also sets spacing in the row)
const DURATION = 25; // seconds until the layer is fully formed
const STAGGER = 0.2; // 0..1, spread of per-dot start delays (sketch: 0.35)
const LAYER_GAP = 72; // px below the copy block where the layer forms
const DOT_SIZE = 2.4; // px
const NOISE_SCALE = 0.0025; // spatial frequency of the flow field
const TIME_SCALE = 0.12; // how fast the field evolves
/**
 * With `wander`, how fast each dot moves along its own path through the
 * noise, per second — how quickly its heading turns.
 */
const WANDER_RATE = 0.2;
/** With `wander`: drift speed as a share of SPEED… */
const WANDER_SPEED = 0.5;
/** …and a cap on travel toward the layer, px per 60fps frame. */
const WANDER_MAX = 1.8;
const SPEED = 1.6; // base drift speed (px per 60fps frame)
const PULL = 0.02; // spring strength toward the layer
const TRAIL_ALPHA = 55; // lower = longer trails (0–255)
// ------------------------------------------------------------------------

/**
 * A very soft light-blue glow from the centre of the hero, behind the dots.
 * Sky, the site's light-blue accent, at a whisper: strongest at the centre,
 * gone by about two-thirds of the way out.
 */
const [SKY_R, SKY_G, SKY_B] = parseToRgba(INK.sky);
const GLOW = `radial-gradient(ellipse 70% 75% at 50% 50%, ${rgba(
  SKY_R,
  SKY_G,
  SKY_B,
  0.32,
)} 0%, ${rgba(SKY_R, SKY_G, SKY_B, 0.12)} 45%, ${rgba(
  SKY_R,
  SKY_G,
  SKY_B,
  0,
)} 100%)`;

/** The ground: the site surface. The canvas is transparent over it. */
const GROUND = parseToRgba(INK.canvas100);

/**
 * Two light families, half the dots from each: the soot greys and the
 * silver/sky blues. Within its family a dot takes a random mix of two
 * shades, so no two read quite alike.
 */
const GREYS = [INK.soot200, INK.soot300].map((c) => parseToRgba(c));
const BLUES = [INK.silver200, INK.silver300, INK.sky, INK.rengo300].map((c) =>
  parseToRgba(c),
);
const randomShade = () => {
  const family = Math.random() < 0.5 ? GREYS : BLUES;
  const a = family[Math.floor(Math.random() * family.length)];
  const b = family[Math.floor(Math.random() * family.length)];
  const f = Math.random();
  return [0, 1, 2].map((c) => lerp(a[c], b[c], f));
};
/**
 * Unsettled dots sit this far from the ground toward their shade; joined,
 * they take it in full. Higher than on a dark ground, where pale dots
 * would otherwise vanish into the page while drifting.
 */
const DRIFT_STRENGTH = 0.6;

/**
 * The glyph palette: the darker half of the same two families, two lighter
 * greys, and the accent red for one glyph in ten. Glyphs take one swatch
 * each, unmixed, so every colour can be pre-rendered once into an atlas
 * instead of setting a font and fill per glyph per frame.
 */
const DARK_GREYS = [INK.soot500, INK.soot600, INK.soot700];
const DARK_BLUES = [
  INK.silver500,
  INK.silver600,
  INK.silver700,
  INK.rengo500,
  INK.rengo600,
  INK.rengo700,
];
export const DARK_SWATCHES = [...DARK_GREYS, ...DARK_BLUES];
const LIGHT_GREYS = [INK.soot300, INK.soot400];
const GLYPH_SWATCHES = [...DARK_SWATCHES, ...LIGHT_GREYS, INK.crimson];
const ACCENT_SWATCH = GLYPH_SWATCHES.length - 1;
/** Share of glyphs in the accent red. */
const ACCENT_SHARE = 0.1;
/**
 * One glyph in ten accent red; of the rest, half light grey and the other
 * half split between dark greys and blues.
 */
const randomSwatch = () => {
  if (Math.random() < ACCENT_SHARE) return ACCENT_SWATCH;
  const r = Math.random();
  const from = (start: number, n: number) =>
    start + Math.floor(Math.random() * n);
  if (r < 0.5) return from(DARK_SWATCHES.length, LIGHT_GREYS.length);
  return r < 0.75
    ? from(0, DARK_GREYS.length)
    : from(DARK_GREYS.length, DARK_BLUES.length);
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const GLYPH_SIZE = 9; // px, font size
/** Narrowest glyph spacing along a line; fewer glyphs on narrow screens. */
const GLYPH_MIN_PITCH = 9.5;
const GLYPH_CELL = 12; // px, atlas cell (room for ascenders and descenders)
const GLYPH_FONT = `400 ${GLYPH_SIZE}px Serrif, "Noto Serif", Georgia, ui-serif, serif`;
/** Glyph drift strength: lower than dots', as the darker inks carry more. */
const GLYPH_DRIFT_STRENGTH = 0.4;
/** Chance per 60fps frame that a drifting glyph changes character. */
const SCRAMBLE = 0.08;
/** Without the float: glyphs start appearing over this many seconds… */
const APPEAR_SPREAD = 1.6;
/** …each taking this long to fade in. */
const APPEAR = 0.6;
/** Twinkle: seconds for a glyph to fade out (and again to fade back in). */
const TWINKLE_FADE = 0.45;
/** Twinkle: seconds a glyph holds between swaps, min and max. */
const TWINKLE_HOLD = [1.5, 6] as const;

const nextSwap = (now: number) =>
  now + lerp(TWINKLE_HOLD[0], TWINKLE_HOLD[1], Math.random());

/**
 * A settled glyph's twinkle, as an opacity multiplier: out, swap the
 * character, back in, then hold until its next swap.
 */
const twinkleAlpha = (d: Dot, now: number, chars: number) => {
  if (now < d.swapAt) return 1;
  const k = (now - d.swapAt) / TWINKLE_FADE;
  if (k < 1) return 1 - k;
  if (!d.swapped) {
    d.glyph = Math.floor(Math.random() * chars);
    d.swapped = true;
  }
  if (k < 2) return k - 1;
  d.swapAt = nextSwap(now);
  d.swapped = false;
  return 1;
};

/**
 * Every glyph in every swatch, pre-rendered at device pixel ratio: one row
 * per swatch, one cell per character.
 */
const buildAtlas = (charset: string) => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const atlas = document.createElement("canvas");
  atlas.width = Math.ceil(charset.length * GLYPH_CELL * dpr);
  atlas.height = Math.ceil(GLYPH_SWATCHES.length * GLYPH_CELL * dpr);
  const g = atlas.getContext("2d");
  if (!g) return null;
  g.scale(dpr, dpr);
  g.font = GLYPH_FONT;
  g.textAlign = "center";
  g.textBaseline = "middle";
  GLYPH_SWATCHES.forEach((c, row) => {
    g.fillStyle = c;
    [...charset].forEach((ch, col) => {
      g.fillText(ch, (col + 0.5) * GLYPH_CELL, (row + 0.5) * GLYPH_CELL + 0.5);
    });
  });
  return { canvas: atlas, dpr };
};
type Atlas = NonNullable<ReturnType<typeof buildAtlas>>;

const drawGlyph = (
  ctx: CanvasRenderingContext2D,
  atlas: Atlas,
  d: Dot,
  x: number,
  y: number,
) => {
  const s = GLYPH_CELL * atlas.dpr;
  ctx.drawImage(
    atlas.canvas,
    d.glyph * s,
    d.swatch * s,
    s,
    s,
    x - GLYPH_CELL / 2,
    y - GLYPH_CELL / 2,
    GLYPH_CELL,
    GLYPH_CELL,
  );
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  delay: number;
  tx: number;
  /**
   * Offset of this dot's line below the first one, px — or, with a plane,
   * its absolute target y.
   */
  ty: number;
  /** This dot's light blue, [r, g, b]. */
  shade: number[];
  /** Glyph mode: index into GLYPH_SWATCHES, and into the charset. */
  swatch: number;
  glyph: number;
  /** Twinkle: seconds since start when this glyph next swaps (Infinity
   * until a floating glyph settles), and whether the current swap has
   * changed its character yet. */
  swapAt: number;
  swapped: boolean;
  /** Last TRAIL_LEN positions as x,y pairs, a ring buffer at `head`. */
  trail: Float32Array;
  head: number;
  count: number;
  /** With `wander`: this dot's private start point in the noise. */
  nx: number;
  ny: number;
};

/**
 * The sketch's trails come from painting a translucent background over the
 * last frame, which rounds to a residue that never fully clears — visible
 * as a faint pattern, especially on a dark ground. Instead each dot keeps
 * its recent positions and the canvas is cleared every frame. Each past
 * position fades by the same factor the sketch's overpaint applied per frame,
 * so the trails look the same.
 */
const RETAIN = 1 - TRAIL_ALPHA / 255;
const TRAIL_LEN = 14; // RETAIN^14 ≈ 3%, past which a trail point is invisible

/**
 * Per-dot progress curve. The sketch used ease-in-out, which barely moves
 * for the first third of each dot's window, so the field spent ~10s in pure
 * noise drift before any pull showed. Ease-out front-loads the pull — dots
 * start leaving the current almost at once — and keeps a long, gentle
 * settle at the end, so the layer still finishes at DURATION.
 */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * The ease-out exponent that makes the pull reach half strength `drift`
 * times as soon as ease-out-cubic does. Shortens the opening float without
 * moving the end: every dot still lands by DURATION, just with a longer
 * gentle settle.
 */
const easeExponent = (drift: number) => {
  const half = (1 - 0.5 ** (1 / 3)) * drift;
  return Math.log(0.5) / Math.log(1 - half);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Evenly spaced slots along the line(s). Handed out in order of each dot's
 * starting x, so dots travel mostly vertically and don't cross. With several
 * lines, each run of `lines` dots shares an x column, and within it the dot
 * that starts highest takes the top line.
 *
 * `shift` slides each line along by a golden-ratio fraction of the spacing,
 * so the columns don't stack. Needed once lines sit closer together than
 * dots along a line: aligned columns would read as vertical stripes.
 */
const assignSlots = (
  dots: Dot[],
  width: number,
  lines: number,
  lineGap: number,
  shift: boolean,
) => {
  const cols = Math.ceil(dots.length / lines);
  const spacing = width / cols;
  const byX = [...dots].sort((a, b) => a.x - b.x);
  for (let col = 0; col < cols; col++) {
    byX
      .slice(col * lines, (col + 1) * lines)
      .sort((a, b) => a.y - b.y)
      .forEach((d, line) => {
        const phase = shift ? (line * 0.618034) % 1 : 0.5;
        d.tx = ((col + phase) * spacing) % width;
        d.ty = line * lineGap;
      });
  }
};

/** A parallelogram target: corners as [x, y] fractions of the hero. */
export type Plane = {
  cols: number;
  rows: number;
  bottomLeft: [number, number];
  bottomRight: [number, number];
  topLeft: [number, number];
};

/**
 * Grid slots across the plane. Same rule as the lines: a dot's starting x
 * picks its column (along the bottom edge), and within a column the dot
 * that starts highest takes the far row — so dots travel the short way in.
 */
const assignPlane = (dots: Dot[], w: number, h: number, plane: Plane) => {
  const { cols, rows, bottomLeft: bl, bottomRight: br, topLeft: tl } = plane;
  const ux = (br[0] - bl[0]) * w;
  const uy = (br[1] - bl[1]) * h;
  const vx = (tl[0] - bl[0]) * w;
  const vy = (tl[1] - bl[1]) * h;
  const byX = [...dots].sort((a, b) => a.x - b.x);
  for (let col = 0; col < cols; col++) {
    const u = (col + 0.5) / cols;
    byX
      .slice(col * rows, (col + 1) * rows)
      .sort((a, b) => a.y - b.y)
      .forEach((d, i) => {
        const v = 1 - (i + 0.5) / rows; // top of the column = far edge
        d.tx = bl[0] * w + u * ux + v * vx;
        d.ty = bl[1] * h + u * uy + v * vy;
      });
  }
};

/** The plane's outline as a path, for its faint fill. */
const planePath = (w: number, h: number, plane: Plane) => {
  const { bottomLeft: bl, bottomRight: br, topLeft: tl } = plane;
  const path = new Path2D();
  path.moveTo(bl[0] * w, bl[1] * h);
  path.lineTo(br[0] * w, br[1] * h);
  path.lineTo((br[0] + tl[0] - bl[0]) * w, (br[1] + tl[1] - bl[1]) * h);
  path.lineTo(tl[0] * w, tl[1] * h);
  path.closePath();
  return path;
};

/**
 * The clearing behind the copy: a soft oval hugging the text, not the
 * copy's full column, so the plane reads as continuous. Dots at its centre
 * are held back to UNDER_COPY of their strength and come back to full by
 * its rim. Half-width covers the 526px title; half-height is the copy's own
 * plus a margin.
 */
const UNDER_COPY = 0.15;
/** Darker glyphs need holding back further, and wider, to keep the type clean. */
const GLYPH_UNDER_COPY = 0.05;
const GLYPH_CLEAR_RX = 440;
const CLEAR_RX = 330;
const CLEAR_MARGIN_Y = 44;
/**
 * With `toBottom`, the last line's centre above the hero's bottom edge, px:
 * enough to seat the glyphs' baseline on the edge.
 */
const BOTTOM_INSET = 4;
/** The sheet's fill when fully formed — the screenshot's pale grey plane. */
const PLANE_FILL = parseToRgba(INK.canvas400);
const PLANE_FILL_ALPHA = 0.55;

export const LayerHero: React.FC<{
  lines?: number;
  lineGap?: number;
  /** Particle count; sets the spacing along each line. */
  dots?: number;
  /** px below the copy block where the (first) line forms. */
  layerGap?: number;
  /** Keep adding lines, `lineGap` apart, down to the bottom of the hero. */
  toBottom?: boolean;
  /** Offset each line's slots so the lines read horizontally. */
  shift?: boolean;
  /** Settle into a 2D plane instead of lines; overrides lines and dots. */
  plane?: Plane;
  /** Draw dark letters and digits instead of light dots. */
  glyphs?: boolean;
  /** Glyph mode: the characters to draw from. Defaults to A–Z and 0–9. */
  charset?: string;
  /**
   * Scales the opening float in the flow field: start delays and the time
   * for the pull to take hold. 0.5 halves it; 1 is the sketch's timing.
   */
  drift?: number;
  /**
   * Seconds of pure float in the flow field before any pull toward the
   * layer begins; the layer still takes DURATION to form after that.
   */
  hold?: number;
  /**
   * Steer each dot by its own path through the noise rather than by the
   * field at its position. Headings still turn smoothly, but neighbours no
   * longer steer alike, so dots stay scattered instead of gathering into
   * the field's streamlines.
   */
  wander?: boolean;
  /** Glyph mode: drift in through the flow field (true) or fade in place. */
  float?: boolean;
  /** Glyph mode: settled glyphs keep fading out and in as new characters. */
  twinkle?: boolean;
  /** The body copy under the headline. */
  description?: React.ReactNode;
  /** Extend up behind an overlaid nav (`<SiteNav overlay />`). */
  underNav?: boolean;
  /**
   * px to raise the copy above centre. The layer hangs off the copy, so it
   * rises with it.
   */
  lift?: number;
  /** Set the title in Serrif (the d3 display style) instead of Geist. */
  serifTitle?: boolean;
}> = ({
  lines = 1,
  toBottom = false,
  lineGap = 0,
  dots = NUM_DOTS,
  layerGap = LAYER_GAP,
  shift = false,
  plane,
  glyphs = false,
  charset = GLYPHS,
  drift = 1,
  hold = 0,
  wander = false,
  float = true,
  twinkle = false,
  description = DESCRIPTION,
  underNav = false,
  lift = 0,
  serifTitle = false,
}) => {
  const ease = easeExponent(drift);
  const count = plane ? plane.cols * plane.rows : dots;
  const place = (all: Dot[], w: number, h: number, lineCount: number) =>
    plane
      ? assignPlane(all, w, h, plane)
      : assignSlots(all, w, lineCount, lineGap, shift);
  const copy = React.useRef<HTMLDivElement>(null);
  const sim = React.useRef({
    dots: [] as Dot[],
    simplex: new SimplexNoise(7),
    start: 0,
    restart: true,
    atlas: null as Atlas | null,
    lines: lines,
  });
  const reduced = React.useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const restart = React.useCallback(() => {
    sim.current.restart = true;
  }, []);

  // The atlas bakes in the font, so rebuild it once Serrif has loaded.
  React.useEffect(() => {
    if (!glyphs) return;
    let live = true;
    document.fonts?.load(GLYPH_FONT).then(() => {
      if (live) sim.current.atlas = buildAtlas(charset);
    });
    return () => {
      live = false;
    };
  }, [glyphs, charset]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    const s = sim.current;

    const c = copy.current;
    // With a plane, targets are absolute; with lines, they hang off layerY.
    const top = plane
      ? 0
      : c
        ? c.offsetTop + c.offsetHeight + layerGap
        : h * 0.5;
    const bottomLine = h - BOTTOM_INSET;
    const toEdge = toBottom && !plane;
    const lineCount = toEdge
      ? Math.max(1, Math.floor((bottomLine - top) / lineGap) + 1)
      : lines;
    // To the bottom, the lines hang from the hero's edge rather than the
    // copy, so the last one always sits flush on the next section; the
    // first lands within a line of `layerGap` under the copy.
    const layerY = toEdge ? bottomLine - (lineCount - 1) * lineGap : top;
    // A new line count needs a new set of dots, not just new slots.
    if (resized && lineCount !== s.lines) s.restart = true;

    if (s.restart) {
      // Glyph lines keep their characters legible: on a narrow hero, fewer
      // to a line rather than packed closer.
      const perLine = Math.ceil(count / lines);
      const n =
        glyphs && !plane
          ? lineCount * Math.min(perLine, Math.floor(w / GLYPH_MIN_PITCH))
          : toBottom && !plane
            ? lineCount * perLine
            : count;
      const inPlace = glyphs && !float;
      s.dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        // In place, the delay is seconds until the glyph starts to appear.
        delay: Math.random() * (inPlace ? APPEAR_SPREAD : STAGGER * drift),
        tx: 0,
        ty: 0,
        shade: randomShade(),
        swatch: randomSwatch(),
        glyph: Math.floor(Math.random() * charset.length),
        // Floating glyphs schedule their first swap when they settle.
        swapAt: inPlace ? nextSwap(APPEAR_SPREAD + APPEAR) : Infinity,
        swapped: false,
        trail: new Float32Array(TRAIL_LEN * 2),
        head: 0,
        count: 0,
        nx: Math.random() * 1000,
        ny: Math.random() * 1000,
      }));
      place(s.dots, w, h, lineCount);
      s.lines = lineCount;
      s.start = t;
      s.restart = false;
      ctx.clearRect(0, 0, w, h);
    } else if (resized) {
      place(s.dots, w, h, lineCount);
      ctx.clearRect(0, 0, w, h);
    }

    if (glyphs && !s.atlas) s.atlas = buildAtlas(charset);
    const atlas = glyphs ? s.atlas : null;

    // The clearing behind the copy: 0 at its centre, 1 at and past its rim.
    const clear =
      plane && c
        ? {
            cx: c.offsetLeft + c.offsetWidth / 2,
            cy: c.offsetTop + c.offsetHeight / 2,
            ry: c.offsetHeight / 2 + CLEAR_MARGIN_Y,
          }
        : null;
    const openness = (d: Dot) => {
      if (!clear) return 1;
      const ex = (d.tx - clear.cx) / (glyphs ? GLYPH_CLEAR_RX : CLEAR_RX);
      const ey = (d.ty - clear.cy) / clear.ry;
      const r = Math.sqrt(ex * ex + ey * ey);
      const t = Math.min(Math.max((r - 0.55) / 0.45, 0), 1);
      return t * t * (3 - 2 * t);
    };
    const underCopy = (d: Dot) =>
      lerp(glyphs ? GLYPH_UNDER_COPY : UNDER_COPY, 1, openness(d));

    // Reduced motion: skip the journey, show the formed layer.
    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      if (plane) {
        ctx.fillStyle = rgba(
          PLANE_FILL[0],
          PLANE_FILL[1],
          PLANE_FILL[2],
          PLANE_FILL_ALPHA,
        );
        ctx.fill(planePath(w, h, plane));
      }
      for (const d of s.dots) {
        ctx.globalAlpha = underCopy(d);
        if (atlas) {
          drawGlyph(ctx, atlas, d, d.tx, layerY + d.ty);
          continue;
        }
        ctx.fillStyle = `rgb(${d.shade[0]},${d.shade[1]},${d.shade[2]})`;
        ctx.beginPath();
        ctx.arc(d.tx, layerY + d.ty, DOT_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return;
    }

    // The sketch is written per frame at 60fps; scale to real frame time.
    const f = dt * 60;
    const damp = 1 - (1 - 0.08) ** f;

    ctx.clearRect(0, 0, w, h);

    const elapsed = t - s.start;
    const global = Math.min(Math.max((elapsed - hold) / DURATION, 0), 1);
    const z = elapsed * TIME_SCALE;

    // The sheet fills in under the dots as the plane forms.
    if (plane) {
      ctx.fillStyle = rgba(
        PLANE_FILL[0],
        PLANE_FILL[1],
        PLANE_FILL[2],
        PLANE_FILL_ALPHA * easeOutCubic(global) ** 2,
      );
      ctx.fill(planePath(w, h, plane));
    }

    for (const d of s.dots) {
      if (atlas && !float) {
        // No float: fade in at the slot, scrambling until fully there.
        const appear = Math.min(Math.max((elapsed - d.delay) / APPEAR, 0), 1);
        if (appear < 1 && Math.random() < SCRAMBLE * f) {
          d.glyph = Math.floor(Math.random() * charset.length);
        }
        const tw =
          twinkle && appear === 1
            ? twinkleAlpha(d, elapsed, charset.length)
            : 1;
        ctx.globalAlpha = appear * tw * underCopy(d);
        drawGlyph(ctx, atlas, d, d.tx, layerY + d.ty);
        continue;
      }

      // Per-dot eased progress (staggered so they arrive gradually).
      let p = Math.min(Math.max((global - d.delay) / (1 - d.delay), 0), 1);
      p = 1 - (1 - p) ** ease;

      // Flow direction from 3D simplex noise (x, y, time).
      const n = wander
        ? s.simplex.noise3D(d.nx, d.ny, elapsed * WANDER_RATE)
        : s.simplex.noise3D(d.x * NOISE_SCALE, d.y * NOISE_SCALE, z);
      const a = n * Math.PI * 4;
      const flow = SPEED * (wander ? WANDER_SPEED : 1) * (1 - 0.55 * p);
      const fx = Math.cos(a) * flow * (1 - p); // all flow fades as it settles
      const fy = Math.sin(a) * flow * (1 - p);

      // Spring toward the dot's slot (shortest wrapped distance in x).
      let dx = d.tx - d.x;
      if (dx > w / 2) dx -= w;
      if (dx < -w / 2) dx += w;
      const pullX = dx * PULL * p;
      const pullY = (layerY + d.ty - d.y) * PULL * p;

      let ux = fx + pullX;
      let uy = fy + pullY;
      if (wander) {
        // Glide in rather than spring: cap the speed toward the slot.
        const u = Math.hypot(ux, uy);
        if (u > WANDER_MAX) {
          ux *= WANDER_MAX / u;
          uy *= WANDER_MAX / u;
        }
      }
      d.vx = lerp(d.vx, ux, damp);
      d.vy = lerp(d.vy, uy, damp);
      d.x += d.vx * f;
      d.y += d.vy * f;

      // Wrap horizontally always; vertically only before attraction starts.
      if (d.x < 0) d.x += w;
      if (d.x > w) d.x -= w;
      if (p === 0) {
        if (d.y < 0) d.y += h;
        if (d.y > h) d.y -= h;
      }

      if (atlas) {
        // Glyphs: strength as opacity over the ground, no trails — stacked
        // characters smear into blots. Drifting glyphs scramble; settled
        // ones lock.
        if (p < 0.98 && Math.random() < SCRAMBLE * f) {
          d.glyph = Math.floor(Math.random() * charset.length);
        }
        const settled = p >= 0.98;
        if (twinkle && settled && d.swapAt === Infinity) {
          d.swapAt = elapsed + Math.random() * TWINKLE_HOLD[1];
        }
        const tw =
          twinkle && settled ? twinkleAlpha(d, elapsed, charset.length) : 1;
        ctx.globalAlpha =
          lerp(GLYPH_DRIFT_STRENGTH, 1, p) * lerp(1, underCopy(d), p) * tw;
        drawGlyph(ctx, atlas, d, d.x, d.y);
        continue;
      }

      // Dots come up to full strength as they join the layer — on a light
      // ground, the sketch's "darken".
      // Under the copy, a dot fades back as it settles rather than landing
      // on the type.
      const k = lerp(DRIFT_STRENGTH, 1, p) * lerp(1, underCopy(d), p);
      ctx.fillStyle = `rgb(${lerp(GROUND[0], d.shade[0], k)},${lerp(
        GROUND[1],
        d.shade[1],
        k,
      )},${lerp(GROUND[2], d.shade[2], k)})`;

      // The trail: oldest first, each step back one RETAIN dimmer.
      const r = DOT_SIZE / 2;
      // A settled dot's trail has collapsed onto it; skip the redraw.
      const still = p > 0.99 && Math.abs(d.vx) + Math.abs(d.vy) < 0.02;
      for (let age = still ? 0 : d.count; age >= 1; age--) {
        const i = (d.head - age + TRAIL_LEN) % TRAIL_LEN;
        ctx.globalAlpha = RETAIN ** age;
        ctx.fillRect(d.trail[i * 2] - r, d.trail[i * 2 + 1] - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fill();

      d.trail[d.head * 2] = d.x;
      d.trail[d.head * 2 + 1] = d.y;
      d.head = (d.head + 1) % TRAIL_LEN;
      d.count = Math.min(d.count + 1, TRAIL_LEN);
    }
    ctx.globalAlpha = 1;
  });

  return (
    <Box
      {...(underNav ? HERO_BOX_UNDER_NAV : HERO_BOX)}
      bg="site.bg.surface"
      onClick={restart}
      cursor="crosshair"
    >
      <Box
        position="absolute"
        inset={0}
        bgImage={GLOW}
        pointerEvents="none"
        aria-hidden
      />
      <CanvasFill ref={canvasRef} />
      <Section
        rhythm="none"
        position="relative"
        h="full"
        display="flex"
        alignItems="center"
        pointerEvents="none"
      >
        <Grid w="full">
          <GridCol span={10} start={4}>
            <Box
              ref={copy}
              position="relative"
              top={`${-lift}px`}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              {/* Title and description set as the /v3 hero, with the title
                  in Regular. */}
              <Text
                as="h1"
                // Serrif's display step for this level, held at Regular.
                textStyle={serifTitle ? "d3" : "h3"}
                letterSpacing="-0.04em"
                fontWeight={400}
                color="site.fg"
                textAlign="center"
              >
                {HEADLINE}
              </Text>
              <Text
                textStyle="body.sm"
                fontWeight={300}
                lineHeight="1.2"
                color="site.fg.muted"
                textAlign="center"
                w="465px"
                maxW="full"
                mt="19px"
              >
                {description}
              </Text>
              <Box
                mt="28px"
                pointerEvents="auto"
                // The CTA shouldn't restart the animation.
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                cursor="default"
              >
                <SolidCta />
              </Box>
            </Box>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
