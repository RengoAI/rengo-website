import { AppError } from "@/components/error/app-error";
import { Sidebar } from "@/components/nav/sidebar";
import { AuthenticatedTopNav } from "@/components/nav/top-nav";
import { Box, Flex } from "@chakra-ui/react";
import { ErrorBoundary } from "@suspensive/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ErrorBoundary fallback={AppError} resetKeys={[location.pathname]}>
      <AuthenticatedTopNav />
      <Flex h="calc(100vh - 64px)">
        <Sidebar
          navItems={[]}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <Box flex="1" overflow="auto">
          <Box bgColor="bg.subtle" h="calc(100vh - 64px)">
            <ErrorBoundary fallback={AppError} resetKeys={[location.pathname]}>
              {children}
            </ErrorBoundary>
          </Box>
        </Box>
      </Flex>
    </ErrorBoundary>
  );
};
