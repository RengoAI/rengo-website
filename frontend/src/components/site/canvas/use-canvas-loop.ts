import { prefersReducedMotion } from "@/shared/utils/motion";
import React from "react";

export type Frame = {
  ctx: CanvasRenderingContext2D;
  /** CSS pixel size of the canvas. Drawing happens in CSS pixels. */
  w: number;
  h: number;
  /** Seconds since mount. Frozen when the user prefers reduced motion. */
  t: number;
  /** Seconds since the previous frame, clamped so a backgrounded tab can't
      fast-forward a simulation. */
  dt: number;
  /** Pointer position in canvas pixels, or null when outside. Always null
      unless the loop was started with `{ pointer: true }`. */
  pointer: { x: number; y: number } | null;
  /** The user prefers reduced motion: `draw` runs once per resize, with
      `t` frozen and `dt` 0, so draw the settled state. */
  reduced: boolean;
  /** True on the first frame after a resize — rebuild any cached layout. */
  resized: boolean;
};

/** Time at which reduced-motion users get their single still frame. */
const STILL_T = 6;

/**
 * Drives a 2D canvas: sizes it to its box at device pixel ratio, runs `draw`
 * every animation frame while it is on screen. With `{ pointer: true }` it
 * also tracks the pointer and hands it to `draw`.
 *
 * `draw` is read through a ref, so it can close over fresh props without
 * restarting the loop.
 */
export const useCanvasLoop = (
  draw: (frame: Frame) => void,
  { pointer: trackPointer = false }: { pointer?: boolean } = {},
) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawRef = React.useRef(draw);
  drawRef.current = draw;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let resized = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    const start = last;
    let pointer: Frame["pointer"] = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resized = true;
      if (still) frame(performance.now());
    };

    const frame = (now: number) => {
      const dt = Math.min(Math.max(0, now - last) / 1000, 1 / 20);
      last = now;
      if (w > 0 && h > 0) {
        drawRef.current({
          ctx,
          w,
          h,
          // rAF timestamps can predate `start` by a frame; never go negative.
          t: still ? STILL_T : Math.max(0, now - start) / 1000,
          dt: still ? 0 : dt,
          pointer,
          reduced: still,
          resized,
        });
        resized = false;
      }
    };

    const loop = (now: number) => {
      frame(now);
      if (visible && !still) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= w && y <= h ? { x, y } : null;
    };
    const onLeave = () => {
      pointer = null;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    // Listen on the window so DOM copy layered over the canvas doesn't
    // swallow the pointer.
    if (trackPointer) {
      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", onLeave);
    }

    resize();
    raf = requestAnimationFrame(loop);
    // Canvas text has to wait for the webfonts; redraw once they land.
    let live = true;
    document.fonts?.ready.then(() => {
      if (!live) return;
      resized = true;
      if (still) frame(performance.now());
    });

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [trackPointer]);

  return canvasRef;
};
