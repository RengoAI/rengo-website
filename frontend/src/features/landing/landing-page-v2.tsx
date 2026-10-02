import { Box, Flex, Grid, Text, Button } from "@chakra-ui/react";
import React from "react";
import { HeroCaCanvas } from "@/features/landing/sections/hero-ca-p5";

const MAX_W = "1480px";
const SECTION_PX = { base: "24px", md: "60px" };

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

// ─── Hero ────────────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => (
  <Box as="section" bg="#f3f2ee" w="full" minH="994px" position="relative" overflow="hidden">
    {/* Nav */}
    <Box
      as="nav"
      position="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={20}
      backdropFilter="blur(2px)"
      h="52px"
      display="flex"
      alignItems="center"
    >
      <Box
        mx="auto"
        maxW={MAX_W}
        px={SECTION_PX}
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" gap="40px">
          <Text
            fontFamily="body"
            fontWeight="normal"
            fontSize="14px"
            letterSpacing="-0.7px"
            color="#0c1d34"
            textTransform="capitalize"
            m={0}
          >
            rengo_ai
          </Text>
          <Flex gap="20px">
            {["Solutions", "Resources", "Team"].map((label) => (
              <Text
                key={label}
                fontFamily="body"
                fontWeight={500}
                fontSize="12px"
                color="#0c1d34"
                textTransform="capitalize"
                m={0}
                cursor="pointer"
              >
                {label}
              </Text>
            ))}
          </Flex>
        </Flex>
        <Text
          fontFamily="body"
          fontSize="14px"
          letterSpacing="-0.14px"
          color="#0c1d34"
          m={0}
          cursor="pointer"
          onClick={openSalesMail}
        >
          Get started →
        </Text>
      </Box>
    </Box>

    {/* Hero copy */}
    <Box
      position="absolute"
      top="132px"
      left={0}
      right={0}
      zIndex={10}
    >
      <Box
        mx="auto"
        maxW={MAX_W}
        px={SECTION_PX}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
      <Text
        fontFamily="'Serrif', serif"
        fontWeight={300}
        fontSize={{ base: "28px", md: "36px" }}
        lineHeight={1}
        letterSpacing="-1.44px"
        color="#293541"
        maxW="336px"
        m={0}
      >
        Build your firm's intelligent data layer_
      </Text>

      <Flex direction="column" align="flex-end" gap={4} maxW="420px">
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="16px"
          lineHeight={1.4}
          letterSpacing="-0.64px"
          color="#425262"
          textAlign="right"
          m={0}
        >
          We're the embedded partner that builds the data intelligence layer for
          AI systems to learn and act from your firm's knowledge.
        </Text>
        <Button
          bg="#262e3e"
          color="white"
          borderRadius="2px"
          h="32px"
          px="8px"
          fontFamily="body"
          fontWeight={300}
          fontSize="14px"
          lineHeight="21px"
          onClick={openSalesMail}
          _hover={{ bg: "#1a2030" }}
        >
          Get started →
        </Button>
      </Flex>
      </Box>
    </Box>

    {/* Typewriter cellular automata — fills the full hero as background */}
    <HeroCaCanvas />
  </Box>
);

// ─── Problem ─────────────────────────────────────────────────────────────────

const ProblemSection: React.FC = () => (
  <Box as="section" bg="#fafafa" w="full">
    <Flex
      mx="auto"
      maxW={MAX_W}
      px={SECTION_PX}
      py="120px"
      gap="60px"
      align="flex-start"
      direction={{ base: "column", lg: "row" }}
    >
      <Box flex="1" minW={0}>
        <Text
          fontFamily="'Serrif', serif"
          fontWeight={300}
          fontSize={{ base: "24px", md: "28px" }}
          lineHeight={1.1}
          letterSpacing="-1.28px"
          color="#242e39"
          m={0}
        >
          Firms have spent decades making the numbers in their databases
          reliable. But much of what a firm actually knows{" "}
          <Box
            as="span"
            style={{ textDecoration: "underline", textDecorationSkipInk: "none" }}
          >
            never reaches a database
          </Box>
          .
        </Text>
      </Box>

      <Box
        w={{ base: "full", lg: "303px" }}
        flexShrink={0}
      >
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="16px"
          lineHeight={1.4}
          letterSpacing="-0.64px"
          color="#38434e"
          m={0}
          mb={4}
        >
          The meeting conversations, the memos in a shared drive, the deal terms
          hidden in emails - never reaches a database.
        </Text>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="16px"
          lineHeight={1.4}
          letterSpacing="-0.64px"
          color="#38434e"
          m={0}
        >
          AI changes how work with data but it is only as good as the what you
          feed it. We believe the key to success is{" "}
          <Box as="span" fontWeight={700}>
            the data layer and its stewards.
          </Box>{" "}
          As agents perform the manual/redundant, we focus on the care,
          judgment, and persistence required to govern your data and how your
          organization uses it.
        </Text>
      </Box>
    </Flex>
  </Box>
);

// ─── Solution ────────────────────────────────────────────────────────────────

const SolutionSection: React.FC = () => (
  <Box as="section" bg="#e5e5e5" w="full">
    <Box mx="auto" maxW={MAX_W} px={SECTION_PX} py="80px">
      <Box mb={8}>
        <Text
          fontFamily="'Serrif', serif"
          fontWeight={300}
          fontSize={{ base: "24px", md: "28px" }}
          lineHeight={1.1}
          letterSpacing="-1.6px"
          color="#161616"
          maxW="614px"
          m={0}
          mb={4}
        >
          To solve this, we build a unified data foundation for your teams and
          manage its applications from strategy → execution.
        </Text>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="16px"
          lineHeight={1.25}
          color="#191a24"
          maxW="468px"
          m={0}
        >
          We connect your source systems, structure them into permission-ed
          ontology of your firm, and build applications and agents for your
          work.
        </Text>
      </Box>

      {/* Diagram */}
      <Box position="relative" w="full" h={{ base: "400px", md: "702px" }}>
        <img
          src="/landing/landing-v2-diagram-screenshot.png"
          alt="Rengo data architecture diagram"
          style={{
            position: "absolute",
            right: 0,
            top: "-80px",
            height: "143%",
            maxWidth: "none",
            mixBlendMode: "darken",
            display: "block",
          }}
        />
        {/* Labels */}
        {[
          { label: "Applications", left: { base: "30%", md: "33%" }, top: { base: "22%", md: "33%" } },
          { label: "Your systems", left: { base: "30%", md: "33%" }, top: { base: "72%", md: "80%" } },
          { label: "Agents", left: { base: "82%", md: "87%" }, top: { base: "30%", md: "42%" } },
          { label: "Data ontology", left: { base: "80%", md: "85%" }, top: { base: "72%", md: "85%" } },
        ].map(({ label, left, top }) => (
          <Text
            key={label}
            position="absolute"
            left={left}
            top={top}
            fontFamily="body"
            fontSize="12px"
            lineHeight={1.4}
            letterSpacing="0.12px"
            color="black"
            textTransform="capitalize"
            m={0}
            zIndex={1}
          >
            {label}
          </Text>
        ))}
      </Box>
    </Box>
  </Box>
);

// ─── Metrics ─────────────────────────────────────────────────────────────────

const METRICS = [
  {
    n: "1",
    stat: "1 month",
    detail: "vs ~1 year for previous vendor to deliver X for an asset manager",
  },
  {
    n: "2",
    stat: "1 month",
    detail: "of documents/models/files unified under one system",
  },
  {
    n: "3",
    stat: "X",
    detail: "amount of portcos unified",
  },
  {
    n: "4",
    stat: "26% time saved",
    detail: "per LP reporting cycle",
  },
] as const;

const MetricsSection: React.FC = () => (
  <Box as="section" bg="#30373d" w="full">
    <Box mx="auto" maxW={MAX_W} px={SECTION_PX} py="80px">
      <Text
        fontFamily="'Serrif', serif"
        fontWeight={300}
        fontSize={{ base: "28px", md: "32px" }}
        lineHeight={1.1}
        letterSpacing="-1px"
        color="white"
        m={0}
        mb="80px"
        whiteSpace={{ base: "normal", md: "nowrap" }}
      >
        How our system performs
      </Text>

      <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }} w="full">
        {METRICS.map((m) => (
          <Flex
            key={m.n}
            direction="column"
            justify="space-between"
            h="384px"
            px="24px"
            py="8px"
            borderLeft="1px dashed #575961"
          >
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="12px"
              lineHeight={1.4}
              color="#9fa1a2"
              m={0}
            >
              {m.n}
            </Text>
            <Flex direction="column" gap={4}>
              <Text
                fontFamily="'Serrif', serif"
                fontWeight={300}
                fontSize={{ base: "28px", md: "40px" }}
                lineHeight={1}
                letterSpacing="-1.6px"
                color="white"
                m={0}
              >
                {m.stat}
              </Text>
              <Text
                fontFamily="body"
                fontWeight="normal"
                fontSize="12px"
                lineHeight={1.4}
                color="#b8b8b8"
                m={0}
              >
                {m.detail}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Box>
  </Box>
);

// ─── Use Cases ───────────────────────────────────────────────────────────────

const USE_CASES = [
  { text: "Compare new deals without rebuilding context", category: "Deal team" },
  { text: "Portfolio financials auto-ingested with accuracy", category: "Finance" },
  { text: "LP updates draw on one current, verified set of numbers.", category: "Investor relations" },
  { text: "Monitor performance of portcos with dedicated dashboards", category: "Investor relations" },
  { text: "Unlock collective intelligence", category: "Operations" },
] as const;

const UseCasesSection: React.FC = () => (
  <Box as="section" bg="#eaeaea" w="full">
    <Flex
      mx="auto"
      maxW={MAX_W}
      px={SECTION_PX}
      py="80px"
      gap="60px"
      align="flex-start"
      direction={{ base: "column", lg: "row" }}
    >
      <Box w={{ base: "full", lg: "252px" }} flexShrink={0}>
        <Text
          fontFamily="'Serrif', serif"
          fontWeight={300}
          fontSize={{ base: "28px", md: "32px" }}
          lineHeight={1.1}
          letterSpacing="-1px"
          color="#232a41"
          m={0}
        >
          How your workflows can be transformed
        </Text>
      </Box>

      <Box flex="1" minW={0}>
        {USE_CASES.map((uc) => (
          <Flex
            key={uc.text}
            justify="space-between"
            align="flex-start"
            gap="20px"
            borderTop="1px dashed #c0c6ce"
            pt="12px"
            pb="40px"
            w="full"
          >
            <Text
              fontFamily="body"
              fontWeight={200}
              fontSize={{ base: "18px", md: "24px" }}
              lineHeight={1}
              letterSpacing="-0.96px"
              color="#2f343c"
              flex="1"
              m={0}
            >
              {uc.text}
            </Text>
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="12px"
              letterSpacing="0.24px"
              color="#4b4b4b"
              textAlign="right"
              w="120px"
              flexShrink={0}
              textTransform="capitalize"
              m={0}
            >
              {uc.category}
            </Text>
          </Flex>
        ))}

        <Flex justify="flex-end" mt={2}>
          <Button
            bg="#35383e"
            color="white"
            borderRadius="2px"
            h="36px"
            px="12px"
            py="2px"
            fontFamily="body"
            fontWeight={300}
            fontSize="14px"
            lineHeight="21px"
            onClick={openSalesMail}
            _hover={{ bg: "#262a30" }}
          >
            See our solutions →
          </Button>
        </Flex>
      </Box>
    </Flex>
  </Box>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      '"It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly."',
    role: "Asset manager at $1 billion fund",
  },
  {
    quote:
      '"Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we\'ve evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we\'re genuinely excited about."',
    role: "CFO at $1.5 billion real estate fund",
  },
  {
    quote:
      '"The platform does the heavy lifting, so our team doesn\'t have to burn a lot of calories just to make the system usable."',
    role: "VP of Investor relations at 50M fund",
  },
] as const;

const TestimonialsSection: React.FC = () => (
  <Box as="section" bg="#f6f6f6" w="full">
    <Box mx="auto" maxW={MAX_W} px={SECTION_PX} py="80px">
      <Text
        fontFamily="'Serrif', serif"
        fontWeight={300}
        fontSize={{ base: "28px", md: "32px" }}
        lineHeight={1}
        letterSpacing="-1.6px"
        color="#242e39"
        m={0}
        mb="80px"
        whiteSpace={{ base: "normal", md: "nowrap" }}
      >
        Our customers in their own words
      </Text>

      <Flex justify="flex-end">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 318px)" }}
          gap="16px"
        >
          {TESTIMONIALS.map((t) => (
            <Flex
              key={t.role}
              direction="column"
              justify="space-between"
              h="360px"
              p="24px"
              borderRadius="2px"
            >
              <Text
                fontFamily="body"
                fontWeight="normal"
                fontSize="18px"
                lineHeight={1.4}
                letterSpacing="-0.72px"
                color="#2f3c4e"
                flex="1"
                m={0}
              >
                {t.quote}
              </Text>
              <Flex direction="column" gap={2} mt={4}>
                <img
                  src="/landing/landing-v2-book-icon.svg"
                  alt=""
                  style={{ width: "20px", height: "20px", display: "block" }}
                />
                <Text
                  fontFamily="body"
                  fontWeight="normal"
                  fontSize="16px"
                  lineHeight={1.4}
                  color="#2f3c4e"
                  m={0}
                >
                  {t.role}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Box>
  </Box>
);

// ─── Security ────────────────────────────────────────────────────────────────

const COMPLIANCE = [
  {
    title: "SOC2 Type II",
    description: "Security controls designed correctly and operating effectively.",
    badge: true,
  },
  {
    title: "Pen-tested",
    description: "Security controls suitably implemented. Continuously tested.",
    badge: true,
  },
  {
    title: "No training on your data",
    description: "Security controls suitably implemented. Continuously tested.",
    badge: true,
  },
  {
    title: "Encrypted everywhere",
    description: "Security controls suitably implemented. Continuously tested.",
    badge: false,
  },
] as const;

const SecuritySection: React.FC = () => (
  <Box as="section" bg="#30373d" w="full">
    <Box mx="auto" maxW={MAX_W} px={SECTION_PX} py="100px">
      <Box mb="40px" maxW="499px">
        <Text
          fontFamily="'Serrif', serif"
          fontWeight={300}
          fontSize={{ base: "28px", md: "32px" }}
          lineHeight={1}
          letterSpacing="-1px"
          color="white"
          m={0}
          mb={5}
        >
          We are compliant with rigorous security standards
        </Text>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="14px"
          lineHeight={1.1}
          letterSpacing="-0.28px"
          color="white"
          m={0}
        >
          SOC 2 Type II. ISO 27001. GDPR. HIPAA. Zero AI training on your data.
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }} w="full">
        {COMPLIANCE.map((c, i) => (
          <Box
            key={c.title}
            position="relative"
            borderLeft={i === 0 ? "1px dashed #828487" : undefined}
            borderRight="1px dashed #828487"
            borderTop="1px dashed #828487"
            borderBottom={i === 0 ? "1px dashed #828487" : undefined}
            px="20px"
            py="24px"
            minH="160px"
          >
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="20px"
              lineHeight={1.1}
              color="white"
              m={0}
              mb={2}
            >
              {c.title}
            </Text>
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="14px"
              lineHeight={1.2}
              color="#9c9c9c"
              m={0}
            >
              {c.description}
            </Text>
            {c.badge && (
              <img
                src="/landing/landing-v2-soc2-badge.png"
                alt="Security badge"
                style={{
                  position: "absolute",
                  bottom: "24px",
                  right: "20px",
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  </Box>
);

// ─── Logos ───────────────────────────────────────────────────────────────────

const LogosSection: React.FC = () => (
  <Box as="section" bg="#30373d" w="full" borderTop="1px solid #404850">
    <Flex
      mx="auto"
      maxW={MAX_W}
      px={SECTION_PX}
      py="60px"
      align="center"
      gap={{ base: 6, md: "40px" }}
      direction={{ base: "column", md: "row" }}
    >
      <Text
        fontFamily="body"
        fontWeight="normal"
        fontSize="12px"
        lineHeight={1}
        color="#e8e8e8"
        m={0}
        flexShrink={0}
        maxW="225px"
      >
        Bringing industry experience from
      </Text>
      <img
        src="/landing/landing-v2-logos.png"
        alt="Microsoft, Goldman Sachs, Maybern, and other partner logos"
        style={{
          height: "74px",
          maxWidth: "100%",
          objectFit: "contain",
          mixBlendMode: "plus-lighter",
          opacity: 0.5,
          display: "block",
        }}
      />
    </Flex>
  </Box>
);

// ─── CTA ─────────────────────────────────────────────────────────────────────

const CtaSection: React.FC = () => (
  <Box as="section" bg="#c8d4d5" w="full">
    <Flex
      mx="auto"
      maxW={MAX_W}
      px={SECTION_PX}
      py="100px"
      direction="column"
      align="center"
      justify="center"
      gap="60px"
      textAlign="center"
    >
      <Flex direction="column" align="center" gap="20px">
        <Box maxW="496px">
          <Text
            fontFamily="body"
            fontWeight="normal"
            fontSize={{ base: "38px", md: "58px" }}
            lineHeight={1.1}
            letterSpacing="-3.48px"
            color="black"
            m={0}
          >
            Ready to make your data{" "}
            <Box as="span" color="#7f364d">
              your alpha?
            </Box>
          </Text>
        </Box>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="14px"
          lineHeight={1.1}
          letterSpacing="-0.28px"
          color="#575757"
          m={0}
        >
          SOC 2 Type II. ISO 27001. GDPR. HIPAA. Zero AI training on your data.
        </Text>
      </Flex>

      <Button
        bg="#213044"
        color="#fbfbf6"
        borderRadius="2px"
        h="49px"
        px="12px"
        py="6px"
        fontFamily="body"
        fontWeight="normal"
        fontSize="14px"
        lineHeight="21px"
        w="128px"
        onClick={openSalesMail}
        _hover={{ bg: "#162234" }}
      >
        Get in touch →
      </Button>
    </Flex>
  </Box>
);

// ─── Footer ──────────────────────────────────────────────────────────────────

const FooterSection: React.FC = () => (
  <Box as="footer" bg="#30373d" w="full">
    <Flex
      mx="auto"
      maxW={MAX_W}
      px={SECTION_PX}
      py="110px"
      align="center"
      justify="space-between"
      wrap="wrap"
      gap={6}
    >
      <Text
        fontFamily="body"
        fontWeight="normal"
        fontSize="14px"
        letterSpacing="-0.7px"
        color="white"
        textTransform="capitalize"
        m={0}
      >
        rengo_ai
      </Text>

      <Flex gap="24px" wrap="wrap">
        {["Product", "Solutions", "Team", "Privacy", "Terms"].map((label) => (
          <Text
            key={label}
            fontFamily="body"
            fontWeight="normal"
            fontSize="13px"
            lineHeight="19.5px"
            color="white"
            m={0}
            cursor="pointer"
          >
            {label}
          </Text>
        ))}
      </Flex>

      <Text
        fontFamily="mono"
        fontWeight="normal"
        fontSize="11px"
        lineHeight="16.5px"
        color="white"
        m={0}
        whiteSpace="nowrap"
      >
        © 2026 Rengo AI
      </Text>
    </Flex>
  </Box>
);

// ─── Page ────────────────────────────────────────────────────────────────────

export const LandingPageV2: React.FC = () => (
  <Box fontFamily="body" overflowX="hidden">
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <MetricsSection />
    <UseCasesSection />
    <TestimonialsSection />
    <SecuritySection />
    <LogosSection />
    <CtaSection />
    <FooterSection />
  </Box>
);
