import {
  MARKETING_CONTENT_WIDTH,
  MARKETING_MAX_FRAME_WIDTH,
  marketingPageMarginX,
} from "@/components/layout/marketing-frame";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

type MarketingPageWidthProps = BoxProps & {
  /**
   * `frame` — gutters + 1088px content (1248px total). Default for nav,
   * sections, heroes.
   * `content` — 1088px column only (PageContainer, prose pages).
   */
  variant?: "frame" | "content";
  /** Props for the inner max-width column (e.g. flex layout for heroes). */
  innerProps?: BoxProps;
};

/**
 * Mintlify-style page frame: viewport margin + centered max-width column.
 */
export const MarketingPageWidth: React.FC<MarketingPageWidthProps> = ({
  children,
  variant = "frame",
  innerProps,
  ...outerProps
}) => (
  <Box w="full" px={marketingPageMarginX} {...outerProps}>
    <Box
      maxW={
        variant === "content"
          ? MARKETING_CONTENT_WIDTH
          : MARKETING_MAX_FRAME_WIDTH
      }
      mx="auto"
      w="full"
      {...innerProps}
    >
      {children}
    </Box>
  </Box>
);
