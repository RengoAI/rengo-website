import "@/theme2/fonts.css";

import { Box, Flex, Grid, Heading, HeadingProps, Text } from "@chakra-ui/react";
import { BookOpenText, NotebookPen, UsersRound } from "lucide-react";

import { NewSiteProvider } from "./new-site-provider";

// ─── Typed heading wrapper ────────────────────────────────────────────────────
// HeadingProps doesn't include our custom recipe variant names without running
// `chakra typegen` against theme2/system.ts. This alias adds the union so
// all usages below are fully type-safe.
type V2HeadingVariant =
  | "h1Regular" | "h1Light"
  | "h2Regular" | "h2Light"
  | "h3Regular" | "h3Light"
  | "h4Regular" | "h4Light"
  | "h5Regular" | "h5Light";

const V2Heading = Heading as React.ComponentType<
  HeadingProps & { variant?: V2HeadingVariant }
>;

// ─── Token shorthands ────────────────────────────────────────────────────────
// All resolve to CSS vars emitted by the v2 Chakra system (--v2-colors-*, --v2-fonts-*)
const C = {
  grey10: "var(--v2-colors-grey10)",
  grey20: "var(--v2-colors-grey20)",
  grey40: "var(--v2-colors-grey40)",
  grey50: "var(--v2-colors-grey50)",
  grey60: "var(--v2-colors-grey60)",
  concrete: "var(--v2-colors-concrete)",
  concrete2: "var(--v2-colors-concrete2)",
  indigo1: "var(--v2-colors-indigo1)",
  indigo2: "var(--v2-colors-indigo2)",
  indigo4: "var(--v2-colors-indigo4)",
} as const;

const F = {
  serif: "var(--v2-fonts-serif)",
  sans: "var(--v2-fonts-sans)",
} as const;

// Noto Serif variable-font axes — needed for correct optical rendering
const serifAxes = { fontVariationSettings: '"CTGR" 0, "wdth" 100' } as const;

// ─── 1. NavBar ────────────────────────────────────────────────────────────────
function NavBar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="100"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="100px"
      pt="12px"
      pb="9px"
      borderBottomWidth="1px"
      borderBottomColor={C.grey20}
      bg={C.grey10}
      backdropFilter="blur(2px)"
    >
      {/* Logo */}
      <Text
        fontFamily={F.sans}
        fontSize="14px"
        fontWeight="600"
        color="#2a3c6d"
        letterSpacing="-1px"
        lineHeight="1"
      >
        Rengo AI
      </Text>

      {/* Nav links */}
      <Flex gap="20px" alignItems="center">
        {(["Solutions", "Security", "Team"] as const).map((label) => (
          <Text
            key={label}
            as="a"
            fontFamily={F.sans}
            fontSize="12px"
            fontWeight="500"
            color={C.indigo1}
            textTransform="capitalize"
            cursor="pointer"
            _hover={{ opacity: 0.6 }}
          >
            {label}
          </Text>
        ))}
      </Flex>

      {/* CTA */}
      <Box
        as="a"
        bg={C.indigo1}
        borderRadius="2px"
        px="8px"
        cursor="pointer"
        _hover={{ opacity: 0.85 }}
      >
        <Text
          fontFamily={F.sans}
          fontSize="12px"
          lineHeight="19.5px"
          color="white"
        >
          Request Access →
        </Text>
      </Box>
    </Box>
  );
}

// ─── 2. Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <Box as="section" bg={C.grey10} w="full" h="672px" py="100px">
      <Flex w="full" alignItems="flex-start">
        <Flex
          flexDir="column"
          gap="28px"
          h="337px"
          alignItems="flex-start"
          justifyContent="flex-end"
          px="100px"
          maxW="798px"
        >
          {/* h1Regular: 44px Noto Serif, weight 350, -3px tracking, 110% lh */}
          <V2Heading
            variant="h1Regular"
            as="h1"
            color={C.indigo1}
            w="480px"
            whiteSpace="pre-wrap"
            style={serifAxes}
          >
            {"One foundation. \nEvery application."}
          </V2Heading>

          <Text
            fontFamily={F.sans}
            fontSize="16px"
            color={C.indigo1}
            lineHeight="1.2"
            maxW="537px"
          >
            Applications and agents deployed on a shared, governed data
            foundation — so every workflow builds on the last instead of
            starting from scratch.
          </Text>

          <Box
            as="button"
            bg={C.indigo1}
            borderRadius="2px"
            px="16px"
            py="4px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ opacity: 0.85 }}
          >
            <Text fontFamily={F.sans} fontSize="14px" color="#fbfbf6" lineHeight="21px">
              Request Access
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

// ─── 3. Solutions ─────────────────────────────────────────────────────────────
interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SolutionCard({ icon, title, description }: SolutionCardProps) {
  return (
    <Box
      flex="1 0 0"
      bg={C.concrete}
      borderRightWidth="1px"
      borderRightColor={C.concrete2}
      boxShadow="0px 4px 8px rgba(12,29,52,0.04)"
      p="36px"
      display="flex"
      flexDir="column"
      gap="8px"
      justifyContent="center"
      minH="209px"
      _last={{ borderRightWidth: 0 }}
    >
      <Box w="24px" h="24px" color={C.indigo1} flexShrink="0">
        {icon}
      </Box>
      {/* h4Regular: 24px Geist, weight 400, -0.8px tracking, 120% lh */}
      <V2Heading
        variant="h4Regular"
        as="h3"
        color="#20283d"
        whiteSpace="nowrap"
      >
        {title}
      </V2Heading>
      <Text
        fontFamily={F.sans}
        fontSize="16px"
        color={C.grey60}
        lineHeight="1.4"
        maxW="346px"
      >
        {description}
      </Text>
    </Box>
  );
}

function SolutionsSection() {
  const cards = [
    {
      icon: <BookOpenText size={24} />,
      title: "Portfolio Monitoring",
      description:
        "Unify historical financials, native files, and portfolio context into a governed data lake.",
    },
    {
      icon: <NotebookPen size={24} />,
      title: "Deal Review",
      description:
        "Compare each opportunity against firm precedent without rebuilding context.",
    },
    {
      icon: <UsersRound size={24} />,
      title: "Investor Relations",
      description:
        "LP letters, capital calls, and one-off asks answered from the same foundation.",
    },
  ];

  return (
    <Box
      as="section"
      w="full"
      maxW="1424px"
      mx="auto"
      px="80px"
      py="100px"
      display="flex"
      flexDir="column"
      gap="60px"
    >
      {/* h2Regular: 32px Noto Serif, weight 350, -3px tracking, 110% lh */}
      <V2Heading
        variant="h2Regular"
        as="h2"
        color="#20283d"
        maxW="553px"
        style={serifAxes}
      >
        Ready-to-deploy applications. Tailored to{" "}
        <Box as="span" color={C.indigo4}>
          how your firm operates.
        </Box>
      </V2Heading>

      <Box
        display="flex"
        borderWidth="1px"
        borderColor={C.concrete2}
        borderRadius="8px"
        overflow="hidden"
      >
        {cards.map((card) => (
          <SolutionCard key={card.title} {...card} />
        ))}
      </Box>
    </Box>
  );
}

// ─── 4. Agent Capabilities (Bento grid) ──────────────────────────────────────
interface BentoCardProps {
  children: React.ReactNode;
  gridColumn: string;
  gridRow: string;
}

function BentoCard({ children, gridColumn, gridRow }: BentoCardProps) {
  return (
    <Box
      bg={C.concrete}
      borderWidth="1px"
      borderColor="#e1e1e6"
      borderRadius="8px"
      boxShadow="0px 2px 4px rgba(12,29,52,0.04)"
      p="28px"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      overflow="hidden"
      style={{ gridColumn, gridRow }}
    >
      {/* Illustration placeholder (mix-blend-color-burn in Figma) */}
      <Box h="120px" w="160px" bg={C.grey40} opacity={0.12} borderRadius="4px" />

      {/* h5Regular: 20px Geist, weight 400, -0.8px tracking, 120% lh */}
      <V2Heading
        variant="h5Regular"
        as="h3"
        color={C.indigo1}
        letterSpacing="-0.4px"
      >
        {children}
      </V2Heading>
    </Box>
  );
}

function AgentCapabilitiesSection() {
  return (
    <Box
      as="section"
      bg={C.grey10}
      w="full"
      maxW="1424px"
      mx="auto"
      px="80px"
      py="120px"
      display="flex"
      flexDir="column"
      gap="60px"
      minH="800px"
    >
      {/* 36px serif — no recipe variant; use Chakra primitives */}
      <Box maxW="730px" fontFamily={F.serif} fontWeight="350" fontSize="36px" letterSpacing="-2px" style={serifAxes}>
        <Text
          as="p"
          fontFamily="inherit"
          fontSize="inherit"
          fontWeight="inherit"
          letterSpacing="inherit"
          lineHeight="1.2"
          color="#20283d"
          maxW="553px"
        >
          Work moves off the team&rsquo;s desk.
        </Text>
        <Text
          as="p"
          fontFamily="inherit"
          fontSize="inherit"
          fontWeight="inherit"
          letterSpacing="inherit"
          lineHeight="1.2"
        >
          <Box as="span" color={C.indigo4}>Let agents execute </Box>
          <Box as="span" color="#20283d">recurring workflows.</Box>
        </Text>
      </Box>

      <Grid
        gridTemplateColumns="repeat(7, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        h="769px"
        gap="12px"
        w="full"
      >
        <BentoCard gridColumn="1 / span 3" gridRow="1 / span 2">
          Built on top of your existing tools and systems
        </BentoCard>
        <BentoCard gridColumn="4 / span 2" gridRow="1 / span 2">
          Single source of truth
        </BentoCard>
        <BentoCard gridColumn="6 / span 2" gridRow="1 / span 2">
          Control access &amp; permissions
        </BentoCard>
        <BentoCard gridColumn="1 / span 2" gridRow="3 / span 2">
          Govern the ontology of your data
        </BentoCard>
        <BentoCard gridColumn="3 / span 3" gridRow="3 / span 2">
          Wire directly into Claude, Copilot, or your own tools
        </BentoCard>
        <BentoCard gridColumn="6 / span 2" gridRow="3 / span 2">
          Run agents
        </BentoCard>
      </Grid>
    </Box>
  );
}

// ─── 5. Three Agents (Feature Detail) ────────────────────────────────────────
interface AgentRowProps {
  title: string;
  subtext: string;
  description: string;
}

function AgentRow({ title, subtext, description }: AgentRowProps) {
  return (
    <Flex
      w="full"
      alignItems="flex-start"
      borderBottomWidth="1px"
      borderBottomColor="#b7ccd6"
      py="28px"
      minH="115.5px"
      gap="0"
    >
      {/* Left: title + subtext — fixed 260px column */}
      <Box minW="260px" flexShrink={0}>
        <Text
          fontFamily={F.sans}
          fontSize="24px"
          fontWeight="500"
          color={C.indigo2}
          letterSpacing="-0.48px"
          lineHeight="36px"
        >
          {title}
        </Text>
        <Text
          fontFamily={F.sans}
          fontSize="12px"
          color="#8999ac"
          lineHeight="18px"
          mt="2px"
        >
          {subtext}
        </Text>
      </Box>

      {/* Right: description */}
      <Text
        fontFamily={F.sans}
        fontSize="15px"
        color={C.grey60}
        lineHeight="24.75px"
        maxW="720px"
        pt="6px"
      >
        {description}
      </Text>
    </Flex>
  );
}

function ThreeAgentsSection() {
  const agents = [
    {
      title: "Ingestion",
      subtext: "Knows how your data is structured.",
      description:
        "Watch email, portals, and shared drives. Pull, parse, and route incoming documents into the ontology without templates.",
    },
    {
      title: "Reconciliation",
      subtext: "Make sure everything agrees.",
      description:
        "Continuously match figures across models, ledger entries, and reporting workflows. Flag drift the moment it happens.",
    },
    {
      title: "Synthesis",
      subtext: "Turn structure into meaning.",
      description:
        "Draft memos, letters, and briefs on demand — grounded in current portfolio state, permissioned to the requester.",
    },
  ];

  return (
    <Box as="section" w="full" px="80px" py="100px" display="flex" flexDir="column">
      {/* Heading — right-aligned, 36px serif, no recipe variant */}
      <Box w="full" display="flex" justifyContent="flex-end" pb="20px" minH="241px" alignItems="center">
        <Box
          maxW="681px"
          fontFamily={F.serif}
          fontWeight="350"
          fontSize="36px"
          letterSpacing="-2px"
          color="#232a41"
          style={serifAxes}
        >
          <Text
            as="p"
            fontFamily="inherit"
            fontSize="inherit"
            fontWeight="inherit"
            letterSpacing="inherit"
            lineHeight="1.2"
            mb="0"
          >
            <Box as="span">Three agents.</Box>
            <Box as="span" color={C.indigo4}> One coordinated system.</Box>
          </Text>
          <Text
            as="p"
            fontFamily="inherit"
            fontSize="inherit"
            fontWeight="inherit"
            letterSpacing="inherit"
            lineHeight="1.2"
          >
            Simplify the systems your firm already uses — email, ledger,
            portals, files.
          </Text>
        </Box>
      </Box>

      {/* Rows */}
      <Box w="full">
        {agents.map((agent) => (
          <AgentRow key={agent.title} {...agent} />
        ))}
      </Box>
    </Box>
  );
}

// ─── 6. Testimonial / Case Study ──────────────────────────────────────────────
const CASE_STEPS = [
  {
    num: "01",
    title: "Migrate",
    body: "Moved the firm off its existing portfolio-monitoring software.",
  },
  {
    num: "02",
    title: "Unify",
    body: "Built a governed data lake of all historical portfolio financials.",
  },
  {
    num: "03",
    title: "Automate",
    body: "Ingested native files without templates or manual review.",
  },
  {
    num: "04",
    title: "Deploy",
    body: "Permissioned the data and made it available to AI tools through MCP.",
  },
  {
    num: "05",
    title: "Operate",
    body: "Maintain and extend applications on the shared foundation.",
  },
];

function TestimonialSection() {
  return (
    <Box as="section" w="full" px="60px" py="0" bg={C.grey10}>
      <Box
        borderRadius="16px"
        overflow="hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(22,54,85,1) 0%, rgba(16,33,55,1) 100%)",
        }}
      >
        <Box
          borderTopWidth="1px"
          borderTopColor="#4c5268"
          pt="97px"
          pb="96px"
          px="60px"
          w="full"
        >
          {/* Quote — 36px serif, no recipe variant */}
          <Box maxW="820px" mb="20px">
            <Box
              as="p"
              fontFamily={F.serif}
              fontWeight="300"
              fontSize="36px"
              letterSpacing="-2px"
              color="#e5e6e7"
              lineHeight="1.2"
              style={serifAxes}
            >
              <Box as="span">Rengo delivered </Box>
              <Box as="span" color="#3298eb">more in a month</Box>
              <Box as="span"> than previous vendors did in over a year.</Box>
            </Box>
          </Box>
          <Text
            fontFamily={F.sans}
            fontWeight="300"
            fontSize="15px"
            color="white"
            textDecoration="underline"
            lineHeight="24.75px"
            mb="56px"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            display="block"
          >
            Read more →
          </Text>

          {/* Steps timeline */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            borderWidth="1px"
            borderColor="#474a67"
            borderRadius="4px"
            w="full"
          >
            {CASE_STEPS.map((step, i) => (
              <Box
                key={step.num}
                borderRightWidth={i < 4 ? "1px" : "0"}
                borderRightColor="#474a67"
                p="28px"
                display="flex"
                flexDir="column"
              >
                <Text
                  fontFamily={F.sans}
                  fontSize="11px"
                  color="#8999ac"
                  letterSpacing="1.54px"
                  lineHeight="16.5px"
                  mb="4px"
                >
                  {step.num}
                </Text>
                <Text
                  fontFamily={F.sans}
                  fontSize="22px"
                  color="#e5e6e7"
                  letterSpacing="-0.44px"
                  lineHeight="33px"
                  mb="8px"
                >
                  {step.title}
                </Text>
                <Text
                  fontFamily={F.sans}
                  fontSize="13px"
                  color="#97aec8"
                  lineHeight="20.8px"
                >
                  {step.body}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── 7. Security Badges ───────────────────────────────────────────────────────
const BADGES = [
  {
    title: "SOC2 TypeII",
    sub: "Continuous — report available under NDA",
    borderRight: true,
  },
  {
    title: "GDPR-Ready",
    sub: "EU data residency available",
    borderRight: true,
  },
  {
    title: "Pen-tested",
    sub: "Independent third-party, annually",
    borderRight: false,
  },
];

function SecuritySection() {
  return (
    <Box
      as="section"
      w="full"
      h="160px"
      display="flex"
      alignItems="center"
      px="86px"
    >
      {BADGES.map((badge) => (
        <Box
          key={badge.title}
          flex="1 0 0"
          borderRightWidth={badge.borderRight ? "1px" : "0"}
          borderRightColor="#bcc4da"
          px="40px"
          py="20px"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          {/* h3Regular: 24px Noto Serif, weight 350, -3px tracking, 110% lh */}
          <V2Heading
            variant="h3Regular"
            as="h3"
            color="#303e62"
            textAlign="center"
            style={serifAxes}
          >
            {badge.title}
          </V2Heading>
          <Text
            fontFamily={F.sans}
            fontSize="14px"
            color="#303e62"
            lineHeight="24.75px"
            textAlign="center"
          >
            {badge.sub}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

// ─── 8. Final CTA ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <Box
      as="section"
      w="full"
      maxW="1424px"
      mx="auto"
      borderTopWidth="1px"
      borderTopColor="#4c5268"
      pt="111px"
      pb="110px"
      px="20px"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 12% 11%, rgba(27,51,73,1) 0%, rgba(13,28,44,1) 100%)",
      }}
    >
      <Box display="flex" flexDir="column" alignItems="flex-end">
        {/* 60px serif — no recipe variant; use Chakra primitives */}
        <Box maxW="960px" pt="24px" mb="48px">
          <Box
            as="p"
            fontFamily={F.serif}
            fontWeight="300"
            fontSize="60px"
            color="#e0e3ed"
            letterSpacing="-2px"
            lineHeight="1"
            textAlign="right"
            style={serifAxes}
          >
            Rengo is the AI deployment company for investment firms.
          </Box>
        </Box>

        <Flex gap="14px">
          <Box
            as="button"
            bg="white"
            px="32px"
            py="13px"
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
          >
            <Text
              fontFamily={F.sans}
              fontWeight="500"
              fontSize="14px"
              color="#0d1d2c"
              lineHeight="21px"
            >
              Request Access
            </Text>
          </Box>
          <Box
            as="button"
            borderWidth="1px"
            borderColor="#949aac"
            px="33px"
            py="14px"
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
          >
            <Text
              fontFamily={F.sans}
              fontSize="14px"
              color="white"
              lineHeight="21px"
            >
              Talk to Sales →
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

// ─── 9. Footer ────────────────────────────────────────────────────────────────
const FOOTER_LINKS = ["Product", "Solutions", "Team", "Privacy", "Terms"] as const;

function Footer() {
  return (
    <Box
      as="footer"
      w="full"
      bg="#0d1d2c"
      borderTopWidth="1px"
      borderTopColor="#223857"
      h="192px"
      display="flex"
      alignItems="center"
      px="20px"
    >
      <Flex
        w="full"
        maxW="1320px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontFamily={`"Geist Mono", monospace`}
          fontSize="13px"
          color="#dadada"
          letterSpacing="0.7px"
          textTransform="uppercase"
          lineHeight="19.5px"
        >
          Rengo AI
        </Text>

        <Flex gap="24px">
          {FOOTER_LINKS.map((label) => (
            <Text
              key={label}
              as="a"
              fontFamily={F.sans}
              fontSize="13px"
              color="#5a6a8a"
              lineHeight="19.5px"
              cursor="pointer"
              _hover={{ color: "#97aec8" }}
            >
              {label}
            </Text>
          ))}
        </Flex>

        <Text
          fontFamily={`"Geist Mono", monospace`}
          fontSize="11px"
          color="#3a4a6a"
          lineHeight="16.5px"
        >
          © 2026 Rengo AI
        </Text>
      </Flex>
    </Box>
  );
}

// ─── Page Assembly ────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      w="full"
      minH="100vh"
      bg={C.grey10}
      overflowX="hidden"
    >
      <NavBar />
      <HeroSection />
      <SolutionsSection />
      <AgentCapabilitiesSection />
      <ThreeAgentsSection />
      <TestimonialSection />
      <SecuritySection />
      <FinalCTASection />
      <Footer />
    </Box>
  );
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
export default function NewSitePage() {
  return (
    <NewSiteProvider>
      <LandingPage />
    </NewSiteProvider>
  );
}
