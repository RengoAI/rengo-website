import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const CustomAiApplicationsPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      headline="Private Equity"
      subtext="Turn your collective intelligence into an asset that compounds with every workflow, investment, and decision."
      ctaLabel="Get Started"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
  </Box>
);
