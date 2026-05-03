import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

export const CareersPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    <PageHero
      headline="Join the Team"
      subtext="Help us reimagine private markets infrastructure."
      ctaLabel="Get in touch"
      onCtaClick={() => window.open("mailto:careers@rengoai.com", "_blank")}
    />
  </Box>
);
