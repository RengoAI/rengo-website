import AppRoot from "@/app/app-root";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { careersRoutes } from "@/features/careers/careers-routes";
import { landingRoutes } from "@/features/landing/landing-routes";
import { legalRoutes } from "@/features/legal/legal-routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [
  landingRoutes,
  legalRoutes,
  careersRoutes,
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
