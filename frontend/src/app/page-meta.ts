import { POSTS } from "@/features/blog/posts";
import { OPEN_ROLES } from "@/features/careers/open-roles";

/**
 * Each public page's title and description, in one place. The build writes
 * them into each page's static HTML (with Open Graph tags for link previews
 * and the sitemap), and `usePageMeta` keeps them current as the app
 * navigates.
 */

export const SITE_NAME = "Rengo AI";
export const SITE_URL = "https://rengoai.com";
/** The link-preview image, from `public/`. 1200×630. */
export const OG_IMAGE_PATH = "/og-image.png";

export type PageMeta = {
  title: string;
  description: string;
};

const HOME_DESCRIPTION =
  "We build the data layer that enables AI to learn from and act on your organization’s knowledge.";

/** Pages to list in the sitemap and pre-render, keyed by path. */
export const PAGE_META: Readonly<Record<string, PageMeta>> = {
  "/": {
    title: SITE_NAME,
    description: HOME_DESCRIPTION,
  },
  "/careers": {
    title: "Careers",
    description: "Open roles at Rengo AI across engineering and product.",
  },
  ...Object.fromEntries(
    OPEN_ROLES.map((role) => [
      `/careers/${role.id}`,
      { title: role.title, description: role.summary },
    ]),
  ),
  "/blog": {
    title: "Blog",
    description: HOME_DESCRIPTION,
  },
  ...Object.fromEntries(
    POSTS.map((post) => [
      `/blog/${post.slug}`,
      { title: post.title, description: post.summary },
    ]),
  ),
  "/legal/terms-of-service": {
    title: "Terms of Service",
    description: "The terms that govern your use of the Rengo AI website.",
  },
  "/legal/privacy-policy": {
    title: "Privacy Policy",
    description:
      "How Rengo AI collects, uses and protects information about you.",
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: "Page not found",
  description: HOME_DESCRIPTION,
};

/** Drops a trailing slash, keeping "/" itself. */
export const normalizePath = (pathname: string) =>
  pathname.replace(/\/+$/, "") || "/";

export const metaForPath = (pathname: string): PageMeta =>
  PAGE_META[normalizePath(pathname)] ?? NOT_FOUND_META;
