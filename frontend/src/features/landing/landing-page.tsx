import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import {
  CONTACT_HREF,
  FEATURE_BAND_MIN_H,
  CLOSE_BAND_MIN_H,
} from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { StatementBand } from "@/components/site/statement-band";
import {
  ApproachSection,
  type ApproachStep,
} from "@/features/landing/approach-section";
import { CustomerQuotes } from "@/features/landing/customer-quotes";
import { LandingHero } from "@/features/landing/landing-hero";
import { LatestArticles, TeamBand } from "@/features/landing/team-section";
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
    description: "Tested every year by independent security firms.",
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

// Off the homepage while it follows Wonderful's flow, which keeps security
// to a footer link; exported so it's one line to put back.
export const SecuritySection: React.FC = () => (
  <Section
    bg="overview.navyDeep"
    position="relative"
    overflow="hidden"
    // The statement bands' height, so it matches the page's other big
    // moments.
    minH={FEATURE_BAND_MIN_H}
    display="flex"
  >
    <LightField variant="beamSteelDark" position="absolute" inset={0} />
    {/* The heading top left, like the other sections' headings, then the
      four controls two by two right under it, across the full width,
      filling the band. */}
    <Box
      position="relative"
      w="full"
      display="flex"
      flexDirection="column"
      // More room under the heading, so the grid sits lower in the band.
      gap={{ base: "48px", lg: "120px" }}
    >
      <Text
        as="h2"
        // The section headings' size, as the sections above.
        textStyle="h4"
        fontWeight={400}
        lineHeight="1.1"
        color="site.fg.onDark"
      >
        Security built for your{" "}
        {/* The emphasis in the Business Overview's text on dark, as the
          careers band's second line. */}
        <Box as="span" color="overview.onDark2">
          most sensitive data
        </Box>
      </Text>
      <Box
        as="ul"
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        columnGap={{ base: "40px", lg: "64px" }}
        rowGap={{ base: "36px", lg: "48px" }}
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
            <Text textStyle="body.sm" color="overview.onDark2" maxW="360px">
              {description}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  </Section>
);

/**
 * How We Work's three pillars, after Wonderful's (platform, deployment
 * teams, strategy). Titles and text are the Business Overview's words
 * ("About Rengo" and "Building Over Time"); pillar 1 names the layers, as
 * Wonderful's names its modules.
 */
const PILLARS: ApproachStep[] = [
  {
    title: "Our platform",
    body: "Our platform provides the underlying technology. Applications, Agents, Ontology, Infrastructure.",
  },
  {
    title: "Our engineers",
    body: "Our engineers work directly with each client to adapt it to their data, reporting requirements and workflows.",
  },
  {
    title: "Building over time",
    body: "Rather than trying to address everything upfront, we focus on a few priorities and expand into other areas of the business over time.",
  },
];

/**
 * The landing in Wonderful's order, less its news strip and industry list,
 * which we have nothing to fill: promise, proof (stories, then articles),
 * How We Work (one line, three pillars), the team, and the close.
 */
export const LandingPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    <Box as="main" id="main">
      {/* 1. Promise */}
      <LandingHero />

      {/* 2. Proof: the customer stories, then the latest articles. */}
      <CustomerQuotes>
        <LatestArticles />
      </CustomerQuotes>

      {/* 3. How We Work: the heading, the Business Overview's one-line
        offer, the three pillars. */}
      <ApproachSection
        heading="How we work"
        description="Rengo AI provides a managed data and AI platform, combining software with the engineering expertise to build and maintain the infrastructure behind it."
        steps={PILLARS}
      />

      {/* 4. Team */}
      <TeamBand />

      {/* 5. Close, echoing the sales deck's tagline. */}
      <StatementBand
        id="outro-heading"
        lead="Ready to make your data"
        point="your alpha?"
        tone="plain"
        // Held part-way: the dots scattered loosely round the line.
        still={0.55}
        // With the footer under it, one screen.
        minH={CLOSE_BAND_MIN_H}
      >
        <SolidCta h="27px" href={CONTACT_HREF} labelProps={{ gap: "8px" }}>
          Book a call
        </SolidCta>
      </StatementBand>
    </Box>

    <SiteFooter />
  </Box>
);
