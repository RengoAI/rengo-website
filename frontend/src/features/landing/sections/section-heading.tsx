import {
  sectionHeadingMarginLeft,
  sectionHeadingTextPl,
} from "@/components/layout/marketing-frame";
import { Box } from "@chakra-ui/react";
import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  maxW?: string | number;
  /**
   * When false, the section shell has no horizontal padding — still apply
   * Mintlify `px-7` on the title text only.
   */
  flushToRim?: boolean;
};

/**
 * Section title: accent flush to the content column’s left border; title text
 * uses {@link sectionHeadingTextPl} (wider than body padding).
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  maxW = "664px",
  flushToRim = true,
}) => (
  <Box
    position="relative"
    maxW={maxW}
    ml={flushToRim ? sectionHeadingMarginLeft : 0}
    pl={sectionHeadingTextPl}
  >
    <Box
      aria-hidden
      position="absolute"
      left={0}
      top={{ base: "0.55em", md: "0.5em" }}
      w="2px"
      h="24px"
      bg="indigo.900"
      borderRadius="1px"
    />
    <Box
      as="h2"
      fontFamily="heading"
      fontWeight={350}
      fontSize={{ base: "28px", md: "36px" }}
      lineHeight={{ base: "32px", md: "40px" }}
      letterSpacing="-0.72px"
      color="indigo.900"
      m={0}
    >
      {children}
    </Box>
  </Box>
);
