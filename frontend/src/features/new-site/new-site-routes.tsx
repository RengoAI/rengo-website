import { RouteObject } from "react-router-dom";

import NewSitePage    from "@/features/new-site/new-site-page";
import SecurityPage   from "@/features/new-site/security-page";
import SolutionsPage  from "@/features/new-site/solutions-page";

export const newSiteRoutes: RouteObject = {
  path: "/next",
  children: [
    { index: true,           element: <NewSitePage /> },
    { path: "solutions",     element: <SolutionsPage /> },
    { path: "security",      element: <SecurityPage /> },
  ],
};
