import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const METRICS = [
  { value: "$40B+", label: "Assets monitored" },
  { value: "12x", label: "Faster reporting cycles" },
  { value: "60s", label: "From document to dashboard" },
];

const MetricStrip: React.FC = () => (
  <Box as="section" borderBottom="1px solid" borderColor="border.muted" py={12}>
    <PageContainer>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
        {METRICS.map((metric) => (
          <Box key={metric.label}>
            <Text
              fontFamily="heading"
              fontSize="clamp(2rem, 4vw, 3rem)"
              color="primary.800"
              lineHeight={1}
              mb={2}
            >
              {metric.value}
            </Text>
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="gray.500"
            >
              {metric.label}
            </Text>
          </Box>
        ))}
      </Grid>
    </PageContainer>
  </Box>
);

/**
 * DRAFT — alternate landing hero. Lighter tone, centered headline, and a
 * three-up metric strip replacing the firm-types marquee. Explores a more
 * numbers-forward first impression.
 */
export const LandingHeroV2: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      align="center"
      tone="light"
      minH="82vh"
      eyebrow="Portfolio intelligence for private markets"
      headline="Every portfolio number, one source of truth."
      subtext="Purpose-built AI that turns scattered portfolio data into a single searchable system leading asset managers run their firm on."
      subtextMaxW="620px"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
    />
    <MetricStrip />
  </Box>
);
