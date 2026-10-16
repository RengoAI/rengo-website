import { RouteObject } from "react-router-dom";

export const styleguideRoutes: RouteObject = {
  id: "styleguide",
  path: "styleguide",
  handle: {
    pageTitle: "Styleguide",
  },
  lazy: async () => {
    const { StyleguidePage } = await import(
      "@/features/styleguide/styleguide-page"
    );
    return { Component: StyleguidePage };
  },
};
