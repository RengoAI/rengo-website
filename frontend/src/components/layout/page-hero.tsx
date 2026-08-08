import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
import { PageContainer } from "@/components/layout/page-container";
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
  subtextMaxW = "480px",
  background,
  minH = { base: "auto", lg: "702px" },
  contentPt = { base: 32, lg: 0 },
  contentPb = { base: 20, lg: "223px" },
}) => {
  const isCompact = minH === "auto";

  return (
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
        <Box
          position="absolute"
          inset={0}
          overflow="hidden"
          pointerEvents="none"
        >
          {background}
        </Box>
      )}

      <PageContainer>
        <Flex
          position="relative"
          zIndex={1}
          direction="column"
          justify={isCompact ? "center" : { base: "center", lg: "flex-end" }}
          gap={7}
          minH={minH}
          pt={contentPt}
          pb={contentPb}
        >
          <Flex direction="column" gap={3} align="flex-start" w="full">
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
              fontWeight={350}
              fontSize={{ base: "40px", lg: "50px" }}
              lineHeight={{ base: "44px", lg: "52px" }}
              letterSpacing="-2px"
              color="indigo.900"
              maxW={{ base: "100%", lg: "560px" }}
              m={0}
              textAlign="left"
            >
              {headline}
            </Box>

            {subtext && (
              <Text
                fontFamily="heading"
                fontWeight={300}
                fontSize="18px"
                lineHeight="24px"
                color="slate.50"
                maxW={subtextMaxW}
                m={0}
                textAlign="left"
              >
                {subtext}
              </Text>
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
      </PageContainer>
    </Box>
  );
};
