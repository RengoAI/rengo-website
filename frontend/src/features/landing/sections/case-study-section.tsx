import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

const STEPS = [
  {
    index: "01",
    title: "Dedicated infrastructure",
    body: "We run and operate the platform so your team can focus on the work, not the stack.",
  },
  {
    index: "02",
    title: "Applied AI",
    body: "We turn frontier models into production systems that fit how your firm actually works.",
  },
  {
    index: "03",
    title: "Own your code",
    body: "Applications and integrations built just for you in your own repository.",
  },
] as const;

export const CaseStudySection: React.FC = () => (
  <Box as="section" w="full" bg="slate.10" px={{ base: 4, md: "60px" }} py={5}>
    <Box
      borderRadius="8px"
      overflow="hidden"
      css={{
        background:
          "radial-gradient(ellipse at 50% 50%, #163655 0%, #102137 100%)",
      }}
    >
      <Box
        borderTop="1px solid"
        borderColor="panel.hairline"
        borderRadius="16px"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 10 }}
      >
        <Flex justify="center">
          <Box
            as="h2"
            fontFamily="heading"
            fontWeight={300}
            fontSize={{ base: "28px", md: "36px" }}
            lineHeight={1.2}
            letterSpacing="-2px"
            color="panel.fg"
            maxW="820px"
            m={0}
          >
            Deployment with Rengo AI
          </Box>
        </Flex>

        <Box pt={14}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(3, minmax(0, 1fr))",
            }}
            border="1px solid"
            borderColor="panel.border"
          >
            {STEPS.map((step, i) => (
              <Box
                key={step.index}
                borderRight={{
                  base: "none",
                  md: i === STEPS.length - 1 ? "none" : "1px solid",
                }}
                borderBottom={{
                  base: i === STEPS.length - 1 ? "none" : "1px solid",
                  md: "none",
                }}
                borderColor="panel.border"
                minH="200px"
                p={7}
              >
                <Text
                  fontFamily="numeric"
                  fontSize="11px"
                  lineHeight="16.5px"
                  letterSpacing="1.54px"
                  color="panel.fgSubtle"
                  mb={5}
                  m={0}
                >
                  {step.index}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="22px"
                  lineHeight="33px"
                  letterSpacing="-0.44px"
                  color="panel.fg"
                  mt={5}
                  mb={3}
                >
                  {step.title}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="13px"
                  lineHeight="20.8px"
                  color="panel.fgMuted"
                  m={0}
                >
                  {step.body}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  </Box>
);
