import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

// Matches the sales deck's cover-bloom raster (`scripts/backgrounds/cover-bloom.html`)
// — deep navy ink plus a soft azure bloom rising from the bottom-right corner.
const DECK_INK = "#0A1728";
const DECK_BLOOM_LAYERS = [
  "radial-gradient(124% 104% at 104% 132%, rgba(152,212,249,0) 24%, rgba(152,212,249,0.05) 36%, rgba(152,212,249,0.11) 46%, rgba(152,212,249,0.15) 54%, rgba(152,212,249,0.13) 62%, rgba(152,212,249,0.08) 72%, rgba(152,212,249,0.03) 82%, rgba(152,212,249,0) 92%)",
  "radial-gradient(56% 48% at 100% 118%, rgba(155,219,251,0.30) 0%, rgba(155,219,251,0.21) 26%, rgba(155,219,251,0.13) 46%, rgba(155,219,251,0.06) 66%, rgba(155,219,251,0.02) 84%, rgba(155,219,251,0) 100%)",
  "radial-gradient(58% 50% at 96% 96%, rgba(0,120,212,0.30) 0%, rgba(0,116,206,0.24) 20%, rgba(0,105,190,0.17) 38%, rgba(0,92,175,0.11) 54%, rgba(0,82,163,0.06) 70%, rgba(0,82,163,0.02) 86%, rgba(0,82,163,0) 100%)",
  "radial-gradient(56% 46% at 22% 8%, rgba(0,120,212,0.20) 0%, rgba(0,120,212,0.13) 30%, rgba(0,110,198,0.06) 56%, rgba(0,100,184,0.02) 78%, rgba(0,100,184,0) 100%)",
].join(", ");
const DECK_BLOOM_MASKED =
  "linear-gradient(90deg, #4FA3E3 0%, #0078D4 38%, #0052A3 72%, #063A72 100%)";
const DECK_BLOOM_MASKED_MASK =
  "radial-gradient(86% 72% at 104% 132%, #000 0 24%, rgba(0,0,0,0.97) 34%, rgba(0,0,0,0.90) 42%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.62) 58%, rgba(0,0,0,0.44) 66%, rgba(0,0,0,0.28) 74%, rgba(0,0,0,0.15) 82%, rgba(0,0,0,0.06) 90%, rgba(0,0,0,0) 100%)";

const FIRM_TYPES = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Real Estate",
];

const marqueeScroll = "marquee-scroll";

const LandingHeroBackground: React.FC = () => (
  <>
    <Box position="absolute" inset={0} style={{ background: DECK_INK }} />
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{
        background: DECK_BLOOM_MASKED,
        WebkitMaskImage: DECK_BLOOM_MASKED_MASK,
        maskImage: DECK_BLOOM_MASKED_MASK,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{ background: DECK_BLOOM_LAYERS }}
    />
  </>
);

const FirmsStrip: React.FC = () => (
  <Box as="section" borderBottom="1px solid" borderColor="border.muted" py={8}>
    <style>{`@keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    <PageContainer>
      <Text
        fontFamily={EDICT}
        fontSize="xs"
        color="gray.500"
        letterSpacing="0.08em"
        textTransform="uppercase"
        mb={8}
      >
        Built with leading firms across
      </Text>
    </PageContainer>
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
              fontSize="md"
              color="primary.700"
              opacity={0.3}
              fontWeight="normal"
              letterSpacing="-0.01em"
            >
              {label}
            </Text>
          ))}
      </Box>
    </Box>
  </Box>
);

interface FunctionCard {
  eyebrow: string;
  title: string;
  body: string;
}

const FUNCTIONS: readonly FunctionCard[] = [
  {
    eyebrow: "Investments",
    title: "Evaluate more opportunities",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
  },
  {
    eyebrow: "Portfolio Management",
    title: "Accelerate value creation",
    body: "Identify risks and opportunities earlier and scale what works across the portfolio.",
  },
  {
    eyebrow: "Investor Relations",
    title: "Communicate with confidence",
    body: "Produce consistent, source-backed updates using current portfolio information.",
  },
  {
    eyebrow: "Finance & Operations",
    title: "Spend less time reconciling",
    body: "Keep information current across models, systems, and reporting workflows.",
  },
] as const;

const FunctionsSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="720px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          A shared foundation
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={5}
        >
          Leverage across every function
        </Box>
        <Text fontSize="lg" lineHeight={1.55} color="gray.600" maxW="620px">
          Shared data infrastructure and applied AI improve how every team
          operates — from origination through operations.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
      >
        {FUNCTIONS.map((fn) => (
          <Box
            key={fn.eyebrow}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={8}
            minH="260px"
            display="flex"
            flexDirection="column"
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="gray.400"
              mb={5}
            >
              {fn.eyebrow}
            </Text>
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="normal"
              lineHeight={1.15}
              letterSpacing="-0.02em"
              color="primary.800"
              m={0}
              mb={4}
            >
              {fn.title}
            </Box>
            <Text fontSize="sm" lineHeight={1.6} color="gray.600">
              {fn.body}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

interface ContextColumn {
  label: string;
  headline: string;
  body: string;
}

const CONTEXT_COLUMNS: readonly [ContextColumn, ContextColumn] = [
  {
    label: "Today",
    headline: "Every workflow starts from scratch",
    body: "Context is lost between workflows. Analysts rebuild it from scratch each time — pulling files, re-reading memos, retracing decisions.",
  },
  {
    label: "With Rengo",
    headline: "Every workflow carries context forward",
    body: "Each decision becomes context for the next. Your firm's knowledge compounds instead of resetting.",
  },
];

const ContextSection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="720px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          Context is the compounding asset
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
        >
          The models are no longer the bottleneck.
          <br />
          <Box as="span" color="primary.500">
            Your firm's operating model is.
          </Box>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={0}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
        bg="white"
      >
        {CONTEXT_COLUMNS.map((col) => (
          <Box
            key={col.label}
            p={{ base: 8, md: 12 }}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            display="flex"
            flexDirection="column"
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="primary.500"
              mb={6}
            >
              {col.label}
            </Text>
            <Box
              as="h3"
              fontFamily="heading"
              fontSize={{ base: "26px", md: "32px" }}
              fontWeight="normal"
              lineHeight={1.15}
              letterSpacing="-0.02em"
              color="primary.800"
              m={0}
              mb={5}
              maxW="440px"
            >
              {col.headline}
            </Box>
            <Text
              fontSize="md"
              lineHeight={1.65}
              color="gray.600"
              maxW="460px"
            >
              {col.body}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

interface CapabilityStage {
  stage: string;
  deployment: string;
  data: string;
  impact: string;
  emphasis?: boolean;
}

const CAPABILITY_STAGES: readonly CapabilityStage[] = [
  {
    stage: "Restricted",
    deployment: "Blocked or limited to isolated pilots",
    data: "Spreadsheets, files, and disconnected systems",
    impact: "Falling behind as workflows remain unchanged",
  },
  {
    stage: "Assistive",
    deployment: "Assistants support individual tasks",
    data: "Selected sources connected; other context supplied through copy and paste",
    impact: "Keeping pace as the same work becomes somewhat faster",
  },
  {
    stage: "Operationalized",
    deployment: "Agents execute recurring workflows across systems",
    data: "Warehouse or lakehouse foundation with governed context, permissions, and lineage",
    impact: "Pulling ahead as work moves off the team's desk",
    emphasis: true,
  },
];

const CapabilitySection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="720px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          The AI capability curve
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={5}
        >
          The gap is widening between firms who invest in AI and those who don't
        </Box>
        <Text fontSize="lg" lineHeight={1.55} color="gray.600" maxW="620px">
          Most firms are stuck between pilots and true operational deployment.
          Rengo is the fast path to the next stage.
        </Text>
      </Box>

      <Box borderTop="1px solid" borderColor="primary.800">
        <Box
          display={{ base: "none", md: "grid" }}
          gridTemplateColumns="1fr 1.4fr 1.4fr 1.4fr"
          py={4}
          borderBottom="1px solid"
          borderColor="border.muted"
          gap={6}
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="gray.400"
        >
          <Box>Stage</Box>
          <Box>AI Deployment</Box>
          <Box>Data Readiness</Box>
          <Box>Impact</Box>
        </Box>

        {CAPABILITY_STAGES.map((stage) => (
          <Box
            key={stage.stage}
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1.4fr 1.4fr 1.4fr" }}
            gap={6}
            py={{ base: 8, md: 10 }}
            borderBottom="1px solid"
            borderColor="border.muted"
            alignItems="start"
            bg={stage.emphasis ? "primary.25" : "transparent"}
            px={stage.emphasis ? { base: 4, md: 6 } : 0}
            mx={stage.emphasis ? { base: -4, md: -6 } : 0}
          >
            <Box
              fontFamily="heading"
              fontSize={{ base: "22px", md: "26px" }}
              fontWeight="normal"
              letterSpacing="-0.02em"
              color={stage.emphasis ? "primary.700" : "primary.800"}
            >
              {stage.stage}
            </Box>
            <Text fontSize="sm" lineHeight={1.6} color="gray.600">
              <Text
                as="span"
                display={{ base: "block", md: "none" }}
                fontFamily={EDICT}
                fontSize="2xs"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="gray.400"
                mb={1}
              >
                Deployment
              </Text>
              {stage.deployment}
            </Text>
            <Text fontSize="sm" lineHeight={1.6} color="gray.600">
              <Text
                as="span"
                display={{ base: "block", md: "none" }}
                fontFamily={EDICT}
                fontSize="2xs"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="gray.400"
                mb={1}
              >
                Data
              </Text>
              {stage.data}
            </Text>
            <Text
              fontSize="sm"
              lineHeight={1.6}
              color={stage.emphasis ? "primary.700" : "gray.600"}
              fontWeight={stage.emphasis ? "medium" : "normal"}
            >
              <Text
                as="span"
                display={{ base: "block", md: "none" }}
                fontFamily={EDICT}
                fontSize="2xs"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="gray.400"
                mb={1}
              >
                Impact
              </Text>
              {stage.impact}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

interface StackLayer {
  label: string;
  title: string;
  body: string;
}

const STACK_LAYERS: readonly StackLayer[] = [
  {
    label: "01",
    title: "Applications",
    body: "Ready-to-deploy applications for your workflows — portfolio monitoring, investor relations, deal review.",
  },
  {
    label: "02",
    title: "Agents",
    body: "Execute and coordinate work across your existing systems — email, ledger, portals, and files.",
  },
  {
    label: "03",
    title: "Ontology",
    body: "Structured knowledge with access control, lineage, and permissions built for institutional data.",
  },
];

const StackSection: React.FC = () => (
  <Box
    as="section"
    color="white"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="primary.700"
    position="relative"
    overflow="hidden"
    style={{ background: DECK_INK }}
  >
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{
        background:
          "radial-gradient(70% 60% at 8% 10%, rgba(0,120,212,0.22) 0%, rgba(0,110,198,0.12) 40%, rgba(0,100,184,0.04) 70%, rgba(0,100,184,0) 100%)",
      }}
    />
    <PageContainer>
      <Box position="relative" maxW="720px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.300"
          mb={5}
        >
          How we deploy
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="white"
          m={0}
          mb={5}
        >
          Applications and agents, tailored to how your firm operates
        </Box>
        <Text
          fontSize="lg"
          lineHeight={1.55}
          color="whiteAlpha.700"
          maxW="620px"
        >
          Three layers, deployed together on your infrastructure. Each layer
          reinforces the others.
        </Text>
      </Box>

      <Box
        position="relative"
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={0}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="whiteAlpha.200"
      >
        {STACK_LAYERS.map((layer) => (
          <Box
            key={layer.title}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="whiteAlpha.200"
            p={{ base: 8, md: 10 }}
            minH="240px"
            display="flex"
            flexDirection="column"
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              color="primary.300"
              letterSpacing="0.12em"
              mb={5}
            >
              {layer.label}
            </Text>
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="normal"
              lineHeight={1.15}
              letterSpacing="-0.02em"
              color="white"
              m={0}
              mb={4}
            >
              {layer.title}
            </Box>
            <Text fontSize="sm" lineHeight={1.65} color="whiteAlpha.700">
              {layer.body}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

interface SecurityTile {
  title: string;
  body: string;
}

const SECURITY_TILES: readonly SecurityTile[] = [
  {
    title: "No training on your data",
    body: "Customer data is never used for model training or improvement.",
  },
  {
    title: "Data isolation",
    body: "Strong data isolation with enforced boundaries at the storage layer.",
  },
  {
    title: "Encrypted everywhere",
    body: "End-to-end encryption across storage and network layers.",
  },
  {
    title: "Audited and tested",
    body: "SOC 2 Type II compliant with ongoing independent testing.",
  },
];

const SecuritySection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    py={{ base: 20, md: 28 }}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="720px" mb={{ base: 12, md: 16 }}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          Institutional rigor
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "52px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={5}
        >
          Governance and security are foundational
        </Box>
        <Text fontSize="lg" lineHeight={1.55} color="gray.600" maxW="620px">
          Built for how institutional firms operate — with the controls,
          isolation, and audit posture that sensitive data requires.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
        bg="white"
      >
        {SECURITY_TILES.map((tile) => (
          <Box
            key={tile.title}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={8}
            minH="200px"
            display="flex"
            flexDirection="column"
          >
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="xl"
              fontWeight="normal"
              letterSpacing="-0.02em"
              color="primary.800"
              m={0}
              mb={4}
            >
              {tile.title}
            </Box>
            <Text fontSize="sm" lineHeight={1.6} color="gray.600">
              {tile.body}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

const ClosingCta: React.FC = () => (
  <Box
    as="section"
    bg="primary.800"
    color="white"
    py={{ base: 24, md: 32 }}
    position="relative"
    overflow="hidden"
  >
    <PageContainer>
      <Box
        as="h2"
        fontFamily="heading"
        fontSize={{ base: "44px", md: "72px" }}
        fontWeight="normal"
        lineHeight={1.04}
        letterSpacing="-0.03em"
        color="white"
        m={0}
        mb={6}
        maxW="920px"
      >
        Your data is your alpha.
      </Box>
      <Text
        fontSize="lg"
        lineHeight={1.55}
        color="whiteAlpha.700"
        maxW="520px"
        mb={10}
      >
        Put your firm's knowledge to work. Let's talk about deploying AI on your
        infrastructure.
      </Text>
      <Box
        asChild
        display="inline-block"
        bg="white"
        color="primary.800"
        borderRadius="md"
        px={6}
        py={3}
        fontSize="sm"
        fontWeight="medium"
        _hover={{ bg: "gray.50" }}
      >
        <a href="mailto:sales@rengoai.com">See a demo</a>
      </Box>
    </PageContainer>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      align="left"
      eyebrow="Institutional Intelligence"
      headline={
        <>
          Rengo is the AI deployment company
          <br />
          <Box as="span" color="primary.200">
            for investment firms.
          </Box>
        </>
      }
      subtext="The models are no longer the bottleneck — your firm's operating model is. Rengo turns your data, decisions, and documents into a foundation your team and your AI can act on."
      subtextMaxW="620px"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      background={<LandingHeroBackground />}
    />
    <FirmsStrip />
    <ContextSection />
    <FunctionsSection />
    <CapabilitySection />
    <StackSection />
    <SecuritySection />
    <ClosingCta />
  </Box>
);
