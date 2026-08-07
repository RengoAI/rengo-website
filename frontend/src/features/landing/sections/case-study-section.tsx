import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

const STEPS = [
  {
    index: "01",
    title: "Migrate",
    body: "Moved the firm off its existing portfolio-monitoring software.",
  },
  {
    index: "02",
    title: "Unify",
    body: "Built a governed data lake of all historical portfolio financials.",
  },
  {
    index: "03",
    title: "Automate",
    body: "Ingested native files without templates or manual review.",
  },
  {
    index: "04",
    title: "Deploy",
    body: "Permissioned the data and made it available to AI tools through MCP.",
  },
  {
    index: "05",
    title: "Operate",
    body: "Maintain and extend applications on the shared foundation.",
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
            Rengo delivered{" "}
            <Box as="span" color="accent.onDark">
              more in a month
            </Box>{" "}
            than previous vendors did in over a year.
          </Box>
        </Flex>

        <Box pt={14}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            }}
            border="1px solid"
            borderColor="panel.border"
          >
            {STEPS.map((step, i) => (
              <Box
                key={step.index}
                borderRight={{
                  base: "none",
                  lg: i === STEPS.length - 1 ? "none" : "1px solid",
                }}
                borderBottom={{
                  base: i === STEPS.length - 1 ? "none" : "1px solid",
                  lg: "none",
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

const TRUST_ITEMS = [
  { title: "SOC2 TypeII", body: "Continuous — report available under NDA" },
  { title: "GDPR-Ready", body: "EU data residency available" },
  { title: "Pen-tested", body: "Independent third-party, annually" },
] as const;

export const TrustStrip: React.FC = () => (
  <Flex
    as="section"
    w="full"
    align="center"
    justify="space-between"
    direction={{ base: "column", md: "row" }}
    borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="slate.30"
    px={{ base: 6, md: "60px" }}
    py={{ base: 10, md: 0 }}
    minH={{ base: "auto", md: "251px" }}
  >
    {TRUST_ITEMS.map((item) => (
      <Flex
        key={item.title}
        direction="column"
        align="center"
        flex="1"
        minW={0}
        px={{ base: 0, md: 10 }}
        py={5}
      >
        <Text
          fontFamily="heading"
          fontWeight={350}
          fontSize="24px"
          lineHeight={1.1}
          letterSpacing="-1px"
          textAlign="center"
          color="ink.muted"
          m={0}
        >
          {item.title}
        </Text>
        <Text
          fontFamily="body"
          fontSize="14px"
          lineHeight="24.75px"
          textAlign="center"
          color="ink.muted"
          m={0}
        >
          {item.body}
        </Text>
      </Flex>
    ))}
  </Flex>
);
