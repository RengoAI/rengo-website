import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface SectionShellProps extends React.PropsWithChildren {
  /** Draws the hairline rule along the top of the gutter columns. */
  borderTop?: boolean;
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
  bg,
  py = { base: 16, md: 20 },
}) => (
  <Flex as="section" w="full" bg={bg} align="stretch">
    <Box
      display={{ base: "none", md: "block" }}
      w="80px"
      flexShrink={0}
      borderRight="1px solid"
      borderColor="slate.30"
      borderTop={borderTop ? "1px solid" : undefined}
    />
    <Box flex="1" minW={0} px={{ base: 6, md: 10 }} py={py}>
      {children}
    </Box>
    <Box
      display={{ base: "none", md: "block" }}
      w="80px"
      flexShrink={0}
      borderLeft="1px solid"
      borderColor="slate.30"
      borderTop={borderTop ? "1px solid" : undefined}
    />
  </Flex>
);
