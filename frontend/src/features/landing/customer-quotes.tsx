import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
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
    // Quiet: a faint round outline with a slate arrow, darkening to navy on
    // hover.
    w="40px"
    h="40px"
    display="grid"
    placeItems="center"
    borderRadius="full"
    border="1px solid"
    borderColor="overview.rule"
    color="overview.slate"
    bg="transparent"
    cursor="pointer"
    transition="color 200ms ease, border-color 200ms ease, opacity 200ms ease"
    _hover={{ color: "overview.navy", borderColor: "overview.navy" }}
    _disabled={{
      opacity: 0.3,
      cursor: "default",
      _hover: { color: "overview.slate", borderColor: "overview.rule" },
    }}
    _focusVisible={{
      outline: "2px solid",
      outlineColor: "site.highlight",
      outlineOffset: "2px",
    }}
  >
    {dir === "prev" ? (
      <ArrowLeft size={16} strokeWidth={1.5} />
    ) : (
      <ArrowRight size={16} strokeWidth={1.5} />
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
 * Customer stories, one quote at a time (after Amperos and the Business Overview's pull
 * quotes): a single quote large in the serif across most of the width, who
 * said it under it, and a quiet counter ("1 / 3") with arrows to step
 * through.
 */
const QuoteFeature: React.FC = () => {
  const [i, setI] = React.useState(0);
  const q = QUOTES[i];
  const n = QUOTES.length;
  return (
    <Section
      // The Business Overview's panel tint, at the big moments' height:
      // the heading at the top like the other sections', the quote in the
      // room below it.
      bg="overview.tint"
      minH={FEATURE_BAND_MIN_H}
      display="flex"
      flexDirection="column"
    >
      <Box pb={{ base: "40px", lg: "64px" }}>
        <Heading />
      </Box>
      <Box
        as="figure"
        // Centred in the room under the heading.
        my="auto"
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
              {i + 1} / {n}
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

/** Customer stories. Built to take more quotes: add them to QUOTES. */
export const CustomerQuotes = QuoteFeature;
