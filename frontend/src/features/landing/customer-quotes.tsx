import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
import { Box, chakra, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

/**
 * The customers' words, split for the cards: the fund's size and kind lead,
 * set large, then the quote, then who said it. The words are the original
 * testimonials', unchanged.
 */
const QUOTES = [
  {
    size: "$3.5B",
    firm: "mid-market PE firm",
    quote:
      "“Everyone has been asking for a single source of truth. Rengo brings it all together, and we're excited to roll it out across the firm.”",
    role: "Investment Associate",
  },
  {
    size: "$20B+",
    firm: "real estate fund",
    quote:
      "“It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly.”",
    role: "VP of Data & AI Strategy",
  },
  {
    size: "$1B",
    firm: "growth equity fund",
    quote:
      "“Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we've evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we're genuinely excited about.”",
    role: "Senior Associate",
  },
];

/** The carousel's previous / next button. */
const Arrow: React.FC<{
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}> = ({ dir, disabled, onClick }) => (
  <chakra.button
    type="button"
    aria-label={dir === "prev" ? "Previous quote" : "Next quote"}
    onClick={onClick}
    disabled={disabled}
    // Round, in the Business Overview's navy: an outline at rest, filled on
    // hover.
    w="48px"
    h="48px"
    display="grid"
    placeItems="center"
    borderRadius="full"
    border="1px solid"
    borderColor="overview.rule"
    color="overview.navy"
    bg="site.bg.raised"
    cursor="pointer"
    transition="background-color 200ms ease, color 200ms ease, border-color 200ms ease, opacity 200ms ease"
    _hover={{
      bg: "overview.navy",
      color: "white",
      borderColor: "overview.navy",
    }}
    _disabled={{
      opacity: 0.35,
      cursor: "default",
      _hover: {
        bg: "site.bg.raised",
        color: "overview.navy",
        borderColor: "overview.rule",
      },
    }}
    _focusVisible={{
      outline: "2px solid",
      outlineColor: "site.highlight",
      outlineOffset: "2px",
    }}
  >
    {dir === "prev" ? (
      <ArrowLeft size={18} strokeWidth={1.5} />
    ) : (
      <ArrowRight size={18} strokeWidth={1.5} />
    )}
  </chakra.button>
);

/** Who said it: the role, then the fund, quietly. */
const Attribution: React.FC<{ q: (typeof QUOTES)[number] }> = ({ q }) => (
  <Box>
    <Text textStyle="body.sm" color="overview.navy" fontWeight={500}>
      {q.role}
    </Text>
    <Text textStyle="body.sm" color="overview.slate">
      {q.size} {q.firm}
    </Text>
  </Box>
);

/** The section's heading, as the other sections' headings. */
const Heading: React.FC = () => (
  <Text
    as="h2"
    textStyle="h4"
    fontWeight={400}
    lineHeight="1.1"
    color="site.fg.heading"
    maxW={{ base: "75vw", md: "296px" }}
  >
    Our customers in their own words
  </Text>
);

/**
 * A, editorial cards (after Jack & Jill): the carousel, each card a
 * borderless panel in the Business Overview's tint with the quote large in
 * the serif and who said it quietly at the foot.
 */
const QuoteCards: React.FC = () => {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();
  const [edges, setEdges] = React.useState({ start: true, end: false });

  // Which ends the track is at, to disable the arrows there.
  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);
  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // One card's width (plus the gap) per click.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({
      left: dir * (card.getBoundingClientRect().width + 16),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <Section bg="site.bg.surface" py="96px" overflow="hidden">
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="24px"
        pb="40px"
      >
        <Heading />
        <Box display="flex" gap="8px" flexShrink={0}>
          <Arrow dir="prev" disabled={edges.start} onClick={() => step(-1)} />
          <Arrow dir="next" disabled={edges.end} onClick={() => step(1)} />
        </Box>
      </Box>
      <Box
        as="ul"
        ref={trackRef}
        onScroll={measure}
        aria-label="Customer quotes"
        tabIndex={0}
        display="flex"
        gap="16px"
        overflowX="auto"
        // Runs out past the gutter on the right, so the next card shows it
        // continues.
        mr="calc(-1 * var(--site-gutter, 40px))"
        pr="var(--site-gutter, 40px)"
        css={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "site.highlight",
          outlineOffset: "4px",
        }}
      >
        {QUOTES.map((q) => (
          <Box
            as="li"
            key={q.role + q.size}
            flex={{
              base: "0 0 85%",
              md: "0 0 60%",
              lg: "0 0 calc((100% - 32px) / 2.4)",
            }}
            css={{ scrollSnapAlign: "start" }}
            bg="overview.tint"
            borderRadius="4px"
            p={{ base: "28px", md: "40px" }}
            minH={{ md: "400px" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="40px"
          >
            <Text
              as="blockquote"
              textStyle="d4"
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              lineHeight="1.3"
              color="site.fg.strong"
            >
              {q.quote}
            </Text>
            <Attribution q={q} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

/**
 * B, one quote at a time (after Amperos and the Business Overview's pull
 * quotes): a single quote large in the serif across most of the width, who
 * said it under it, and a quiet counter with arrows to step through.
 */
const QuoteFeature: React.FC = () => {
  const [i, setI] = React.useState(0);
  const q = QUOTES[i];
  const n = QUOTES.length;
  const pad = (k: number) => String(k).padStart(2, "0");
  return (
    <Section
      // The Business Overview's panel tint, at the big moments' height,
      // the quote centred in it.
      bg="overview.tint"
      minH={FEATURE_BAND_MIN_H}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box pb={{ base: "40px", lg: "64px" }}>
        <Heading />
      </Box>
      <Box
        as="figure"
        maxW="1000px"
        display="flex"
        flexDirection="column"
        gap="40px"
        aria-live="polite"
      >
        <Text
          as="blockquote"
          key={i}
          textStyle="d3"
          fontSize={{ base: "1.625rem", md: "2.125rem", lg: "2.5rem" }}
          lineHeight="1.2"
          color="overview.navy"
          minH={{ lg: "4.8em" }}
          animation="fade-in 400ms ease"
          _motionReduce={{ animation: "none" }}
        >
          {q.quote}
        </Text>
        <Box
          as="figcaption"
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          gap="24px"
        >
          <Attribution q={q} />
          <Box display="flex" alignItems="center" gap="16px">
            <Text
              textStyle="label"
              color="overview.slate"
              fontVariantNumeric="tabular-nums"
              mr="4px"
            >
              {pad(i + 1)} / {pad(n)}
            </Text>
            <Arrow
              dir="prev"
              disabled={i === 0}
              onClick={() => setI((k) => k - 1)}
            />
            <Arrow
              dir="next"
              disabled={i === n - 1}
              onClick={() => setI((k) => k + 1)}
            />
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

/**
 * Customer stories, built to take more quotes: add them to QUOTES. Two
 * takes to choose between; keep one.
 */
export const CustomerQuotes: React.FC<{ variant: "cards" | "feature" }> = ({
  variant,
}) => (variant === "cards" ? <QuoteCards /> : <QuoteFeature />);
