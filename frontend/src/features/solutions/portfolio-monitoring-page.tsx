import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

interface CaseStep {
  verb: string;
  body: string;
}

const CASE_STEPS: readonly CaseStep[] = [
  {
    verb: "Migrate",
    body: "Moved the firm off its existing portfolio-monitoring software.",
  },
  {
    verb: "Unify",
    body: "Built a governed data lake of all historical portfolio financials.",
  },
  {
    verb: "Automate",
    body: "Ingested native files without templates or manual review.",
  },
  {
    verb: "Deploy",
    body: "Permissioned the data and made it available to AI tools through MCP.",
  },
  {
    verb: "Operate",
    body: "Maintain and extend applications on the shared foundation.",
  },
];

const WhatItDoesSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
        gap={{ base: 14, lg: 20 }}
        alignItems="start"
      >
        <Box>
          <Text
            fontFamily={EDICT}
            fontSize="xs"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="primary.700"
            mb={5}
          >
            Portfolio Monitoring
          </Text>
          <Box
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "36px", md: "52px" }}
            fontWeight="normal"
            lineHeight={1.04}
            letterSpacing="-0.03em"
            color="primary.800"
            maxW="580px"
            m={0}
          >
            Migrate off legacy software.
            <br />
            <Box as="span" color="primary.500">
              In weeks, not quarters.
            </Box>
          </Box>
        </Box>

        <Box>
          <Text fontSize="lg" lineHeight={1.65} color="gray.600" mb={6}>
            Rengo replaces legacy portfolio-monitoring software with a governed
            data foundation that both your team and your AI can act on.
          </Text>
          <Text fontSize="lg" lineHeight={1.65} color="gray.600">
            Historical financials, native files, and current portfolio context
            are unified into a single, permissioned system of record — made
            available to Claude, Copilot, and your internal tools through MCP.
          </Text>
        </Box>
      </Box>
    </PageContainer>
  </Box>
);

const ImplementationSection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="820px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          Case study · Implementation
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={5}
        >
          In one month, Rengo delivered more than the previous vendor did in
          over a year.
        </Box>
      </Box>

      <Flex
        align="center"
        gap={4}
        mb={{ base: 8, md: 10 }}
        fontFamily={EDICT}
        fontSize="xs"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="primary.500"
      >
        <Box h="1px" flex="0 0 40px" bg="primary.500" />
        <Text>One month</Text>
        <Box h="1px" flex="1" bg="border.muted" />
      </Flex>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
        bg="white"
      >
        {CASE_STEPS.map((step, i) => (
          <Box
            key={step.verb}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={7}
            minH="200px"
            display="flex"
            flexDirection="column"
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              color="gray.400"
              letterSpacing="0.12em"
              mb={5}
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="xl"
              fontWeight="normal"
              letterSpacing="-0.02em"
              color="primary.800"
              m={0}
              mb={3}
            >
              {step.verb}
            </Box>
            <Text fontSize="sm" lineHeight={1.6} color="gray.600">
              {step.body}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

export const PortfolioMonitoringPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    <PageHero
      eyebrow="Solutions"
      headline="Portfolio Monitoring"
      subtext="Purpose built AI for analyzing, structuring, and cataloging portfolio data — deployed on your infrastructure."
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
    <WhatItDoesSection />
    <ImplementationSection />
  </Box>
);
