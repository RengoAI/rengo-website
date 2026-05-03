import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const NAVY = "gray.900";
const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const CARDS = [
  {
    n: "01",
    title: "No training on your data",
    body: "Customer data is never used for model training or improvement. Your data stays yours — always.",
  },
  {
    n: "02",
    title: "Data isolation",
    body: "Strong data isolation with enforced boundaries at the storage layer. Each firm's data is siloed end-to-end.",
  },
  {
    n: "03",
    title: "Encrypted everywhere",
    body: "End-to-end encryption across storage and network layers. Data is protected at rest and in transit.",
  },
  {
    n: "04",
    title: "Audited and tested",
    body: "SOC 2 Type II compliant. Independently audited with ongoing penetration testing.",
  },
] as const;

export const SecurityPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    {/* Hero */}
    <Box bg={NAVY} color="white" px={20} pt={40} pb={20}>
      <Text
        fontFamily={EDICT}
        fontSize="11px"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color="primary.400"
        mb={6}
      >
        Security
      </Text>
      <Box
        as="h1"
        fontFamily="heading"
        fontSize="clamp(40px, 5vw, 72px)"
        fontWeight={400}
        lineHeight={1.06}
        letterSpacing="-0.025em"
        color="white"
        maxW="780px"
        m={0}
        mb={6}
      >
        Dedicated infrastructure
        <br />
        for sensitive data
      </Box>
      <Text
        fontSize="lg"
        lineHeight={1.5}
        color="whiteAlpha.700"
        maxW="560px"
        mb={10}
      >
        Every architectural decision starts with security
      </Text>
      <Button
        borderRadius="md"
        bg="white"
        color={NAVY}
        h="42px"
        px={6}
        fontSize="15px"
        fontWeight="medium"
        _hover={{ bg: "gray.100" }}
        onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      >
        Talk to our team
      </Button>
    </Box>

    {/* Feature cards — sales deck grid style */}
    <Box bg="white" px={20} py={24}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "28px", md: "36px" }}
        fontWeight={400}
        letterSpacing="-0.02em"
        color={NAVY}
        mb={16}
        maxW="600px"
      >
        Safe, secure, and compliant
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
      >
        {CARDS.map(({ n, title, body }) => (
          <Box
            key={n}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={8}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Text
              fontFamily={EDICT}
              fontSize="11px"
              letterSpacing="0.2em"
              color="primary.700"
              fontWeight={700}
            >
              {n}
            </Text>
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="22px"
              fontWeight={400}
              letterSpacing="-0.015em"
              lineHeight={1.15}
              color={NAVY}
              m={0}
            >
              {title}
            </Box>
            <Text fontSize="sm" lineHeight={1.6} color="gray.500">
              {body}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
