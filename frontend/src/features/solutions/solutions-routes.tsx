import { RouteObject, Navigate } from "react-router-dom";

export const solutionsRoutes: RouteObject = {
  id: "solutions",
  path: "solutions",
  handle: {
    pageTitle: "Solutions",
  },
  children: [
    {
      id: "solutionsIndex",
      index: true,
      lazy: async () => {
        const { SolutionsPage } = await import(
          "@/features/solutions/solutions-page"
        );
        return { Component: SolutionsPage };
      },
    },
    /* The two former child pages were each a bare hero. Redirect rather than
       404 so existing links and any indexed URLs still land somewhere. */
    {
      id: "aiDataPlatformRedirect",
      path: "ai-data-platform",
      element: <Navigate to="/solutions" replace />,
    },
    {
      id: "customAiApplicationsRedirect",
      path: "custom-ai-applications",
      element: <Navigate to="/solutions" replace />,
    },
  ],
};
