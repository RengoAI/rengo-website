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
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={{ base: 8, md: 10 }}
      w="full"
    >
      <Box
        as="h2"
        fontFamily="heading"
        fontWeight={350}
        fontSize={{ base: "26px", md: "36px" }}
        lineHeight={1.2}
        letterSpacing="-2px"
        color="indigo.900"
        maxW="640px"
        m={0}
        flex="1"
        minW={0}
      >
        The AI deployment company for investment firms
      </Box>

      <Button
        flexShrink={0}
        alignSelf={{ base: "flex-start", md: "center" }}
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
