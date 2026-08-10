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
   * When false, keep the heading inside section padding (accent + title do not
   * pull to the content column rim).
   */
  flushToRim?: boolean;
  /** Rim accent bar to the left of the title. */
  showAccent?: boolean;
};

/**
 * Section title with optional rim-flush accent; inset title text via
 * {@link sectionHeadingTextPl}.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  maxW = "664px",
  flushToRim = true,
  showAccent = true,
}) => (
  <Box
    position="relative"
    maxW={maxW}
    ml={flushToRim ? sectionHeadingMarginLeft : 0}
    pl={flushToRim && showAccent ? sectionHeadingTextPl : 0}
  >
    {showAccent ? (
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
    ) : null}
    <Box
      as="h2"
      fontFamily="heading"
      fontWeight={350}
      fontSize={{ base: "28px", md: "36px" }}
      lineHeight={{ base: "32px", md: "40px" }}
      letterSpacing="-0.72px"
      color="indigo.900"
      m={0}
      pl={flushToRim || !showAccent ? 0 : sectionHeadingTextPl}
    >
      {children}
    </Box>
  </Box>
);
