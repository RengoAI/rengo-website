import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

/**
 * Engineering principles — card grid with illustrated headers.
 * Glyphs and copy are unchanged.
 */

// ─── Icon colours (light-background palette) ──────────────────────────────────
const ICON_900 = "#124476"; // indigo.700 — strongest
const ICON_600 = "#3169a8"; // primary_400

// ─── Loop glyph (Compound knowledge) ─────────────────────────────────────────
const LOOP = { cx: 24, cy: 24, r: 15 };
const LOOP_NODE_DEG = [-90, 0, 90, 180];
const LOOP_GAP_DEG = 7;

const loopPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: LOOP.cx + LOOP.r * Math.cos(rad),
    y: LOOP.cy + LOOP.r * Math.sin(rad),
  };
};

const BAR_YS = [12, 22, 32] as const;
const BAR_CYCLE = "3.6s";
const BAR_A = "#B3D0D4";
const BAR_B = "#6DB9C6";
const BAR_C = "#608187";

const FoundationBarsGlyph: React.FC = () => (
  <>
    <style>{`
      @keyframes rengo-bar-cycle {
        0%, 100% { fill: ${BAR_A}; }
        33.333% { fill: ${BAR_B}; }
        66.666% { fill: ${BAR_C}; }
      }
      .rengo-bar-cycle {
        animation: rengo-bar-cycle ${BAR_CYCLE} ease-in infinite;
      }
      .rengo-bar-cycle-1 { animation-delay: -1.2s; }
      .rengo-bar-cycle-2 { animation-delay: -2.4s; }
      @media (prefers-reduced-motion: reduce) {
        .rengo-bar-cycle { animation: none !important; }
      }
    `}</style>
    <g>
      {BAR_YS.map((y, i) => (
        <rect
          key={y}
          className={`rengo-bar-cycle rengo-bar-cycle-${i}`}
          x="10"
          y={y}
          width="28"
          height="7"
          rx="0.5"
        />
      ))}
    </g>
  </>
);

const LOOP_A = "#92D1AE";
const LOOP_B = "#446959";
const LOOP_C = "#A4C4B2";

const ApplyLearningsLoopGlyph: React.FC = () => {
  const legColors = [LOOP_A, LOOP_B, LOOP_C, LOOP_A];
  const legs = LOOP_NODE_DEG.map((deg, i) => {
    const from = loopPoint(deg + LOOP_GAP_DEG);
    const toDeg = deg + 90 - LOOP_GAP_DEG;
    const to = loopPoint(toDeg);
    return {
      key: i,
      color: legColors[i],
      d: `M${from.x.toFixed(2)},${from.y.toFixed(2)} A${LOOP.r},${LOOP.r} 0 0 1 ${to.x.toFixed(2)},${to.y.toFixed(2)}`,
      arrow: `translate(${to.x.toFixed(2)},${to.y.toFixed(2)}) rotate(${toDeg + 90})`,
    };
  });

  return (
    <>
      {legs.map(({ key, d, color }) => (
        <path
          key={`leg-${key}`}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="butt"
        />
      ))}
      {legs.map(({ key, arrow, color }) => (
        <polygon
          key={`arrow-${key}`}
          points="-3.4,-2.4 2.6,0 -3.4,2.4"
          transform={arrow}
          fill={color}
        />
      ))}
    </>
  );
};

const DOT_R = 1.6;
const DOT_GAP = (2 * 48) / 80;
const DOT_STEP = DOT_R * 2 + DOT_GAP;
const DOT_XS = [24 - DOT_STEP, 24, 24 + DOT_STEP] as const;

const OwnCodeGlyph: React.FC = () => (
  <>
    <path
      d="M18 16 L10 24 L18 32"
      fill="none"
      stroke={ICON_900}
      strokeWidth="2.5"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
    <path
      d="M30 16 L38 24 L30 32"
      fill="none"
      stroke={ICON_600}
      strokeWidth="2.5"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
    {DOT_XS.map((x, i) => (
      <circle key={x} cx={x} cy="24" r={DOT_R} fill={ICON_900}>
        <animate
          attributeName="cy"
          values="24;19.5;24"
          dur="1.8s"
          begin={`${i * 0.16}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.68;1"
          keySplines="0.42 0 1 1;0.7 0 1 1"
        />
      </circle>
    ))}
  </>
);

// ─── Card data ────────────────────────────────────────────────────────────────
interface DeploymentCard {
  id: string;
  title: string;
  caption: string;
  glyph: React.ReactNode;
  spin?: boolean;
}

const CARDS: DeploymentCard[] = [
  {
    id: "infrastructure",
    title: "Shared foundation",
    caption:
      "Connect your data, systems, and workflows to a foundation for every application and agent.",
    glyph: <FoundationBarsGlyph />,
  },
  {
    id: "own-code",
    title: "Own what you build",
    caption:
      "Applications tailored to your workflows, owned in your repository and built to evolve with you.",
    glyph: <OwnCodeGlyph />,
  },
  {
    id: "applied-ai",
    spin: true,
    title: "Compound knowledge",
    caption:
      "Capture the context behind every decision so the next workflow benefits from the last.",
    glyph: <ApplyLearningsLoopGlyph />,
  },
];

// ─── Card grid backgrounds ────────────────────────────────────────────────────
const CARD_BG: Record<string, string> = {
  infrastructure: "#E6F2F3", // soft teal — echoes the bar glyph colours
  "own-code":     "#EBF0F8", // soft indigo — echoes the bracket glyph colours
  "applied-ai":   "#EAF4EE", // soft green — echoes the loop glyph colours
};

const CARD_BORDER: Record<string, string> = {
  infrastructure: "#D5E8EA",
  "own-code":     "#DCE4F0",
  "applied-ai":   "#D8EBDE",
};

// ─── Card grid layout ─────────────────────────────────────────────────────────
/**
 * Alternative presentation of the three engineering principles:
 * each principle becomes a card with a large illustrated graphic on a solid
 * colour background at the top and the title + description below.
 */
export const EngineeringPrinciplesCards: React.FC = () => (
  <>
    {/* Spin animation — only injected once, shared by all cards in this layout */}
    <style>{`
      @keyframes rengo-loop-spin-card {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .rengo-loop-spin-card {
        animation: rengo-loop-spin-card 12s linear infinite;
        transform-origin: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .rengo-loop-spin-card { animation: none !important; }
      }
    `}</style>

    <Flex
      direction={{ base: "column", md: "row" }}
      gap={2}
      w="full"
      align="stretch"
    >
      {CARDS.map((card) => (
        <Flex
          key={card.id}
          direction="column"
          flex="1"
          borderRadius="4px"
          overflow="hidden"
        >
          {/* ── Graphic area ── */}
          <Flex
            align="center"
            justify="center"
            h="240px"
            flexShrink={0}
            bg={CARD_BG[card.id]}
            border="1px solid"
            borderColor={CARD_BORDER[card.id]}
            borderRadius="4px"
          >
            <Box className={card.spin ? "rengo-loop-spin-card" : undefined}>
              <chakra.svg
                width="120px"
                height="120px"
                viewBox="0 0 48 48"
                aria-hidden
                display="block"
              >
                {card.glyph}
              </chakra.svg>
            </Box>
          </Flex>

          {/* ── Text area ── */}
          <Flex
            direction="column"
            gap={1.5}
            p={5}
            pl={2}
            flex="1"
          >
            <Text
              fontFamily="body"
              fontWeight="medium"
              fontSize="17px"
              lineHeight="1.2"
              letterSpacing="-0.4px"
              color="indigo.900"
              m={0}
            >
              {card.title}
            </Text>
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="14px"
              lineHeight="1.5"
              color="ink.body"
              m={0}
            >
              {card.caption}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  </>
);
