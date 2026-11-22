/**
 * Gives every public page its own HTML file in the build, so GitHub Pages
 * answers a deep link such as /careers with 200 rather than falling back to
 * 404.html, and fills in each page's title, description and link-preview
 * tags, which crawlers and chat apps read without running the app. Also
 * writes 404.html (marked noindex), sitemap.xml and robots.txt.
 *
 * Each file is the same app shell as the root `index.html`; the router picks
 * the page from the URL as before.
 *
 * Usage: vite-node src/scripts/prerender-routes.ts <build dir>
 */

import {
  NOT_FOUND_META,
  OG_IMAGE_PATH,
  PAGE_META,
  type PageMeta,
  SITE_NAME,
  SITE_URL,
} from "@/app/page-meta";
import fs from "fs";
import path from "path";

const buildDir = process.argv[2];
if (!buildDir) {
  throw new Error("Usage: prerender-routes.ts <build dir>");
}
const shellPath = path.resolve(buildDir, "index.html");
if (!fs.existsSync(shellPath)) {
  throw new Error(`prerender: no built index.html at ${shellPath}`);
}

const shell = fs.readFileSync(shellPath, "utf8");
const META_BLOCK = /<!-- page-meta[\s\S]*?<!-- \/page-meta -->/;
if (!META_BLOCK.test(shell)) {
  throw new Error("prerender: index.html has no <!-- page-meta --> block");
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const metaBlock = (
  { title, description }: PageMeta,
  url: string | null,
): string => {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return [
    "<!-- page-meta -->",
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    url
      ? `<link rel="canonical" href="${url}" />`
      : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE_PATH}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    "<!-- /page-meta -->",
  ]
    .filter(Boolean)
    .join("\n    ");
};

const write = (relPath: string, contents: string) => {
  const out = path.join(buildDir, relPath);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, contents);
  process.stdout.write(`prerender: ${relPath}\n`);
};

const urlFor = (pagePath: string) =>
  pagePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${pagePath}`;

for (const [pagePath, meta] of Object.entries(PAGE_META)) {
  const html = shell.replace(META_BLOCK, metaBlock(meta, urlFor(pagePath)));
  if (pagePath === "/") {
    write("index.html", html);
    continue;
  }
  // Pages serves /careers from careers.html directly, and /careers/ from
  // careers/index.html, so write both and neither form needs a redirect.
  write(`${pagePath.slice(1)}.html`, html);
  write(`${pagePath.slice(1)}/index.html`, html);
}

// Everything else falls back to this; it renders the app's not-found page.
write("404.html", shell.replace(META_BLOCK, metaBlock(NOT_FOUND_META, null)));

write(
  "sitemap.xml",
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...Object.keys(PAGE_META).map(
      (pagePath) => `  <url><loc>${urlFor(pagePath)}</loc></url>`,
    ),
    `</urlset>`,
    "",
  ].join("\n"),
);

write(
  "robots.txt",
  [
    "User-agent: *",
    "Disallow: /styleguide",
    "Disallow: /gradients",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n"),
);
