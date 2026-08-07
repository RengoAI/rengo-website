import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";

const VENDOR_TILES = [
  { id: "claude", label: "Claude", src: "/logos/claude.png", maxH: "22px" },
  {
    id: "microsoft",
    label: "Microsoft",
    src: "/logos/microsoft-small.png",
    maxH: "22px",
  },
  { id: "openai", label: "OpenAI", src: "/logos/open-ai.png", maxH: "24px" },
] as const;

/** Vendor logo row for the “Connect with your systems” bento tile. */
export const ConnectSystemsArt: React.FC = () => (
  <Box w="full" maxW="280px" mx="auto" aria-hidden>
    <Flex align="center" justify="center" gap={2.5}>
      {VENDOR_TILES.map((vendor) => (
        <Box
          key={vendor.id}
          w="54px"
          h="54px"
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
          border="1px solid"
          borderColor="slate.30"
          borderRadius="8px"
          boxShadow="0 8px 24px rgba(33, 48, 68, 0.1)"
        >
          <Image
            src={vendor.src}
            alt=""
            maxH={vendor.maxH}
            maxW="40px"
            w="auto"
            h="auto"
            objectFit="contain"
          />
        </Box>
      ))}
    </Flex>
  </Box>
);
