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
  /** Pointer position in canvas pixels, or null when outside. */
  pointer: { x: number; y: number } | null;
  /** True on the first frame after a resize — rebuild any cached layout. */
  resized: boolean;
};

/** Time at which reduced-motion users get their single still frame. */
const STILL_T = 6;

/**
 * Drives a 2D canvas: sizes it to its box at device pixel ratio, runs `draw`
 * every animation frame while it is on screen, and hands it the pointer.
 *
 * `draw` is read through a ref, so it can close over fresh props without
 * restarting the loop.
 */
export const useCanvasLoop = (draw: (frame: Frame) => void) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawRef = React.useRef(draw);
  drawRef.current = draw;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    resize();
    raf = requestAnimationFrame(loop);
    // Canvas text has to wait for the webfonts; redraw once they land.
    document.fonts?.ready.then(() => {
      resized = true;
      if (still) frame(performance.now());
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return canvasRef;
};

/** Cheap deterministic hash → [0, 1). Stable per integer cell. */
export const hash2 = (x: number, y: number, seed = 0) => {
  let n = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
};

/** Smooth 2D value noise in roughly [0, 1]. */
export const valueNoise = (x: number, y: number, seed = 0) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

/**
 * A tile of monochrome grain, built once and reused as a pattern. Overlaid at
 * low alpha it gives flat fills the printed/filmic texture of the references.
 */
export const makeGrain = (size = 160, alpha = 28) => {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const img = g.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = alpha;
  }
  g.putImageData(img, 0, 0);
  return c;
};
