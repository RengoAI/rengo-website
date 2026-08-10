import { Box, Flex, Text } from "@chakra-ui/react";
import { CornerDownLeft, Search } from "lucide-react";
import React from "react";

/**
 * "Unlock collective intelligence" — a question put to what the firm knows.
 *
 * A search field over source-backed results: the way you reach collective
 * knowledge is by asking it something, so the tile shows the asking. Replaces a
 * growing-stack figure that read as one dataset getting bigger over time —
 * which said nothing about the knowledge being shared, and duplicated what
 * "Structure knowledge" already shows.
 *
 * Presentational only. The field is a styled Box rather than an <input>: a real
 * input inside decorative bento art would take keyboard focus and read as
 * interactive to a screen reader, so the whole figure is aria-hidden instead.
 */

const ACCENT = "#0071e3";

/** Matches the sibling tiles' card surfaces. */
const SLATE_30 = "#d3dde1";

const QUERY = "Which portfolio companies flagged supply-chain risk?";

/**
 * Results are cited, since a source-backed answer is the claim — an answer with
 * no provenance is what a general chatbot already gives you.
 */
const RESULTS = [
  { id: "r1", source: "Q3 board deck", detail: "Apex Logistics" },
  { id: "r2", source: "Earnings call", detail: "Northwind Mfg." },
  { id: "r3", source: "Diligence memo", detail: "Cardinal Foods" },
] as const;

type CollectiveSearchArtProps = {
  variant?: "tile" | "compact";
};

export const CollectiveSearchArt: React.FC<CollectiveSearchArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";
  const results = isCompact ? RESULTS.slice(0, 2) : RESULTS;

  return (
    <Box w="full" maxW={isCompact ? "240px" : "300px"} mx="auto" aria-hidden>
      {/* The field. */}
      <Flex
        align="center"
        gap={2.5}
        bg="white"
        border="1px solid"
        borderColor={ACCENT}
        borderRadius="8px"
        px={3}
        py={isCompact ? 2 : 2.5}
        boxShadow="0 8px 24px rgba(33, 48, 68, 0.1)"
      >
        <Box color={ACCENT} display="flex" flexShrink={0}>
          <Search size={13} strokeWidth={2.25} />
        </Box>
        <Text
          fontFamily="body"
          fontSize={isCompact ? "9px" : "10px"}
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
          {QUERY}
        </Text>
        {/* Caret, so the field reads as mid-question rather than as a label. */}
        <Box w="1px" h="11px" bg={ACCENT} flexShrink={0} />
        <Box color="slate.50" display="flex" flexShrink={0}>
          <CornerDownLeft size={11} strokeWidth={2} />
        </Box>
      </Flex>

      {/* Cited results beneath it. */}
      <Flex direction="column" gap={0} mt={2.5}>
        {results.map((r, i) => (
          <Flex
            key={r.id}
            align="center"
            gap={2}
            px={3}
            py={isCompact ? 1.5 : 2}
            borderTop={i === 0 ? undefined : "1px solid"}
            borderColor="slate.20"
          >
            <Box
              w="4px"
              h="4px"
              borderRadius="full"
              bg={SLATE_30}
              flexShrink={0}
            />
            <Text
              fontFamily="body"
              fontSize={isCompact ? "9px" : "10px"}
              lineHeight="12px"
              letterSpacing="-0.2px"
              color="indigo.700"
              flexShrink={0}
              m={0}
            >
              {r.detail}
            </Text>
            <Text
              fontFamily="mono"
              fontSize={isCompact ? "8px" : "9px"}
              lineHeight="12px"
              color="slate.50"
              ml="auto"
              flexShrink={0}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              m={0}
            >
              {r.source}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
