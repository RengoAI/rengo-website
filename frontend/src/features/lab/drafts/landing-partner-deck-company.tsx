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

const FOUNDERS = [
  {
    name: "Erik Ronning",
    role: "Co-founder & CEO",
    bio: "Previously a Founding Engineer at Maybern, where he led engineering and pioneered automations across fund-level waterfalls, management fees, and back-office workflows.",
  },
  {
    name: "Grant Gustafson",
    role: "Co-founder & CTO",
    bio: "Former Head of Quantamental Engineering at Marshall Wace, where he built and owned data and AI infrastructure for institutional research and systematic investing at a $70B investment manager.",
  },
];

const TEAM_LOGOS = ["Microsoft", "Blend", "Marshall Wace", "Maybern"];

const INVESTORS = ["Primary Ventures", "Inverted Capital"];
const ANGELS = ["Tiger Global", "Marshall Wace", "S&P Global", "Maybern"];

// ─── Sections ───────────────────────────────────────────────────────────────

const MissionSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow color={C.navyMid}>Your data is your alpha</Eyebrow>
          <h2
            style={{
              margin: "20px 0 0",
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: C.navy,
              maxWidth: 480,
            }}
          >
            The AI deployment company for investment firms
          </h2>
        </div>
        <div>
          <p
            style={{
              margin: "0 0 24px",
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: 1.65,
              color: C.body,
              maxWidth: 620,
            }}
          >
            Private markets have expanded into a mainstream part of global
            capital allocation, but the infrastructure supporting them has not
            kept pace.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: 1.65,
              color: C.body,
              maxWidth: 620,
            }}
          >
            Rengo deploys applications and agents that turn raw investment data
            — files, ledgers, portals, and decisions — into a structured system
            of record that both your team and your AI can act on.
          </p>
        </div>
      </div>
    </Container>
  </section>
);

const FoundersSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(80px, 12vw, 140px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 680, marginBottom: 64 }}>
        <Eyebrow color={C.navyMid}>Founders</Eyebrow>
        <h2
          style={{
            margin: "20px 0 12px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.navy,
          }}
        >
          We know the work
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontFamily: BODY,
            fontSize: 16,
            lineHeight: 1.65,
            color: C.body,
          }}
        >
          Our team brings experience across asset-management workflows and
          infrastructure.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {FOUNDERS.map((f) => (
          <div
            key={f.name}
            style={{
              padding: 40,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                margin: "0 0 6px",
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: C.navy,
              }}
            >
              {f.name}
            </h3>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.navyMid,
                marginBottom: 20,
              }}
            >
              {f.role}
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 15,
                lineHeight: 1.65,
                color: C.body,
              }}
            >
              {f.bio}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const TeamPedigreeSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(70px, 10vw, 110px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 680, marginBottom: 48 }}>
        <Eyebrow color={C.navyMid}>Broader team</Eyebrow>
        <h2
          style={{
            margin: "20px 0 12px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 40px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: C.navy,
          }}
        >
          From people behind leading products
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontFamily: BODY,
            fontSize: 15,
            lineHeight: 1.65,
            color: C.body,
          }}
        >
          Experience from category-defining technology, financial services, and
          private markets companies.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          borderTop: `1px solid ${C.hairline}`,
          borderLeft: `1px solid ${C.hairline}`,
        }}
      >
        {TEAM_LOGOS.map((label) => (
          <div
            key={label}
            style={{
              padding: 24,
              minHeight: 120,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: DISPLAY,
              fontSize: 20,
              letterSpacing: "-0.01em",
              color: C.navy,
              opacity: 0.72,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const InvestorsSection: React.FC = () => (
  <section
    style={{
      background: C.paper,
      padding: "clamp(70px, 10vw, 110px) 0",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <Container>
      <div style={{ maxWidth: 680, marginBottom: 48 }}>
        <Eyebrow color={C.navyMid}>Backed by</Eyebrow>
        <h2
          style={{
            margin: "20px 0 12px",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 40px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: C.navy,
          }}
        >
          Investors who know the market
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontFamily: BODY,
            fontSize: 15,
            lineHeight: 1.65,
            color: C.body,
          }}
        >
          Supported by venture investors and angels with experience across
          public markets, private markets, and financial data infrastructure.
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
        {[
          { label: "Investors", names: INVESTORS },
          { label: "Angels from", names: ANGELS },
        ].map((group) => (
          <div
            key={group.label}
            style={{
              padding: 32,
              minHeight: 160,
              borderRight: `1px solid ${C.hairline}`,
              borderBottom: `1px solid ${C.hairline}`,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.secondary,
                marginBottom: 16,
              }}
            >
              {group.label}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 32,
                rowGap: 10,
              }}
            >
              {group.names.map((name) => (
                <span
                  key={name}
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 20,
                    letterSpacing: "-0.01em",
                    color: C.navy,
                    opacity: 0.72,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingPartnerDeckCompany() {
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
        eyebrow="Company"
        headline={
          <>
            The AI deployment company{" "}
            <span style={{ color: C.accentSky }}>for investment firms.</span>
          </>
        }
        subtext="Built by people who spent years inside investment firms — and rebuilt the infrastructure they wished they had."
      />
      <MissionSection />
      <FoundersSection />
      <TeamPedigreeSection />
      <InvestorsSection />
      <ClosingCta
        headline={
          <>
            Interested in{" "}
            <span style={{ color: C.accentSky }}>working with us?</span>
          </>
        }
        subtext="We're hiring across engineering, product, and go-to-market."
      />
    </div>
  );
}
