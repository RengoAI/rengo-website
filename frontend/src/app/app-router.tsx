import AppRoot from "@/app/app-root";
import NotFoundPage from "@/components/empty/app-not-found-page";
import { blogRoutes } from "@/features/blog/blog-routes";
import { careersRoutes } from "@/features/careers/careers-routes";
import { companyRoute } from "@/features/company/company-routes";
import { landingRoutes } from "@/features/landing/landing-routes";
import { legalRoutes, securityRoute } from "@/features/legal/legal-routes";
import { solutionsRoutes } from "@/features/solutions/solutions-routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const ALL_ROUTES: RouteObject[] = [
  landingRoutes,
  legalRoutes,
  securityRoute,
  careersRoutes,
  companyRoute,
  solutionsRoutes,
  blogRoutes,
];

// The design lab is mounted everywhere EXCEPT the production build (which is
// what deploys to rengoai.com). `import.meta.env.MODE` is statically replaced
// at build time, so in a production build this `if` is `if (false)` and Rollup
// drops the whole block — including the dynamic import — so no lab code (not
// even its lazy chunks) ships. In dev / preview / sandbox it mounts at /lab as
// a top-level sibling with its own stripped-down shell. The top-level await
// resolves before app.tsx renders and before the route generator reads the
// router, so both see the lab routes in non-production modes.
const LAB_ROUTES: RouteObject[] = [];
if (import.meta.env.MODE !== "production") {
  const { labRoutes } = await import("@/features/lab/lab-routes");
  LAB_ROUTES.push(labRoutes);
}

export const appRouter = createBrowserRouter([
  {
    id: "root",
    element: <AppRoot />,
    children: [...ALL_ROUTES],
  },
  ...LAB_ROUTES,
  {
    id: "notFound",
    path: "*",
    element: <NotFoundPage />,
  },
]);
