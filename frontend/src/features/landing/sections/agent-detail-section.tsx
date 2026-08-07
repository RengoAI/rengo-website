import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const AGENTS = [
  {
    name: "Ingestion",
    tagline: "Knows how your data is structured.",
    body: "Watch email, portals, and shared drives. Pull, parse, and route incoming documents into the ontology without templates.",
  },
  {
    name: "Reconciliation",
    tagline: "Make sure everything agrees.",
    body: "Continuously match figures across models, ledger entries, and reporting workflows. Flag drift the moment it happens.",
  },
  {
    name: "Synthesis",
    tagline: "Turn structure into meaning.",
    body: "Draft memos, letters, and briefs on demand — grounded in current portfolio state, permissioned to the requester.",
  },
] as const;

export const AgentDetailSection: React.FC = () => (
  <Box
    as="section"
    w="full"
    px={{ base: 6, md: "80px" }}
    py={{ base: 16, md: "80px" }}
  >
    <Flex
      direction="column"
      align={{ base: "flex-start", md: "flex-end" }}
      pb={5}
    >
      <Box
        as="h2"
        fontFamily="heading"
        fontWeight={350}
        fontSize={{ base: "28px", md: "36px" }}
        lineHeight={1.2}
        letterSpacing="-2px"
        color="indigo.900"
        maxW="681px"
        m={0}
      >
        <Box as="p" m={0}>
          Three agents.
          <Box as="span" color="accent.link">
            {" "}
            One coordinated system.
          </Box>
        </Box>
        <Box as="p" m={0}>
          Simplify the systems your firm already uses — email, ledger, portals,
          files.
        </Box>
      </Box>
    </Flex>

    <Box w="full">
      {AGENTS.map((agent) => (
        <Flex
          key={agent.name}
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-start" }}
          gap={{ base: 3, md: 10 }}
          borderBottom="1px dashed"
          borderColor="slate.40"
          py={7}
          minH={{ base: "auto", md: "100px" }}
        >
          <Flex
            direction="column"
            gap={2}
            w={{ base: "full", md: "210px" }}
            flexShrink={0}
          >
            <Text
              fontFamily="body"
              fontWeight="medium"
              fontSize="24px"
              lineHeight={1.2}
              letterSpacing="-1px"
              color="indigo.900"
              m={0}
            >
              {agent.name}
            </Text>
            <Text
              fontFamily="body"
              fontWeight="medium"
              fontSize="12px"
              lineHeight="18px"
              color="indigo.700"
              m={0}
            >
              {agent.tagline}
            </Text>
          </Flex>
          <Text
            fontFamily="body"
            fontSize="15px"
            lineHeight="24.75px"
            color="gray.600"
            maxW="720px"
            m={0}
          >
            {agent.body}
          </Text>
        </Flex>
      ))}
    </Box>
  </Box>
);
