import { Outlet, ScrollRestoration } from "react-router-dom";
import React from "react";

/**
 * Stays mounted across the public pages. A nav click then opens the next
 * page at the top, instead of keeping the scroll position of the page left.
 */
export const SiteShell: React.FC = () => (
  <>
    <Outlet />
    <ScrollRestoration />
  </>
);
