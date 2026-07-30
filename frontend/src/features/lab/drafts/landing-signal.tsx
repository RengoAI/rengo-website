import React, { useEffect, useState } from "react";

// ─── Tokens ────────────────────────────────────────────────────────────────

const DISPLAY = '"Geist", ui-sans-serif, system-ui, sans-serif';
const MONO    = '"Geist Mono", "Roboto Mono", ui-monospace, monospace';

const C = {
  bg:        "#151B2D",
  bgCard:    "#1C2338",
  bgCardMid: "#232A41",
  border:    "#2A3354",
  accent:    "#92A7EA",
  primary:   "#FBFBF6",
  muted:     "#8892AB",
  dim:       "#4E5A78",
};

// ─── Static data ────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "Firm memory", "Earnings call analysis", "Portfolio monitoring",
  "Meeting intelligence", "Document search", "3,200+ portfolio companies",
  "CRM synthesis", "Investment memos", "Board minutes", "Data management",
  "Private equity", "Context layer", "Knowledge retrieval",
];

const CAPABILITIES = [
  {
    num: "01",
    title: "Portfolio Monitoring",
    sub: "Real-time signals across every holding",
    body: "Track performance, news, and market signals across 3,200+ portfolio companies — synthesized into actionable intelligence, not raw alert volume.",
  },
  {
    num: "02",
    title: "Firm Memory",
    sub: "Every insight, permanently retrievable",
    body: "A searchable institutional memory that captures and indexes unstructured knowledge — the conversations, calls, and memos that never reach your CRM.",
  },
  {
    num: "03",
    title: "Data Management",
    sub: "Structure from unstructured sources",
    body: "Transform deal memos, board minutes, and earnings transcripts into structured, queryable data — connected to the systems your team already uses.",
  },
];

const KNOWLEDGE_SOURCES = [
  ["Board minutes",        "Discussed · not indexed"],
  ["Partner calls",        "Remembered · not recorded"],
  ["Investment memos",     "Written · then archived"],
  ["CRM notes",            "Incomplete by default"],
  ["Earnings transcripts", "Read once · then lost"],
];

// ─── Stacked card data ───────────────────────────────────────────────────────

const STACK_CARDS = [
  { y: 40,  scale: 0.84, opacity: 0.12, label: "Board minutes · Q2 2024" },
  { y: 22,  scale: 0.91, opacity: 0.30, label: "Investment memo · Series B" },
  { y: 0,   scale: 1,    opacity: 1,    label: "Earnings call · ACME Corp Q3" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingSignal() {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.createElement("style");
    el.id = "signal-design-styles";
    el.textContent = `
      @keyframes signal-ticker {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .sig-ticker {
        display: flex;
        white-space: nowrap;
        animation: signal-ticker 40s linear infinite;
      }
      .sig-cap-row {
        transition: background 160ms ease;
        cursor: default;
      }
      .sig-cap-row:hover {
        background: rgba(146, 167, 234, 0.04);
      }
      .sig-cap-arrow {
        opacity: 0;
        transform: translateX(-6px);
        transition: opacity 180ms ease, transform 180ms ease;
        color: #92A7EA;
        font-family: "Geist Mono", ui-monospace, monospace;
        font-size: 14px;
      }
      .sig-cap-row:hover .sig-cap-arrow {
        opacity: 1;
        transform: translateX(0);
      }
      .sig-cta {
        transition: background 160ms ease, color 160ms ease;
      }
      .sig-cta:hover {
        background: #92A7EA !important;
        color: #151B2D !important;
      }
      .sig-link {
        transition: color 160ms ease;
      }
      .sig-link:hover {
        color: #FBFBF6 !important;
      }
      .sig-source-row {
        transition: background 160ms ease;
      }
      .sig-source-row:hover {
        background: rgba(146, 167, 234, 0.04);
      }
      @media (prefers-reduced-motion: reduce) {
        .sig-ticker { animation: none; }
        .sig-cap-arrow { opacity: 1; transform: none; }
      }
    `;
    document.head.appendChild(el);
    return () => document.getElementById("signal-design-styles")?.remove();
  }, []);

  return (
    <div style={{
      background: C.bg,
      color: C.primary,
      fontFamily: DISPLAY,
      minHeight: "100vh",
      overflowX: "hidden",
    }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "56px", padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navSolid ? `${C.bg}F0` : "transparent",
        borderBottom: `1px solid ${navSolid ? C.border : "transparent"}`,
        backdropFilter: navSolid ? "blur(16px)" : "none",
        transition: "background 280ms ease, border-color 280ms ease, backdrop-filter 280ms ease",
      }}>
        <a href="/" style={{
          fontFamily: MONO, fontSize: "12px", letterSpacing: "0.1em",
          textTransform: "uppercase", color: C.muted, textDecoration: "none",
        }}>
          Rengo AI
        </a>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Product", "Solutions", "Team"].map((item, i) => (
            <a key={item} href="#" className="sig-link" style={{
              fontFamily: MONO, fontSize: "12px", letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: i === 1 ? C.accent : C.muted,
              textDecoration: "none",
            }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        padding: "148px 48px 100px",
        display: "grid",
        gridTemplateColumns: "1fr 500px",
        gap: "64px",
        alignItems: "center",
        maxWidth: "1440px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}>
        {/* Left — headline */}
        <div>
          <p style={{
            fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.accent,
            margin: "0 0 40px",
          }}>
            Context intelligence · Private markets
          </p>

          <h1 style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(48px, 5vw, 72px)",
            fontWeight: 200,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: C.primary,
            margin: "0 0 32px",
          }}>
            Building the<br />
            context layer<br />
            for{" "}
            <em style={{ fontStyle: "italic", color: C.accent }}>
              private equity.
            </em>
          </h1>

          <p style={{
            fontSize: "17px", fontWeight: 400, lineHeight: 1.72,
            color: C.muted, maxWidth: "460px", margin: "0 0 56px",
          }}>
            Firms have spent decades making the numbers in their databases
            reliable. But much of what a firm actually knows never reaches
            a database.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
            <a href="#" className="sig-cta" style={{
              display: "inline-block",
              padding: "13px 32px",
              border: `1px solid ${C.accent}`,
              color: C.accent,
              fontFamily: MONO, fontSize: "12px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none",
            }}>
              Request access
            </a>
            <span style={{
              fontFamily: MONO, fontSize: "11px",
              color: C.dim, letterSpacing: "0.04em",
            }}>
              Firms managing $40B+ in AUM
            </span>
          </div>
        </div>

        {/* Right — stacked context cards (signature element) */}
        <div style={{ position: "relative", height: "200px", alignSelf: "center" }}>
          {STACK_CARDS.map((card, i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${card.y}px`,
              left: 0, right: 0,
              background: C.bgCardMid,
              border: `1px solid rgba(42,51,84,${i === 2 ? 1 : 0.5})`,
              borderRadius: "4px",
              padding: "16px 24px",
              opacity: card.opacity,
              transform: `scale(${card.scale})`,
              transformOrigin: "top center",
            }}>
              <span style={{
                fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em",
                color: i === 2 ? C.accent : C.dim,
              }}>
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER STRIP ────────────────────────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        background: C.bgCard,
        padding: "13px 0",
        overflow: "hidden",
      }}>
        <div className="sig-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{
              marginRight: "64px",
              fontFamily: MONO, fontSize: "11px",
              letterSpacing: "0.07em",
              color: i % 4 === 0 ? C.muted : C.dim,
            }}>
              {i % 5 === 0 && (
                <span style={{ color: C.accent, marginRight: "12px" }}>◆</span>
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto", padding: "120px 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "80px", alignItems: "start",
          boxSizing: "border-box",
        }}>
          <div>
            <p style={{
              fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.dim, margin: "0 0 40px",
            }}>
              The problem
            </p>
            <h2 style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300, lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: C.primary, margin: "0 0 36px",
            }}>
              The numbers are<br />reliable. The<br />knowledge isn't.
            </h2>
            <p style={{
              fontSize: "16px", fontWeight: 400, lineHeight: 1.78,
              color: C.muted, margin: 0, maxWidth: "420px",
            }}>
              Private equity firms run on context — the nuance in a founder
              conversation, the insight from a board call, the pattern across
              a dozen deal memos. That knowledge lives in inboxes, transcripts,
              and memories. Not in systems.
            </p>
          </div>

          <div style={{ paddingTop: "80px" }}>
            {KNOWLEDGE_SOURCES.map(([source, status]) => (
              <div key={source} className="sig-source-row" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 8px",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: "15px", fontWeight: 400, color: C.primary }}>
                  {source}
                </span>
                <span style={{
                  fontFamily: MONO, fontSize: "10px",
                  letterSpacing: "0.05em", color: C.dim,
                }}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ROWS ───────────────────────────────────────────────── */}
      <section>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px", boxSizing: "border-box" }}>
          <div style={{ padding: "72px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{
              fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.dim, margin: 0,
            }}>
              Platform
            </p>
          </div>

          {CAPABILITIES.map((cap) => (
            <div key={cap.num} className="sig-cap-row" style={{
              borderTop: `1px solid ${C.border}`,
              padding: "40px 8px",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "72px 280px 1fr 48px",
                gap: "40px",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: "11px",
                  color: C.dim, letterSpacing: "0.07em",
                }}>
                  {cap.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: DISPLAY, fontSize: "22px", fontWeight: 300,
                    color: C.primary, margin: "0 0 6px", letterSpacing: "-0.02em",
                  }}>
                    {cap.title}
                  </h3>
                  <p style={{
                    fontFamily: MONO, fontSize: "10px",
                    color: C.accent, margin: 0, letterSpacing: "0.05em",
                  }}>
                    {cap.sub}
                  </p>
                </div>
                <p style={{
                  fontSize: "15px", lineHeight: 1.68,
                  color: C.muted, margin: 0,
                }}>
                  {cap.body}
                </p>
                <div className="sig-cap-arrow" style={{ display: "flex", justifyContent: "flex-end" }}>
                  →
                </div>
              </div>
            </div>
          ))}

          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </section>

      {/* ── METRICS ─────────────────────────────────────────────────────── */}
      <section style={{
        background: C.bgCard,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto", padding: "88px 48px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "40px", boxSizing: "border-box",
        }}>
          {[
            ["3,200+", "Portfolio companies tracked"],
            ["$40B+",  "AUM under management"],
            ["48hrs",  "Saved per analyst weekly"],
            ["94%",    "Reduction in manual search"],
          ].map(([num, label]) => (
            <div key={num}>
              <p style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 200, lineHeight: 1,
                letterSpacing: "-0.04em",
                color: C.primary, margin: "0 0 12px",
              }}>
                {num}
              </p>
              <p style={{
                fontFamily: MONO, fontSize: "10px",
                color: C.dim, margin: 0,
                letterSpacing: "0.09em", textTransform: "uppercase",
                lineHeight: 1.6,
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTEXT STRIP ───────────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto",
          padding: "100px 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "80px", alignItems: "center",
          boxSizing: "border-box",
        }}>
          <div>
            <p style={{
              fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.dim, margin: "0 0 24px",
            }}>
              Backed by
            </p>
            <p style={{
              fontFamily: DISPLAY, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 300,
              lineHeight: 1.35, letterSpacing: "-0.02em",
              color: C.primary, margin: "0 0 20px",
            }}>
              Trusted by investment teams<br />managing over $100B in AUM.
            </p>
            <p style={{
              fontSize: "15px", lineHeight: 1.7, color: C.muted, margin: 0,
            }}>
              From early-stage growth equity to large-cap buyout — Rengo is built
              for the way PE firms actually work.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {["Sequoia Capital", "Andreessen Horowitz", "Accel Partners", "Tiger Global"].map((firm) => (
              <div key={firm} style={{
                height: "64px",
                background: C.bgCardMid,
                border: `1px solid ${C.border}`,
                borderRadius: "3px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: "10px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: C.dim,
                }}>
                  {firm}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────────── */}
      <section>
        <div style={{
          maxWidth: "1440px", margin: "0 auto",
          padding: "120px 48px 80px",
          boxSizing: "border-box",
        }}>
          <p style={{
            fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.accent, margin: "0 0 32px",
          }}>
            Early access
          </p>
          <h2 style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 200, lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: C.primary, margin: "0 0 56px",
            maxWidth: "580px",
          }}>
            Join the firms already building on the context layer.
          </h2>

          <div style={{ display: "flex", maxWidth: "480px" }}>
            <input
              type="email"
              placeholder="your@firm.com"
              style={{
                flex: 1,
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRight: "none",
                padding: "14px 20px",
                fontFamily: MONO, fontSize: "13px",
                color: C.primary, outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = C.accent; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
            />
            <button className="sig-cta" style={{
              background: C.accent,
              border: `1px solid ${C.accent}`,
              color: C.bg,
              padding: "14px 24px",
              fontFamily: MONO, fontSize: "12px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Request →
            </button>
          </div>
        </div>

        <div style={{
          maxWidth: "1440px", margin: "0 auto",
          padding: "32px 48px",
          borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxSizing: "border-box",
        }}>
          <span style={{ fontFamily: MONO, fontSize: "11px", color: C.dim }}>
            © 2025 Rengo AI, Inc.
          </span>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="sig-link" style={{
                fontFamily: MONO, fontSize: "11px",
                color: C.dim, textDecoration: "none",
                letterSpacing: "0.04em",
              }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
