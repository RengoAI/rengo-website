import { PageHero } from "@/components/layout/page-hero";
import { OpenRolesSection } from "@/features/careers/open-roles-section";
import { FoundersSection } from "@/features/company/founders-section";
import { Box } from "@chakra-ui/react";
import React from "react";

export const CareersPage: React.FC = () => (
  <Box fontFamily="body" bg="slate.10">
    <PageHero
      headline="Join Us"
      subtext="Bring frontier AI into practice"
      ctaLabel="Get in touch"
      onCtaClick={() => window.open("mailto:careers@rengoai.com", "_blank")}
    />
    <FoundersSection />
    <OpenRolesSection />
  </Box>
);
