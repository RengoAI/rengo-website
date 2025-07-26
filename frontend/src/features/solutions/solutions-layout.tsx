import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const SolutionsLayout: React.FC = () => (
  <Box>
    <Outlet />
  </Box>
);
