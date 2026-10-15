import AppRoot from "@/app/app-root";
import { SiteShell } from "@/app/site-shell";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { careersRoutes } from "@/features/careers/careers-routes";
import {
  landingV3Routes,
  legacyV3Redirect,
} from "@/features/landing-v3/landing-v3-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { styleguideRoutes } from "@/features/styleguide/styleguide-routes";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [styleguideRoutes];

/**
 * The public site. These ship SiteNav and SiteFooter themselves, so they sit
 * outside AppRoot rather than inheriting the old marketing nav.
 */
const STANDALONE_ROUTES: RouteObject[] = [
  landingV3Routes,
  legacyV3Redirect,
  careersRoutes,
  legalRoutes,
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
    id: "root",
    element: <AppRoot />,
    children: [...ALL_ROUTES],
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
  },
]);
