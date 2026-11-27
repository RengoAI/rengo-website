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
import { EveryTeamSection } from "@/features/landing/every-team-section";
import { FoundationSection } from "@/features/landing/foundation-section";
import { LandingHero } from "@/features/landing/landing-hero";
import { LogoMarquee } from "@/features/landing/logo-marquee";
import { TeamSection } from "@/features/landing/team-section";
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
 * How we work, after Wonderful's three pillars (platform, deployment teams,
 * strategy). Word for word from the Business Overview's "About Rengo" and
 * "Building Over Time", except the titles and pillar 1's list of layers.
 */
const PILLARS: ApproachStep[] = [
  {
    title: "The platform",
    body: "Our platform provides the underlying technology: applications, agents, an ontology, and the infrastructure that connects your data and powers AI.",
  },
  {
    title: "Engineers who work with yours",
    body: "Our engineers work directly with each client to adapt it to their data, reporting requirements and workflows. This gives organizations access to dedicated engineering expertise without the cost and complexity of building an internal team.",
  },
  {
    title: "Building over time",
    body: "Rather than trying to address everything upfront, we focus on a few priorities and expand into other areas of the business over time.",
  },
];

/**
 * Credibility straight after the hero, in Wonderful's news strip's place:
 * the careers page's logo strip, on the light page.
 */
const LogoBand: React.FC = () => (
  <Section bg="site.bg.page" py={{ base: "48px", lg: "64px" }}>
    <Box display="flex" flexDirection="column" gap="24px">
      <Text
        fontSize="12px"
        fontWeight={500}
        letterSpacing="0.06em"
        textTransform="uppercase"
        color="site.fg.muted"
      >
        From world-class engineering teams
      </Text>
      <LogoMarquee tone="light" />
    </Box>
  </Section>
);

/**
 * The landing in Wonderful's order: promise, credibility, proof, how we work
 * (one line, three pillars, then the platform's layers), who it's for, the
 * team, and the close.
 */
export const LandingPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    <Box as="main" id="main">
      {/* 1. Promise */}
      <LandingHero />

      {/* 2. Credibility */}
      <LogoBand />

      {/* 3. Proof */}
      <CustomerQuotes />

      {/* 4. How we work: the Business Overview's one-line offer, the three
        pillars, then pillar 1 in detail. */}
      <ApproachSection
        steps={PILLARS}
        heading={
          <>
            Rengo provides a managed data and AI platform, combining software
            with{" "}
            <Box as="span" color="site.highlight">
              the engineering expertise
            </Box>{" "}
            to build and maintain the infrastructure behind it
          </>
        }
      />
      <FoundationSection
        title={
          <>
            Our platform provides{" "}
            <Box as="span" color="site.highlight">
              the underlying technology
            </Box>
          </>
        }
      />

      {/* 5. Who it's for */}
      <EveryTeamSection />

      {/* 6. Team and ideas */}
      <TeamSection />

      {/* 7. Close, echoing the sales deck's tagline. */}
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
