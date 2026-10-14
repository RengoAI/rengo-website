/** Linear interpolation from `a` to `b`. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A uniform random number in [lo, hi). */
export const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** Cubic ease-in-out over [0, 1]. */
export const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;

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
