import React, { useEffect, useRef } from "react";

/**
 * "Unlock collective intelligence" bento art.
 *
 * Base: static Animation3.svg (document stack + three source-logo tiles).
 * Overlay: animated dotted connector lines + travelling cube markers,
 *          exactly matching the DeploymentDiagram style.
 *
 * Connector topology (SVG coords, viewBox 0 0 344 381):
 *   card bottom (y=150, x=172)
 *       │  ← center vertical
 *   y=221 ───────────── junction
 *       │               │
 *   left branch      right branch
 *   x=71,y=246       x=273,y=246
 *       │                 │
 *   left logo tile   right logo tile
 *   (center logo = x=172, direct vertical)
 */

// ─── Scoped styles ────────────────────────────────────────────────────────────
const STYLES = `
  /* Dotted connector lines — identical spec to DeploymentDiagram */
  .cs-dot {
    fill: none;
    stroke: #A9B7C6;
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }
  .cs-link { opacity: 0.65; }

  /* Cube marker: invisible by default; CSS motion path drives it */
  .cs-cube { opacity: 0; offset-rotate: 0deg; }

  @keyframes cs-cubeRun {
    0%   { offset-distance: 0%;   opacity: 0; }
    4%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
  @keyframes cs-linkPulse {
    0%   { opacity: 0.65; }
    40%  { opacity: 1; }
    100% { opacity: 0.65; }
  }

  @media (prefers-reduced-motion: no-preference) {
    .cs-run .cs-cube {
      animation-name: cs-cubeRun;
      animation-timing-function: linear;
      animation-fill-mode: both;
      will-change: offset-distance, opacity;
    }
    /* Center: straight down 95 px — shorter path, shorter duration */
    .cs-run .cs-c1 {
      animation-duration: 2.2s;
      animation-delay: 0.3s;
      offset-path: path("M172,151 L172,246");
    }
    /* Left branch: down 70 px + left 101 px + down 25 px = ~196 px */
    .cs-run .cs-c2 {
      animation-duration: 3.4s;
      animation-delay: 0.6s;
      offset-path: path("M172,151 L172,221 L71,221 L71,246");
    }
    /* Right branch: mirror of left */
    .cs-run .cs-c3 {
      animation-duration: 3.4s;
      animation-delay: 1.0s;
      offset-path: path("M172,151 L172,221 L273,221 L273,246");
    }
    /* Connectors pulse after everything settles */
    .cs-run .cs-link { animation: cs-linkPulse 1.6s ease-in-out 5s both; }
    .cs-run .cs-l1   { animation-delay: 5.0s; }
    .cs-run .cs-l2   { animation-delay: 5.2s; }
    .cs-run .cs-l3   { animation-delay: 5.4s; }
    .cs-run .cs-l4   { animation-delay: 5.6s; }
    .cs-run .cs-l5   { animation-delay: 5.8s; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
type CollectiveSearchArtProps = {
  variant?: "tile" | "compact";
};

export const CollectiveSearchArt: React.FC<CollectiveSearchArtProps> = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    function play() {
      if (!el) return;
      el.classList.remove("cs-run");
      void el.offsetWidth; // force reflow to reset animations
      el.classList.add("cs-run");
    }
    play();
    const id = setInterval(play, 10000);
    return () => clearInterval(id);
  }, []);

  // Both the <img> and overlay <svg> get the same transform so they stay
  // in perfect registration regardless of container size.
  const sharedTransform: React.CSSProperties = {
    transform: "scale(1.1)",
    transformOrigin: "center",
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <style>{STYLES}</style>

      {/* ── Base static SVG ──────────────────────────────────────────────── */}
      <img
        src="/animations/animation3.svg"
        alt=""
        aria-hidden
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          ...sharedTransform,
        }}
      />

      {/* ── Animated overlay (same viewBox → same coordinate space) ─────── */}
      <svg
        viewBox="0 0 344 381"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          ...sharedTransform,
        }}
      >
        {/*
          Mask the original tiny-rect connector dots (drawn in Animation3.svg
          with filled micro-rectangles rather than stroke-dasharray).
          Fill matches the bento tile background: #F0F1F2.
        */}
        {/* Center vertical (x≈171-173, y 151→246) */}
        <rect x="170" y="151" width="5" height="96" fill="#F0F1F2" />
        {/* Left vertical segment (x≈70-72, y 220→247) */}
        <rect x="69"  y="220" width="4" height="27" fill="#F0F1F2" />
        {/* Left horizontal segment (y≈219-223, x 68→174) */}
        <rect x="68"  y="219" width="107" height="4" fill="#F0F1F2" />
        {/* Right vertical segment (x≈271-275, y 220→247) */}
        <rect x="271" y="220" width="4"  height="27" fill="#F0F1F2" />
        {/* Right horizontal segment (y≈219-223, x 170→276) */}
        <rect x="170" y="219" width="107" height="4" fill="#F0F1F2" />

        {/*
          New dotted connector lines.
          stroke-dasharray: 3 3 — identical to .dp-dot in DeploymentDiagram.
        */}
        {/* Center vertical: card bottom → center logo tile */}
        <line className="cs-dot cs-link cs-l1" x1="172" y1="151" x2="172" y2="246" />
        {/* Left vertical: junction → left logo tile */}
        <line className="cs-dot cs-link cs-l2" x1="71"  y1="221" x2="71"  y2="246" />
        {/* Left horizontal: left junction → center junction */}
        <line className="cs-dot cs-link cs-l3" x1="71"  y1="221" x2="172" y2="221" />
        {/* Right horizontal: center junction → right junction */}
        <line className="cs-dot cs-link cs-l4" x1="172" y1="221" x2="273" y2="221" />
        {/* Right vertical: junction → right logo tile */}
        <line className="cs-dot cs-link cs-l5" x1="273" y1="221" x2="273" y2="246" />

        {/* Tiny #597299 cube markers — one per connector path */}
        <g className="cs-cube cs-c1"><rect fill="#597299" x="-2.5" y="-2.5" width="5" height="5" /></g>
        <g className="cs-cube cs-c2"><rect fill="#597299" x="-2.5" y="-2.5" width="5" height="5" /></g>
        <g className="cs-cube cs-c3"><rect fill="#597299" x="-2.5" y="-2.5" width="5" height="5" /></g>
      </svg>
    </div>
  );
};
