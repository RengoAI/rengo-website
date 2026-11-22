import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import {
  CONTACT_HREF,
  FEATURE_BAND_MIN_H,
} from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { StatementBand } from "@/components/site/statement-band";
import { ApproachSection } from "@/features/landing/approach-section";
import { CustomerQuotes } from "@/features/landing/customer-quotes";
import { FoundationSection } from "@/features/landing/foundation-section";
import { LandingHero } from "@/features/landing/landing-hero";
import { LightField } from "@/components/site/light-field";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const COMPLIANCE = [
  {
    title: "SOC 2 Type II",
    description:
      "Independently audited controls for data protection and access.",
  },
  {
    title: "Pen-tested",
    description: "Built to industry-leading security standards.",
  },
  {
    title: "No training on your data",
    description: "Your data is never used to train or improve models.",
  },
  {
    title: "Encrypted everywhere",
    description:
      "Data is encrypted in transit and at rest across the platform.",
  },
];

/**
 * Security on the Business Overview's navy-deep (its dark ground), with the
 * statement's steel beam glowing dim and low across it, so the page's two
 * light moments rhyme. The dark band's colour tokens (as CSS variables) are
 * re-pointed to the Overview's text and lines on dark.
 */
const SECURITY_VARS = {
  "--rengo-colors-site-fg-on-dark-subtle":
    "var(--rengo-colors-overview-on-dark2)",
  "--rengo-colors-site-border-on-dark":
    "var(--rengo-colors-overview-line-dark)",
};

const SecuritySection: React.FC = () => (
  <Section
    bg="overview.navyDeep"
    css={SECURITY_VARS}
    position="relative"
    overflow="hidden"
    // The statement bands' height, so it matches the page's other big
    // moments: the heading at the top, the items at the foot, the beam
    // running through the room between.
    minH={FEATURE_BAND_MIN_H}
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <LightField variant="beamSteelDark" position="absolute" inset={0} />
    <Box position="relative" pb={{ base: "40px", lg: "60px" }}>
      <Text
        as="h2"
        textStyle="h3"
        fontWeight={300}
        color="site.fg.onDark"
        maxW={{ base: "60vw", md: "336px" }}
      >
        Security built for your most sensitive data
      </Text>
    </Box>
    <ComplianceCardGroup
      items={COMPLIANCE}
      h={{ lg: "176px" }}
      position="relative"
    />
  </Section>
);

export const LandingPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    <Box as="main" id="main">
      {/* --- Hero ---------------------------------------------------------- */}
      {/* Scattered dots are pulled into the data layer under the CTA, where
        each line rolls in its own gentle wave. */}
      <LandingHero />

      {/* --- The problem ------------------------------------------------- */}
      {/* Word for word from the Business Overview ("Shared File Drive vs.
        Structured Database"). */}
      {/* Word for word from the Business Overview ("Shared File Drive vs.
        Structured Database"), over a low steel beam of light: the calmest
        kind of gradient for a full-width band, in the Business Overview's
        steel. */}
      <StatementBand
        lead="AI is only as reliable as"
        point="the information it works from"
        light="beamSteel"
      />

      {/* --- Solution ------------------------------------------------------- */}
      {/* Light band, static: the foundation's layers. */}
      <FoundationSection />

      {/* --- How we work ---------------------------------------------- */}
      <ApproachSection />

      {/* --- Customer stories ------------------------------------------- */}
      <CustomerQuotes />

      {/* --- Security --------------------------------------------- */}
      <SecuritySection />

      {/* The close, set as the opening statement's twin, with the call, on
        the footer's lighter grey so the line pops. */}
      <StatementBand
        id="outro-heading"
        lead="Ready to make your data"
        point="your alpha?"
        tone="plain"
        // Held part-way: the dots scattered loosely round the line.
        still={0.55}
      >
        <SolidCta h="27px" href={CONTACT_HREF} labelProps={{ gap: "8px" }}>
          Book a call
        </SolidCta>
      </StatementBand>
    </Box>

    <SiteFooter />
  </Box>
);
