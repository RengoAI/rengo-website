import { RouteObject } from "react-router";

/** /blog and its posts, on the site chrome, beside careers. */
export const blogRoutes: RouteObject = {
  id: "blog",
  path: "blog",
  handle: {
    pageTitle: "Blog",
  },
  children: [
    {
      id: "blogIndex",
      index: true,
      lazy: async () => {
        const { BlogIndexPage } =
          await import("@/features/blog/blog-index-page");
        return { Component: BlogIndexPage };
      },
    },
    {
      id: "blogPost",
      path: ":slug",
      lazy: async () => {
        const { BlogPostPage } = await import("@/features/blog/blog-post-page");
        return { Component: BlogPostPage };
      },
    },
  ],
};
