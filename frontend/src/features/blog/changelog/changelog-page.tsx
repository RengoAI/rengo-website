import { Page } from "@/components/layout/page";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface ChangelogEntry {
  id: string;
  date: string;
  type: "Release" | "Improvement" | "Retired";
  title: string;
  tags: string[];
  slug: string;
}

const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    id: "1",
    date: "Jan.15",
    type: "Release",
    title: "Enhanced data connector performance with real-time streaming",
    tags: ["data connectors", "performance"],
    slug: "enhanced-data-connector-performance",
  },
  {
    id: "2",
    date: "Jan.12",
    type: "Improvement",
    title: "Portfolio monitoring dashboard now supports custom metrics",
    tags: ["portfolio monitoring", "dashboards"],
    slug: "portfolio-monitoring-custom-metrics",
  },
  {
    id: "3",
    date: "Jan.10",
    type: "Release",
    title: "New risk assessment engine for portfolio analysis",
    tags: ["risk management", "analytics"],
    slug: "new-risk-assessment-engine",
  },
  {
    id: "4",
    date: "Jan.08",
    type: "Improvement",
    title: "Improved authentication flow with multi-factor security",
    tags: ["security", "authentication"],
    slug: "improved-authentication-flow",
  },
  {
    id: "5",
    date: "Jan.05",
    type: "Retired",
    title: "Legacy API endpoints will be deprecated in Q2 2025",
    tags: ["api", "deprecation"],
    slug: "legacy-api-deprecation",
  },
  {
    id: "6",
    date: "Jan.03",
    type: "Release",
    title: "AI-powered insights for predictive portfolio analysis",
    tags: ["ai", "analytics", "portfolio monitoring"],
    slug: "ai-powered-portfolio-insights",
  },
];

const ALL_TAGS = [
  "data connectors",
  "portfolio monitoring",
  "security",
  "analytics",
  "ai",
  "performance",
  "dashboards",
  "risk management",
  "authentication",
  "api",
];

export const ChangelogPage: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedTypes([]);
  };

  const filteredEntries = CHANGELOG_ENTRIES.filter((entry) => {
    const tagMatch =
      selectedTags.length === 0 ||
      entry.tags.some((tag) => selectedTags.includes(tag));
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(entry.type);
    return tagMatch && typeMatch;
  });

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
    <Page>
      <Box w="full">
        {/* Header */}
        <Box bg="white" py={12} borderBottom="1px solid" borderColor="gray.200">
          <Container maxW="6xl" px={8}>
            <VStack gap={6} align="stretch">
              <HStack justify="space-between" align="center">
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color="gray.900"
                >
                  Changelog
                </Text>
                <HStack gap={4}>
                  <Button
                    size="sm"
                    variant="outline"
                    color="gray.600"
                    borderColor="gray.300"
                  >
                    Copy RSS feed URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    color="gray.600"
                    borderColor="gray.300"
                  >
                    Follow @rengoai
                  </Button>
                </HStack>
              </HStack>

              {/* Filter Controls */}
              <Box>
                <Grid
                  templateColumns={{ base: "1fr", lg: "300px 1fr" }}
                  gap={8}
                >
                  {/* Sidebar Filters */}
                  <GridItem>
                    <VStack gap={6} align="stretch">
                      <Box>
                        <HStack justify="space-between" mb={4}>
                          <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="gray.900"
                          >
                            Filters (
                            {selectedTags.length + selectedTypes.length}{" "}
                            selected)
                          </Text>
                          {(selectedTags.length > 0 ||
                            selectedTypes.length > 0) && (
                            <Button
                              size="sm"
                              variant="link"
                              onClick={clearFilters}
                            >
                              Clear all
                            </Button>
                          )}
                        </HStack>

                        {/* Type Filters */}
                        <VStack gap={3} align="stretch" mb={6}>
                          <Text
                            fontSize="md"
                            fontWeight="medium"
                            color="gray.700"
                          >
                            Type
                          </Text>
                          {["Release", "Improvement", "Retired"].map((type) => (
                            <HStack key={type}>
                              <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => toggleType(type)}
                              />
                              <Text fontSize="sm" color="gray.600">
                                {type}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>

                        {/* Tag Filters */}
                        <VStack gap={3} align="stretch">
                          <Text
                            fontSize="md"
                            fontWeight="medium"
                            color="gray.700"
                          >
                            Tags
                          </Text>
                          {ALL_TAGS.map((tag) => (
                            <HStack key={tag}>
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                              />
                              <Text fontSize="sm" color="gray.600">
                                {tag}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    </VStack>
                  </GridItem>

                  {/* Main Content */}
                  <GridItem>
                    <VStack gap={8} align="stretch">
                      {/* Month Header */}
                      <Box>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray.900"
                          mb={6}
                        >
                          January 2025
                        </Text>

                        {/* Changelog Entries */}
                        <VStack gap={6} align="stretch">
                          {filteredEntries.map((entry) => (
                            <Box key={entry.id}>
                              <HStack gap={4} align="flex-start" mb={2}>
                                <Text
                                  fontSize="sm"
                                  fontWeight="medium"
                                  color="gray.600"
                                  minW="50px"
                                >
                                  {entry.date}
                                </Text>
                                <Badge
                                  colorScheme={getTypeColor(entry.type)}
                                  variant="subtle"
                                  size="sm"
                                  textTransform="none"
                                  fontWeight="medium"
                                >
                                  {entry.type}
                                </Badge>
                              </HStack>

                              <Box ml="66px">
                                <RouterLink
                                  to={`/blog/changelog/${entry.slug}`}
                                >
                                  <Text
                                    fontSize="lg"
                                    fontWeight="medium"
                                    color="primary.600"
                                    _hover={{
                                      color: "primary.800",
                                      textDecoration: "underline",
                                    }}
                                    display="block"
                                    mb={2}
                                    cursor="pointer"
                                  >
                                    {entry.title}
                                  </Text>
                                </RouterLink>

                                <HStack gap={2} flexWrap="wrap">
                                  {entry.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      colorScheme="gray"
                                      size="sm"
                                      textTransform="none"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </HStack>
                              </Box>

                              <Box mt={6} h="1px" bg="gray.200" />
                            </Box>
                          ))}
                        </VStack>
                      </Box>

                      {/* Previous Months */}
                      <VStack gap={4} align="stretch">
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          December 2024
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          November 2024
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          October 2024
                        </Text>
                      </VStack>

                      {/* Pagination */}
                      <Flex justify="center" py={8}>
                        <HStack gap={4}>
                          <Button variant="outline" size="sm" disabled>
                            Prev
                          </Button>
                          <HStack gap={2}>
                            <Button
                              variant="solid"
                              colorScheme="primary"
                              size="sm"
                            >
                              2025
                            </Button>
                            <Button variant="outline" size="sm">
                              2024
                            </Button>
                            <Button variant="outline" size="sm">
                              2023
                            </Button>
                            <Text color="gray.500">...</Text>
                            <Button variant="outline" size="sm">
                              2020
                            </Button>
                          </HStack>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </HStack>
                      </Flex>
                    </VStack>
                  </GridItem>
                </Grid>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Page>
  );
};
