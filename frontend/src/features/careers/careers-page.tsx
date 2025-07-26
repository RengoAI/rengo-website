import { Page } from "@/components/layout/page";
import { Box, Center, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const CareersPage: React.FC = () => (
  <Page>
    <Center py={32} px={8} minH="100vh">
      <VStack gap={12} maxW="4xl" textAlign="center">
        {/* Main headline */}
        <VStack gap={6}>
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight="bold"
            lineHeight={1.1}
            color="primary.500"
            letterSpacing="-0.02em"
          >
            Join Us
          </Text>
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight={1.1}
            color="primary.500"
            letterSpacing="-0.02em"
          >
            Build the operating system for alternative investment managers.
          </Text>
          <Box>
            <Text textStyle="body" fontSize="md" color="gray.600" mt={4}>
              Interested in joining our team? Send us your resume at{" "}
              <Link
                href="mailto:careers@getrengo.com"
                color="primary.600"
                textDecoration="underline"
              >
                careers@getrengo.com
              </Link>
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
