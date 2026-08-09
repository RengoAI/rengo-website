import { Box, Flex, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import React from "react";

/**
 * "Manage automations" — the recurring jobs, and what each one is doing.
 *
 * A run list rather than a row of capability icons: the label's operative word
 * is "manage", which means oversight — what ran, what is running, what is
 * queued. Three glyphs in boxes showed capabilities instead, which any product
 * could claim and which needed captions to be legible at all.
 *
 * Built from Chakra rather than SVG because it is rows of type and status
 * marks; the surface styling matches the vendor chips in the sibling tile.
 */

const ACCENT = "#0071e3";

type RunState = "done" | "running" | "queued";

const RUNS: { id: string; job: string; when: string; state: RunState }[] = [
  { id: "ledger", job: "Ingest ledger", when: "2m", state: "done" },
  { id: "calls", job: "Transcribe calls", when: "1h", state: "done" },
  { id: "pdfs", job: "Extract Q3 PDFs", when: "now", state: "running" },
  { id: "positions", job: "Sync positions", when: "6h", state: "queued" },
];

/**
 * Status mark. Done is a filled check, running a half-filled accent ring, and
 * queued a hollow ring — so state reads from the shape alone rather than from
 * colour, which matters for anyone who cannot separate the two.
 */
const StatusMark: React.FC<{ state: RunState }> = ({ state }) => {
  if (state === "done") {
    return (
      <Flex
        w="14px"
        h="14px"
        borderRadius="full"
        bg="rgba(118,140,166,0.18)"
        align="center"
        justify="center"
        flexShrink={0}
        color="slate.100"
      >
        <Check size={9} strokeWidth={3} />
      </Flex>
    );
  }
  if (state === "running") {
    return (
      <Box
        w="14px"
        h="14px"
        borderRadius="full"
        flexShrink={0}
        border="2px solid"
        borderColor={ACCENT}
        /* Half-filled: a running job is neither empty nor complete. Written as
           a plain CSS gradient — Chakra v3 dropped the `bgGradient` shorthand. */
        backgroundImage={`linear-gradient(to right, ${ACCENT} 50%, transparent 50%)`}
      />
    );
  }
  return (
    <Box
      w="14px"
      h="14px"
      borderRadius="full"
      flexShrink={0}
      border="1.5px solid"
      borderColor="slate.40"
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
    <Box
      w="full"
      maxW={isCompact ? "240px" : "300px"}
      mx="auto"
      bg="slate.10"
      border="1px solid"
      borderColor="slate.30"
      borderRadius="8px"
      boxShadow="0 8px 24px rgba(33, 48, 68, 0.1)"
      overflow="hidden"
      aria-hidden
    >
      {RUNS.map((run, i) => (
        <Flex
          key={run.id}
          align="center"
          gap={2.5}
          px={3}
          py={isCompact ? 2 : 2.5}
          borderTop={i === 0 ? undefined : "1px solid"}
          borderColor="slate.20"
        >
          <StatusMark state={run.state} />
          <Text
            fontFamily="mono"
            fontSize={isCompact ? "9px" : "10px"}
            lineHeight={1.2}
            letterSpacing="-0.1px"
            color={run.state === "queued" ? "slate.50" : "indigo.700"}
            flex="1"
            minW={0}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            m={0}
          >
            {run.job}
          </Text>
          <Text
            fontFamily="mono"
            fontSize={isCompact ? "8px" : "9px"}
            lineHeight={1.2}
            color={run.state === "running" ? ACCENT : "slate.50"}
            flexShrink={0}
            m={0}
          >
            {run.when}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};
