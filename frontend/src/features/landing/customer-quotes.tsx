import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { Box, chakra, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
 * The quote controls, after Amperos, Rox and Jack & Jill: thin progress
 * lines (the current one longer, in navy; click one to jump to it), then
 * the previous / next chevrons together in one slim pill.
 */
const QuoteControls: React.FC<{
  i: number;
  n: number;
  go: (k: number) => void;
}> = ({ i, n, go }) => (
  <Box display="flex" alignItems="center" gap="20px">
    <Box as="ol" display="flex" alignItems="center" gap="6px">
      {Array.from({ length: n }, (_, k) => (
        <li key={k}>
          <chakra.button
            type="button"
            aria-label={`Quote ${k + 1} of ${n}`}
            aria-current={k === i || undefined}
            onClick={() => go(k)}
            display="block"
            py="10px"
            cursor="pointer"
          >
            <Box
              h="2px"
              w={k === i ? "28px" : "14px"}
              borderRadius="full"
              bg={k === i ? "overview.navy" : "overview.rule"}
              transition="width 300ms ease, background-color 300ms ease"
              _motionReduce={{ transition: "none" }}
            />
          </chakra.button>
        </li>
      ))}
    </Box>
    <Box
      display="flex"
      alignItems="center"
      h="36px"
      borderRadius="full"
      border="1px solid"
      borderColor="overview.rule"
      overflow="hidden"
    >
      {(["prev", "next"] as const).map((dir) => {
        const disabled = dir === "prev" ? i === 0 : i === n - 1;
        return (
          <chakra.button
            key={dir}
            type="button"
            aria-label={dir === "prev" ? "Previous quote" : "Next quote"}
            onClick={() => go(dir === "prev" ? i - 1 : i + 1)}
            disabled={disabled}
            w="44px"
            h="full"
            display="grid"
            placeItems="center"
            color="overview.slate"
            // A hairline between the two.
            borderLeft={dir === "next" ? "1px solid" : undefined}
            borderColor="overview.rule"
            cursor="pointer"
            transition="color 200ms ease, background-color 200ms ease"
            _hover={{ color: "overview.navy", bg: "overview.tint2" }}
            _disabled={{
              opacity: 0.3,
              cursor: "default",
              _hover: { color: "overview.slate", bg: "transparent" },
            }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "site.highlight",
              outlineOffset: "-2px",
            }}
          >
            {dir === "prev" ? (
              <ChevronLeft size={16} strokeWidth={1.5} />
            ) : (
              <ChevronRight size={16} strokeWidth={1.5} />
            )}
          </chakra.button>
        );
      })}
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
const QuoteFeature: React.FC = () => {
  const [i, setI] = React.useState(0);
  const q = QUOTES[i];
  const n = QUOTES.length;
  return (
    <Section
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
        <QuoteControls i={i} n={n} go={setI} />
      </Box>
    </Section>
  );
};

/** Customer stories. Built to take more quotes: add them to QUOTES. */
export const CustomerQuotes = QuoteFeature;
