// Shared design system for the "Partner Deck" family of lab drafts.
// Colocated here so sibling pages (product / security / company) can import
// the same tokens, TopNav, and bloom without duplicating 300+ lines each.
//
// Nothing in this file is exported to production — it only ships to /lab.

import { Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Tokens ────────────────────────────────────────────────────────────────

export const DISPLAY = '"Source Serif 4", "Source Serif Pro", Georgia, serif';
export const BODY    = '"Inter Tight", Inter, system-ui, sans-serif';
export const MONO    = '"Chivo Mono", ui-monospace, SFMono-Regular, monospace';

export const C = {
  ink:       "#0A1728",
  inkDeep:   "#060F1A",
  navy:      "#0C1D34",
  navyMid:   "#163F6E",
  accent:    "#4FA3E3",
  accentSky: "#9BDBFB",
  paper:     "#FFFFFF",
  offWhite:  "#F5F4F0",
  hairline:  "#E4E4EC",
  strong:    "#0F1729",
  body:      "#425366",
  secondary: "#8999AC",
} as const;

// ─── Cover bloom — deck cover raster, reproduced as layered CSS ────────────
// Source: /Users/erikronning/Development/rengo/sales/project/scripts/backgrounds/cover-bloom.html

export const BLOOM_LAYERS = [
  "radial-gradient(124% 104% at 104% 132%, rgba(152,212,249,0) 24%, rgba(152,212,249,0.05) 36%, rgba(152,212,249,0.11) 46%, rgba(152,212,249,0.15) 54%, rgba(152,212,249,0.13) 62%, rgba(152,212,249,0.08) 72%, rgba(152,212,249,0.03) 82%, rgba(152,212,249,0) 92%)",
  "radial-gradient(56% 48% at 100% 118%, rgba(155,219,251,0.30) 0%, rgba(155,219,251,0.21) 26%, rgba(155,219,251,0.13) 46%, rgba(155,219,251,0.06) 66%, rgba(155,219,251,0.02) 84%, rgba(155,219,251,0) 100%)",
  "radial-gradient(58% 50% at 96% 96%, rgba(0,120,212,0.30) 0%, rgba(0,116,206,0.24) 20%, rgba(0,105,190,0.17) 38%, rgba(0,92,175,0.11) 54%, rgba(0,82,163,0.06) 70%, rgba(0,82,163,0.02) 86%, rgba(0,82,163,0) 100%)",
  "radial-gradient(56% 46% at 22% 8%, rgba(0,120,212,0.20) 0%, rgba(0,120,212,0.13) 30%, rgba(0,110,198,0.06) 56%, rgba(0,100,184,0.02) 78%, rgba(0,100,184,0) 100%)",
].join(", ");
export const BLOOM_MASKED_FILL =
  "linear-gradient(90deg, #4FA3E3 0%, #0078D4 38%, #0052A3 72%, #063A72 100%)";
export const BLOOM_MASKED_MASK =
  "radial-gradient(86% 72% at 104% 132%, #000 0 24%, rgba(0,0,0,0.97) 34%, rgba(0,0,0,0.90) 42%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.62) 58%, rgba(0,0,0,0.44) 66%, rgba(0,0,0,0.28) 74%, rgba(0,0,0,0.15) 82%, rgba(0,0,0,0.06) 90%, rgba(0,0,0,0) 100%)";

// ─── Route map — sibling drafts under /lab ─────────────────────────────────

export const ROUTES = {
  home:     "/lab/landing-partner-deck",
  product:  "/lab/landing-partner-deck-product",
  security: "/lab/landing-partner-deck-security",
  company:  "/lab/landing-partner-deck-company",
} as const;

export const NAV_ITEMS: { label: string; to: string }[] = [
  { label: "Product",  to: ROUTES.product },
  { label: "Security", to: ROUTES.security },
  { label: "Company",  to: ROUTES.company },
];

// ─── Font + keyframes injection ────────────────────────────────────────────
//
// Called once per draft mount. Idempotent — no leak between drafts even if
// two share the shell.

export function useDeckAssets(): void {
  useEffect(() => {
    const linkId = "partner-deck-font";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
    const styleId = "partner-deck-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent =
        "@keyframes partner-deck-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }";
      document.head.appendChild(style);
    }
  }, []);
}

// ─── Reusable atoms ─────────────────────────────────────────────────────────

export const Container: React.FC<
  React.PropsWithChildren<{ style?: React.CSSProperties }>
> = ({ children, style }) => (
  <div
    style={{
      width: "100%",
      maxWidth: 1440,
      margin: "0 auto",
      padding: "0 clamp(20px, 5vw, 80px)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<
  React.PropsWithChildren<{ color?: string }>
> = ({ children, color = C.accent }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

// ─── Nav ────────────────────────────────────────────────────────────────────

const NavLink: React.FC<{
  label: string;
  to: string;
  active: boolean;
  overHero: boolean;
}> = ({ label, to, active, overHero }) => {
  const [hover, setHover] = useState(false);
  const activeOrHover = hover || active;
  const restColor = overHero ? "rgba(255,255,255,0.78)" : C.body;
  const hoverColor = overHero ? "#fff" : C.strong;
  const underline = overHero ? "#fff" : C.navy;
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        fontFamily: BODY,
        fontSize: 14,
        color: activeOrHover ? hoverColor : restColor,
        textDecoration: "none",
        padding: "6px 2px",
        transition: "color 180ms ease",
      }}
    >
      {label}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 2,
          right: 2,
          bottom: 0,
          height: 1,
          background: underline,
          opacity: activeOrHover ? 1 : 0,
          transform: activeOrHover ? "scaleX(1)" : "scaleX(0.4)",
          transformOrigin: "left center",
          transition: "opacity 180ms ease, transform 220ms ease",
        }}
      />
    </Link>
  );
};

export const TopNav: React.FC<{ overHero: boolean }> = ({ overHero }) => {
  const { pathname } = useLocation();
  const [demoHover, setDemoHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);

  const demoBg = overHero
    ? demoHover ? "rgba(255,255,255,0.9)" : "#fff"
    : demoHover ? C.strong : C.navy;
  const demoText = overHero ? C.navy : "#fff";
  const loginColor = overHero
    ? loginHover ? "#fff" : "rgba(255,255,255,0.78)"
    : loginHover ? C.strong : C.body;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: overHero ? "transparent" : "rgba(255,255,255,0.85)",
        backdropFilter: overHero ? "none" : "saturate(180%) blur(10px)",
        WebkitBackdropFilter: overHero ? "none" : "saturate(180%) blur(10px)",
        borderBottom: overHero
          ? "1px solid transparent"
          : `1px solid ${C.hairline}`,
        transition:
          "background 260ms ease, border-color 260ms ease, backdrop-filter 260ms ease",
      }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            height: 64,
            gap: 32,
          }}
        >
          {/* Left — logo lockup */}
          <Link
            to={ROUTES.home}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: overHero ? "#fff" : C.strong,
              textDecoration: "none",
              justifySelf: "start",
            }}
          >
            <Sun size={18} strokeWidth={1.75} color={overHero ? "#fff" : C.navy} />
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: 20,
                letterSpacing: "-0.015em",
              }}
            >
              rengo ai
            </span>
          </Link>

          {/* Center — primary nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifySelf: "center",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.to} style={{ padding: "0 10px" }}>
                <NavLink
                  label={item.label}
                  to={item.to}
                  active={pathname === item.to}
                  overHero={overHero}
                />
              </div>
            ))}
          </nav>

          {/* Right — auth + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              justifySelf: "end",
            }}
          >
            <a
              href="https://app.rengoai.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLoginHover(true)}
              onMouseLeave={() => setLoginHover(false)}
              style={{
                fontFamily: BODY,
                fontSize: 14,
                color: loginColor,
                textDecoration: "none",
                transition: "color 180ms ease",
              }}
            >
              Log in
            </a>
            <a
              href="mailto:sales@rengoai.com"
              onMouseEnter={() => setDemoHover(true)}
              onMouseLeave={() => setDemoHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: BODY,
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 14px",
                borderRadius: 6,
                background: demoBg,
                color: demoText,
                textDecoration: "none",
                transition: "background 180ms ease, color 180ms ease",
              }}
            >
              Get started
              <span
                aria-hidden
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  transform: demoHover ? "translateX(2px)" : "translateX(0)",
                  transition: "transform 180ms ease",
                }}
              >
                →
              </span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
};

// ─── Bloom hero — shared shell for subpage heroes ──────────────────────────

interface SubpageHeroProps {
  eyebrow: string;
  headline: React.ReactNode;
  subtext?: string;
}

/**
 * Compact bloom hero used by the sibling subpages (product/security/company).
 * Shorter than the landing hero (~70vh, not 100vh) so the page below is visible
 * without a scroll. Left-aligned, same bloom system, no CTA — subpages are for
 * depth, not conversion.
 */
export const SubpageHero: React.FC<SubpageHeroProps> = ({
  eyebrow,
  headline,
  subtext,
}) => (
  <section
    style={{
      position: "relative",
      minHeight: "72vh",
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
    <div
      style={{
        position: "relative",
        zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: 140,
        paddingBottom: 72,
      }}
    >
      <Container>
        <div style={{ maxWidth: 820 }}>
          <div
            style={{
              width: 52,
              height: 2,
              marginBottom: 24,
              background: "linear-gradient(90deg, #4FA3E3, rgba(79,163,227,0))",
            }}
          />
          <Eyebrow color="rgba(255,255,255,0.55)">{eyebrow}</Eyebrow>
          <h1
            style={{
              margin: "22px 0 0",
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(44px, 5.5vw, 76px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.03,
              color: "#fff",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            {headline}
          </h1>
          {subtext && (
            <p
              style={{
                margin: "24px 0 0",
                maxWidth: 620,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {subtext}
            </p>
          )}
        </div>
      </Container>
    </div>
  </section>
);

// ─── Closing CTA — shared across subpages ──────────────────────────────────

export const ClosingCta: React.FC<{
  headline?: React.ReactNode;
  subtext?: string;
}> = ({
  headline = (
    <>
      Rengo is the AI deployment company{" "}
      <span style={{ color: C.accentSky }}>for investment firms.</span>
    </>
  ),
  subtext = "Put your firm's knowledge to work. Let's talk about deploying AI on your infrastructure.",
}) => (
  <section
    style={{
      position: "relative",
      background: C.ink,
      color: "#fff",
      padding: "clamp(100px, 14vw, 180px) 0",
      overflow: "hidden",
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
        opacity: 0.6,
      }}
    />
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: BLOOM_LAYERS,
        opacity: 0.7,
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <Container>
        <h2
          style={{
            margin: "0 0 24px",
            maxWidth: 960,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(44px, 6vw, 84px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            color: "#fff",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            margin: "0 0 40px",
            maxWidth: 560,
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {subtext}
        </p>
        <a
          href="mailto:sales@rengoai.com"
          style={{
            display: "inline-block",
            padding: "14px 26px",
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
      </Container>
    </div>
  </section>
);
