import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";

export const LegalLayout: React.FC = () => (
  <Box fontFamily="body" bg="site.bg.page" minH="100vh">
    <SiteNav />
    <Outlet />
    <SiteFooter />
  </Box>
);
