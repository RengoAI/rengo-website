import { Page } from "@/components/layout/page";
import { Center, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const PortfolioMonitoringPage: React.FC = () => (
  <Page>
    <Center py={32} px={8} minH="100vh">
      <VStack gap={12} maxW="4xl" textAlign="center">
        {/* Main headline */}
        <VStack gap={6}>
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight={1.1}
            color="primary.500"
            letterSpacing="-0.02em"
          >
            Comprehensive Portfolio Intelligence
          </Text>
          <Text textStyle="body" fontSize="md" color="gray.600" mt={4}>
            Real-time portfolio analytics and monitoring for private data
            investments. Track performance, manage risk, and optimize your
            investment strategies with comprehensive insights.
          </Text>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
