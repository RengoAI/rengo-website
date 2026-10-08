import { RouteObject } from "react-router-dom";

/** Rebrand page, so it ships its own chrome and sits outside AppRoot. */
export const platformRoutes: RouteObject = {
  id: "platform",
  path: "solutions/platform",
  handle: {
    pageTitle: "Platform · Rengo AI",
  },
  lazy: async () => {
    const { PlatformPage } = await import("@/features/platform/platform-page");
    return { Component: PlatformPage };
  },
};
