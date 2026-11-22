import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { StatementBand } from "@/components/site/statement-band";
import {
  StepCard,
  TESTIMONIAL_WASHES,
  TestimonialCard,
  type TestimonialWash,
} from "@/components/site/split-card";
import { FoundationSection } from "@/features/landing/foundation-section";
import { LandingHero } from "@/features/landing/landing-hero";
import { LogoMarquee } from "@/features/landing/logo-marquee";
import { GridCircleDots } from "@/features/solutions/grid-circle-dots";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const HOW_WE_WORK = [
  {
    title: "Scope the work",
    body: "We learn how your team works today, what information they need, and where the process breaks down.",
  },
  {
    title: "Set the roadmap",
    body: "Together, we choose what to build first, the data needed to support it, and what comes next.",
  },
  {
    title: "Build with your team",
    body: "We connect the relevant systems, organize the data, and build the tools your team will use.",
  },
  {
    title: "Support and expand",
    body: "We maintain the system, support your team, and add new workflows as priorities change.",
  },
];

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

/**
 * The partner promise. Under that heading, right-aligned on desktop, the
 * solutions figure moves between a grid and a circle. The band is tall
 * enough to hold the circle below the heading.
 */
const FdeSection: React.FC = () => {
  // The tallest shape (the circle) starts at the bottom of this heading.
  const copyRef = React.useRef<HTMLHeadingElement>(null);
  return (
    <Section
      position="relative"
      overflow="hidden"
      rhythm="tight"
      bg="site.bg.surface"
      borderBottomRadius="4px"
      // Held open the bottom padding past the figure: the figure sets the exact
      // height once it draws (it knows how the heading wrapped); this is the
      // first paint's estimate. The clamp is the figure's height, scaling
      // with the screen as its shape does; on phones it's narrowed to fit,
      // the min(). The px before it covers the padding, heading and gap.
      minH={{
        base: "calc(185px + min(clamp(241px, 33.45vw, 482px), (100vw - 32px) * 0.614) + var(--site-gutter-y-tight))",
        md: "calc(170px + clamp(241px, 33.45vw, 482px) + var(--site-gutter-y-tight))",
        lg: "calc(190px + clamp(241px, 33.45vw, 482px) + var(--site-gutter-y-tight))",
      }}
    >
      <GridCircleDots below={copyRef} scale={0.8} />
      <Grid position="relative" zIndex={1}>
        <GridCol span={16}>
          <Text
            ref={copyRef}
            as="h2"
            textStyle="h4"
            fontWeight={400}
            lineHeight="1.1"
            color="site.fg.heading"
            // Caps at the column's edge instead of running off the screen.
            w="673px"
            maxW="full"
          >
            We partner with your team to turn your data into{" "}
            <Box as="span" color="site.highlight">
              measurable business outcomes
            </Box>
          </Text>
        </GridCol>
      </Grid>
    </Section>
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
      <StatementBand
        lead="AI is only as reliable as"
        point="the information it works from."
      />

      {/* --- Solution ------------------------------------------------------- */}
      {/* Light band, static: the foundation's layers. */}
      <FoundationSection />

      {/* --- About the FDE service ------------------------------------------- */}
      <FdeSection />

      {/* The problem band's pale blue, so it reads apart from the off-white
        sections around it. */}
      {/* The problem band's wash, turned the other way round. */}
      <Section
        grid
        {...TESTIMONIAL_WASHES.midReversed}
        py="calc(72px + 2rem)"
        // 20px between the step cards, across and when stacked.
        gridProps={{ gap: "1.25rem" }}
      >
        <GridCol span={16} pb="36px">
          <Box display="flex" flexDirection="column" gap="12px">
            <Text
              as="h2"
              textStyle="h3"
              color="site.fg.heading"
              maxW={{ base: "75vw", md: "280px" }}
            >
              Our approach
            </Text>
            <Text
              textStyle="body.sm"
              color="site.fg"
              // Wraps on phones; one line from md up.
              whiteSpace={{ md: "nowrap" }}
            >
              We map how your team works today, then build with you.
            </Text>
          </Box>
        </GridCol>
        {/* The metrics layout, filling the grid: four 4-column steps. Two
          across on tablets, stacked on phones. */}
        {HOW_WE_WORK.map((step, i) => (
          <GridCol key={step.title} span={{ base: 16, md: 8, lg: 4 }}>
            <StepCard step={i + 1} title={step.title} body={step.body} />
          </GridCol>
        ))}
      </Section>

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
      >
        <SolidCta h="27px" href={CONTACT_HREF} labelProps={{ gap: "8px" }}>
          Book a call
        </SolidCta>
      </StatementBand>
    </Box>

    <SiteFooter />
  </Box>
);
