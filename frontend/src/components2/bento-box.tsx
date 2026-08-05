import { Box, Grid } from "@chakra-ui/react";

import { C, PAGE_MAX_W, sectionPx, serifAxes, V2Heading } from "./new-site-tokens";
import bentoItems from "./agent-capabilities.json";

// ─── BentoCardBody ────────────────────────────────────────────────────────────
function BentoCardBody({ label }: { label: string }) {
  return (
    <>
      <Box
        h={{ base: "80px", md: "100px", lg: "120px" }}
        w="160px"
        bg={C.grey40}
        opacity={0.12}
        borderRadius="4px"
        flexShrink={0}
      />
      <V2Heading
        variant="h5Regular"
        as="h3"
        color={C.indigo1}
        letterSpacing="-0.4px"
        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
      >
        {label}
      </V2Heading>
    </>
  );
}

// ─── Shared card styles ───────────────────────────────────────────────────────
const cardBase = {
  bg: C.concrete,
  borderWidth: "1px",
  borderColor: "#e1e1e6",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(12,29,52,0.04)",
  p: { base: "20px", lg: "28px" } as any,
  display: "flex" as const,
  flexDir: "column" as const,
  justifyContent: "space-between" as const,
  overflow: "hidden" as const,
};

// ─── AgentCapabilitiesSection ─────────────────────────────────────────────────
export function AgentCapabilitiesSection() {
  return (
    <Box as="section" bg={C.grey10} w="full">
      <Box
        maxW={PAGE_MAX_W} mx="auto" px={sectionPx}
        py={{ base: "60px", md: "80px", lg: "120px" }}
        display="flex" flexDir="column"
        gap={{ base: "32px", lg: "60px" }}
      >
        {/* Section heading */}
        <V2Heading
          variant="h2Regular"
          as="h2"
          color="#20283d"
          maxW={{ base: "full", lg: "730px" }}
          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
          letterSpacing={{ base: "-1px", lg: "-2px" }}
          lineHeight="1.2"
          style={serifAxes}
        >
          Work moves off the team&rsquo;s desk.
          <br />
          <Box as="span" color={C.indigo4}>Let agents execute </Box>
          <Box as="span" color="#20283d">recurring workflows.</Box>
        </V2Heading>

        {/* Mobile / tablet: simple 2-column auto-flow grid */}
        <Grid
          display={{ base: "grid", lg: "none" }}
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
          gap="12px"
          w="full"
        >
          {bentoItems.map((item) => (
            <Box key={item.label} {...cardBase} minH="160px">
              <BentoCardBody label={item.label} />
            </Box>
          ))}
        </Grid>

        {/* Desktop: 7-col bento with explicit spanning */}
        <Grid
          display={{ base: "none", lg: "grid" }}
          gridTemplateColumns="repeat(7, 1fr)"
          gridTemplateRows="repeat(4, 1fr)"
          h="769px"
          gap="12px"
          w="full"
        >
          {bentoItems.map((item) => (
            <Box
              key={item.label}
              {...cardBase}
              style={{ gridColumn: item.gridColumn, gridRow: item.gridRow }}
            >
              <BentoCardBody label={item.label} />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
