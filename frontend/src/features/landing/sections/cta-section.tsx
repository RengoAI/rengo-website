import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

interface CtaSectionProps {
  onTalkToSales: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onTalkToSales }) => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={{ base: 8, md: 10 }}
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
        whiteSpace="nowrap"
        m={0}
      >
        The AI deployment company for investment firms
      </Box>

      <Button
        flexShrink={0}
        bg="indigo.900"
        color="slate.10"
        borderRadius={0}
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
