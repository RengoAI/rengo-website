import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const LegalLayout: React.FC = () => (
  <Box fontFamily="body" bg="slate.10" minH="100vh">
    <Outlet />
  </Box>
);
