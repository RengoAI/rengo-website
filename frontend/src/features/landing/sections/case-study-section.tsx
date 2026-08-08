import { marketingContentPaddingX } from "@/components/layout/marketing-frame";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

const PILLARS = [
  {
    title: "Dedicated infrastructure",
    body: "We run and operate the platform so your team can focus on the work, not the stack.",
  },
  {
    title: "Applied AI",
    body: "We turn frontier models into production systems that fit how your firm actually works.",
  },
  {
    title: "Own your code",
    body: "Applications and integrations built just for you in your own repository.",
  },
] as const;

export const CaseStudySection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" px={false} py={{ base: 12, md: 16 }}>
    <Flex direction="column" gap={{ base: 10, md: 12 }} w="full">
      <Box px={marketingContentPaddingX}>
        <Box
          as="h2"
          fontFamily="heading"
          fontWeight={350}
          fontSize={{ base: "28px", md: "36px" }}
          lineHeight={1.2}
          letterSpacing="-2px"
          color="indigo.900"
          maxW="820px"
          m={0}
        >
          Deployment with Rengo AI
        </Box>
      </Box>

      <Box px={marketingContentPaddingX}>
        <Flex
          align="center"
          justify="center"
          w="full"
          h={{ base: "220px", md: "304px" }}
          border="1px dashed"
          borderColor="slate.40"
          borderRadius="2px"
          bg="slate.20"
          aria-hidden
        >
          <Text
            fontFamily="body"
            fontSize="13px"
            lineHeight="20px"
            letterSpacing="0.04em"
            textTransform="uppercase"
            color="slate.50"
            m={0}
          >
            Graphic placeholder
          </Text>
        </Flex>
      </Box>

      <Box w="full" borderTop="1px solid" borderColor="slate.30">
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(3, minmax(0, 1fr))",
          }}
          gap={0}
        >
          {PILLARS.map((pillar, i) => {
            const isFirst = i === 0;
            const isLast = i === PILLARS.length - 1;

            return (
              <Box
                key={pillar.title}
                borderLeftWidth={{
                  base: 0,
                  sm: isFirst ? 0 : "1px",
                }}
                borderBottomWidth={{
                  base: isLast ? 0 : "1px",
                  sm: 0,
                }}
                borderStyle="solid"
                borderColor="slate.30"
                px={marketingContentPaddingX}
                py={{ base: 8, md: 10 }}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <Text
                  fontFamily="heading"
                  fontWeight={350}
                  fontSize={{ base: "18px", md: "22px" }}
                  lineHeight={1.2}
                  letterSpacing="-0.72px"
                  color="indigo.900"
                  m={0}
                >
                  {pillar.title}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="16px"
                  lineHeight="24px"
                  color="slate.50"
                  m={0}
                >
                  {pillar.body}
                </Text>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Flex>
  </SectionShell>
);
