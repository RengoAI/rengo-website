import { getChangelogEntriesByYearAndMonthAndId } from "@/features/blog/changelog/utils";
import { useRequiredStringParams } from "@/shared/hooks/use-required-string-params";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const ChangelogEntryPage: React.FC = () => {
  const { year, month, id } = useRequiredStringParams();
  const entry = getChangelogEntriesByYearAndMonthAndId()[year][month][id];

  if (!entry) {
    return (
      <Box w="full" bg="white" minH="100vh">
        <Container maxW="4xl" py={16} px={8}>
          <Text fontSize="xl" color="gray.600">
            Changelog entry not found.
          </Text>
        </Container>
      </Box>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Release":
        return "primary";
      case "Improvement":
        return "green";
      case "Retired":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Box w="full" bg="white" minH="100vh">
      {/* Breadcrumb */}
      <Box bg="gray.50" py={4} borderBottom="1px solid" borderColor="gray.200">
        <Container maxW="4xl" px={8}>
          <RouterLink to="/blog/changelog">
            <Text
              fontSize="sm"
              color="primary.600"
              _hover={{ color: "primary.800" }}
              cursor="pointer"
            >
              ← Back to changelog
            </Text>
          </RouterLink>
        </Container>
      </Box>

      <Container maxW="4xl" py={12} px={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={4} align="stretch">
            <HStack gap={3} align="center">
              <Badge
                colorScheme={getTypeColor(entry.type)}
                variant="outline"
                textTransform="uppercase"
                fontWeight="semibold"
                px={2}
                py={1}
              >
                {entry.type}
              </Badge>
              <Text fontSize="sm" color="gray.600">
                {entry.date.day} {entry.date.month} {entry.date.year} •{" "}
                {entry.readTime}
              </Text>
            </HStack>

            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="gray.900"
              lineHeight="1.2"
            >
              {entry.title}
            </Text>
          </VStack>

          {/* Table of Contents */}
          <Box
            p={6}
            bg="gray.50"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="lg" fontWeight="semibold" color="gray.900" mb={4}>
              Table of Contents
            </Text>
            <VStack gap={2} align="stretch">
              {entry.sections.map((section) => (
                <Box key={section.id}>
                  <Text
                    fontSize="sm"
                    color="primary.600"
                    _hover={{ color: "primary.800" }}
                    cursor="pointer"
                    textDecoration="none"
                  >
                    • {section.title}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Content Sections */}
          <VStack gap={12} align="stretch">
            {entry.sections.map((section, index) => (
              <Box key={section.id} id={section.id}>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={6}
                >
                  {section.title}
                </Text>
                <VStack gap={4} align="stretch">
                  {section.content.map((paragraph, idx) => (
                    <Text
                      key={idx}
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      {paragraph}
                    </Text>
                  ))}
                </VStack>
                {index < entry.sections.length - 1 && (
                  <Box mt={8} h="1px" bg="gray.200" />
                )}
              </Box>
            ))}
          </VStack>

          {/* Tags and Share */}
          <Box pt={8} borderTop="1px solid" borderColor="gray.200">
            <HStack
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={4}
            >
              <HStack gap={2} flexWrap="wrap">
                {entry.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    colorScheme="gray"
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>

              <HStack gap={2}>
                <Button size="sm" variant="outline" colorScheme="primary">
                  Share
                </Button>
                <Button size="sm" variant="outline" colorScheme="secondary">
                  Copy Link
                </Button>
              </HStack>
            </HStack>
          </Box>

          {/* Related Posts */}
          <Box pt={8}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.900" mb={6}>
              Related Posts
            </Text>
            <VStack gap={4} align="stretch">
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: "gray.50" }}
              >
                <HStack gap={3} mb={2}>
                  <Text fontSize="sm" color="gray.600">
                    Jan.12
                  </Text>
                  <Badge
                    colorScheme="green"
                    variant="outline"
                    size="sm"
                    textTransform="uppercase"
                    fontWeight="semibold"
                  >
                    Improvement
                  </Badge>
                </HStack>
                <RouterLink to="/blog/changelog/portfolio-monitoring-custom-metrics">
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.900"
                    _hover={{ color: "primary.600" }}
                    cursor="pointer"
                  >
                    Portfolio monitoring dashboard now supports custom metrics
                  </Text>
                </RouterLink>
                <HStack gap={2} mt={2}>
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    textTransform="uppercase"
                    fontSize="xs"
                  >
                    portfolio monitoring
                  </Badge>
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    textTransform="uppercase"
                    fontSize="xs"
                  >
                    dashboards
                  </Badge>
                </HStack>
              </Box>

              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: "gray.50" }}
              >
                <HStack gap={3} mb={2}>
                  <Text fontSize="sm" color="gray.600">
                    Jan.10
                  </Text>
                  <Badge
                    colorScheme="primary"
                    variant="outline"
                    size="sm"
                    textTransform="uppercase"
                    fontWeight="semibold"
                  >
                    Release
                  </Badge>
                </HStack>
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.900"
                  _hover={{ color: "primary.600" }}
                  cursor="pointer"
                >
                  New risk assessment engine for portfolio analysis
                </Text>
                <HStack gap={2} mt={2}>
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    textTransform="uppercase"
                    fontSize="xs"
                  >
                    risk management
                  </Badge>
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    textTransform="uppercase"
                    fontSize="xs"
                  >
                    analytics
                  </Badge>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
