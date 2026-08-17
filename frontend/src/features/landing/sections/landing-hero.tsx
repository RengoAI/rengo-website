import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface LandingHeroProps {
  onCtaClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onCtaClick }) => (
  <Box
    as="section"
    position="relative"
    bg="slate.10"
    // Fills the first screen. `svh` tracks the *small* viewport height, so
    // mobile browsers with a retracting URL bar don't clip the CTA on load.
    minH={{ base: "100svh", lg: "100vh" }}
    display="flex"
    alignItems="stretch"
    overflow="hidden"
  >
    <HeroGridCanvas />

    <MarketingPageWidth
      flex="1"
      display="flex"
      innerProps={{ display: "flex", flex: "1", alignItems: "stretch" }}
    >
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
      <Box flex="1" minW={0} px={marketingContentPaddingX} display="flex">
        <Flex
          position="relative"
          zIndex={1}
          direction="column"
          align="flex-start"
          justify="center"
          textAlign="left"
          gap={{ base: 8, md: 10 }}
          flex="1"
          // The header is fixed and overlays this section, so offset the top
          // padding by its height to keep the copy optically centred.
          pt={`calc(${TOP_NAV_HEIGHT}px + var(--chakra-spacing-10))`}
          pb={10}
        >
          <Flex direction="column" align="flex-start" gap={{ base: 5, md: 7 }}>
            <Text
              as="h1"
              variant="h1"
              maxW={{ base: "none", md: "590px" }}
              m={0}
            >
              Turn proprietary knowledge into{" "}
              <Box as="span" color="accent.link">
                operational leverage
              </Box>
            </Text>

            <Box
              as="p"
              fontFamily="body"
              fontWeight={300}
              fontSize={{ base: "15px", md: "17px" }}
              lineHeight={1.6}
              letterSpacing="normal"
              color="slate.50"
              maxW="520px"
              m={0}
            >
              Rengo gives your firm a governed data foundation for AI —
              replacing fragmented manual workflows with firm-wide knowledge
              that compounds over time.
            </Box>
          </Flex>

          <Button
            bg="indigo.900"
            color="slate.10"
            px={8}
            py={3.5}
            h="auto"
            fontFamily="body"
            fontSize="14px"
            fontWeight="light"
            lineHeight="21px"
            onClick={onCtaClick}
            {...ctaButtonHoverWithArrowProps}
          >
            <ButtonArrowLabel>Get Started</ButtonArrowLabel>
          </Button>
        </Flex>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
    </MarketingPageWidth>
  </Box>
);
