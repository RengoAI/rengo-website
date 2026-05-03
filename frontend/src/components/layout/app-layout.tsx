import { AppError } from "@/components/error/app-error";
import { AppFooter } from "@/components/nav/footer";
import { AppTopNav } from "@/components/nav/top-nav";
import { Box } from "@chakra-ui/react";
import { ErrorBoundary } from "@suspensive/react";
import React from "react";
import { useLocation } from "react-router-dom";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <ErrorBoundary fallback={AppError} resetKeys={[location.pathname]}>
      {!isLanding && <AppTopNav />}
      <Box minH={isLanding ? undefined : "calc(100vh - 64px)"}>
        <ErrorBoundary fallback={AppError} resetKeys={[location.pathname]}>
          {children}
          {!isLanding && <AppFooter />}
        </ErrorBoundary>
      </Box>
    </ErrorBoundary>
  );
};
