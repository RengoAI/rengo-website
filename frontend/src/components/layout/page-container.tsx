import { Box } from "@chakra-ui/react";
import React from "react";

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Box maxW="1440px" mx="auto" px={{ base: 4, md: 20 }} w="full">
    {children}
  </Box>
);
