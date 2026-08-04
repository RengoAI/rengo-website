import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

// ── fonts ─────────────────────────────────────────────────────────────────────
const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, ui-serif, serif';
const BODY    = '"DM Sans", ui-sans-serif, system-ui, sans-serif';
const LABEL   = '"Barlow Condensed", ui-sans-serif, sans-serif';

// ── palette ───────────────────────────────────────────────────────────────────
const C = {
  chalk:    "#F8F6F1",
  white:    "#FFFFFF",
  ink:      "#141414",
  slate:    "#2B4A8F",
  stone:    "#8C8880",
  parchment:"#D9D4CE",
  warm:     "#EAE6E0",
  earth:    "#B8A898",
  dark:     "#1A1A1A",
} as const;

// dot-grid SVG background — scientific coordinate feel
const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23141414' fill-opacity='0.065'/%3E%3C/svg%3E")`;

// ── data ──────────────────────────────────────────────────────────────────────
const METRICS = [
  { value: "$40B+", unit: "AUM",      label: "Assets monitored across mandates" },
  { value: "12×",   unit: "VELOCITY", label: "Faster quarterly reporting cycles" },
  { value: "60s",   unit: "LATENCY",  label: "Document ingested to structured record" },
] as const;

const FIRMS = ["Private Equity", "Venture Capital", "Private Credit", "Growth Equity", "Real Assets"] as const;

const CAPABILITIES = [
  {
    fig:    "FIG. 01",
    name:   "Document Intelligence",
    detail: "AI reads every PDF, memo, and data room — extracting, tagging, and cross-referencing information across all portfolio companies without human intermediation.",
  },
  {
    fig:    "FIG. 02",
    name:   "Unified Data Room",
    detail: "A single searchable system spanning your entire portfolio. Ask a question in natural language. Receive a structured answer with traceable provenance.",
  },
  {
    fig:    "FIG. 03",
    name:   "Automated Reporting",
    detail: "From raw portfolio data to LP-ready reports in minutes. Consistent formatting, reconciled figures, and zero manual aggregation.",
  },
] as const;

const PROCESS_STEPS = [
  { n: "01", heading: "Ingest", body: "Connect your data rooms, document repositories, and existing systems. Rengo's agents begin reading and classifying immediately." },
  { n: "02", heading: "Structure", body: "Every document, number, and relationship is extracted, tagged, and linked into a unified graph — no templates required." },
  { n: "03", heading: "Activate", body: "Query the system in plain language, generate reports, or surface anomalies. Your data answers questions it never could before." },
] as const;

// ── reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ── nav ───────────────────────────────────────────────────────────────────────
const Nav: React.FC = () => (
  <Box
    as="nav"
    position="fixed"
    top={0} left={0} right={0}
    zIndex={100}
    h="48px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    px={{ base: "24px", md: "48px" }}
  >
    <span style={{ fontFamily: LABEL, fontSize: "13px", letterSpacing: "0.22em", fontWeight: 500, color: C.ink }}>
      RENGO
    </span>
    <Flex gap="36px" align="center">
      <a href="#capabilities" style={{ fontFamily: LABEL, fontSize: "12px", letterSpacing: "0.14em", color: C.stone, textDecoration: "none" }}>CAPABILITIES</a>
      <a href="mailto:sales@rengoai.com" style={{ fontFamily: LABEL, fontSize: "12px", letterSpacing: "0.14em", color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.ink}`, paddingBottom: "1px" }}>CONTACT</a>
    </Flex>
  </Box>
);

// ── hero ──────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 60); return () => clearTimeout(t); }, []);

  return (
    <Box
      as="section"
      bg={C.chalk}
      style={{ backgroundImage: DOT_GRID }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      pt="80px"
      pb={{ base: "56px", md: "72px" }}
      px={{ base: "24px", md: "48px" }}
      borderBottom={`1px solid ${C.parchment}`}
      position="relative"
      overflow="hidden"
    >
      {/* classification header — scientific notation */}
      <Box
        mb={{ base: "32px", md: "48px" }}
        style={{
          opacity: in_ ? 1 : 0,
          transition: "opacity 500ms ease 80ms",
        }}
      >
        <span style={{
          fontFamily: LABEL, fontSize: "10px", letterSpacing: "0.22em",
          color: C.stone, textTransform: "uppercase" as const, display: "block", marginBottom: "6px",
        }}>
          § 001 — Portfolio Intelligence System
        </span>
        <div style={{ width: "32px", height: "1px", background: C.earth }} />
      </Box>

      {/* main headline */}
      <Box maxW="1100px" mb={{ base: "36px", md: "52px" }}>
        <Box
          as="h1"
          m={0}
          fontFamily={DISPLAY}
          fontWeight={300}
          lineHeight={0.92}
          letterSpacing="-0.01em"
          color={C.ink}
          fontSize={{ base: "clamp(52px,11vw,148px)", md: "clamp(72px,10vw,148px)" }}
          style={{
            opacity: in_ ? 1 : 0,
            transform: in_ ? "none" : "translateY(24px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 160ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 160ms",
          }}
        >
          Every portfolio number,
        </Box>
        <Box
          as="div"
          fontFamily={DISPLAY}
          fontWeight={300}
          fontStyle="italic"
          lineHeight={0.92}
          letterSpacing="-0.01em"
          color={C.ink}
          fontSize={{ base: "clamp(52px,11vw,148px)", md: "clamp(72px,10vw,148px)" }}
          style={{
            opacity: in_ ? 1 : 0,
            transform: in_ ? "none" : "translateY(24px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 280ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 280ms",
          }}
        >
          one source of truth.
        </Box>
      </Box>

      {/* sub-row */}
      <Flex
        align={{ base: "start", md: "end" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={{ base: "28px", md: "0" }}
        style={{
          opacity: in_ ? 1 : 0,
          transition: "opacity 500ms ease 480ms",
        }}
      >
        <Box fontFamily={BODY} fontSize={{ base: "16px", md: "17px" }} lineHeight={1.6} color={C.stone} maxW="460px" fontWeight={300}>
          Purpose-built AI trusted by leading asset managers to turn scattered portfolio data into a single, searchable system of record.
        </Box>
        <Flex direction="column" align={{ base: "start", md: "end" }} gap="12px">
          <a
            href="mailto:sales@rengoai.com"
            style={{
              fontFamily: LABEL, fontSize: "12px", letterSpacing: "0.18em",
              color: C.ink, textDecoration: "none",
              borderBottom: `1px solid ${C.ink}`, paddingBottom: "2px",
            }}
          >
            REQUEST ACCESS →
          </a>
          <span style={{ fontFamily: LABEL, fontSize: "10px", letterSpacing: "0.12em", color: C.stone }}>
            BY APPOINTMENT ONLY
          </span>
        </Flex>
      </Flex>
    </Box>
  );
};

// ── firm taxonomy strip ───────────────────────────────────────────────────────
const TaxonomyStrip: React.FC = () => (
  <Box
    bg={C.warm}
    px={{ base: "24px", md: "48px" }}
    py="14px"
    borderBottom={`1px solid ${C.parchment}`}
    display="flex"
    alignItems="center"
    gap={{ base: "16px", md: "0" }}
    flexWrap="wrap"
  >
    <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.2em", color: C.earth, textTransform: "uppercase" as const, marginRight: "20px", flexShrink: 0 }}>
      CLASSIFICATION /
    </span>
    <Flex gap={0} flexWrap="wrap" align="center">
      {FIRMS.map((f, i) => (
        <React.Fragment key={f}>
          <span style={{ fontFamily: LABEL, fontSize: "12px", letterSpacing: "0.1em", color: C.stone }}>{f}</span>
          {i < FIRMS.length - 1 && <span style={{ fontFamily: LABEL, fontSize: "12px", color: C.parchment, margin: "0 14px" }}>·</span>}
        </React.Fragment>
      ))}
    </Flex>
  </Box>
);

// ── metrics ───────────────────────────────────────────────────────────────────
const Metrics: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        bg={C.white}
        borderBottom={`1px solid ${C.parchment}`}
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
      >
        {METRICS.map((m, i) => (
          <Box
            key={m.unit}
            px={{ base: "24px", md: "48px" }}
            py={{ base: "40px", md: "56px" }}
            borderRight={{ md: i < 2 ? `1px solid ${C.parchment}` : "none" }}
            borderBottom={{ base: i < 2 ? `1px solid ${C.parchment}` : "none", md: "none" }}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: `opacity 600ms ease ${i * 90}ms, transform 600ms ease ${i * 90}ms`,
            }}
          >
            {/* unit label */}
            <Box mb="16px" display="flex" alignItems="center" gap="8px">
              <div style={{ width: "16px", height: "1px", background: C.earth }} />
              <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.22em", color: C.earth, textTransform: "uppercase" as const }}>{m.unit}</span>
            </Box>

            {/* value */}
            <Box
              fontFamily={DISPLAY}
              fontStyle="italic"
              fontWeight={300}
              fontSize={{ base: "52px", md: "clamp(48px,5vw,72px)" }}
              lineHeight={1}
              letterSpacing="-0.01em"
              color={C.ink}
              mb="12px"
            >
              {m.value}
            </Box>

            {/* description */}
            <Box fontFamily={BODY} fontSize="13px" lineHeight={1.5} color={C.stone} fontWeight={300} maxW="200px">
              {m.label}
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

// ── capabilities ──────────────────────────────────────────────────────────────
const Capabilities: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} id="capabilities">
      <Box bg={C.chalk} borderBottom={`1px solid ${C.parchment}`}>
        {/* section label */}
        <Box
          px={{ base: "24px", md: "48px" }}
          py="18px"
          borderBottom={`1px solid ${C.parchment}`}
          display="flex"
          alignItems="center"
          gap="12px"
        >
          <div style={{ width: "20px", height: "1px", background: C.slate }} />
          <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.22em", color: C.slate, textTransform: "uppercase" as const }}>SYSTEM CAPABILITIES</span>
        </Box>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
          style={{ borderLeft: `1px solid ${C.parchment}` }}
        >
          {CAPABILITIES.map((cap, i) => (
            <Box
              key={cap.fig}
              px={{ base: "24px", md: "40px" }}
              pt={{ base: "40px", md: "52px" }}
              pb={{ base: "40px", md: "60px" }}
              borderRight={`1px solid ${C.parchment}`}
              borderBottom={{ base: i < 2 ? `1px solid ${C.parchment}` : "none", md: "none" }}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(20px)",
                transition: `opacity 600ms ease ${i * 110}ms, transform 600ms ease ${i * 110}ms`,
              }}
            >
              {/* figure label */}
              <Box mb="28px" display="flex" alignItems="center" gap="8px">
                <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.18em", color: C.earth, textTransform: "uppercase" as const }}>{cap.fig}</span>
                <div style={{ flex: 1, height: "1px", background: C.parchment }} />
              </Box>

              {/* capability name */}
              <Box
                fontFamily={DISPLAY}
                fontWeight={400}
                fontSize={{ base: "26px", md: "30px" }}
                lineHeight={1.1}
                letterSpacing="-0.01em"
                color={C.ink}
                mb="20px"
              >
                {cap.name}
              </Box>

              {/* detail */}
              <Box fontFamily={BODY} fontSize="14px" lineHeight={1.7} color={C.stone} fontWeight={300}>
                {cap.detail}
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

// ── method (dark section) ─────────────────────────────────────────────────────
const Method: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        as="section"
        bg={C.dark}
        borderBottom={`1px solid ${C.parchment}`}
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      >
        {/* left — editorial quote */}
        <Box
          px={{ base: "24px", md: "48px" }}
          pt={{ base: "56px", md: "72px" }}
          pb={{ base: "0", md: "72px" }}
          borderRight={{ lg: "1px solid rgba(255,255,255,0.08)" }}
          borderBottom={{ base: "1px solid rgba(255,255,255,0.08)", lg: "none" }}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: "opacity 600ms ease, transform 600ms ease",
          }}
        >
          <Box mb="28px" display="flex" alignItems="center" gap="12px">
            <div style={{ width: "20px", height: "1px", background: C.earth }} />
            <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.22em", color: C.earth, textTransform: "uppercase" as const }}>THE PROCESS</span>
          </Box>
          <Box
            fontFamily={DISPLAY}
            fontStyle="italic"
            fontWeight={300}
            fontSize={{ base: "28px", md: "clamp(28px,3vw,42px)" }}
            lineHeight={1.2}
            letterSpacing="-0.01em"
            color={C.chalk}
            maxW="480px"
            pb={{ base: "40px", lg: "0" }}
          >
            "Private markets generate more data than any team can reconcile manually. Rengo exists to close that gap permanently."
          </Box>
        </Box>

        {/* right — numbered steps */}
        <Box
          px={{ base: "24px", md: "48px" }}
          py={{ base: "40px", md: "72px" }}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: "opacity 600ms ease 120ms, transform 600ms ease 120ms",
          }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <Box
              key={step.n}
              pb={i < 2 ? "32px" : 0}
              mb={i < 2 ? "32px" : 0}
              borderBottom={i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none"}
            >
              <Flex align="baseline" gap="16px" mb="10px">
                <span style={{ fontFamily: LABEL, fontSize: "11px", letterSpacing: "0.16em", color: C.earth }}>{step.n}</span>
                <span style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 400, color: C.chalk, letterSpacing: "-0.01em" }}>{step.heading}</span>
              </Flex>
              <Box fontFamily={BODY} fontSize="14px" lineHeight={1.7} color="rgba(248,246,241,0.55)" fontWeight={300} maxW="400px">
                {step.body}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

// ── pedigree ──────────────────────────────────────────────────────────────────
const Pedigree: React.FC = () => {
  const { ref, vis } = useReveal();
  const rows = [
    { label: "LEAD INVESTORS",   items: ["Primary Ventures", "Inverted Capital"] },
    { label: "STRATEGIC ANGELS", items: ["Tiger Global", "Marshall Wace", "S&P Global", "Maybern"] },
  ] as const;

  return (
    <div ref={ref}>
      <Box bg={C.warm} borderBottom={`1px solid ${C.parchment}`}>
        <Box
          px={{ base: "24px", md: "48px" }}
          py="18px"
          borderBottom={`1px solid ${C.parchment}`}
          display="flex"
          alignItems="center"
          gap="12px"
        >
          <div style={{ width: "20px", height: "1px", background: C.slate }} />
          <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.22em", color: C.slate, textTransform: "uppercase" as const }}>BACKING & PEDIGREE</span>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
          style={{ opacity: vis ? 1 : 0, transition: "opacity 500ms ease" }}
        >
          {rows.map((row, i) => (
            <Box
              key={row.label}
              px={{ base: "24px", md: "48px" }}
              py={{ base: "32px", md: "48px" }}
              borderRight={{ md: i === 0 ? `1px solid ${C.parchment}` : "none" }}
              borderBottom={{ base: i === 0 ? `1px solid ${C.parchment}` : "none", md: "none" }}
            >
              <Box mb="16px" display="flex" alignItems="center" gap="8px">
                <span style={{ fontFamily: LABEL, fontSize: "9px", letterSpacing: "0.2em", color: C.earth, textTransform: "uppercase" as const }}>{row.label}</span>
                <div style={{ flex: 1, height: "1px", background: C.parchment }} />
              </Box>
              <Flex gap="24px" flexWrap="wrap">
                {row.items.map(name => (
                  <span key={name} style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 300, color: C.ink, letterSpacing: "-0.005em", opacity: 0.65 }}>
                    {name}
                  </span>
                ))}
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

// ── closing ───────────────────────────────────────────────────────────────────
const Closing: React.FC = () => {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref}>
      <Box
        bg={C.chalk}
        style={{ backgroundImage: DOT_GRID }}
        px={{ base: "24px", md: "48px" }}
        py={{ base: "80px", md: "112px" }}
      >
        <Box
          fontFamily={LABEL}
          fontSize="9px"
          letterSpacing="0.22em"
          color={C.earth}
          mb="28px"
          display="flex"
          alignItems="center"
          gap="12px"
          style={{ opacity: vis ? 1 : 0, transition: "opacity 400ms ease" }}
        >
          <div style={{ width: "20px", height: "1px", background: C.earth }} />
          § 002 — BEGIN WITH A CONVERSATION
        </Box>

        <Box
          fontFamily={DISPLAY}
          fontWeight={300}
          fontSize={{ base: "clamp(36px,7vw,96px)", md: "clamp(48px,7vw,96px)" }}
          lineHeight={0.95}
          letterSpacing="-0.015em"
          color={C.ink}
          mb="52px"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: "opacity 650ms cubic-bezier(0.16,1,0.3,1) 80ms, transform 650ms cubic-bezier(0.16,1,0.3,1) 80ms",
          }}
        >
          See the system<br />
          <span style={{ fontStyle: "italic" }}>working.</span>
        </Box>

        <Flex
          align="center"
          gap="48px"
          flexWrap="wrap"
          style={{ opacity: vis ? 1 : 0, transition: "opacity 400ms ease 240ms" }}
        >
          <a
            href="mailto:sales@rengoai.com"
            style={{
              fontFamily: LABEL, fontSize: "12px", letterSpacing: "0.18em",
              color: C.ink, textDecoration: "none",
              borderBottom: `1px solid ${C.ink}`, paddingBottom: "2px",
            }}
          >
            ARRANGE A DEMONSTRATION →
          </a>
          <span style={{ fontFamily: LABEL, fontSize: "10px", letterSpacing: "0.12em", color: C.stone }}>
            BY APPOINTMENT · sales@rengoai.com
          </span>
        </Flex>

        {/* footer */}
        <Box mt="96px" pt="24px" borderTop={`1px solid ${C.parchment}`}>
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <span style={{ fontFamily: LABEL, fontSize: "10px", letterSpacing: "0.18em", color: C.stone }}>
              RENGO AI · PORTFOLIO INTELLIGENCE
            </span>
            <Flex gap="28px">
              {(["Company", "Blog", "Careers", "Privacy"] as const).map(l => (
                <a key={l} href="#" style={{ fontFamily: LABEL, fontSize: "10px", letterSpacing: "0.14em", color: C.stone, textDecoration: "none" }}>
                  {l.toUpperCase()}
                </a>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

// ── export ────────────────────────────────────────────────────────────────────
export const LandingHeroV2: React.FC = () => (
  <Box fontFamily={BODY} bg={C.chalk}>
    <Nav />
    <Hero />
    <TaxonomyStrip />
    <Metrics />
    <Capabilities />
    <Method />
    <Pedigree />
    <Closing />
  </Box>
);
