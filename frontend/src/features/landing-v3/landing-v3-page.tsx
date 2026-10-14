import { rootRoute } from "@/app/app-routes";
import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import {
  MetricCard,
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
import { Box, chakra, Text } from "@chakra-ui/react";
import { ArrowUpFromDot, CornerDownRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RouterLink = chakra(Link);

const ART = "/img/rebrand/";

const USE_CASES: UseCase[] = [
  {
    audience: "Deal team",
    title: "Compare new deals without rebuilding context",
    body: 'Every new opportunity usually starts with associates pulling CIMs, past IC memos, and comps from scattered drives and inboxes, then rebuilding the same comparison spreadsheets by hand. A unified data foundation puts deal history, pipeline data, market comps, and portfolio performance in one governed store. The managed ontology ensures terms like "EBITDA," "sector," and "deal stage" mean the same thing across every source.',
  },
  {
    audience: "Investor relations",
    title: "LP updates draw on one current, verified set of numbers.",
    body: "Quarterly letters and LP requests usually mean chasing the latest figures across fund admin reports, portfolio updates, and last quarter’s deck, then reconciling which version is right. Rengo connects those sources into one governed data layer, with every number traced back to the document it came from. Updates and answers to LP questions are drafted from that single verified set, so what goes out matches what finance signed off on.",
  },
  {
    audience: "Finance",
    title: "Portfolio financials auto-ingested with accuracy",
    body: "Portfolio companies report in their own formats and on their own schedules — PDFs, spreadsheets, and emailed packs that someone has to key into the firm’s models. Rengo ingests those files as they arrive and maps each line item to the firm’s own definitions through the managed ontology, so revenue, EBITDA, and covenants line up across every company. Finance reviews exceptions instead of retyping statements, and every figure stays linked to its source.",
  },
  {
    audience: "Knowledge operations",
    title: "Unlock collective intelligence",
    body: "Much of what a firm knows lives in meeting notes, memos, email threads, and the heads of the people who were in the room. Rengo captures that knowledge alongside the firm’s structured data, links it to the deals, companies, and people it concerns, and makes it searchable in plain language. New team members get up to speed faster, and hard-won insight stays with the firm when people move on.",
  },
];

const METRICS = [
  {
    index: "1",
    value: "1 month",
    caption: "of documents/models/files unified under one system",
  },
  { index: "2", value: "X", caption: "amount of portcos unified" },
  {
    index: "3",
    value: "26% time saved",
    caption: "per LP reporting cycle",
    // Lucide's own glyph rather than the exported SVG, so it takes the
    // card's text colour.
    icon: <ArrowUpFromDot size={20} strokeWidth={1.2} aria-hidden />,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "“It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly.”",
    avatarSrc: `${ART}avatar-1.png`,
    attribution: "Asset manager at $1 billion fund",
  },
  {
    quote:
      "“Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we've evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we're genuinely excited about.”",
    avatarSrc: `${ART}avatar-2.png`,
    attribution: "CFO at $1.5 billion real estate fund",
  },
  {
    quote:
      "“The platform does the heavy lifting, so our team doesn't have to burn a lot of calories just to make the system usable.”",
    avatarSrc: `${ART}avatar-3.png`,
    attribution: "CFO at $1.5 billion real estate fund",
  },
];

const TESTIMONIAL_WASH_ORDER: TestimonialWash[] = ["plain", "mid", "deep"];

const COMPLIANCE = [
  {
    title: "SOC2 Type II",
    description:
      "Security controls designed correctly and operating effectively.",
  },
  {
    title: "Pen-tested",
    description: "Security controls suitably implemented. Continuously tested.",
  },
  {
    title: "No training on your data",
    description: "Security controls suitably implemented. Continuously tested.",
  },
  {
    title: "Encrypted everywhere",
    description: "Security controls suitably implemented. Continuously tested.",
  },
];

/**
 * About the FDE service: the promise and its gloss top left, a link to the
 * services top right. Held open to 578px, 20px short of the design's band.
 */
const FdeSection: React.FC = () => (
  <Section
    grid
    rhythm="tight"
    bg="site.bg.surface"
    borderBottomRadius="4px"
    minH={{ lg: "578px" }}
  >
    <GridCol
      span={16}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="flex-start"
      gap="16px"
    >
      <Box
        flex="1"
        minW={0}
        // Stacked on mobile, it spans the column, so the 673px copy inside
        // caps at the column's edge instead of running off the screen.
        w={{ base: "full", md: "auto" }}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
      >
        <Text
          as="h2"
          textStyle="h5"
          fontWeight={400}
          lineHeight="1.1"
          color="site.fg"
          w="673px"
          maxW="full"
        >
          We maintain your data over time and manage your systems from{" "}
          <Box as="span" color="site.highlight">
            strategy → deployment
          </Box>
        </Text>
        {/* Set like the problem statement's body copy. */}
        <Text
          textStyle="body.sm"
          color="site.fg"
          // As wide as the heading above it.
          w="673px"
          maxW="full"
        >
          Our forward-deployed engineers embed with your team to map your source
          systems, from fund administrator reports and portfolio company updates
          to CRM records and shared drives, and to build the pipelines,
          ontology, and access controls around how your firm already works. Once
          live, we stay accountable for the system: we monitor data quality,
          absorb changes to sources and schemas, and extend the applications as
          your workflows evolve, so the foundation stays reliable long after
          launch.
        </Text>
      </Box>
      <RouterLink
        to={rootRoute({}).solutions({}).$}
        display="inline-flex"
        alignItems="center"
        gap="20px"
        flexShrink={0}
        textStyle="body.sm"
        color="site.fg"
        whiteSpace="nowrap"
        transition="opacity 150ms ease"
        _hover={{ opacity: 0.65 }}
      >
        See our services
        <CornerDownRight size={12} strokeWidth={1.5} aria-hidden />
      </RouterLink>
    </GridCol>
  </Section>
);

export const LandingV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay dotted />

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
            Firms have spent decades making the numbers in their databases
            reliable, connecting their tools, and standardizing workflows. But
            much of what a firm actually knows{" "}
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
              Meeting conversations, the memos in a shared drive, the deal terms
              hidden in emails - never reaches a database.
            </chakra.p>
            <chakra.p>
              AI changes how work with data but it is only as good as the what
              you feed it. We believe the key to success is{" "}
              <Box as="strong" fontWeight={700}>
                the data layer.
              </Box>{" "}
              No firm&rsquo;s data looks exactly like another&rsquo;s -- which
              is why the systems that capture this corpus has to adapt
              organically and intelligently to how your firm changes - doing so
              requires agents and good engineering. Our vision is to focus on
              the care, judgment, and persistence required to govern your data,
              steward agentic systems, and how your organization uses it.
            </chakra.p>
            <chakra.p>--- Erik Ronning, Co-founder &amp; CEO</chakra.p>
          </Box>
        </GridCol>
      </Section>

      {/* --- Solution ------------------------------------------------------- */}
      {/* Light band, static: the foundation's layers. */}
      <FoundationSection />

      {/* --- About the FDE service ------------------------------------------- */}
      <FdeSection />

      {/* --- Use cases ------------------------------------------------------ */}
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
            Unlock agent driven workflows
          </Text>
        </GridCol>
        <GridCol span={16}>
          <UseCaseAccordion items={USE_CASES} />
        </GridCol>
      </Section>

      {/* --- How we perform -------------------------------------------------- */}
      {/* Hidden on phones. */}
      <Section
        grid
        rhythm="tight"
        bg="site.bg.surface"
        display={{ base: "none", md: "block" }}
      >
        <GridCol
          span={16}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="20px"
          pb="40px"
        >
          <Text
            as="h2"
            textStyle="h3"
            color="site.fg"
            maxW={{ base: "75vw", md: "360px" }}
          >
            How our system performs today
          </Text>
          <Text textStyle="label" color="soot.500" maxW="280px">
            *Comparison between workflows using our system vs traditional tool
            stack.
          </Text>
        </GridCol>
        {/* From tablet up the three cards fill the last 12 columns, leaving
          the first 4 empty. The list sits on the section's grid (subgrid),
          so its items still claim page columns. */}
        <GridCol
          as="ul"
          span={{ base: 16, md: 12 }}
          start={{ md: 5 }}
          display="grid"
          gridTemplateColumns="subgrid"
          rowGap="gridGutter"
        >
          {/* Two to a row on mobile, three across, 4 columns each, from tablet
          up. */}
          {METRICS.map((metric) => (
            <GridCol
              as="li"
              key={metric.index}
              span={{ base: 8, md: 4 }}
              pt={{ base: "24px", lg: 0 }}
            >
              <MetricCard
                {...metric}
                h={{ base: "200px", md: "280px", lg: "432px" }}
              />
            </GridCol>
          ))}
        </GridCol>
      </Section>

      {/* --- Testimonials ----------------------------------------------------- */}
      {/* On the page surface, like the metrics band above it. */}
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
            We are compliant with rigorous security standards
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
