import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element named by the URL hash.
 *
 * React Router does not restore hash positions itself, so a dropdown item
 * pointing at /solutions#applied-ai would change the URL and leave the page at
 * the top.
 *
 * Retries on a timer rather than requestAnimationFrame: rAF does not fire at
 * all while a tab is in the background, so an rAF-driven version silently never
 * ran — the section can also mount a frame or two late when the route is
 * lazy-loaded, which is what the retry is for.
 */
export const useHashScroll = (offset = 96) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);

    let attempts = 0;
    let retry = 0;
    let settle = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) {
        if (attempts++ < 20) retry = window.setTimeout(tryScroll, 50);
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      /* Smooth scrolling is also a no-op in a background tab, which would leave
         the page at the top with the hash already applied. Jump outright if
         nothing moved. */
      settle = window.setTimeout(() => {
        if (Math.abs(window.scrollY - top) > 8) {
          window.scrollTo({ top, behavior: "auto" });
        }
      }, 500);
    };

    retry = window.setTimeout(tryScroll, 0);

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(settle);
    };
  }, [hash, offset]);
};
