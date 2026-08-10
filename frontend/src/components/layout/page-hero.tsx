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
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface PageHeroProps {
  headline: React.ReactNode;
  subtext?: string;
  ctaLabel: string;
  onCtaClick: () => void;
  eyebrow?: string;
  subtextMaxW?: string;
  background?: React.ReactNode;
  /** Default matches landing hero; use `"auto"` for compact bands. */
  minH?: string | { base?: string; md?: string; lg?: string };
  contentPt?:
    | string
    | number
    | { base?: string | number; lg?: string | number };
  contentPb?:
    | string
    | number
    | { base?: string | number; lg?: string | number };
}

export const PageHero: React.FC<PageHeroProps> = ({
  headline,
  subtext,
  ctaLabel,
  onCtaClick,
  eyebrow,
  subtextMaxW = "680px",
  background,
  // Fills the first screen. `svh` tracks the *small* viewport height so
  // mobile browsers with a retracting URL bar don't clip the CTA on load.
  minH = { base: "100svh", lg: "100vh" },
  // The header is fixed and overlays this section, so the top offset covers
  // its height to keep the copy optically centred.
  contentPt = `calc(${TOP_NAV_HEIGHT}px + var(--chakra-spacing-10))`,
  contentPb = 10,
}) => (
  <Box
    as="section"
    position="relative"
    bg="slate.10"
    color="indigo.900"
    minH={minH}
    display="flex"
    alignItems="stretch"
    overflow="hidden"
  >
    {background && (
      <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
        {background}
      </Box>
    )}

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
      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        justify="center"
        gap={7}
        flex="1"
        minW={0}
        px={marketingContentPaddingX}
        pt={contentPt}
        pb={contentPb}
      >
        <Flex direction="column" gap={{ base: 5, md: 7 }} align="flex-start" w="full">
          {eyebrow && (
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="slate.50"
              m={0}
            >
              {eyebrow}
            </Text>
          )}

          <Box
            as="h1"
            fontFamily="heading"
            fontWeight={300}
            fontSize={{
              base: "clamp(30px, 7.6vw, 40px)",
              md: "clamp(44px, 6.6vw, 62px)",
              lg: "clamp(52px, 5.8vw, 72px)",
            }}
            lineHeight={1.02}
            letterSpacing={{ base: "-1.5px", md: "-3px" }}
            color="indigo.900"
            maxW="none"
            whiteSpace={{ base: "normal", md: "nowrap" }}
            m={0}
            textAlign="left"
          >
            {headline}
          </Box>

          {subtext && (
            <Box
              as="p"
              fontFamily="heading"
              fontWeight={350}
              fontSize={{ base: "24px", md: "30px" }}
              lineHeight={1.2}
              letterSpacing="-2px"
              color="indigo.900"
              maxW={subtextMaxW}
              m={0}
              textAlign="left"
            >
              <Box
                as="span"
                color="slate.50"
                fontWeight={300}
                fontSize={{ base: "18px", md: "26px" }}
                lineHeight={1.2}
              >
                {subtext}
              </Box>
            </Box>
          )}
        </Flex>

        <Button
          alignSelf="flex-start"
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
          <ButtonArrowLabel>{ctaLabel}</ButtonArrowLabel>
        </Button>
      </Flex>
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
    </MarketingPageWidth>
  </Box>
);
