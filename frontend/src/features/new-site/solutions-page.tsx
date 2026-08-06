import "@/theme2/fonts.css";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";

import { NavBar }        from "@/components2/nav-bar";
import { SiteFooter }    from "@/components2/site-footer";
import { SectionLayout } from "@/components2/section-layout";
import {
  C, F, serifAxes, sectionPy,
  V2Heading,
} from "@/components2/new-site-tokens";

import { NewSiteProvider } from "./new-site-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────
const RHYTHM_ITEMS = [
  "Deal pipeline tracking with full context history per company",
  "Portfolio company monitoring and relationship intelligence",
  "LP relationship management with complete communication history",
];

const SOLUTIONS_BENTO = [
  { label: "Ingest native files without templates",                  gridColumn: "1 / span 2", gridRow: "1 / span 2" },
  { label: "Auto-drafted quarterly letters",                         gridColumn: "3 / span 2", gridRow: "1 / span 2" },
  { label: "Precedent-linked deal memos",                            gridColumn: "5 / span 4", gridRow: "1 / span 2" },
  { label: "Preserved context across the full deal history",         gridColumn: "1 / span 3", gridRow: "3 / span 2" },
  { label: "Wire directly into Claude, Copilot, or your own tools",  gridColumn: "4 / span 2", gridRow: "3 / span 2" },
  { label: "Query across the full portfolio history",                gridColumn: "6 / span 3", gridRow: "3 / span 2" },
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

// ─── Shared card style — matches bento-box.tsx cardBase ───────────────────────
const bentoCardStyle = {
  bg: C.concrete,
  borderWidth: "1px",
  borderColor: "#e1e1e6",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(12,29,52,0.04)",
  p: { base: "20px", lg: "28px" } as any,
  display: "flex" as const,
  flexDir: "column" as const,
  justifyContent: "flex-end" as const,
  overflow: "hidden" as const,
};

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function SolutionsHeroSection() {
  return (
    <SectionLayout
      bg={C.grey20}
      showTopBorder={false}
      py={{ base: "16px", md: "20px" }}
    >
      <Box
        bg={C.grey20}
        borderRadius={{ base: "8px", lg: "12px" }}
        overflow="hidden"
        p={{ base: "28px", md: "40px", lg: "60px" }}
        minH={{ base: "240px", md: "400px", lg: "480px" }}
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        gap={{ base: "12px", lg: "16px" }}
      >
        <V2Heading
          variant="h1Light"
          as="h1"
          color={C.indigo1}
          fontSize={{ base: "36px", md: "44px", lg: "52px" }}
          letterSpacing={{ base: "-2px", lg: "-3px" }}
          lineHeight="1.1"
          style={serifAxes}
        >
          Portfolio monitoring
        </V2Heading>

        <Text
          fontFamily={F.sans}
          fontSize={{ base: "14px", md: "15px", lg: "16px" }}
          color={C.indigo1}
          lineHeight="1.4"
          maxW={{ base: "full", lg: "690px" }}
        >
          Governance, isolation, and audit are foundational — not a settings
          panel. Institutional firms deploy Rengo because it holds up to the
          diligence their LPs demand.
        </Text>
      </Box>
    </SectionLayout>
  );
}

// ─── 2. Rhythm — heading + description + arrow list ───────────────────────────
function RhythmSection() {
  return (
    <SectionLayout py={sectionPy}>
      <Box
        display="flex"
        flexDir="column"
        gap={{ base: "28px", lg: "28px" }}
        maxW={{ base: "full", lg: "612px" }}
      >
        {/* Heading */}
        <V2Heading
          variant="h2Regular"
          as="h2"
          color={C.indigo1}
          fontSize={{ base: "24px", md: "28px", lg: "35px" }}
          letterSpacing={{ base: "-1px", lg: "-2px" }}
          lineHeight="1.2"
          style={serifAxes}
        >
          Built for the rhythm of your firm
        </V2Heading>

        {/* Description */}
        <Text
          fontFamily={F.sans}
          fontWeight="300"
          fontSize={{ base: "14px", md: "15px", lg: "16px" }}
          color={C.grey60}
          lineHeight="1.75"
        >
          From deal sourcing to portfolio management, Rengo understands PE
          workflows — surfacing the right knowledge at every stage of the
          investment lifecycle.
        </Text>

        {/* Arrow list */}
        <Box display="flex" flexDir="column" gap="10px">
          {RHYTHM_ITEMS.map((item) => (
            <Flex key={item} gap="12px" alignItems="flex-start">
              <Text
                fontFamily={F.sans}
                fontSize="14px"
                color={C.grey40}
                lineHeight="22.4px"
                flexShrink={0}
                w="12px"
                pt="1px"
              >
                →
              </Text>
              <Text
                fontFamily={F.sans}
                fontSize={{ base: "14px", lg: "15px" }}
                color={C.grey60}
                lineHeight="24px"
              >
                {item}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
    </SectionLayout>
  );
}

// ─── 3. Solutions bento ───────────────────────────────────────────────────────
function SolutionsBentoSection() {
  return (
    <SectionLayout bg={C.grey10} py={{ base: "80px", md: "100px", lg: "120px" }}>
      <Box display="flex" flexDir="column" gap={{ base: "32px", lg: "40px" }}>
        {/* Heading */}
        <V2Heading
          variant="h2Regular"
          as="h2"
          color={C.indigo1}
          maxW={{ base: "full", lg: "730px" }}
          fontSize={{ base: "24px", md: "28px", lg: "36px" }}
          letterSpacing={{ base: "-1px", lg: "-2px" }}
          lineHeight="1.2"
          style={serifAxes}
        >
          Work moves off the team&rsquo;s desk.{" "}
          <Box as="span" color={C.indigo4}>Let agents execute </Box>
          <Box as="span" color={C.indigo1}>recurring workflows.</Box>
        </V2Heading>

        {/* Mobile: single-column list */}
        <Box display={{ base: "flex", lg: "none" }} flexDir="column" gap="8px">
          {SOLUTIONS_BENTO.map((item) => (
            <Box key={item.label} {...bentoCardStyle} minH="120px">
              <V2Heading
                variant="h5Regular"
                as="h3"
                color={C.indigo1}
                fontSize={{ base: "16px", md: "18px" }}
                letterSpacing="-0.4px"
                lineHeight="1.44"
              >
                {item.label}
              </V2Heading>
            </Box>
          ))}
        </Box>

        {/* Desktop: 8-column bento */}
        <Grid
          display={{ base: "none", lg: "grid" }}
          gridTemplateColumns="repeat(8, 1fr)"
          gridTemplateRows="repeat(4, 1fr)"
          h="627px"
          gap="8px"
          w="full"
        >
          {SOLUTIONS_BENTO.map((item) => (
            <Box
              key={item.label}
              {...bentoCardStyle}
              style={{ gridColumn: item.gridColumn, gridRow: item.gridRow }}
            >
              <V2Heading
                variant="h5Regular"
                as="h3"
                color={C.indigo1}
                fontSize={{ base: "16px", lg: "20px" }}
                letterSpacing="-0.4px"
                lineHeight="1.44"
              >
                {item.label}
              </V2Heading>
            </Box>
          ))}
        </Grid>
      </Box>
    </SectionLayout>
  );
}

// ─── 4. Governance ────────────────────────────────────────────────────────────
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
        {/* Heading */}
        <Box display="flex" flexDir="column" gap={{ base: "8px", lg: "8px" }}>
          <V2Heading
            variant="h2Regular"
            as="h2"
            color={C.indigo1}
            maxW={{ base: "full", lg: "612px" }}
            fontSize={{ base: "24px", md: "28px", lg: "36px" }}
            letterSpacing={{ base: "-1px", lg: "-2px" }}
            lineHeight="1.2"
            style={serifAxes}
          >
            Governance built into the platform
          </V2Heading>
          <Text
            fontFamily={F.sans}
            fontSize={{ base: "15px", lg: "17px" }}
            color={C.grey60}
            lineHeight="1.55"
            maxW={{ base: "full", lg: "620px" }}
          >
            Access, lineage, and audit are not add-ons. They live in the
            ontology layer so every application inherits them.
          </Text>
        </Box>

        {/* Rows in white card */}
        <Box
          bg="white"
          borderWidth="1px"
          borderColor={C.grey20}
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
              px={{ base: "20px", lg: "20px" }}
              py={{ base: "20px", lg: "28px" }}
              gap={{ base: "8px", md: "40px" }}
              borderBottomWidth={i < GOVERNANCE_ROWS.length - 1 ? "1px" : "0"}
              borderBottomColor={C.grey20}
            >
              <V2Heading
                variant="h5Regular"
                as="h3"
                color={C.indigo1}
                fontSize={{ base: "18px", lg: "24px" }}
                fontWeight="500"
                letterSpacing="-0.48px"
                lineHeight="1.5"
                minW={{ base: "auto", md: "160px", lg: "200px" }}
                flexShrink={0}
              >
                {row.title}
              </V2Heading>

              <Text
                fontFamily={F.sans}
                fontSize={{ base: "14px", lg: "15px" }}
                color={C.grey60}
                lineHeight="1.65"
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

// ─── 5. Final CTA ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <SectionLayout
      showRails={false}
      railColor="#4c5268"
      py={{ base: "60px", md: "80px", lg: "111px" }}
      outerProps={{
        style: {
          backgroundImage:
            "radial-gradient(ellipse at 12% 11%, rgba(27,51,73,1) 0%, rgba(13,28,44,1) 100%)",
        },
      }}
    >
      <Box display="flex" flexDir="column" alignItems={{ base: "flex-start", lg: "flex-end" }}>
        <Box w={{ base: "full", lg: "60%" }} pt={{ base: "0", lg: "24px" }} mb={{ base: "32px", lg: "48px" }}>
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
          <Box
            as="button"
            bg="white"
            px="32px" py="13px"
            cursor="pointer"
            minH="44px"
            w={{ base: "full", sm: "auto" }}
            _hover={{ opacity: 0.9 }}
          >
            <Text fontFamily={F.sans} fontWeight="500" fontSize="14px" color="#0d1d2c" lineHeight="21px">
              Request Access
            </Text>
          </Box>
          <Box
            as="button"
            borderWidth="1px"
            borderColor="#949aac"
            px="33px" py="13px"
            cursor="pointer"
            minH="44px"
            w={{ base: "full", sm: "auto" }}
            _hover={{ opacity: 0.9 }}
          >
            <Text fontFamily={F.sans} fontSize="14px" color="white" lineHeight="21px">
              Talk to Sales →
            </Text>
          </Box>
        </Flex>
      </Box>
    </SectionLayout>
  );
}

// ─── Page Assembly ────────────────────────────────────────────────────────────
function SolutionsPageContent() {
  return (
    <Box display="flex" flexDir="column" w="full" minH="100vh" bg={C.grey10}>
      <NavBar />
      <Box flexShrink={0} h="35px" w="full" aria-hidden />
      <SolutionsHeroSection />
      <RhythmSection />
      <SolutionsBentoSection />
      <GovernanceSection />
      <FinalCTASection />
      <SiteFooter />
    </Box>
  );
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <NewSiteProvider>
      <SolutionsPageContent />
    </NewSiteProvider>
  );
}
