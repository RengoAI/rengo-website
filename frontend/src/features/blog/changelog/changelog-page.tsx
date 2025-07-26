import { ChangelogContent } from "@/features/blog/changelog/change-log-content";
import { ChangeLogHeader } from "@/features/blog/changelog/change-log-header";
import { CHANGELOG_DATA } from "@/features/blog/changelog/entries";
import { getChangelogEntriesByYearAndMonthAndId } from "@/features/blog/changelog/utils";
import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const ChangelogPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const filteredEntries = CHANGELOG_DATA.filter((entry) => {
    if (selectedType === "ALL") return true;
    if (selectedType === "NEW RELEASES") return entry.type === "Release";
    if (selectedType === "IMPROVEMENTS") return entry.type === "Improvement";
    if (selectedType === "RETIRED") return entry.type === "Retired";
    return true;
  });

  const changelogEntriesByYearByMonthById =
    getChangelogEntriesByYearAndMonthAndId();

  return (
    <Box w="full" bg="white" minH="100vh">
      <ChangeLogHeader
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Content */}
      <Container maxW="6xl" py={8} px={8}>
        <ChangelogContent
          filteredEntries={filteredEntries}
          changelogEntriesByYearByMonthById={changelogEntriesByYearByMonthById}
        />

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
      </Container>
    </Box>
  );
};
