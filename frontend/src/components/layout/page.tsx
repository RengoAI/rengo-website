import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { create } from "zustand";

interface PageProps {
  header?: {
    title?: string;
    description?: string;
  };
  sizeProps?: {
    fullHeight?: boolean;
  };
  actions?: React.ReactNode;
  disableBreadcrumbs?: boolean;
}

interface HandleData {
  pageTitle?: string;
  tabTitle?: string;
  icon?: React.ElementType;
  disableLink?: boolean;
  href?: string;
}

interface HandleStore {
  handles: Record<string, HandleData>;
  updateHandle: (routeId: string, data: Partial<HandleData>) => void;
}

export const usePageHandleStore = create<HandleStore>((set) => ({
  handles: {},
  updateHandle: (routeId, data) =>
    set((state) => ({
      handles: {
        ...state.handles,
        [routeId]: {
          ...state.handles[routeId],
          ...data,
        },
      },
    })),
}));

export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
  children,
  header,
  actions,
  sizeProps,
}) => (
  <Box
    flex={1}
    display="flex"
    flexDirection="column"
    bg="bg.extraSubtle"
    minH={sizeProps?.fullHeight ? "100vh" : undefined}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      <Box flex={1}>
        {header?.title && (
          <Box mb="4">
            <Flex mb="2" alignItems="center" gap="2">
              <Text fontSize="xl" fontWeight="medium">
                {header.title}
              </Text>
            </Flex>
            {header.description && (
              <Text variant="body" color="fg.muted">
                {header.description}
              </Text>
            )}
          </Box>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
    <Box>{children}</Box>
  </Box>
);
