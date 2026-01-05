import { Page } from "@/components/layout/page";
import { Center, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const PortfolioMonitoringPage: React.FC = () => (
  <Page>
    <Center py={32} px={8} minH="100vh">
      <VStack gap={12} maxW="4xl" textAlign="left">
        {/* Main headline */}
        <VStack gap={1} align="flex-start">
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="medium"
            lineHeight={1.1}
            color="primary.700"
            letterSpacing="-0.02em"
          >
            Portfolio Monitoring
          </Text>
          <Text textStyle="body" fontSize="md" color="gray.600" mt={4}>
            Real-time portfolio analytics and monitoring for private equity,
            venture capital, private credit, and growth equity investments.
          </Text>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
