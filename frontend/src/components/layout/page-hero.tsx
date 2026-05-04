import { PageContainer } from "@/components/layout/page-container";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

interface PageHeroProps {
  headline: React.ReactNode;
  subtext?: string;
  ctaLabel: string;
  onCtaClick: () => void;
  eyebrow?: string;
  align?: "left" | "center";
  subtextMaxW?: string;
  background?: React.ReactNode;
  tone?: "dark" | "light";
  minH?: string;
  contentPt?: string | number;
  contentPb?: string | number;
}

export const PageHero: React.FC<PageHeroProps> = ({
  headline,
  subtext,
  ctaLabel,
  onCtaClick,
  eyebrow,
  align = "center",
  subtextMaxW = "480px",
  background,
  tone = "dark",
  minH = "100vh",
  contentPt = "80px",
  contentPb = 12,
}) => {
  const isLeft = align === "left";
  const isLight = tone === "light";

  return (
    <Box
      as="section"
      position="relative"
      bg={isLight ? "white" : "primary.800"}
      color={isLight ? "primary.800" : "white"}
      minH={minH}
      display="flex"
      flexDirection="column"
    >
      {background && (
        <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
          {background}
        </Box>
      )}

      <PageContainer>
      <Flex
        position="relative"
        zIndex={2}
        flex={1}
        direction="column"
        justify="center"
        align={isLeft ? "flex-start" : "center"}
        textAlign={isLeft ? "left" : "center"}
        pt={contentPt}
        pb={contentPb}
      >
        {eyebrow && (
          <Text
            fontFamily={EDICT}
            fontSize="11px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color={isLight ? "primary.700" : "primary.400"}
            mb={6}
          >
            {eyebrow}
          </Text>
        )}

        <Box
          as="h1"
          fontFamily="heading"
          fontSize="clamp(52px, 6vw, 84px)"
          fontWeight={400}
          lineHeight={1.04}
          letterSpacing="-0.025em"
          color={isLight ? "primary.800" : "white"}
          maxW="880px"
          m={0}
          mb={7}
        >
          {headline}
        </Box>

        {isLeft && (
          <Box h="1px" bg={isLight ? "gray.300" : "whiteAlpha.500"} w="72px" mb={7} />
        )}

        {subtext && (
          <Box
            fontSize="lg"
            lineHeight={1.45}
            color={isLight ? "gray.500" : "whiteAlpha.800"}
            maxW={subtextMaxW}
            mb={9}
          >
            {subtext}
          </Box>
        )}

        <Button
          borderRadius="md"
          bg={isLight ? "primary.700" : "white"}
          color={isLight ? "white" : "primary.800"}
          h={{ base: "44px", md: "42px" }}
          px={6}
          fontSize="15px"
          fontWeight="medium"
          _hover={{ bg: isLight ? "primary.800" : "gray.50" }}
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      </Flex>
      </PageContainer>
    </Box>
  );
};
