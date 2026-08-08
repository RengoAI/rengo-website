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

const INK = "#213044";
const SLATE_GLYPH = "#768ca6"; // slate.50 — muted bars on the foundation glyph
const RULE = "#d3dde1";

/** Three-segment clockwise loop on a full circle (Apply learnings plate). */
const ApplyLearningsLoopGlyph: React.FC = () => {
  const chevron = (
    x: number,
    y: number,
    rotateDeg: number,
    color: string,
  ) => (
    <path
      d="M -3.5 2.5 L 0 -2.5 L 3.5 2.5"
      transform={`translate(${x} ${y}) rotate(${rotateDeg})`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );

  return (
    <>
      <circle
        cx={24}
        cy={24}
        r={10}
        fill="none"
        stroke={RULE}
        strokeWidth="1.5"
      />
      <path
        d="M 24 14 A 10 10 0 0 1 15.34 29"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {chevron(32.66, 19, 60, INK)}
      <path
        d="M 15.34 29 A 10 10 0 0 1 32.66 29"
        fill="none"
        stroke={SLATE_GLYPH}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {chevron(24, 34, 180, SLATE_GLYPH)}
      <path
        d="M 32.66 29 A 10 10 0 0 1 24 14"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {chevron(34, 24, -90, INK)}
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
      "We run and operate the platform so your team can focus on the work, not the stack.",
    from: "#0d2440",
    to: "#12325a",
    glyph: (
      <>
        <rect x="10" y="12" width="28" height="7" rx="1.5" fill={SLATE_GLYPH} />
        <rect x="10" y="22" width="28" height="7" rx="1.5" fill={SLATE_GLYPH} />
        <rect x="10" y="32" width="28" height="7" rx="1.5" fill={INK} />
      </>
    ),
  },
  {
    id: "own-code",
    title: "Own your code",
    caption:
      "Applications and integrations built just for you, in your own repository.",
    from: "#132a44",
    to: "#1d4f7c",
    glyph: (
      <>
        <path
          d="M18 16 L10 24 L18 32"
          fill="none"
          stroke={SLATE_GLYPH}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 16 L38 24 L30 32"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: "applied-ai",
    title: "Apply learnings",
    caption:
      "We turn frontier models into production systems that fit how your firm actually works.",
    from: "#0a2440",
    to: "#0071e3",
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
          borderRadius="6px"
          overflow="hidden"
          border="1px solid"
          borderColor={RULE}
        >
          <CardField from={card.from} to={card.to} />

          {/* Centre plate, as on Mintlify's cards */}
          <Flex position="absolute" inset={0} align="center" justify="center">
            <Flex
              w="96px"
              h="96px"
              borderRadius="14px"
              bg="white"
              align="center"
              justify="center"
              boxShadow="0 8px 28px rgba(9,20,36,0.28)"
            >
              <Box
                as="svg"
                width="48px"
                height="48px"
                viewBox="0 0 48 48"
                aria-hidden
              >
                {card.glyph}
              </Box>
            </Flex>
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
