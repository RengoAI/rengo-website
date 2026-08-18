import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import { MarketingCtaButton } from "@/components/ui/marketing-cta-button";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { Box, Flex, Text } from "@chakra-ui/react";
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
    <Box
      position="absolute"
      inset="0 0 auto"
      h="50%"
      pointerEvents="none"
      bg="linear-gradient(to bottom, {colors.slate.10}, transparent)"
    />

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
          <Flex
            direction="column"
            align="flex-start"
            gap={{ base: 6, md: 8 }}
            position="relative"
            w="full"
            maxW={{ base: "100%", md: "780px" }}
            py={{ base: 6, md: 8 }}
            pr={{ base: 4, md: 8 }}
            _before={{
              content: '""',
              position: "absolute",
              inset: "-32% -40% -36% -56%",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 88% 72% at 52% 42%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.58) 24%, rgba(255, 255, 255, 0.28) 46%, rgba(255, 255, 255, 0.08) 68%, rgba(255, 255, 255, 0) 86%)",
            }}
            css={{
              "& > *": { position: "relative", zIndex: 1 },
            }}
          >
            <Flex direction="column" align="flex-start" gap={{ base: 2, md: 3 }}>
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
                fontSize={{ base: "16px", md: "17px" }}
                lineHeight={1.4}
                letterSpacing="normal"
                color="slate.50"
                maxW="780px"
                m={0}
              >
                Replace fragmented workflows with a governed AI data foundation
                that compounds.
              </Box>
            </Flex>

            <MarketingCtaButton onClick={onCtaClick}>
              Get Started
            </MarketingCtaButton>
          </Flex>
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
