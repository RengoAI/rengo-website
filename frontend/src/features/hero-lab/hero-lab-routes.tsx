import { RouteObject } from "react-router-dom";

export const heroLabRoutes: RouteObject = {
  id: "heroLab",
  path: "v3/heroes",
  handle: {
    pageTitle: "Hero lab",
  },
  lazy: async () => {
    const { HeroLabPage } = await import("@/features/hero-lab/hero-lab-page");
    return { Component: HeroLabPage };
  },
};
