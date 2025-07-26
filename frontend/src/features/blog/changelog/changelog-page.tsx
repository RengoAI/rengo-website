import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Container,
  Flex,
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

export const ChangelogPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const filteredEntries = CHANGELOG_ENTRIES.filter((entry) => {
    if (selectedType === "ALL") return true;
    if (selectedType === "NEW RELEASES") return entry.type === "Release";
    if (selectedType === "IMPROVEMENTS") return entry.type === "Improvement";
    if (selectedType === "RETIRED") return entry.type === "Retired";
    return true;
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

  const getFilterButtonStyle = (
    filterType: string,
  ): ButtonProps & React.RefAttributes<HTMLButtonElement> => {
    const isActive = selectedType === filterType;
    return {
      variant: isActive ? "solid" : ("ghost" as const),
      color: isActive ? "white" : "gray.600",
      bg: isActive ? "primary.600" : "transparent",
      _hover: {
        bg: isActive ? "primary.700" : "gray.100",
      },
    };
  };

  return (
    <Box w="full" bg="white" minH="100vh">
      {/* Header */}
      <Box py={12} borderBottom="1px solid" borderColor="gray.200">
        <Container maxW="6xl" px={8}>
          <VStack gap={8} align="stretch">
            <HStack justify="space-between" align="center">
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                color="gray.900"
              >
                Changelog
              </Text>
            </HStack>

            {/* Filter Bar */}
            <Flex
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={4}
            >
              <HStack gap={2}>
                <Button
                  size="sm"
                  onClick={() => setSelectedType("ALL")}
                  {...getFilterButtonStyle("ALL")}
                >
                  <HStack gap={2}>
                    <Box w="8px" h="8px" bg="gray.400" borderRadius="full" />
                    <Text fontSize="sm" fontWeight="medium">
                      ALL
                    </Text>
                  </HStack>
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSelectedType("NEW RELEASES")}
                  {...getFilterButtonStyle("NEW RELEASES")}
                >
                  <HStack gap={2}>
                    <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
                    <Text fontSize="sm" fontWeight="medium">
                      NEW RELEASES
                    </Text>
                  </HStack>
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSelectedType("IMPROVEMENTS")}
                  {...getFilterButtonStyle("IMPROVEMENTS")}
                >
                  <HStack gap={2}>
                    <Box w="8px" h="8px" bg="blue.400" borderRadius="full" />
                    <Text fontSize="sm" fontWeight="medium">
                      IMPROVEMENTS
                    </Text>
                  </HStack>
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSelectedType("RETIRED")}
                  {...getFilterButtonStyle("RETIRED")}
                >
                  <HStack gap={2}>
                    <Box w="8px" h="8px" bg="orange.400" borderRadius="full" />
                    <Text fontSize="sm" fontWeight="medium">
                      FIXES
                    </Text>
                  </HStack>
                </Button>
              </HStack>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Showing {filteredEntries.length} entries
                </Text>
              </Box>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Content */}
      <Container maxW="6xl" py={8} px={8}>
        <VStack gap={8} align="stretch">
          {/* Month Header */}
          <Box>
            <HStack justify="space-between" align="center" mb={6}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                January 2025
              </Text>
              <Button variant="ghost" size="sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
                </svg>
              </Button>
            </HStack>

            {/* Changelog Entries */}
            <VStack gap={6} align="stretch">
              {filteredEntries.map((entry) => (
                <Box key={entry.id}>
                  <HStack gap={4} align="flex-start" mb={3}>
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
                      variant="outline"
                      size="sm"
                      textTransform="uppercase"
                      fontWeight="semibold"
                      px={2}
                      py={1}
                    >
                      {entry.type}
                    </Badge>
                  </HStack>

                  <Box ml="66px">
                    <RouterLink to={`/blog/changelog/${entry.slug}`}>
                      <Text
                        fontSize="lg"
                        fontWeight="medium"
                        color="gray.900"
                        _hover={{
                          color: "primary.600",
                          textDecoration: "underline",
                        }}
                        display="block"
                        mb={3}
                        cursor="pointer"
                        lineHeight="1.4"
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
                          textTransform="uppercase"
                          fontSize="xs"
                          fontWeight="medium"
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
            <HStack justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                December 2024
              </Text>
              <Button variant="ghost" size="sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
                </svg>
              </Button>
            </HStack>
            <HStack justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                November 2024
              </Text>
              <Button variant="ghost" size="sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
                </svg>
              </Button>
            </HStack>
            <HStack justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                October 2024
              </Text>
              <Button variant="ghost" size="sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
                </svg>
              </Button>
            </HStack>
          </VStack>

          {/* Pagination */}
          <Flex justify="center" py={8}>
            <HStack gap={4}>
              <Button variant="outline" size="sm" disabled>
                Prev
              </Button>
              <HStack gap={2}>
                <Button variant="solid" colorScheme="primary" size="sm">
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
      </Container>
    </Box>
  );
};
