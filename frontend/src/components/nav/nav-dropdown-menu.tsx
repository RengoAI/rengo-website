import { marketingLayoutBorderColor } from "@/components/layout/marketing-frame";
import { topNavLinkStyles } from "@/components/nav/nav-styles";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface NavDropdownItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

interface NavDropdownMenuProps {
  label: string;
  items: readonly NavDropdownItem[];
  navColor: string;
  navHoverColor: string;
}

export const NavDropdownMenu: React.FC<NavDropdownMenuProps> = ({
  label,
  items,
  navColor,
  navHoverColor,
}) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const panelBg = "white";
  const panelBorder = marketingLayoutBorderColor;
  const titleColor = "indigo.900";
  const bodyColor = "ink.body";
  const itemHoverBg = "slate.20";

  return (
    <Box
      ref={rootRef}
      position="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Box
        as="button"
        display="inline-flex"
        alignItems="center"
        gap={1}
        color={navColor}
        bg="transparent"
        border="none"
        cursor="pointer"
        _hover={{ color: navHoverColor }}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        {...topNavLinkStyles}
      >
        {label}
        <Box
          as="span"
          display="inline-flex"
          transition="transform 150ms ease"
          transform={open ? "rotate(180deg)" : "rotate(0deg)"}
        >
          <ChevronDown size={14} strokeWidth={2} />
        </Box>
      </Box>

      {open && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          left="50%"
          transform="translateX(-50%)"
          w="min(360px, calc(100vw - 48px))"
          bg={panelBg}
          border="1px solid"
          borderColor={panelBorder}
          borderRadius={0}
          zIndex={110}
          boxShadow="0 12px 40px rgba(17, 24, 39, 0.12)"
          role="menu"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <Flex direction="column">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.id}
                  asChild
                  w="full"
                  textAlign="left"
                  px={4}
                  py={4}
                  textDecoration="none"
                  _hover={{ bg: itemHoverBg, textDecoration: "none" }}
                >
                  <Link
                    to={item.path}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <Flex gap={3} align="flex-start">
                      <Box
                        color={titleColor}
                        mt="2px"
                        flexShrink={0}
                        aria-hidden
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </Box>
                      <Box minW={0}>
                        <Text
                          fontFamily="body"
                          fontWeight="medium"
                          fontSize="15px"
                          lineHeight={1.3}
                          color={titleColor}
                          m={0}
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontFamily="body"
                          fontSize="13px"
                          lineHeight={1.45}
                          color={bodyColor}
                          mt={1.5}
                          mb={0}
                          mx={0}
                        >
                          {item.description}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                </Box>
              );
            })}
          </Flex>
        </Box>
      )}
    </Box>
  );
};
