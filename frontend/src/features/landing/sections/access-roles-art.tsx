import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ACCESS_ROLES = [
  { role: "Viewer" },
  { role: "Admin", outlined: true },
  { role: "Editor" },
] as const;

const TILE_PAD_PX = 28;
const ROLES_BLEED_PX = TILE_PAD_PX + 6;

/**
 * Bar-pulse animation: each row gently scales up 7% and back in sequence,
 * top → middle → bottom, then rests before looping.
 *
 * Total cycle: 4.8 s
 *   Bar 1: 0 – 10% scale up, 10 – 23% scale down  (0 – 1.1 s)
 *   Bar 2: 23 – 33% scale up, 33 – 46% scale down  (1.1 – 2.2 s)
 *   Bar 3: 46 – 56% scale up, 56 – 69% scale down  (2.2 – 3.3 s)
 *   Rest:  69 – 100%  (3.3 – 4.8 s pause)
 */
// slate.10 = #f5f5f6  (light grey resting state)
// white    = #ffffff  (active / enlarged state)
const ACCESS_STYLES = `
  @keyframes acBar1 {
    0%        { transform: scale(1);    background-color: #f5f5f6; }
    10%       { transform: scale(1.07); background-color: #ffffff; }
    23%       { transform: scale(1);    background-color: #f5f5f6; }
    100%      { transform: scale(1);    background-color: #f5f5f6; }
  }
  @keyframes acBar2 {
    0%,  23%  { transform: scale(1);    background-color: #f5f5f6; }
    33%       { transform: scale(1.07); background-color: #ffffff; }
    46%       { transform: scale(1);    background-color: #f5f5f6; }
    100%      { transform: scale(1);    background-color: #f5f5f6; }
  }
  @keyframes acBar3 {
    0%,  46%  { transform: scale(1);    background-color: #f5f5f6; }
    56%       { transform: scale(1.07); background-color: #ffffff; }
    69%       { transform: scale(1);    background-color: #f5f5f6; }
    100%      { transform: scale(1);    background-color: #f5f5f6; }
  }

  .ac-bar-1 {
    animation: acBar1 4.8s ease-in-out infinite;
    animation-fill-mode: both;
    will-change: transform, background-color;
  }
  .ac-bar-2 {
    animation: acBar2 4.8s ease-in-out infinite;
    animation-fill-mode: both;
    will-change: transform, background-color;
  }
  .ac-bar-3 {
    animation: acBar3 4.8s ease-in-out infinite;
    animation-fill-mode: both;
    will-change: transform, background-color;
  }
`;

const BAR_CLASSES = ["ac-bar-1", "ac-bar-2", "ac-bar-3"] as const;

type AccessRolesArtProps = {
  /** Fewer, smaller rows for composite tiles. */
  variant?: "tile" | "compact";
};

/** Access / roles illustration — centered in tile; role labels right-aligned. */
export const AccessRolesArt: React.FC<AccessRolesArtProps> = ({
  variant = "tile",
}) => {
  const roles = variant === "compact" ? ACCESS_ROLES.slice(0, 2) : ACCESS_ROLES;
  const bleed = variant === "compact" ? 0 : ROLES_BLEED_PX;

  return (
    <Box
      w={bleed ? `calc(100% + ${bleed}px)` : "full"}
      mr={bleed ? `-${bleed}px` : undefined}
      maxW={variant === "compact" ? "200px" : undefined}
      display="flex"
      flexDirection="column"
      gap={variant === "compact" ? 1.5 : 2}
      justifyContent="center"
      flex="1"
      minH={0}
      aria-hidden
    >
      <style>{ACCESS_STYLES}</style>

      {roles.map((person, i) => {
        const isAdmin = "outlined" in person && person.outlined;
        return (
          <Box
            key={person.role}
            display="flex"
            alignItems="center"
            gap={variant === "compact" ? 2 : 2.5}
            ml={variant === "compact" ? 0 : "auto"}
            w={variant === "compact" ? "100%" : "84%"}
            minH={variant === "compact" ? "34px" : "40px"}
            pl={variant === "compact" ? 2.5 : 3}
            pr={variant === "compact" ? 3 : 4}
            border="1px solid"
            borderColor="slate.30"
            borderRight={variant === "compact" ? undefined : "none"}
            borderRadius={variant === "compact" ? "8px" : "8px 0 0 8px"}
            boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
            className={BAR_CLASSES[i]}
          >
            <Box
              w={variant === "compact" ? "12px" : "16px"}
              h={variant === "compact" ? "12px" : "16px"}
              borderRadius="full"
              flexShrink={0}
              bg="slate.40"
            />
            <Box
              h="6px"
              flex="1"
              minW={0}
              maxW={
                variant === "compact"
                  ? isAdmin
                    ? "64px"
                    : "48px"
                  : isAdmin
                    ? "96px"
                    : "72px"
              }
              bg="slate.40"
              opacity={0.85}
            />
            <Text
              fontFamily="body"
              fontSize={variant === "compact" ? "9px" : "10px"}
              fontWeight="medium"
              lineHeight="12px"
              letterSpacing="-0.2px"
              color="indigo.700"
              m={0}
              ml="auto"
              flexShrink={0}
              textAlign="right"
            >
              {person.role}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};
