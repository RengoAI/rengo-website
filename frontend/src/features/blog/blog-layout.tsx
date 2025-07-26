import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const BlogLayout: React.FC = () => (
  <Box w="full">
    <Outlet />
  </Box>
);
