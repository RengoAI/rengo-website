import { CareersLayout } from "@/features/careers/careers-layout";
import { Navigate, RouteObject } from "react-router";

/**
 * /careers and its role pages, on the rebrand chrome (SiteNav, SiteFooter),
 * so they sit outside AppRoot with the other standalone routes.
 */
export const careersRoutes: RouteObject = {
  id: "careers",
  path: "careers",
  handle: {
    pageTitle: "Careers",
  },
  element: <CareersLayout />,
  children: [
    {
      id: "careersIndex",
      index: true,
      lazy: async () => {
        const { CareersPage } = await import("@/features/careers/careers-page");
        return { Component: CareersPage };
      },
    },
    {
      id: "softwareEngineerRedirect",
      path: "software-engineer",
      element: <Navigate to="/careers" replace />,
    },
    {
      id: "careersRole",
      path: ":roleId",
      handle: {
        pageTitle: "Careers",
      },
      lazy: async () => {
        const { JobListingPage } = await import(
          "@/features/careers/job-listing-page"
        );
        return { Component: JobListingPage };
      },
    },
  ],
};
