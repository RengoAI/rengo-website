import { Logo } from "@/components/logo/logo";
import { PulseGrid } from "@/components/pulse-grid";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

const ACCENT_SOFT = "primary.400";
const TINT = "#1A3358";
const NAVY = "gray.900";

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


const HeroNav: React.FC = () => (
  <Box
    as="header"
    position="sticky"
    top={0}
    zIndex={10}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    px={12}
    py={4}
    borderBottom="1px solid"
    borderColor="whiteAlpha.100"
    bg={NAVY}
  >
    <Link to="/" style={{ textDecoration: "none" }}>
      <Logo color="white" size="default" />
    </Link>

    <Flex
      as="nav"
      gap={8}
      fontSize="sm"
      color="whiteAlpha.700"
      fontWeight="medium"
    >
      <Text as="span">Product</Text>
      <Text as="span">Security</Text>
      <Text as="span">Company</Text>
    </Flex>

    <Flex gap={3}>
      <Button
        variant="outline"
        borderRadius="md"
        borderColor="whiteAlpha.400"
        color="white"
        bg="transparent"
        size="sm"
        _hover={{ bg: "whiteAlpha.100" }}
        onClick={() => window.open("https://app.rengoai.com/", "_blank")}
      >
        Log in
      </Button>
      <Button
        borderRadius="md"
        bg="white"
        color={NAVY}
        size="sm"
        _hover={{ bg: "gray.100" }}
        onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      >
        Talk to our team
      </Button>
    </Flex>
  </Box>
);

const HeroSection: React.FC = () => (
  <Box
    as="section"
    position="relative"
    bg={NAVY}
    color="white"
    minH="100vh"
    display="flex"
    flexDirection="column"
    overflow="hidden"
  >
    {/* PulseGrid background */}
    <Box position="absolute" inset={0}>
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

    <HeroNav />

    {/* Hero copy */}
    <Flex
      position="relative"
      zIndex={2}
      flex={1}
      direction="column"
      justify="center"
      px={16}
      pb={12}
    >
      <Text
        fontFamily="mono"
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
          Talk to our team
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
      fontFamily="mono"
      fontSize="11px"
      color="gray.500"
      letterSpacing="0.08em"
      textTransform="uppercase"
      px={12}
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
              fontSize="28px"
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
  <Box as="section" px={12} py={28} bg="gray.25">
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
      Three workflows.
      <br />
      One source of truth.
    </Box>

    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={16} mt={16}>
      {PILLARS.map(([n, title, desc]) => (
        <Box key={n} borderTop="1px solid" borderColor="primary.700" pt={5}>
          <Text
            as="span"
            fontFamily="mono"
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

const LandingFooter: React.FC = () => (
  <Box as="footer" bg={NAVY} color="white" px={12} pt={10} pb={6}>
    <Flex justify="space-between" align="flex-start" gap={8}>
      <Logo color="white" size="default" />

      <Flex gap={14} fontSize="sm">
        <Flex direction="column" gap={2}>
          <Text fontWeight="semibold">Solutions</Text>
          <Text opacity={0.7}>Portfolio Monitoring</Text>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="semibold">Legal</Text>
          <Link
            to="/legal/privacy-policy"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/legal/terms-of-service"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Terms of Service
          </Link>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="semibold">Company</Text>
          <Link
            to="/careers"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Careers
          </Link>
        </Flex>
      </Flex>
    </Flex>

    <Flex
      mt={8}
      pt={4}
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      justify="space-between"
      fontFamily="mono"
      fontSize="11px"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="whiteAlpha.500"
    >
      <Text as="span">© 2026 Rengo AI, Inc.</Text>
      <Flex gap={6}>
        <Text
          as="span"
          cursor="pointer"
          onClick={() =>
            window.open("https://www.linkedin.com/company/106703002", "_blank")
          }
        >
          LinkedIn
        </Text>
        <Text
          as="span"
          cursor="pointer"
          onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
        >
          Contact
        </Text>
      </Flex>
    </Flex>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Box fontFamily="body">
    <HeroSection />
    <FirmsStrip />
    <ThreePillars />
    <LandingFooter />
  </Box>
);
