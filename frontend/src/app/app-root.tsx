import { AppError } from "@/components/error/app-error";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/shared/utils/scroll-to-top";

import { ErrorBoundary } from "@suspensive/react";
import { Outlet } from "react-router-dom";

const AppRoot = () => (
  <>
    <ScrollToTop />
    <AppLayout>
      <ErrorBoundary fallback={AppError}>
        <Outlet />
        <Toaster />
      </ErrorBoundary>
    </AppLayout>
  </>
);

export default AppRoot;
