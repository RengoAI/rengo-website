import AppRoot from "@/app/app-root";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { blogRoutes } from "@/features/blog/blog-routes";
import { careersRoutes } from "@/features/careers/careers-routes";
import { companyRoute } from "@/features/company/company-routes";
import { heroLabRoutes } from "@/features/hero-lab/hero-lab-routes";
import { landingV3Routes } from "@/features/landing-v3/landing-v3-routes";
import { landingRoutes } from "@/features/landing/landing-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { solutionsRoutes } from "@/features/solutions/solutions-routes";
import { styleguideRoutes } from "@/features/styleguide/styleguide-routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [
  landingRoutes,
  legalRoutes,
  careersRoutes,
  companyRoute,
  solutionsRoutes,
  blogRoutes,
  styleguideRoutes,
];

/**
 * Rebrand surfaces ship their own chrome — SiteNav and SiteFooter — so they
 * sit outside AppRoot rather than inheriting AppLayout's nav on top of it.
 */
const STANDALONE_ROUTES: RouteObject[] = [landingV3Routes, heroLabRoutes];

export const appRouter = createBrowserRouter([
  {
    id: "root",
    element: <AppRoot />,
    children: [...ALL_ROUTES],
  },
  ...STANDALONE_ROUTES,
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
  },
]);
