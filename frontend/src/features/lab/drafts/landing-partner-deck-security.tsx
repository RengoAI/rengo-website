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

const PILLARS = [
  {
    tag: "01 · Data",
    title: "No training on your data",
    body: "Customer data is never used for model training, fine-tuning, or product improvement. This is contractual, not a preference.",
  },
  {
    tag: "02 · Isolation",
    title: "Data isolation at the storage layer",
    body: "Enforced tenant boundaries below the application. Access rules follow the data, not the query — the platform can't leak what it can't see.",
  },
  {
    tag: "03 · Encryption",
    title: "Encrypted everywhere",
    body: "End-to-end encryption across storage, network, and derivative artifacts. Keys are managed and rotated automatically.",
  },
  {
    tag: "04 · Audit",
    title: "SOC 2 Type II, continuously tested",
    body: "Independent third-party audit on a rolling basis. Findings and remediation are shared with customers under NDA.",
  },
];

const CONTROL_ROWS = [
  {
    kind: "Access",
    body: "Role- and object-level permissions enforced at the ontology layer. Every AI-generated answer is scoped to what the requester can already see.",
  },
  {
    kind: "Lineage",
    body: "Every synthesized output tracks back to its source records. Delete a source and the derived artifacts follow.",
  },
  {
    kind: "Audit trail",
    body: "Full log of every prompt, retrieval, and generated artifact. Exportable, permissioned, and retained per your policy.",
  },
  {
    kind: "Deployment",
    body: "Available on Rengo-managed infrastructure or deployed into your VPC. Data residency configurable to jurisdiction.",
  },
];

// ─── Sections ───────────────────────────────────────────────────────────────

const PillarsSection: React.FC = () => (
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
          Four things that don't compromise
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {PILLARS.map((p) => (
          <div
            key={p.title}
            style={{
              padding: 36,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              gap: 16,
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
              {p.tag}
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 24,
                letterSpacing: "-0.02em",
                lineHeight: 1.18,
                color: C.navy,
              }}
            >
              {p.title}
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
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const ControlsSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 720, marginBottom: 56 }}>
        <Eyebrow color={C.navyMid}>Controls</Eyebrow>
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
          Governance built into the platform
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
          Access, lineage, and audit are not add-ons. They live in the ontology
          layer so every application inherits them.
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${C.navy}` }}>
        {CONTROL_ROWS.map((row) => (
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

const ComplianceBand: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(60px, 8vw, 96px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.secondary,
          }}
        >
          Compliance & attestation
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 20, color: C.navy }}>
            SOC 2 Type II
          </div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: C.body }}>
            Continuous — report available under NDA
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 20, color: C.navy }}>
            GDPR-ready
          </div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: C.body }}>
            EU data residency available
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 20, color: C.navy }}>
            Pen-tested
          </div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: C.body }}>
            Independent third-party, annually
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingPartnerDeckSecurity() {
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
        eyebrow="Security"
        headline={
          <>
            Built for the data{" "}
            <span style={{ color: C.accentSky }}>you can't afford to leak.</span>
          </>
        }
        subtext="Governance, isolation, and audit are foundational — not a settings panel. Institutional firms deploy Rengo because it holds up to the diligence their LPs demand."
      />
      <PillarsSection />
      <ControlsSection />
      <ComplianceBand />
      <ClosingCta
        headline={
          <>
            Ready to talk to your{" "}
            <span style={{ color: C.accentSky }}>compliance team?</span>
          </>
        }
        subtext="We'll send our SOC 2 report, pen-test summary, and data-processing addendum under NDA."
      />
    </div>
  );
}
