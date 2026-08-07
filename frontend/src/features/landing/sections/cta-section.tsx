import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

interface CtaSectionProps {
  onRequestAccess: () => void;
  onTalkToSales: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onRequestAccess,
  onTalkToSales,
}) => (
  <Box
    as="section"
    w="full"
    borderTop="1px solid"
    borderColor="panel.hairline"
    px={{ base: 6, md: 5 }}
    py={{ base: 20, md: "110px" }}
    css={{
      background:
        "radial-gradient(ellipse at 12% 11%, #1b3349 0%, #0d1c2c 100%)",
    }}
  >
    <Flex direction="column" align="center" w="full">
      <Flex
        direction="column"
        align={{ base: "flex-start", md: "flex-end" }}
        maxW="960px"
        w="full"
      >
        <Box
          as="h2"
          fontFamily="heading"
          fontWeight={300}
          fontSize={{ base: "34px", md: "60px" }}
          lineHeight={1}
          letterSpacing="-2px"
          textAlign={{ base: "left", md: "right" }}
          color="#e0e3ed"
          maxW="934px"
          m={0}
          pt={6}
        >
          Rengo is the AI deployment company for investment firms.
        </Box>

        <Flex
          gap={3.5}
          pt={12}
          justify={{ base: "flex-start", md: "flex-end" }}
          direction={{ base: "column", sm: "row" }}
          w="full"
        >
          <Button
            bg="white"
            color="panel.900"
            borderRadius={0}
            px={8}
            py={3.5}
            h="auto"
            fontFamily="body"
            fontSize="14px"
            fontWeight="medium"
            lineHeight="21px"
            _hover={{ bg: "slate.20" }}
            onClick={onRequestAccess}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            bg="transparent"
            color="white"
            borderColor="#949aac"
            borderRadius={0}
            px={8}
            py={3.5}
            h="auto"
            fontFamily="body"
            fontSize="14px"
            fontWeight="normal"
            lineHeight="21px"
            _hover={{ bg: "whiteAlpha.100" }}
            onClick={onTalkToSales}
          >
            Talk to Sales →
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);
