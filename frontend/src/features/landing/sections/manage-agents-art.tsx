import { Box, Flex, Text } from "@chakra-ui/react";
import { Circle, Loader2, SquareCheck, type LucideIcon } from "lucide-react";
import React from "react";

/**
 * "Manage automations" — three colour-coded workflow step cards connected by
 * a dashed vertical rule (Figma node 171-1406).
 */

/** Matches the connector stroke used across the bento section. */
const RULE_SOFT = "#a9b7c6";
const CONNECTOR_H = 16;
const ICON_SIZE = 14;

type Step = {
  id: string;
  label: string;
  bg: string;
  color: string;
  hasBorder: boolean;
  Icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    id: "ingest",
    label: "Analyze call transcripts",
    bg: "#e4ede8", // light/green/subtle
    color: "#2a533c", // light/green/fg
    hasBorder: false,
    Icon: SquareCheck,
  },
  {
    id: "extract",
    label: "Create a source-backed brief",
    bg: "white",
    color: "#495d7c", // light/blue/fg
    hasBorder: true,
    Icon: Loader2,
  },
  {
    id: "sync",
    label: "Send email",
    bg: "#e0e5e6", // slate-blue muted
    color: "#495d7c", // light/blue/fg
    hasBorder: false,
    Icon: Circle,
  },
];

type ManageAgentsArtProps = {
  variant?: "tile" | "compact";
};

export const ManageAgentsArt: React.FC<ManageAgentsArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";

  return (
    <Box w="full" maxW={isCompact ? "220px" : "320px"} mx="auto" aria-hidden>
      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;

        return (
          <Box key={s.id}>
            <Flex
              w="full"
              align="center"
              h={isCompact ? "40px" : "50px"}
              bg={s.bg}
              border={s.hasBorder ? "1px solid" : undefined}
              borderColor={s.hasBorder ? "#d3dde1" : undefined}
              borderRadius="6px"
              px={isCompact ? "12px" : "20px"}
              gap={2}
            >
              <Text
                fontFamily="body"
                fontSize={isCompact ? "10px" : "12px"}
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
              <s.Icon
                size={isCompact ? ICON_SIZE - 2 : ICON_SIZE}
                strokeWidth={1.75}
                color={s.color}
                aria-hidden
                style={{ flexShrink: 0 }}
              />
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
