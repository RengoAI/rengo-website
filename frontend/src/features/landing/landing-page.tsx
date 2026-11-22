import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { StatementBand } from "@/components/site/statement-band";
import {
  TestimonialCard,
  type TestimonialWash,
} from "@/components/site/split-card";
import { ApproachSection } from "@/features/landing/approach-section";
import { FoundationSection } from "@/features/landing/foundation-section";
import { LandingHero } from "@/features/landing/landing-hero";
import { LogoMarquee } from "@/features/landing/logo-marquee";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const TESTIMONIALS = [
  {
    quote:
      "“Everyone has been asking for a single source of truth. Rengo brings it all together, and we're excited to roll it out across the firm.”",
    attribution: "Investment Associate at $3.5B mid-market PE firm",
  },
  {
    quote:
      "“It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly.”",
    attribution: "VP of Data & AI Strategy at $20B+ real estate fund",
  },
  {
    quote:
      "“Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we've evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we're genuinely excited about.”",
    attribution: "Senior Associate at $1B growth equity fund",
  },
];

const TESTIMONIAL_WASH_ORDER: TestimonialWash[] = ["plain", "mid", "deep"];

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
      <StatementBand
        lead="AI is only as reliable as"
        point="the information it works from."
        // The dots stop part-way, loose, and a third are left out: the
        // in-flight look, without a dense field at rest.
        dots={{ rest: 0.6, share: 0.65 }}
      />

      {/* --- Solution ------------------------------------------------------- */}
      {/* Light band, static: the foundation's layers. */}
      <FoundationSection />

      {/* --- How we work ---------------------------------------------- */}
      <ApproachSection />

      {/* --- Testimonials ----------------------------------------------------- */}
      {/* On the page surface, under the solutions band. */}
      <Section grid bg="site.bg.surface" py="72px">
        <GridCol span={16} pb="40px">
          <Box display="flex" flexDirection="column" gap="8px">
            <Text
              as="h2"
              textStyle="h3"
              color="site.fg.heading"
              maxW={{ base: "75vw", md: "296px" }}
            >
              Our customers in their own words
            </Text>
          </Box>
        </GridCol>
        {/* The row of quotes starts a third of the way in, on the section's
          grid (subgrid). Stacked below `lg`; three across doesn't fit until
          then. */}
        <GridCol
          as="ul"
          span={{ base: 16, lg: 12 }}
          start={{ lg: 5 }}
          display="grid"
          gridTemplateColumns="subgrid"
          rowGap="gridGutter"
          // Stacked cards sit 40px apart on tablets, half that on phones.
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <GridCol
              as="li"
              key={testimonial.attribution + testimonial.quote}
              span={{ base: 16, lg: 4 }}
              pb={{ base: "4px", md: "24px", lg: 0 }}
            >
              {/* Plain grey first, bluest last, so the row warms into the blue. */}
              {/* Full height, so when one quote grows its card, the row
                  grows together. */}
              <TestimonialCard
                h="full"
                {...testimonial}
                wash={TESTIMONIAL_WASH_ORDER[i]}
              />
            </GridCol>
          ))}
        </GridCol>
      </Section>

      {/* --- Security --------------------------------------------------------- */}
      <Section bg="site.bg.dark">
        <Box pb={{ base: "40px", lg: "60px" }}>
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
        <ComplianceCardGroup items={COMPLIANCE} h={{ lg: "176px" }} />
      </Section>

      {/* --- Logos ------------------------------------------------------------ */}
      <Section grid rhythm="compact" bg="site.bg.dark">
        <GridCol span={{ base: 16, lg: 3 }} display="flex" alignItems="center">
          <Text textStyle="label" fontWeight={300} color="site.fg.onDarkSubtle">
            Bringing industry experience from
          </Text>
        </GridCol>
        <GridCol span={{ base: 16, lg: 13 }} display="flex" alignItems="center">
          <LogoMarquee />
        </GridCol>
      </Section>

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
