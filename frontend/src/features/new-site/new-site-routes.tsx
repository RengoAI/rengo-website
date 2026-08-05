import { RouteObject } from "react-router-dom";

import NewSitePage from "@/features/new-site/new-site-page";

export const newSiteRoutes: RouteObject = {
  path: "/next",
  element: <NewSitePage />,
};
