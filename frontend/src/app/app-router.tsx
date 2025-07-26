import AppRoot from "@/app/app-root";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { blogRoutes } from "@/features/blog/blog-routes";
import { careersRoutes } from "@/features/careers/careers-routes";
import { landingRoutes } from "@/features/landing/landing-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { solutionsRoutes } from "@/features/solutions/solutions-routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [
  landingRoutes,
  legalRoutes,
  careersRoutes,
  solutionsRoutes,
  blogRoutes,
];

export const appRouter = createBrowserRouter([
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
