import { Box, Flex, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import React from "react";

/**
 * "Manage automations" — a recurring workflow, step by step.
 *
 * Three steps joined by a spine, so they read as one sequence rather than as
 * unrelated rows. The connector leaving a completed step is solid accent and
 * every later one is dashed slate, so how far the run has got is visible in the
 * line itself and not only in the markers.
 *
 * Built from Chakra rather than SVG because it is rows of type and status
 * marks; the surface styling matches the vendor chips in the sibling tile.
 */

const ACCENT = "#0071e3";

type StepState = "done" | "running" | "queued";

const STEPS: { id: string; step: string; meta: string; state: StepState }[] = [
  { id: "ingest", step: "Ingest ledger", meta: "2m", state: "done" },
  { id: "extract", step: "Extract holdings", meta: "now", state: "running" },
  { id: "sync", step: "Sync to portal", meta: "queued", state: "queued" },
];

const MARKER = 18;
/** Gap between one marker and the next, which the spine spans. */
const CONNECTOR_H = 22;

/**
 * Step marker. Done is a filled check, running a ringed accent dot, and queued
 * a hollow ring — so state reads from the shape alone rather than from colour,
 * which matters for anyone who cannot separate the two.
 */
const StepMarker: React.FC<{ state: StepState }> = ({ state }) => {
  if (state === "done") {
    return (
      <Flex
        w={`${MARKER}px`}
        h={`${MARKER}px`}
        borderRadius="full"
        bg={ACCENT}
        align="center"
        justify="center"
        flexShrink={0}
        color="white"
      >
        <Check size={11} strokeWidth={3} />
      </Flex>
    );
  }
  if (state === "running") {
    return (
      <Flex
        w={`${MARKER}px`}
        h={`${MARKER}px`}
        borderRadius="full"
        border="2px solid"
        borderColor={ACCENT}
        bg="white"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Box w="6px" h="6px" borderRadius="full" bg={ACCENT} />
      </Flex>
    );
  }
  return (
    <Box
      w={`${MARKER}px`}
      h={`${MARKER}px`}
      borderRadius="full"
      border="1.5px solid"
      borderColor="slate.40"
      bg="white"
      flexShrink={0}
    />
  );
};

type ManageAgentsArtProps = {
  variant?: "tile" | "compact";
};

export const ManageAgentsArt: React.FC<ManageAgentsArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";
  return (
    <Box w="full" maxW={isCompact ? "220px" : "268px"} mx="auto" aria-hidden>
      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;
        /* The spine below a completed step is solid accent; below anything else
           it is dashed slate. So the line carries the progress rather than
           merely spacing the rows. */
        const spineDone = s.state === "done";
        return (
          <Box key={s.id}>
            <Flex align="center" gap={3}>
              <StepMarker state={s.state} />
              <Flex
                flex="1"
                minW={0}
                align="center"
                gap={2}
                bg="slate.10"
                border="1px solid"
                borderColor={s.state === "running" ? ACCENT : "slate.30"}
                borderRadius="8px"
                boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
                px={3}
                py={isCompact ? 1.5 : 2}
              >
                <Text
                  fontFamily="body"
                  fontSize={isCompact ? "9px" : "10px"}
                  fontWeight="medium"
                  lineHeight="12px"
                  letterSpacing="-0.2px"
                  color={s.state === "queued" ? "slate.50" : "indigo.700"}
                  flex="1"
                  minW={0}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  m={0}
                >
                  {s.step}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize={isCompact ? "9px" : "10px"}
                  lineHeight="12px"
                  letterSpacing="-0.2px"
                  color={s.state === "running" ? ACCENT : "slate.50"}
                  flexShrink={0}
                  m={0}
                >
                  {s.meta}
                </Text>
              </Flex>
            </Flex>

            {!isLast && (
              /* Aligned to the marker's centre so the spine runs through it. */
              <Box h={`${CONNECTOR_H}px`} pl={`${MARKER / 2}px`}>
                <Box
                  w="0"
                  h="full"
                  borderLeftWidth="2px"
                  borderLeftStyle={spineDone ? "solid" : "dashed"}
                  borderLeftColor={spineDone ? ACCENT : "slate.30"}
                  ml="-1px"
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
