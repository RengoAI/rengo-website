import { ConnectSystemsArt } from "@/features/landing/sections/connect-systems-art";
import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

/**
 * Access / roles illustration — centered in tile; role labels right-aligned.
 */
const ACCESS_ROLES = [
  { role: "Viewer" },
  { role: "Admin", outlined: true },
  { role: "Editor" },
] as const;

const TILE_PAD_PX = 28;
/** Extends past tile padding so rows clip at the card edge / radius. */
const ROLES_BLEED_PX = TILE_PAD_PX + 6;

const AccessRolesArt: React.FC = () => (
  <Box
    w={`calc(100% + ${ROLES_BLEED_PX}px)`}
    mr={`-${ROLES_BLEED_PX}px`}
    display="flex"
    flexDirection="column"
    gap={2}
    justifyContent="center"
    flex="1"
    minH={0}
    aria-hidden
  >
    {ACCESS_ROLES.map((person) => {
      const isAdmin = "outlined" in person && person.outlined;
      return (
        <Box
          key={person.role}
          display="flex"
          alignItems="center"
          gap={2.5}
          ml="auto"
          w={isAdmin ? "92%" : "76%"}
          minH={isAdmin ? "44px" : "38px"}
          pl={3}
          pr={4}
          bg="white"
          border="1px solid"
          borderColor="slate.30"
          borderRight="none"
          borderRadius="8px 0 0 8px"
          boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
        >
          <Box
            w="16px"
            h="16px"
            borderRadius="full"
            flexShrink={0}
            bg="slate.40"
          />
          <Box
            h="6px"
            flex="1"
            minW={0}
            maxW={isAdmin ? "96px" : "72px"}
            bg="slate.40"
            opacity={0.85}
          />
          <Text
            fontFamily="body"
            fontSize="11px"
            fontWeight="medium"
            lineHeight="14px"
            letterSpacing="-0.2px"
            color="indigo.700"
            m={0}
            ml="auto"
            flexShrink={0}
            textAlign="right"
          >
            {person.role}
          </Text>
        </Box>
      );
    })}
  </Box>
);

type TileArt =
  | { kind: "image"; src: string }
  | { kind: "roles" }
  | { kind: "systems" };

const TILES: {
  label: string;
  art: TileArt;
  col: string;
  row: string;
}[] = [
  {
    label: "Built on top of your existing tools and systems",
    art: { kind: "image", src: "/landing/bento-iso-a.svg" },
    col: "1 / span 8",
    row: "1",
  },
  {
    label: "Single source of truth",
    art: { kind: "image", src: "/landing/bento-iso-b.svg" },
    col: "9 / span 4",
    row: "1",
  },
  {
    label: "Control who has access",
    art: { kind: "roles" },
    col: "1 / span 4",
    row: "2",
  },
  {
    label: "Connect with your systems",
    art: { kind: "systems" },
    col: "5 / span 4",
    row: "2",
  },
  {
    label: "Run agents",
    art: { kind: "image", src: "/landing/bento-iso-a.svg" },
    col: "9 / span 4",
    row: "2",
  },
];

export const AgentsBentoSection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Box display="flex" flexDirection="column" gap={{ base: 10, md: "60px" }}>
      <Box
        as="h2"
        fontFamily="heading"
        fontWeight={350}
        fontSize={{ base: "26px", md: "32px" }}
        lineHeight={1.2}
        letterSpacing="-2px"
        color="indigo.900"
        maxW="648px"
        m={0}
      >
        Build your AI Advantage
        <br />
        <Box as="span" color="slate.50" fontWeight={300}>
          Applications and agents tailored to your team
        </Box>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(12, minmax(0, 1fr))" }}
        templateRows={{ base: "auto", md: "repeat(2, minmax(280px, 1fr))" }}
        gap={2}
        w="full"
      >
        {TILES.map((tile) => (
          <GridItem
            key={tile.label}
            gridColumn={{ base: "auto", md: tile.col }}
            gridRow={{ base: "auto", md: tile.row }}
            bg="slate.20"
            border="1px solid"
            borderColor="slate.30"
            borderRadius="3px"
            p={7}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={6}
            minH={{ base: "240px", md: "auto" }}
            overflow="hidden"
          >
            <Box
              flex="1"
              display="flex"
              alignItems="center"
              justifyContent={
                tile.art.kind === "roles" ? "stretch" : "center"
              }
              minH={0}
              w="full"
            >
              {tile.art.kind === "roles" ? (
                <AccessRolesArt />
              ) : tile.art.kind === "systems" ? (
                <ConnectSystemsArt />
              ) : (
                <Image
                  src={tile.art.src}
                  alt=""
                  aria-hidden
                  maxH="217px"
                  maxW="240px"
                  w="auto"
                  h="auto"
                  objectFit="contain"
                  css={{ mixBlendMode: "color-burn" }}
                />
              )}
            </Box>
            <Text
              fontFamily="body"
              fontSize="18px"
              lineHeight={1.2}
              letterSpacing="-0.4px"
              color="indigo.700"
              m={0}
            >
              {tile.label}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  </SectionShell>
);
