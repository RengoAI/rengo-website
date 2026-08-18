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
/** How long a hovered tile stays lit, ms. */
const RIPPLE_MS = 900;
/** Peak fill alpha for a freshly lit tile. */
const RIPPLE_ALPHA = 0.28;

// Full-bleed behind the copy, so the field is kept faint — Spiral runs their
// equivalent at ~30% opacity for the same reason.
const GRID_LINE = "rgba(169, 183, 198, 0.38)"; // slate.40, softened
const RIPPLE_RGB = "0, 113, 227"; // accent.link

interface LitTile {
  gx: number;
  gy: number;
  start: number;
  /** Drift offset when lit, so the tile travels with the field. */
  offsetX: number;
  offsetY: number;
}

/**
 * Returns the four screen-space corners of grid cell (gx, gy) given the
 * current drift offset. Mirrors the isometric projection used for the lines
 * so hit-testing and fills land on exactly the same diamonds.
 */
const cellCorners = (
  w: number,
  h: number,
  gx: number,
  gy: number,
  ox: number,
  oy: number,
) => {
  const x = w / 2 + ((gx - gy) * TILE - ox) * COS;
  const y = h / 2 + ((gx + gy) * TILE + oy) * SIN;
  return [
    { x, y },
    { x: x + TILE * COS, y: y + TILE * SIN },
    { x: x + TILE * COS * 2, y },
    { x: x + TILE * COS, y: y - TILE * SIN },
  ];
};

const pointInPolygon = (
  px: number,
  py: number,
  poly: { x: number; y: number }[],
) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const { x: xi, y: yi } = poly[i];
    const { x: xj, y: yj } = poly[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};

/**
 * Inverts the projection to guess a grid cell, then checks that cell and its
 * neighbours — the analytic inverse lands adjacent to the true cell near
 * diamond seams, so a small search is needed to pick the right one.
 */
const cellAtPoint = (
  w: number,
  h: number,
  px: number,
  py: number,
  ox: number,
  oy: number,
) => {
  const a = (px - w / 2) / COS + ox;
  const b = (py - h / 2) / SIN - oy;
  const guessX = Math.floor((a + b) / PERIOD);
  const guessY = Math.floor((b - a) / PERIOD);

  let fallback: { gx: number; gy: number } | null = null;
  let bestDist = Infinity;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const gx = guessX + dx;
      const gy = guessY + dy;
      const corners = cellCorners(w, h, gx, gy, ox, oy);
      if (pointInPolygon(px, py, corners)) return { gx, gy };

      const cx = (corners[0].x + corners[2].x) / 2;
      const cy = (corners[0].y + corners[2].y) / 2;
      const dist = (px - cx) ** 2 + (py - cy) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        fallback = { gx, gy };
      }
    }
  }
  return fallback;
};

const pointInHost = (host: HTMLElement, clientX: number, clientY: number) => {
  const rect = host.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  if (x < 0 || x > rect.width || y < 0 || y > rect.height) return null;
  return { x, y };
};

/**
 * Ambient isometric grid that drifts diagonally, with diamonds lighting up
 * under the pointer and fading out. Renders nothing but decoration: it is
 * aria-hidden, pauses offscreen, and respects prefers-reduced-motion.
 */
export const HeroGridCanvas: React.FC = () => {
  const gridRef = useRef<HTMLCanvasElement>(null);
  const rippleRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridCanvas = gridRef.current;
    const rippleCanvas = rippleRef.current;
    const host = hostRef.current;
    if (!gridCanvas || !rippleCanvas || !host) return;

    const gridCtx = gridCanvas.getContext("2d");
    const rippleCtx = rippleCanvas.getContext("2d");
    if (!gridCtx || !rippleCtx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let offset = 0;
    let lit: LitTile[] = [];
    let pointer: { x: number; y: number } | null = null;
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
      for (const canvas of [gridCanvas, rippleCanvas]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rippleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGrid();
    };

    const drawRipples = (now: number) => {
      rippleCtx.clearRect(0, 0, width, height);
      if (!lit.length) return;

      lit = lit.filter((tile) => {
        const age = now - tile.start;
        if (age >= RIPPLE_MS) return false;

        const drifted = offset - tile.offsetX;
        const corners = cellCorners(
          width,
          height,
          tile.gx,
          tile.gy,
          (tile.offsetX % PERIOD) + drifted,
          (tile.offsetY % PERIOD) + drifted,
        );
        const alpha = RIPPLE_ALPHA * (1 - age / RIPPLE_MS);

        rippleCtx.beginPath();
        rippleCtx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < corners.length; i++) {
          rippleCtx.lineTo(corners[i].x, corners[i].y);
        }
        rippleCtx.closePath();
        rippleCtx.fillStyle = `rgba(${RIPPLE_RGB}, ${alpha})`;
        rippleCtx.fill();
        return true;
      });
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      if (!visible) return;

      offset += (DRIFT * delta) / 1000;
      drawGrid();

      if (pointer) {
        const cell = cellAtPoint(
          width,
          height,
          pointer.x,
          pointer.y,
          offset % PERIOD,
          offset % PERIOD,
        );
        if (cell) {
          const existing = lit.find(
            (t) => t.gx === cell.gx && t.gy === cell.gy,
          );
          if (existing) {
            existing.start = now;
          } else {
            lit.push({
              gx: cell.gx,
              gy: cell.gy,
              start: now,
              offsetX: offset,
              offsetY: offset,
            });
          }
        }
      }
      drawRipples(now);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = pointInHost(host, event.clientX, event.clientY);
    };
    const onPointerLeave = () => {
      pointer = null;
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    // Tracked on window rather than the host: the headline sits above the
    // canvas, so host-level listeners would drop the trail whenever the
    // cursor crossed the text.
    window.addEventListener("pointermove", onPointerMove);
    document.body.addEventListener("pointerleave", onPointerLeave);

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
      window.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <Box
      ref={hostRef}
      position="absolute"
      inset={0}
      overflow="hidden"
      aria-hidden
      // Fades the field out at the top and bottom edges so it reads as
      // ambient rather than as a hard-edged panel.
      css={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 78%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 78%, transparent)",
      }}
    >
      <Box
        as="canvas"
        ref={gridRef}
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
      />
      <Box
        as="canvas"
        ref={rippleRef}
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
      />

      {/*
        Blurs and lightens the grid behind the headline (and the nav band above it)
        so serif type stays crisp. On narrow viewports the ellipse is still tighter
        on the sides so the moving grid stays visible lower in the hero.
      */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
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
