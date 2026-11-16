import { appRouter } from "@/app/app-router";

/** When the last stale-chunk reload ran, so a failure right after one isn't
 * retried in a loop. */
const RELOADED_AT = "rengo:stale-chunk-reload";
const RETRY_AFTER_MS = 10_000;

/**
 * Each page's code is a separate file named by its content hash, loaded on
 * first visit. A deploy replaces the site's files, so a tab opened before
 * it asks for names that no longer exist: GitHub Pages answers with its
 * HTML 404 and the navigation crashes. Vite reports that as
 * `vite:preloadError`; on it, load the page the visitor was going to
 * afresh, which picks up the new build. At most once every ten seconds, so
 * a real outage shows the error page instead of reloading forever.
 */
const reloadOnStaleChunks = () => {
  window.addEventListener("vite:preloadError", () => {
    let last = 0;
    try {
      last = Number(sessionStorage.getItem(RELOADED_AT)) || 0;
    } catch {
      // Storage blocked: still reload, as this is a rare, one-off failure.
    }
    if (Date.now() - last < RETRY_AFTER_MS) return;
    try {
      sessionStorage.setItem(RELOADED_AT, String(Date.now()));
    } catch {
      // As above.
    }

    // The router holds the page being navigated to until its code loads.
    const pending = appRouter.state.navigation.location;
    if (pending) {
      window.location.assign(pending.pathname + pending.search + pending.hash);
    } else {
      window.location.reload();
    }
  });
};

export const appInit = () => {
  reloadOnStaleChunks();
};
