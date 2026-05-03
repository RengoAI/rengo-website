import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

const NAVY = "#0C1D34";

interface PageHeroProps {
  headline: React.ReactNode;
  subtext: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  headline,
  subtext,
  ctaLabel,
  onCtaClick,
}) => (
  <Flex
    as="section"
    bg={NAVY}
    color="white"
    px={20}
    minH="100vh"
    direction="column"
    justify="center"
    align="center"
    textAlign="center"
    pt="80px"
    pb={12}
  >
    <Box
      as="h1"
      fontFamily="heading"
      fontSize="clamp(52px, 6vw, 84px)"
      fontWeight={400}
      lineHeight={1.04}
      letterSpacing="-0.025em"
      color="white"
      maxW="880px"
      m={0}
      mb={7}
    >
      {headline}
    </Box>
    <Box h="1px" bg="whiteAlpha.500" w="72px" mb={7} />
    <Box
      fontSize="lg"
      lineHeight={1.45}
      color="whiteAlpha.800"
      maxW="480px"
      mb={9}
    >
      {subtext}
    </Box>
    <Button
      borderRadius="md"
      bg="white"
      color={NAVY}
      h="42px"
      px={6}
      fontSize="15px"
      fontWeight="medium"
      _hover={{ bg: "gray.50" }}
      onClick={onCtaClick}
    >
      {ctaLabel}
    </Button>
  </Flex>
);
