import { SectionShell } from "@/features/landing/sections/section-shell";
import {
  HardProblemsArt,
  RigorArt,
  ShipFastArt,
  SmallTeamArt,
} from "@/features/careers/values-art";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

/**
 * "Why join" — four numbered value blocks, each paired with an isometric
 * figure, alternating which side the figure sits on.
 *
 * The numbering and the alternating rhythm give the page structure between the
 * hero and the founders; the figures reuse the landing grid's isometric
 * language so the site reads as one system rather than a set of pages.
 */

const VALUES: {
  n: string;
  title: string;
  body: string;
  Art: React.FC;
}[] = [
  {
    n: "01",
    title: "Work on the hardest part of AI",
    body: "Models are not the bottleneck — data infrastructure is. We build the ingestion, ontology, and governance that make AI usable inside a firm, then keep it running in production.",
    Art: HardProblemsArt,
  },
  {
    n: "02",
    title: "A small team with real ownership",
    body: "There are no layers to route around and no work that is beneath anyone. You will own systems end to end, talk directly to the firms using them, and see your decisions in production the same week.",
    Art: SmallTeamArt,
  },
  {
    n: "03",
    title: "Institutional rigor from day one",
    body: "Our customers manage other people's capital, so governance is not a later phase. Isolation, permissions, and lineage are designed in — and customer data is never used to train models.",
    Art: RigorArt,
  },
  {
    n: "04",
    title: "Ship in weeks, not quarters",
    body: "We migrated a firm off its existing portfolio-monitoring software, built a governed data lake of its history, and had agents running on it inside a month. That pace is the product.",
    Art: ShipFastArt,
  },
];

export const WhyJoinSection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Flex direction="column" gap={{ base: 12, md: "64px" }}>
      {VALUES.map((v, i) => {
        const figureFirst = i % 2 === 1;
        return (
          <Grid
            key={v.n}
            templateColumns={{ base: "1fr", md: "repeat(12, minmax(0, 1fr))" }}
            gap={{ base: 8, md: 10 }}
            alignItems="center"
          >
            <GridItem
              gridColumn={{
                base: "auto",
                md: figureFirst ? "7 / span 6" : "1 / span 6",
              }}
              gridRow={{ base: 2, md: "1" }}
            >
              <Flex direction="column" gap={4}>
                <Text
                  fontFamily="mono"
                  fontSize="12px"
                  letterSpacing="1px"
                  color="accent.link"
                  m={0}
                >
                  {v.n}
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "26px", md: "32px" }}
                  lineHeight={1.15}
                  letterSpacing="-0.6px"
                  color="indigo.900"
                  m={0}
                >
                  {v.title}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "15px", md: "16px" }}
                  lineHeight={1.6}
                  color="slate.100"
                  maxW="46ch"
                  m={0}
                >
                  {v.body}
                </Text>
              </Flex>
            </GridItem>

            <GridItem
              gridColumn={{
                base: "auto",
                md: figureFirst ? "1 / span 5" : "8 / span 5",
              }}
              gridRow={{ base: 1, md: "1" }}
            >
              <Box
                bg="slate.20"
                border="1px solid"
                borderColor="slate.30"
                borderRadius="3px"
                px={{ base: 5, md: 6 }}
                py={{ base: 6, md: 8 }}
                h={{ base: "200px", md: "232px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <v.Art />
              </Box>
            </GridItem>
          </Grid>
        );
      })}
    </Flex>
  </SectionShell>
);
