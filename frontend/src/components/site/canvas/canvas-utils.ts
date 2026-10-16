/** Linear interpolation from `a` to `b`. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A uniform random number in [lo, hi). */
export const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** Cubic ease-in-out over [0, 1]. */
export const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
