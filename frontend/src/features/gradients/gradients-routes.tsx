import { RouteObject } from "react-router";

/** Internal: the gradient options gallery, on the site's nav and footer. */
export const gradientsRoutes: RouteObject = {
  id: "gradients",
  path: "gradients",
  handle: {
    pageTitle: "Gradient options",
  },
  lazy: async () => {
    const [{ GradientsPage }, { SiteNav }, { SiteFooter }] = await Promise.all([
      import("@/features/gradients/gradients-page"),
      import("@/components/site/site-nav"),
      import("@/components/site/site-footer"),
    ]);
    return {
      Component: () => (
        <>
          <SiteNav />
          <main id="main">
            <GradientsPage />
          </main>
          <SiteFooter />
        </>
      ),
    };
  },
};
