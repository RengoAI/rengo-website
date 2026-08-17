import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

/**
 * Engineering principles — bordered stacked rows (Figma node 184-1819).
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
          rx="1.5"
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
          strokeLinecap="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 16 L38 24 L30 32"
      fill="none"
      stroke={ICON_600}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

// ─── Component ────────────────────────────────────────────────────────────────
const ROW_BG = "#F0F1F2";

export const DeploymentCards: React.FC = () => (
  <Flex
    direction="column"
    w="full"
    overflow="hidden"
    borderRadius="4px"
    border="1px solid"
    borderColor="slate.30"
  >
    {CARDS.map((card, i) => (
      <Flex
        key={card.id}
        direction="row"
        align="center"
        justify="space-between"
        gap={{ base: 4, md: 6 }}
        px="24px"
        py="28px"
        w="full"
        bg={ROW_BG}
        borderTop={i > 0 ? "1px solid" : undefined}
        borderColor="slate.30"
      >
        <Flex align="flex-start" gap={3} flex="1" minW={0}>
          <Text
            fontFamily="body"
            fontWeight="light"
            fontSize="12px"
            lineHeight="24px"
            color="slate.40"
            flexShrink={0}
            w="16px"
            m={0}
          >
            {i + 1}
          </Text>
          <Flex direction="column" align="flex-start" gap={0.5} minW={0}>
            <Text
              fontFamily="body"
              fontWeight="medium"
              fontSize="20px"
              lineHeight="1.2"
              letterSpacing="-0.6px"
              color="indigo.900"
              m={0}
            >
              {card.title}
            </Text>
            <Text
              fontFamily="body"
              fontWeight="normal"
              fontSize="15px"
              lineHeight="1.4"
              color="ink.body"
              m={0}
            >
              {card.caption}
            </Text>
          </Flex>
        </Flex>

        <Box
          flexShrink={0}
          w="80px"
          h="80px"
          className={card.spin ? "rengo-loop-spin" : undefined}
        >
          {card.spin ? (
            <style>{`
              @keyframes rengo-loop-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .rengo-loop-spin {
                animation: rengo-loop-spin 12s linear infinite;
                transform-origin: center;
              }
              @media (prefers-reduced-motion: reduce) {
                .rengo-loop-spin { animation: none !important; }
              }
            `}</style>
          ) : null}
          <chakra.svg
            width="80px"
            height="80px"
            viewBox="0 0 48 48"
            aria-hidden
            display="block"
          >
            {card.glyph}
          </chakra.svg>
        </Box>
      </Flex>
    ))}
  </Flex>
);
