import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { ComplianceCard } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { MetricCard, TestimonialCard } from "@/components/site/split-card";
import {
  UseCaseAccordion,
  type UseCase,
} from "@/components/site/use-case-accordion";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const ART = "/img/rebrand/";

const USE_CASES: UseCase[] = [
  {
    audience: "Deal team",
    title: "Compare new deals without rebuilding context",
    body: 'Every new opportunity usually starts with associates pulling CIMs, past IC memos, and comps from scattered drives and inboxes, then rebuilding the same comparison spreadsheets by hand. A unified data foundation puts deal history, pipeline data, market comps, and portfolio performance in one governed store. The managed ontology ensures terms like "EBITDA," "sector," and "deal stage" mean the same thing across every source.',
    art: true,
  },
  {
    audience: "Investor relations",
    title: "LP updates draw on one current, verified set of numbers.",
  },
  {
    audience: "Finance",
    title: "Portfolio financials auto-ingested with accuracy",
  },
  {
    audience: "Knowledge operations",
    title: "Unlock collective intelligence",
  },
];

const METRICS = [
  {
    index: "1",
    value: "1 month",
    caption: "vs ~1 year for previous vendor to deliver X for an asset manager",
  },
  {
    index: "2",
    value: "1 month",
    caption: "of documents/models/files unified under one system",
  },
  { index: "3", value: "X", caption: "amount of portcos unified" },
  {
    index: "4",
    value: "26 % time saved",
    caption: "per LP reporting cycle",
    icon: <Image src={`${ART}arrow-up-from-dot.svg`} alt="" boxSize="20px" />,
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

const COMPLIANCE = [
  {
    title: "SOC2 Type II",
    description:
      "Security controls designed correctly and operating effectively.",
    badgeSrc: `${ART}soc2-badge.png`,
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

/** Labelled tick marks running down the left edge of the solution diagram. */
const DIAGRAM_ANNOTATIONS: [string, number][] = [
  ["Applications", 129],
  ["Your systems", 363],
  ["Agents", 596],
];

export const LandingV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    {/* --- Hero ---------------------------------------------------------- */}
    <Box
      as="section"
      position="relative"
      h="916px"
      bg="site.bg.surface"
      overflow="hidden"
    >
      <Section rhythm="none" position="relative" zIndex={1} pt="94px">
        <Grid>
          <GridCol
            span={16}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              textStyle="h3"
              letterSpacing="-0.04em"
              color="site.fg"
              textAlign="center"
            >
              Building your intelligent data layer
              <Box as="span" color="site.accent">
                _
              </Box>
            </Text>
            <Text
              textStyle="body.sm"
              color="site.fg"
              textAlign="center"
              w="465px"
              maxW="full"
              mt="19px"
            >
              Rengo is the embedded partner that builds the data intelligence
              layer for AI systems to learn and act from your firm&rsquo;s
              knowledge.
            </Text>
            <Box
              as="button"
              mt="19px"
              w="155px"
              h="32px"
              px="8px"
              borderRadius="2px"
              bg="site.bg.dark"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              transition="opacity 150ms ease"
              _hover={{ opacity: 0.88 }}
            >
              <ArrowLink
                color="site.fg.onDark"
                fontWeight={300}
                lineHeight="21px"
                gap="12px"
              >
                Get started
              </ArrowLink>
            </Box>
          </GridCol>
        </Grid>
      </Section>
    </Box>

    {/* --- The problem & vision ------------------------------------------ */}
    {/* Held open to the design's 661px band; the copy only fills the top. */}
    <Section grid bg="site.bg.tintSubtle" minH="661px">
      <GridCol span={12}>
        <Text textStyle="h5" color="site.fg.strong" maxW="785px">
          Firms have spent decades making the numbers in their databases
          reliable, connect their tools, and standardize workflows. But much of
          what a firm actually knows{" "}
          <Box as="span" color="site.accent">
            never reaches a database.
          </Box>
        </Text>
      </GridCol>
      <GridCol span={4}>
        <Text textStyle="body.sm" color="site.fg">
          Meeting conversations, the memos in a shared drive, the deal terms
          hidden in emails - never reaches a database.
          <br />
          <br />
          AI changes how work with data but it is only as good as the what you
          feed it. We believe the key to success is{" "}
          <Box as="span" fontWeight={700}>
            the data layer.
          </Box>{" "}
          No firm&rsquo;s data looks exactly like another&rsquo;s -- which is
          why the systems that capture this corpus has to adapt organically and
          intelligently to how your firm changes - doing so requires agents and
          good engineering. Our vision is to focus on the care, judgment, and
          persistence required to govern your data, steward agentic systems, and
          how your organization uses it.
          <br />
          <br />
          --- Erik Ronning, Co-founder &amp; CEO
        </Text>
      </GridCol>
    </Section>

    {/* --- Solution ------------------------------------------------------- */}
    <Section grid rhythm="tight" bg="site.bg.dark">
      <GridCol
        span={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        // Sits on the graphic's centre line rather than stretching to its
        // full height.
        alignSelf="center"
        gap="16px"
      >
        <Text textStyle="h4" fontWeight={300} color="site.fg.onDark">
          To solve this, we build an agent-ready, unified data foundation.
        </Text>
        <Text textStyle="body.sm" fontWeight={300} color="site.fg.onDarkSubtle">
          We connect your source systems, structure them into permission-ed
          ontology, and build applications and agents for your work.
        </Text>
      </GridCol>
      <GridCol span={10} position="relative" h="869px">
        {/* Multiplied onto the dark band, the light render recedes to a
            dark-on-dark line drawing. */}
        <Box
          position="absolute"
          left="186px"
          top={0}
          w="728px"
          h="full"
          overflow="hidden"
          mixBlendMode="multiply"
          aria-hidden
        >
          <Image
            src={`${ART}solution-graphic.png`}
            alt=""
            position="absolute"
            left="4%"
            top="-3.99%"
            w="full"
            h="103.97%"
            maxW="none"
          />
        </Box>
        {DIAGRAM_ANNOTATIONS.map(([label, top]) => (
          <Box
            key={label}
            position="absolute"
            left="130px"
            // Every rule ends at the same x, so a shorter label gets a
            // longer rule.
            w="256px"
            top={`${top}px`}
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <Text
              textStyle="caption"
              fontFamily="display"
              textTransform="capitalize"
              color="site.fg.onDark"
              whiteSpace="nowrap"
            >
              {label}
            </Text>
            <Box
              flex="1"
              borderTopWidth="1px"
              borderTopStyle="dotted"
              borderTopColor="site.border.dashedOnDark"
            />
          </Box>
        ))}
      </GridCol>
    </Section>

    {/* --- About the FDE service ------------------------------------------ */}
    <Section grid rhythm="tight" bg="site.bg.dark">
      <GridCol
        span={5}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
        pb="24px"
      >
        <Text
          textStyle="h4"
          fontWeight={300}
          color="site.fg.onDark"
          maxW="340px"
        >
          We manage your systems from
          <Box as="span" color="site.accent">
            {" "}
            strategy → execution
          </Box>
        </Text>
        <Text
          textStyle="body.sm"
          fontWeight={300}
          color="site.fg.onDarkSubtle"
          maxW="330px"
        >
          We bring elite engineering and operate in a forward deployment model
          to tailor these systems to your firm&rsquo;s data, tool stack, and
          steward the deployment.
        </Text>
      </GridCol>
      {/* Reserved for the FDE illustration. */}
      <GridCol span={16} h="374px" />
    </Section>

    {/* --- Use cases ------------------------------------------------------ */}
    <Section grid bg="site.bg.surface">
      <GridCol span={16} pb="40px">
        <Text textStyle="h3" color="site.fg.strong" maxW="360px">
          How your workflows could be agent-driven
        </Text>
      </GridCol>
      <GridCol span={16}>
        <UseCaseAccordion items={USE_CASES} />
      </GridCol>
    </Section>

    {/* --- How we perform -------------------------------------------------- */}
    <Section grid rhythm="tight" bg="site.bg.dark">
      <GridCol
        span={16}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="20px"
      >
        {/* Light rather than Regular — on the dark bands the heading sits at
            reversed contrast, where a Regular reads a step heavier than the
            same weight does on a light surface. */}
        <Text
          textStyle="h3"
          fontWeight={300}
          color="site.fg.onDark"
          maxW="321px"
        >
          How our system performs
        </Text>
        <Text
          textStyle="label"
          fontWeight={300}
          color="site.fg.onDarkSubtle"
          maxW="224px"
        >
          *Comparison between workflows using our system vs traditional tool
          stack.
        </Text>
      </GridCol>
      {/* Deliberately empty: the cards start a quarter of the way in. */}
      <GridCol span={4} />
      {METRICS.map((metric) => (
        <GridCol key={metric.index} span={3}>
          <MetricCard {...metric} />
        </GridCol>
      ))}
    </Section>

    {/* --- Testimonials ----------------------------------------------------- */}
    <Section grid bg="site.bg.tint">
      <GridCol span={16} pb="40px">
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="h3" color="site.fg.strong" maxW="296px">
            Our customers in their own words
          </Text>
          <Text textStyle="label" color="site.fg.subtle" maxW="224px">
            *Comparison between workflows using our system vs traditional tool
            stack.
          </Text>
        </Box>
      </GridCol>
      {/* Deliberately empty: the row of quotes starts a third of the way in. */}
      <GridCol span={4} />
      {TESTIMONIALS.map((testimonial) => (
        <GridCol key={testimonial.attribution + testimonial.quote} span={4}>
          <TestimonialCard {...testimonial} />
        </GridCol>
      ))}
    </Section>

    {/* --- Security --------------------------------------------------------- */}
    <Section bg="site.bg.dark">
      <Box pb="60px">
        <Text
          textStyle="h4"
          fontWeight={300}
          lineHeight="1"
          color="site.fg.onDark"
        >
          We are compliant with rigorous security standards
        </Text>
      </Box>
      <Grid h="240px">
        {COMPLIANCE.map((card) => (
          <GridCol key={card.title} span={4}>
            <ComplianceCard {...card} />
          </GridCol>
        ))}
      </Grid>
    </Section>

    {/* --- Logos ------------------------------------------------------------ */}
    <Section grid rhythm="compact" bg="site.bg.dark">
      <GridCol span={3} display="flex" alignItems="center">
        <Text textStyle="label" fontWeight={300} color="site.fg.onDarkFaint">
          Bring industry experience from
        </Text>
      </GridCol>
      <GridCol span={13} display="flex" alignItems="center">
        <Image
          src={`${ART}logos-strip.png`}
          alt="Logos of institutions the team has worked at"
          w="full"
          h="74px"
          objectFit="contain"
          mixBlendMode="plus-lighter"
          // The logos are white; at this opacity plus-lighter lands them on
          // roughly soot.500, the same grey as the label.
          opacity={0.32}
        />
      </GridCol>
    </Section>

    {/* --- Outro ------------------------------------------------------------ */}
    <Box
      as="section"
      position="relative"
      bg="site.bg.tint"
      overflow="hidden"
      aria-labelledby="outro-heading"
    >
      {/*
        In Figma this hangs off the grid column rather than the band, so its
        -50/-99 offsets are relative to the 40px/100px inset — which lands it
        just outside the left edge and flush with the top. It runs to the right
        edge at any width, never narrower than the design's 1443px; height
        follows the image's aspect ratio and the band clips the overflow.
      */}
      <Image
        src={`${ART}hero-mesh.png`}
        alt=""
        position="absolute"
        left="-10px"
        top="1px"
        w="calc(100% + 10px)"
        minW="1443px"
        h="auto"
        maxW="none"
        mixBlendMode="hard-light"
        pointerEvents="none"
        aria-hidden
      />
      <Section rhythm="none" position="relative" zIndex={1} py="188px">
        <Grid>
          <GridCol
            span={16}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="60px"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="20px"
              textAlign="center"
            >
              <Text
                id="outro-heading"
                textStyle="d1"
                color="site.fg.strong"
                maxW="496px"
              >
                Ready to make your data{" "}
                <Box as="span" color="site.accent">
                  your alpha?
                </Box>
              </Text>
              <Text textStyle="body.sm" color="site.fg" maxW="372px">
                Your workflows are complex. Managing the data behind them
                doesn&rsquo;t have to be. We are here to help.
              </Text>
            </Box>
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="206px"
              h="49px"
              px="12px"
              py="6px"
              borderRadius="4px"
              bg="site.bg.darkRaised"
              cursor="pointer"
              transition="opacity 150ms ease"
              _hover={{ opacity: 0.88 }}
            >
              <ArrowLink
                w="full"
                justifyContent="space-between"
                fontSize="1.25rem"
                fontWeight={300}
                lineHeight="21px"
                letterSpacing="0"
                color="canvas.50"
              >
                Get in touch
              </ArrowLink>
            </Box>
          </GridCol>
        </Grid>
      </Section>
    </Box>

    <SiteFooter />
  </Box>
);
