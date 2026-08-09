import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { CtaSection } from "@/features/landing/sections/cta-section";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import {
  SolutionContentSection,
  SolutionPhilosophyColumns,
  SolutionWideSection,
} from "@/features/solutions/solution-content-layout";
import { type SolutionCapability } from "@/features/solutions/solutions";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

/**
 * Shared template for the capability pages under /solutions.
 *
 * Layout matches landing marketing sections: SectionShell, SectionHeading, and
 * deployment-style typography and column grids.
 */
export const CapabilityPage: React.FC<{ capability: SolutionCapability }> = ({
  capability: c,
}) => {
  return (
    <Box fontFamily="body" bg="slate.10">
      <PageHero
        headline={c.title}
        subtext={c.lede}
        ctaLabel="Get started"
        onCtaClick={openSalesMail}
        background={<HeroGridCanvas />}
      />

      <SolutionContentSection bg="slate.10" borderTop>
        <SectionHeading maxW="820px">{c.summary}</SectionHeading>

        <Text
          fontFamily="body"
          fontSize="16px"
          lineHeight="24px"
          color="indigo.900"
          maxW="820px"
          m={0}
        >
          {c.body}
        </Text>
      </SolutionContentSection>

      <SolutionWideSection bg="slate.20" borderTop>
        <SolutionPhilosophyColumns
          items={c.sections.map((s) => ({
            title: s.title,
            body: s.body,
          }))}
        />
      </SolutionWideSection>

      <CtaSection onTalkToSales={openSalesMail} />
    </Box>
  );
};
