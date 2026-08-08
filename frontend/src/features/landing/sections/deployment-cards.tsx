import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Deployment pillars as Mintlify-style feature cards: a tall tile with a
 * tinted gradient field, a centred white logo plate, and a caption underneath.
 *
 * Card metrics follow Mintlify's "Enabling the next generation of startups"
 * row — ~341×390 tiles, 6px radius, overflow hidden — recoloured onto the
 * Rengo palette rather than their per-brand hues.
 */


/** Card field gradients — lighter primary ramp on slate.10 section. */
const FIELD_INDIGO_700 = "#124476";
const FIELD_PRIMARY_500 = "#1a4f8a";
const FIELD_PRIMARY_300 = "#5585be";
const FIELD_PRIMARY_400 = "#3169a8";
const FIELD_PRIMARY_200 = "#88aad4";
const FIELD_PRIMARY_100 = "#c3d4eb";

/** Glyph colors — slate / white ramp (matches bento tiles and marketing neutrals). */
const GLYPH_WHITE = "#ffffff";
const GLYPH_SLATE_20 = "#eaedee";
const GLYPH_SLATE_30 = "#d3dde1";
const GLYPH_SLATE_40 = "#a9b7c6";

/**
 * Apply-learnings plate: the AGM deck's learning-loop mark reduced to logo scale.
 *
 * Ported from rengo/sales `slides-agm/act-04-rengo-ai/learning-loop.jsx` — four
 * gapped clockwise legs (ingest → draft → decide → learn), each ending in an
 * arrowhead that hands off to the next, so the ring reads as a loop rather than
 * a circle. The deck's four beats become four legs only: labels and ring nodes
 * drop away, and the value ramp collapses to the palette here, with the return
 * leg lightest so the eye closes the circle without the hand-back competing
 * with the work.
 */
const LOOP = { cx: 24, cy: 24, r: 15 };
/** Leg start angles in SVG degrees, clockwise from the top (deck: NODE_DEG). */
const LOOP_NODE_DEG = [-90, 0, 90, 180];
/** Each leg stops this far short of the next one. With the deck's ring nodes
 *  dropped, the gap has nothing to clear and only has to keep an arrowhead from
 *  touching the tail behind it — so it runs tighter than the deck's 8°. */
const LOOP_GAP_DEG = 7;

const loopPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: LOOP.cx + LOOP.r * Math.cos(rad),
    y: LOOP.cy + LOOP.r * Math.sin(rad),
  };
};

const ApplyLearningsLoopGlyph: React.FC = () => {
  const legColors = [
    GLYPH_SLATE_20,
    GLYPH_SLATE_30,
    GLYPH_WHITE,
    GLYPH_SLATE_20,
  ];
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

interface DeploymentCard {
  id: string;
  title: string;
  caption: string;
  /** Gradient stops for the card field. */
  from: string;
  to: string;
  /** Simple glyph drawn on the centre plate. */
  glyph: React.ReactNode;
}

const CARDS: DeploymentCard[] = [
  {
    id: "infrastructure",
    title: "Shared foundation",
    caption:
      "Connect your data, systems, and workflows to a governed foundation that every application and agent can build on.",
    from: FIELD_INDIGO_700,
    to: FIELD_PRIMARY_400,
    glyph: (
      <>
        <rect
          x="10"
          y="12"
          width="28"
          height="7"
          rx="1.5"
          fill={GLYPH_SLATE_40}
        />
        <rect
          x="10"
          y="22"
          width="28"
          height="7"
          rx="1.5"
          fill={GLYPH_SLATE_20}
        />
        <rect
          x="10"
          y="32"
          width="28"
          height="7"
          rx="1.5"
          fill={GLYPH_WHITE}
        />
      </>
    ),
  },
  {
    id: "own-code",
    title: "Own what you build",
    caption:
      "Applications and integrations tailored to your workflows, owned in your repository and built to evolve with you.",
    from: FIELD_PRIMARY_500,
    to: FIELD_PRIMARY_200,
    glyph: (
      <>
        <path
          d="M18 16 L10 24 L18 32"
          fill="none"
          stroke={GLYPH_WHITE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 16 L38 24 L30 32"
          fill="none"
          stroke={GLYPH_SLATE_30}
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
      "Work shouldn’t start from scratch. Capture the context behind every decision so the next workflow benefits from the last.",
    from: FIELD_PRIMARY_300,
    to: FIELD_PRIMARY_100,
    glyph: <ApplyLearningsLoopGlyph />,
  },
];

/** Flat gradient field behind the centre plate. */
const CardField: React.FC<{ from: string; to: string }> = ({ from, to }) => {
  const id = React.useId();
  return (
    <Box
      as="svg"
      // @ts-expect-error -- svg attrs on Box
      viewBox="0 0 340 300"
      preserveAspectRatio="none"
      position="absolute"
      inset={0}
      w="full"
      h="full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="340" height="300" fill={`url(#g-${id})`} />
    </Box>
  );
};

export const DeploymentCards: React.FC = () => (
  <Flex
    direction={{ base: "column", md: "row" }}
    gap={{ base: 6, md: 4 }}
    w="full"
    align="stretch"
  >
    {CARDS.map((card) => (
      <Flex key={card.id} direction="column" gap={4} flex="1" minW={0}>
        <Box
          position="relative"
          w="full"
          h={{ base: "300px", md: "380px" }}
          borderRadius="3px"
          overflow="hidden"
          border="1px solid"
          borderColor="slate.30"
        >
          <CardField from={card.from} to={card.to} />

          <Flex position="absolute" inset={0} align="center" justify="center">
            <Box
              as="svg"
              width={{ base: "64px", md: "72px" }}
              height={{ base: "64px", md: "72px" }}
              viewBox="0 0 48 48"
              aria-hidden
            >
              {card.glyph}
            </Box>
          </Flex>
        </Box>

        <Flex direction="column" gap={3}>
          <Text
            as="h3"
            fontFamily="heading"
            fontWeight={350}
            fontSize={{ base: "18px", md: "22px" }}
            lineHeight={1.2}
            letterSpacing="-0.72px"
            color="indigo.900"
            m={0}
          >
            {card.title}
          </Text>
          <Text
            fontFamily="body"
            fontSize="16px"
            lineHeight="24px"
            color="slate.50"
            m={0}
          >
            {card.caption}
          </Text>
        </Flex>
      </Flex>
    ))}
  </Flex>
);
