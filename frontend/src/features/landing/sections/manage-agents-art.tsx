import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

/**
 * "Manage agents" — the capabilities agents run, as a row of indicator cards.
 *
 * Deliberately mirrors the vendor-card row in `connect-systems-art` (same card
 * size, fill, border, radius and shadow) so the two tiles read as siblings:
 * one shows the tools you plug in, this one shows the work agents do. The
 * capability verbs come from the deck's Agents layer.
 *
 * Glyphs are inline SVG rather than image assets — they need to inherit the
 * ink colour and stay crisp at ~22px, which a raster logo would not.
 */

type Glyph = React.FC<{ size: number }>;

/** Microphone, for transcription. */
const TranscribeGlyph: Glyph = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21" />
  </svg>
);

/** Document with a pulled-out line, for extraction. */
const ExtractGlyph: Glyph = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5z" />
    <path d="M14 2.5V7.5H19" />
    <path d="M8.5 13.5h7" />
    <path d="M8.5 17h4.5" />
  </svg>
);

/** Two arrows in a loop, for sync. */
const SyncGlyph: Glyph = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 11.5a8 8 0 0 0-13.7-5.1L3.5 9" />
    <path d="M3.5 4.5V9H8" />
    <path d="M4 12.5a8 8 0 0 0 13.7 5.1l2.8-2.6" />
    <path d="M20.5 19.5V15H16" />
  </svg>
);

const CAPABILITIES: { id: string; label: string; Glyph: Glyph }[] = [
  { id: "transcribe", label: "Transcribe", Glyph: TranscribeGlyph },
  { id: "extract", label: "Extract", Glyph: ExtractGlyph },
  { id: "sync", label: "Sync", Glyph: SyncGlyph },
];

type ManageAgentsArtProps = {
  variant?: "tile" | "compact";
};

export const ManageAgentsArt: React.FC<ManageAgentsArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";
  /** Matches the vendor cards in `connect-systems-art` exactly — the two tiles
   *  sit in the same row, so a smaller card reads as a mismatch rather than a
   *  deliberate difference. Four at this size still clear the tile width. */
  const cardSize = isCompact ? "44px" : "54px";
  const glyphSize = isCompact ? 19 : 22;

  return (
    <Box w="full" maxW={isCompact ? "220px" : "280px"} mx="auto" aria-hidden>
      <Flex align="flex-start" justify="center" gap={isCompact ? 2 : 2.5}>
        {CAPABILITIES.map(({ id, label, Glyph }) => (
          <Flex
            key={id}
            direction="column"
            align="center"
            gap={2}
            flexShrink={0}
          >
            <Box
              w={cardSize}
              h={cardSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="slate.10"
              border="1px solid"
              borderColor="slate.30"
              borderRadius="8px"
              boxShadow="0 8px 24px rgba(33, 48, 68, 0.1)"
              color="indigo.700"
            >
              <Glyph size={glyphSize} />
            </Box>
            <Text
              fontFamily="body"
              fontSize={isCompact ? "9px" : "10px"}
              lineHeight={1.2}
              letterSpacing="-0.1px"
              color="indigo.700"
              opacity={0.75}
              textAlign="center"
              m={0}
            >
              {label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
