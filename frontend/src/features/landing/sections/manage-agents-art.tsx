import { Box, Flex, Text } from "@chakra-ui/react";
import { Check, Circle, Loader2, type LucideIcon } from "lucide-react";
import React from "react";

/**
 * "Manage automations" — three colour-coded workflow step cards connected by
 * a dashed vertical rule (Figma node 171-1406).
 *
 * Background animation: all three cards start in the grey-blue idle state, then
 * stagger through white (loading) and green (completed) in pipeline order,
 * hold together at completed, then reset. Total cycle: 9 s.
 *
 *   Card 1: idle → loading @ 0.7 s → completed @ 2.3 s
 *   Card 2: idle → loading @ 2.7 s → completed @ 4.3 s
 *   Card 3: idle → loading @ 4.7 s → completed @ 6.3 s
 *   All completed hold:  7.2 s – 8.0 s
 *   Reset to idle:       8.0 s – 8.7 s
 */

// ─── colours ────────────────────────────────────────────────────────────────
const BG_IDLE      = "#e0e5e6";
const BG_LOADING   = "#ffffff";
const BG_COMPLETED = "#C9DCD1";
const RING_COLOR   = "#d3dde1";   // 1 px inset shadow used as border in loading state
const RULE_SOFT    = "#a9b7c6";

// ─── layout constants ────────────────────────────────────────────────────────
const CONNECTOR_H = 14;
const ICON_SIZE   = 13;

// ─── styles injected once into the DOM ───────────────────────────────────────
const CARD_STYLES = `
  /* Loader spin: ease-in-out per revolution, no pause */
  @keyframes manageSpinPause {
    0%   { transform: rotate(0deg);   animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
    100% { transform: rotate(360deg); }
  }
  .manage-loader-spin {
    animation: manageSpinPause 2.6s linear infinite;
  }

  /*
   * Background + border-ring keyframes.
   * "none" → inset 0 0 0 0px avoids an un-animatable jump; the 0 px ring
   * matches the loaded ring's shadow so browsers tween them smoothly.
   *
   * Each hold is expressed as two identical keyframe stops so the gap between
   * them is pure hold; the ease-in-out on the animation governs the
   * transition windows between those groups.
   */

  /* Card 1 – first in pipeline */
  @keyframes mgCard1 {
    0%,  8%   { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    18%, 26%  { background-color: ${BG_LOADING};   box-shadow: inset 0 0 0 1px ${RING_COLOR}; }
    36%, 89%  { background-color: ${BG_COMPLETED}; box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    96%, 100% { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
  }

  /* Card 2 – second in pipeline */
  @keyframes mgCard2 {
    0%,  30%  { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    40%, 48%  { background-color: ${BG_LOADING};   box-shadow: inset 0 0 0 1px ${RING_COLOR}; }
    58%, 89%  { background-color: ${BG_COMPLETED}; box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    96%, 100% { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
  }

  /* Card 3 – third in pipeline */
  @keyframes mgCard3 {
    0%,  52%  { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    62%, 70%  { background-color: ${BG_LOADING};   box-shadow: inset 0 0 0 1px ${RING_COLOR}; }
    80%, 89%  { background-color: ${BG_COMPLETED}; box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
    96%, 100% { background-color: ${BG_IDLE};      box-shadow: inset 0 0 0 0px ${RING_COLOR}; }
  }

  .manage-card-1 { animation: mgCard1 9s ease-in-out infinite; animation-fill-mode: both; }
  .manage-card-2 { animation: mgCard2 9s ease-in-out infinite; animation-fill-mode: both; }
  .manage-card-3 { animation: mgCard3 9s ease-in-out infinite; animation-fill-mode: both; }
`;

const CARD_CLASSES = ["manage-card-1", "manage-card-2", "manage-card-3"] as const;

// ─── types ───────────────────────────────────────────────────────────────────
type Step = {
  id: string;
  label: string;
  /** Icon / text colour — fixed throughout the animation. */
  color: string;
  Icon: LucideIcon;
  /** Render a filled circle + check instead of the outline icon. */
  filledCheck?: boolean;
};

// ─── sub-components ──────────────────────────────────────────────────────────
const FilledCircleCheck: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Box
    w={`${size}px`}
    h={`${size}px`}
    borderRadius="full"
    bg={color}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  >
    <Check
      size={Math.round(size * 0.65)}
      strokeWidth={3}
      color="white"
      aria-hidden
    />
  </Box>
);

// ─── data ────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  {
    id: "ingest",
    label: "Analyze call transcripts",
    color: "#2a533c",
    Icon: Check,
    filledCheck: true,
  },
  {
    id: "extract",
    label: "Create a source-backed brief",
    color: "#495d7c",
    Icon: Loader2,
  },
  {
    id: "sync",
    label: "Send email",
    color: "#495d7c",
    Icon: Circle,
  },
];

// ─── component ───────────────────────────────────────────────────────────────
type ManageAgentsArtProps = {
  variant?: "tile" | "compact";
};

export const ManageAgentsArt: React.FC<ManageAgentsArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";

  return (
    <Box w="full" maxW={isCompact ? "200px" : "260px"} mx="auto" aria-hidden>
      <style>{CARD_STYLES}</style>

      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;

        return (
          <Box key={s.id}>
            {/* background-color and border-ring are owned entirely by the CSS animation */}
            <Flex
              w="full"
              align="center"
              h={isCompact ? "34px" : "42px"}
              borderRadius="6px"
              px={isCompact ? "10px" : "14px"}
              gap={2}
              className={CARD_CLASSES[i]}
            >
              <Text
                fontFamily="body"
                fontSize={isCompact ? "10px" : "11px"}
                fontWeight="normal"
                lineHeight="1.2"
                letterSpacing="-0.36px"
                color={s.color}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flex="1"
                m={0}
              >
                {s.label}
              </Text>

              {s.filledCheck ? (
                <FilledCircleCheck
                  size={isCompact ? ICON_SIZE - 2 : ICON_SIZE}
                  color={s.color}
                />
              ) : (
                <s.Icon
                  size={isCompact ? ICON_SIZE - 2 : ICON_SIZE}
                  strokeWidth={1.75}
                  color={s.color}
                  aria-hidden
                  style={{ flexShrink: 0 }}
                  className={s.Icon === Loader2 ? "manage-loader-spin" : undefined}
                />
              )}
            </Flex>

            {!isLast && (
              <Flex justify="center" h={`${CONNECTOR_H}px`} align="stretch">
                <Box
                  w="0"
                  h="full"
                  borderLeftWidth="1px"
                  borderLeftStyle="dashed"
                  borderLeftColor={RULE_SOFT}
                  opacity={0.6}
                  ml="-0.5px"
                />
              </Flex>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
