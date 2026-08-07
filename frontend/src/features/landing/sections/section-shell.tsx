import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface SectionShellProps extends React.PropsWithChildren {
  /** Draws the hairline rule along the top of the gutter columns. */
  borderTop?: boolean;
  /** Full-width top + bottom rules (Mintlify-style CTA frame). */
  borderY?: boolean;
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
  bg,
  py = { base: 16, md: 20 },
}) => {
  const showTopRule = borderTop || borderY;

  return (
    <Flex
      as="section"
      w="full"
      bg={bg}
      align="stretch"
      borderTop={borderY ? "1px solid" : undefined}
      borderBottom={borderY ? "1px solid" : undefined}
      borderColor={borderY ? "slate.30" : undefined}
    >
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
        borderRight="1px solid"
        borderColor="slate.30"
        borderTop={showTopRule && !borderY ? "1px solid" : undefined}
      />
      <Box
        flex="1"
        minW={0}
        px={marketingContentPaddingX}
        py={py}
        borderLeft={{ base: "1px solid", md: "none" }}
        borderRight={{ base: "1px solid", md: "none" }}
        borderColor="slate.30"
      >
        {children}
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
        borderLeft="1px solid"
        borderColor="slate.30"
        borderTop={showTopRule && !borderY ? "1px solid" : undefined}
      />
    </Flex>
  );
};
