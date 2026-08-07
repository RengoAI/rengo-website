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
          We know the work
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="slate.50" maxW="560px" m={0}>
          Our team brings experience across asset-management workflows and
          infrastructure.
        </Text>
      </Box>

      <TeamLogoGrid />
    </PageContainer>
  </Box>
);
