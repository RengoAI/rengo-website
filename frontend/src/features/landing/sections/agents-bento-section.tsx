import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
  marketingLayoutBorderColor,
  marketingCardBorderColor,
} from "@/components/layout/marketing-frame";
import { AccessRolesArt } from "@/features/landing/sections/access-roles-art";
import { AgentsActArt } from "@/features/landing/sections/agents-act-art";
import { ManageAgentsArt } from "@/features/landing/sections/manage-agents-art";
import { BentoIsoImage } from "@/features/landing/sections/bento-iso-image";
import { CollectiveSearchArt } from "@/features/landing/sections/collective-search-art";
import { DeploymentDiagram } from "@/features/landing/sections/deployment-diagram";
import { ExistingToolsArt } from "@/features/landing/sections/existing-tools-art";
import { DeploymentCards } from "@/features/landing/sections/deployment-cards";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

type TileArt =
  | { kind: "image"; src: string }
  | { kind: "roles" }
  | { kind: "collectiveSearch" }
  | { kind: "existingTools" }
  | { kind: "deployment" }
  | { kind: "agentsAct" }
  | { kind: "manageAgents" };

const TILES: {
  label: string;
  art: TileArt;
  col: string;
  row: string;
}[] = [
  {
    label: "Connect with your systems",
    art: { kind: "deployment" },
    col: "1 / span 8",
    row: "1",
  },
  {
    label: "Control who has access",
    art: { kind: "roles" },
    col: "9 / span 4",
    row: "1",
  },
  {
    label: "Manage automations",
    art: { kind: "manageAgents" },
    col: "1 / span 4",
    row: "2",
  },
  {
    label: "Structure knowledge",
    art: { kind: "agentsAct" },
    col: "5 / span 4",
    row: "2",
  },
  {
    label: "Unlock collective intelligence",
    art: { kind: "collectiveSearch" },
    col: "9 / span 4",
    row: "2",
  },
];

export const AgentsBentoSection: React.FC = () => (
  <Box
    as="section"
    w="full"
    bg="slate.10"
    borderTop="1px solid"
    borderColor={marketingLayoutBorderColor}
  >
    {/* Ruled frame: bento + principles title (inside section padding). */}
    <MarketingPageWidth>
      <Flex w="full" align="stretch">
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderRightWidth="1px"
          borderRightStyle="solid"
          borderRightColor={marketingLayoutBorderColor}
        />
        <Box
          flex="1"
          minW={0}
          px={marketingContentPaddingX}
          pt={{ base: 16, md: "80px" }}
          pb={0}
          borderLeftWidth={{ base: "1px", md: 0 }}
          borderRightWidth={{ base: "1px", md: 0 }}
          borderLeftStyle="solid"
          borderRightStyle="solid"
          borderLeftColor={marketingLayoutBorderColor}
          borderRightColor={marketingLayoutBorderColor}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={{ base: 10, md: "60px" }}
          >
            <SectionHeading>
              Build your AI advantage
              <br />
              <Box as="span" color="slate.50" fontWeight={300}>
                Applications and agents tailored to your team
              </Box>
            </SectionHeading>

            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(12, minmax(0, 1fr))",
              }}
              templateRows={{
                base: "auto",
                md: "repeat(2, minmax(280px, 1fr))",
              }}
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
                  borderColor={marketingCardBorderColor}
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
                    ) : tile.art.kind === "collectiveSearch" ? (
                      <CollectiveSearchArt />
                    ) : tile.art.kind === "existingTools" ? (
                      <ExistingToolsArt />
                    ) : tile.art.kind === "deployment" ? (
                      <DeploymentDiagram size="tile" />
                    ) : tile.art.kind === "agentsAct" ? (
                      <AgentsActArt />
                    ) : tile.art.kind === "manageAgents" ? (
                      <ManageAgentsArt />
                    ) : (
                      <BentoIsoImage src={tile.art.src} />
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

            <Box py={{ base: 8, md: 12 }}>
              <SectionHeading maxW="820px">
                Our engineering principles
                <br />
                <Box as="span" color="slate.50" fontWeight={300}>
                  We build AI systems for production, bringing elite engineering
                  to your business
                </Box>
              </SectionHeading>
            </Box>
          </Box>
        </Box>
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderLeftWidth="1px"
          borderLeftStyle="solid"
          borderLeftColor={marketingLayoutBorderColor}
        />
      </Flex>
    </MarketingPageWidth>

    <Box
      w="full"
      borderTop="1px solid"
      borderColor={marketingLayoutBorderColor}
    />

    <MarketingPageWidth variant="content" py={{ base: 10, md: 12 }}>
      <DeploymentCards />
    </MarketingPageWidth>
  </Box>
);
