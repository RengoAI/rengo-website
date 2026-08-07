import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

/**
 * Access / roles illustration — same chrome as Review Bot (slate panel, mono
 * label, indigo accent), with a Mintlify-style role list: dimmed peers and a
 * highlighted Admin row.
 */
const ACCESS_ROLES = [
  { name: "Alex Chen", role: "Analyst", active: false },
  { name: "Sam Rivera", role: "Admin", active: true },
  { name: "Jordan Lee", role: "Partner", active: false },
] as const;

const AccessRolesArt: React.FC = () => (
  <Box
    position="relative"
    w="full"
    maxW="260px"
    bg="white"
    border="1px solid"
    borderColor="slate.40"
    boxShadow="0 4px 24px rgba(33, 48, 68, 0.08)"
    px={3}
    py={3}
    aria-hidden
  >
    <Text
      fontFamily="mono"
      fontSize="9px"
      letterSpacing="1px"
      textTransform="uppercase"
      color="indigo.700"
      mb={3}
      m={0}
    >
      Access
    </Text>
    <Box display="flex" flexDirection="column" gap={2}>
      {ACCESS_ROLES.map((person) => (
        <Box
          key={person.name}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          px={2.5}
          py={2}
          border="1px solid"
          borderColor={person.active ? "indigo.700" : "slate.30"}
          bg={person.active ? "slate.10" : "transparent"}
          opacity={person.active ? 1 : 0.65}
        >
          <Box display="flex" alignItems="center" gap={2.5} minW={0}>
            <Box
              w="18px"
              h="18px"
              borderRadius="full"
              flexShrink={0}
              bg={person.active ? "indigo.700" : "slate.40"}
            />
            <Text
              fontFamily="body"
              fontSize="11px"
              fontWeight={person.active ? "medium" : "normal"}
              color="indigo.900"
              lineHeight={1.2}
              m={0}
              noOfLines={1}
            >
              {person.name}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5} flexShrink={0}>
            <Box
              w="5px"
              h="5px"
              borderRadius="full"
              bg={person.active ? "indigo.700" : "slate.40"}
            />
            <Text
              fontFamily="mono"
              fontSize="9px"
              letterSpacing="0.5px"
              textTransform="uppercase"
              color={person.active ? "indigo.700" : "slate.50"}
              m={0}
            >
              {person.role}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

type TileArt = { kind: "image"; src: string } | { kind: "roles" };

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
    label: "Wire directly into Claude, Copilot, or your own tools",
    art: { kind: "image", src: "/landing/bento-iso-d.svg" },
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
          Turn proprietary knowledge into operating leverage
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
              justifyContent="center"
              minH={0}
            >
              {tile.art.kind === "roles" ? (
                <AccessRolesArt />
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
