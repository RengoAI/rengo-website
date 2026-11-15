import { NotFound } from "@/components/empty/not-found";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { usePageMeta } from "@/shared/hooks/use-page-meta";
import { Box } from "@chakra-ui/react";
import React from "react";

const AppNotFoundPage: React.FC = () => {
  usePageMeta();
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="site.bg.page">
      <SiteNav />
      <Box as="main" id="main" flex="1" display="flex">
        <NotFound />
      </Box>
      <SiteFooter />
    </Box>
  );
};

export default AppNotFoundPage;
