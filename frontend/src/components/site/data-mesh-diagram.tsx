import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const ART = "/img/rebrand/";

/**
 * The small schematic inside the open accordion row: typed source tiles on
 * the left and right, funnelled through a pair of connectors in the middle.
 *
 * Laid out in absolute pixels against a fixed 268×222 frame, because it is a
 * drawing rather than a layout — the coordinates come straight from Figma and
 * only make sense relative to each other. Its type sits at ~7px, well below
 * the bottom of the type scale, so the sizes here are raw rather than tokens.
 */

type Tile = {
  x: number;
  y: number;
  bg: string;
  label: string;
  fg: string;
};

const TILES: Tile[] = [
  {
    x: 132,
    y: 16,
    bg: "silver.600",
    label: "Time series",
    fg: "site.fg.onDark",
  },
  {
    x: 207,
    y: 16,
    bg: "silver.600",
    label: "Time series",
    fg: "site.fg.onDark",
  },
  { x: 132, y: 82, bg: "canvas.300", label: "Text", fg: "site.fg.subtle" },
  { x: 207, y: 82, bg: "canvas.300", label: "Text", fg: "site.fg.subtle" },
  { x: 40, y: 162, bg: "canvas.300", label: "Audio", fg: "site.fg.subtle" },
  { x: 132, y: 162, bg: "sky", label: "Tables", fg: "site.fg.subtle" },
  { x: 207, y: 162, bg: "soot.200", label: "Text", fg: "site.fg.subtle" },
  { x: 40, y: 83, bg: "sky", label: "Tables", fg: "site.fg.subtle" },
  { x: 40, y: 9, bg: "soot.200", label: "Text", fg: "site.fg.subtle" },
];

/** Connector art: [file, left, top, width, height, flipY]. */
const CONNECTORS: [string, number, number, number, number, boolean][] = [
  ["conn-45", 86.05, 23.15, 48, 87, false],
  ["conn-49", 90, 34, 42, 61, true],
  ["conn-46", 87.05, 113.15, 43, 77, true],
  ["conn-50", 182, 41, 25, 5, false],
  ["conn-47", 182, 106, 25, 5, false],
  ["conn-48", 182, 191, 25, 1, false],
];

export const DataMeshDiagram: React.FC = () => (
  <Box position="relative" w="268px" h="222px" flexShrink={0}>
    {TILES.map(({ x, y, bg, label, fg }, i) => (
      <Box
        key={i}
        position="absolute"
        left={`${x}px`}
        top={`${y}px`}
        boxSize="50px"
        borderRadius="1.807px"
        bg={bg}
      >
        <Text
          position="absolute"
          left="4.4px"
          top="4.3px"
          fontSize="7.228px"
          lineHeight="1.2"
          letterSpacing="-0.05em"
          color={fg}
        >
          {label}
        </Text>
      </Box>
    ))}

    {CONNECTORS.map(([file, left, top, w, h, flip]) => (
      <Image
        key={file}
        src={`${ART}${file}.svg`}
        alt=""
        position="absolute"
        left={`${left}px`}
        top={`${top}px`}
        w={`${w}px`}
        h={`${h}px`}
        transform={flip ? "scaleY(-1)" : undefined}
      />
    ))}

    {/* Nodes on the funnel. */}
    <Box
      position="absolute"
      left="116px"
      top="20px"
      boxSize="6px"
      bg="silver.500"
    />
    <Box
      position="absolute"
      left="105px"
      top="120px"
      boxSize="6px"
      bg="silver.500"
    />
    <Image
      src={`${ART}dot.svg`}
      alt=""
      position="absolute"
      left="96.42px"
      top="104.48px"
      w="1.459px"
      h="2.917px"
    />
    <Image
      src={`${ART}dot.svg`}
      alt=""
      position="absolute"
      left="96.42px"
      top="111.1px"
      w="1.459px"
      h="2.917px"
    />
  </Box>
);
