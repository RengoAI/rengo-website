import { colorVar, tiledRuleLeft } from "@/components/site/site-styles";
import { Box, type BoxProps, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The card shape shared by the metrics band and the testimonials band.
 *
 * Both are the same object: a tall column held open to a fixed height, hung
 * off a dotted rule on its left edge, with one thing pinned to the top and
 * one to the bottom. Only the children differ — an index and a figure in one
 * case, a quote and an attribution in the other. Keeping them one component
 * is what guarantees the two bands stay dimensionally identical.
 *
 * Below `lg` the cards stack, so they drop the fixed height and simply keep
 * a minimum gap between top and bottom.
 */
export type SplitCardProps = Omit<BoxProps, "top"> & {
  top: React.ReactNode;
  bottom: React.ReactNode;
  /** Draw the dotted rule on the left edge. */
  rule?: boolean;
  /** The rule's colour, as a colour token path. */
  ruleColor?: string;
};

export const SplitCard: React.FC<SplitCardProps> = ({
  top,
  bottom,
  rule = true,
  ruleColor = "site.border.dashedOnDark",
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    alignItems="flex-start"
    gap="32px"
    h={{ base: "auto", lg: "472px" }}
    px="16px"
    {...(rule ? tiledRuleLeft(ruleColor) : {})}
    {...rest}
  >
    {top}
    {bottom}
  </Box>
);

/**
 * Metrics band: index on top, figure + caption on the bottom. Set on the
 * tinted band, like the testimonials.
 */
export const MetricCard: React.FC<
  Omit<SplitCardProps, "top" | "bottom"> & {
    index: React.ReactNode;
    value: React.ReactNode;
    caption: React.ReactNode;
    icon?: React.ReactNode;
  }
> = ({ index, value, caption, icon, ...rest }) => (
  <SplitCard
    px="1.5rem" // 24px, as the testimonial cards; no top or bottom
    ruleColor="site.border.dashed"
    top={
      // Set exactly like the caption, in the tint band's rule colour so
      // the index stays legible against the lighter rule. Ordinal only, so
      // hidden from screen readers ("1, 1 month…").
      <Text textStyle="label" color="site.border.dashedOnTint" aria-hidden>
        {index}
      </Text>
    }
    bottom={
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
        w="full"
        // The icon draws in currentColor, so it matches the figure.
        color="site.fg"
      >
        {icon}
        {/* A step lighter than body copy (soot 600). */}
        <Text textStyle="d2" color="soot.600" w="full">
          {value}
        </Text>
        {/* Two steps lighter than body copy (soot.500), so the caption
            sits back from the figure above it; held narrow so it wraps
            into a short block. */}
        {/* 12px from the figure, closer than the column's 16px gap. */}
        <Text
          textStyle="label"
          color="soot.500"
          w="full"
          maxW="200px"
          mt="-4px"
          // Two lines tall (2 × the label's 1.25 line height) whatever the
          // caption's length, so the figures line up across the cards.
          minH="2.5em"
        >
          {caption}
        </Text>
      </Box>
    }
    {...rest}
  />
);

/** The step cards' tiled rule: along the bottom on phones, the left edge
 * from md. */
const STEP_RULE_COLOR = colorVar("site.border.dashedOnTint");
const STEP_RULE = {
  position: "relative",
  _before: {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    top: { base: "auto", md: 0 },
    w: { base: "full", md: "1px" },
    h: { base: "1px", md: "auto" },
    bgImage: {
      base: `linear-gradient(to right, ${STEP_RULE_COLOR} 1px, transparent 1px)`,
      md: `linear-gradient(to bottom, ${STEP_RULE_COLOR} 1px, transparent 1px)`,
    },
    bgSize: { base: "2px 1px", md: "1px 2px" },
    bgRepeat: { base: "repeat-x", md: "repeat-y" },
    pointerEvents: "none",
  },
} as const;

/**
 * A process step in the metrics layout: its number on top, title
 * and description on the bottom, hung off the same dotted rule. Set for a
 * light band.
 */
export const StepCard: React.FC<
  Omit<SplitCardProps, "top" | "bottom"> & {
    step: number;
    title: React.ReactNode;
    body: React.ReactNode;
  }
> = ({ step, title, body, ...rest }) => (
  <SplitCard
    // Phones stack the steps, so the rule runs along the bottom instead,
    // and the copy sits flush left above it.
    pl={{ base: 0, md: "12px" }}
    pr={{ base: 0, md: "1.5rem" }} // 24px, as the metric cards
    pb={{ base: "1.25rem", md: 0 }}
    // A quarter taller on phones (~123px → ~154px): the extra goes between
    // the number and the title.
    gap={{ base: "3.9375rem", md: "32px" }}
    // Tablets match the phones' height; desktop keeps the full 472px.
    h={{ base: "auto", md: "154px", lg: "472px" }}
    rule={false}
    {...STEP_RULE}
    top={
      // The smallest caption size. Ordinal only, so hidden from screen
      // readers.
      <Text
        textStyle="caption"
        fontWeight={500}
        color="site.highlight"
        aria-hidden
      >
        {step}
      </Text>
    }
    bottom={
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={{ base: "0.25rem", md: "0.5rem" }}
        w="full"
      >
        {/* h6, stepping up to h5's 24px on desktop. */}
        <Text
          as="h3"
          textStyle="h6"
          fontSize={{ lg: "1.5rem" }}
          color="site.fg"
        >
          {title}
        </Text>
        {/* A step lighter than body copy, so it sits back from the title.
            On desktop it's held open to three lines (3 × body.sm's 1.4 line
            height), so the titles line up across the cards; a longer one,
            at narrow desktop widths, grows rather than overflowing. */}
        <Text textStyle="body.sm" color="soot.600" minH={{ lg: "4.2em" }}>
          {body}
        </Text>
      </Box>
    }
    {...rest}
  />
);

// The testimonial washes' three colours: a light grey, a grey-blue between,
// and a soft periwinkle.
const WASH_GREY = "#F2F2F2";
const WASH_MIST = "#E1E9EF";
const WASH_BLUE = "#BCCFEC";

/**
 * Soft organic gradients for the testimonial cards: a base colour with a few
 * large, offset elliptical blobs of the other two melting into it, so the
 * colour drifts across the card instead of running in a straight line. Each
 * step leans further toward the blue.
 */
export const TESTIMONIAL_WASHES = {
  /** Flat, no blobs — a pale blue, a touch stronger than silver 100 but
   * still lighter than the other two cards' blues. */
  plain: {
    bg: "#E2EAF6",
    bgImage: "none",
  },
  light: {
    bg: WASH_GREY,
    bgImage: [
      `radial-gradient(ellipse 90% 70% at 88% 12%, ${WASH_MIST} 0%, transparent 70%)`,
      `radial-gradient(ellipse 70% 55% at 8% 96%, ${WASH_BLUE}59 0%, transparent 70%)`,
      `radial-gradient(ellipse 80% 60% at 30% 45%, ${WASH_GREY} 0%, transparent 75%)`,
    ].join(", "),
  },
  mid: {
    bg: WASH_MIST,
    bgImage: [
      `radial-gradient(ellipse 85% 65% at 12% 10%, ${WASH_GREY} 0%, transparent 70%)`,
      `radial-gradient(ellipse 80% 70% at 92% 88%, ${WASH_BLUE}b3 0%, transparent 70%)`,
      `radial-gradient(ellipse 60% 45% at 70% 35%, ${WASH_MIST} 0%, transparent 80%)`,
    ].join(", "),
  },
  /** `mid` flipped top to bottom: grey in the bottom left, blue in the top
   * right. For bands rather than cards. */
  midReversed: {
    bg: WASH_MIST,
    bgImage: [
      `radial-gradient(ellipse 85% 65% at 12% 90%, ${WASH_GREY} 0%, transparent 70%)`,
      `radial-gradient(ellipse 80% 70% at 92% 12%, ${WASH_BLUE}b3 0%, transparent 70%)`,
      `radial-gradient(ellipse 60% 45% at 70% 65%, ${WASH_MIST} 0%, transparent 80%)`,
    ].join(", "),
  },
  deep: {
    bg: WASH_BLUE,
    bgImage: [
      `radial-gradient(ellipse 75% 55% at 15% 8%, ${WASH_MIST} 0%, transparent 70%)`,
      `radial-gradient(ellipse 110% 80% at 100% 85%, ${WASH_GREY}4d 0%, transparent 65%)`,
    ].join(", "),
  },
} as const;

export type TestimonialWash = keyof typeof TESTIMONIAL_WASHES;

/**
 * Testimonials band: quote on top, avatar + attribution on the bottom. Unlike
 * the metrics, each quote is its own filled card rather than hanging off a
 * rule.
 */
export const TestimonialCard: React.FC<
  Omit<SplitCardProps, "top" | "bottom"> & {
    quote: React.ReactNode;
    avatarSrc: string;
    attribution: React.ReactNode;
    /** Which fill the card takes — `plain` flat grey, then `light` greyest
     * through `deep` bluest. */
    wash?: TestimonialWash;
  }
> = ({ quote, avatarSrc, attribution, wash = "light", ...rest }) => (
  <SplitCard
    as="figure"
    p="1.5rem" // 24px
    {...TESTIMONIAL_WASHES[wash]}
    borderRadius="4px"
    rule={false}
    // Primary.800 (#0C1D34) at 4%: barely lifts the card off the band.
    boxShadow="0 2px 3px rgba(12, 29, 52, 0.04)"
    top={
      <Text as="blockquote" textStyle="d5" color="soot.600" w="full">
        {quote}
      </Text>
    }
    bottom={
      <Box
        as="figcaption"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="8px"
        w="full"
      >
        <Image src={avatarSrc} alt="" boxSize="34px" borderRadius="full" />
        <Text
          textStyle="body.sm"
          lineHeight="1.2"
          letterSpacing="0"
          color="soot.600"
          // 80px short of the card's width, so it wraps sooner.
          w="calc(100% - 80px)"
          // Two lines tall on desktop (2 × the 1.2 line height) whatever
          // its length, so the avatars line up across the cards.
          minH={{ lg: "2.4em" }}
        >
          {attribution}
        </Text>
      </Box>
    }
    {...rest}
  />
);
