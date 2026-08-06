import "@/theme2/fonts.css";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BookOpenText, NotebookPen, UsersRound } from "lucide-react";

import { NavBar }                   from "@/components2/nav-bar";
import { AgentCapabilitiesSection } from "@/components2/agent-capabilities";
import { SiteFooter }               from "@/components2/site-footer";
import { SectionLayout }            from "@/components2/section-layout";
import {
  C, F, serifAxes,
  sectionPy, V2Heading,
} from "@/components2/new-site-tokens";

import { NewSiteProvider } from "./new-site-provider";

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <SectionLayout bg={C.grey10} showTopBorder={false} py={{ base: "136px", md: "160px", lg: "184px" }}>
      <Flex
          flexDir="column"
          gap={{ base: "20px", md: "24px", lg: "28px" }}
          alignItems="flex-start"
        >
          <V2Heading
            variant="h1Regular"
            as="h1"
            color={C.indigo1}
            maxW={{ base: "full", lg: "520px" }}
            whiteSpace="pre-wrap"
            fontSize={{ base: "32px", sm: "36px", md: "40px", lg: "44px" }}
            letterSpacing={{ base: "-1.5px", md: "-2px", lg: "-3px" }}
            style={serifAxes}
          >
            {"One foundation. \nEvery application."}
          </V2Heading>

          <Text
            fontFamily={F.sans}
            fontSize={{ base: "14px", md: "15px", lg: "16px" }}
            color={C.indigo1}
            lineHeight="1.4"
            maxW={{ base: "full", lg: "537px" }}
          >
            Applications and agents deployed on a shared, governed data
            foundation — so every workflow builds on the last instead of
            starting from scratch.
          </Text>

          <Button
            unstyled
            bg={C.indigo1}
            borderRadius="4px"
            px="16px"
            py={{ base: "12px", lg: "8px" }}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            minH="44px"
            _hover={{ opacity: 0.85 }}
            w={{ base: "full", sm: "auto" }}
          >
            <Text fontFamily={F.sans} fontSize="14px" color="#fbfbf6" lineHeight="21px">
              Request Access
            </Text>
          </Button>
        </Flex>
    </SectionLayout>
  );
}

// ─── 2. Solutions ─────────────────────────────────────────────────────────────
interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SolutionCard({ icon, title, description }: SolutionCardProps) {
  return (
    <Box
      flex={{ base: "none", md: "1 0 0" }}
      w={{ base: "full", md: "auto" }}
      bg={C.concrete}
      borderRightWidth={{ base: "0", md: "1px" }}
      borderRightColor={C.concrete2}
      borderBottomWidth={{ base: "1px", md: "0" }}
      borderBottomColor={C.concrete2}
      _last={{ borderRightWidth: "0", borderBottomWidth: "0" }}
      boxShadow="0px 4px 8px rgba(12,29,52,0.04)"
      p={{ base: "24px", md: "28px", lg: "36px" }}
      display="flex"
      flexDir="column"
      gap="8px"
      justifyContent="center"
      minH={{ base: "auto", md: "208px" }}
    >
      <Box w="24px" h="24px" color={C.indigo1} flexShrink={0}>
        {icon}
      </Box>
      <V2Heading variant="h5Regular" as="h3" color="#20283d">
        {title}
      </V2Heading>
      <Text
        fontFamily={F.sans}
        fontSize={{ base: "14px", md: "15px", lg: "16px" }}
        color={C.grey60}
        lineHeight="1.4"
        maxW={{ base: "full", lg: "346px" }}
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
    <SectionLayout py={sectionPy}>
      <Box display="flex" flexDir="column" gap={{ base: "32px", lg: "60px" }}>
        <V2Heading
          variant="h2Regular"
          as="h2"
          color="#20283d"
          maxW={{ base: "full", lg: "553px" }}
          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
          letterSpacing={{ base: "-0.5px", lg: "-1px" }}
          style={serifAxes}
        >
          Ready-to-deploy applications. Tailored to{" "}
          <Box as="span" color={C.indigo4}>
            how your firm operates.
          </Box>
        </V2Heading>

        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          borderWidth="1px"
          borderColor={C.concrete2}
          borderRadius="4px"
          overflow="hidden"
        >
          {cards.map((card) => (
            <SolutionCard key={card.title} {...card} />
          ))}
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 3. Three Agents (Feature Detail) ────────────────────────────────────────
interface AgentRowProps {
  title: string;
  subtext: string;
  description: string;
}

function AgentRow({ title, subtext, description }: AgentRowProps) {
  return (
    <Flex
      w="full"
      flexDir={{ base: "column", md: "row" }}
      alignItems="flex-start"
      borderBottomWidth="1px"
      borderBottomColor="#b7ccd6"
      py={{ base: "20px", md: "24px", lg: "28px" }}
      gap={{ base: "8px", md: "0" }}
    >
      <Box minW={{ base: "auto", md: "220px", lg: "260px" }} flexShrink={0}>
        <V2Heading
          variant="h5Regular"
          as="h3"
          color={C.indigo2}
          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
          fontWeight="500"
          letterSpacing="-0.48px"
          lineHeight="1.5"
        >
          {title}
        </V2Heading>
        <Text
          fontFamily={F.sans}
          fontSize="12px"
          color="#8999ac"
          lineHeight="18px"
          mt="0"
        >
          {subtext}
        </Text>
      </Box>

      <Text
        fontFamily={F.sans}
        fontSize={{ base: "14px", md: "14px", lg: "15px" }}
        color={C.grey60}
        lineHeight={{ base: "1.5", lg: "24.75px" }}
        maxW={{ base: "full", lg: "720px" }}
        pt={{ base: "0", md: "6px" }}
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
    <SectionLayout py={sectionPy}>
      <Box display="flex" flexDir="column">
        <Box
          w="full"
          display="flex"
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
          pb={{ base: "16px", lg: "20px" }}
          minH={{ base: "auto", lg: "200px" }}
          alignItems="center"
        >
          <V2Heading
            variant="h2Regular"
            as="h2"
            color="#232a41"
            maxW={{ base: "full", lg: "681px" }}
            fontSize={{ base: "24px", md: "28px", lg: "36px" }}
            letterSpacing={{ base: "-0.5px", md: "-1px", lg: "-2px" }}
            lineHeight="1.2"
            style={serifAxes}
          >
            <Box as="span">Three agents.</Box>
            <Box as="span" color={C.indigo4}> One coordinated system.</Box>
            <br />
            Simplify the systems your firm already uses — email, ledger,
            portals, files.
          </V2Heading>
        </Box>

        <Box w="full">
          {agents.map((agent) => (
            <AgentRow key={agent.title} {...agent} />
          ))}
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 4. Testimonial / Case Study ──────────────────────────────────────────────
const CASE_STEPS = [
  { num: "01", title: "Migrate",  body: "Moved the firm off its existing portfolio-monitoring software." },
  { num: "02", title: "Unify",    body: "Built a governed data lake of all historical portfolio financials." },
  { num: "03", title: "Automate", body: "Ingested native files without templates or manual review." },
  { num: "04", title: "Deploy",   body: "Permissioned the data and made it available to AI tools through MCP." },
  { num: "05", title: "Operate",  body: "Maintain and extend applications on the shared foundation." },
];

function TestimonialSection() {
  return (
    <SectionLayout bg={C.grey10} py={sectionPy}>
      <Box
          borderRadius={{ base: "12px", lg: "16px" }}
          overflow="hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(22,54,85,1) 0%, rgba(16,33,55,1) 100%)",
          }}
        >
          <Box
            borderTopWidth="1px"
            borderTopColor="#4c5268"
            pt={{ base: "48px", md: "64px", lg: "96px" }}
            pb={{ base: "48px", md: "64px", lg: "96px" }}
            px={{ base: "24px", md: "40px", lg: "60px" }}
            w="full"
          >
            <V2Heading
              variant="h1Light"
              as="p"
              color="#e5e6e7"
              maxW={{ base: "full", lg: "820px" }}
              mb="20px"
              fontSize={{ base: "22px", md: "28px", lg: "36px" }}
              letterSpacing={{ base: "-0.5px", md: "-1px", lg: "-2px" }}
              lineHeight="1.2"
              style={serifAxes}
            >
              <Box as="span">Rengo delivered </Box>
              <Box as="span" color="#3298eb">more in a month</Box>
              <Box as="span"> than previous vendors did in over a year.</Box>
            </V2Heading>
            <Text
              fontFamily={F.sans}
              fontWeight="300"
              fontSize="15px"
              color="white"
              textDecoration="underline"
              lineHeight="24.75px"
              mb={{ base: "32px", lg: "56px" }}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              display="block"
            >
              Read more →
            </Text>

            <Box
              display="grid"
              gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}
              borderWidth="1px"
              borderColor="#474a67"
              borderRadius="4px"
              overflow="hidden"
              w="full"
            >
              {CASE_STEPS.map((step) => (
                <Box
                  key={step.num}
                  borderRightWidth="1px"
                  borderRightColor="#474a67"
                  borderBottomWidth="1px"
                  borderBottomColor="#474a67"
                  p={{ base: "20px", lg: "28px" }}
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
                  <V2Heading
                    variant="h5Regular"
                    as="h3"
                    color="#e5e6e7"
                    fontSize={{ base: "18px", lg: "22px" }}
                    letterSpacing="-0.44px"
                    lineHeight="1.5"
                    mb="8px"
                  >
                    {step.title}
                  </V2Heading>
                  <Text
                    fontFamily={F.sans}
                    fontSize={{ base: "12px", lg: "13px" }}
                    color="#97aec8"
                    lineHeight="1.6"
                  >
                    {step.body}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
    </SectionLayout>
  );
}

// ─── 5. Security Badges ───────────────────────────────────────────────────────
const BADGES = [
  { title: "SOC2 TypeII", sub: "Continuous — report available under NDA" },
  { title: "GDPR-Ready",  sub: "EU data residency available" },
  { title: "Pen-tested",  sub: "Independent third-party, annually" },
];

function SecuritySection() {
  return (
    <SectionLayout showRails={false} py={{ base: "32px", md: "0" }}>
      <Flex
        w="full"
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "stretch", md: "center" }}
        minH={{ base: "auto", md: "160px" }}
      >
        {BADGES.map((badge, i) => (
          <Box
            key={badge.title}
            flex="1 0 0"
            borderRightWidth={{ base: "0", md: i < BADGES.length - 1 ? "1px" : "0" }}
            borderRightColor="#bcc4da"
            borderBottomWidth={{ base: i < BADGES.length - 1 ? "1px" : "0", md: "0" }}
            borderBottomColor="#bcc4da"
            px={{ base: "0", md: "32px", lg: "40px" }}
            py={{ base: "20px", md: "20px" }}
            display="flex"
            flexDir="column"
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <V2Heading
              variant="h3Regular"
              as="h3"
              color="#303e62"
              textAlign={{ base: "left", md: "center" } as any}
              style={serifAxes}
              fontSize={{ base: "20px", lg: "24px" }}
            >
              {badge.title}
            </V2Heading>
            <Text
              fontFamily={F.sans}
              fontSize={{ base: "13px", lg: "14px" }}
              color="#303e62"
              lineHeight="24.75px"
              textAlign={{ base: "left", md: "center" } as any}
            >
              {badge.sub}
            </Text>
          </Box>
        ))}
      </Flex>
    </SectionLayout>
  );
}

// ─── 6. Final CTA ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <SectionLayout
      showRails={false}
      railColor="#4c5268"
      py={{ base: "60px", md: "80px", lg: "112px" }}
      outerProps={{
        style: {
          backgroundImage:
            "radial-gradient(ellipse at 12% 11%, rgba(27,51,73,1) 0%, rgba(13,28,44,1) 100%)",
        },
      }}
    >
        <Box display="flex" flexDir="column" alignItems={{ base: "flex-start", lg: "flex-end" }}>
          <Box w="60%" pt={{ base: "0", lg: "24px" }} mb={{ base: "32px", lg: "48px" }}>
            <V2Heading
              variant="h1Light"
              as="p"
              color="#e0e3ed"
              textAlign={{ base: "left", lg: "right" } as any}
              style={serifAxes}
            >
              Rengo is the AI deployment company for investment firms.
            </V2Heading>
          </Box>

          <Flex gap="12px" flexDir={{ base: "column", sm: "row" }} w={{ base: "full", sm: "auto" }}>
            <Button
              unstyled
              bg="white"
              px="32px" py="12px"
              cursor="pointer"
              minH="44px"
              w={{ base: "full", sm: "auto" }}
              _hover={{ opacity: 0.9 }}
            >
              <Text fontFamily={F.sans} fontWeight="500" fontSize="14px" color="#0d1d2c" lineHeight="21px">
                Request Access
              </Text>
            </Button>
            <Button
              unstyled
              borderWidth="1px"
              borderColor="#949aac"
              px="32px" py="12px"
              cursor="pointer"
              minH="44px"
              w={{ base: "full", sm: "auto" }}
              _hover={{ opacity: 0.9 }}
            >
              <Text fontFamily={F.sans} fontSize="14px" color="white" lineHeight="21px">
                Talk to Sales →
              </Text>
            </Button>
          </Flex>
        </Box>
    </SectionLayout>
  );
}

// ─── Page Assembly ────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <Box display="flex" flexDir="column" w="full" minH="100vh" bg={C.grey10}>
      <NavBar darkNav={true} />
      <Box flexShrink={0} h="76px" w="full" aria-hidden />
      <HeroSection />
      <SolutionsSection />
      <AgentCapabilitiesSection />
      <ThreeAgentsSection />
      <TestimonialSection />
      <SecuritySection />
      <FinalCTASection />
      <SiteFooter />
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
