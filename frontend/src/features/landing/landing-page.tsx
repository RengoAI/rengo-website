import { PulseGrid } from "@/components/pulse-grid";
import { PageHero } from "@/components/layout/page-hero";
import { ValueCard } from "@/components/layout/value-card";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const TINT = "#1A3358";
const NAVY = "#0C1D34";
const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const FIRM_TYPES = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Family Offices",
  "Fund of Funds",
];

const PILLARS = [
  [
    "01",
    "Ingest",
    "Pull financials, board decks, and CIMs from every portfolio company. Schedule recurring data requests with one click.",
  ],
  [
    "02",
    "Query",
    "Ask questions across the entire portfolio in natural language. Cited answers, every time.",
  ],
  [
    "03",
    "Monitor",
    "Dashboards and alerts on covenants, KPIs, and material events — before quarterly reviews.",
  ],
] as const;

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const LandingHeroBackground: React.FC = () => (
  <>
    <PulseGrid
      id="a2-hero"
      tone="navy"
      density="quiet"
      width={1280}
      height={900}
      cols={22}
      rows={26}
      showHeaderRow={false}
      tintColor={TINT}
      greenColor="#3B8BE0"
      fadeBottom={false}
    />
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{
        background:
          "linear-gradient(to right, rgba(7,20,42,0.92) 0%, rgba(12,29,52,0.78) 38%, rgba(12,29,52,0.4) 65%, rgba(12,29,52,0.15) 100%)",
      }}
    />
    <Box
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      h="200px"
      pointerEvents="none"
      style={{
        background: "linear-gradient(to bottom, transparent, #0C1D34 100%)",
      }}
    />
  </>
);

const FirmsStrip: React.FC = () => (
  <Box as="section" borderBottom="1px solid" borderColor="border.muted" py={8}>
    <Text
      fontFamily={EDICT}
      fontSize="11px"
      color="gray.500"
      letterSpacing="0.08em"
      textTransform="uppercase"
      px={20}
      mb={8}
    >
      Built with leading firms across
    </Text>
    <Box
      w="full"
      overflow="hidden"
      css={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <Box
        display="flex"
        css={{
          gap: "64px",
          animation: `${marqueeScroll} 40s linear infinite`,
          width: "max-content",
          whiteSpace: "nowrap",
        }}
      >
        {Array(4)
          .fill(FIRM_TYPES)
          .flat()
          .map((label, i) => (
            <Text
              key={i}
              as="span"
              fontSize="16px"
              color="primary.700"
              opacity={0.3}
              fontWeight={400}
              letterSpacing="-0.01em"
            >
              {label}
            </Text>
          ))}
      </Box>
    </Box>
  </Box>
);

const ThreePillars: React.FC = () => (
  <Box as="section" px={20} py={28} bg="gray.25">
    <Box
      as="h2"
      m={0}
      fontFamily="heading"
      fontSize="40px"
      fontWeight={400}
      letterSpacing="-0.025em"
      color={NAVY}
      maxW="720px"
    >
      One integrated platform
    </Box>

    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={16} mt={16}>
      {PILLARS.map(([n, title, desc]) => (
        <ValueCard key={n} number={n} title={title} body={desc} />
      ))}
    </Box>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      align="left"
      eyebrow="Built for private markets"
      headline="Portfolio Intelligence"
      subtext="Purpose built AI trusted by leading asset managers to organize portfolio data into a single, searchable source of truth for firm operations."
      subtextMaxW="580px"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      background={<LandingHeroBackground />}
    />
    <FirmsStrip />
    <ThreePillars />
  </Box>
);
