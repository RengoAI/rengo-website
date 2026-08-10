import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
  marketingLayoutBorderColor,
} from "@/components/layout/marketing-frame";
import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface SectionShellProps extends React.PropsWithChildren {
  /** Full-width hairline rule along the top of the section. */
  borderTop?: boolean;
  /** Full-width top + bottom rules (Mintlify-style CTA frame). */
  borderY?: boolean;
  /** Horizontal padding on the content column. Defaults to marketing gutters. */
  px?:
    | false
    | typeof marketingContentPaddingX
    | Record<string, number | string>
    | number
    | string;
  bg?: string;
  py?: Record<string, number | string> | number | string;
}

/**
 * The repeating page frame from the marketing design: an 80px ruled gutter on
 * each side with the content column between them. Gutters collapse on mobile.
 * The shell sits inside {@link MarketingPageWidth} (1088px cap + page margin).
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  borderTop = false,
  borderY = false,
  px = marketingContentPaddingX,
  bg,
  py = { base: 16, md: 24 },
}) => (
  <Box
    as="section"
    w="full"
    bg={bg}
    borderTop={borderTop || borderY ? "1px solid" : undefined}
    borderBottom={borderY ? "1px solid" : undefined}
    borderColor={borderTop || borderY ? marketingLayoutBorderColor : undefined}
  >
    <MarketingPageWidth>
      <Flex w="full" align="stretch">
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderRightWidth="1px"
          borderRightStyle="solid"
          borderRightColor={marketingLayoutBorderColor}
        />
        <Box
          flex="1"
          minW={0}
          px={px === false ? 0 : px}
          py={py}
          borderLeftWidth={{ base: "1px", md: 0 }}
          borderRightWidth={{ base: "1px", md: 0 }}
          borderLeftStyle="solid"
          borderRightStyle="solid"
          borderLeftColor={marketingLayoutBorderColor}
          borderRightColor={marketingLayoutBorderColor}
        >
          {children}
        </Box>
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderLeftWidth="1px"
          borderLeftStyle="solid"
          borderLeftColor={marketingLayoutBorderColor}
        />
      </Flex>
    </MarketingPageWidth>
  </Box>
);
