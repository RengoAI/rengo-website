import { LandingLayout } from "@/features/landing/landing-layout";
import { RouteObject } from "react-router-dom";

export const landingRoutes: RouteObject = {
  id: "landing",
  path: "landing",
  handle: {
    pageTitle: "Landing",
  },
  element: <LandingLayout />,
  children: [
    {
      id: "landingIndex",
      path: "",
      index: true,
      lazy: async () => {
        const { LandingPage } = await import("@/features/landing/landing-page");
        return { Component: LandingPage };
      },
    },
  ],
};
