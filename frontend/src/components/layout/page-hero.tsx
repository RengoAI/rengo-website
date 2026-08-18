import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import { MarketingCtaButton } from "@/components/ui/marketing-cta-button";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import { Box, Flex, Text } from "@chakra-ui/react";
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
        <Flex
          direction="column"
          gap={{ base: 5, md: 7 }}
          align="flex-start"
          w="full"
        >
          {eyebrow && (
            <Text variant="overline" m={0}>
              {eyebrow}
            </Text>
          )}

          <Text as="h1" variant="h1" maxW="none" m={0}>
            {headline}
          </Text>

          {subtext && (
            <Text
              as="p"
              variant="body"
              color="slate.50"
              maxW={subtextMaxW}
              m={0}
            >
              {subtext}
            </Text>
          )}
        </Flex>

        <Box alignSelf="flex-start">
          <MarketingCtaButton onClick={onCtaClick}>
            {ctaLabel}
          </MarketingCtaButton>
        </Box>
      </Flex>
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
    </MarketingPageWidth>
  </Box>
);
