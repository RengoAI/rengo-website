import { usePageMeta } from "@/shared/hooks/use-page-meta";
import { Outlet, ScrollRestoration } from "react-router";
import React from "react";

/**
 * Stays mounted across the public pages. A nav click then opens the next
 * page at the top, instead of keeping the scroll position of the page left.
 * It also keeps the tab title and description in step with the page.
 */
export const SiteShell: React.FC = () => {
  usePageMeta();
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
