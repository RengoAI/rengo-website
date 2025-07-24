import { Box } from "@chakra-ui/react";
import React from "react";

export const PageTabBody: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Box mx="-24px" px="24px" pt="16px">
    {children}
  </Box>
);
