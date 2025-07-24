// eslint.config.js
import reactQuery from "@tanstack/eslint-plugin-query";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import absoluteImports from "eslint-plugin-absolute-imports";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"], // Ensure ESLint only targets relevant files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // Use TypeScript config
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      react,
      "react-hooks": reactHooks,
      "@tanstack/react-query": reactQuery,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      "absolute-imports": absoluteImports,
      "unused-imports": unusedImports,
      prettier,
    },
    rules: {
      curly: ["error", "multi-line"],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "arrow-body-style": ["error"],
      "func-style": ["error"],
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "no-console": ["error"],
      "no-duplicate-imports": ["error"],
      "no-eval": ["error"],
      "no-void": ["error"],
      "no-throw-literal": ["error"],
      "import/newline-after-import": ["error"],
      "import/first": ["error"],
      "react/jsx-curly-brace-presence": ["error"],
      "react/jsx-no-useless-fragment": ["error"],
      "react-hooks/rules-of-hooks": ["error"],
      "react-hooks/exhaustive-deps": ["error"],
      "react/prop-types": "off",
      "prettier/prettier": ["error"],
      ...eslintConfigPrettier.rules,
    },
  },
];
