import { SOLUTION_CAPABILITIES } from "@/features/solutions/solutions";
import { RouteObject, Navigate } from "react-router";

export const solutionsRoutes: RouteObject = {
  id: "solutions",
  path: "solutions",
  handle: {
    pageTitle: "Solutions",
  },
  children: [
    ...SOLUTION_CAPABILITIES.map((c) => ({
      id: `solutions-${c.slug}`,
      path: c.slug,
      handle: { pageTitle: c.title },
      lazy: async () => {
        const { CapabilityPage } = await import(
          "@/features/solutions/capability-page"
        );
        return {
          Component: () => <CapabilityPage capability={c} />,
        };
      },
    })),
    /* Earlier URL shapes: two child pages that were each a bare hero, and the
       managed-operations section that has since been dropped. Redirect rather
       than 404 so existing and indexed links still land. */
    {
      id: "aiDataPlatformRedirect",
      path: "ai-data-platform",
      element: <Navigate to="/solutions/data-infrastructure" replace />,
    },
    {
      id: "customAiApplicationsRedirect",
      path: "custom-ai-applications",
      element: <Navigate to="/solutions/applied-ai" replace />,
    },
    {
      id: "managedOperationsRedirect",
      path: "managed-operations",
      element: <Navigate to="/solutions" replace />,
    },
  ],
};
