// https://vitejs.dev/guide/env-and-mode.html#modes
// During production, these env variables are statically replaced.
// It is therefore necessary to always reference them using the full static string.
const mode = import.meta.env.MODE;
export const isDevelopment = mode === "development";
