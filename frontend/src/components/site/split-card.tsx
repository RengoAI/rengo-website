import { Box, type BoxProps, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The card shape shared by the metrics band and the testimonials band.
 *
 * Both are the same object: a tall column held open to a fixed height, hung
 * off a dashed rule on its left edge, with one thing pinned to the top and
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
};

export const SplitCard: React.FC<SplitCardProps> = ({
  top,
  bottom,
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
    borderLeftWidth="1px"
    borderLeftStyle="dotted"
    borderLeftColor="site.border.dashedOnDark"
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
    // Tucked in closer to the rule than SplitCard's 16px.
    pl="12px"
    borderLeftColor="site.border.dashedOnTint"
    top={
      // Set like the use-case audience labels, but drawn in the divider's
      // colour so the index reads as part of the rule.
      <Text
        textStyle="label"
        fontWeight={300}
        letterSpacing="0"
        lineHeight="1.1"
        color="site.border.dashedOnTint"
      >
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
        <Text textStyle="d2" w="full">
          {value}
        </Text>
        {/* A step lighter than body copy (soot.700), so the caption sits
            back from the figure above it. */}
        <Text textStyle="label" color="soot.600" w="full">
          {caption}
        </Text>
      </Box>
    }
    {...rest}
  />
);

// The testimonial washes' three colours: a light grey, a grey-blue between,
// and a soft periwinkle. Exported so the metrics band can echo them.
export const WASH_GREY = "#F2F2F2";
export const WASH_MIST = "#E1E9EF";
export const WASH_BLUE = "#BCCFEC";

/**
 * Soft organic gradients for the testimonial cards: a base colour with a few
 * large, offset elliptical blobs of the other two melting into it, so the
 * colour drifts across the card instead of running in a straight line. Each
 * step leans further toward the blue.
 */
const TESTIMONIAL_WASHES = {
  /** Flat light grey, no blobs — the same #F2F2F2 as the metrics band. */
  plain: {
    bg: WASH_GREY,
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
    p="1.5rem" // 24px
    {...TESTIMONIAL_WASHES[wash]}
    borderRadius="4px"
    borderLeftWidth={0}
    // Primary.800 (#0C1D34) at 4%: barely lifts the card off the band.
    boxShadow="0 2px 3px rgba(12, 29, 52, 0.04)"
    top={
      <Text textStyle="d5" color="soot.600" w="full">
        {quote}
      </Text>
    }
    bottom={
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="8px"
        w="full"
      >
        <Image src={avatarSrc} alt="" boxSize="34px" borderRadius="full" />
        <Text
          textStyle="body.md"
          lineHeight="1.2"
          letterSpacing="0"
          color="soot.600"
          w="full"
        >
          {attribution}
        </Text>
      </Box>
    }
    {...rest}
  />
);
