import { Box, Flex } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";

/** Spread on parent Button (or link styled as button) to slide the arrow on hover. */
export const buttonArrowHoverProps = {
  _hover: {
    "& [data-arrow]": {
      transform: "translateX(4px)",
    },
  },
} as const;

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
