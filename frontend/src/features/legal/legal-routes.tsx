import { LegalLayout } from "@/features/legal/legal-layout";
import { RouteObject } from "react-router-dom";

export const legalRoutes: RouteObject = {
  id: "legal",
  path: "legal",
  handle: {
    pageTitle: "Legal",
  },
  element: <LegalLayout />,
  children: [
    {
      id: "legalTermsOfService",
      path: "terms-of-service",
      lazy: async () => {
        const { TermsOfServicePage } = await import(
          "@/features/legal/terms-of-service-page"
        );
        return { Component: TermsOfServicePage };
      },
    },
  ],
};
