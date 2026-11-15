import React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Whether the user has asked the OS for reduced motion. Read once, at call. */
export const prefersReducedMotion = () => window.matchMedia(QUERY).matches;

/**
 * The same, as state that follows the setting, so an animation stops (or
 * starts) as soon as the user changes it rather than on the next load.
 */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = React.useState(prefersReducedMotion);
  React.useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};
