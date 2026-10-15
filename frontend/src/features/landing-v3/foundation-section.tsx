import { colSpanWidth, Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { NAV_H } from "@/components/site/site-constants";
import { colorVar, dottedTop } from "@/components/site/site-styles";
import { useScrollFrame } from "@/shared/hooks/use-scroll-frame";
import { prefersReducedMotion } from "@/shared/utils/motion";
import { GRID_COLUMNS } from "@/theme/tokens/layout";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const ART = "/img/rebrand/";

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
        as="h3"
        textStyle="h6"
        fontSize="1rem" // 16px, a step under h6
        fontWeight={400}
        lineHeight="1.1"
        letterSpacing="-0.5px"
        color="site.fg"
      >
        {title}
      </Text>
      {/* Set like the rest of the page's body copy. From lg the callout
          spans FOUNDATION_COPY_SPAN columns; the description stops at
          FOUNDATION_DESCRIPTION_SPAN of them. */}
      <Text
        textStyle="body.sm"
        color="site.fg"
        maxW={{
          lg: colSpanWidth(FOUNDATION_DESCRIPTION_SPAN, FOUNDATION_COPY_SPAN),
        }}
      >
        {description}
      </Text>
    </Box>
    <Box
      aria-hidden
      w={{ base: "full", lg: FOUNDATION_DIVIDER_W }}
      maxW={{ base: "full", lg: "none" }}
      {...dottedTop()}
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
const FOUNDATION_RENDER_W = `min(${FOUNDATION_LAYER_MAX_W.lg}, ${colSpanWidth(
  FOUNDATION_RENDER_SPAN,
)})`;

/** A render's width on phones, where it fills its row up to the max. */
const FOUNDATION_RENDER_W_PHONE = `min(${FOUNDATION_LAYER_MAX_W.base}, 100%)`;

/** px between the nav and the foundation heading while it's pinned. */
const FOUNDATION_HEADING_TOP = 60;

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
  useScrollFrame(
    React.useCallback(() => {
      const section = ref.current?.closest("section");
      if (!section) return;
      const box = section.getBoundingClientRect();
      setPast((pinTop - box.top) / box.height > at);
    }, [ref, pinTop, at]),
  );
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
  const [reduced] = React.useState(prefersReducedMotion);
  const update = React.useCallback(() => {
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
  }, [ref, end]);
  useScrollFrame(reduced ? null : update);
};

/**
 * The unified data foundation on a white band. Each layer is one row: its
 * copy on the left and its render on the right, flush to the right edge.
 * From lg each row pulls up by 30% of its render's height, so the planes
 * stack on one another, the top layer in front. The row is exactly as tall
 * as its render, so the copy, centred in the row, sits level with the
 * plane's centre.
 */
export const FoundationSection: React.FC = () => {
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  useRowFade(headingRef, FOUNDATION_ROW_FADE_END);
  const headingGone = useFadeOutPast(
    headingRef,
    NAV_H + FOUNDATION_HEADING_TOP,
    FOUNDATION_HEADING_FADE_AT,
  );
  return (
    <Section
      bg="site.bg.surface"
      // 20px less than the usual section rhythm above the heading, and 40px
      // less below the last layer.
      pt="calc(var(--site-gutter-y) - 20px)"
      pb="calc(var(--site-gutter-y) - 40px)"
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
        _motionReduce={{ transition: "none" }}
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
          bgImage={`linear-gradient(to right, ${colorVar("site.bg.surface")} 0%, ${colorVar("site.bg.surface")} 35%, transparent 50%)`}
        />
        <GridCol
          span={{ base: 16, md: 10, lg: 10 }}
          position="relative"
          pointerEvents={headingGone ? "none" : "auto"}
        >
          <Text
            ref={headingRef}
            as="h2"
            textStyle="h5"
            fontWeight={400}
            lineHeight="1.1"
            letterSpacing="-0.5px"
            color="site.fg"
          >
            To solve this, we bring together data{" "}
            {/* The measure fits the whole sentence on one line except the
                last phrase. Break before "from" so the second line carries
                the rest. */}
            <Box as="span" display={{ base: "inline", lg: "block" }}>
              from across your existing systems into a{" "}
              <Box as="span" color="site.highlight">
                unified data foundation
              </Box>
            </Box>
          </Text>
        </GridCol>
      </Grid>
      <Box as="ul">
        {FOUNDATION_LAYERS.map((layer, i) => {
          const [w, h] = FOUNDATION_LAYER_SIZES[i];
          return (
            <Grid
              as="li"
              key={layer.title}
              data-row
              rowGap="24px"
              // Tablet stacks each layer's copy over its render; phones show
              // the renders alone, each tucked under the one above like on
              // desktop.
              pb={{ base: 0, md: "64px", lg: 0 }}
              mt={
                i === 0
                  ? undefined
                  : {
                      base: `calc(${FOUNDATION_RENDER_W_PHONE} * ${
                        (-h / w) * FOUNDATION_LAYER_OVERLAP
                      })`,
                      md: 0,
                      lg: `calc(${FOUNDATION_RENDER_W} * ${
                        (-h / w) * FOUNDATION_LAYER_OVERLAP
                      })`,
                    }
              }
            >
              {/* Text first in the source, so it reads above the render when
              stacked; from lg it takes cols 1–5 and the render cols 6–16. */}
              <GridCol
                // Hidden on phones.
                display={{ base: "none", md: "block" }}
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
      </Box>
    </Section>
  );
};
