import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { type SolutionCapability } from "@/features/solutions/solutions";
import { Box } from "@chakra-ui/react";
import React from "react";

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

/**
 * Shared template for the capability pages under /solutions.
 */
export const CapabilityPage: React.FC<{ capability: SolutionCapability }> = ({
  capability: c,
}) => (
  <Box fontFamily="body" bg="slate.10">
    <PageHero
      headline={c.title}
      subtext={c.lede}
      ctaLabel="Get started"
      onCtaClick={openSalesMail}
      background={<HeroGridCanvas />}
    />
  </Box>
);
