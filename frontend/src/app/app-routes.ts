/**
 * This file was auto-generated, do not edit manually.
 *
 * Run `pnpm gen` to re-generate this file.
 */

import { route, stringParser } from "typesafe-routes";

export const rootRoute = route(
  "/",
  {},
  {
    landingIndex: route("/", {}, {}),
    legal: route(
      "/legal",
      {},
      {
        termsOfService: route("/terms-of-service", {}, {}),
        privacyPolicy: route("/privacy-policy", {}, {}),
        security: route("/security", {}, {}),
      },
    ),
    careers: route(
      "/careers",
      {},
      {
        index: route("/", {}, {}),
      },
    ),
    solutions: route(
      "/solutions",
      {},
      {
        dataConnectors: route("/data-connectors", {}, {}),
        portfolioMonitoring: route("/portfolio-monitoring", {}, {}),
      },
    ),
    blog: route(
      "/blog",
      {},
      {
        changelog: route(
          "/changelog",
          {},
          {
            index: route("/", {}, {}),
            entry: route(
              "/changelog/:slug",
              {
                slug: stringParser,
              },
              {},
            ),
          },
        ),
      },
    ),
    notFound: route("/*", {}, {}),
  },
);
