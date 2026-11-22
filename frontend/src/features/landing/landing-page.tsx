import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { StatementBand } from "@/components/site/statement-band";
import { ApproachSection } from "@/features/landing/approach-section";
import { CustomerQuotes } from "@/features/landing/customer-quotes";
import { FoundationSection } from "@/features/landing/foundation-section";
import { LandingHero } from "@/features/landing/landing-hero";
import { LightField } from "@/components/site/light-field";
import { LogoMarquee } from "@/features/landing/logo-marquee";
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
 * The Business Overview's grounds for the security and logo bands, in place
 * of the near-black silver.800. Each re-points the dark bands' colour
 * tokens (as CSS variables) to the Overview's: its text on dark, its lines
 * on dark. "light" sets security on the Overview's panel tint, in its navy
 * ink and rules; the logos, white, stay on navy-deep.
 */
const SECURITY_TONES = {
  navyDeep: {
    bg: "overview.navyDeep",
    vars: {
      "--rengo-colors-site-fg-on-dark-subtle":
        "var(--rengo-colors-overview-on-dark2)",
      "--rengo-colors-site-border-on-dark":
        "var(--rengo-colors-overview-line-dark)",
    },
  },
  navy: {
    bg: "overview.navy",
    vars: {
      "--rengo-colors-site-fg-on-dark-subtle":
        "var(--rengo-colors-overview-on-dark2)",
      "--rengo-colors-site-border-on-dark":
        "var(--rengo-colors-overview-line-dark)",
    },
  },
  /** Navy-deep with the statement's steel beam, dim, low across it. */
  navyDeepBeam: {
    bg: "overview.navyDeep",
    vars: {
      "--rengo-colors-site-fg-on-dark-subtle":
        "var(--rengo-colors-overview-on-dark2)",
      "--rengo-colors-site-border-on-dark":
        "var(--rengo-colors-overview-line-dark)",
    },
  },
  light: {
    bg: "overview.tint",
    vars: {
      "--rengo-colors-site-fg-on-dark": "var(--rengo-colors-overview-navy)",
      "--rengo-colors-site-fg-on-dark-subtle": "var(--rengo-colors-silver-700)",
      "--rengo-colors-site-border-on-dark": "var(--rengo-colors-overview-rule)",
    },
  },
} as const;

type SecurityTone = keyof typeof SECURITY_TONES;

const SecurityBands: React.FC<{ tone: SecurityTone }> = ({ tone }) => {
  const t = SECURITY_TONES[tone];
  const logosOn =
    tone === "light" || tone === "navyDeepBeam" ? SECURITY_TONES.navyDeep : t;
  return (
    <>
      <Section bg={t.bg} css={t.vars} position="relative" overflow="hidden">
        {tone === "navyDeepBeam" && (
          <LightField variant="beamSteelDark" position="absolute" inset={0} />
        )}
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
      <Section grid rhythm="compact" bg={logosOn.bg} css={logosOn.vars}>
        <GridCol span={{ base: 16, lg: 3 }} display="flex" alignItems="center">
          <Text textStyle="label" fontWeight={300} color="site.fg.onDarkSubtle">
            Bringing industry experience from
          </Text>
        </GridCol>
        <GridCol span={{ base: 16, lg: 13 }} display="flex" alignItems="center">
          <LogoMarquee />
        </GridCol>
      </Section>
    </>
  );
};

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

      {/* --- Security and logos --------------------------------------------- */}
      {/* Four grounds from the Business Overview's palette, one above the
        other, to choose between: navy-deep, navy-deep with the statement's
        steel beam, navy, and the light panel tint. Keep one. */}
      <SecurityBands tone="navyDeep" />
      <SecurityBands tone="navyDeepBeam" />
      <SecurityBands tone="navy" />
      <SecurityBands tone="light" />

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
