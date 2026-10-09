import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import {
  GlyphBedHero,
  heroCharset,
} from "@/features/hero-lab/heroes/glyph-bed-hero";
import { SiteOutro } from "@/components/site/site-outro";
import { HeroDesignsButton } from "@/features/hero-lab/hero-designs-button";
import {
  MetricCard,
  TestimonialCard,
  type TestimonialWash,
  WASH_GREY,
} from "@/components/site/split-card";
import {
  UseCaseAccordion,
  type UseCase,
} from "@/components/site/use-case-accordion";
import {
  Box,
  type BoxProps,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ArrowUpFromDot } from "lucide-react";
import React from "react";

const ART = "/img/rebrand/";

const HERO_DESCRIPTION =
  "Rengo is the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm’s knowledge.";

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

/**
 * The metrics band is a soft light-grey gradient: #F2F2F2 at the top, easing
 * into the page surface at the bottom so it melts into the testimonials.
 */
const METRICS_WASH = `linear-gradient(180deg, ${WASH_GREY} 0%, var(--rengo-colors-site-bg-surface) 100%)`;

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
 * Labelled tick marks running down the left edge of the solution diagram, at a
 * % of the diagram's height.
 */
const DIAGRAM_ANNOTATIONS: [string, number][] = [
  ["Applications", 15.1],
  ["Agents", 42.6],
  ["Data ontology", 70.6],
];

// Source sizes (w, h in px) of the trimmed layer renders. Every layer renders
// at the same width; each overlaps the top 25% of the one beneath it.
const SOLUTION_LAYER_SIZES: [number, number][] = [
  [1297, 782],
  [1297, 782],
  [1297, 782],
];
const SOLUTION_LAYER_OVERLAP = 0.25;

// Layer heights and tops in units of the shared layer width.
const SOLUTION_LAYER_ASPECTS = SOLUTION_LAYER_SIZES.map(([w, h]) => h / w);
const SOLUTION_LAYER_TOPS = SOLUTION_LAYER_ASPECTS.reduce<number[]>(
  (tops, aspect, i) =>
    i === 0
      ? [0]
      : [
          ...tops,
          tops[i - 1] +
            SOLUTION_LAYER_ASPECTS[i - 1] -
            aspect * SOLUTION_LAYER_OVERLAP,
        ],
  [],
);
const SOLUTION_STACK_ASPECT =
  SOLUTION_LAYER_TOPS[SOLUTION_LAYER_TOPS.length - 1] +
  SOLUTION_LAYER_ASPECTS[SOLUTION_LAYER_ASPECTS.length - 1];

const SOLUTION_LAYERS = SOLUTION_LAYER_TOPS.map((top, i) => ({
  src: `solution-layer-${i + 1}.png`,
  top: `${(top / SOLUTION_STACK_ASPECT) * 100}%`,
  // Layer 1 sits in front, layer 3 at the back.
  zIndex: SOLUTION_LAYER_SIZES.length - i,
}));

// The diagram is scroll-driven: the copy pins while the diagram column
// scrolls up past it, and each layer rises into place as a function of
// progress (0 = the section has scrolled SOLUTION_START_PX past the viewport
// top, 1 = the copy is about to release). These are each layer's
// [start, end] progress.
const LAYER_SCROLL_WINDOWS: [number, number][] = [
  [0, 0.4],
  [0.3, 0.7],
  [0.6, 1],
];
const SOLUTION_START_PX = 0;
const LAYER_RISE_PX = 160;
const LABEL_RISE_PX = 40;
// Space above the diagram, so it starts low in the viewport when the copy pins
// and moves in from below while the copy holds.
const SOLUTION_SCROLL_ROOM = "70vh";
// The stack's base height fits the viewport below the nav (~52px) and above
// the section's bottom padding (80px), less 24px of breathing room top and
// bottom. SOLUTION_GRAPHIC_SCALE enlarges it from there; above 1 the stack is
// taller than the viewport and scrolls past the pinned copy.
const SOLUTION_GRAPHIC_SCALE = 1.62;
const SOLUTION_STACK_HEIGHT = `calc(${SOLUTION_GRAPHIC_SCALE} * (min(869px, 100vh - 140px) - 48px))`;
const SOLUTION_STAGE_HEIGHT = `calc(${SOLUTION_STACK_HEIGHT} + 48px)`;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;

/** Hidden until scroll drives it in; shown as-is for reduced motion. */
const scrollRevealProps = (rise: number) => ({
  opacity: 0,
  transform: `translateY(${rise}px)`,
  willChange: "opacity, transform",
  css: {
    "@media (prefers-reduced-motion: reduce)": {
      opacity: 1,
      transform: "none",
    },
  },
});

/** The three layer renders, absolutely placed in a stack-sized box. */
const SolutionLayers: React.FC<{
  /** Collects each layer for the scroll animation; omit for a static stack. */
  layerRefs?: React.MutableRefObject<(HTMLImageElement | null)[]>;
}> = ({ layerRefs }) =>
  SOLUTION_LAYERS.map(({ src, top, zIndex }, i) => (
    <Image
      key={src}
      ref={(node) => {
        if (layerRefs) layerRefs.current[i] = node;
      }}
      src={`${ART}${src}`}
      alt=""
      position="absolute"
      left={0}
      top={top}
      w="full"
      h="auto"
      maxW="none"
      zIndex={zIndex}
      {...(layerRefs && scrollRevealProps(LAYER_RISE_PX))}
    />
  ));

/** A label and its dotted rule, at a % of the diagram's height. */
const SolutionAnnotation: React.FC<{
  label: string;
  top: number;
  /** The rule always ends at the same x, so this sets the whole width. */
  left: BoxProps["left"];
  w: BoxProps["w"];
  labelRef?: React.Ref<HTMLDivElement>;
  reveal?: boolean;
}> = ({ label, top, left, w, labelRef, reveal = false }) => (
  <Box
    ref={labelRef}
    position="absolute"
    left={left}
    w={w}
    // Lifted 20px off its layer mark, so the bent tail points down onto it.
    top={`calc(${top}% - 20px)`}
    display="flex"
    alignItems="center"
    gap="8px"
    {...(reveal && scrollRevealProps(LABEL_RISE_PX))}
  >
    <Text textStyle="label" color="site.fg.onDarkSubtle" whiteSpace="nowrap">
      {label}
    </Text>
    <Box
      flex="1"
      position="relative"
      borderTopWidth="1px"
      borderTopStyle="dotted"
      borderTopColor="soot.600"
    >
      {/* The rule's tail: bends 30° downward off its right end, pointing
          into the layer below it. */}
      <Box
        position="absolute"
        left="100%"
        top="-1px"
        w="32px"
        borderTopWidth="1px"
        borderTopStyle="dotted"
        borderTopColor="soot.600"
        transform="rotate(30deg)"
        transformOrigin="0 0"
      />
    </Box>
  </Box>
);

/**
 * The diagram below `lg`: the finished stack, fully built and in normal flow.
 * Tablet narrows it and pushes it right so the annotations have room on its
 * left; mobile drops the annotations and gives the stack the full width.
 */
const StaticSolutionDiagram: React.FC = () => (
  <Box position="relative">
    <Box
      position="relative"
      mx={{ base: "auto", md: "0" }}
      ml={{ md: "auto" }}
      w={{ base: "90%", md: "63%" }}
      aspectRatio={1 / SOLUTION_STACK_ASPECT}
      isolation="isolate"
      aria-hidden
    >
      <SolutionLayers />
    </Box>
    <Box display={{ base: "none", md: "block" }}>
      {DIAGRAM_ANNOTATIONS.map(([label, top]) => (
        <SolutionAnnotation
          key={label}
          label={label}
          top={top}
          left="0"
          w="44%"
        />
      ))}
    </Box>
  </Box>
);

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

/** The layered solution graphic and its annotations, driven by scroll. */
const SolutionDiagram: React.FC<{
  /** The cell the pinned copy travels in; the build-up ends as it releases. */
  trackRef: React.RefObject<HTMLDivElement>;
}> = ({ trackRef }) => {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const layerRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const labelRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    // Reduced motion keeps the static, fully shown diagram from the CSS.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The copy releases when its cell's bottom reaches the viewport bottom.
      const track = trackRef.current;
      const section = track?.closest("section");
      if (!track || !section) return;
      const scrolled = -section.getBoundingClientRect().top;
      const untilRelease =
        track.getBoundingClientRect().bottom - window.innerHeight;
      const progress = clamp01(
        (scrolled - SOLUTION_START_PX) /
          (scrolled + untilRelease - SOLUTION_START_PX),
      );

      LAYER_SCROLL_WINDOWS.forEach(([start, end], i) => {
        const eased = easeOutCubic(clamp01((progress - start) / (end - start)));
        const apply = (node: HTMLElement | null, rise: number) => {
          if (!node) return;
          node.style.opacity = String(eased);
          node.style.transform = `translateY(${(1 - eased) * rise}px)`;
        };
        apply(layerRefs.current[i], LAYER_RISE_PX);
        apply(labelRefs.current[i], LABEL_RISE_PX);
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
  }, [trackRef]);

  return (
    // Once built, the stack pins: 76px down (below the nav) when it fits the
    // viewport, otherwise with its bottom 24px above the viewport bottom. It
    // holds until the end of its column, as the FDE copy comes up beside it.
    <Box
      ref={stageRef}
      position="sticky"
      top={`min(76px, calc(100vh - ${SOLUTION_STAGE_HEIGHT} - 24px))`}
      h={SOLUTION_STAGE_HEIGHT}
    >
      {/* The stack is sized to the stage's height, centred vertically and
          pushed to its right edge, so every layer shows in full. `isolation`
          keeps the layer z-indices below the annotations. */}
      <Box
        position="absolute"
        right={0}
        top="50%"
        h={SOLUTION_STACK_HEIGHT}
        aspectRatio={1 / SOLUTION_STACK_ASPECT}
        transform="translateY(-50%)"
        isolation="isolate"
        aria-hidden
      >
        <SolutionLayers layerRefs={layerRefs} />
      </Box>
      {DIAGRAM_ANNOTATIONS.map(([label, top], i) => (
        <SolutionAnnotation
          key={label}
          label={label}
          top={top}
          left="130px"
          w="256px"
          reveal
          labelRef={(node) => {
            labelRefs.current[i] = node;
          }}
        />
      ))}
    </Box>
  );
};

const SolutionCopy: React.FC = () => (
  <>
    <Text textStyle="h4" fontWeight={300} color="site.fg.onDark">
      To solve this, we build an agentic and unified data foundation.
    </Text>
    <Text textStyle="body.sm" fontWeight={300} color="site.fg.onDarkSubtle">
      We connect your source systems, structure them into permission-ed
      ontology, and build applications and agents for your work.
    </Text>
  </>
);

const FdeCopy: React.FC = () => (
  <>
    <Text textStyle="h4" fontWeight={300} color="site.fg.onDark" maxW="340px">
      We manage your data from
      <Box as="span" color="site.accent">
        {" "}
        strategy → deployment
      </Box>
    </Text>
    <Text
      textStyle="body.sm"
      fontWeight={300}
      color="site.fg.onDarkSubtle"
      maxW="330px"
    >
      We bring elite engineering and operate in a forward deployment model to
      tailor these systems to your firm&rsquo;s data, tool stack, and steward
      the deployment.
    </Text>
    {/* 24px on top of the column's 16px gap: 40px below the copy. */}
    <ArrowLink
      href="/solutions/applied-ai"
      mt="24px"
      color="site.fg.onDark"
      fontWeight={300}
      gap="12px"
    >
      Learn more
    </ArrowLink>
  </>
);

/** Shared by the copy columns: a left-aligned stack 16px apart. */
const copyColumnProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
} as const;

/**
 * The solution diagram and the FDE copy share one dark band. The solution copy
 * pins while the layered stack scrolls up and builds; the stack then pins
 * while the solution copy moves on, until the FDE copy has come up beside it.
 */
const ScrollingSolutionSection: React.FC = () => {
  const copyTrackRef = React.useRef<HTMLDivElement>(null);

  return (
    <Section
      grid
      rhythm="tight"
      bg="site.bg.dark"
      gridProps={{
        // Row 1 is the solution copy's pinned stretch; row 2 the FDE copy.
        gridTemplateRows: `calc(${SOLUTION_SCROLL_ROOM} + ${SOLUTION_STAGE_HEIGHT}) auto`,
      }}
    >
      <GridCol span={4} gridRow={1}>
        {/* Fills the row; the copy inside stays pinned at the viewport's
            centre while the diagram scrolls up and builds. */}
        <Box ref={copyTrackRef} h="full">
          <Box
            {...copyColumnProps}
            position="sticky"
            top={0}
            h="100vh"
            justifyContent="center"
          >
            <SolutionCopy />
          </Box>
        </Box>
      </GridCol>
      {/* Spans both rows, so the pinned stack holds through the FDE copy. */}
      <GridCol span={12} gridRow="1 / span 2" pt={SOLUTION_SCROLL_ROOM}>
        <SolutionDiagram trackRef={copyTrackRef} />
      </GridCol>
      <GridCol
        span={4}
        gridRow={2}
        {...copyColumnProps}
        pt="160px"
        // Extra room below keeps the stack pinned while the FDE copy rises
        // further up the viewport.
        pb="274px"
      >
        <FdeCopy />
      </GridCol>
    </Section>
  );
};

/**
 * Below `lg` there's no room for the copy and the stack side by side, so the
 * band simply stacks: solution copy, the built diagram, then the FDE copy.
 */
const StackedSolutionSection: React.FC = () => (
  <Section grid rhythm="tight" bg="site.bg.dark" gridProps={{ rowGap: "48px" }}>
    <GridCol span={{ base: 16, md: 10 }} {...copyColumnProps}>
      <SolutionCopy />
    </GridCol>
    <GridCol span={16}>
      <StaticSolutionDiagram />
    </GridCol>
    <GridCol span={{ base: 16, md: 10 }} {...copyColumnProps}>
      <FdeCopy />
    </GridCol>
  </Section>
);

const SolutionSection: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return isDesktop ? <ScrollingSolutionSection /> : <StackedSolutionSection />;
};

export const LandingV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    {/* --- Hero ---------------------------------------------------------- */}
    {/* The hero lab's 09 Glyph bed: the copy's own letters drift down and
        settle into the data layer under the CTA. */}
    <GlyphBedHero description={HERO_DESCRIPTION} underNav />

    {/* --- The problem & vision ------------------------------------------ */}
    {/* Held open to the design's 661px band; the copy only fills the top. */}
    <Section grid bg="site.bg.tintSubtle" minH={{ lg: "661px" }}>
      <GridCol span={{ base: 16, lg: 12 }}>
        <Text textStyle="h4" color="site.fg.strong" maxW="800px">
          Firms have spent decades making the numbers in their databases
          reliable, connecting their tools, and standardizing workflows. But
          much of what a firm actually knows{" "}
          <Box as="span" color="site.accent">
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

    {/* --- Solution + About the FDE service ------------------------------ */}
    <SolutionSection />

    {/* --- Use cases ------------------------------------------------------ */}
    <Section grid bg="site.bg.surface">
      <GridCol span={16} pb="60px">
        <Text
          textStyle="h3"
          color="site.fg.strong"
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
    <Section grid rhythm="tight" bg={WASH_GREY} bgImage={METRICS_WASH}>
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
          color="site.fg.strong"
          maxW={{ base: "160px", md: "360px" }}
        >
          How our system performs today
        </Text>
        <Text textStyle="label" color="soot.600" maxW="280px">
          *Comparison between workflows using our system vs traditional tool
          stack.
        </Text>
      </GridCol>
      {/* Deliberately empty: the cards start a quarter of the way in. */}
      <GridCol span={4} display={{ base: "none", lg: "block" }} />
      {/* Two by two on mobile, four across from tablet up. */}
      {METRICS.map((metric) => (
        <GridCol
          key={metric.index}
          span={{ base: 8, md: 4, lg: 3 }}
          pt={{ base: "24px", lg: 0 }}
        >
          <MetricCard
            {...metric}
            h={{ base: "240px", md: "320px", lg: "472px" }}
          />
        </GridCol>
      ))}
    </Section>

    {/* --- Testimonials ----------------------------------------------------- */}
    <Section grid bg="site.bg.raised">
      <GridCol span={16} pb="40px">
        <Box display="flex" flexDirection="column" gap="8px">
          <Text
            textStyle="h3"
            color="site.fg.strong"
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

    <SiteOutro charset={heroCharset(HERO_DESCRIPTION)} />

    <SiteFooter />

    <HeroDesignsButton />
  </Box>
);
