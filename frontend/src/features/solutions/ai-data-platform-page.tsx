import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const AiDataPlatformPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      headline="Enterprise"
      subtext="Build your firm's data on one AI-ready foundation. Integrated, permissioned, and built for production."
      ctaLabel="Get Started"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
  </Box>
);
