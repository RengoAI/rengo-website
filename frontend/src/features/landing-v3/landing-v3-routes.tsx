import { RouteObject } from "react-router-dom";

export const landingV3Routes: RouteObject = {
  id: "landingV3",
  path: "v3",
  handle: {
    pageTitle: "Rengo AI",
  },
  lazy: async () => {
    const { LandingV3Page } = await import(
      "@/features/landing-v3/landing-v3-page"
    );
    return { Component: LandingV3Page };
  },
};
