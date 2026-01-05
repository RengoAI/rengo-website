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
              "/changelog/:year/:month/:id",
              {
                year: stringParser,
                month: stringParser,
                id: stringParser,
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
