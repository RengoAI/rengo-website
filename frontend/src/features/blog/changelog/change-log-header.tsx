import { ChangelogEntryType } from "@/features/blog/changelog/types";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BookPlus, Globe, Sparkle, TriangleAlert } from "lucide-react";
import React from "react";

const FilterSection: React.FC<{
  selectedType: ChangelogEntryType | null;
  setSelectedType: (type: ChangelogEntryType | null) => void;
}> = ({ selectedType, setSelectedType }) => {
  const getFilterButtonStyle = (
    filterType: ChangelogEntryType | null,
  ): ButtonProps & React.RefAttributes<HTMLButtonElement> => {
    const isActive = selectedType === filterType;
    return {
      variant: isActive ? "solid" : ("ghost" as const),
      color: "gray.600",
      bg: isActive ? "white" : "gray.50",
      _hover: {
        bg: "white",
        border: "1px solid",
        borderColor: "primary.700",
      },
    };
  };

  return (
    <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
      <HStack gap={2}>
        <Button
          size="sm"
          onClick={() => setSelectedType(null)}
          {...getFilterButtonStyle(null)}
        >
          <HStack gap={2}>
            <Globe size={16} />
            <Text fontSize="sm" fontWeight="medium">
              All
            </Text>
          </HStack>
        </Button>
        <Button
          size="sm"
          onClick={() => setSelectedType("Release")}
          {...getFilterButtonStyle("Release")}
        >
          <HStack gap={2}>
            <Sparkle size={16} color="green" />
            <Text fontSize="sm" fontWeight="medium">
              New Releases
            </Text>
          </HStack>
        </Button>
        <Button
          size="sm"
          onClick={() => setSelectedType("Improvement")}
          {...getFilterButtonStyle("Improvement")}
        >
          <HStack gap={2}>
            <BookPlus size={16} color="blue" />
            <Text fontSize="sm" fontWeight="medium">
              Improvements
            </Text>
          </HStack>
        </Button>
        <Button
          size="sm"
          onClick={() => setSelectedType("Fix")}
          {...getFilterButtonStyle("Fix")}
        >
          <HStack gap={2}>
            <TriangleAlert size={16} color="orange" />
            <Text fontSize="sm" fontWeight="medium">
              Fixes
            </Text>
          </HStack>
        </Button>
      </HStack>
    </Flex>
  );
};

export const ChangeLogHeader: React.FC<{
  selectedType: ChangelogEntryType | null;
  setSelectedType: (type: ChangelogEntryType | null) => void;
}> = ({ selectedType, setSelectedType }) => (
  <Box px={8} py={4} borderColor="gray.200">
    <Container maxW="6xl" px={8} py={8}>
      <VStack gap={8} align="stretch">
        <HStack
          justify="space-between"
          align="flex-start"
          borderBottom="1px solid"
          borderColor="gray.200"
          pb={8}
        >
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.900"
          >
            Changelog
          </Text>
        </HStack>

        <FilterSection
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </VStack>
    </Container>
  </Box>
);
