import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** Word for word from the sales deck's "every team" slide. */
const TEAMS = [
  {
    team: "Investments",
    title: "Evaluate more opportunities",
    body: "Draw on past deals, underwriting, and investment decisions to evaluate new opportunities faster.",
  },
  {
    team: "Portfolio Management",
    title: "Accelerate value creation",
    body: "Track financial and operating results across companies, identify issues earlier, and spend less time assembling reports.",
  },
  {
    team: "Investor Relations",
    title: "Communicate with confidence",
    body: "Prepare investor updates, respond to questions, and pull together reporting using the latest portfolio and fund information.",
  },
  {
    team: "Finance & Operations",
    title: "Spend less time reconciling",
    body: "Keep financial data consistent across systems, reduce reconciliation, and simplify recurring reporting.",
  },
];

/**
 * Who it's for, by team rather than by industry (Wonderful lists
 * industries): the heading top left, the four teams in a row along the
 * foot, each its name as a small label, then its outcome and line.
 */
export const EveryTeamSection: React.FC = () => (
  <Section
    bg="site.bg.page"
    minH={FEATURE_BAND_MIN_H}
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    gap={{ base: "48px", lg: "120px" }}
  >
    <Text
      as="h2"
      textStyle="h4"
      fontWeight={400}
      lineHeight="1.1"
      color="site.fg.heading"
      maxW="640px"
      textWrap="balance"
    >
      Better data and AI help{" "}
      <Box as="span" color="site.highlight">
        every team
      </Box>{" "}
      work more effectively
    </Text>
    <Box
      as="ul"
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr", lg: "repeat(4, 1fr)" }}
      columnGap={{ base: "32px", lg: "40px" }}
      rowGap="40px"
    >
      {TEAMS.map((t) => (
        <Box
          as="li"
          key={t.team}
          display="flex"
          flexDirection="column"
          gap="10px"
          pt="20px"
          borderTop="1px solid"
          borderColor="border.subtle"
        >
          <Text
            fontSize="12px"
            fontWeight={500}
            letterSpacing="0.06em"
            textTransform="uppercase"
            color="site.fg.muted"
          >
            {t.team}
          </Text>
          <Text
            as="h3"
            textStyle="h6"
            fontSize="1.25rem"
            fontWeight={400}
            lineHeight="1.2"
            letterSpacing="-0.5px"
            color="site.fg"
          >
            {t.title}
          </Text>
          <Text textStyle="body.sm" color="site.fg" maxW="300px">
            {t.body}
          </Text>
        </Box>
      ))}
    </Box>
  </Section>
);
