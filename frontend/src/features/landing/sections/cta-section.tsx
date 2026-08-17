import { ButtonArrowLabel } from "@/components/ui/button-arrow-label";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface CtaSectionProps {
  onTalkToSales: () => void;
  borderTop?: boolean;
}

const GUTTER_LINE = "whiteAlpha.200";

export const CtaSection: React.FC<CtaSectionProps> = ({
  onTalkToSales,
  borderTop = true,
}) => (
  <Box
    as="section"
    position="relative"
    overflow="hidden"
    w="full"
    bg="panel.900"
    borderTop={borderTop ? "1px solid" : undefined}
    borderColor={borderTop ? "panel.footerBorder" : undefined}
    css={{
      "@keyframes rengo-cta-drift-a": {
        "0%, 100%": { transform: "translate3d(-8%, -6%, 0) scale(1)" },
        "50%": { transform: "translate3d(10%, 8%, 0) scale(1.12)" },
      },
      "@keyframes rengo-cta-drift-b": {
        "0%, 100%": { transform: "translate3d(6%, 4%, 0) scale(1.05)" },
        "50%": { transform: "translate3d(-10%, -8%, 0) scale(1)" },
      },
      "@media (prefers-reduced-motion: reduce)": {
        "& [data-cta-wash]": { animation: "none !important" },
      },
    }}
  >
    <Box aria-hidden position="absolute" inset={0} pointerEvents="none">
      <Box
        data-cta-wash
        position="absolute"
        w="80%"
        h="140%"
        top="-30%"
        left="-20%"
        borderRadius="full"
        filter="blur(64px)"
        bg="radial-gradient(ellipse at center, #163655 0%, transparent 68%)"
        animation="rengo-cta-drift-a 22s ease-in-out infinite"
      />
      <Box
        data-cta-wash
        position="absolute"
        w="70%"
        h="130%"
        top="-10%"
        right="-18%"
        borderRadius="full"
        filter="blur(72px)"
        bg="radial-gradient(ellipse at center, #124476 0%, transparent 70%)"
        animation="rengo-cta-drift-b 28s ease-in-out infinite"
      />
      <Box
        data-cta-wash
        position="absolute"
        w="50%"
        h="90%"
        bottom="-30%"
        left="28%"
        borderRadius="full"
        filter="blur(80px)"
        opacity={0.55}
        bg="radial-gradient(ellipse at center, #0071e3 0%, transparent 72%)"
        animation="rengo-cta-drift-a 26s ease-in-out infinite reverse"
      />
    </Box>

    <MarketingPageWidth position="relative" zIndex={1}>
      <Flex w="full" align="stretch">
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderRightWidth="1px"
          borderRightStyle="solid"
          borderRightColor={GUTTER_LINE}
        />
        <Box
          flex="1"
          minW={0}
          px={marketingContentPaddingX}
          py={{ base: "104px", md: "120px" }}
          borderLeftWidth={{ base: "1px", md: 0 }}
          borderRightWidth={{ base: "1px", md: 0 }}
          borderLeftStyle="solid"
          borderRightStyle="solid"
          borderLeftColor={GUTTER_LINE}
          borderRightColor={GUTTER_LINE}
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={{ base: 8, md: 10 }}
            w="full"
            textAlign="center"
          >
            <Text
              as="h2"
              variant="h2"
              color="white"
              maxW="none"
              whiteSpace={{ base: "normal", md: "nowrap" }}
              m={0}
            >
              Ready to put AI to work?
            </Text>

            <Button
              flexShrink={0}
              bg="white"
              color="indigo.900"
              px={8}
              py={3.5}
              h="auto"
              fontFamily="body"
              fontSize="14px"
              fontWeight="normal"
              lineHeight="21px"
              onClick={onTalkToSales}
              _hover={{
                bg: "white",
                color: "indigo.900",
                "& [data-arrow]": { transform: "translateX(4px)" },
              }}
            >
              <ButtonArrowLabel>Talk to Sales</ButtonArrowLabel>
            </Button>
          </Flex>
        </Box>
        <Box
          display={{ base: "none", md: "block" }}
          w={MARKETING_GUTTER_WIDTH}
          flexShrink={0}
          borderLeftWidth="1px"
          borderLeftStyle="solid"
          borderLeftColor={GUTTER_LINE}
        />
      </Flex>
    </MarketingPageWidth>
  </Box>
);
