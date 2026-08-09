import { marketingContentPaddingX } from "@/components/layout/marketing-frame";
import { Box } from "@chakra-ui/react";
import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  maxW?: string | number;
  /**
   * When the parent SectionShell uses default content padding, the accent
   * sits on the left border rim. Pass false if the shell already has px={false}
   * and the heading is padded itself.
   */
  flushToRim?: boolean;
};

/**
 * Marketing section title with a Mintlify-style accent tick on the left
 * border rim, for dual-tone (dark + muted) headlines.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  maxW = "648px",
  flushToRim = true,
}) => (
  <Box position="relative" maxW={maxW}>
    <Box
      aria-hidden
      position="absolute"
      left={
        flushToRim
          ? {
              base: -marketingContentPaddingX.base,
              md: -marketingContentPaddingX.md,
            }
          : 0
      }
      top="0.45em"
      w="2px"
      h="24px"
      bg="indigo.900"
      borderRadius="1px"
    />
    <Box
      as="h2"
      fontFamily="heading"
      fontWeight={350}
      fontSize={{ base: "26px", md: "32px" }}
      lineHeight={1.2}
      letterSpacing="-2px"
      color="indigo.900"
      m={0}
    >
      {children}
    </Box>
  </Box>
);
