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
import React from "react";

const FilterSection: React.FC<{
  selectedType: string;
  setSelectedType: (type: string) => void;
}> = ({ selectedType, setSelectedType }) => {
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
    <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
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
    </Flex>
  );
};

export const ChangeLogHeader: React.FC<{
  selectedType: string;
  setSelectedType: (type: string) => void;
}> = ({ selectedType, setSelectedType }) => (
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

        <FilterSection
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </VStack>
    </Container>
  </Box>
);
