import { RouteObject } from "react-router-dom";

/**
 * Rebrand page, so it ships its own chrome and sits outside AppRoot like the
 * other v3 surfaces. It takes over /solutions/applied-ai from the legacy
 * CapabilityPage.
 */
export const appliedAiRoutes: RouteObject = {
  id: "appliedAi",
  path: "solutions/applied-ai",
  handle: {
    pageTitle: "Applied AI · Rengo AI",
  },
  lazy: async () => {
    const { AppliedAiPage } = await import(
      "@/features/applied-ai/applied-ai-page"
    );
    return { Component: AppliedAiPage };
  },
};
