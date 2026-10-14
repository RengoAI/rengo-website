import React from "react";

/**
 * Runs `update` once on mount, then at most once per animation frame while
 * the window scrolls or resizes. For effects driven straight from scroll
 * position.
 *
 * `update` should be stable (module-level, or memoised on its inputs): the
 * listeners are rebound whenever it changes. Pass `null` to listen for
 * nothing.
 */
export const useScrollFrame = (update: (() => void) | null) => {
  React.useEffect(() => {
    if (!update) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      update();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [update]);
};
