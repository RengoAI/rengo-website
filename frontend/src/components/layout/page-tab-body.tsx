import { Box } from "@chakra-ui/react";
import React from "react";

export const PageTabBody: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Box mx={{ base: "-16px", md: "-24px" }} px={{ base: "16px", md: "24px" }} pt="16px">
    {children}
  </Box>
);
