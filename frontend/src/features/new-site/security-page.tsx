import "@/theme2/fonts.css";

import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { NavBar }        from "@/components2/nav-bar";
import { SiteFooter }    from "@/components2/site-footer";
import { SectionLayout } from "@/components2/section-layout";
import {
  C, F, serifAxes,
  V2Heading,
} from "@/components2/new-site-tokens";

import { NewSiteProvider } from "./new-site-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────
const FOUR_THINGS = [
  {
    num: "01",
    title: "No training on your data",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
  },
  {
    num: "02",
    title: "Data isolation at the storage layer",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
  },
  {
    num: "03",
    title: "Encrypted everywhere",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
  },
  {
    num: "04",
    title: "SOC 2 Type II, continuously tested",
    body: "LP letters, capital calls, and one-off asks answered from the same foundation.",
  },
];

const GOVERNANCE_ROWS = [
  {
    title: "Access",
    body: "Watch email, portals, and shared drives. Pull, parse, and route incoming documents into the ontology without templates.",
  },
  {
    title: "Lineage",
    body: "Continuously match figures across models, ledger entries, and reporting workflows. Flag drift the moment it happens.",
  },
  {
    title: "Audit trail",
    body: "Draft memos, letters, and briefs on demand — grounded in current portfolio state, permissioned to the requester.",
  },
  {
    title: "Deployment",
    body: "Draft memos, letters, and briefs on demand — grounded in current portfolio state, permissioned to the requester.",
  },
];

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function SecurityHeroSection() {
  return (
    <SectionLayout
      showTopBorder={false}
      showRails={false}
      bg={C.indigo1}
      py="0"
    >
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        minH={{ base: "auto", md: "400px", lg: "520px" }}
        pt={{ base: "80px", md: "100px", lg: "120px" }}
        pb={{ base: "56px", md: "72px", lg: "80px" }}
      >
        <Box display="flex" flexDir="column" gap={{ base: "16px", md: "20px" }}>
          <V2Heading
            variant="h1Light"
            as="h1"
            maxW={{ base: "full", lg: "680px" }}
            fontSize={{ base: "32px", sm: "36px", md: "40px", lg: "48px" }}
            letterSpacing={{ base: "-1.5px", md: "-2px", lg: "-3px" }}
            lineHeight="1.15"
            style={serifAxes}
          >
            <Box as="span" color="white">Built for the data you </Box>
            <Box as="span" color={C.indigo4}>can&rsquo;t afford to leak.</Box>
          </V2Heading>

          <Text
            fontFamily={F.sans}
            fontSize={{ base: "15px", md: "16px", lg: "17px" }}
            color={C.grey30}
            lineHeight="1.5"
            maxW={{ base: "full", lg: "540px" }}
          >
            Governance, isolation, and audit are foundational architecture — not
            features added after the fact.
          </Text>
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 2. Four Things ───────────────────────────────────────────────────────────
function FourThingsSection() {
  return (
    <SectionLayout py={{ base: "80px", md: "100px", lg: "120px" }}>
      <Box display="flex" flexDir="column" gap={{ base: "32px", lg: "56px" }}>
        <V2Heading
          variant="h2Regular"
          as="h2"
  
          maxW={{ base: "full", lg: "620px" }}
          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
          letterSpacing={{ base: "-0.5px", lg: "-1px" }}
          lineHeight="1.2"
          style={serifAxes}
        >
          Four things that matter when your data is sensitive.
        </V2Heading>

        {/* Card row — stacked on mobile, side-by-side on md+ */}
        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          borderWidth="1px"
          borderColor={C.grey30}
          borderRadius="4px"
          overflow="hidden"
        >
          {FOUR_THINGS.map((item, i) => (
            <Box
              key={item.num}
              flex="1 0 0"
              borderRightWidth={{ base: "0", md: i < FOUR_THINGS.length - 1 ? "1px" : "0" }}
              borderRightColor={C.grey30}
              borderBottomWidth={{ base: i < FOUR_THINGS.length - 1 ? "1px" : "0", md: "0" }}
              borderBottomColor={C.grey30}
              p={{ base: "24px", md: "28px", lg: "36px" }}
              display="flex"
              flexDir="column"
              gap={{ base: "28px", lg: "36px" }}
            >
              {/* Number */}
              <Text
                fontFamily={F.sans}
                fontSize="14px"
                color={C.grey60}
                lineHeight="1"
                letterSpacing="0.5px"
              >
                {item.num}
              </Text>

              {/* Title + body */}
              <Box display="flex" flexDir="column" gap="8px">
                <V2Heading
                  variant="h5Regular"
                  as="h3"
                  color={C.indigo1}
                  fontSize={{ base: "17px", lg: "20px" }}
                  letterSpacing="-0.4px"
                  lineHeight="1.35"
                >
                  {item.title}
                </V2Heading>
                <Text
                  fontFamily={F.sans}
                  fontSize={{ base: "13px", lg: "15px" }}
                  color={C.grey60}
                  lineHeight="1.55"
                >
                  {item.body}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 3. Governance ────────────────────────────────────────────────────────────
function GovernanceSection() {
  return (
    <SectionLayout
      py={{ base: "80px", md: "100px", lg: "120px" }}
      outerProps={{
        style: {
          background: `linear-gradient(to bottom, var(--v2-colors-grey10), var(--v2-colors-grey30))`,
        },
      }}
    >
      <Box display="flex" flexDir="column" gap={{ base: "40px", lg: "56px" }}>
        {/* Section heading */}
        <Box display="flex" flexDir="column" gap={{ base: "12px", lg: "16px" }}>
          <V2Heading
            variant="h2Regular"
            as="h2"
            color={C.indigo1}
            maxW={{ base: "full", lg: "600px" }}
            fontSize={{ base: "24px", md: "28px", lg: "32px" }}
            letterSpacing={{ base: "-0.5px", lg: "-1px" }}
            lineHeight="1.2"
            style={serifAxes}
          >
            Governance built into the platform.
          </V2Heading>
          <Text
            fontFamily={F.sans}
            fontSize={{ base: "15px", lg: "17px" }}
            color={C.grey60}
            lineHeight="1.5"
            maxW={{ base: "full", lg: "520px" }}
          >
            Every action is scoped, traced, and auditable — so you always know
            who accessed what, when, and why.
          </Text>
        </Box>

        {/* Governance rows in a white card */}
        <Box
          bg="white"
          borderWidth="1px"
          borderColor={C.grey30}
          borderRadius="8px"
          overflow="hidden"
          boxShadow="0px 2px 8px rgba(12,29,52,0.05)"
        >
          {GOVERNANCE_ROWS.map((row, i) => (
            <Flex
              key={row.title}
              w="full"
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
              justifyContent="space-between"
              px={{ base: "24px", lg: "32px" }}
              py={{ base: "20px", lg: "28px" }}
              gap={{ base: "8px", md: "32px" }}
              borderBottomWidth={i < GOVERNANCE_ROWS.length - 1 ? "1px" : "0"}
              borderBottomColor={C.grey20}
            >
              {/* Title */}
              <V2Heading
                variant="h5Regular"
                as="h3"
                color={C.indigo1}
                fontSize={{ base: "18px", lg: "24px" }}
                fontWeight="500"
                letterSpacing="-0.48px"
                lineHeight="1.5"
                minW={{ base: "auto", md: "200px", lg: "240px" }}
                flexShrink={0}
              >
                {row.title}
              </V2Heading>

              {/* Description */}
              <Text
                fontFamily={F.sans}
                fontSize={{ base: "14px", lg: "15px" }}
                color={C.grey60}
                lineHeight="1.55"
                maxW={{ base: "full", lg: "720px" }}
              >
                {row.body}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 4. Final CTA ─────────────────────────────────────────────────────────────
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
function SecurityPageContent() {
  return (
    <Box display="flex" flexDir="column" w="full" minH="100vh" bg={C.grey10}>
      <NavBar darkNav={true} />
      {/* Nav height offset — dark hero sits flush behind the transparent nav */}
      <Box flexShrink={0} h="76px" w="full" bg={C.indigo1} aria-hidden />
      <SecurityHeroSection />
      <FourThingsSection />
      <GovernanceSection />
      <FinalCTASection />
      <SiteFooter />
    </Box>
  );
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
export default function SecurityPage() {
  return (
    <NewSiteProvider>
      <SecurityPageContent />
    </NewSiteProvider>
  );
}
