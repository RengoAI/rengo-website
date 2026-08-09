import { AccessRolesArt } from "@/features/landing/sections/access-roles-art";
import { AgentsActArt } from "@/features/landing/sections/agents-act-art";
import { ManageAgentsArt } from "@/features/landing/sections/manage-agents-art";
import { BentoIsoImage } from "@/features/landing/sections/bento-iso-image";
import { ConnectSystemsArt } from "@/features/landing/sections/connect-systems-art";
import { DeploymentDiagram } from "@/features/landing/sections/deployment-diagram";
import { ExistingToolsArt } from "@/features/landing/sections/existing-tools-art";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

type TileArt =
  | { kind: "image"; src: string }
  | { kind: "roles" }
  | { kind: "systems" }
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
    label: "Manage agents",
    art: { kind: "manageAgents" },
    col: "1 / span 4",
    row: "2",
  },
  {
    label: "Structure Knowledge",
    art: { kind: "agentsAct" },
    col: "5 / span 4",
    row: "2",
  },
  {
    label: "Unlock collective intelligence",
    art: { kind: "systems" },
    col: "9 / span 4",
    row: "2",
  },
];

export const AgentsBentoSection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Box display="flex" flexDirection="column" gap={{ base: 10, md: "60px" }}>
      <SectionHeading>
        Build your AI Advantage
        <br />
        <Box as="span" color="slate.50" fontWeight={300}>
          Applications and agents tailored to your team
        </Box>
      </SectionHeading>

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
              justifyContent={tile.art.kind === "roles" ? "stretch" : "center"}
              minH={0}
              w="full"
            >
              {tile.art.kind === "roles" ? (
                <AccessRolesArt />
              ) : tile.art.kind === "systems" ? (
                <ConnectSystemsArt />
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
    </Box>
  </SectionShell>
);
