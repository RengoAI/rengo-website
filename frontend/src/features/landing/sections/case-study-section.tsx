import { PageContainer } from "@/components/layout/page-container";
import { DeploymentCards } from "@/features/landing/sections/deployment-cards";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

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
            Principles to deploying AI
          </Box>
        </Box>

        <DeploymentCards />
      </Flex>
    </PageContainer>
  </Box>
);
