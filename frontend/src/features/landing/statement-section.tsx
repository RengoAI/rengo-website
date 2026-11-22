import { Section } from "@/components/layout/section";
import {
  dotScale,
  heroDotColor,
  siteDotAt,
} from "@/components/site/canvas/hero-dots";
import { INK } from "@/components/site/canvas/ink";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { useScrollFrame } from "@/shared/hooks/use-scroll-frame";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** Word for word from the Business Overview ("Shared File Drive vs.
 * Structured Database"): the plain half, then the half set in blue. */
const LEAD = "AI is only as reliable as";
const POINT = "the information it works from.";

/** A word's opacity before the scroll reaches it. */
const UNLIT = 0.16;

/**
 * How far the band has scrolled through the reveal, 0 to 1: it starts as
 * the band's top passes 80% down the viewport and finishes once the band's
 * middle reaches the viewport's middle.
 */
const revealProgress = (box: DOMRect) => {
  const vh = window.innerHeight;
  const start = vh * 0.8;
  const end = vh / 2 - box.height / 2;
  return Math.min(Math.max((start - box.top) / (start - end), 0), 1);
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Grid spacing of the dots, px: 1.5 × the /solutions grid's 16.8px, so
 * the settled field stays calm around one line. */
const DOT_GAP = 25.2;
/** How far a settled dot may sit off its grid point, as a share of the
 * spacing: the field ends ordered but loose, keeping a little of the
 * scatter's movement rather than locking into a rigid lattice. */
const DOT_JITTER = 0.22;
/** Share of dots in crimson, as in the outro's grid. */
const ACCENT_SHARE = 0.08;

type Dot = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  delay: number;
  color: string;
};

/**
 * Dots behind the statement: scattered at rest, pulled into an even grid as
 * `progress` goes from 0 to 1, each a little after the last so the grid
 * settles rather than snaps. Faded out behind the type.
 */
const OrderingDots: React.FC<{
  progress: React.MutableRefObject<number>;
  tick: number;
}> = ({ progress, tick }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const dots = React.useRef<Dot[]>([]);
  const size = React.useRef({ w: 0, h: 0 });

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = size.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // The site's square marks, at the size every dot figure uses.
    const half = siteDotAt(dotScale(w)) / 2;
    const p = progress.current;
    for (const d of dots.current) {
      const t = smoothstep(
        Math.min(Math.max((p - d.delay) / (1 - d.delay), 0), 1),
      );
      ctx.fillStyle = d.color;
      ctx.fillRect(
        d.sx + (d.x - d.sx) * t - half,
        d.sy + (d.y - d.sy) * t - half,
        half * 2,
        half * 2,
      );
    }
  }, [progress]);

  // Lay the grid out to the canvas's size, each dot with a random start.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const layout = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      size.current = { w, h };
      const cols = Math.floor(w / DOT_GAP);
      const rows = Math.floor(h / DOT_GAP);
      const ox = (w - (cols - 1) * DOT_GAP) / 2;
      const oy = (h - (rows - 1) * DOT_GAP) / 2;
      const next: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          next.push({
            x: ox + (c + (Math.random() - 0.5) * 2 * DOT_JITTER) * DOT_GAP,
            y: oy + (r + (Math.random() - 0.5) * 2 * DOT_JITTER) * DOT_GAP,
            sx: Math.random() * w,
            sy: Math.random() * h,
            delay: Math.random() * 0.35,
            // The hero's palette, with the outro grid's crimson accent.
            color: Math.random() < ACCENT_SHARE ? INK.crimson : heroDotColor(),
          });
        }
      }
      dots.current = next;
      draw();
    };
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  // Redraw whenever the band's progress moves.
  React.useEffect(draw, [draw, tick]);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      aria-hidden
      position="absolute"
      inset={0}
      w="full"
      h="full"
      pointerEvents="none"
      // Clear behind the statement and thinning out toward it, so the dots
      // gather at the band's edges and never touch the type.
      css={{
        maskImage:
          "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, black 100%)",
      }}
    />
  );
};

/**
 * The problem, in one line: the display serif, centred in a band most of
 * a screen tall. As the band scrolls in, its words fill in from faint
 * to full, the blue half last, while a field of scattered dots
 * behind it settles into a grid as the words fill: the information being
 * put in order. Reduced motion shows the line, and the grid, at rest.
 */
export const StatementSection: React.FC = () => {
  // A box over the whole band, to measure it (Section takes no ref).
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const progress = React.useRef(reduced ? 1 : 0);
  // Re-renders only when the progress moves, to restyle the words.
  const [tick, setTick] = React.useState(0);

  const update = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const next = revealProgress(el.getBoundingClientRect());
    if (Math.abs(next - progress.current) > 0.001) {
      progress.current = next;
      setTick((t) => t + 1);
    }
  }, []);
  useScrollFrame(reduced ? null : update);
  React.useEffect(() => {
    if (reduced) {
      progress.current = 1;
      setTick((t) => t + 1);
    }
  }, [reduced]);

  const words = [
    ...LEAD.split(" ").map((w) => ({ w, blue: false })),
    ...POINT.split(" ").map((w) => ({ w, blue: true })),
  ];
  // Each word fills over its own slice of the scroll, overlapping the next.
  const lit = (i: number) => {
    const t = progress.current * (words.length + 2) - i;
    return UNLIT + (1 - UNLIT) * Math.min(Math.max(t / 3, 0), 1);
  };
  const leadCount = LEAD.split(" ").length;

  return (
    <Section
      position="relative"
      overflow="hidden"
      {...TESTIMONIAL_WASHES.mid}
      // Most of a screen, not all of it, as the closing call.
      minH={FEATURE_BAND_MIN_H}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box ref={ref} aria-hidden position="absolute" inset={0} />
      <OrderingDots progress={progress} tick={tick} />
      <Text
        as="h2"
        position="relative"
        textStyle="d1"
        // Between the section headings (32px) and the outro's line (60px).
        fontSize={{ base: "1.75rem", md: "2.25rem", lg: "2.75rem" }}
        lineHeight="1.1"
        color="site.fg.heading"
        textAlign="center"
        textWrap="balance"
        aria-label={`${LEAD} ${POINT}`}
      >
        {words.slice(0, leadCount).map(({ w }, i) => (
          <Box as="span" key={i} aria-hidden style={{ opacity: lit(i) }}>
            {w}{" "}
          </Box>
        ))}
        {/* Its own line from tablets up: the statement in two halves. */}
        <Box as="span" display={{ md: "block" }} color="site.highlight">
          {words.slice(leadCount).map(({ w }, j) => (
            <Box
              as="span"
              key={j}
              aria-hidden
              style={{ opacity: lit(leadCount + j) }}
            >
              {w}
              {j < words.length - leadCount - 1 ? " " : ""}
            </Box>
          ))}
        </Box>
      </Text>
    </Section>
  );
};
