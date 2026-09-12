import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

interface CtaSectionProps {
  onTalkToSales: () => void;
  borderTop?: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onTalkToSales,
  borderTop = true,
}) => (
  // The tint and the field both sit on the content column, not the section:
  // `bg` on the shell spans the full viewport and would carry them out past
  // the ruled gutters into the neighbouring sections. The band variant of the
  // hero field is fainter and cleared through the middle, so the centred copy
  // keeps its own space.
  <SectionShell
    borderTop={borderTop}
    bg="slate.10"
    py={{ base: 10, md: 12 }}
    contentBg="primary.25"
    contentBackground={<HeroGridCanvas variant="band" />}
  >
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={{ base: 6, md: 8 }}
      w="full"
      textAlign="center"
    >
      <Box
        as="h2"
        fontFamily="heading"
        fontWeight={350}
        fontSize={{ base: "26px", md: "36px" }}
        lineHeight={1.2}
        letterSpacing="-2px"
        color="indigo.900"
        maxW="none"
        whiteSpace={{ base: "normal", md: "nowrap" }}
        m={0}
      >
        Ready to put AI to work?
      </Box>

      <Button
        flexShrink={0}
        bg="indigo.900"
        color="slate.10"
        px={8}
        py={3.5}
        h="auto"
        fontFamily="body"
        fontSize="14px"
        fontWeight="normal"
        lineHeight="21px"
        onClick={onTalkToSales}
        {...ctaButtonHoverWithArrowProps}
      >
        <ButtonArrowLabel>Talk to Sales</ButtonArrowLabel>
      </Button>
    </Flex>
  </SectionShell>
);
