import { PageHero } from "@/components/layout/page-hero";
import { BuiltOnToolsSpotlight } from "@/features/landing/sections/built-on-tools-spotlight";
import { Box } from "@chakra-ui/react";
import React from "react";

export const AiDataPlatformPage: React.FC = () => (
  <Box fontFamily="body" bg="slate.10">
    <PageHero
      headline="Enterprise"
      subtext="Build your firm's data on one AI-ready foundation. Integrated, permissioned, and built for production."
      ctaLabel="Get Started"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      minH="auto"
      contentPt={{ base: 24, lg: 32 }}
      contentPb={{ base: 12, lg: 16 }}
    />
    <BuiltOnToolsSpotlight showCta={false} />
  </Box>
);
