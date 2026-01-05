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
            The first AI-native portfolio monitoring platform for private
            markets.
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
            gap={{ base: 4, md: 8 }}
            opacity={0.4}
            color="gray.400"
            flexWrap="wrap"
            justify="center"
            rowGap={{ base: 2, md: 4 }}
          >
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
              Private Equity
            </Text>
            <Text display={{ base: "none", md: "block" }}>•</Text>
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
              Venture Capital
            </Text>
            <Text display={{ base: "none", md: "block" }}>•</Text>
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
              Private Credit
            </Text>
            <Text display={{ base: "none", md: "block" }}>•</Text>
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
              Growth Equity
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
