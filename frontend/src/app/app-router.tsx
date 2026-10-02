import AppRoot from "@/app/app-root";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { blogRoutes } from "@/features/blog/blog-routes";
import { careersRoutes } from "@/features/careers/careers-routes";
import { companyRoute } from "@/features/company/company-routes";
import { landingRoutes } from "@/features/landing/landing-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { solutionsRoutes } from "@/features/solutions/solutions-routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [
  legalRoutes,
  careersRoutes,
  companyRoute,
  solutionsRoutes,
  blogRoutes,
];

export const appRouter = createBrowserRouter([
  // Landing routes are standalone — no global nav or footer on the marketing homepage.
  landingRoutes,
  {
    id: "root",
    element: <AppRoot />,
    children: [...ALL_ROUTES],
  },
  {
    id: "landingV2",
    path: "/v2",
    lazy: async () => {
      const { LandingPageV2 } = await import(
        "@/features/landing/landing-page-v2"
      );
      return { Component: LandingPageV2 };
    },
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
  },
]);
