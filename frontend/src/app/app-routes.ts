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
    landing: route("/", {}, {}),
    legacyLanding: route("/v3", {}, {}),
    careers: route(
      "/careers",
      {},
      {
        index: route("/", {}, {}),
        softwareEngineerRedirect: route("/software-engineer", {}, {}),
        role: route(
          "/:roleId",
          {
            roleId: stringParser,
          },
          {},
        ),
      },
    ),
    blog: route(
      "/blog",
      {},
      {
        index: route("/", {}, {}),
        post: route(
          "/:slug",
          {
            slug: stringParser,
          },
          {},
        ),
      },
    ),
    legal: route(
      "/legal",
      {},
      {
        termsOfService: route("/terms-of-service", {}, {}),
        privacyPolicy: route("/privacy-policy", {}, {}),
      },
    ),
    styleguide: route("/styleguide", {}, {}),
    companyRedirect: route("/company", {}, {}),
    notFound: route("/*", {}, {}),
  },
);
