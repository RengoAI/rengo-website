import { Logo } from "@/components/logo/logo";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { type LucideIcon, X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface MobileNavChild {
  label: string;
  path: string;
  description?: string;
  icon?: LucideIcon;
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
  // Lock body scroll when open
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
      {/* Backdrop */}
      <Box
        position="fixed"
        inset={0}
        zIndex={9998}
        bg="blackAlpha.700"
        onClick={() => onOpenChange(false)}
        style={{ backdropFilter: "blur(2px)" }}
      />

      {/* Drawer panel — slides from top, flush with viewport */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={9999}
        bg="white"
        color="primary.800"
        borderBottomRadius="18px"
        overflow="hidden"
        boxShadow="overlay"
      >
        {/* Header row with logo and close button */}
        <Box
          px={4}
          py={1}
          borderBottom="1px solid"
          borderColor="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo color="primary.700" homeLink />
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close menu"
            color="primary.800"
            bg="gray.50"
            borderRadius="8px"
            w="44px"
            h="44px"
            minW="44px"
            p={0}
            _hover={{ bg: "gray.100" }}
            onClick={() => onOpenChange(false)}
          >
            <X size={20} />
          </Button>
        </Box>
        <VStack gap={0} alignItems="stretch">
          {navItems.map((item) =>
            item.children ? (
              <Box key={item.label} borderBottom="1px solid" borderColor="gray.100">
                <Text
                  px={5}
                  pt={4}
                  pb={2}
                  fontSize="12px"
                  fontWeight="medium"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                  color="gray.500"
                  m={0}
                >
                  {item.label}
                </Text>
                {item.children.map((child) => {
                  const Icon = child.icon;
                  return (
                    <Button
                      key={child.path}
                      variant="ghost"
                      h="auto"
                      py={3}
                      px={5}
                      w="full"
                      borderRadius={0}
                      color="primary.800"
                      fontSize="sm"
                      fontWeight="normal"
                      justifyContent="flex-start"
                      _hover={{ bg: "gray.50" }}
                      onClick={() => onNavigate(child.path)}
                    >
                      <Flex gap={3} align="flex-start" textAlign="left">
                        {Icon && (
                          <Box mt="2px" flexShrink={0} aria-hidden>
                            <Icon size={18} strokeWidth={1.75} />
                          </Box>
                        )}
                        <Box minW={0}>
                          <Text fontWeight="medium" m={0}>
                            {child.label}
                          </Text>
                          {child.description && (
                            <Text
                              fontSize="12px"
                              color="gray.500"
                              lineHeight={1.4}
                              mt={1}
                              mb={0}
                              mx={0}
                              whiteSpace="normal"
                            >
                              {child.description}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  );
                })}
              </Box>
            ) : (
              <Box
                key={item.path}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Button
                  variant="ghost"
                  h={18}
                  px={5}
                  w="full"
                  borderRadius={0}
                  color="primary.800"
                  fontSize="sm"
                  fontWeight="normal"
                  justifyContent="space-between"
                  _hover={{ bg: "gray.50" }}
                  onClick={() => item.path && onNavigate(item.path)}
                >
                  {item.label}
                </Button>
              </Box>
            ),
          )}
          <Box p={5}>
            <Button
              w="full"
              h="44px"
              borderRadius="8px"
              bg="primary.700"
              color="white"
              fontSize="sm"
              fontWeight="normal"
              _hover={{ bg: "primary.800" }}
              onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
            >
              See a demo
            </Button>
          </Box>
        </VStack>
      </Box>
    </>,
    document.body,
  );
};
