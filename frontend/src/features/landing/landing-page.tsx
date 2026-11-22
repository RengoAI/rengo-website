import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
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
import { EyeOff, Lock, ScanSearch, ShieldCheck } from "lucide-react";
import React from "react";

const COMPLIANCE = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    description:
      "Independently audited controls for data protection and access.",
  },
  {
    icon: ScanSearch,
    title: "Pen-tested",
    description: "Built to industry-leading security standards.",
  },
  {
    icon: EyeOff,
    title: "No training on your data",
    description: "Your data is never used to train or improve models.",
  },
  {
    icon: Lock,
    title: "Encrypted everywhere",
    description:
      "Data is encrypted in transit and at rest across the platform.",
  },
];

/**
 * Security on the Business Overview's navy-deep (its dark ground), with the
 * statement's steel beam glowing dim and low across it, so the page's two
 * light moments rhyme. Text in the Overview's colours on dark.
 */

const SecuritySection: React.FC = () => (
  <Section
    bg="overview.navyDeep"
    position="relative"
    overflow="hidden"
    // The statement bands' height, so it matches the page's other big
    // moments. The heading top left, like the other sections' headings,
    // the controls beside it; the steel beam fills the room below.
    minH={FEATURE_BAND_MIN_H}
    display="flex"
  >
    <LightField variant="beamSteelDark" position="absolute" inset={0} />
    <Grid position="relative" w="full" rowGap="48px">
      <GridCol span={{ base: 16, lg: 6 }} alignSelf="start">
        <Text
          as="h2"
          // The section headings' size, as the sections above.
          textStyle="h4"
          fontWeight={400}
          lineHeight="1.1"
          color="site.fg.onDark"
          maxW={{ base: "75vw", md: "320px" }}
        >
          Security built for your most sensitive data
        </Text>
      </GridCol>
      {/* The four controls, two by two, each with a small icon in the
        Overview's accent on dark. */}
      <GridCol
        as="ul"
        span={{ base: 16, lg: 9 }}
        start={{ lg: 8 }}
        gridRow={{ lg: 1 }}
        alignSelf="start"
        // Level with the heading's first line, side by side with it.
        pt={{ lg: "6px" }}
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        columnGap="48px"
        rowGap={{ base: "32px", md: "56px" }}
      >
        {COMPLIANCE.map(({ icon: Icon, title, description }) => (
          <Box
            as="li"
            key={title}
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Box color="overview.steelLight" mb="6px">
              <Icon size={22} strokeWidth={1.5} aria-hidden />
            </Box>
            <Text as="h3" textStyle="d5" color="site.fg.onDark">
              {title}
            </Text>
            <Text textStyle="body.sm" color="overview.onDark2" maxW="300px">
              {description}
            </Text>
          </Box>
        ))}
      </GridCol>
    </Grid>
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
