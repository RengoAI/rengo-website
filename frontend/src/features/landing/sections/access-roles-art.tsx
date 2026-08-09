import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ACCESS_ROLES = [
  { role: "Viewer" },
  { role: "Admin", outlined: true },
  { role: "Editor" },
] as const;

const TILE_PAD_PX = 28;
const ROLES_BLEED_PX = TILE_PAD_PX + 6;

type AccessRolesArtProps = {
  /** Fewer, smaller rows for composite tiles. */
  variant?: "tile" | "compact";
};

/** Access / roles illustration — centered in tile; role labels right-aligned. */
export const AccessRolesArt: React.FC<AccessRolesArtProps> = ({
  variant = "tile",
}) => {
  const roles =
    variant === "compact" ? ACCESS_ROLES.slice(0, 2) : ACCESS_ROLES;
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
      {roles.map((person) => {
        const isAdmin = "outlined" in person && person.outlined;
        return (
          <Box
            key={person.role}
            display="flex"
            alignItems="center"
            gap={variant === "compact" ? 2 : 2.5}
            ml={variant === "compact" ? 0 : "auto"}
            w={
              variant === "compact"
                ? "100%"
                : isAdmin
                  ? "92%"
                  : "76%"
            }
            minH={
              variant === "compact"
                ? isAdmin
                  ? "36px"
                  : "32px"
                : isAdmin
                  ? "44px"
                  : "38px"
            }
            pl={variant === "compact" ? 2.5 : 3}
            pr={variant === "compact" ? 3 : 4}
            bg={isAdmin ? "white" : "slate.10"}
            border="1px solid"
            borderColor="slate.30"
            borderRight={variant === "compact" ? undefined : "none"}
            borderRadius={variant === "compact" ? "8px" : "8px 0 0 8px"}
            boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
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
