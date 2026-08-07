import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Decorative floating "data card" composition that sits to the right of the
 * hero copy. Positions mirror the Figma layout (node 115:1394) as percentages
 * of the hero box so the arrangement survives resizing.
 */
const HERO_CARDS = [
  { src: "/landing/hero-card-wide.png", left: "34%", top: "17%", w: "426px" },
  { src: "/landing/hero-card-mid.png", left: "40%", top: "39%", w: "321px" },
  { src: "/landing/hero-card-wide.png", left: "64%", top: "30%", w: "426px" },
  { src: "/landing/hero-card-wide.png", left: "63%", top: "50%", w: "426px" },
  { src: "/landing/hero-card-sm.png", left: "51%", top: "59%", w: "166px" },
  { src: "/landing/hero-card-sm.png", left: "67%", top: "22%", w: "166px" },
  { src: "/landing/hero-card-tile.png", left: "72%", top: "85%", w: "216px" },
] as const;

/** Dashed placeholder frames from the design, drawn as borders rather than art. */
const HERO_FRAMES = [
  { left: "35%", top: "67%", w: "375px", h: "127px" },
  { left: "44%", top: "85%", w: "401px", h: "105px" },
  { left: "61%", top: "70%", w: "468px", h: "105px" },
] as const;

const HeroArtwork: React.FC = () => (
  <Box
    position="absolute"
    inset={0}
    pointerEvents="none"
    aria-hidden
    display={{ base: "none", lg: "block" }}
    overflow="hidden"
  >
    {HERO_CARDS.map((card, i) => (
      <Image
        key={`card-${i}`}
        src={card.src}
        alt=""
        position="absolute"
        left={card.left}
        top={card.top}
        w={card.w}
        maxW="none"
        userSelect="none"
      />
    ))}

    {HERO_FRAMES.map((frame, i) => (
      <Box
        key={`frame-${i}`}
        position="absolute"
        left={frame.left}
        top={frame.top}
        w={frame.w}
        h={frame.h}
        border="1px dashed"
        borderColor="slate.40"
        borderRadius="2px"
      />
    ))}
  </Box>
);

interface LandingHeroProps {
  onCtaClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onCtaClick }) => (
  <Box
    as="section"
    position="relative"
    bg="slate.10"
    minH={{ base: "auto", lg: "702px" }}
    display="flex"
    alignItems="stretch"
    overflow="hidden"
  >
    <HeroArtwork />

    {/* Left rule — the 80px gutter spacer from the design */}
    <Box
      display={{ base: "none", md: "block" }}
      w="80px"
      flexShrink={0}
      borderRight="1px solid"
      borderColor="slate.30"
    />

    <Flex
      position="relative"
      zIndex={1}
      flex="1"
      direction="column"
      justify={{ base: "center", lg: "flex-end" }}
      gap={7}
      px={{ base: 6, md: 10 }}
      pt={{ base: 32, lg: 0 }}
      pb={{ base: 20, lg: "223px" }}
    >
      <Flex direction="column" gap={2}>
        <Box
          as="h1"
          fontFamily="heading"
          fontWeight={350}
          fontSize={{ base: "34px", md: "44px" }}
          lineHeight={1.1}
          letterSpacing="-3px"
          color="indigo.900"
          maxW="480px"
          m={0}
        >
          Your data is{" "}
          <Box as="span" color="accent.link">
            your alpha
          </Box>
        </Box>

        <Text
          fontFamily="body"
          fontSize="16px"
          lineHeight={1.4}
          color="indigo.700"
          maxW="420px"
          m={0}
        >
          Rengo AI will help you put your data to work
        </Text>
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
        _hover={{ bg: "indigo.700" }}
        onClick={onCtaClick}
      >
        Get Started →
      </Button>
    </Flex>

    <Box
      display={{ base: "none", md: "block" }}
      w="80px"
      flexShrink={0}
      borderLeft="1px solid"
      borderColor="slate.30"
    />
  </Box>
);
