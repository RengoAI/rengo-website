import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const PortfolioMonitoringPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    <PageHero
      headline="Portfolio Monitoring"
      subtext="Purpose built AI for analyzing, structuring, and cataloging portfolio data"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
  </Box>
);
