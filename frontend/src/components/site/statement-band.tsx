import { Section } from "@/components/layout/section";
import {
  dotScale,
  heroDotColor,
  siteDotAt,
  DOT_FLECK,
} from "@/components/site/canvas/hero-dots";
import {
  LightField,
  type LightFieldVariant,
} from "@/components/site/light-field";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { useScrollFrame } from "@/shared/hooks/use-scroll-frame";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** A word's opacity before the scroll reaches it. */
const UNLIT = 0.16;

/**
 * How far the reveal has run, 0 to 1, from where the line itself sits: it
 * starts as the line comes on screen (its middle 85% of the way down) and
 * finishes as it passes a little above the middle (40%), over nearly half
 * a screen of scrolling so the words fill at a reading pace; or, for a band
 * near the page's end that can't scroll that far, once the page is
 * scrolled to the bottom. So it all plays while the line is in view.
 */
const revealProgress = (line: DOMRect) => {
  const vh = window.innerHeight;
  const mid = line.top + line.height / 2;
  const start = vh * 0.85;
  const maxScroll = document.documentElement.scrollHeight - vh;
  const midAtBottom = mid - (maxScroll - window.scrollY);
  const end = Math.min(Math.max(vh * 0.4, midAtBottom), start - 1);
  return Math.min(Math.max((start - mid) / (start - end), 0), 1);
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Grid spacing of the dots, px: 1.5 × the /solutions grid's 16.8px, so
 * the settled field stays calm around one line. */
const DOT_GAP = 25.2;
/** How far a settled dot may sit off its grid point, as a share of the
 * spacing: the field ends ordered but loose, keeping a little of the
 * scatter's movement rather than locking into a rigid lattice. */
const DOT_JITTER = 0.22;
/** Share of dots in the fleck colour (DOT_FLECK). */
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
  /** Furthest the dots settle, 0 to 1: under 1, they stop part-way. */
  rest: number;
  /** Share of the grid's dots drawn, 0 to 1. */
  share: number;
}> = ({ progress, tick, rest, share }) => {
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
    const p = Math.min(progress.current, rest);
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
  }, [progress, rest]);

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
          if (Math.random() > share) continue;
          next.push({
            x: ox + (c + (Math.random() - 0.5) * 2 * DOT_JITTER) * DOT_GAP,
            y: oy + (r + (Math.random() - 0.5) * 2 * DOT_JITTER) * DOT_GAP,
            sx: Math.random() * w,
            sy: Math.random() * h,
            delay: Math.random() * 0.35,
            // The hero's palette, with its flecks.
            color: Math.random() < ACCENT_SHARE ? DOT_FLECK : heroDotColor(),
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
  }, [draw, share]);

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
 * A one-line moment: the display serif, centred in a band most of a screen
 * tall, the line in two halves, the second in blue on its own line from
 * tablets up. As the band scrolls in, its words fill in from faint to
 * full, the blue half last, while a field of scattered dots behind it
 * settles into a loose grid: information being put in order. Anything
 * passed as children (a button) sits under the line. Reduced motion shows
 * the line, and the grid, at rest.
 *
 * The landing opens on one (the problem) and closes on one (the call), so
 * the two read as a pair.
 */
export const StatementBand: React.FC<{
  /** The plain first half. */
  lead: string;
  /** The second half, in blue. */
  point: string;
  /**
   * Plain words after the blue half, after a comma, so the line can run on
   * as one sentence. With one, the blue half stays inline.
   */
  tail?: string;
  /** The heading's id, for a band labelled by it. */
  id?: string;
  /**
   * The band's ground: the blue wash (the opening statement), or "plain",
   * the footer's light grey with the line in the strongest ink, so it pops
   * (the close, running into the footer).
   */
  tone?: "wash" | "plain";
  /**
   * Hold the band still instead of animating on scroll: the dots stay this
   * far through their settle (0 scattered, 1 the grid) and the line shows
   * in full. The close sits part-way, loosely gathered round the line.
   */
  still?: number;
  /**
   * How far the dots settle as the band scrolls in, 0 to 1, and the share
   * of them drawn. Below 1, the field stops part-way, loose rather than a
   * grid, and thinner.
   */
  dots?: { rest?: number; share?: number };
  /**
   * Light instead of dots: a LightField variant filling the band, fading
   * in as the words fill.
   */
  light?: LightFieldVariant;
  /**
   * A sentence under the line, in body type: the line is the tagline, this
   * describes it. With one, the line stays on one row from tablets up
   * instead of breaking before the blue half.
   */
  description?: string;
  /**
   * Dissolve the light into the page at the band's top and bottom, so it
   * runs on from the section above and into the one below with no edge.
   */
  fade?: boolean;
  /** The band's minimum height; the shared feature height by default. */
  minH?: string | Record<string, string>;
  children?: React.ReactNode;
}> = ({
  lead,
  point,
  tail,
  id,
  tone = "wash",
  still,
  dots,
  light,
  description,
  fade,
  minH = FEATURE_BAND_MIN_H,
  children,
}) => {
  // The line, whose place on screen drives the reveal.
  const ref = React.useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();
  const held = still !== undefined;
  // Where the dots sit when nothing moves them: held, or reduced motion's
  // settled grid.
  const rest = held ? still : 1;
  const progress = React.useRef(held || reduced ? rest : 0);
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
  const animated = !held && !reduced;
  useScrollFrame(animated ? update : null);
  React.useEffect(() => {
    if (!animated) {
      progress.current = rest;
      setTick((t) => t + 1);
    }
  }, [animated, rest]);

  const words = [
    ...lead.split(" ").map((w) => ({ w, blue: false })),
    ...point.split(" ").map((w) => ({ w, blue: true })),
    ...(tail ? tail.split(" ").map((w) => ({ w, blue: false })) : []),
  ];
  // Each word fills over its own slice of the scroll, overlapping the next.
  const lit = (i: number) => {
    if (!animated) return 1;
    // Done by 90% of the scroll, so the last word lands at full strength.
    const p = Math.min(progress.current / 0.9, 1);
    const t = p * (words.length + 2) - i;
    return UNLIT + (1 - UNLIT) * Math.min(Math.max(t / 3, 0), 1);
  };
  const leadCount = lead.split(" ").length;
  const pointEnd = leadCount + point.split(" ").length;

  return (
    <Section
      position="relative"
      overflow="hidden"
      {...(fade
        ? // The page's own ground, which the light dissolves into.
          { bg: "site.bg.page", bgImage: "none" }
        : tone === "plain"
          ? { bg: "site.bg.footer", bgImage: "none" }
          : TESTIMONIAL_WASHES.mid)}
      // Most of a screen, not all of it.
      minH={minH}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="28px"
      aria-labelledby={id}
    >
      {light ? (
        <LightField
          variant={light}
          position="absolute"
          inset={0}
          // From a faint glow to full as the words fill.
          style={{ opacity: 0.3 + 0.7 * progress.current }}
          css={
            fade
              ? {
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 22%, black 58%, transparent 100%)",
                }
              : undefined
          }
        />
      ) : (
        <OrderingDots
          progress={progress}
          tick={tick}
          rest={dots?.rest ?? 1}
          share={dots?.share ?? 1}
        />
      )}
      <Text
        ref={ref}
        as="h2"
        id={id}
        position="relative"
        textStyle="d1"
        // A step over the section headings (32px).
        fontSize={{ base: "1.75rem", md: "2.25rem", lg: "2.75rem" }}
        lineHeight="1.1"
        color={tone === "plain" ? "site.fg.strong" : "site.fg.heading"}
        textAlign="center"
        textWrap="balance"
        // A full sentence runs long, so it keeps to a readable measure.
        maxW={tail ? "1000px" : undefined}
        aria-label={tail ? `${lead} ${point}, ${tail}` : `${lead} ${point}`}
      >
        {words.slice(0, leadCount).map(({ w }, i) => (
          <Box as="span" key={i} aria-hidden style={{ opacity: lit(i) }}>
            {w}{" "}
          </Box>
        ))}
        {/* Its own line from tablets up: the statement in two halves.
          Inline when a description follows, so the tagline reads as one
          sentence. */}
        <Box
          as="span"
          display={description || tail ? undefined : { md: "block" }}
          color="site.highlight"
        >
          {words.slice(leadCount, pointEnd).map(({ w }, j) => (
            <Box
              as="span"
              key={j}
              aria-hidden
              style={{ opacity: lit(leadCount + j) }}
            >
              {w}
              {j < pointEnd - leadCount - 1 ? " " : ""}
            </Box>
          ))}
        </Box>
        {words.slice(pointEnd).map(({ w }, j) => (
          <Box
            as="span"
            key={`t${j}`}
            aria-hidden
            style={{ opacity: lit(pointEnd + j) }}
          >
            {j === 0 ? ", " : " "}
            {w}
          </Box>
        ))}
      </Text>
      {description && (
        <Text
          position="relative"
          textStyle="body.md"
          color="site.fg"
          textAlign="center"
          maxW="480px"
          textWrap="balance"
          // Fills in last, after the line's final word.
          style={{ opacity: lit(words.length) }}
        >
          {description}
        </Text>
      )}
      {children && (
        <Box position="relative" zIndex={1}>
          {children}
        </Box>
      )}
    </Section>
  );
};
