import { Page } from "@/components/layout/page";
import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const LandingPage: React.FC = () => (
  <Page>
    <Center py={32} px={8} minH="100vh">
      <VStack gap={12} maxW="4xl" textAlign="center">
        {/* Main headline */}
        <VStack gap={8}>
          <Text
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="bold"
            color="primary.700"
          >
            Coming Soon
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            color="gray.600"
            maxW="2xl"
            lineHeight={1.5}
          >
            AI-Native Operating System for Alternative Investment Managers.
          </Text>
        </VStack>

        {/* Trust indicators */}
        <VStack gap={4}>
          <Text
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            color="gray.500"
            fontWeight="medium"
          >
            Trusted by leading investment firms
          </Text>
          <Flex
            gap={8}
            opacity={0.4}
            color="gray.400"
            flexWrap="wrap"
            justify="center"
          >
            <Text fontSize={{ base: "2xs", md: "sm", lg: "md" }}>
              Private Equity
            </Text>
            <Text>•</Text>
            <Text fontSize={{ base: "2xs", md: "sm", lg: "md" }}>
              Venture Capital
            </Text>
            <Text>•</Text>
            <Text fontSize={{ base: "2xs", md: "sm", lg: "md" }}>
              Private Credit
            </Text>
            <Text>•</Text>
            <Text fontSize={{ base: "2xs", md: "sm", lg: "md" }}>
              Growth Equity
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
