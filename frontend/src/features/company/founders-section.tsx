import { PageContainer } from "@/components/layout/page-container";
import { TeamLogoGrid } from "@/components/team-logo-grid";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const FoundersSection: React.FC = () => (
  <Box
    as="section"
    bg="slate.10"
    py={24}
    borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="slate.30"
  >
    <PageContainer>
      <Box maxW="720px" mb={16}>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "48px" }}
          fontWeight={350}
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="indigo.900"
          m={0}
          mb={4}
        >
          We&apos;re a team of builders
        </Box>
        <Text
          fontFamily="heading"
          fontWeight={300}
          fontSize={{ base: "26px", md: "32px" }}
          lineHeight={1.2}
          letterSpacing="-2px"
          color="slate.50"
          maxW="648px"
          m={0}
        >
          From world class engineering teams
        </Text>
      </Box>

      <TeamLogoGrid />
    </PageContainer>
  </Box>
);
