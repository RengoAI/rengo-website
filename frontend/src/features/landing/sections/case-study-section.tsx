import { PageContainer } from "@/components/layout/page-container";
import { DeploymentDiagram } from "@/features/landing/sections/deployment-diagram";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

const PILLARS = [
  {
    title: "Dedicated infrastructure",
    body: "We run and operate the platform so your team can focus on the work, not the stack.",
  },
  {
    title: "Applied AI",
    body: "We turn frontier models into production systems that fit how your firm actually works.",
  },
  {
    title: "Own your code",
    body: "Applications and integrations built just for you in your own repository.",
  },
] as const;

export const CaseStudySection: React.FC = () => (
  <Box
    as="section"
    bg="slate.10"
    py={{ base: 16, md: 24 }}
    borderTop="1px solid"
    borderColor="slate.30"
  >
    <PageContainer>
      <Flex direction="column" gap={{ base: 10, md: 12 }} w="full">
        <Box maxW="820px">
          <Box
            as="h2"
            fontFamily="heading"
            fontWeight={350}
            fontSize={{ base: "28px", md: "36px" }}
            lineHeight={1.2}
            letterSpacing="-2px"
            color="indigo.900"
            m={0}
          >
            Deployment with Rengo AI
          </Box>
        </Box>

        <Flex
          align="center"
          justify="center"
          w="full"
          h={{ base: "220px", md: "304px" }}
          overflow="hidden"
        >
          <DeploymentDiagram />
        </Flex>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          }}
          gap={3}
          w="full"
        >
          {PILLARS.map((pillar) => (
            <Box
              key={pillar.title}
              border="1px solid"
              borderColor="slate.30"
              borderRadius={0}
              px={7}
              py={6}
              display="flex"
              flexDirection="column"
              gap={3}
              minH={{ base: "auto", md: "100px" }}
            >
              <Text
                fontFamily="heading"
                fontWeight={350}
                fontSize={{ base: "18px", md: "22px" }}
                lineHeight={1.2}
                letterSpacing="-0.72px"
                color="indigo.900"
                m={0}
              >
                {pillar.title}
              </Text>
              <Text
                fontFamily="body"
                fontSize="16px"
                lineHeight="24px"
                color="slate.50"
                m={0}
              >
                {pillar.body}
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </PageContainer>
  </Box>
);
