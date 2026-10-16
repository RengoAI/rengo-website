import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import {
  TestimonialCard,
  type TestimonialWash,
} from "@/components/site/split-card";
import {
  UseCaseAccordion,
  type UseCase,
} from "@/components/site/use-case-accordion";
import { FoundationSection } from "@/features/landing-v3/foundation-section";
import { LandingHero } from "@/features/landing-v3/landing-hero";
import { LogoMarquee } from "@/features/landing-v3/logo-marquee";
import { GridCircleDots } from "@/features/solutions/grid-circle-dots";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";

const ART = "/img/rebrand/";

const USE_CASES: UseCase[] = [
  {
    title: "Compare new deals without rebuilding context",
    body: 'Every new opportunity usually starts with associates pulling CIMs, past IC memos, and comps from scattered drives and inboxes, then rebuilding the same comparison spreadsheets by hand. A unified data layer puts deal history, pipeline data, market comps, and portfolio performance in one governed store. The managed ontology ensures terms like "EBITDA," "sector," and "deal stage" mean the same thing across every source.',
  },
  {
    title: "LP updates draw on one current, verified set of numbers.",
    body: "Quarterly letters and LP requests usually mean chasing the latest figures across fund admin reports, portfolio updates, and last quarter’s deck, then reconciling which version is right. Rengo connects those sources into one governed data layer, with every number traced back to the document it came from. Updates and answers to LP questions are drafted from that single verified set, so what goes out matches what finance signed off on.",
  },
  {
    title: "Portfolio financials auto-ingested with accuracy",
    body: "Portfolio companies report in their own formats and on their own schedules — PDFs, spreadsheets, and emailed packs that someone has to key into the firm’s models. Rengo ingests those files as they arrive and maps each line item to the firm’s own definitions through the managed ontology, so revenue, EBITDA, and covenants line up across every company. Finance reviews exceptions instead of retyping statements, and every figure stays linked to its source.",
  },
  {
    title: "Unlock collective intelligence",
    body: "Much of what a firm knows lives in meeting notes, memos, email threads, and the heads of the people who were in the room. Rengo captures that knowledge alongside the firm’s structured data, links it to the deals, companies, and people it concerns, and makes it searchable in plain language. New team members get up to speed faster, and hard-won insight stays with the firm when people move on.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "“It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly.”",
    avatarSrc: `${ART}avatar-1.png`,
    attribution: "VP of Data & AI Strategy at $20B+ real estate fund",
  },
  {
    quote:
      "“Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we've evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we're genuinely excited about.”",
    avatarSrc: `${ART}avatar-2.png`,
    attribution: "Senior Associate at $1B Growth Equity Fund",
  },
  {
    quote:
      "“The platform does the heavy lifting, so our team doesn't have to burn a lot of calories just to make the system usable.”",
    avatarSrc: `${ART}avatar-3.png`,
    attribution: "VP of Investor Relations at $4.5B real estate fund",
  },
];

const TESTIMONIAL_WASH_ORDER: TestimonialWash[] = ["plain", "mid", "deep"];

const COMPLIANCE = [
  {
    title: "SOC2 Type II",
    description:
      "Independently audited controls for data protection and access.",
  },
  {
    title: "Pen-tested",
    description: "Built to industry-leading security standards.",
  },
  {
    title: "No training on your data",
    description:
      "Your data is never used to train or improve models.",
  },
  {
    title: "Encrypted everywhere",
    description: "Data is encrypted in transit and at rest across the platform.",
  },
];

/**
 * The partner promise. Under that heading, right of centre, the solutions
 * figure moves between a grid and a circle. The band is tall enough to hold
 * the circle below the heading.
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
      minH={{ base: "420px", md: "640px", lg: "680px" }}
    >
      <GridCircleDots below={copyRef} scale={0.8} />
      <Grid position="relative" zIndex={1}>
        <GridCol span={16}>
          <Text
            ref={copyRef}
            as="h2"
            textStyle="h5"
            fontWeight={400}
            lineHeight="1.1"
            color="site.fg"
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

export const LandingV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    <Box as="main">
      {/* --- Hero ---------------------------------------------------------- */}
      {/* Scattered dots are pulled into the data layer under the CTA, where
        each line rolls in its own gentle wave. */}
      <LandingHero />

      {/* --- The problem & vision ------------------------------------------ */}
      {/* Held open to 741px, 80px past the design's 661px band; the copy
        only fills the top. */}
      <Section grid bg="site.bg.tintSubtle" minH={{ lg: "741px" }}>
        <GridCol span={{ base: 16, lg: 11 }}>
          <Text as="h2" textStyle="h5" color="site.fg.strong" maxW="800px">
            Companies have spent decades making the numbers in their databases
            reliable, connecting their tools, and standardizing workflows. But
            much of what an organization actually knows{" "}
            <Box as="span" color="site.highlight">
              never reaches a database.
            </Box>
          </Text>
        </GridCol>
        {/* Hidden on phones. Flush right, behind an empty spacer: 8 columns
          on tablets, and 1 on desktop, where it sits beside the heading. */}
        <GridCol
          display={{ base: "none", md: "block" }}
          span={{ base: 15, md: 8, lg: 4 }}
          start={{ base: 2, md: 9, lg: 13 }}
          pt={{ md: "16px", lg: 0 }}
        >
          {/* Separate paragraphs, a blank line (one 1.4 line height) apart.
            `chakra.p` rather than `Text`, so they inherit body.sm. */}
          <Box
            textStyle="body.sm"
            color="site.fg"
            display="flex"
            flexDirection="column"
            gap="1.4em"
          >
            <chakra.p>
              AI is changing how we work with data, but its usefulness depends
              on the information it can access. We believe the foundation is{" "}
              <Box as="strong" fontWeight={700}>
                the data layer.
              </Box>
            </chakra.p>
            <chakra.p>
              No two organizations operate the same way, and neither does their
              data. The systems that capture and organize this information need
              to adapt as the business evolves. That requires more than
              traditional data pipelines. It requires agents that can understand
              and structure information, alongside the engineering judgment to
              ensure it remains accurate, reliable, and useful.
            </chakra.p>
            <chakra.p>
              Our vision is to build and maintain that foundation, combining
              intelligent systems with the ongoing care and oversight needed to
              make AI useful across an organization.
            </chakra.p>
            <chakra.p>- Erik Ronning, Co-founder &amp; CEO</chakra.p>
          </Box>
        </GridCol>
      </Section>

      {/* --- Solution ------------------------------------------------------- */}
      {/* Light band, static: the foundation's layers. */}
      <FoundationSection />

      {/* --- About the FDE service ------------------------------------------- */}
      <FdeSection />

      {/* Canvas 400: a grey darker than the footer's, so the band reads
        apart from the off-white sections around it. */}
      <Section grid bg="canvas.400">
        <GridCol span={16} pb="60px">
          <Text
            as="h2"
            textStyle="h3"
            color="site.fg"
            maxW={{ base: "75vw", md: "280px" }}
          >
            Our approach
          </Text>
        </GridCol>
        <GridCol span={16}>
          <UseCaseAccordion items={USE_CASES} />
        </GridCol>
      </Section>

      {/* --- Testimonials ----------------------------------------------------- */}
      {/* On the page surface, under the solutions band. */}
      <Section grid bg="site.bg.surface">
        <GridCol span={16} pb="40px">
          <Box display="flex" flexDirection="column" gap="8px">
            <Text
              as="h2"
              textStyle="h3"
              color="site.fg"
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
              span={{ base: 16, md: 12, lg: 4 }}
              pb={{ base: "4px", md: "24px", lg: 0 }}
            >
              {/* Plain grey first, bluest last, so the row warms into the blue. */}
              <TestimonialCard
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
            maxW={{ base: "75vw", md: "420px" }}
          >
            Security built for your most sensitive data
          </Text>
        </Box>
        <ComplianceCardGroup items={COMPLIANCE} h={{ lg: "240px" }} />
      </Section>

      {/* --- Logos ------------------------------------------------------------ */}
      <Section grid rhythm="compact" bg="site.bg.dark">
        <GridCol span={{ base: 16, lg: 3 }} display="flex" alignItems="center">
          <Text textStyle="label" fontWeight={300} color="site.fg.onDarkFaint">
            Bring industry experience from
          </Text>
        </GridCol>
        <GridCol span={{ base: 16, lg: 13 }} display="flex" alignItems="center">
          <LogoMarquee />
        </GridCol>
      </Section>

      <SiteOutro />
    </Box>

    <SiteFooter />
  </Box>
);
