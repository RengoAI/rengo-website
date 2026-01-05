import { Page } from "@/components/layout/page";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const TRUST_ITEMS = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Fund of Funds",
  "Family Offices",
];

const scroll = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const LogoMarquee: React.FC = () => (
  <Box
    position="relative"
    width="100vw"
    overflow="hidden"
    css={{
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
  >
    <Flex
      gap={16}
      width="max-content"
      css={{
        animation: `${scroll} 80s linear infinite`,
      }}
    >
      {/* Repeat items to fill screen width */}
      {Array(6)
        .fill(TRUST_ITEMS)
        .flat()
        .map((item, index) => (
          <Text
            key={index}
            fontSize={{ base: "sm", md: "md" }}
            color="gray.400"
            whiteSpace="nowrap"
            fontWeight="medium"
          >
            {item}
          </Text>
        ))}
    </Flex>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Page>
    <VStack h="calc(100vh - 64px)" width="100%">
      {/* Main content - centered in upper area */}
      <Flex flex={1} alignItems="center" justifyContent="center">
        <VStack gap={8} maxW="4xl" textAlign="center" px={8}>
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
      </Flex>

      {/* Trust indicators - pinned to bottom */}
      <VStack gap={4} width="100%" pb={64}>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.500"
          fontWeight="medium"
        >
          Trusted by leading investment firms
        </Text>
        <LogoMarquee />
      </VStack>
    </VStack>
  </Page>
);
