import { rootRoute } from "@/app/app-routes";
import { Logo } from "@/components/logo/logo";
import { Box, Container, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const AppFooter: React.FC = () => (
  <Box bg="primary.700" py={12}>
    <Container maxW="6xl" px={16}>
      <VStack gap={8}>
        {/* Top section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          w="full"
          gap={8}
        >
          {/* Logo and description */}
          <VStack
            align={{ base: "center", md: "flex-start" }}
            gap={4}
            maxW="md"
          >
            <Logo color="white" />
          </VStack>

          <VStack align={{ base: "center", md: "flex-start" }} gap={3}>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Solutions
            </Text>
            <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
              <Link to={rootRoute({}).solutions({}).portfolioMonitoring({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Portfolio Monitoring
                </Text>
              </Link>
              <Link to={rootRoute({}).solutions({}).dataConnectors({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Data Connectors
                </Text>
              </Link>
            </VStack>
          </VStack>

          <VStack align={{ base: "center", md: "flex-start" }} gap={3}>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Legal
            </Text>
            <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
              <Link to={rootRoute({}).legal({}).privacyPolicy({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Privacy Policy
                </Text>
              </Link>
              <Link to={rootRoute({}).legal({}).termsOfService({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Terms of Service
                </Text>
              </Link>
              <Link to={rootRoute({}).legal({}).security({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Security
                </Text>
              </Link>
            </VStack>
          </VStack>

          {/* Quick links */}
          <VStack align={{ base: "center", md: "flex-start" }} gap={3}>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Company
            </Text>
            <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
              <Link to={rootRoute({}).blog({}).changelog({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Changelog
                </Text>
              </Link>
              <Link to={rootRoute({}).careers({}).$}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "gray.100" }}
                >
                  Careers
                </Text>
              </Link>
            </VStack>
          </VStack>
        </Flex>

        {/* Bottom section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="full"
          pt={8}
          borderTop="1px solid"
          borderColor="primary.600"
          gap={4}
        >
          <Text fontSize="sm" color="gray.200">
            © 2025 Rengo AI, Inc. All rights reserved.
          </Text>
          <HStack gap={6}>
            <Text
              fontSize="sm"
              color="gray.200"
              cursor="pointer"
              _hover={{ color: "white" }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/106703002",
                  "_blank",
                )
              }
            >
              LinkedIn
            </Text>
            <Text
              fontSize="sm"
              color="gray.200"
              cursor="pointer"
              _hover={{ color: "white" }}
              onClick={() => window.open("mailto:sales@getrengo.com", "_blank")}
            >
              Contact
            </Text>
          </HStack>
        </Flex>
      </VStack>
    </Container>
  </Box>
);
