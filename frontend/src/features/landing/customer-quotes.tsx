import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
import { Box, chakra, Text } from "@chakra-ui/react";
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

/**
 * The quote controls, after Amperos: thin progress lines, the current one
 * longer and in navy; click one (or tab to it) to jump to that quote.
 */
const QuoteControls: React.FC<{
  i: number;
  n: number;
  go: (k: number) => void;
}> = ({ i, n, go }) => (
  <Box display="flex" alignItems="center" gap="20px">
    <Box as="ol" display="flex" alignItems="center" gap="2px">
      {Array.from({ length: n }, (_, k) => (
        <li key={k}>
          <chakra.button
            type="button"
            aria-label={`Quote ${k + 1} of ${n}`}
            aria-current={k === i || undefined}
            onClick={() => go(k)}
            className="group"
            display="block"
            // A generous target round a thin line.
            px="4px"
            py="14px"
            cursor="pointer"
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "site.highlight",
              outlineOffset: "2px",
              borderRadius: "2px",
            }}
          >
            <Box
              h="2px"
              w={k === i ? "32px" : "16px"}
              borderRadius="full"
              bg={k === i ? "overview.navy" : "overview.rule"}
              transition="width 300ms ease, background-color 300ms ease"
              _groupHover={{ bg: "overview.navy" }}
              _motionReduce={{ transition: "none" }}
            />
          </chakra.button>
        </li>
      ))}
    </Box>
  </Box>
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
  >
    Our customers in their own words
  </Text>
);

/**
 * Customer stories, one quote at a time (after Amperos and the Business Overview's pull
 * quotes): a single quote large in the serif across most of the width, who
 * said it under it, and quiet controls (progress lines and chevrons) to
 * step through.
 */
/** ms each quote shows before the next, while it advances on its own. */
const QUOTE_ADVANCE = 8000;

const QuoteFeature: React.FC = () => {
  const [i, setI] = React.useState(0);
  const q = QUOTES[i];
  const n = QUOTES.length;
  // Advances on its own, looping, until someone picks a quote; paused
  // while the pointer is over the section or focus is in it, and never
  // with reduced motion.
  const reduced = usePrefersReducedMotion();
  const [picked, setPicked] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (picked || paused || reduced || n < 2) return;
    const id = window.setTimeout(() => setI((k) => (k + 1) % n), QUOTE_ADVANCE);
    return () => window.clearTimeout(id);
  }, [i, picked, paused, reduced, n]);
  const go = (k: number) => {
    setPicked(true);
    setI(k);
  };
  return (
    <Section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      // The Business Overview's panel tint, at the big moments' height:
      // the heading at the top like the other sections', who said it and
      // the controls at the foot, the quote centred between them.
      bg="overview.tint"
      minH={FEATURE_BAND_MIN_H}
      display="flex"
      flexDirection="column"
    >
      <Box pb={{ base: "40px", lg: "64px" }}>
        <Heading />
      </Box>
      {/* The quote, the focus, centred in the room between the heading and
        the foot. */}
      <Box as="figure" my="auto" maxW="1000px" aria-live="polite">
        <Text
          as="blockquote"
          key={i}
          textStyle="d3"
          fontSize={{ base: "1.625rem", md: "2.125rem", lg: "2.5rem" }}
          lineHeight="1.2"
          color="overview.navy"
          animation="fade-in 400ms ease"
          _motionReduce={{ animation: "none" }}
        >
          {q.quote}
        </Text>
      </Box>
      {/* The foot, as far from the bottom as the heading is from the top:
        who said it on the left, the count and arrows on the right. */}
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="24px"
        pt={{ base: "40px", lg: "64px" }}
      >
        <Attribution q={q} />
        <QuoteControls i={i} n={n} go={go} />
      </Box>
    </Section>
  );
};

/** Customer stories. Built to take more quotes: add them to QUOTES. */
export const CustomerQuotes = QuoteFeature;
