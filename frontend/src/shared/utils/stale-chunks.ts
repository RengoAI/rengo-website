/*
 * After a deploy, a tab still running the previous build asks for that
 * build's page files (hashed chunks), which the new deploy no longer has.
 * The import fails, and the page can't load. The fix is a reload, which
 * picks up the new build. These helpers spot that failure and reload once,
 * guarded so a genuinely missing file can't cause a reload loop.
 */

/** How the browsers word a failed dynamic import or module preload. */
const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS|Loading chunk .* failed/i;

export const isChunkLoadError = (error: unknown): boolean => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  return CHUNK_ERROR.test(message);
};

/** When we last reloaded for a stale chunk, to reload at most once a minute. */
const KEY = "rengo:stale-chunk-reload";
const WINDOW_MS = 60_000;

/**
 * Reloads the page to pick up the new build, unless it already did so in
 * the last minute (then the file is really missing, and the error page
 * should show). Returns whether it reloaded.
 */
export const reloadOnceForStaleChunk = (): boolean => {
  try {
    const last = Number(sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < WINDOW_MS) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // Storage blocked: reload anyway; the browser's own cache rules stop a
    // loop from being likely, and a broken page is worse.
  }
  window.location.reload();
  return true;
};

/**
 * Vite fires `vite:preloadError` when a page's files fail to preload, which
 * is the earliest sign of a stale build. Reload then, before the router
 * ever shows an error.
 */
export const listenForStaleChunks = () => {
  window.addEventListener("vite:preloadError", (event) => {
    if (reloadOnceForStaleChunk()) event.preventDefault();
  });
};
