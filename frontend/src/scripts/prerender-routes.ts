/**
 * Gives every public page its own `index.html` in the build, so GitHub Pages
 * answers a deep link such as /careers with 200 rather than falling back to
 * 404.html. The fallback renders the page too, but with a 404 status, so
 * search engines drop the page and link previews can fail.
 *
 * Each copy is the same app shell as the root `index.html`; the router picks
 * the page from the URL as before. Unknown URLs still get 404.html.
 *
 * Usage: vite-node src/scripts/prerender-routes.ts <build dir>
 */

import { OPEN_ROLES } from "@/features/careers/open-roles";
import fs from "fs";
import path from "path";

const PUBLIC_PATHS = [
  "/careers",
  ...OPEN_ROLES.map((role) => `/careers/${role.id}`),
  "/legal/terms-of-service",
  "/legal/privacy-policy",
];

const buildDir = process.argv[2];
if (!buildDir) {
  throw new Error("Usage: prerender-routes.ts <build dir>");
}

const shell = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

// Pages serves /careers from careers.html directly, and /careers/ from
// careers/index.html, so write both and neither form needs a redirect.
for (const pagePath of PUBLIC_PATHS) {
  const file = path.join(buildDir, `${pagePath}.html`);
  const dirIndex = path.join(buildDir, pagePath, "index.html");
  for (const out of [file, dirIndex]) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, shell);
    process.stdout.write(`prerender: ${path.relative(buildDir, out)}\n`);
  }
}
