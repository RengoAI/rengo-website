import { Box, Flex } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";

const ctaHoverOverlayLayer = {
  position: "relative" as const,
  overflow: "hidden",
  _before: {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    bg: "whiteAlpha.300",
    opacity: 0,
    transition: "opacity 0.2s ease",
    pointerEvents: "none",
    zIndex: 0,
  },
  _hover: {
    _before: {
      opacity: 1,
    },
  },
  css: {
    "& > *": {
      position: "relative",
      zIndex: 1,
    },
  },
};

/** Light white overlay on hover — keeps the button fill visible underneath. */
export const ctaButtonHoverProps = ctaHoverOverlayLayer;

/** Spread on parent Button (or link styled as button) to slide the arrow on hover. */
export const buttonArrowHoverProps = {
  _hover: {
    "& [data-arrow]": {
      transform: "translateX(4px)",
    },
  },
} as const;

export const ctaButtonHoverWithArrowProps = {
  ...ctaHoverOverlayLayer,
  _hover: {
    _before: {
      opacity: 1,
    },
    "& [data-arrow]": {
      transform: "translateX(4px)",
    },
  },
};

interface ButtonArrowLabelProps {
  children: React.ReactNode;
  iconSize?: number;
}

export const ButtonArrowLabel: React.FC<ButtonArrowLabelProps> = ({
  children,
  iconSize = 12,
}) => (
  <Flex as="span" alignItems="center" gap={1.5}>
    <Box as="span">{children}</Box>
    <Box
      as="span"
      data-arrow
      display="inline-flex"
      alignItems="center"
      flexShrink={0}
      transition="transform 200ms ease"
      aria-hidden
    >
      <ArrowRight size={iconSize} strokeWidth={1.75} />
    </Box>
  </Flex>
);
