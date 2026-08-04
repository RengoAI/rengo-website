import React, { useEffect, useState } from "react";

import {
  BLOOM_LAYERS,
  BLOOM_MASKED_FILL,
  BLOOM_MASKED_MASK,
  BODY,
  C,
  ClosingCta,
  Container,
  DISPLAY,
  Eyebrow,
  MONO,
  TopNav,
  useDeckAssets,
} from "@/features/lab/drafts/landing-partner-deck.shared";

// ─── Static data ────────────────────────────────────────────────────────────

const FIRM_TYPES = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Real Estate",
];

const FUNCTIONS = [
  {
    label: "Investments",
    title: "Evaluate more opportunities",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
  },
  {
    label: "Portfolio Management",
    title: "Accelerate value creation",
    body: "Identify risks and opportunities earlier and scale what works across the portfolio.",
  },
  {
    label: "Investor Relations",
    title: "Communicate with confidence",
    body: "Produce consistent, source-backed updates using current portfolio information.",
  },
  {
    label: "Finance & Operations",
    title: "Spend less time reconciling",
    body: "Keep information current across models, systems, and reporting workflows.",
  },
];

const CONTEXT_COLUMNS = [
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

const CAPABILITY_STAGES = [
  {
    stage: "Restricted",
    deployment: "Blocked or limited to isolated pilots",
    data: "Spreadsheets, files, and disconnected systems",
    impact: "Falling behind as workflows remain unchanged",
    emphasis: false,
  },
  {
    stage: "Assistive",
    deployment: "Assistants support individual tasks",
    data: "Selected sources connected; other context supplied through copy and paste",
    impact: "Keeping pace as the same work becomes somewhat faster",
    emphasis: false,
  },
  {
    stage: "Operationalized",
    deployment: "Agents execute recurring workflows across systems",
    data: "Warehouse or lakehouse foundation with governed context, permissions, and lineage",
    impact: "Pulling ahead as work moves off the team's desk",
    emphasis: true,
  },
];

const STACK_LAYERS = [
  {
    num: "01",
    title: "Applications",
    body: "Ready-to-deploy applications for your workflows — portfolio monitoring, investor relations, deal review.",
  },
  {
    num: "02",
    title: "Agents",
    body: "Execute and coordinate work across your existing systems — email, ledger, portals, and files.",
  },
  {
    num: "03",
    title: "Ontology",
    body: "Structured knowledge with access control, lineage, and permissions built for institutional data.",
  },
];

const SECURITY_TILES = [
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

// ─── Sections ───────────────────────────────────────────────────────────────

const Hero: React.FC = () => (
  <section
    style={{
      position: "relative",
      minHeight: "100vh",
      background: C.ink,
      color: "#fff",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: BLOOM_MASKED_FILL,
        WebkitMaskImage: BLOOM_MASKED_MASK,
        maskImage: BLOOM_MASKED_MASK,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: BLOOM_LAYERS,
      }}
    />

    <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 120, paddingBottom: 100 }}>
      <Container>
        <div style={{ maxWidth: 720 }}>
          <div
            style={{
              width: 52,
              height: 2,
              marginBottom: 24,
              background: "linear-gradient(90deg, #4FA3E3, rgba(79,163,227,0))",
            }}
          />
          <Eyebrow color="rgba(255,255,255,0.55)">Institutional Intelligence</Eyebrow>
          <h1
            style={{
              margin: "22px 0 0",
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(56px, 7vw, 104px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#fff",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Your data is <span style={{ color: C.accentSky }}>your alpha.</span>
          </h1>
          <p
            style={{
              margin: "28px 0 0",
              maxWidth: 580,
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            The models are no longer the bottleneck — your firm's operating
            model is. Rengo turns your data, decisions, and documents into a
            foundation your team and your AI can act on.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center" }}>
            <a
              href="mailto:sales@rengoai.com"
              style={{
                display: "inline-block",
                padding: "12px 22px",
                borderRadius: 8,
                background: "#fff",
                color: C.navy,
                fontFamily: BODY,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              See a demo
            </a>
            <a
              href="#context"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              Read the thesis →
            </a>
          </div>
        </div>
      </Container>
    </div>
  </section>
);

const FirmsStrip: React.FC = () => {
  // Repeat the array 4× so the -50% translate lands on an identical position
  // for a seamless loop. Only the first half is "real" — the rest is a copy.
  const items = Array(4).fill(FIRM_TYPES).flat();
  const maskGradient =
    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)";

  return (
    <section
      style={{
        borderBottom: `1px solid ${C.hairline}`,
        padding: "40px 0",
        background: C.paper,
      }}
    >
      <Container>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.secondary,
            marginBottom: 28,
          }}
        >
          Built with leading firms across
        </div>
      </Container>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          WebkitMaskImage: maskGradient,
          maskImage: maskGradient,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 64,
            width: "max-content",
            whiteSpace: "nowrap",
            animation: "partner-deck-marquee 40s linear infinite",
          }}
        >
          {items.map((label, i) => (
            <div
              key={i}
              style={{
                fontFamily: BODY,
                fontSize: 17,
                color: C.secondary,
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContextSection: React.FC = () => (
  <section
    id="context"
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 780, marginBottom: 72 }}>
        <Eyebrow color={C.navyMid}>Context is the compounding asset</Eyebrow>
        <h2
          style={{
            margin: "20px 0 0",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.navy,
          }}
        >
          The models are no longer the bottleneck.
          <br />
          <span style={{ color: C.navyMid }}>
            Your firm's operating model is.
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 0,
          background: C.paper,
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {CONTEXT_COLUMNS.map((col) => (
          <div
            key={col.label}
            style={{
              padding: "clamp(32px, 5vw, 56px)",
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Eyebrow color={C.navyMid}>{col.label}</Eyebrow>
            <h3
              style={{
                margin: "24px 0 20px",
                maxWidth: 440,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(24px, 2.5vw, 30px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: C.navy,
              }}
            >
              {col.headline}
            </h3>
            <p
              style={{
                margin: 0,
                maxWidth: 460,
                fontFamily: BODY,
                fontSize: 15,
                lineHeight: 1.65,
                color: C.body,
              }}
            >
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const FunctionsSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 72 }}>
        <Eyebrow color={C.navyMid}>A shared foundation</Eyebrow>
        <h2
          style={{
            margin: "20px 0 20px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.navy,
          }}
        >
          Leverage across every function
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 620,
            fontFamily: BODY,
            fontSize: 17,
            lineHeight: 1.55,
            color: C.body,
          }}
        >
          Shared data infrastructure and applied AI improve how every team
          operates — from origination through operations.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {FUNCTIONS.map((fn) => (
          <div
            key={fn.label}
            style={{
              padding: 32,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Eyebrow color={C.secondary}>{fn.label}</Eyebrow>
            <h3
              style={{
                margin: "24px 0 16px",
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 24,
                letterSpacing: "-0.02em",
                lineHeight: 1.18,
                color: C.navy,
              }}
            >
              {fn.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {fn.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const CapabilitySection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 72 }}>
        <Eyebrow color={C.navyMid}>The AI capability curve</Eyebrow>
        <h2
          style={{
            margin: "20px 0 20px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.navy,
          }}
        >
          The gap is widening between firms who invest in AI and those who don't
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 620,
            fontFamily: BODY,
            fontSize: 17,
            lineHeight: 1.55,
            color: C.body,
          }}
        >
          Most firms are stuck between pilots and true operational deployment.
          Rengo is the fast path to the next stage.
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${C.navy}` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr 1.4fr 1.4fr",
            gap: 24,
            padding: "18px 0",
            borderBottom: `1px solid ${C.hairline}`,
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.secondary,
          }}
        >
          <div>Stage</div>
          <div>AI Deployment</div>
          <div>Data Readiness</div>
          <div>Impact</div>
        </div>
        {CAPABILITY_STAGES.map((stage) => (
          <div
            key={stage.stage}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr 1.4fr 1.4fr",
              gap: 24,
              padding: "36px 20px",
              margin: "0 -20px",
              borderBottom: `1px solid ${C.hairline}`,
              alignItems: "start",
              background: stage.emphasis ? "rgba(79,163,227,0.06)" : "transparent",
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 26,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: stage.emphasis ? C.navyMid : C.navy,
              }}
            >
              {stage.stage}
            </div>
            <div
              style={{
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {stage.deployment}
            </div>
            <div
              style={{
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {stage.data}
            </div>
            <div
              style={{
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.6,
                color: stage.emphasis ? C.navyMid : C.body,
                fontWeight: stage.emphasis ? 500 : 400,
              }}
            >
              {stage.impact}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const StackSection: React.FC = () => (
  <section
    style={{
      position: "relative",
      background: C.ink,
      color: "#fff",
      padding: "clamp(80px, 12vw, 140px) 0",
      overflow: "hidden",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(70% 60% at 8% 10%, rgba(0,120,212,0.22) 0%, rgba(0,110,198,0.12) 40%, rgba(0,100,184,0.04) 70%, rgba(0,100,184,0) 100%)",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 72 }}>
          <Eyebrow color="rgba(255,255,255,0.55)">How we deploy</Eyebrow>
          <h2
            style={{
              margin: "20px 0 20px",
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(34px, 4.5vw, 56px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              color: "#fff",
            }}
          >
            Applications and agents, tailored to how your firm operates
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: 620,
              fontFamily: BODY,
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Three layers, deployed together on your infrastructure. Each layer
            reinforces the others.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            borderLeft: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {STACK_LAYERS.map((layer) => (
            <div
              key={layer.title}
              style={{
                padding: 40,
                borderRight: "1px solid rgba(255,255,255,0.14)",
                borderBottom: "1px solid rgba(255,255,255,0.14)",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 24,
                }}
              >
                {layer.num}
              </div>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  fontSize: 26,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "#fff",
                }}
              >
                {layer.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: BODY,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {layer.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  </section>
);

const SecuritySection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 72 }}>
        <Eyebrow color={C.navyMid}>Institutional rigor</Eyebrow>
        <h2
          style={{
            margin: "20px 0 20px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.navy,
          }}
        >
          Governance and security are foundational
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 620,
            fontFamily: BODY,
            fontSize: 17,
            lineHeight: 1.55,
            color: C.body,
          }}
        >
          Built for how institutional firms operate — with the controls,
          isolation, and audit posture that sensitive data requires.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {SECURITY_TILES.map((tile) => (
          <div
            key={tile.title}
            style={{
              padding: 32,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px",
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 22,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: C.navy,
              }}
            >
              {tile.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingPartnerDeck() {
  const [overHero, setOverHero] = useState(true);

  useDeckAssets();

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight - 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.paper, color: C.body, fontFamily: BODY }}>
      <TopNav overHero={overHero} />
      <Hero />
      <FirmsStrip />
      <ContextSection />
      <FunctionsSection />
      <CapabilitySection />
      <StackSection />
      <SecuritySection />
      <ClosingCta />
    </div>
  );
}
