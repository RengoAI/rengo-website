import { Navigate, RouteObject } from "react-router";

export const landingRoutes: RouteObject = {
  id: "landing",
  path: "/",
  handle: {
    pageTitle: "Rengo AI",
  },
  lazy: async () => {
    const { LandingPage } = await import("@/features/landing/landing-page");
    return { Component: LandingPage };
  },
};

export const legacyLandingRedirect: RouteObject = {
  id: "legacyLanding",
  path: "v3",
  element: <Navigate to="/" replace />,
};
