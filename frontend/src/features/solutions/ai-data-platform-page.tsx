import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const AiDataPlatformPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      headline="Enterprise"
      subtext="Unify, permission, and activate your company’s data for AI."
      ctaLabel="Get Started"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
  </Box>
);
