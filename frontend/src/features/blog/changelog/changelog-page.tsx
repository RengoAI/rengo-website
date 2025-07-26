import { ChangelogContent } from "@/features/blog/changelog/change-log-content";
import { ChangeLogHeader } from "@/features/blog/changelog/change-log-header";
import { ChangelogEntryType } from "@/features/blog/changelog/types";
import { getChangelogEntriesByYearAndMonthAndId } from "@/features/blog/changelog/utils";
import { Box, Button, Container, Flex, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

export const ChangelogPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ChangelogEntryType | null>(
    null,
  );
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const changelogEntriesByYearByMonthById =
    getChangelogEntriesByYearAndMonthAndId({
      type: selectedType,
      year: selectedYear,
    });

  return (
    <Box w="full" bg="white" minH="100vh">
      <ChangeLogHeader
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Content */}
      <Container maxW="6xl" py={8} px={8}>
        <ChangelogContent
          changelogEntriesByYearByMonthById={changelogEntriesByYearByMonthById}
          selectedYear={selectedYear}
        />

        {/* Pagination */}
        <Flex justify="center" py={8}>
          <HStack gap={4}>
            <Button variant="outline" size="sm" disabled>
              Prev
            </Button>
            <HStack gap={2}>
              {Object.keys(changelogEntriesByYearByMonthById).map((year) => (
                <Button
                  key={year}
                  variant="solid"
                  colorScheme="primary"
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Button>
              ))}
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
