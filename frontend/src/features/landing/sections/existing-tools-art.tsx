import { BentoIsoImage } from "@/features/landing/sections/bento-iso-image";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type ExistingToolsArtProps = {
  /** Taller canvas for spotlight sections; default fits bento tiles. */
  size?: "tile" | "spotlight";
};

/**
 * Mosaic of the visual blocks used across the landing bento grid —
 * iso product illustrations instead of a one-off graphic.
 */
export const ExistingToolsArt: React.FC<ExistingToolsArtProps> = ({
  size = "tile",
}) => {
  const isSpotlight = size === "spotlight";
  const isoMaxH = isSpotlight ? "120px" : "96px";
  const isoMaxW = isSpotlight ? "140px" : "112px";
  const maxW = isSpotlight ? "420px" : "100%";
  const minH = isSpotlight ? "280px" : "200px";

  return (
    <Box
      w="full"
      maxW={maxW}
      mx="auto"
      minH={minH}
      aria-hidden
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        align="center"
        justify="center"
        gap={isSpotlight ? 8 : 6}
        w="full"
        maxW={isSpotlight ? "380px" : "320px"}
      >
        <BentoIsoImage
          src="/landing/bento-iso-b.svg"
          maxH={isoMaxH}
          maxW={isoMaxW}
        />
        <BentoIsoImage
          src="/landing/bento-iso-a.svg"
          maxH={isoMaxH}
          maxW={isoMaxW}
        />
      </Flex>
    </Box>
  );
};
