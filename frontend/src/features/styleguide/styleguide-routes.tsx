import { RouteObject } from "react-router";

/** The internal type and token specimen, on the site's nav and footer. */
export const styleguideRoutes: RouteObject = {
  id: "styleguide",
  path: "styleguide",
  handle: {
    pageTitle: "Styleguide",
  },
  lazy: async () => {
    const [{ StyleguidePage }, { SiteNav }, { SiteFooter }] = await Promise.all(
      [
        import("@/features/styleguide/styleguide-page"),
        import("@/components/site/site-nav"),
        import("@/components/site/site-footer"),
      ],
    );
    return {
      Component: () => (
        <>
          <SiteNav />
          <main id="main">
            <StyleguidePage />
          </main>
          <SiteFooter />
        </>
      ),
    };
  },
};
