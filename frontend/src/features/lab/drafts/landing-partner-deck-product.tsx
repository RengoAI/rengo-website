import React, { useEffect, useState } from "react";

import {
  BODY,
  C,
  ClosingCta,
  Container,
  DISPLAY,
  Eyebrow,
  MONO,
  SubpageHero,
  TopNav,
  useDeckAssets,
} from "@/features/lab/drafts/landing-partner-deck.shared";

// ─── Static data ────────────────────────────────────────────────────────────

const APPLICATIONS = [
  {
    tag: "Application",
    title: "Portfolio Monitoring",
    body: "Unify historical financials, native files, and current portfolio context into a governed data lake — permissioned and available to AI tools through MCP.",
    bullets: [
      "Ingest native files without templates",
      "Query across the full portfolio history",
      "Wire directly into Claude, Copilot, or your own tools",
    ],
  },
  {
    tag: "Application",
    title: "Investor Relations",
    body: "Produce consistent, source-backed updates using current portfolio information. LP letters, capital calls, and one-off asks answered from the same foundation.",
    bullets: [
      "Auto-drafted quarterly letters",
      "Source-linked answers for LP inquiries",
      "Historical position never rebuilt from scratch",
    ],
  },
  {
    tag: "Application",
    title: "Deal Review",
    body: "Compare each opportunity against firm precedent without rebuilding context. Investment committee memos wired directly to your CRM, data room, and prior notes.",
    bullets: [
      "Precedent-linked deal memos",
      "IC-ready comparables in minutes",
      "Preserved context across the full deal history",
    ],
  },
];

const AGENT_ROWS = [
  {
    kind: "Ingestion",
    body: "Watch email, portals, and shared drives. Pull, parse, and route incoming documents into the ontology without templates.",
  },
  {
    kind: "Reconciliation",
    body: "Continuously match figures across models, ledger entries, and reporting workflows. Flag drift the moment it happens.",
  },
  {
    kind: "Synthesis",
    body: "Draft memos, letters, and briefs on demand — grounded in current portfolio state, permissioned to the requester.",
  },
];

const CASE_STEPS = [
  {
    verb: "Migrate",
    body: "Moved the firm off its existing portfolio-monitoring software.",
  },
  {
    verb: "Unify",
    body: "Built a governed data lake of all historical portfolio financials.",
  },
  {
    verb: "Automate",
    body: "Ingested native files without templates or manual review.",
  },
  {
    verb: "Deploy",
    body: "Permissioned the data and made it available to AI tools through MCP.",
  },
  {
    verb: "Operate",
    body: "Maintain and extend applications on the shared foundation.",
  },
];

// ─── Sections ───────────────────────────────────────────────────────────────

const ApplicationsSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 72 }}>
        <Eyebrow color={C.navyMid}>Applications</Eyebrow>
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
          Ready-to-deploy applications, tailored to how your firm operates
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
          Each application sits on the same governed foundation. Deploy one,
          get the shared context that makes the next one faster.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {APPLICATIONS.map((app) => (
          <div
            key={app.title}
            style={{
              padding: 36,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.secondary,
              }}
            >
              {app.tag}
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 28,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: C.navy,
              }}
            >
              {app.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 15,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {app.body}
            </p>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderTop: `1px solid ${C.hairline}`,
                paddingTop: 16,
              }}
            >
              {app.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    fontFamily: BODY,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: C.body,
                    paddingLeft: 16,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.55em",
                      width: 6,
                      height: 1,
                      background: C.secondary,
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const AgentsSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 56 }}>
        <Eyebrow color={C.navyMid}>Agents</Eyebrow>
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
          Work moves off the team's desk
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
          Agents execute recurring workflows across the systems your firm
          already uses — email, ledger, portals, files. Not a chatbot, a
          coworker.
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${C.navy}` }}>
        {AGENT_ROWS.map((row) => (
          <div
            key={row.kind}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 40,
              padding: "28px 0",
              borderBottom: `1px solid ${C.hairline}`,
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 24,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: C.navy,
              }}
            >
              {row.kind}
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 15,
                lineHeight: 1.65,
                color: C.body,
                maxWidth: 720,
              }}
            >
              {row.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const CaseSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 820, marginBottom: 56 }}>
        <Eyebrow color={C.navyMid}>Case study · Portfolio monitoring</Eyebrow>
        <h2
          style={{
            margin: "20px 0 0",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            color: C.navy,
          }}
        >
          In one month, Rengo delivered more than the previous vendor did in
          over a year.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {CASE_STEPS.map((step, i) => (
          <div
            key={step.verb}
            style={{
              padding: 28,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                color: C.secondary,
                marginBottom: 20,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3
              style={{
                margin: "0 0 12px",
                fontFamily: DISPLAY,
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: C.navy,
              }}
            >
              {step.verb}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 13,
                lineHeight: 1.6,
                color: C.body,
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingPartnerDeckProduct() {
  const [overHero, setOverHero] = useState(true);

  useDeckAssets();

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.paper, color: C.body, fontFamily: BODY }}>
      <TopNav overHero={overHero} />
      <SubpageHero
        eyebrow="Product"
        headline={
          <>
            One foundation.{" "}
            <span style={{ color: C.accentSky }}>Every application.</span>
          </>
        }
        subtext="Applications and agents deployed on a shared, governed data foundation — so every workflow builds on the last instead of starting from scratch."
      />
      <ApplicationsSection />
      <AgentsSection />
      <CaseSection />
      <ClosingCta />
    </div>
  );
}
