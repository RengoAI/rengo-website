import { Grid, GridCol } from "@/components/layout/grid";
import { GRID_COLUMNS, GRID_GUTTER } from "@/theme/tokens/layout";
import { Section } from "@/components/layout/section";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { NAV_H } from "@/features/hero-lab/hero-shared";
import { QuickSedimentHero } from "@/features/hero-lab/heroes/quick-sediment-hero";
import { SiteOutro } from "@/components/site/site-outro";
import { HeroDesignsButton } from "@/features/hero-lab/hero-designs-button";
import {
  MetricCard,
  TestimonialCard,
  type TestimonialWash,
} from "@/components/site/split-card";
import {
  UseCaseAccordion,
  type UseCase,
} from "@/components/site/use-case-accordion";
import { Box, chakra, Image, Text } from "@chakra-ui/react";
import { ArrowUpFromDot, CornerDownRight } from "lucide-react";
import React from "react";

const ART = "/img/rebrand/";

const HERO_DESCRIPTION =
  "We are the embedded partner that builds the data layer for AI systems to learn and act from your firm’s knowledge.";

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

/**
 * The logo strip, drifting slowly right to left on a loop. Two copies of the
 * strip sit end to end and the track slides by one copy's width, so the
 * second lands exactly where the first began. The ends fade out, so logos
 * ease in on the right and out on the left rather than being cut off.
 */
const LogoMarquee: React.FC = () => (
  <Box
    w="full"
    overflow="hidden"
    css={{
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
    // The blend sits here rather than on the images: the track's transform
    // would isolate them, and they'd blend against nothing and show their
    // black. The logos are white; at this opacity plus-lighter lands them on
    // roughly soot.500, the same grey as the label.
    mixBlendMode="plus-lighter"
    opacity={0.32}
  >
    <Box
      display="flex"
      w="max-content"
      animation="marquee 40s linear infinite"
      css={{
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    >
      {[0, 1].map((copy) => (
        <Image
          key={copy}
          src={`${ART}logos-strip.png`}
          alt={copy === 0 ? "Logos of institutions the team has worked at" : ""}
          aria-hidden={copy === 1 || undefined}
          h={{ base: "40px", lg: "74px" }}
          w="auto"
          maxW="none"
          flexShrink={0}
        />
      ))}
    </Box>
  </Box>
);

/** The four layers of the foundation, top to bottom. */
const FOUNDATION_LAYERS: { title: string; description: string }[] = [
  {
    title: "Applications",
    description:
      "We connect your source systems, structure them into permission-ed ontology, and build applications and agents for your work.",
  },
  {
    title: "Agents",
    description:
      "We connect your source systems, structure them into permission-ed ontology, and build applications and agents for your work.",
  },
  {
    title: "Data ontology",
    description:
      "We connect your source systems, structure them into permission-ed ontology, and build applications and agents for your work.",
  },
  {
    title: "Infrastructure",
    description:
      "Configuration for agents to run securely and performance. Database isolation, provisioned for agents and user requests to only reach what is necessary. Row-level security",
  },
];

/** A layer's name over its description. */
/** Columns a callout spans from lg, and how many its description fills. */
const FOUNDATION_COPY_SPAN = 5;
const FOUNDATION_DESCRIPTION_SPAN = 4;
/** From lg, how far a callout's divider runs: past its copy into the render. */
const FOUNDATION_DIVIDER_W = "654px";

/**
 * A layer's callout: name, description, and a dotted divider beneath that
 * runs out to the layer's render.
 */
const FoundationLayer: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Box display="flex" flexDirection="column" gap="16px" alignItems="flex-start">
    <Box display="flex" flexDirection="column" gap="8px" w="full">
      <Text
        textStyle="h6"
        fontSize="1.125rem" // 18px
        fontWeight={400}
        lineHeight="1.1"
        letterSpacing="-0.5px"
        color="site.fg"
      >
        {title}
      </Text>
      {/* Set like the rest of the page's body copy. */}
      <Text
        textStyle="body.sm"
        color="site.fg"
        // From lg the callout spans FOUNDATION_COPY_SPAN columns; the
        // description stops at FOUNDATION_DESCRIPTION_SPAN of them.
        maxW={{
          lg: `calc((100% - ${FOUNDATION_COPY_SPAN - 1} * ${GRID_GUTTER}) * ${
            FOUNDATION_DESCRIPTION_SPAN / FOUNDATION_COPY_SPAN
          } + ${FOUNDATION_DESCRIPTION_SPAN - 1} * ${GRID_GUTTER})`,
        }}
      >
        {description}
      </Text>
    </Box>
    <Box
      aria-hidden
      w={{ base: "full", lg: FOUNDATION_DIVIDER_W }}
      maxW={{ base: "full", lg: "none" }}
      borderTopWidth="1px"
      borderTopStyle="dotted"
      borderTopColor="site.border.dashed"
    />
  </Box>
);

// Source sizes (w, h in px) of the foundation layer renders, one per layer
// in FOUNDATION_LAYERS order. Every render shows at the same width.
const FOUNDATION_LAYER_SIZES: [number, number][] = [
  [1297, 782],
  [1297, 782],
  [1297, 872],
  [1297, 872],
];
/** Each render tucks this share of its height under the one above. */
const FOUNDATION_LAYER_OVERLAP = 0.3;
/** Widest a render gets; narrower when its column is. */
const FOUNDATION_LAYER_MAX_W = { base: "642px", lg: "826px" };
/** Columns the renders take from lg, out of GRID_COLUMNS. */
const FOUNDATION_RENDER_SPAN = 11;

/**
 * A render's width from lg, in terms of its row's width (a row's `100%`):
 * FOUNDATION_RENDER_SPAN columns and the gutters between them, capped at
 * the max. Lets a row work out its pull-up from its render's height.
 */
const FOUNDATION_RENDER_W = `min(${FOUNDATION_LAYER_MAX_W.lg}, (100% - ${
  GRID_COLUMNS - 1
} * ${GRID_GUTTER}) * ${FOUNDATION_RENDER_SPAN / GRID_COLUMNS} + ${
  FOUNDATION_RENDER_SPAN - 1
} * ${GRID_GUTTER})`;

/** px between the nav and the foundation heading while it's pinned. */
const FOUNDATION_HEADING_TOP = 60;

/**
 * The unified data foundation on a white band. Each layer is one row: its
 * copy on the left and its render on the right, flush to the right edge.
 * From lg each row pulls up by 30% of its render's height, so the planes
 * stack on one another, the top layer in front. The row is exactly as tall
 * as its render, so the copy, centred in the row, sits level with the
 * plane's centre.
 */
/** Share of the section the pinned heading has passed when it fades out. */
const FOUNDATION_HEADING_FADE_AT = 0.8;

/**
 * True once a point `pinTop` px down the viewport (where a heading pins) has
 * passed `at` of the way down the section enclosing `ref`, and false again
 * above it. For fading a pinned heading out as its section ends.
 */
const useFadeOutPast = (
  ref: React.RefObject<HTMLElement>,
  pinTop: number,
  at: number,
): boolean => {
  const [past, setPast] = React.useState(false);
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = ref.current?.closest("section");
      if (!section) return;
      const box = section.getBoundingClientRect();
      setPast((pinTop - box.top) / box.height > at);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, pinTop, at]);
  return past;
};

/**
 * Each layer row fades out as it rises: fully shown while its centre is
 * below the middle of the viewport, gone by the time it reaches the pinned
 * heading. Driven straight from scroll, so it eases back in on the way down.
 */
const FOUNDATION_ROW_FADE_END = NAV_H + FOUNDATION_HEADING_TOP;

/**
 * Fades the `[data-row-fade]` parts of each `[data-row]` inside `ref`'s
 * section by how far the row's centre has risen past the viewport's middle,
 * reaching 0 at `end` px from the top. Reduced motion leaves them shown.
 */
const useRowFade = (ref: React.RefObject<HTMLElement>, end: number) => {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = ref.current?.closest("section");
      if (!section) return;
      const mid = window.innerHeight / 2;
      section.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        const box = row.getBoundingClientRect();
        const centre = box.top + box.height / 2;
        const t = Math.min(Math.max((mid - centre) / (mid - end), 0), 1);
        // Smoothstep, so the fade starts and finishes gently.
        const opacity = String(1 - t * t * (3 - 2 * t));
        row
          .querySelectorAll<HTMLElement>("[data-row-fade]")
          .forEach((part) => (part.style.opacity = opacity));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, end]);
};

const SolutionSection: React.FC = () => {
  const headingRef = React.useRef<HTMLParagraphElement>(null);
  useRowFade(headingRef, FOUNDATION_ROW_FADE_END);
  const headingGone = useFadeOutPast(
    headingRef,
    NAV_H + FOUNDATION_HEADING_TOP,
    FOUNDATION_HEADING_FADE_AT,
  );
  return (
    <Section
      bg="site.bg.surface"
      // 20px less than the usual section rhythm above the heading.
      pt="calc(var(--site-gutter-y) - 20px)"
      borderTopRadius="4px"
      isolation="isolate"
      // Keeps the heading's strip from showing above the section before it
      // pins. `clip`, not `hidden`, so the heading still sticks.
      overflow="clip"
    >
      {/* The section's heading: top left, over both the renders and the
        copy. From lg it pins FOUNDATION_HEADING_TOP under the nav while
        the layers scroll up past it, and leaves with the section's bottom
        edge. */}
      <Grid
        pb={{ base: "48px", lg: "40px" }}
        position={{ lg: "sticky" }}
        top={{ lg: `${NAV_H + FOUNDATION_HEADING_TOP}px` }}
        zIndex={FOUNDATION_LAYERS.length + 1}
        pointerEvents="none"
        // Fades out, strip and all, once the section is mostly scrolled.
        opacity={headingGone ? 0 : 1}
        transition="opacity 300ms ease"
        css={{
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {/* A band-coloured strip, edge to edge, from the nav's bottom to just
          under the heading, so nothing shows behind the heading as it
          scrolls up beneath. Only the left half (the heading's side) is
          solid: it fades out by the middle, leaving the right half clear so
          the renders scroll up there without a hard-edged block. Before the
          heading pins, it sits in the section's own top padding, the same
          colour. */}
        <Box
          aria-hidden
          display={{ base: "none", lg: "block" }}
          position="absolute"
          top={`-${FOUNDATION_HEADING_TOP}px`}
          bottom="32px"
          left="calc(-1 * var(--site-gutter))"
          right="calc(-1 * var(--site-gutter))"
          bgImage="linear-gradient(to right, var(--rengo-colors-site-bg-surface) 0%, var(--rengo-colors-site-bg-surface) 35%, transparent 50%)"
        />
        <GridCol
          span={{ base: 16, md: 10, lg: 10 }}
          position="relative"
          pointerEvents={headingGone ? "none" : "auto"}
        >
          <Text
            ref={headingRef}
            textStyle="h5"
            fontWeight={400}
            lineHeight="1.1"
            letterSpacing="-0.5px"
            color="site.fg"
          >
            To solve this, we build a{" "}
            <Box as="span" color="site.highlight">
              unified data foundation
            </Box>{" "}
            on top of your existing systems
          </Text>
        </GridCol>
      </Grid>
      {FOUNDATION_LAYERS.map((layer, i) => {
        const [w, h] = FOUNDATION_LAYER_SIZES[i];
        return (
          <Grid
            key={layer.title}
            data-row
            rowGap="24px"
            pb={{ base: "64px", lg: 0 }}
            mt={
              i === 0
                ? undefined
                : {
                    lg: `calc(${FOUNDATION_RENDER_W} * ${
                      (-h / w) * FOUNDATION_LAYER_OVERLAP
                    })`,
                  }
            }
          >
            {/* Text first in the source, so it reads above the render when
              stacked; from lg it takes cols 1–5 and the render cols 6–16. */}
            <GridCol
              span={{ base: 16, md: 10, lg: FOUNDATION_COPY_SPAN }}
              start={{ lg: 1 }}
              gridRow={{ lg: 1 }}
              alignSelf="center"
              // From lg, sits 100px above the render's centre line.
              position="relative"
              top={{ lg: "-100px" }}
              // The row's parts fade on their own rather than the row as a
              // whole, which would flatten the renders' stacking order.
              data-row-fade
            >
              <FoundationLayer {...layer} />
            </GridCol>
            <GridCol
              span={{ base: 16, lg: FOUNDATION_RENDER_SPAN }}
              start={{ lg: GRID_COLUMNS - FOUNDATION_RENDER_SPAN + 1 }}
              gridRow={{ lg: 1 }}
            >
              <Image
                data-row-fade
                src={`${ART}foundation-layer-${i + 1}.png`}
                alt=""
                aria-hidden
                position="relative"
                // Nudged into the page's right padding, short of the
                // screen's edge.
                left={{ lg: "20px" }}
                zIndex={FOUNDATION_LAYERS.length - i}
                display="block"
                w="full"
                h="auto"
                maxW={FOUNDATION_LAYER_MAX_W}
                ml="auto"
                aspectRatio={w / h}
              />
            </GridCol>
          </Grid>
        );
      })}
    </Section>
  );
};

/**
 * About the FDE service: the promise and its gloss top left, a link to the
 * services top right. Held open to 538px, 60px short of the design's band.
 */
const FdeSection: React.FC = () => (
  <Section
    grid
    rhythm="tight"
    bg="site.bg.surface"
    borderBottomRadius="4px"
    minH={{ lg: "538px" }}
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
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
      >
        <Text
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
      <chakra.a
        href="/solutions"
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
      </chakra.a>
    </GridCol>
  </Section>
);

export const LandingV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay dotted />

    {/* --- Hero ---------------------------------------------------------- */}
    {/* Scattered dots are pulled into the data layer under the CTA, where
        each line rolls in its own gentle wave. */}
    <QuickSedimentHero description={HERO_DESCRIPTION} underNav />

    {/* --- The problem & vision ------------------------------------------ */}
    {/* Held open to 701px, 40px past the design's 661px band; the copy
        only fills the top. */}
    <Section grid bg="site.bg.tintSubtle" minH={{ lg: "701px" }}>
      <GridCol span={{ base: 16, lg: 12 }}>
        <Text textStyle="h5" color="site.fg.strong" maxW="800px">
          Firms have spent decades making the numbers in their databases
          reliable, connecting their tools, and standardizing workflows. But
          much of what a firm actually knows{" "}
          <Box as="span" color="site.highlight">
            never reaches a database.
          </Box>
        </Text>
      </GridCol>
      <GridCol span={{ base: 16, md: 10, lg: 4 }} pt={{ base: "16px", lg: 0 }}>
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
    {/* Light band, static: the foundation's layers. */}
    <SolutionSection />

    {/* --- About the FDE service ------------------------------------------- */}
    <FdeSection />

    {/* --- Use cases ------------------------------------------------------ */}
    <Section grid bg="site.bg.tintSubtle">
      <GridCol span={16} pb="60px">
        <Text
          textStyle="h3"
          color="site.fg"
          maxW={{ base: "160px", md: "280px" }}
        >
          Unlock agent driven workflows
        </Text>
      </GridCol>
      <GridCol span={16}>
        <UseCaseAccordion items={USE_CASES} />
      </GridCol>
    </Section>

    {/* --- How we perform -------------------------------------------------- */}
    <Section grid rhythm="tight" bg="site.bg.surface">
      <GridCol
        span={16}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="20px"
        pb="40px"
      >
        <Text
          textStyle="h3"
          color="site.fg"
          maxW={{ base: "160px", md: "360px" }}
        >
          How our system performs today
        </Text>
        <Text textStyle="label" color="soot.500" maxW="280px">
          *Comparison between workflows using our system vs traditional tool
          stack.
        </Text>
      </GridCol>
      {/* Deliberately empty, where the first card was: from tablet up the
          three cards fill the last 12 columns. */}
      <GridCol span={4} display={{ base: "none", md: "block" }} />
      {/* Two to a row on mobile, three across, 4 columns each, from tablet
          up. */}
      {METRICS.map((metric) => (
        <GridCol
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
    </Section>

    {/* --- Testimonials ----------------------------------------------------- */}
    {/* Canvas 350, a step lighter than canvas 400. */}
    <Section grid bg="canvas.350">
      <GridCol span={16} pb="40px">
        <Box display="flex" flexDirection="column" gap="8px">
          <Text
            textStyle="h3"
            color="site.fg"
            maxW={{ base: "160px", md: "296px" }}
          >
            Our customers in their own words
          </Text>
        </Box>
      </GridCol>
      {/* Deliberately empty: the row of quotes starts a third of the way in. */}
      <GridCol span={4} display={{ base: "none", lg: "block" }} />
      {/* Stacked below `lg`; three across doesn't fit until then. */}
      {TESTIMONIALS.map((testimonial, i) => (
        <GridCol
          key={testimonial.attribution + testimonial.quote}
          span={{ base: 16, md: 12, lg: 4 }}
          pb={{ base: "24px", lg: 0 }}
        >
          {/* Plain grey first, bluest last, so the row warms into the blue. */}
          <TestimonialCard {...testimonial} wash={TESTIMONIAL_WASH_ORDER[i]} />
        </GridCol>
      ))}
    </Section>

    {/* --- Security --------------------------------------------------------- */}
    <Section bg="site.bg.dark">
      <Box pb={{ base: "40px", lg: "60px" }}>
        <Text
          textStyle="h3"
          fontWeight={300}
          color="site.fg.onDark"
          maxW={{ base: "160px", md: "420px" }}
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

    <SiteFooter />

    <HeroDesignsButton />
  </Box>
);
