import { SiteShell } from "@/app/site-shell";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { RouteErrorPage } from "@/components/error/route-error-page";
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
    // A failed page shows the site's error page, not the router's
    // developer screen; a stale build reloads itself (see stale-chunks).
    errorElement: <RouteErrorPage />,
    children: STANDALONE_ROUTES,
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouteErrorPage />,
  },
]);
