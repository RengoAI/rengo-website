import { BlogLayout } from "@/features/blog/blog-layout";
import { ChangelogLayout } from "@/features/blog/changelog/changelog-layout";
import { RouteObject } from "react-router-dom";

export const blogRoutes: RouteObject = {
  id: "blog",
  path: "blog",
  handle: {
    pageTitle: "Blog",
  },
  element: <BlogLayout />,
  children: [
    {
      id: "changelog",
      path: "changelog",
      handle: {
        pageTitle: "Changelog",
      },
      element: <ChangelogLayout />,
      children: [
        {
          id: "changelogIndex",
          path: "",
          handle: {
            pageTitle: "Changelog",
          },
          lazy: async () => {
            const { ChangelogPage } = await import(
              "@/features/blog/changelog/changelog-page"
            );
            return { Component: ChangelogPage };
          },
        },
        {
          id: "changelogEntry",
          path: "changelog/:year/:id",
          handle: {
            pageTitle: "Changelog Entry",
          },
          lazy: async () => {
            const { ChangelogEntryPage } = await import(
              "@/features/blog/changelog/changelog-entry-page"
            );
            return { Component: ChangelogEntryPage };
          },
        },
      ],
    },
  ],
};
