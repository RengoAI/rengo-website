import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const HeroSection: React.FC = () => (
  <Center minH="100vh" py={20} px={8}>
    <VStack gap={12} maxW="4xl" textAlign="center">
      {/* Main headline */}
      <VStack gap={6}>
        <Text
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
          fontWeight="bold"
          lineHeight={1.1}
          color="gray.900"
          letterSpacing="-0.02em"
        >
          Coming Soon
        </Text>
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          color="gray.600"
          maxW="2xl"
          lineHeight={1.5}
        >
          Building next generation software for alternative investment managers.
        </Text>
      </VStack>
      {/* Trust indicators */}
      <VStack gap={4}>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          Trusted by leading investment firms
        </Text>
        <Flex
          gap={8}
          opacity={0.4}
          fontSize="sm"
          color="gray.400"
          flexWrap="wrap"
          justify="center"
        >
          <Text>Middle Market Private Equity</Text>
          <Text>•</Text>
          <Text>Growth Equity</Text>
          <Text>•</Text>
          <Text>Private Credit</Text>
          <Text>•</Text>
          <Text>Venture Capital</Text>
        </Flex>
      </VStack>
    </VStack>
  </Center>
);
