import { rootRoute } from "@/app/app-routes";
import {
  ChangelogEntryData,
  ChangelogEntryType,
} from "@/features/blog/changelog/types";
import { Accordion, Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChangeMonthSection: React.FC<{
  isOpen: boolean;
  entries: Record<string, ChangelogEntryData>;
  year: string;
  month: string;
}> = ({ isOpen, entries, year, month }) => {
  const navigate = useNavigate();
  const getTypeColor = (type: ChangelogEntryType) => {
    switch (type) {
      case "Release":
        return "primary";
      case "Improvement":
        return "green";
      case "Fix":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Accordion.Root
      collapsible
      defaultValue={isOpen ? [month + year] : undefined}
    >
      <Accordion.Item value={month + year}>
        <Accordion.ItemTrigger>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            {month} {year}
          </Text>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            {/* Changelog Entries */}
            <VStack gap={6} align="stretch">
              {Object.entries(entries).map(([id, entry]) => (
                <Box
                  key={id}
                  onClick={() => {
                    navigate(
                      rootRoute({})
                        .blog({})
                        .changelog({})
                        .entry({ year, month, id: entry.id }).$,
                    );
                  }}
                  _hover={{
                    bg: "gray.50",
                    cursor: "pointer",
                  }}
                  transition="background 0.2s"
                  borderRadius="md"
                  p={4}
                >
                  <HStack gap={4} align="flex-start" mb={3}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.600"
                      minW="50px"
                    >
                      {entry.date.day} {entry.date.month} {entry.date.year}
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
                </Box>
              ))}
            </VStack>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export const ChangelogContent: React.FC<{
  changelogEntriesByYearByMonthById: Record<
    string,
    Record<string, Record<string, ChangelogEntryData>>
  >;
  selectedYear: string;
}> = ({ changelogEntriesByYearByMonthById, selectedYear }) => {
  const selectedYearEntries = changelogEntriesByYearByMonthById[selectedYear];

  return (
    <VStack gap={8} align="stretch">
      {Object.entries(selectedYearEntries)
        .sort(([monthA], [monthB]) => {
          // Sort months in reverse chronological order
          // Try to parse as number, fallback to string comparison
          const numA = Number(monthA);
          const numB = Number(monthB);
          if (!isNaN(numA) && !isNaN(numB)) {
            return numB - numA;
          }
          // If not numbers, try to use Date.parse for month names
          const dateA = Date.parse(`${monthA} 1, 2000`);
          const dateB = Date.parse(`${monthB} 1, 2000`);
          if (!isNaN(dateA) && !isNaN(dateB)) {
            return dateB - dateA;
          }
          // Fallback to string comparison
          return monthB.localeCompare(monthA);
        })
        .map(([month, entriesById]) => (
          <ChangeMonthSection
            key={`${selectedYear}-${month}`}
            isOpen={Object.entries(selectedYearEntries)[0][0] === month}
            entries={entriesById}
            year={selectedYear}
            month={month}
          />
        ))}
    </VStack>
  );
};
