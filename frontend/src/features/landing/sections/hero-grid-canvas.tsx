import { MeshGradientWash } from "@/components/ui/mesh-gradient-wash";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

/** Diamond edge length in px. The field repeats every 2× this value. */
const TILE = 60;
const PERIOD = TILE * 2;
/** Isometric projection angle (30°). */
const ANGLE = Math.PI / 6;
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);

/** Diagonal drift, px per second. Slow enough to read as ambient. */
const DRIFT = 9;

// Full-bleed behind the copy, so the field is kept faint — Spiral runs their
// equivalent at ~30% opacity for the same reason.
const GRID_LINE = "rgba(169, 183, 198, 0.38)"; // slate.40, softened

/**
 * Fades the field out at the bottom so it reads as ambient rather than as a
 * hard-edged panel. The top runs to the edge on purpose: the fixed header is
 * transparent over the hero, so the field has to carry all the way up through
 * the nav band for the two to read as one surface.
 */
const HERO_MASK = "linear-gradient(to bottom, black 78%, transparent)";

/**
 * Softens the dashed lines behind the centred copy without clearing much of
 * the band: the ellipse is kept tight to the text and reaches full strength
 * well before the edges, so the grid still reads across most of the section.
 * Applied to the grid canvas alone, so the colour wash underneath carries on
 * through the middle. The hero's vertical fade would leave nothing behind in
 * a band this shallow.
 */
const BAND_MASK =
  "radial-gradient(ellipse 50% 95% at 50% 50%, transparent 24%, black 75%)";

interface HeroGridCanvasProps {
  /**
   * `hero` — full-height treatment, field carried up through the nav band.
   * `band` — short section: fainter, and cleared through the middle.
   */
  variant?: "hero" | "band";
}

/**
 * Ambient isometric grid that drifts diagonally over a soft mesh wash.
 * Renders nothing but decoration: it is aria-hidden, takes no pointer events,
 * pauses offscreen, and respects prefers-reduced-motion.
 */
export const HeroGridCanvas: React.FC<HeroGridCanvasProps> = ({
  variant = "hero",
}) => {
  const isBand = variant === "band";
  const gridRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridCanvas = gridRef.current;
    const host = hostRef.current;
    if (!gridCanvas || !host) return;

    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let offset = 0;
    let visible = true;
    let frame = 0;
    let lastTime = performance.now();

    const drawGrid = () => {
      if (!width || !height) return;
      gridCtx.clearRect(0, 0, width, height);
      gridCtx.strokeStyle = GRID_LINE;
      gridCtx.lineWidth = 1;
      gridCtx.setLineDash([3, 3]);

      const shift = offset % PERIOD;
      const span = Math.ceil(Math.max(width, height) / (TILE * SIN)) + 2;

      for (let i = -span; i < span; i++) {
        // Down-right family
        gridCtx.beginPath();
        const ax = width / 2 + (TILE * i - shift) * COS;
        const ay = height / 2 + (TILE * i + shift) * SIN;
        gridCtx.moveTo(ax - width * COS, ay + width * SIN);
        gridCtx.lineTo(ax + width * COS, ay - width * SIN);
        gridCtx.stroke();

        // Up-right family
        gridCtx.beginPath();
        const bx = width / 2 + (TILE * i - shift) * COS;
        const by = height / 2 - (TILE * i - shift) * SIN;
        gridCtx.moveTo(bx - width * COS, by - width * SIN);
        gridCtx.lineTo(bx + width * COS, by + width * SIN);
        gridCtx.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      gridCanvas.width = Math.round(width * dpr);
      gridCanvas.height = Math.round(height * dpr);
      gridCanvas.style.width = `${width}px`;
      gridCanvas.style.height = `${height}px`;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGrid();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      if (!visible) return;

      offset += (DRIFT * delta) / 1000;
      drawGrid();
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        lastTime = performance.now();
      },
      { threshold: 0.01 },
    );
    observer.observe(host);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Box
      ref={hostRef}
      position="absolute"
      inset={0}
      overflow="hidden"
      aria-hidden
      pointerEvents="none"
      opacity={isBand ? 0.85 : 1}
      // The hero masks the whole stack, wash included, so the field fades out
      // together at the bottom edge. The band masks only the grid below, so
      // its clear centre takes out the dashed lines while leaving the colour
      // wash running the full width behind the copy.
      css={
        isBand
          ? undefined
          : { maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }
      }
    >
      {/* Sits below the canvas so the dashed field reads over the wash. */}
      <MeshGradientWash opacity={isBand ? 0.45 : 0.5} />

      <Box
        as="canvas"
        ref={gridRef}
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        css={
          isBand
            ? { maskImage: BAND_MASK, WebkitMaskImage: BAND_MASK }
            : undefined
        }
      />

      {/*
        Blurs and lightens the grid behind the headline (and the nav band above it)
        so serif type stays crisp. On narrow viewports the ellipse is still tighter
        on the sides so the moving grid stays visible lower in the hero. The band
        variant has no use for it: its mask already clears the middle, and the
        ellipse is positioned for a full-height hero's off-centre headline.
      */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        display={isBand ? "none" : undefined}
        css={{
          "@media (max-width: 47.99em)": {
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            backgroundColor: "rgba(245, 245, 246, 0.5)",
            maskImage:
              "radial-gradient(ellipse 58% 52% at 12% 22%, black 54%, transparent 84%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 52% at 12% 22%, black 54%, transparent 84%)",
          },
          "@media (min-width: 48em)": {
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            backgroundColor: "rgba(245, 245, 246, 0.72)",
            maskImage:
              "radial-gradient(ellipse 60% 72% at 18% 24%, black 58%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 72% at 18% 24%, black 58%, transparent 100%)",
          },
        }}
      />
    </Box>
  );
};
