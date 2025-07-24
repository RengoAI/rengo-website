// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="src/vite-env.d.ts" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import dns from "dns";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import vitePluginSvgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/server-options
dns.setDefaultResultOrder("verbatim");

// https://github.com/vite-pwa/vite-plugin-pwa/blob/main/examples/react-router/vite.config.ts
const vitePwaPlugin = (mode: VitePWAOptions["mode"]) =>
  VitePWA({
    mode: mode,
    base: "/",
    includeAssets: ["rengo.webp"],
    manifest: {
      name: "Rengo AI",
      short_name: "Rengo AI",
      theme_color: "#ffffff",
      icons: [
        {
          src: "rengo.webp",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: mode === "development",
    },
  });

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    viteTsconfigPaths(),
    vitePluginSvgr(),
    vitePwaPlugin(mode as never),
    {
      name: "html-inject-nonce-into-script-tag",
      enforce: "post",
      transformIndexHtml(html) {
        const regex = /<script(.*?)>/gi;
        const replacement = `<script nonce="ena5Ul0L1OFgf4ox9BNOaA=="$1>`;
        return html.replace(regex, replacement);
      },
    },
  ],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 10_000,
    rollupOptions: {
      // https://github.com/vitejs/vite/issues/2433#issuecomment-1422127051
      maxParallelFileOps: 2,
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("lodash")) {
              return "lodash-vendor";
            }
            return "vendor";
          }
        },
      },
      // https://github.com/vitejs/vite/issues/15012
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
}));
