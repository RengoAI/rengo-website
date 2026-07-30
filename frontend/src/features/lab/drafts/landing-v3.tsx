import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

// ── tokens ────────────────────────────────────────────────────────────────────
const MONO  = '"Space Mono", SFMono-Regular, ui-monospace, monospace';
const SERIF = '"Source Serif 4", Georgia, ui-serif, serif';
const SANS  = '"Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif';

const C = {
  navy:     "#0C1D34",
  navyMid:  "#163F6E",
  offWhite: "#F5F4F0",
  accent:   "#3B8BE0",
  muted:    "#676685",
  hairline: "#E4E4EC",
  white:    "#FFFFFF",
} as const;

// ── data ──────────────────────────────────────────────────────────────────────
const METRICS = [
  { value: "$40B+", label: "Assets monitored" },
  { value: "12×",   label: "Faster reporting cycles" },
  { value: "60s",   label: "Document to dashboard" },
  { value: "4",     label: "Private market strategies" },
] as const;

const CAPABILITIES = [
  {
    glyph:  "⌗",
    name:   "Document Intelligence",
    detail: "AI reads every PDF, memo, and data room — extracting, tagging, and linking information across your portfolio automatically.",
  },
  {
    glyph:  "◈",
    name:   "Unified Data Room",
    detail: "A single searchable system spanning every portfolio company. Ask in plain language, get an answer with a traceable source.",
  },
  {
    glyph:  "◳",
    name:   "Automated Reporting",
    detail: "From raw portfolio data to LP-ready reports in minutes, not weeks. Consistent formatting, zero manual aggregation.",
  },
] as const;

const BACKERS  = ["Primary Ventures", "Inverted Capital"] as const;
const ANGELS   = ["Tiger Global", "Marshall Wace", "S&P Global", "Maybern"] as const;
const STRATEGIES = ["Private Equity", "Venture Capital", "Private Credit", "Growth Equity"] as const;

// ── reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref     = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ── nav ───────────────────────────────────────────────────────────────────────
const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      px={{ base: "24px", md: "40px" }}
      h="56px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      style={{
        background:   scrolled ? C.navy : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition:   "background 240ms ease, border-color 240ms ease",
      }}
    >
      <Text fontFamily={MONO} fontSize="13px" color="white" letterSpacing="0.08em">
        RENGO
      </Text>

      <Flex gap="32px" align="center" display={{ base: "none", md: "flex" }}>
        {(["Solutions", "Company", "Blog"] as const).map(label => (
          <a
            key={label}
            href="#"
            style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.64)", transition: "color 150ms ease", textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </Flex>

      <a
        href="mailto:sales@rengoai.com"
        style={{ fontFamily: SANS, fontSize: "13px", color: C.accent, textDecoration: "none" }}
      >
        See a demo →
      </a>
    </Box>
  );
};

// ── hero data-grid ────────────────────────────────────────────────────────────
const DataGrid: React.FC = () => {
  const [cells] = useState(() =>
    Array.from({ length: 96 }, (_, i) => ({
      lit:   Math.random() > 0.72,
      delay: Math.random() * 2.5,
      dur:   2 + Math.random() * 2.5,
    }))
  );
  return (
    <Box
      position="absolute"
      right={0}
      top={0}
      bottom={0}
      width={{ base: "0", md: "48%" }}
      overflow="hidden"
      display={{ base: "none", md: "block" }}
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        h="100%"
        w="100%"
        p="40px"
        gap="5px"
        style={{ opacity: 0.22 }}
      >
        {cells.map((c, i) => (
          <Box
            key={i}
            borderRadius="1px"
            style={{
              background:  c.lit ? C.accent : "rgba(255,255,255,0.07)",
              animation:   `v3pulse ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
            }}
          />
        ))}
      </Box>
      {/* left-edge fade so the grid blends into the hero copy */}
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        w="120px"
        style={{ background: `linear-gradient(to right, ${C.navy}, transparent)` }}
        pointerEvents="none"
      />
    </Box>
  );
};

// ── hero ──────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const fade = (delayMs: number, extraY = 0): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "none" : `translateY(${extraY || 16}px)`,
    transition: `opacity 640ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, transform 640ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`,
  });

  return (
    <Box
      as="section"
      bg={C.navy}
      minH="100vh"
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <DataGrid />

      {/* right-of-copy fade veil */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        style={{ background: `linear-gradient(to right, ${C.navy} 45%, transparent 100%)` }}
      />
      {/* bottom fade into metrics strip */}
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        h="120px"
        pointerEvents="none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.navy})` }}
      />

      <Box
        position="relative"
        zIndex={2}
        maxW="1280px"
        mx="auto"
        w="full"
        px={{ base: "24px", md: "40px" }}
        pt="112px"
        pb="80px"
      >
        <Box fontFamily={MONO} fontSize="11px" letterSpacing="0.18em" textTransform="uppercase" color={C.accent} mb="28px" style={fade(80)}>
          Built for private markets
        </Box>

        <Box
          as="h1"
          fontFamily={SERIF}
          fontSize={{ base: "52px", md: "clamp(52px, 6.5vw, 88px)" }}
          fontWeight="normal"
          lineHeight={1.02}
          letterSpacing="-0.025em"
          color="white"
          m={0}
          mb="28px"
          maxW="740px"
          style={fade(180, 24)}
        >
          Every portfolio number,<br />one source of truth.
        </Box>

        <Box h="1px" w="64px" bg="rgba(255,255,255,0.2)" mb="24px" style={fade(400)} />

        <Box
          fontFamily={SANS}
          fontSize={{ base: "16px", md: "18px" }}
          lineHeight={1.6}
          color="rgba(255,255,255,0.6)"
          maxW="520px"
          mb="48px"
          style={fade(320, 12)}
        >
          Purpose-built AI trusted by leading asset managers to turn scattered portfolio data into a single, searchable system their firm runs on.
        </Box>

        <Box style={fade(480, 8)}>
          <a
            href="mailto:sales@rengoai.com"
            style={{ display: "inline-flex", alignItems: "center", fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: C.navy, background: "white", padding: "0 24px", height: "44px", borderRadius: "2px", textDecoration: "none", transition: "background 150ms ease" }}
          >
            See a demo →
          </a>
        </Box>
      </Box>
    </Box>
  );
};

// ── metrics strip ─────────────────────────────────────────────────────────────
const MetricsStrip: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        as="section"
        bg={C.offWhite}
        borderBottom={`1px solid ${C.hairline}`}
      >
        <Box
          maxW="1280px"
          mx="auto"
          px={{ base: "24px", md: "40px" }}
          display="grid"
          gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
          style={{ borderTop: `1px solid ${C.hairline}` }}
        >
          {METRICS.map((m, i) => (
            <Box
              key={m.label}
              py={{ base: "36px", md: "52px" }}
              px={{ base: "24px", md: "36px" }}
              borderRight={`1px solid ${C.hairline}`}
              style={{
                opacity:    vis ? 1 : 0,
                transform:  vis ? "none" : "translateY(16px)",
                transition: `opacity 520ms ease ${i * 70}ms, transform 520ms ease ${i * 70}ms`,
              }}
            >
              <Box
                fontFamily={SERIF}
                fontSize={{ base: "38px", md: "54px" }}
                fontWeight="normal"
                lineHeight={1}
                color={C.navy}
                letterSpacing="-0.025em"
                mb="10px"
              >
                {m.value}
              </Box>
              <Box
                fontFamily={MONO}
                fontSize="10px"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color={C.muted}
              >
                {m.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

// ── problem section ───────────────────────────────────────────────────────────
const ProblemSection: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        as="section"
        bg="white"
        py={{ base: "72px", md: "96px" }}
        borderBottom={`1px solid ${C.hairline}`}
      >
        <Box
          maxW="1280px"
          mx="auto"
          px={{ base: "24px", md: "40px" }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "48px", lg: "80px" }}
          alignItems="start"
        >
          <Box
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(20px)",
              transition: "opacity 600ms ease, transform 600ms ease",
            }}
          >
            <Box
              fontFamily={MONO}
              fontSize="10px"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color={C.muted}
              mb="24px"
            >
              The infrastructure gap
            </Box>
            <Box
              as="h2"
              fontFamily={SERIF}
              fontSize={{ base: "34px", md: "clamp(34px, 3.5vw, 52px)" }}
              fontWeight="normal"
              lineHeight={1.06}
              letterSpacing="-0.025em"
              color={C.navy}
              m={0}
            >
              Private markets have outgrown their data infrastructure.
            </Box>
          </Box>

          <Box
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(20px)",
              transition: "opacity 600ms ease 120ms, transform 600ms ease 120ms",
            }}
          >
            <Box fontFamily={SANS} fontSize="17px" lineHeight={1.65} color="#474A67" mb="24px">
              Private markets have expanded into a mainstream part of global capital allocation, but the infrastructure supporting them has not kept pace. GPs still reconcile data across spreadsheets, PDFs, and disconnected portals — manually.
            </Box>
            <Box fontFamily={SANS} fontSize="17px" lineHeight={1.65} color="#474A67" mb="40px">
              Rengo deploys AI agents that continuously transform raw investment data into a structured system of record — so your team spends time on decisions, not data wrangling.
            </Box>
            <a
              href="mailto:sales@rengoai.com"
              style={{ display: "inline-flex", alignItems: "center", fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: C.navy, textDecoration: "none", borderBottom: `1.5px solid ${C.navy}`, paddingBottom: "2px" }}
            >
              Talk to the team →
            </a>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// ── capability tiles ──────────────────────────────────────────────────────────
const CapabilityTiles: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        as="section"
        bg={C.offWhite}
        py={{ base: "72px", md: "96px" }}
        borderBottom={`1px solid ${C.hairline}`}
      >
        <Box maxW="1280px" mx="auto" px={{ base: "24px", md: "40px" }}>
          <Box
            fontFamily={MONO}
            fontSize="10px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color={C.muted}
            mb="16px"
            style={{ opacity: vis ? 1 : 0, transition: "opacity 400ms ease" }}
          >
            What Rengo does
          </Box>

          <Box
            as="h2"
            fontFamily={SERIF}
            fontSize={{ base: "32px", md: "clamp(32px, 3vw, 48px)" }}
            fontWeight="normal"
            lineHeight={1.06}
            letterSpacing="-0.025em"
            color={C.navy}
            m={0}
            mb="56px"
            maxW="540px"
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(12px)",
              transition: "opacity 500ms ease 80ms, transform 500ms ease 80ms",
            }}
          >
            The full intelligence layer for your portfolio.
          </Box>

          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            style={{ borderTop: `1px solid ${C.hairline}`, borderLeft: `1px solid ${C.hairline}` }}
          >
            {CAPABILITIES.map((cap, i) => (
              <Box
                key={cap.name}
                p={{ base: "32px", md: "40px" }}
                style={{
                  borderRight:  `1px solid ${C.hairline}`,
                  borderBottom: `1px solid ${C.hairline}`,
                  opacity:      vis ? 1 : 0,
                  transform:    vis ? "none" : "translateY(16px)",
                  transition:   `opacity 500ms ease ${160 + i * 100}ms, transform 500ms ease ${160 + i * 100}ms`,
                }}
              >
                <Box fontFamily={MONO} fontSize="18px" color={C.accent} mb="24px" lineHeight={1}>
                  {cap.glyph}
                </Box>
                <Box
                  fontFamily={SERIF}
                  fontSize="22px"
                  fontWeight="normal"
                  lineHeight={1.1}
                  letterSpacing="-0.015em"
                  color={C.navy}
                  mb="14px"
                >
                  {cap.name}
                </Box>
                <Box fontFamily={SANS} fontSize="15px" lineHeight={1.65} color={C.muted}>
                  {cap.detail}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// ── backers section ───────────────────────────────────────────────────────────
const BackersSection: React.FC = () => {
  const { ref, vis } = useReveal();

  const rows: [string, readonly string[]][] = [
    ["Investors",    BACKERS],
    ["Angels from",  ANGELS],
    ["Trusted by",   STRATEGIES],
  ];

  return (
    <div ref={ref}>
      <Box
        as="section"
        bg="white"
        py={{ base: "72px", md: "96px" }}
        borderBottom={`1px solid ${C.hairline}`}
      >
        <Box
          maxW="1280px"
          mx="auto"
          px={{ base: "24px", md: "40px" }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "56px", lg: "80px" }}
          alignItems="start"
        >
          {/* editorial quote */}
          <Box
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(16px)",
              transition: "opacity 500ms ease, transform 500ms ease",
            }}
          >
            <Box
              fontFamily={MONO}
              fontSize="10px"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color={C.muted}
              mb="28px"
            >
              Backing & team
            </Box>
            <Box
              as="blockquote"
              fontFamily={SERIF}
              fontSize={{ base: "26px", md: "34px" }}
              fontWeight="normal"
              lineHeight={1.22}
              letterSpacing="-0.015em"
              color={C.navy}
              m={0}
              maxW="460px"
            >
              "Built by people from category-defining technology, financial services, and private markets companies."
            </Box>
          </Box>

          {/* investor / angel rows */}
          <Box
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(16px)",
              transition: "opacity 500ms ease 120ms, transform 500ms ease 120ms",
            }}
          >
            {rows.map(([label, names]) => (
              <Box key={label} py="28px" borderTop={`1px solid ${C.hairline}`}>
                <Box
                  fontFamily={MONO}
                  fontSize="10px"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color={C.muted}
                  mb="14px"
                >
                  {label}
                </Box>
                <Flex wrap="wrap" gap="20px">
                  {names.map(name => (
                    <Box
                      key={name}
                      fontFamily={SANS}
                      fontSize="16px"
                      color={C.navyMid}
                      style={{ opacity: 0.65 }}
                    >
                      {name}
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// ── footer CTA ────────────────────────────────────────────────────────────────
const FooterCta: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box as="section" bg={C.navy} py={{ base: "96px", md: "128px" }} textAlign="center">
        <Box maxW="1280px" mx="auto" px={{ base: "24px", md: "40px" }}>
          <Box
            as="h2"
            fontFamily={SERIF}
            fontSize={{ base: "40px", md: "clamp(40px, 5vw, 72px)" }}
            fontWeight="normal"
            lineHeight={1.04}
            letterSpacing="-0.025em"
            color="white"
            m={0}
            mb="40px"
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(20px)",
              transition: "opacity 640ms cubic-bezier(0.22,1,0.36,1), transform 640ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            See how Rengo works.
          </Box>

          <a
            href="mailto:sales@rengoai.com"
            style={{ display: "inline-flex", alignItems: "center", fontFamily: SANS, fontSize: "15px", fontWeight: 500, color: C.navy, background: "white", padding: "0 32px", height: "48px", borderRadius: "2px", textDecoration: "none", opacity: vis ? 1 : 0, transition: "opacity 400ms ease 200ms, background 150ms ease" }}
          >
            Request a demo →
          </a>

          <Box mt="80px" pt="32px" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Flex justify="center" gap="36px" wrap="wrap" mb="24px">
              {(["Solutions", "Company", "Blog", "Careers", "Privacy"] as const).map(link => (
                <a
                  key={link}
                  href="#"
                  style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.36)", textDecoration: "none", transition: "color 150ms ease" }}
                >
                  {link}
                </a>
              ))}
            </Flex>
            <Box
              fontFamily={MONO}
              fontSize="11px"
              color="rgba(255,255,255,0.2)"
              letterSpacing="0.08em"
            >
              © 2025 Rengo AI
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// ── global styles ─────────────────────────────────────────────────────────────
const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes v3pulse {
      from { opacity: 0.3; }
      to   { opacity: 1;   }
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
    ::selection { background: #3B8BE0; color: #fff; }
  `}</style>
);

// ── export ────────────────────────────────────────────────────────────────────
export const LandingV3: React.FC = () => (
  <Box fontFamily={SANS} bg={C.offWhite}>
    <GlobalStyles />
    <Nav />
    <Hero />
    <MetricsStrip />
    <ProblemSection />
    <CapabilityTiles />
    <BackersSection />
    <FooterCta />
  </Box>
);
