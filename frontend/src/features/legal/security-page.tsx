import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const CARDS = [
  {
    n: "01",
    title: "No training on your data",
    body: "Customer data is never used for model training or improvement.",
  },
  {
    n: "02",
    title: "Data isolation",
    body: "Strong data isolation with enforced boundaries at the storage layer.",
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
    <PageHero
      headline="Dedicated infrastructure"
      subtext="Secure by design and built for private markets"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />

    {/* Feature cards — sales deck grid style */}
    <Box bg="white" py={28}>
      <PageContainer>
        <Text
          fontFamily="heading"
          fontSize="4xl"
          fontWeight={400}
          letterSpacing="-0.025em"
          color="primary.800"
          mb={4}
          maxW="720px"
        >
          Safe, secure, and compliant
        </Text>
        <Text
          fontSize="lg"
          lineHeight={1.6}
          color="gray.500"
          maxW="600px"
          mb={16}
        >
          Rengo AI is always working to meet and exceed established data
          security standards and best practices
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
                fontSize="xs"
                letterSpacing="0.2em"
                color="primary.700"
                fontWeight={700}
              >
                {n}
              </Text>
              <Box
                as="h3"
                fontFamily="heading"
                fontSize="2xl"
                fontWeight={400}
                letterSpacing="-0.02em"
                lineHeight={1.15}
                color="primary.800"
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
      </PageContainer>
    </Box>
  </Box>
);
