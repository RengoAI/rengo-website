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
      },
    ),
    careers: route(
      "/careers",
      {},
      {
        index: route("/", {}, {}),
      },
    ),
    company: route("/company", {}, {}),
    solutions: route(
      "/solutions",
      {},
      {
        aiDataPlatform: route("/ai-data-platform", {}, {}),
        customAiApplications: route("/custom-ai-applications", {}, {}),
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
