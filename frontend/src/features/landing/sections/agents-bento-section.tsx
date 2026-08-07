import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

/**
 * "Review bot" illustration (node 115:1675) — a document outline overlaid with
 * redaction-style bars, where indigo bars mark the values an agent picked out.
 * Bar widths are taken from the design; `flex` keeps them proportional.
 */
const REVIEW_BOT_ROWS: { w: number; tone: "grey" | "indigo" | "slate" }[][] = [
  [
    { w: 128, tone: "grey" },
    { w: 128, tone: "grey" },
  ],
  [
    { w: 47, tone: "grey" },
    { w: 8, tone: "indigo" },
    { w: 128, tone: "grey" },
    { w: 8, tone: "slate" },
    { w: 67, tone: "grey" },
  ],
  [
    { w: 8, tone: "indigo" },
    { w: 128, tone: "grey" },
    { w: 8, tone: "indigo" },
    { w: 91, tone: "grey" },
  ],
  [
    { w: 128, tone: "grey" },
    { w: 128, tone: "grey" },
  ],
];

const BAR_TONE = {
  grey: "slate.30",
  indigo: "indigo.700",
  slate: "slate.40",
} as const;

const ReviewBotArt: React.FC = () => (
  <Box
    position="relative"
    w="full"
    maxW="240px"
    bg="slate.20"
    border="1px solid"
    borderColor="slate.40"
    px={3}
    py={3}
    aria-hidden
  >
    <Text
      fontFamily="mono"
      fontSize="8px"
      letterSpacing="1px"
      textTransform="uppercase"
      color="indigo.700"
      mb={3}
      m={0}
    >
      Review Bot
    </Text>
    <Box display="flex" flexDirection="column" gap={2} pt={2}>
      {REVIEW_BOT_ROWS.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" gap={1} alignItems="center">
          {row.map((bar, barIndex) => (
            <Box
              key={barIndex}
              h="7px"
              flex={`${bar.w} 0 auto`}
              minW={0}
              bg={BAR_TONE[bar.tone]}
            />
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

/**
 * Bento tiles. `area` values map to the 7-col x 4-row grid in the design
 * (node 115:1474); on mobile every tile spans the full single column.
 */
const TILES = [
  {
    label: "Built on top of your existing tools and systems",
    art: "/landing/bento-iso-a.svg",
    col: "1 / span 3",
    row: "1 / span 2",
  },
  {
    label: "Single source of truth",
    art: "/landing/bento-iso-b.svg",
    col: "4 / span 2",
    row: "1 / span 2",
  },
  {
    label: "Control access & permissions",
    art: "/landing/bento-iso-c.svg",
    col: "6 / span 2",
    row: "1 / span 2",
  },
  {
    label: "Govern the ontology of your data",
    art: null,
    col: "1 / span 2",
    row: "3 / span 2",
  },
  {
    label: "Wire directly into Claude, Copilot, or your own tools",
    art: "/landing/bento-iso-d.svg",
    col: "3 / span 3",
    row: "3 / span 2",
  },
  {
    label: "Run agents",
    art: "/landing/bento-iso-a.svg",
    col: "6 / span 2",
    row: "3 / span 2",
  },
] as const;

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
        Build your{" "}
        <Box as="span" color="accent.link">
          AI Advantage
        </Box>
        .
        <br />
        Let agents execute recurring workflows.
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(7, minmax(0, 1fr))" }}
        templateRows={{ base: "auto", md: "repeat(4, minmax(0, 1fr))" }}
        gap={2}
        minH={{ base: "auto", md: "769px" }}
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
              {tile.art ? (
                <Image
                  src={tile.art}
                  alt=""
                  aria-hidden
                  maxH="217px"
                  maxW="240px"
                  w="auto"
                  h="auto"
                  objectFit="contain"
                  css={{ mixBlendMode: "color-burn" }}
                />
              ) : (
                <ReviewBotArt />
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
