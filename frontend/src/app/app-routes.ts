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
    legacyV3: route("/v3", {}, {}),
    solutions: route("/solutions", {}, {}),
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
    legal: route(
      "/legal",
      {},
      {
        termsOfService: route("/terms-of-service", {}, {}),
        privacyPolicy: route("/privacy-policy", {}, {}),
      },
    ),
    companyRedirect: route("/company", {}, {}),
    styleguide: route("/styleguide", {}, {}),
    notFound: route("/*", {}, {}),
  },
);
