import { AgentsBentoSection } from "@/features/landing/sections/agents-bento-section";
import { CaseStudySection } from "@/features/landing/sections/case-study-section";
import { CtaSection } from "@/features/landing/sections/cta-section";
import { TrustedTeamsBentoSection } from "@/features/landing/sections/trusted-teams-bento-section";
import { LandingHero } from "@/features/landing/sections/landing-hero";
import { Box } from "@chakra-ui/react";
import React from "react";

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

export const LandingPage: React.FC = () => (
  <Box fontFamily="body" bg="slate.10">
    <LandingHero onCtaClick={openSalesMail} />
    <AgentsBentoSection />
    <CaseStudySection />
    <TrustedTeamsBentoSection />
    <CtaSection onTalkToSales={openSalesMail} />
  </Box>
);
