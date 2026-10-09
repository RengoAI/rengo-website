import { RouteObject } from "react-router-dom";

export const aboutV3Routes: RouteObject = {
  id: "aboutV3",
  path: "v3/about",
  handle: {
    pageTitle: "About · Rengo AI",
  },
  lazy: async () => {
    const { AboutV3Page } = await import("@/features/about-v3/about-v3-page");
    return { Component: AboutV3Page };
  },
};
