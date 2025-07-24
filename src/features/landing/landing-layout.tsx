import { LandingFooter } from "@/components/landing/landing-footer";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const LandingLayout: React.FC = () => (
  <Box>
    <Outlet />
    <LandingFooter />
  </Box>
);
