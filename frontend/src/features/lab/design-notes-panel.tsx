import { type LabDraft } from "@/features/lab/lab-drafts";
import React, { useState } from "react";

const MONO = '"Space Mono", SFMono-Regular, ui-monospace, monospace';
const SERIF = '"Source Serif 4", Georgia, ui-serif, serif';
const SANS = '"Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif';

interface Props {
  draft: LabDraft;
}

export const DesignNotesPanel: React.FC<Props> = ({ draft }) => {
  const [open, setOpen] = useState(false);
  const { notes, refs } = draft;

  return (
    <div
      style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 300 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* popup */}
      <div
        style={{
          position:      "absolute",
          bottom:        "calc(100% + 10px)",
          right:         0,
          width:         "320px",
          background:    "#fff",
          border:        "1px solid #E4E4EC",
          borderRadius:  "10px",
          boxShadow:     "0 8px 32px rgba(12,29,52,0.12), 0 2px 8px rgba(12,29,52,0.06)",
          padding:       "20px",
          opacity:       open ? 1 : 0,
          transform:     open ? "translateY(0)" : "translateY(6px)",
          pointerEvents: open ? "auto" : "none",
          transition:    "opacity 180ms ease, transform 180ms ease",
        }}
      >
        {/* thesis */}
        {notes?.thesis && (
          <>
            <p style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>
              Design thesis
            </p>
            <p style={{ fontFamily: SERIF, fontSize: "15px", lineHeight: 1.45, color: "#0C1D34", margin: "0 0 18px" }}>
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
            <div style={{ display: "flex", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
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
            <p style={{ fontFamily: SANS, fontSize: "12px", lineHeight: 1.5, color: "#474A67", margin: "0 0 18px" }}>
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
            <p style={{ fontFamily: SANS, fontSize: "12px", lineHeight: 1.5, color: "#474A67", margin: "0 0 18px" }}>
              {notes.layout}
            </p>
          </>
        )}

        {/* generation stats */}
        {notes?.stats && (
          <>
            <div style={{ borderTop: "1px solid #F0EFEF", margin: "16px 0" }} />
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

      {/* trigger button */}
      <button
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:           "6px",
          padding:       "8px 14px",
          borderRadius:  "20px",
          border:        "1px solid #E4E4EC",
          background:    "#fff",
          fontFamily:    MONO,
          fontSize:      "11px",
          letterSpacing: "0.06em",
          color:         "#0C1D34",
          cursor:        "default",
          boxShadow:     "0 2px 8px rgba(12,29,52,0.08)",
        }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B8BE0", display: "inline-block", flexShrink: 0 }} />
        Notes about design
      </button>
    </div>
  );
};
