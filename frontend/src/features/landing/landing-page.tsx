import { PulseGrid } from "@/components/pulse-grid";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const ACCENT_SOFT = "primary.400";
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

const HeroSection: React.FC = () => (
  <Box
    as="section"
    position="relative"
    bg={NAVY}
    color="white"
    minH="100vh"
    display="flex"
    flexDirection="column"
  >
    {/* PulseGrid background */}
    <Box position="absolute" inset={0} overflow="hidden">
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
    </Box>

    {/* Left-to-right gradient wash */}
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{
        background:
          "linear-gradient(to right, rgba(7,20,42,0.92) 0%, rgba(12,29,52,0.78) 38%, rgba(12,29,52,0.4) 65%, rgba(12,29,52,0.15) 100%)",
      }}
    />

    {/* Bottom fade */}
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

    {/* Hero copy */}
    <Flex
      position="relative"
      zIndex={2}
      flex={1}
      direction="column"
      justify="center"
      px={20}
      pt="80px"
      pb={12}
    >
      <Text
        fontFamily={EDICT}
        fontSize="11px"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color={ACCENT_SOFT}
        mb={6}
      >
        Built for private markets
      </Text>

      <Box
        as="h1"
        m={0}
        fontFamily="heading"
        fontSize="clamp(52px, 6vw, 84px)"
        lineHeight={1.04}
        letterSpacing="-0.025em"
        fontWeight={400}
        color="white"
        maxW="880px"
      >
        Portfolio Intelligence
      </Box>

      <Box h="1px" bg="whiteAlpha.500" w="72px" my={7} />

      <Text fontSize="lg" lineHeight={1.45} color="whiteAlpha.800" maxW="580px">
        Purpose built AI trusted by leading asset managers to organize portfolio
        data into a single, searchable source of truth for firm operations.
      </Text>

      <Flex mt={9} gap={3}>
        <Button
          borderRadius="md"
          bg="white"
          color={NAVY}
          border="1px solid white"
          h="42px"
          px={6}
          fontSize="15px"
          fontWeight="medium"
          _hover={{ bg: "gray.50" }}
          onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
        >
          See a demo
        </Button>
      </Flex>
    </Flex>
  </Box>
);

const FirmsStrip: React.FC = () => (
  <Box
    as="section"
    bg="primary.25"
    borderBottom="1px solid"
    borderColor="border.muted"
    py={8}
  >
    <Text
      fontFamily={EDICT}
      fontSize="11px"
      color="gray.500"
      letterSpacing="0.08em"
      textTransform="uppercase"
      px={20}
      mb={4}
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
        <Box key={n} borderTop="1px solid" borderColor="primary.700" pt={5}>
          <Text
            as="span"
            fontFamily={EDICT}
            fontSize="11px"
            color="primary.700"
            letterSpacing="0.08em"
          >
            {n}
          </Text>
          <Box
            as="h3"
            mt="10px"
            mb="12px"
            fontFamily="heading"
            fontSize="24px"
            fontWeight={400}
            color={NAVY}
          >
            {title}
          </Box>
          <Text fontSize="sm" lineHeight={1.6} color="gray.600">
            {desc}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Box fontFamily="body">
    <HeroSection />
    <FirmsStrip />
    <ThreePillars />
  </Box>
);
