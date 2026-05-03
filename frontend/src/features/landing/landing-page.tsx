import { PulseGrid } from "@/components/pulse-grid";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

const NAVY = "#0C1D34";
const NAVY_DEEP = "#07142A";
const ACCENT_SOFT = "#3B8BE0";
const TINT = "#1A3358";

const FIRM_TYPES = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Family Offices",
  "Fund of Funds",
];

const PILLARS = [
  [
    "01",
    "Ingest",
    "Pull financials, board decks, and CIMs from every portfolio company. Schedule recurring data requests with one click.",
  ],
  [
    "02",
    "Query",
    "Ask questions across the entire portfolio in natural language. Cited answers, every time.",
  ],
  [
    "03",
    "Monitor",
    "Dashboards and alerts on covenants, KPIs, and material events — before quarterly reviews.",
  ],
] as const;

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const HeroNav: React.FC = () => (
  <header
    style={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 48px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <Link to="/" style={{ textDecoration: "none" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#fff",
          fontFamily: '"Inter Tight", Inter, sans-serif',
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            width: 22,
            height: 22,
            display: "block",
            stroke: "currentColor",
          }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        Rengo
      </span>
    </Link>

    <nav
      style={{
        display: "flex",
        gap: 32,
        fontSize: 14,
        color: "rgba(255,255,255,0.7)",
        fontWeight: 500,
        fontFamily: '"Inter Tight", Inter, sans-serif',
      }}
    >
      <span style={{ cursor: "default" }}>Home</span>
      <span style={{ cursor: "default" }}>Platform</span>
      <span style={{ cursor: "default" }}>Insights</span>
      <span style={{ cursor: "default" }}>Contact</span>
    </nav>

    <button
      onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      style={{
        background: "transparent",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 999,
        padding: "0 18px",
        height: 36,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: '"Inter Tight", Inter, sans-serif',
        cursor: "pointer",
      }}
    >
      Talk to our team
    </button>
  </header>
);

const HeroSection: React.FC = () => (
  <section
    style={{
      position: "relative",
      background: NAVY,
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    {/* PulseGrid background */}
    <div style={{ position: "absolute", inset: 0 }}>
      <PulseGrid
        id="a2-hero"
        tone="navy"
        density="quiet"
        width={1280}
        height={900}
        cols={22}
        rows={26}
        showHeaderRow={false}
        tintColor={TINT}
        greenColor={ACCENT_SOFT}
        fadeBottom={false}
      />
    </div>

    {/* Left-to-right gradient wash under the type */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `linear-gradient(to right, rgba(7,20,42,0.92) 0%, rgba(12,29,52,0.78) 38%, rgba(12,29,52,0.4) 65%, rgba(12,29,52,0.15) 100%)`,
      }}
    />

    {/* Bottom fade into the page */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        background: `linear-gradient(to bottom, transparent, ${NAVY} 100%)`,
        pointerEvents: "none",
      }}
    />

    <HeroNav />

    {/* Hero copy — bottom-left anchored */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px 48px",
      }}
    >
      {/* Mono eyebrow */}
      <div
        style={{
          fontFamily: '"JetBrains Mono", SFMono-Regular, monospace',
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: ACCENT_SOFT,
          marginBottom: 24,
        }}
      >
        For private capital
      </div>

      {/* Headline */}
      <h1
        style={{
          margin: 0,
          fontFamily: '"Source Serif 4", Georgia, serif',
          fontSize: "clamp(52px, 6vw, 84px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          fontWeight: 400,
          color: "#fff",
          maxWidth: 880,
        }}
      >
        The operating system
        <br />
        for private capital.
      </h1>

      {/* Thin rule */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.35)",
          width: 72,
          margin: "28px 0 20px",
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          margin: 0,
          fontSize: 18,
          lineHeight: 1.45,
          color: "rgba(255,255,255,0.78)",
          maxWidth: 580,
          fontFamily: '"Inter Tight", Inter, sans-serif',
        }}
      >
        Rengo is the first AI-native portfolio monitoring platform for private
        markets. The system of record. The intelligence layer. The standard.
      </p>

      {/* CTAs */}
      <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
        <button
          onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
          style={{
            background: "#fff",
            color: NAVY,
            border: "1px solid #fff",
            borderRadius: 999,
            padding: "0 22px",
            height: 42,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: '"Inter Tight", Inter, sans-serif',
            cursor: "pointer",
          }}
        >
          Talk to our team
        </button>
        <button
          onClick={() => window.open("https://app.rengoai.com/", "_blank")}
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "0 22px",
            height: 42,
            fontSize: 15,
            fontFamily: '"Inter Tight", Inter, sans-serif',
            cursor: "pointer",
          }}
        >
          See the platform
        </button>
      </div>
    </div>
  </section>
);

const FirmsStrip: React.FC = () => (
  <section
    style={{
      background: "#F3F7FC",
      borderBottom: "1px solid #E2E7EE",
      padding: "32px 0",
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontFamily: '"JetBrains Mono", SFMono-Regular, monospace',
        color: "#6B7A8F",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0 48px 16px",
      }}
    >
      Built with leading firms across
    </div>
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <Box
        display="flex"
        gap={16}
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
            <span
              key={i}
              style={{
                fontSize: 28,
                color: "#0052A3",
                opacity: 0.3,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                fontFamily: '"Inter Tight", Inter, sans-serif',
              }}
            >
              {label}
            </span>
          ))}
      </Box>
    </div>
  </section>
);

const ThreePillars: React.FC = () => (
  <section
    style={{
      padding: "112px 48px",
      background: "#FCFBFA",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 40,
        fontWeight: 400,
        letterSpacing: "-0.025em",
        color: "#0C1D34",
        maxWidth: 720,
      }}
    >
      Three workflows.
      <br />
      One source of truth.
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 64,
        marginTop: 64,
      }}
    >
      {PILLARS.map(([n, title, desc]) => (
        <div
          key={n}
          style={{
            borderTop: "1px solid #0052A3",
            paddingTop: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: '"JetBrains Mono", SFMono-Regular, monospace',
              color: "#0052A3",
              letterSpacing: "0.08em",
            }}
          >
            {n}
          </span>
          <h3
            style={{
              margin: "10px 0 12px",
              fontFamily: '"Source Serif 4", Georgia, serif',
              fontSize: 24,
              fontWeight: 400,
              color: "#0C1D34",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#4F5E76",
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            {desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const LandingFooter: React.FC = () => (
  <footer
    style={{
      background: NAVY,
      color: "#fff",
      padding: "40px 48px 24px",
      fontFamily: '"Inter Tight", Inter, sans-serif',
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 32,
      }}
    >
      {/* Logo */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            width: 22,
            height: 22,
            display: "block",
            stroke: "currentColor",
          }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        Rengo
      </span>

      {/* Link columns */}
      <div style={{ display: "flex", gap: 56, fontSize: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontWeight: 600 }}>Solutions</strong>
          <span style={{ opacity: 0.7, cursor: "default" }}>
            Portfolio Monitoring
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontWeight: 600 }}>Legal</strong>
          <Link
            to="/legal/privacy-policy"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/legal/terms-of-service"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Terms of Service
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontWeight: 600 }}>Company</strong>
          <Link
            to="/careers"
            style={{ opacity: 0.7, color: "inherit", textDecoration: "none" }}
          >
            Careers
          </Link>
        </div>
      </div>
    </div>

    <div
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: '"JetBrains Mono", SFMono-Regular, monospace',
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      <span>© 2026 Rengo AI, Inc.</span>
      <div style={{ display: "flex", gap: 24 }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            window.open("https://www.linkedin.com/company/106703002", "_blank")
          }
        >
          LinkedIn
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
        >
          Contact
        </span>
      </div>
    </div>
  </footer>
);

export const LandingPage: React.FC = () => (
  <div style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
    <HeroSection />
    <FirmsStrip />
    <ThreePillars />
    <LandingFooter />
  </div>
);
