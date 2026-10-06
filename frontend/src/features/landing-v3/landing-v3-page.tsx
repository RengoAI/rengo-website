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

/** The design frame. Decorative art is positioned against this width. */
const FRAME = "1424px";

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
  ["Applications", 148],
  ["Your systems", 382],
  ["Agents", 615],
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
      {/*
        Decorative mesh, three overlapping crops of the same render. Pinned to
        a centred frame of the design width so the composition holds; it is
        atmosphere, so it is allowed to crop on narrower viewports.
      */}
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        w={FRAME}
        h="full"
        pointerEvents="none"
        aria-hidden
      >
        <Box
          position="absolute"
          left="123px"
          top="286px"
          w="1190px"
          h="626px"
          overflow="hidden"
          mixBlendMode="luminosity"
        >
          <Image src={`${ART}hero-mesh.png`} alt="" w="100%" h="108.45%" />
        </Box>
        {/*
          The two side crops are rotated a quarter turn. The rotation has to
          sit on an inner box whose width and height are swapped relative to
          the slot it fills — rotating the slot itself would swap its bounding
          box and throw the position off.
        */}
        <Box
          position="absolute"
          left="911px"
          top="470px"
          w="463px"
          h="363px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mixBlendMode="luminosity"
        >
          <Box
            position="relative"
            flex="none"
            w="363px"
            h="463px"
            overflow="hidden"
            transform="rotate(90deg)"
          >
            <Image
              src={`${ART}hero-mesh.png`}
              alt=""
              position="absolute"
              top={0}
              left="-167.85%"
              w="308.01%"
              h="100%"
              maxW="none"
            />
          </Box>
        </Box>
        <Box
          position="absolute"
          left="49px"
          top="485px"
          w="367px"
          h="281px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mixBlendMode="darken"
        >
          <Box
            position="relative"
            flex="none"
            w="281px"
            h="367px"
            overflow="hidden"
            transform="rotate(90deg)"
          >
            <Image
              src={`${ART}hero-mesh.png`}
              alt=""
              position="absolute"
              top={0}
              left="-196.53%"
              w="360.62%"
              h="134.33%"
              maxW="none"
            />
          </Box>
        </Box>
      </Box>

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
              textStyle="body.md"
              fontWeight={300}
              lineHeight="1.2"
              color="site.fg.muted"
              textAlign="center"
              w="465px"
              maxW="full"
              mt="19px"
            >
              We&rsquo;re the embedded partner that builds the data intelligence
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
    {/* pb runs 40px past the standard rhythm to open up the gap before the
        solution section. Overrides Section's py, which `rest` spreads after. */}
    <Section grid bg="site.bg.surface" pb="140px">
      <GridCol
        span={12}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="40px"
      >
        <Text textStyle="h5" color="site.fg.strong" maxW="785px">
          Firms have spent decades making the numbers in their databases
          reliable. But much of what a firm actually knows{" "}
          <Box as="span" color="site.accent">
            never reaches a database.
          </Box>
        </Text>
      </GridCol>
      <GridCol span={4} display="flex" alignItems="flex-start">
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
    <Section grid rhythm="tight" bg="site.bg.surface">
      <GridCol
        span={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        // Sits on the graphic's centre line rather than stretching to its
        // 1040px height.
        alignSelf="center"
        gap="20px"
      >
        <Text textStyle="h5" color="site.fg.strong" w="full">
          To solve this, we build an agent-ready, unified data foundation.
        </Text>
        <Text textStyle="body.sm" lineHeight="1.25" color="site.fg.strong">
          We connect your source systems, structure them into permission-ed
          ontology, and build applications and agents for your work.
        </Text>
        <ArrowLink href="#" fontFamily="body" color="site.fg.strong" gap="12px">
          Read more
        </ArrowLink>
      </GridCol>
      {/* Starts at 7, leaving columns 5–6 empty between the copy and the
          graphic. */}
      <GridCol span={10} start={7} position="relative" h="1040px">
        <Box position="absolute" inset={0} mixBlendMode="multiply" aria-hidden>
          <Image
            src={`${ART}solution-graphic.png`}
            alt=""
            position="absolute"
            left="42.5px"
            top={0}
            w="871px"
            h="1040px"
            maxW="none"
            mixBlendMode="luminosity"
          />
        </Box>
        {DIAGRAM_ANNOTATIONS.map(([label, top]) => (
          <Box key={label} position="absolute" left="45.5px" top={`${top}px`}>
            <Text
              textStyle="caption"
              textTransform="capitalize"
              color="site.accent"
              whiteSpace="nowrap"
            >
              {label}
            </Text>
            <Image src={`${ART}rule.svg`} alt="" w="185px" mt="9px" />
          </Box>
        ))}
      </GridCol>
    </Section>

    {/* --- About the FDE service ------------------------------------------ */}
    <Section grid bg="site.bg.surface">
      <GridCol
        span={16}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        gap="40px"
        pb="24px"
      >
        <Text textStyle="h5" color="site.fg.strong">
          And manage your systems from
          <Box as="span" color="site.accent">
            {" "}
            strategy → execution
          </Box>
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="20px"
          w="357px"
          flexShrink={0}
        >
          <Text textStyle="body.sm" lineHeight="1.25" color="site.fg.strong">
            We bring elite engineering and operate in a forward deployment model
            to tailor these systems to your firm&rsquo;s data, tool stack, and
            steward the deployment.
          </Text>
          <ArrowLink
            href="#"
            fontFamily="body"
            color="site.fg.strong"
            gap="12px"
          >
            Our Applied AI
          </ArrowLink>
        </Box>
      </GridCol>
      <GridCol span={16}>
        <Box h="374px" bg="site.bg.tint" />
      </GridCol>
    </Section>

    {/* --- Use cases ------------------------------------------------------ */}
    <Section grid bg="site.bg.surface">
      <GridCol span={16} pb="40px">
        <Text textStyle="h3" color="site.fg.strong" maxW="325px">
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
        span={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignSelf="stretch"
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
        <Text textStyle="label" color="site.fg.onDarkSubtle" maxW="224px">
          *Comparison between workflows using our system vs traditional tool
          stack.
        </Text>
      </GridCol>
      {METRICS.map((metric) => (
        <GridCol key={metric.index} span={3}>
          <MetricCard {...metric} />
        </GridCol>
      ))}
    </Section>

    {/* --- Testimonials ----------------------------------------------------- */}
    <Section grid bg="site.bg.tint">
      <GridCol span={16} pb="40px">
        <Text textStyle="h3" color="site.fg.strong" maxW="296px">
          Our customers in their own words
        </Text>
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
          maxW="389px"
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
        <Text textStyle="label" fontWeight={300} color="site.fg.onDarkMuted">
          Bringing industry experience from major institutions
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
        just outside the left edge and flush with the top.
      */}
      <Image
        src={`${ART}hero-mesh.png`}
        alt=""
        position="absolute"
        left="-10px"
        top="1px"
        w="1443px"
        h="702px"
        maxW="none"
        objectFit="cover"
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
                textStyle="h1"
                color="site.fg.strong"
                maxW="496px"
              >
                Ready to make your data{" "}
                <Box as="span" color="site.accent">
                  your alpha?
                </Box>
              </Text>
              <Text textStyle="body.sm" lineHeight="1.1" color="site.fg.muted">
                some outro bye text
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
