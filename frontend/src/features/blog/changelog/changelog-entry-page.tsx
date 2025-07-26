import { Page } from "@/components/layout/page";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

interface ChangelogEntryData {
  [key: string]: {
    date: string;
    type: "Release" | "Improvement" | "Retired";
    title: string;
    tags: string[];
    readTime: string;
    sections: {
      id: string;
      title: string;
      content: string[];
    }[];
  };
}

const CHANGELOG_DATA: ChangelogEntryData = {
  "enhanced-data-connector-performance": {
    date: "January 15, 2025",
    type: "Release",
    title: "Enhanced data connector performance with real-time streaming",
    tags: ["data connectors", "performance"],
    readTime: "2 minute read",
    sections: [
      {
        id: "whats-new",
        title: "What's new?",
        content: [
          "We're excited to announce significant performance improvements to our data connector infrastructure. The new real-time streaming capabilities provide up to 10x faster data synchronization across all supported data sources.",
          "This release introduces optimized connection pooling, intelligent caching mechanisms, and adaptive batching that automatically adjusts to your data volume and velocity. Whether you're processing high-frequency trading data or batch analytics workloads, the enhanced connectors deliver consistent, reliable performance.",
          "Key improvements include reduced latency for real-time data feeds, better error handling and retry mechanisms, and enhanced monitoring capabilities that provide detailed insights into data flow performance.",
        ],
      },
      {
        id: "key-features",
        title: "Key Features",
        content: [
          "Real-time streaming support for all major data sources including SQL databases, APIs, and file systems",
          "Intelligent connection pooling that optimizes resource usage and reduces overhead",
          "Adaptive batching with automatic optimization based on data patterns",
          "Enhanced error handling with exponential backoff and circuit breaker patterns",
          "Comprehensive monitoring and alerting for data pipeline health",
          "Zero-downtime deployment support for connector updates",
        ],
      },
      {
        id: "feedback",
        title: "We'd love your feedback!",
        content: [
          "Your feedback is essential as we continue to improve our data connector platform. If you experience any issues with the new streaming capabilities or have suggestions for additional features, please reach out to our support team.",
          "We're particularly interested in hearing about your use cases and performance requirements to help guide future development priorities.",
        ],
      },
    ],
  },
  "portfolio-monitoring-custom-metrics": {
    date: "January 12, 2025",
    type: "Improvement",
    title: "Portfolio monitoring dashboard now supports custom metrics",
    tags: ["portfolio monitoring", "dashboards"],
    readTime: "3 minute read",
    sections: [
      {
        id: "whats-changed",
        title: "What's changed?",
        content: [
          "Portfolio managers can now create and track custom metrics tailored to their specific investment strategies and reporting requirements. This enhancement provides the flexibility to define proprietary performance indicators and risk measures beyond standard industry metrics.",
          "The new custom metrics builder supports complex calculations, time-weighted averages, and conditional logic. You can combine multiple data sources and apply custom formulas to create meaningful insights for your investment process.",
          "Custom metrics seamlessly integrate with existing dashboards and can be included in automated reports, alerts, and API responses.",
        ],
      },
      {
        id: "how-to-use",
        title: "How to use custom metrics",
        content: [
          "Navigate to the Portfolio Monitoring dashboard and select 'Custom Metrics' from the configuration menu",
          "Use the visual formula builder to define your metric calculation using available data fields",
          "Set up display preferences including chart types, time periods, and formatting options",
          "Configure alerts and thresholds for your custom metrics to receive notifications when values exceed defined ranges",
          "Add custom metrics to your existing dashboards and reports for comprehensive portfolio analysis",
        ],
      },
    ],
  },
};

export const ChangelogEntryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? CHANGELOG_DATA[slug] : null;

  if (!entry) {
    return (
      <Page>
        <Container maxW="4xl" py={16} px={8}>
          <Text fontSize="xl" color="gray.600">
            Changelog entry not found.
          </Text>
        </Container>
      </Page>
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
    <Page>
      <Box w="full">
        {/* Breadcrumb */}
        <Box
          bg="gray.50"
          py={4}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
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
                  variant="subtle"
                  textTransform="none"
                  fontWeight="medium"
                >
                  {entry.type}
                </Badge>
                <Text fontSize="sm" color="gray.600">
                  {entry.date} • {entry.readTime}
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
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    fontSize="sm"
                    color="primary.600"
                    _hover={{ color: "primary.800" }}
                  >
                    • {section.title}
                  </Link>
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
                      textTransform="none"
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
                      variant="subtle"
                      size="sm"
                      textTransform="none"
                    >
                      Improvement
                    </Badge>
                  </HStack>
                  <RouterLink to="/blog/changelog/portfolio-monitoring-custom-metrics">
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="primary.600"
                      _hover={{ color: "primary.800" }}
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
                      textTransform="none"
                    >
                      portfolio monitoring
                    </Badge>
                    <Badge
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      textTransform="none"
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
                      variant="subtle"
                      size="sm"
                      textTransform="none"
                    >
                      Release
                    </Badge>
                  </HStack>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color="primary.600"
                    _hover={{ color: "primary.800" }}
                    cursor="pointer"
                  >
                    New risk assessment engine for portfolio analysis
                  </Text>
                  <HStack gap={2} mt={2}>
                    <Badge
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      textTransform="none"
                    >
                      risk management
                    </Badge>
                    <Badge
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      textTransform="none"
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
    </Page>
  );
};
