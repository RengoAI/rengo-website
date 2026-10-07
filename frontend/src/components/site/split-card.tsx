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
    h="472px"
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

/** Metrics band: index on top, figure + caption on the bottom. */
export const MetricCard: React.FC<
  Omit<SplitCardProps, "top" | "bottom"> & {
    index: React.ReactNode;
    value: React.ReactNode;
    caption: React.ReactNode;
    icon?: React.ReactNode;
  }
> = ({ index, value, caption, icon, ...rest }) => (
  <SplitCard
    // Two steps darker than `dashedOnDark` (soot.500): a quieter rule.
    borderLeftColor="soot.700"
    top={
      <Text textStyle="label" color="site.fg.onDarkFaint">
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
      >
        {icon}
        <Text textStyle="d2" color="site.fg.onDark" w="full">
          {value}
        </Text>
        <Text
          textStyle="label"
          fontWeight={300}
          color="site.fg.onDarkFaint"
          w="full"
        >
          {caption}
        </Text>
      </Box>
    }
    {...rest}
  />
);

/** Testimonials band: quote on top, avatar + attribution on the bottom. */
export const TestimonialCard: React.FC<
  Omit<SplitCardProps, "top" | "bottom"> & {
    quote: React.ReactNode;
    avatarSrc: string;
    attribution: React.ReactNode;
  }
> = ({ quote, avatarSrc, attribution, ...rest }) => (
  <SplitCard
    py="8px"
    px="20px"
    borderLeftColor="site.border.dashedOnTint"
    top={
      <Text textStyle="d5" color="site.fg.strong" w="full">
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
        <Text textStyle="body.md" color="site.fg.strong" w="full">
          {attribution}
        </Text>
      </Box>
    }
    {...rest}
  />
);
