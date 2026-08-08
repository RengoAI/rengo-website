import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface SectionShellProps extends React.PropsWithChildren {
  /** Full-width hairline rule along the top of the section. */
  borderTop?: boolean;
  /** Full-width top + bottom rules (Mintlify-style CTA frame). */
  borderY?: boolean;
  /** Horizontal padding on the content column. Defaults to marketing gutters. */
  px?: false | typeof marketingContentPaddingX | Record<string, number | string> | number | string;
  bg?: string;
  py?: Record<string, number | string> | number | string;
}

/**
 * The repeating page frame from the marketing design: an 80px ruled gutter on
 * each side with the content column between them. Gutters collapse on mobile.
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  borderTop = false,
  borderY = false,
  px = marketingContentPaddingX,
  bg,
  py = { base: 16, md: 20 },
}) => (
  <Flex
    as="section"
    w="full"
    bg={bg}
    align="stretch"
    borderTop={borderTop || borderY ? "1px solid" : undefined}
    borderBottom={borderY ? "1px solid" : undefined}
    borderColor={borderTop || borderY ? "slate.30" : undefined}
  >
    <Box
      display={{ base: "none", md: "block" }}
      w={MARKETING_GUTTER_WIDTH}
      flexShrink={0}
      borderRightWidth="1px"
      borderRightStyle="solid"
      borderRightColor="slate.30"
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
      borderLeftColor="slate.30"
      borderRightColor="slate.30"
    >
      {children}
    </Box>
    <Box
      display={{ base: "none", md: "block" }}
      w={MARKETING_GUTTER_WIDTH}
      flexShrink={0}
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="slate.30"
    />
  </Flex>
);
