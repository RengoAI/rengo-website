import { PageHero } from "@/components/layout/page-hero";
import {
  OPEN_ROLES_SECTION_ID,
  OpenRolesSection,
} from "@/features/careers/open-roles-section";
import { FoundersSection } from "@/features/company/founders-section";
import { Box } from "@chakra-ui/react";
import React from "react";

const scrollToOpenRoles = () => {
  const el = document.getElementById(OPEN_ROLES_SECTION_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const CareersPage: React.FC = () => (
  <Box fontFamily="body" bg="slate.10">
    <PageHero
      headline="Join Us"
      subtext="Build at the frontier of AI"
      ctaLabel="View open roles"
      onCtaClick={scrollToOpenRoles}
    />
    <FoundersSection />
    <OpenRolesSection />
  </Box>
);
