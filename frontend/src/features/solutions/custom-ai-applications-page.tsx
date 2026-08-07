import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const CustomAiApplicationsPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      headline="Custom AI Applications"
      subtext="Purpose-built software and workflows, deployed with your team."
      ctaLabel="Get Started"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
  </Box>
);
