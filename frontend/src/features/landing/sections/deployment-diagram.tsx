import React, { useEffect, useRef } from "react";

/**
 * "Connect with your systems" — isometric 3×3 cluster with four satellite
 * cubes connected by organic zigzag dotted lines.
 *
 * Animation sequence:
 *  0.2 – 0.85 s   satellite cubes fade in once (staggered) and stay dark blue
 *  0.85 – 6.55 s  small blue cube travels from each satellite to the cluster
 *  7.0 – 9.15 s   dotted lines pulse
 *
 * Total sequence ≈ 9 s; wire/pulse replays every 12 s. Cubes stay put.
 */

// ─── scoped styles ────────────────────────────────────────────────────────────
const STYLES = `
  .dp-iso polygon, .dp-iso line, .dp-iso polyline {
    vector-effect: non-scaling-stroke;
  }
  /* cluster and dark-cube faces */
  .dp-stack { fill: #D3DDE1; stroke: #A9B7C6; stroke-width: 1; }
  .dp-flat  { fill: #5A759A; stroke: #A9B7C6; stroke-width: 1; }
  /* dotted path guides — matches AgentsActArt line style */
  .dp-dot   {
    fill: none;
    stroke: #A9B7C6;
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }
  /* satellite cube faces — stay dark blue */
  .dp-sat   { fill: #5A759A; stroke: #A9B7C6; stroke-width: 1; }
  /* travelling cube: invisible by default; CSS motion path drives it */
  .dp-cube { opacity: 0; offset-rotate: 0deg; }

  .dp-link  { opacity: .65; }
  .dp-node  { opacity: 1; }

  @keyframes dp-nodeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dp-cubeRun {
    0%   { offset-distance: 0%;   opacity: 0; }
    3%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
  @keyframes dp-linkPulse {
    0%   { opacity: .65; }
    35%  { opacity: 1; }
    100% { opacity: .65; }
  }

  @media (prefers-reduced-motion: no-preference) {
    /* satellites fade in once, then stay — not tied to the looping .dp-run */
    .dp-iso .dp-node { opacity: 0; }
    .dp-ready .dp-node {
      opacity: 1;
      animation: dp-nodeIn .6s ease-out both;
    }
    .dp-ready .dp-n1   { animation-delay: .2s;  }
    .dp-ready .dp-n2   { animation-delay: .45s; }
    .dp-ready .dp-n3   { animation-delay: .6s;  }
    .dp-ready .dp-n4   { animation-delay: .85s; }

    /* tiny #597299 cube travels from satellite → cluster (5 s each) */
    .dp-run .dp-cube {
      animation-name: dp-cubeRun;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-fill-mode: both;
      will-change: offset-distance, opacity;
    }
    .dp-run .dp-c1 {
      animation-delay: .85s;
      offset-path: path("M129,127 L184,158 L212,142 L242,159 L221,171 L250,187");
    }
    .dp-run .dp-c2 {
      animation-delay: 1.15s;
      offset-path: path("M551,137 L513,158 L468,133 L445,146 L415,163");
    }
    .dp-run .dp-c3 {
      animation-delay: 1.3s;
      offset-path: path("M119,235 L169,207 L238,246 L265,230 L295,247");
    }
    .dp-run .dp-c4 {
      animation-delay: 1.55s;
      offset-path: path("M561,230 L499,265 L456,241 L415,264 L385,247");
    }

    /* dotted guides pulse after everything settles */
    .dp-run .dp-link { animation: dp-linkPulse 1.6s ease-in-out both; }
    .dp-run .dp-l1   { animation-delay: 7.0s;  }
    .dp-run .dp-l2   { animation-delay: 7.2s;  }
    .dp-run .dp-l3   { animation-delay: 7.35s; }
    .dp-run .dp-l4   { animation-delay: 7.55s; }
  }
`;

// shared zigzag waypoints — used for the dotted guide lines
const WIRE_POINTS = {
  w1: "129,127 184,158 212,142 242,159 221,171 250,187",
  w2: "551,137 513,158 468,133 445,146 415,163",
  w3: "119,235 169,207 238,246 265,230 295,247",
  w4: "561,230 499,265 456,241 415,264 385,247",
};

// ─── component ────────────────────────────────────────────────────────────────
interface DeploymentDiagramProps {
  /** "band" fills the wide section; "tile" is the compact bento variant. */
  size?: "band" | "tile";
}

export const DeploymentDiagram: React.FC<DeploymentDiagramProps> = ({
  size = "band",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const play = () => {
      if (!el) return;
      el.classList.remove("dp-run");
      el.getBoundingClientRect(); // force reflow so CSS resets
      el.classList.add("dp-run");
      el.classList.add("dp-ready"); // cubes fade in once and stay
    };

    play();
    const id = setInterval(play, 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: size === "tile" ? "180px" : "100%",
        maxHeight: size === "tile" ? "180px" : undefined,
      }}
    >
      <style>{STYLES}</style>

      <svg
        className="dp-iso"
        viewBox="100 60 500 210"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Four small cubes connected by dotted zigzag lines to a cluster of isometric prisms."
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {/* ── Static dotted guide lines (always visible, low opacity) ──────── */}
        <polyline className="dp-dot dp-link dp-l1" points={WIRE_POINTS.w1} />
        <polyline className="dp-dot dp-link dp-l2" points={WIRE_POINTS.w2} />
        <polyline className="dp-dot dp-link dp-l3" points={WIRE_POINTS.w3} />
        <polyline className="dp-dot dp-link dp-l4" points={WIRE_POINTS.w4} />

        {/* ── Satellite cubes — fade in and stay dark blue ─────────────────── */}
        <g className="dp-node dp-n1">
          <polygon
            className="dp-sat"
            points="102,100 120,110 120,132 102,122"
          />
          <polygon
            className="dp-sat"
            points="120,110 138,100 138,122 120,132"
          />
          <polygon
            className="dp-sat"
            points="120,90  138,100 120,110 102,100"
          />
        </g>
        <g className="dp-node dp-n2">
          <polygon
            className="dp-sat"
            points="542,110 560,120 560,142 542,132"
          />
          <polygon
            className="dp-sat"
            points="560,120 578,110 578,132 560,142"
          />
          <polygon
            className="dp-sat"
            points="560,100 578,110 560,120 542,110"
          />
        </g>
        <g className="dp-node dp-n3">
          <polygon
            className="dp-sat"
            points="92,240  110,250 110,272  92,262"
          />
          <polygon
            className="dp-sat"
            points="110,250 128,240 128,262 110,272"
          />
          <polygon
            className="dp-sat"
            points="110,230 128,240 110,250  92,240"
          />
        </g>
        <g className="dp-node dp-n4">
          <polygon
            className="dp-sat"
            points="552,235 570,245 570,267 552,257"
          />
          <polygon
            className="dp-sat"
            points="570,245 588,235 588,257 570,267"
          />
          <polygon
            className="dp-sat"
            points="570,225 588,235 570,245 552,235"
          />
        </g>

        {/* ── Travelling squares: flat #597299 cube along each zigzag path ─ */}
        <g className="dp-cube dp-c1">
          <rect fill="#597299" x="-3" y="-3" width="6" height="6" />
        </g>
        <g className="dp-cube dp-c2">
          <rect fill="#597299" x="-3" y="-3" width="6" height="6" />
        </g>
        <g className="dp-cube dp-c3">
          <rect fill="#597299" x="-3" y="-3" width="6" height="6" />
        </g>
        <g className="dp-cube dp-c4">
          <rect fill="#597299" x="-3" y="-3" width="6" height="6" />
        </g>

        {/* ── Static cluster: 9 filled prisms ─────────────────────────────── */}
        <g>
          <polygon
            className="dp-stack"
            points="310,153 340,170 340,204 310,187"
          />
          <polygon
            className="dp-stack"
            points="340,170 370,153 370,187 340,204"
          />
          <polygon
            className="dp-stack"
            points="340,136 370,153 340,170 310,153"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="340,136 370,153 370,221 340,204"
          />
          <polygon
            className="dp-stack"
            points="370,153 400,136 400,204 370,221"
          />
          <polygon
            className="dp-stack"
            points="370,119 400,136 370,153 340,136"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="280,148 310,165 310,221 280,204"
          />
          <polygon
            className="dp-stack"
            points="310,165 340,148 340,204 310,221"
          />
          <polygon
            className="dp-stack"
            points="310,131 340,148 310,165 280,148"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="370,171 400,188 400,238 370,221"
          />
          <polygon
            className="dp-stack"
            points="400,188 430,171 430,221 400,238"
          />
          <polygon
            className="dp-stack"
            points="400,154 430,171 400,188 370,171"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="310,131 340,148 340,238 310,221"
          />
          <polygon
            className="dp-stack"
            points="340,148 370,131 370,221 340,238"
          />
          <polygon
            className="dp-stack"
            points="340,114 370,131 340,148 310,131"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="250,153 280,170 280,238 250,221"
          />
          <polygon
            className="dp-stack"
            points="280,170 310,153 310,221 280,238"
          />
          <polygon
            className="dp-stack"
            points="280,136 310,153 280,170 250,153"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="340,204 370,221 370,255 340,238"
          />
          <polygon
            className="dp-stack"
            points="370,221 400,204 400,238 370,255"
          />
          <polygon
            className="dp-stack"
            points="370,187 400,204 370,221 340,204"
          />
        </g>
        <g>
          <polygon
            className="dp-stack"
            points="280,196 310,213 310,255 280,238"
          />
          <polygon
            className="dp-stack"
            points="310,213 340,196 340,238 310,255"
          />
          <polygon
            className="dp-stack"
            points="310,179 340,196 310,213 280,196"
          />
        </g>

        {/* ── 9th cluster prism — bottom-centre slot ───────────────────────── */}
        <g>
          <polygon
            className="dp-stack"
            points="310,195 340,212 340,272 310,255"
          />
          <polygon
            className="dp-stack"
            points="340,212 370,195 370,255 340,272"
          />
          <polygon
            className="dp-stack"
            points="340,178 370,195 340,212 310,195"
          />
        </g>
      </svg>
    </div>
  );
};
