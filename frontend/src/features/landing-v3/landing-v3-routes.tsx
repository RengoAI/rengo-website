import { Navigate, RouteObject } from "react-router-dom";

export const landingV3Routes: RouteObject = {
  id: "landing",
  path: "/",
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

/** The landing used to live at /v3. Send those links home. */
export const legacyV3Redirect: RouteObject = {
  id: "legacyV3",
  path: "v3",
  element: <Navigate to="/" replace />,
};
