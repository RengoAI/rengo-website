import { Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

/**
 * Engineering principles — three horizontal flat cards, each with an icon,
 * title, and caption left-aligned (Figma node 171-184).
 *
 * Previous gradient-field layout replaced; glyph shapes and copy are unchanged.
 * Icon colours updated from white-on-dark to indigo-on-light.
 */

// ─── Icon colours (light-background palette) ──────────────────────────────────
const ICON_900 = "#124476"; // indigo.700 — strongest
const ICON_600 = "#3169a8"; // primary_400
const ICON_300 = "#88aad4"; // primary_200 — lightest accent

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

const ApplyLearningsLoopGlyph: React.FC = () => {
  const legColors = [ICON_300, ICON_600, ICON_900, ICON_300];
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

// ─── Card data ────────────────────────────────────────────────────────────────
interface DeploymentCard {
  id: string;
  title: string;
  caption: string;
  glyph: React.ReactNode;
}

const CARDS: DeploymentCard[] = [
  {
    id: "infrastructure",
    title: "Shared foundation",
    caption:
      "Connect your data, systems, and workflows to a governed foundation that every application and agent can build on.",
    glyph: (
      <>
        <rect x="10" y="12" width="28" height="7" rx="1.5" fill={ICON_300} />
        <rect x="10" y="22" width="28" height="7" rx="1.5" fill={ICON_600} />
        <rect x="10" y="32" width="28" height="7" rx="1.5" fill={ICON_900} />
      </>
    ),
  },
  {
    id: "own-code",
    title: "Own what you build",
    caption:
      "Applications and integrations tailored to your workflows, owned in your repository and built to evolve with you.",
    glyph: (
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
      </>
    ),
  },
  {
    id: "applied-ai",
    title: "Compound knowledge",
    caption:
      "Work shouldn't start from scratch. Capture the context behind every decision so the next workflow benefits from the last.",
    glyph: <ApplyLearningsLoopGlyph />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CARD_BORDER = "#cdddf0";

export const DeploymentCards: React.FC = () => (
  <Flex
    border="1px solid"
    borderColor={CARD_BORDER}
    borderRadius="4px"
    overflow="hidden"
    direction={{ base: "column", md: "row" }}
    w="full"
  >
    {CARDS.map((card, i) => (
      <Flex
        key={card.id}
        flex="1"
        minW={0}
        direction="column"
        gap="8px"
        p={{ base: "24px", md: "36px" }}
        minH={{ base: "auto", md: "209px" }}
        justify="center"
        borderLeft={i > 0 ? "1px solid" : undefined}
        borderColor={i > 0 ? CARD_BORDER : undefined}
      >
        {/* Icon + title group */}
        <Flex direction="column" gap="8px">
          <chakra.svg
            width="32px"
            height="32px"
            viewBox="0 0 48 48"
            aria-hidden
            flexShrink={0}
          >
            {card.glyph}
          </chakra.svg>

          <Text
            fontFamily="body"
            fontWeight="medium"
            fontSize={{ base: "18px", md: "20px" }}
            lineHeight="1.44"
            letterSpacing="-0.8px"
            color="#20283d"
            m={0}
          >
            {card.title}
          </Text>
        </Flex>

        {/* Description */}
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="16px"
          lineHeight="1.4"
          color="#474a67"
          m={0}
        >
          {card.caption}
        </Text>
      </Flex>
    ))}
  </Flex>
);
