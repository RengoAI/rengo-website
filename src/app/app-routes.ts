/**
 * This file was auto-generated, do not edit manually.
 *
 * Run `pnpm gen` to re-generate this file.
 */

import { route } from "typesafe-routes";

export const rootRoute = route(
  "/",
  {},
  {
    landing: route(
      "/landing",
      {},
      {
        index: route("/", {}, {}),
      },
    ),
    notFound: route("/*", {}, {}),
  },
);
