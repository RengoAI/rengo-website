import { SiteShell } from "@/app/site-shell";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { blogRoutes } from "@/features/blog/blog-routes";
import { careersRoutes } from "@/features/careers/careers-routes";
import { gradientsRoutes } from "@/features/gradients/gradients-routes";
import {
  landingRoutes,
  legacyLandingRedirect,
} from "@/features/landing/landing-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { styleguideRoutes } from "@/features/styleguide/styleguide-routes";
import { createBrowserRouter, Navigate, RouteObject } from "react-router";

/**
 * The site's pages. Each ships SiteNav and SiteFooter itself.
 */
const STANDALONE_ROUTES: RouteObject[] = [
  landingRoutes,
  legacyLandingRedirect,
  careersRoutes,
  blogRoutes,
  legalRoutes,
  styleguideRoutes,
  gradientsRoutes,
  {
    id: "companyRedirect",
    path: "company",
    element: <Navigate to="/careers" replace />,
  },
];

export const appRouter = createBrowserRouter([
  {
    element: <SiteShell />,
    children: STANDALONE_ROUTES,
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
  },
]);
