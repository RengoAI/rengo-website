/** Whether the user has asked the OS for reduced motion. Read once, at call. */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
