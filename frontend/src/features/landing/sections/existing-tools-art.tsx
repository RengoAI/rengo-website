import { AccessRolesArt } from "@/features/landing/sections/access-roles-art";
import { BentoIsoImage } from "@/features/landing/sections/bento-iso-image";
import { ConnectSystemsArt } from "@/features/landing/sections/connect-systems-art";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

type ExistingToolsArtProps = {
  /** Taller canvas for spotlight sections; default fits bento tiles. */
  size?: "tile" | "spotlight";
};

/**
 * Mosaic of the same visual blocks used across the landing bento grid —
 * iso blocks, vendor connectors, and access roles — instead of a one-off illustration.
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
      <Grid
        templateColumns="repeat(2, minmax(0, 1fr))"
        templateRows="repeat(2, minmax(0, 1fr))"
        gap={isSpotlight ? 4 : 3}
        w="full"
        maxW={isSpotlight ? "380px" : "320px"}
        alignItems="center"
        justifyItems="center"
      >
        <GridItem
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BentoIsoImage
            src="/landing/bento-iso-b.svg"
            maxH={isoMaxH}
            maxW={isoMaxW}
          />
        </GridItem>

        <GridItem w="full">
          <ConnectSystemsArt variant={isSpotlight ? "tile" : "compact"} />
        </GridItem>

        <GridItem w="full" display="flex" justifyContent="center">
          <AccessRolesArt variant={isSpotlight ? "tile" : "compact"} />
        </GridItem>

        <GridItem
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BentoIsoImage
            src="/landing/bento-iso-a.svg"
            maxH={isoMaxH}
            maxW={isoMaxW}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
