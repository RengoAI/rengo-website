import React from "react";

/**
 * Deployment topology diagram.
 *
 * Recreates the structure of Baseten's "dedicated-deployment" figure — three
 * stacked environment nodes on a spine, floating metric chips, connector runs,
 * and an isometric model cube — in the Rengo palette. Geometry follows the
 * source composition (1000×1000, nodes at ~41%/53%/63% height, chips fanned to
 * the right of the spine); colours are remapped from Baseten's greens onto
 * accent.link / indigo / slate.
 */

const INK = "#213044"; // indigo.900
const INK_SOFT = "#124476"; // indigo.700
const ACCENT = "#0071e3"; // accent.link
const RULE = "#d3dde1"; // slate.30
const RULE_SOFT = "#a9b7c6"; // slate.40
const SURFACE = "#eaedee"; // slate.20
const SURFACE_LIGHT = "#f5f5f6"; // slate.10

/** Environment nodes, top to bottom, matching the source's stacked spine. */
const NODES = [
  { id: "production", label: "PRODUCTION", y: 96, active: true },
  { id: "staging", label: "STAGING", y: 186, active: false },
  { id: "deployments", label: "DEPLOYMENTS", y: 276, active: false },
] as const;

/** Metric chips, fanned right of the spine as in the source. */
const CHIPS = [
  { text: "400/1200 replicas", x: 470, y: 74 },
  { text: "75% GPU utilization", x: 470, y: 116 },
  { text: "93 TPS", x: 470, y: 164 },
  { text: "5010 requests/M", x: 470, y: 206 },
] as const;

const NODE_X = 176;
const NODE_W = 250;
const NODE_H = 52;

export const DeploymentDiagram: React.FC = () => (
  <svg
    viewBox="0 0 760 360"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Deployment topology: production, staging, and deployment environments running on Rengo-managed infrastructure."
    style={{ display: "block", width: "100%", height: "100%" }}
  >
    <defs>
      {/* Dashed field, echoing the marketing grid vocabulary. */}
      <pattern
        id="rengo-deploy-grid"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M24 0 L0 0 0 24"
          fill="none"
          stroke={RULE}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.7"
        />
      </pattern>
      <linearGradient id="rengo-deploy-fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.18" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="0.82" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <mask id="rengo-deploy-mask">
        <rect width="760" height="360" fill="url(#rengo-deploy-fade)" />
      </mask>
    </defs>

    <g mask="url(#rengo-deploy-mask)">
      <rect width="760" height="360" fill="url(#rengo-deploy-grid)" />
    </g>

    {/* ── Source rail: where firm data enters ───────────────────── */}
    <g>
      <text
        x="40"
        y="150"
        fill={RULE_SOFT}
        fontSize="9"
        letterSpacing="1"
        fontFamily="var(--rengo-fonts-mono)"
      >
        YOUR SYSTEMS
      </text>
      {[168, 186, 204].map((y, i) => (
        <rect
          key={y}
          x="40"
          y={y}
          width={i === 1 ? 86 : 64}
          height="8"
          rx="1"
          fill={i === 1 ? INK_SOFT : SURFACE}
          stroke={RULE}
          strokeWidth="0.75"
        />
      ))}
      {/* Feed into the spine */}
      <path
        d={`M136 190 H${NODE_X - 26}`}
        stroke={RULE_SOFT}
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />
      <circle cx={NODE_X - 26} cy="190" r="3" fill={ACCENT} />
    </g>

    {/* ── Spine connecting the environment nodes ────────────────── */}
    <path
      d={`M${NODE_X - 26} 190 V${NODES[0].y + NODE_H / 2} H${NODE_X}`}
      stroke={RULE_SOFT}
      strokeWidth="1"
      fill="none"
    />
    <path
      d={`M${NODE_X - 26} 190 V${NODES[2].y + NODE_H / 2} H${NODE_X}`}
      stroke={RULE_SOFT}
      strokeWidth="1"
      fill="none"
    />
    <path
      d={`M${NODE_X - 26} ${NODES[1].y + NODE_H / 2} H${NODE_X}`}
      stroke={RULE_SOFT}
      strokeWidth="1"
      fill="none"
    />

    {/* ── Environment nodes ─────────────────────────────────────── */}
    {NODES.map((node) => (
      <g key={node.id}>
        <rect
          x={NODE_X}
          y={node.y}
          width={NODE_W}
          height={NODE_H}
          rx="2"
          fill={node.active ? "#ffffff" : SURFACE_LIGHT}
          stroke={node.active ? ACCENT : RULE}
          strokeWidth={node.active ? 1.25 : 1}
        />
        {/* Status pip */}
        <circle
          cx={NODE_X + 18}
          cy={node.y + NODE_H / 2}
          r="3.5"
          fill={node.active ? ACCENT : RULE_SOFT}
        />
        <text
          x={NODE_X + 32}
          y={node.y + NODE_H / 2 + 3.5}
          fill={node.active ? INK : INK_SOFT}
          fontSize="10"
          letterSpacing="1.2"
          fontFamily="var(--rengo-fonts-mono)"
        >
          {node.label}
        </text>
        {/* Load bar, standing in for the source's replica meter */}
        <rect
          x={NODE_X + 150}
          y={node.y + NODE_H / 2 - 3}
          width="80"
          height="6"
          rx="1"
          fill={SURFACE}
        />
        <rect
          x={NODE_X + 150}
          y={node.y + NODE_H / 2 - 3}
          width={node.active ? 62 : 28}
          height="6"
          rx="1"
          fill={node.active ? ACCENT : RULE_SOFT}
        />
      </g>
    ))}

    {/* ── Metric chips ──────────────────────────────────────────── */}
    {CHIPS.map((chip) => (
      <g key={chip.text}>
        <path
          d={`M${NODE_X + NODE_W} ${chip.y + 10} H${chip.x - 16}`}
          stroke={RULE}
          strokeWidth="1"
          strokeDasharray="2 3"
          fill="none"
        />
        <rect
          x={chip.x}
          y={chip.y}
          width="172"
          height="21"
          rx="2"
          fill="#ffffff"
          stroke={RULE}
          strokeWidth="1"
        />
        <text
          x={chip.x + 10}
          y={chip.y + 14}
          fill={INK_SOFT}
          fontSize="9"
          letterSpacing="0.8"
          fontFamily="var(--rengo-fonts-mono)"
        >
          {chip.text}
        </text>
      </g>
    ))}

    {/* ── Isometric model cube ──────────────────────────────────── */}
    <g transform="translate(556, 258)">
      <polygon
        points="44,0 88,22 44,44 0,22"
        fill={SURFACE}
        stroke={RULE}
        strokeWidth="1"
      />
      <polygon
        points="0,22 44,44 44,88 0,66"
        fill={SURFACE_LIGHT}
        stroke={RULE}
        strokeWidth="1"
      />
      <polygon
        points="88,22 44,44 44,88 88,66"
        fill={ACCENT}
        opacity="0.16"
        stroke={ACCENT}
        strokeWidth="1"
      />
      <text
        x="44"
        y="-8"
        textAnchor="middle"
        fill={RULE_SOFT}
        fontSize="9"
        letterSpacing="1"
        fontFamily="var(--rengo-fonts-mono)"
      >
        YOUR REPO
      </text>
    </g>
  </svg>
);
