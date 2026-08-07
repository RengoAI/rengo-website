import { SolutionsLayout } from "@/features/solutions/solutions-layout";
import { RouteObject } from "react-router-dom";

export const solutionsRoutes: RouteObject = {
  id: "solutions",
  path: "solutions",
  handle: {
    pageTitle: "Solutions",
  },
  element: <SolutionsLayout />,
  children: [
    {
      id: "aiDataPlatform",
      path: "ai-data-platform",
      handle: {
        pageTitle: "AI Data Platform",
      },
      lazy: async () => {
        const { AiDataPlatformPage } = await import(
          "@/features/solutions/ai-data-platform-page"
        );
        return { Component: AiDataPlatformPage };
      },
    },
    {
      id: "customAiApplications",
      path: "custom-ai-applications",
      handle: {
        pageTitle: "Custom AI Applications",
      },
      lazy: async () => {
        const { CustomAiApplicationsPage } = await import(
          "@/features/solutions/custom-ai-applications-page"
        );
        return { Component: CustomAiApplicationsPage };
      },
    },
  ],
};
