import { LAB_DRAFTS } from "@/features/lab/lab-drafts";
import { LabRoot } from "@/features/lab/lab-root";
import { RouteObject } from "react-router-dom";

/**
 * Design-lab route tree. Registered as a top-level sibling of the app root
 * (not under it) so drafts get the stripped-down lab shell instead of the
 * production nav/footer. Mounted only outside the production build — see
 * `app-router.tsx`.
 */
export const labRoutes: RouteObject = {
  id: "lab",
  path: "lab",
  handle: {
    pageTitle: "Design Lab",
  },
  element: <LabRoot />,
  children: [
    {
      id: "labIndex",
      path: "",
      index: true,
      handle: {
        pageTitle: "Design Drafts",
      },
      lazy: async () => {
        const { LabIndexPage } = await import("@/features/lab/lab-index-page");
        return { Component: LabIndexPage };
      },
    },
    ...LAB_DRAFTS.map(
      (draft): RouteObject => ({
        id: `lab-${draft.slug}`,
        path: draft.slug,
        handle: {
          pageTitle: draft.title,
        },
        lazy: draft.load,
      }),
    ),
  ],
};
