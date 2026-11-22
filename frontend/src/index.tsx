import { App } from "@/app/app";
import { appInit } from "@/app/init/app-init";
import { listenForStaleChunks } from "@/shared/utils/stale-chunks";
import { ErrorBoundary } from "@suspensive/react";
import React from "react";
import { createRoot } from "react-dom/client";

import { IndexError } from "@/components/error/index-error";

appInit();
// A tab open across a deploy reloads onto the new build (stale-chunks).
listenForStaleChunks();

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={IndexError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
