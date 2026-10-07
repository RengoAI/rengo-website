import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { ComplianceCardGroup } from "@/components/site/compliance-card";
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

/**
 * Labelled tick marks running down the left edge of the solution diagram, at a
 * % of the diagram's height.
 */
const DIAGRAM_ANNOTATIONS: [string, number][] = [
  ["Applications", 14.8],
  ["Agents", 41.8],
  ["Data ontology", 68.6],
];

// Source sizes (w, h in px) of the trimmed layer renders. Every layer renders
// at the same width; each overlaps the top 25% of the one beneath it.
const SOLUTION_LAYER_SIZES: [number, number][] = [
  [1008, 642],
  [1018, 629],
  [1059, 733],
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
const SOLUTION_GRAPHIC_SCALE = 1.5;
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
        {SOLUTION_LAYERS.map(({ src, top, zIndex }, i) => (
          <Image
            key={src}
            ref={(node) => {
              layerRefs.current[i] = node;
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
            {...scrollRevealProps(LAYER_RISE_PX)}
          />
        ))}
      </Box>
      {DIAGRAM_ANNOTATIONS.map(([label, top], i) => (
        <Box
          key={label}
          ref={(node: HTMLDivElement | null) => {
            labelRefs.current[i] = node;
          }}
          position="absolute"
          left="130px"
          // Every rule ends at the same x, so a shorter label gets a
          // longer rule.
          w="256px"
          top={`${top}%`}
          display="flex"
          alignItems="center"
          gap="8px"
          {...scrollRevealProps(LABEL_RISE_PX)}
        >
          <Text
            textStyle="caption"
            fontFamily="display"
            fontVariantCaps="all-small-caps"
            color="site.fg.onDarkSubtle"
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
    </Box>
  );
};

/**
 * The solution diagram and the FDE copy share one dark band. The solution copy
 * pins while the layered stack scrolls up and builds; the stack then pins
 * while the solution copy moves on, until the FDE copy has come up beside it.
 */
const SolutionSection: React.FC = () => {
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
            position="sticky"
            top={0}
            h="100vh"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            gap="16px"
          >
            <Text textStyle="h4" fontWeight={300} color="site.fg.onDark">
              To solve this, we build an agentic and unified data foundation.
            </Text>
            <Text
              textStyle="body.sm"
              fontWeight={300}
              color="site.fg.onDarkSubtle"
            >
              We connect your source systems, structure them into permission-ed
              ontology, and build applications and agents for your work.
            </Text>
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
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
        pt="160px"
        // Extra room below keeps the stack pinned while the FDE copy rises
        // further up the viewport.
        pb="274px"
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
            strategy → deployment
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
        {/* 24px on top of the column's 16px gap: 40px below the copy. */}
        <ArrowLink
          href="#"
          mt="24px"
          color="site.fg.onDark"
          fontWeight={300}
          gap="12px"
        >
          Learn more
        </ArrowLink>
      </GridCol>
    </Section>
  );
};

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

    {/* --- Solution + About the FDE service ------------------------------ */}
    <SolutionSection />

    {/* --- Use cases ------------------------------------------------------ */}
    <Section grid bg="site.bg.surface">
      <GridCol span={16} pb="40px">
        <Text textStyle="h3" color="site.fg.strong" maxW="320px">
          Agentic workflows that we unlock for you
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
          maxW="320px"
        >
          How our system performs today
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
          textStyle="h3"
          fontWeight={300}
          color="site.fg.onDark"
          maxW="375px"
        >
          We are compliant with rigorous security standards
        </Text>
      </Box>
      <ComplianceCardGroup items={COMPLIANCE} h="240px" />
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
