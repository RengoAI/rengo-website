import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// ── tokens ────────────────────────────────────────────────────────────────────
const MONO  = '"Space Mono", SFMono-Regular, ui-monospace, monospace';
const SANS  = '"Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif';

const C = {
  ink:      "#0A0A0A",
  white:    "#FFFFFF",
  parchment:"#F0EDE8",
  hairline: "#E0DDD8",
  hairlineD:"rgba(255,255,255,0.12)",
  blue:     "#1A4F8A",
  ghost:    "rgba(10,10,10,0.04)",
  muted:    "#888",
} as const;

// ── data ──────────────────────────────────────────────────────────────────────
const METRICS = [
  { key: "AUM",        value: "$40B+" },
  { key: "CYCLES",     value: "12×" },
  { key: "LATENCY",    value: "60s" },
  { key: "STRATEGIES", value: "4" },
] as const;

const CAPABILITIES = [
  {
    n:      "01",
    name:   "DOCUMENT\nINTELLIGENCE",
    detail: "AI reads every PDF, memo, and data room — extracting, tagging, and linking information across your portfolio without human intermediation.",
  },
  {
    n:      "02",
    name:   "UNIFIED\nDATA ROOM",
    detail: "One searchable system spanning every portfolio company. Ask a question in plain language. Get an answer with a traceable source.",
  },
  {
    n:      "03",
    name:   "AUTOMATED\nREPORTING",
    detail: "From raw portfolio data to LP-ready reports in minutes. Consistent formatting. No manual aggregation. No version confusion.",
  },
] as const;

// ── label ─────────────────────────────────────────────────────────────────────
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted }}>
    {children}
  </span>
);

// ── nav ───────────────────────────────────────────────────────────────────────
const Nav: React.FC = () => (
  <Box
    as="nav"
    position="fixed"
    top={0}
    left={0}
    right={0}
    zIndex={100}
    px={{ base: "24px", md: "40px" }}
    h="48px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    <span style={{ fontFamily: MONO, fontSize: "12px", letterSpacing: "0.2em", color: C.ink }}>
      RENGO
    </span>
    <Flex gap="32px" align="center">
      <a href="#capabilities" style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.1em", color: C.muted, textDecoration: "none" }}>
        CAPABILITIES
      </a>
      <a href="mailto:sales@rengoai.com" style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.1em", color: C.ink, textDecoration: "none" }}>
        CONTACT →
      </a>
    </Flex>
  </Box>
);

// ── opening statement ─────────────────────────────────────────────────────────
const Statement: React.FC = () => {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 40); return () => clearTimeout(t); }, []);

  return (
    <Box
      as="section"
      bg={C.white}
      pt={{ base: "88px", md: "96px" }}
      pb={0}
      px={{ base: "24px", md: "40px" }}
      borderBottom={`1px solid ${C.hairline}`}
    >
      {/* giant statement */}
      <Box
        as="h1"
        fontFamily={MONO}
        fontSize={{ base: "clamp(40px,10vw,128px)", md: "clamp(64px,9vw,128px)" }}
        fontWeight="normal"
        lineHeight={0.9}
        letterSpacing="-0.02em"
        color={C.ink}
        m={0}
        mb={{ base: "48px", md: "64px" }}
        style={{
          opacity:    in_ ? 1 : 0,
          transform:  in_ ? "none" : "translateY(12px)",
          transition: "opacity 400ms ease 60ms, transform 400ms ease 60ms",
          whiteSpace: "pre-line",
        }}
      >
        {"PORTFOLIO\nINTELLIGENCE\nFOR PRIVATE\nMARKETS."}
      </Box>

      {/* sub-line */}
      <Flex
        align={{ base: "start", md: "end" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={6}
        pb={{ base: "32px", md: "40px" }}
        style={{ opacity: in_ ? 1 : 0, transition: "opacity 400ms ease 220ms" }}
      >
        <Box
          fontFamily={SANS}
          fontSize={{ base: "16px", md: "18px" }}
          lineHeight={1.55}
          color="#444"
          maxW="520px"
        >
          Purpose-built AI that turns scattered portfolio data into a single, searchable system of record — so your team runs on decisions, not spreadsheets.
        </Box>
        <a
          href="mailto:sales@rengoai.com"
          style={{
            fontFamily:    MONO,
            fontSize:      "11px",
            letterSpacing: "0.12em",
            color:         C.ink,
            textDecoration:"none",
            borderBottom:  `1px solid ${C.ink}`,
            paddingBottom: "2px",
            whiteSpace:    "nowrap",
          }}
        >
          REQUEST ACCESS →
        </a>
      </Flex>
    </Box>
  );
};

// ── data band ─────────────────────────────────────────────────────────────────
const DataBand: React.FC = () => (
  <Box
    as="section"
    bg={C.parchment}
    borderBottom={`1px solid ${C.hairline}`}
    display="grid"
    gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
  >
    {METRICS.map((m, i) => (
      <Box
        key={m.key}
        py={{ base: "28px", md: "36px" }}
        px={{ base: "24px", md: "40px" }}
        borderRight={`1px solid ${C.hairline}`}
      >
        <Box mb="10px">
          <Label>{m.key} /</Label>
        </Box>
        <Box fontFamily={MONO} fontSize={{ base: "32px", md: "44px" }} fontWeight="normal" lineHeight={1} color={C.ink} letterSpacing="-0.02em">
          {m.value}
        </Box>
      </Box>
    ))}
  </Box>
);

// ── editorial body ────────────────────────────────────────────────────────────
const Editorial: React.FC = () => (
  <Box
    as="section"
    bg={C.white}
    borderBottom={`1px solid ${C.hairline}`}
    display="grid"
    gridTemplateColumns={{ base: "1fr", md: "200px 1fr" }}
    minH={{ base: "auto", md: "360px" }}
  >
    {/* sticky label column */}
    <Box
      px={{ base: "24px", md: "40px" }}
      pt={{ base: "40px", md: "56px" }}
      pb={{ base: "0", md: "56px" }}
      borderRight={{ base: "none", md: `1px solid ${C.hairline}` }}
      borderBottom={{ base: `1px solid ${C.hairline}`, md: "none" }}
    >
      <Box position={{ base: "static", md: "sticky" }} top="80px">
        <Label>The problem /</Label>
      </Box>
    </Box>

    {/* body */}
    <Box
      px={{ base: "24px", md: "64px" }}
      py={{ base: "32px", md: "56px" }}
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={{ base: "24px", lg: "64px" }}
      alignItems="start"
    >
      <Box fontFamily={SANS} fontSize="17px" lineHeight={1.7} color="#333">
        Private markets have expanded into a mainstream part of global capital allocation. But the infrastructure supporting them has not kept pace. GPs still reconcile data across spreadsheets, PDFs, and disconnected portals — manually, every quarter.
      </Box>
      <Box fontFamily={SANS} fontSize="17px" lineHeight={1.7} color="#333">
        Rengo deploys AI agents that continuously transform raw investment data into a structured system of record. Every document ingested. Every number reconciled. Every portfolio company accounted for.
      </Box>
    </Box>
  </Box>
);

// ── capabilities ──────────────────────────────────────────────────────────────
const Capabilities: React.FC = () => (
  <Box
    as="section"
    id="capabilities"
    bg={C.white}
    borderBottom={`1px solid ${C.hairline}`}
  >
    {/* section label */}
    <Box
      px={{ base: "24px", md: "40px" }}
      py="20px"
      borderBottom={`1px solid ${C.hairline}`}
    >
      <Label>What Rengo does /</Label>
    </Box>

    {CAPABILITIES.map((cap, i) => (
      <Box
        key={cap.n}
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "200px 1fr" }}
        borderBottom={i < 2 ? `1px solid ${C.hairline}` : "none"}
        position="relative"
        overflow="hidden"
      >
        {/* ghost number */}
        <Box
          position="absolute"
          right={{ base: "-10px", md: "32px" }}
          top="50%"
          fontFamily={MONO}
          fontSize={{ base: "160px", md: "220px" }}
          fontWeight="normal"
          color={C.ghost}
          lineHeight={1}
          style={{ transform: "translateY(-50%)", pointerEvents: "none", userSelect: "none" }}
        >
          {cap.n}
        </Box>

        {/* number column */}
        <Box
          px={{ base: "24px", md: "40px" }}
          pt={{ base: "40px", md: "56px" }}
          pb={{ base: "0", md: "56px" }}
          borderRight={{ base: "none", md: `1px solid ${C.hairline}` }}
          borderBottom={{ base: `1px solid ${C.hairline}`, md: "none" }}
          position="relative"
          zIndex={1}
        >
          <Box position={{ base: "static", md: "sticky" }} top="80px">
            <span style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.16em", color: C.muted }}>{cap.n}</span>
          </Box>
        </Box>

        {/* content column */}
        <Box
          px={{ base: "24px", md: "64px" }}
          py={{ base: "32px", md: "56px" }}
          position="relative"
          zIndex={1}
        >
          <Box
            fontFamily={MONO}
            fontSize={{ base: "22px", md: "28px" }}
            fontWeight="normal"
            lineHeight={1.1}
            letterSpacing="-0.01em"
            color={C.ink}
            mb="24px"
            style={{ whiteSpace: "pre-line" }}
          >
            {cap.name}
          </Box>
          <Box fontFamily={SANS} fontSize="16px" lineHeight={1.7} color="#555" maxW="560px">
            {cap.detail}
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

// ── pedigree strip ────────────────────────────────────────────────────────────
const Pedigree: React.FC = () => {
  const items = [
    { label: "INVESTORS /",   names: ["Primary Ventures", "Inverted Capital"] },
    { label: "ANGELS /",      names: ["Tiger Global", "Marshall Wace", "S&P Global", "Maybern"] },
    { label: "BUILT FOR /",   names: ["Private Equity", "Venture Capital", "Private Credit", "Growth Equity"] },
  ] as const;

  return (
    <Box
      as="section"
      bg={C.parchment}
      borderBottom={`1px solid ${C.hairline}`}
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
    >
      {items.map((item, i) => (
        <Box
          key={item.label}
          px={{ base: "24px", md: "40px" }}
          py={{ base: "32px", md: "48px" }}
          borderRight={{ md: i < 2 ? `1px solid ${C.hairline}` : "none" }}
          borderBottom={{ base: i < 2 ? `1px solid ${C.hairline}` : "none", md: "none" }}
        >
          <Box mb="16px">
            <Label>{item.label}</Label>
          </Box>
          <Flex direction="column" gap="8px">
            {item.names.map(name => (
              <Box key={name} fontFamily={MONO} fontSize={{ base: "13px", md: "14px" }} color={C.ink} letterSpacing="-0.01em" style={{ opacity: 0.55 }}>
                {name}
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

// ── closing ───────────────────────────────────────────────────────────────────
const Closing: React.FC = () => (
  <Box as="section" bg={C.ink} px={{ base: "24px", md: "40px" }} py={{ base: "72px", md: "96px" }}>
    <Box
      fontFamily={MONO}
      fontSize={{ base: "clamp(32px,6vw,80px)", md: "clamp(40px,6vw,80px)" }}
      fontWeight="normal"
      lineHeight={0.95}
      letterSpacing="-0.02em"
      color={C.white}
      mb="48px"
    >
      READY TO<br />SEE IT?
    </Box>

    <a
      href="mailto:sales@rengoai.com"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        fontFamily:     MONO,
        fontSize:       "12px",
        letterSpacing:  "0.14em",
        color:          C.white,
        textDecoration: "none",
        borderBottom:   `1px solid rgba(255,255,255,0.3)`,
        paddingBottom:  "3px",
      }}
    >
      SALES@RENGOAI.COM →
    </a>

    {/* footer rule */}
    <Box mt="80px" pt="28px" borderTop={`1px solid ${C.hairlineD}`}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)" }}>
          RENGO AI — PORTFOLIO INTELLIGENCE
        </span>
        <Flex gap="28px">
          {(["Company", "Blog", "Careers"] as const).map(l => (
            <a key={l} href="#" style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
              {l.toUpperCase()}
            </a>
          ))}
        </Flex>
      </Flex>
    </Box>
  </Box>
);

// ── export ────────────────────────────────────────────────────────────────────
export const LandingBroadsheet: React.FC = () => (
  <Box fontFamily={SANS} bg={C.white}>
    <Nav />
    <Statement />
    <DataBand />
    <Editorial />
    <Capabilities />
    <Pedigree />
    <Closing />
  </Box>
);
