import { rootRoute } from "@/app/app-routes";
import {
  ChangelogEntryData,
  ChangelogEntryType,
} from "@/features/blog/changelog/types";
import {
  Accordion,
  Badge,
  Box,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ChangeMonthSection: React.FC<{
  isOpen: boolean;
  filteredEntries: Record<string, ChangelogEntryData>;
  year: string;
  month: string;
}> = ({ isOpen, filteredEntries, year, month }) => {
  const getTypeColor = (type: ChangelogEntryType) => {
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
    <Accordion.Root collapsible>
      {Object.entries(filteredEntries).map(([id, entry]) => (
        <Accordion.Item key={id} value={id}>
          <Accordion.ItemTrigger>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              {month}
            </Text>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              {/* Changelog Entries */}
              <VStack gap={6} align="stretch">
                {Object.entries(filteredEntries).map(([id, entry]) => (
                  <Box key={id}>
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
                      <Link
                        to={
                          rootRoute({})
                            .blog({})
                            .changelog({})
                            .entry({ year, month, id: entry.id }).$
                        }
                      >
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
                      </Link>

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
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export const ChangelogContent: React.FC<{
  filteredEntries: ChangelogEntryData[];
  changelogEntriesByYearByMonthById: Record<
    string,
    Record<string, Record<string, ChangelogEntryData>>
  >;
}> = ({ changelogEntriesByYearByMonthById }) => (
  <VStack gap={8} align="stretch">
    {Object.entries(changelogEntriesByYearByMonthById).map(
      ([year, entriesByMonth]) =>
        Object.entries(entriesByMonth).map(([month, entriesById]) => (
          <ChangeMonthSection
            key={year}
            isOpen={true}
            filteredEntries={entriesById}
            year={year}
            month={month}
          />
        )),
    )}
  </VStack>
);
