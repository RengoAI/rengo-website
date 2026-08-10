import { Logo } from "@/components/logo/logo";
import {
  marketingPageMarginX,
  marketingLayoutBorderColor,
} from "@/components/layout/marketing-frame";
import { topNavCtaStyles } from "@/components/nav/nav-styles";
import {
  ButtonArrowLabel,
  ctaButtonHoverWithArrowProps,
} from "@/components/ui/button-arrow-label";
import { Box, Button, IconButton, Text, VStack } from "@chakra-ui/react";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

/** Matches marketing-nav-menu dropdown panel shadow. */
const NAV_PANEL_SHADOW = "0 12px 40px rgba(17, 24, 39, 0.12)";

interface MobileNavChild {
  label: string;
  path: string;
}

interface MobileNavItem {
  label: string;
  path?: string;
  children?: MobileNavChild[];
}

interface MobileNavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: MobileNavItem[];
  onNavigate: (path: string) => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  open,
  onOpenChange,
  navItems,
  onNavigate,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      <Box
        position="fixed"
        inset={0}
        zIndex={9998}
        bg="blackAlpha.500"
        onClick={() => onOpenChange(false)}
      />

      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={9999}
        bg="white"
        color="indigo.900"
        overflow="hidden"
        borderBottom="1px solid"
        borderColor={marketingLayoutBorderColor}
        boxShadow={NAV_PANEL_SHADOW}
      >
        <Box
          px={marketingPageMarginX}
          minH="64px"
          h="64px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="slate.10"
          borderBottom="1px solid"
          borderColor={marketingLayoutBorderColor}
        >
          <Logo color="indigo.900" homeLink />
          <IconButton
            aria-label="Close menu"
            variant="ghost"
            size="sm"
            color="indigo.900"
            borderRadius={0}
            minW="auto"
            w="auto"
            h="auto"
            p={2}
            _hover={{ bg: "transparent", color: "indigo.700" }}
            onClick={() => onOpenChange(false)}
          >
            <X size={22} />
          </IconButton>
        </Box>

        <VStack gap={0} alignItems="stretch">
          {navItems.map((item) =>
            item.children ? (
              <Box
                key={item.label}
                borderBottom="1px solid"
                borderColor={marketingLayoutBorderColor}
              >
                <Box
                  px={7}
                  py={3}
                  bg="slate.10"
                  borderBottom="1px solid"
                  borderColor={marketingLayoutBorderColor}
                >
                  <Text
                    fontFamily="body"
                    fontSize="14px"
                    fontWeight="medium"
                    lineHeight="16px"
                    color="ink.body"
                    m={0}
                  >
                    {item.label}
                  </Text>
                </Box>
                {item.children.map((child) => (
                  <Button
                    key={child.path}
                    variant="ghost"
                    h="auto"
                    py={3}
                    px={7}
                    w="full"
                    borderRadius={0}
                    justifyContent="flex-start"
                    bg="white"
                    _hover={{ bg: "slate.10" }}
                    onClick={() => onNavigate(child.path)}
                  >
                    <Text
                      fontFamily="body"
                      fontSize="14px"
                      fontWeight="medium"
                      lineHeight="16px"
                      color="indigo.900"
                      m={0}
                    >
                      {child.label}
                    </Text>
                  </Button>
                ))}
              </Box>
            ) : (
              <Box
                key={item.path}
                borderBottom="1px solid"
                borderColor={marketingLayoutBorderColor}
              >
                <Button
                  variant="ghost"
                  h="auto"
                  py={3}
                  px={7}
                  w="full"
                  borderRadius={0}
                  justifyContent="flex-start"
                  bg="white"
                  _hover={{ bg: "slate.10" }}
                  onClick={() => item.path && onNavigate(item.path)}
                >
                  <Text
                    fontFamily="body"
                    fontSize="14px"
                    fontWeight="medium"
                    lineHeight="16px"
                    color="indigo.900"
                    m={0}
                  >
                    {item.label}
                  </Text>
                </Button>
              </Box>
            ),
          )}

          <Box px={7} py={5}>
            <Button
              w="full"
              bg="indigo.900"
              color="slate.10"
              onClick={() =>
                window.open(
                  "mailto:sales@rengoai.com",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              {...topNavCtaStyles}
              {...ctaButtonHoverWithArrowProps}
              h="auto"
            >
              <ButtonArrowLabel>Get Started</ButtonArrowLabel>
            </Button>
          </Box>
        </VStack>
      </Box>
    </>,
    document.body,
  );
};
