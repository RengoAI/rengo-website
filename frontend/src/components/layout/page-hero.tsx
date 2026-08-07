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
  minH = "100vh",
  contentPt = 20,
  contentPb = 12,
}) => {
  const isLeft = align === "left";

  return (
    <Box
      as="section"
      position="relative"
      bg="slate.10"
      color="indigo.900"
      minH={minH}
      display="flex"
      flexDirection="column"
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

      <Flex
        position="relative"
        zIndex={2}
        flex={1}
        direction="column"
        justify="center"
        align="stretch"
        pt={contentPt}
        pb={contentPb}
      >
        <PageContainer>
          <Box
            display="flex"
            flexDirection="column"
            textAlign={isLeft ? "left" : "center"}
            alignItems={isLeft ? "flex-start" : "center"}
          >
            {eyebrow && (
              <Text
                fontFamily={EDICT}
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="slate.50"
                mb={6}
              >
                {eyebrow}
              </Text>
            )}

            <Box
              as="h1"
              fontFamily="heading"
              fontSize="clamp(52px, 6vw, 84px)"
              fontWeight={350}
              lineHeight={1.04}
              letterSpacing="-0.025em"
              color="indigo.900"
              maxW="880px"
              m={0}
              mb={7}
            >
              {headline}
            </Box>

            {isLeft && <Box h="1px" bg="slate.30" w="72px" mb={7} />}

            {subtext && (
              <Box
                fontSize="lg"
                lineHeight={1.45}
                color="slate.50"
                maxW={subtextMaxW}
                mb={9}
              >
                {subtext}
              </Box>
            )}

            <Button
              borderRadius={0}
              bg="indigo.900"
              color="slate.10"
              h={{ base: "44px", md: "42px" }}
              px={8}
              fontFamily="body"
              fontSize="sm"
              fontWeight="normal"
              _hover={{ bg: "indigo.700" }}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </Button>
          </Box>
        </PageContainer>
      </Flex>
    </Box>
  );
};
