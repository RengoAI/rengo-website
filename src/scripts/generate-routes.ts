/*
 Generates typesafe-routes code for all routes in the app.

 See the typesafe-routes docs for information on how to use it:
   https://github.com/kruschid/typesafe-routes

 Usage:
   pnpm vite-node buildSrc/typesafe-routes-gen.ts
*/

import { ESLint } from "eslint";
import fs from "fs/promises";
import { Window } from "happy-dom";
import { camelCase } from "lodash-es";
import path from "path";
import prettier from "prettier";
import { RouteObject } from "react-router-dom";
import * as ts from "typescript";
import { extractPathParams } from "../shared/utils/path-utils";

// NOTE: Vite requires a global window object and associated deps.
(globalThis.window as unknown as Window) = new Window();
globalThis.document = window.document;
globalThis.localStorage = window.localStorage;

// Stytch causes the process to hang.
global.disableStytch = true;

// This must be imported after the global window object is registered.
const { appRouter } = await import("../app/app-router");

type RouteHandle =
  | {
      queryParams?: string[];
    }
  | undefined;

const filePath = path.resolve(__dirname, "../app/app-routes.ts");

const generateImports = () =>
  ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          undefined,
          ts.factory.createIdentifier("route"),
        ),
        ts.factory.createImportSpecifier(
          false,
          undefined,
          ts.factory.createIdentifier("stringParser"),
        ),
      ]),
    ),
    ts.factory.createStringLiteral("typesafe-routes"),
    undefined,
  );

const cleanId = (id: string) => camelCase(id.replace(/\W/g, " "));
const stripParentId = (id: string, parentId: string) =>
  id.startsWith(parentId) ? id.slice(parentId.length) : id;

const queryParamsToPathString = (route: RouteObject) =>
  (route.handle as RouteHandle)?.queryParams
    ?.map((param) => `&:${param}`)
    .join("") ?? "";

const visitRoutes = (
  routes: RouteObject[],
  parentId = "",
): ts.PropertyAssignment[] =>
  routes.flatMap((route) =>
    // Flatten non-leaf routes without path
    (route.path && route.path !== "*") || route.index || !route.children?.length
      ? [
          ts.factory.createPropertyAssignment(
            ts.factory.createStringLiteral(
              cleanId(stripParentId(cleanId(route.id!), parentId)),
            ),
            visitRoute(route, cleanId(route.id!)),
          ),
        ]
      : visitRoutes(route.children ?? [], parentId),
  );

const visitRoute = (route: RouteObject, parentId = ""): ts.CallExpression =>
  ts.factory.createCallExpression(
    ts.factory.createIdentifier("route"),
    undefined,
    [
      ts.factory.createStringLiteral(
        route.path === "/"
          ? "/"
          : (route.path?.startsWith("/")
              ? route.path
              : "/" + (route.path ?? "")) + queryParamsToPathString(route),
      ),
      ts.factory.createObjectLiteralExpression(
        [
          ...extractPathParams(route.path ?? ""),
          ...((route.handle as RouteHandle)?.queryParams ?? []),
        ].map((param) =>
          ts.factory.createPropertyAssignment(
            ts.factory.createStringLiteral(param),
            ts.factory.createIdentifier("stringParser"),
          ),
        ),
        true,
      ),
      ts.factory.createObjectLiteralExpression(
        visitRoutes(route.children ?? [], parentId),
        true,
      ),
    ],
  );

const generateRoutes = () =>
  ts.factory.createVariableStatement(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier("rootRoute"),
          undefined,
          undefined,
          visitRoute({
            id: "root",
            path: "/",
            children: appRouter.routes,
          }),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );

const generateCode = () =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printFile(
      ts.factory.createSourceFile(
        [
          generateImports(),
          ts.factory.createEmptyStatement(),
          generateRoutes(),
        ],
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None,
      ),
    );

const code = `
/**
 * This file was auto-generated, do not edit manually.
 *
 * Run \`pnpm gen\` to re-generate this file.
 */

${generateCode()}
`;

let formattedCode: string;

formattedCode = await prettier.format(code, {
  parser: "typescript",
  endOfLine: "lf",
});

const eslint = new ESLint({
  fix: true,
});
const result = await eslint.lintText(formattedCode, {
  filePath, // filePath should be relative to this new CWD or absolute
  warnIgnored: true,
});
if (result[0].messages.length) {
  // eslint-disable-next-line no-console
  console.error(result[0].messages);
  process.exit(1);
}

const codeToWrite = result[0]?.output ?? formattedCode;
await fs.writeFile(filePath, codeToWrite, "utf-8");
