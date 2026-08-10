import { Box, Flex, Text } from "@chakra-ui/react";
import { Check, Clock } from "lucide-react";
import React from "react";

/**
 * "Manage automations" — a recurring workflow, step by step.
 *
 * Stacked cards with status icons on the right; centered solid connectors between
 * cards (same stroke color as Structure knowledge).
 */

/** Matches agents-act-art rules / divider. */
const RULE_SOFT = "#a9b7c6";
const SLATE_30 = "#d3dde1";
const SLATE_40 = "#a9b7c6";

type StepState = "done" | "running" | "queued";

const STEPS: { id: string; step: string; state: StepState }[] = [
  { id: "ingest", step: "Analyze call transcripts", state: "done" },
  { id: "extract", step: "Create a source-backed brief", state: "running" },
  { id: "sync", step: "Send email", state: "queued" },
];

const STATUS_ICON = 14;
const CONNECTOR_H = 14;
const CARD_PR = { compact: 3, tile: 4 } as const;

/** Static arc ring — in progress without spinner motion. */
const ProgressRing: React.FC<{ size: number; progress?: number }> = ({
  size,
  progress = 0.38,
}) => {
  const stroke = 1.75;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * progress;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <g transform={`translate(${cx} ${cy})`}>
        <circle
          cx={0}
          cy={0}
          r={r}
          fill="none"
          stroke={SLATE_30}
          strokeWidth={stroke}
        />
        <circle
          cx={0}
          cy={0}
          r={r}
          fill="none"
          stroke={SLATE_40}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform="rotate(-90) scale(-1, 1)"
        />
      </g>
    </svg>
  );
};

const StatusIcon: React.FC<{ state: StepState }> = ({ state }) => {
  if (state === "done") {
    return (
      <Flex
        w={`${STATUS_ICON}px`}
        h={`${STATUS_ICON}px`}
        borderRadius="full"
        bg={SLATE_40}
        align="center"
        justify="center"
        flexShrink={0}
        color="white"
      >
        <Check size={9} strokeWidth={3} />
      </Flex>
    );
  }
  if (state === "running") {
    return (
      <Flex
        w={`${STATUS_ICON}px`}
        h={`${STATUS_ICON}px`}
        align="center"
        justify="center"
        flexShrink={0}
      >
        <ProgressRing size={STATUS_ICON} />
      </Flex>
    );
  }
  return (
    <Flex
      w={`${STATUS_ICON}px`}
      h={`${STATUS_ICON}px`}
      align="center"
      justify="center"
      flexShrink={0}
      color={SLATE_40}
    >
      <Clock size={STATUS_ICON} strokeWidth={1.75} aria-hidden />
    </Flex>
  );
};

type ManageAgentsArtProps = {
  variant?: "tile" | "compact";
};

export const ManageAgentsArt: React.FC<ManageAgentsArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";
  const cardPr = isCompact ? CARD_PR.compact : CARD_PR.tile;

  return (
    <Box w="full" maxW={isCompact ? "220px" : "268px"} mx="auto" aria-hidden>
      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;

        return (
          <Box key={s.id}>
            <Flex
              w="full"
              minW={0}
              align="center"
              gap={2}
              minH={isCompact ? "32px" : "38px"}
              bg={s.state === "running" ? "white" : "slate.10"}
              border="1px solid"
              borderColor="slate.30"
              borderRadius="8px"
              boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
              pl={isCompact ? 2.5 : 3}
              pr={cardPr}
            >
              <Text
                fontFamily="body"
                fontSize={isCompact ? "9px" : "10px"}
                fontWeight="medium"
                lineHeight="12px"
                letterSpacing="-0.2px"
                color="indigo.700"
                flex="1"
                minW={0}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                m={0}
              >
                {s.step}
              </Text>
              <StatusIcon state={s.state} />
            </Flex>

            {!isLast && (
              <Flex justify="center" h={`${CONNECTOR_H}px`} align="stretch">
                <Box
                  w="0"
                  h="full"
                  borderLeftWidth="1.25px"
                  borderLeftStyle="solid"
                  borderLeftColor={RULE_SOFT}
                  opacity={0.55}
                  ml="-0.625px"
                />
              </Flex>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
