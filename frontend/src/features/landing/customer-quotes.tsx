import { Section } from "@/components/layout/section";
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
    w="36px"
    h="36px"
    display="grid"
    placeItems="center"
    borderRadius="4px"
    border="1px solid"
    borderColor="border.emphasized"
    color="site.fg.strong"
    bg="site.bg.raised"
    transition="opacity 200ms ease"
    _disabled={{ opacity: 0.35, cursor: "default" }}
    _focusVisible={{
      outline: "2px solid",
      outlineColor: "site.highlight",
      outlineOffset: "2px",
    }}
  >
    {dir === "prev" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
  </chakra.button>
);

/**
 * Customer stories as a carousel, after Jack & Jill's: large quote cards in
 * a row that slides sideways, a little over two showing on desktop, with
 * arrows. Each card leads with the fund's size, the strongest thing the
 * quotes carry. Built to take more quotes: add them to QUOTES.
 */
export const CustomerQuotes: React.FC = () => {
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
      left: dir * (card.getBoundingClientRect().width + 20),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <Section bg="site.bg.surface" py="72px" overflow="hidden">
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="24px"
        pb="40px"
      >
        <Text
          as="h2"
          textStyle="h3"
          color="site.fg.heading"
          maxW={{ base: "75vw", md: "296px" }}
        >
          Our customers in their own words
        </Text>
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
        gap="20px"
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
              lg: "0 0 calc((100% - 40px) / 2.4)",
            }}
            css={{ scrollSnapAlign: "start" }}
            bg="site.bg.raised"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="4px"
            p={{ base: "24px", md: "32px" }}
            minH={{ md: "380px" }}
            display="flex"
            flexDirection="column"
            gap="28px"
          >
            {/* The fund, large: who's speaking, in the terms a buyer scans
              for. */}
            <Box>
              <Text
                textStyle="d1"
                fontSize={{ base: "2.25rem", md: "2.75rem" }}
                lineHeight="1"
                color="site.highlight"
              >
                {q.size}
              </Text>
              <Text textStyle="body.sm" color="site.fg.muted" mt="6px">
                {q.firm}
              </Text>
            </Box>
            <Text
              as="blockquote"
              textStyle="d5"
              color="site.fg.strong"
              flex="1"
            >
              {q.quote}
            </Text>
            <Text textStyle="body.sm" color="site.fg">
              {q.role}
            </Text>
          </Box>
        ))}
      </Box>
    </Section>
  );
};
