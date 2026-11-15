import { metaForPath, normalizePath, SITE_URL } from "@/app/page-meta";
import React from "react";
import { useLocation } from "react-router";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Keeps the tab title, description and canonical URL in step with the page
 * as the app navigates. The build writes the same values into each page's
 * HTML for crawlers; see `src/scripts/prerender-routes.ts`.
 */
export const usePageMeta = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const { title, description } = metaForPath(pathname);
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    const url = `${SITE_URL}${normalizePath(pathname)}`;
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('link[rel="canonical"]', "href", url);
  }, [pathname]);
};
