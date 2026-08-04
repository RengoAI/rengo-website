import { type LabDraft } from "@/features/lab/lab-drafts";
import { ArrowLeft, FlaskConical, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const MONO = '"Space Mono", SFMono-Regular, ui-monospace, monospace';
const SERIF = '"Source Serif 4", Georgia, ui-serif, serif';
const SANS = '"Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif';

interface Props {
  draft: LabDraft;
}

export const DesignNotesPanel: React.FC<Props> = ({ draft }) => {
  const [open, setOpen] = useState(false);
  const { notes, refs } = draft;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 300 }}
    >
      {/* popup */}
      <div
        style={{
          position:      "absolute",
          bottom:        "calc(100% + 10px)",
          right:         0,
          width:         "320px",
          // Cap at viewport height minus space for the trigger + margins so the
          // panel never runs off-screen. Body scrolls if content is taller.
          maxHeight:     "calc(100vh - 96px)",
          overflowY:     "auto",
          overscrollBehavior: "contain",
          background:    "#fff",
          border:        "1px solid #E4E4EC",
          borderRadius:  "10px",
          boxShadow:     "0 8px 32px rgba(12,29,52,0.12), 0 2px 8px rgba(12,29,52,0.06)",
          padding:       "18px",
          opacity:       open ? 1 : 0,
          transform:     open ? "translateY(0)" : "translateY(6px)",
          pointerEvents: open ? "auto" : "none",
          transition:    "opacity 180ms ease, transform 180ms ease",
        }}
      >
        {/* header row with close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#888",
            }}
          >
            {draft.title}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close notes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 6,
              border: "1px solid transparent",
              background: "transparent",
              color: "#888",
              cursor: "pointer",
              padding: 0,
              transition: "background 140ms ease, color 140ms ease, border-color 140ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F7F7F7";
              e.currentTarget.style.borderColor = "#E4E4EC";
              e.currentTarget.style.color = "#0C1D34";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.color = "#888";
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* lab context — always the first thing you read */}
        <Link
          to="/lab"
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             8,
            padding:         "6px 10px",
            marginBottom:    14,
            borderRadius:    999,
            background:      "rgba(245,158,11,0.08)",
            border:          "1px solid rgba(245,158,11,0.24)",
            textDecoration:  "none",
            transition:      "background 160ms ease, border-color 160ms ease",
          }}
        >
          <FlaskConical size={12} color="#B45309" />
          <span
            style={{
              fontFamily:     MONO,
              fontSize:       10,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              color:          "#78350F",
            }}
          >
            Design Lab
          </span>
          <span
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            4,
              marginLeft:     4,
              paddingLeft:    8,
              borderLeft:     "1px solid rgba(245,158,11,0.28)",
              fontFamily:     SANS,
              fontSize:       11,
              color:          "#78350F",
              fontWeight:     500,
            }}
          >
            <ArrowLeft size={11} />
            Back to workspace
          </span>
        </Link>

        {/* thesis */}
        {notes?.thesis && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>
              Design thesis
            </p>
            <p style={{ fontFamily: SERIF, fontSize: "15px", lineHeight: 1.45, color: "#0C1D34", margin: "0 0 14px" }}>
              "{notes.thesis}"
            </p>
          </>
        )}

        {/* palette */}
        {notes?.palette && notes.palette.length > 0 && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>
              Palette
            </p>
            <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
              {notes.palette.map(s => (
                <div key={s.hex} title={`${s.name} ${s.hex}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: s.hex, border: s.hex === "#FFFFFF" || s.hex === "#F5F4F0" || s.hex === "#F0EDE8" ? "1px solid #E4E4EC" : "none" }} />
                  <span style={{ fontFamily: MONO, fontSize: "8px", color: "#888", letterSpacing: "0.04em" }}>{s.hex.slice(1)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* type */}
        {notes?.type && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 6px" }}>
              Type
            </p>
            <p style={{ fontFamily: SANS, fontSize: "12px", lineHeight: 1.5, color: "#474A67", margin: "0 0 14px" }}>
              {notes.type}
            </p>
          </>
        )}

        {/* layout */}
        {notes?.layout && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 6px" }}>
              Layout
            </p>
            <p style={{ fontFamily: SANS, fontSize: "12px", lineHeight: 1.5, color: "#474A67", margin: "0 0 14px" }}>
              {notes.layout}
            </p>
          </>
        )}

        {/* generation stats */}
        {notes?.stats && (
          <>
            <div style={{ borderTop: "1px solid #F0EFEF", margin: "10px 0 12px" }} />
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#888", margin: "0 0 3px" }}>
                  Generated in
                </p>
                <p style={{ fontFamily: MONO, fontSize: "12px", color: "#0C1D34", margin: 0 }}>
                  {notes.stats.time}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#888", margin: "0 0 3px" }}>
                  Output tokens
                </p>
                <p style={{ fontFamily: MONO, fontSize: "12px", color: "#0C1D34", margin: 0 }}>
                  {notes.stats.tokens}
                </p>
              </div>
            </div>
            <p style={{ fontFamily: MONO, fontSize: "8px", letterSpacing: "0.08em", color: "#bbb", margin: "6px 0 14px" }}>
              approx. · excludes context & input
            </p>
          </>
        )}

        {/* references */}
        {refs && refs.length > 0 && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>
              References
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {refs.map(r => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "inline-flex",
                    alignItems:     "center",
                    gap:            "3px",
                    padding:        "3px 8px",
                    borderRadius:   "4px",
                    border:         "1px solid #E4E4EC",
                    fontFamily:     MONO,
                    fontSize:       "10px",
                    color:          "#0C1D34",
                    textDecoration: "none",
                  }}
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* trigger — includes a persistent "Design Lab" marker so the presence
          of the lab is always visible. Click to toggle the notes panel. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close design notes" : "Open design notes"}
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:           10,
          padding:       "8px 14px 8px 10px",
          borderRadius:  20,
          border:        `1px solid ${open ? "#CDD1DA" : "#E4E4EC"}`,
          background:    "#fff",
          fontFamily:    MONO,
          fontSize:      11,
          letterSpacing: "0.06em",
          color:         "#0C1D34",
          cursor:        "pointer",
          boxShadow:     open
            ? "0 4px 14px rgba(12,29,52,0.14)"
            : "0 2px 8px rgba(12,29,52,0.08)",
          transition:    "box-shadow 160ms ease, border-color 160ms ease",
        }}
      >
        <span
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            5,
            paddingRight:   9,
            borderRight:    "1px solid #E4E4EC",
          }}
        >
          <span
            style={{
              width:      6,
              height:     6,
              borderRadius: "50%",
              background: "#F59E0B",
              boxShadow:  "0 0 0 2px rgba(245,158,11,0.18)",
              display:    "inline-block",
              flexShrink: 0,
            }}
          />
          <FlaskConical size={11} color="#B45309" strokeWidth={1.9} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#78350F" }}>
            Lab
          </span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B8BE0", display: "inline-block", flexShrink: 0 }} />
          Notes about design
        </span>
      </button>
    </div>
  );
};
