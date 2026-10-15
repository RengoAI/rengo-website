import { NotFound } from "@/components/empty/not-found";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Box } from "@chakra-ui/react";
import React from "react";

const AppNotFoundPage: React.FC = () => (
  <Box minH="100vh" display="flex" flexDirection="column" bg="site.bg.page">
    <SiteNav />
    <Box flex="1" display="flex">
      <NotFound />
    </Box>
    <SiteFooter />
  </Box>
);

export default AppNotFoundPage;
