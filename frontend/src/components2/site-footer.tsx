import { Box, Flex, Text } from "@chakra-ui/react";

import { F, PAGE_MAX_W, sectionPx } from "./new-site-tokens";

const FOOTER_LINKS = ["Product", "Solutions", "Team", "Privacy", "Terms"] as const;

export function SiteFooter() {
  return (
    <Box as="footer" w="full" bg="#0d1d2c" borderTopWidth="1px" borderTopColor="#223857">
      <Flex
        maxW={PAGE_MAX_W} mx="auto" px={sectionPx}
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
        gap={{ base: "20px", md: "0" }}
        minH={{ base: "auto", md: "192px" }}
        py={{ base: "32px", md: "0" }}
      >
        <Text
          fontFamily={`"Geist Mono", monospace`}
          fontSize="13px"
          color="#dadada"
          letterSpacing="0.7px"
          textTransform="uppercase"
          lineHeight="19.5px"
        >
          Rengo AI
        </Text>

        <Flex gap={{ base: "16px", md: "24px" }} flexWrap="wrap">
          {FOOTER_LINKS.map((label) => (
            <Text
              key={label}
              as="a"
              fontFamily={F.sans}
              fontSize="13px"
              color="#5a6a8a"
              lineHeight="19.5px"
              cursor="pointer"
              _hover={{ color: "#97aec8" }}
            >
              {label}
            </Text>
          ))}
        </Flex>

        <Text
          fontFamily={`"Geist Mono", monospace`}
          fontSize="11px"
          color="#3a4a6a"
          lineHeight="16.5px"
        >
          © 2026 Rengo AI
        </Text>
      </Flex>
    </Box>
  );
}
