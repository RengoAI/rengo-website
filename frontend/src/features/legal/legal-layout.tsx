import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";

export const LegalLayout: React.FC = () => (
  <Box fontFamily="body" bg="site.bg.page" minH="100vh">
    <SiteNav />
    {/* Long URLs in the policies break rather than widening the page on
        phones. */}
    <Box as="main" id="main" css={{ "& a": { overflowWrap: "anywhere" } }}>
      <Outlet />
    </Box>
    <SiteFooter />
  </Box>
);
