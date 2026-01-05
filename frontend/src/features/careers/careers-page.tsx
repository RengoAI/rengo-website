import { Page } from "@/components/layout/page";
import { Box, Center, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const CareersPage: React.FC = () => (
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
            Join Us
          </Text>
          <Box>
            <Text textStyle="body" fontSize="md" color="gray.600" mt={4}>
              Interested in joining our team? Send us your resume at{" "}
              <Link
                href="mailto:careers@rengoai.com"
                color="primary.600"
                textDecoration="underline"
              >
                careers@rengoai.com
              </Link>
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Center>
  </Page>
);
