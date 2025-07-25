import { rootRoute } from "@/app/app-routes";
import { Logo } from "@/components/logo/logo";
import { Box, Container, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AppFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box bg="primary.700" py={12}>
      <Container maxW="6xl" px={8}>
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

            {/* Quick links */}
            <VStack align={{ base: "center", md: "flex-start" }} gap={3}>
              <Text fontSize="sm" fontWeight="semibold" color="white">
                Connect
              </Text>
              <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
                <Text
                  fontSize="sm"
                  color="white"
                  cursor="pointer"
                  _hover={{ color: "white" }}
                >
                  sales@getrengo.com
                </Text>
                <Text
                  fontSize="sm"
                  color="white"
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
              </VStack>
            </VStack>
          </Flex>

          {/* Bottom section */}
          <Box w="full" pt={8} borderTop="1px solid" borderColor="white">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
              gap={4}
            >
              <Text fontSize="sm" color="white">
                © 2025 Rengo AI, Inc.
              </Text>
              <HStack gap={6} fontSize="sm" color="white">
                <Text
                  cursor="pointer"
                  variant="helperLink"
                  color="white"
                  _hover={{ color: "white" }}
                >
                  Privacy Policy
                </Text>
                <Text
                  cursor="pointer"
                  variant="helperLink"
                  color="white"
                  _hover={{ color: "gray.100" }}
                  onClick={() =>
                    navigate(rootRoute({}).legal({}).termsOfService({}).$, {
                      replace: true,
                    })
                  }
                >
                  Terms of Service
                </Text>
              </HStack>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
