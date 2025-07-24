import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { ErrorBoundaryFallbackProps } from "@suspensive/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorComponent: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
}) => {
  const navigate = useNavigate();

  return (
    <Center w="100%" minH="100vh">
      <VStack
        alignItems="flex-start"
        gap="48px"
        w="100%"
        maxW="1100px"
        mx="130px"
      >
        <VStack alignItems="flex-start" gap="16px">
          <Text fontSize="44px" color="gray.700">
            Something went wrong
          </Text>
          <Text fontSize="16px" color="gray.500">
            If you need help contact support.
          </Text>
          <Box
            borderWidth="1px"
            padding="8px"
            borderRadius="6px"
            borderColor="purple.200"
            bg="purple.25"
            color="purple.900"
            textAlign="left"
          >
            <Text textStyle="overline" color="purple.500" cursor="pointer">
              Error Details
            </Text>
            <Text fontFamily="mono" whiteSpace="pre-wrap" textStyle="small">
              {error.message}
            </Text>
          </Box>
        </VStack>
        <HStack>
          <Button
            size="sm"
            colorScheme="secondary"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};
