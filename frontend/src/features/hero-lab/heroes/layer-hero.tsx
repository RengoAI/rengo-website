import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import {
  CanvasFill,
  Cursor,
  DESCRIPTION,
  HEADLINE,
  HERO_BOX,
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
 *
 * `plane` replaces the lines with a 2D target: a cols × rows dot grid laid
 * across a parallelogram (a flat sheet seen in perspective), given by three
 * corners in fractions of the hero. The plane sits behind the copy, so dots
 * that settle under the copy are held back to keep the text clean, and the
 * sheet itself fills in faintly as it forms.
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
  /** Last TRAIL_LEN positions as x,y pairs, a ring buffer at `head`. */
  trail: Float32Array;
  head: number;
  count: number;
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
const CLEAR_RX = 330;
const CLEAR_MARGIN_Y = 44;
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
  /** Offset each line's slots so the lines read horizontally. */
  shift?: boolean;
  /** Settle into a 2D plane instead of lines; overrides lines and dots. */
  plane?: Plane;
}> = ({
  lines = 1,
  lineGap = 0,
  dots = NUM_DOTS,
  layerGap = LAYER_GAP,
  shift = false,
  plane,
}) => {
  const count = plane ? plane.cols * plane.rows : dots;
  const place = (all: Dot[], w: number, h: number) =>
    plane
      ? assignPlane(all, w, h, plane)
      : assignSlots(all, w, lines, lineGap, shift);
  const copy = React.useRef<HTMLDivElement>(null);
  const sim = React.useRef({
    dots: [] as Dot[],
    simplex: new SimplexNoise(7),
    start: 0,
    restart: true,
  });
  const reduced = React.useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

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

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt, resized }) => {
    const s = sim.current;

    if (s.restart) {
      s.dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        delay: Math.random() * STAGGER,
        tx: 0,
        ty: 0,
        shade: randomShade(),
        trail: new Float32Array(TRAIL_LEN * 2),
        head: 0,
        count: 0,
      }));
      place(s.dots, w, h);
      s.start = t;
      s.restart = false;
      ctx.clearRect(0, 0, w, h);
    } else if (resized) {
      place(s.dots, w, h);
      ctx.clearRect(0, 0, w, h);
    }

    const c = copy.current;
    // With a plane, targets are absolute; with lines, they hang off layerY.
    const layerY = plane
      ? 0
      : c
        ? c.offsetTop + c.offsetHeight + layerGap
        : h * 0.5;
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
      const ex = (d.tx - clear.cx) / CLEAR_RX;
      const ey = (d.ty - clear.cy) / clear.ry;
      const r = Math.sqrt(ex * ex + ey * ey);
      const t = Math.min(Math.max((r - 0.55) / 0.45, 0), 1);
      return t * t * (3 - 2 * t);
    };
    const underCopy = (d: Dot) => lerp(UNDER_COPY, 1, openness(d));

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
    const global = Math.min(Math.max(elapsed / DURATION, 0), 1);
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
      // Per-dot eased progress (staggered so they arrive gradually).
      let p = Math.min(Math.max((global - d.delay) / (1 - d.delay), 0), 1);
      p = easeOutCubic(p);

      // Flow direction from 3D simplex noise (x, y, time).
      const n = s.simplex.noise3D(d.x * NOISE_SCALE, d.y * NOISE_SCALE, z);
      const a = n * Math.PI * 4;
      const flow = SPEED * (1 - 0.55 * p);
      const fx = Math.cos(a) * flow * (1 - p); // all flow fades as it settles
      const fy = Math.sin(a) * flow * (1 - p);

      // Spring toward the dot's slot (shortest wrapped distance in x).
      let dx = d.tx - d.x;
      if (dx > w / 2) dx -= w;
      if (dx < -w / 2) dx += w;
      const pullX = dx * PULL * p;
      const pullY = (layerY + d.ty - d.y) * PULL * p;

      d.vx = lerp(d.vx, fx + pullX, damp);
      d.vy = lerp(d.vy, fy + pullY, damp);
      d.x += d.vx * f;
      d.y += d.vy * f;

      // Wrap horizontally always; vertically only before attraction starts.
      if (d.x < 0) d.x += w;
      if (d.x > w) d.x -= w;
      if (p === 0) {
        if (d.y < 0) d.y += h;
        if (d.y > h) d.y -= h;
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
  });

  return (
    <Box
      {...HERO_BOX}
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
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              {/* Title and description set as the /v3 hero, with the title
                  in Light. */}
              <Text
                as="h1"
                textStyle="h3"
                letterSpacing="-0.04em"
                fontWeight={300}
                color="site.fg"
                textAlign="center"
              >
                {HEADLINE}
                <Cursor />
              </Text>
              <Text
                textStyle="body.md"
                fontWeight={300}
                lineHeight="1.2"
                color="site.fg.muted"
                textAlign="center"
                w="465px"
                maxW="full"
                mt="19px"
              >
                {DESCRIPTION}
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
