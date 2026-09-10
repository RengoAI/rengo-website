import { CareersLayout } from "@/features/careers/careers-layout";
import { Navigate, RouteObject } from "react-router-dom";

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
      path: "",
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
