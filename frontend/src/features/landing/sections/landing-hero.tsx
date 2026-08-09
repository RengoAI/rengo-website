import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
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

    <Box display="flex" w="full" maxW="1440px" mx="auto">
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
            <Box
              as="h1"
              fontFamily="heading"
              fontWeight={300}
              // Sized to hold "Your data is your alpha" on a single line; the
              // vw term keeps it from wrapping between the md and lg stops.
              fontSize={{
                base: "clamp(34px, 9vw, 46px)",
                md: "clamp(52px, 7.4vw, 72px)",
                lg: "clamp(64px, 6.6vw, 88px)",
              }}
              lineHeight={1.02}
              letterSpacing={{ base: "-1.5px", md: "-3px" }}
              color="indigo.900"
              maxW="none"
              whiteSpace={{ base: "normal", md: "nowrap" }}
              m={0}
            >
              Your data is{" "}
              <Box as="span" color="accent.link">
                your alpha
              </Box>
            </Box>

            {/* Matches the muted second line of SectionHeading: serif, light
                weight, tight tracking — so the hero and section titles read
                as the same typographic system. */}
            <Text
              fontFamily="heading"
              fontWeight={300}
              fontSize={{ base: "22px", md: "32px" }}
              lineHeight={1.2}
              letterSpacing="-2px"
              color="slate.50"
              maxW="680px"
              m={0}
            >
              Turn proprietary knowledge into operating leverage
            </Text>
          </Flex>

          <Button
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
    </Box>
  </Box>
);
