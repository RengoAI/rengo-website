import { AppError } from "@/components/error/app-error";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "@/components/ui/toaster";

import { ErrorBoundary } from "@suspensive/react";
import { Outlet } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

const AppRoot = () => (
  <QueryParamProvider
    adapter={ReactRouter6Adapter}
    options={{ updateType: "replaceIn", removeDefaultsFromUrl: true }}
  >
    <AppLayout>
      <ErrorBoundary fallback={AppError}>
        <Outlet />

        <Toaster />
      </ErrorBoundary>
    </AppLayout>
  </QueryParamProvider>
);

export default AppRoot;
