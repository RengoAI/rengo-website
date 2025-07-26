import { CareersLayout } from "@/features/careers/careers-layout";
import { RouteObject } from "react-router-dom";

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
  ],
};
