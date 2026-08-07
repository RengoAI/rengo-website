import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface MarketingNavMenuItem {
  id: string;
  title: string;
  path: string;
}

interface MarketingNavMenuProps {
  label: string;
  items: readonly MarketingNavMenuItem[];
  navColor: string;
  navHoverColor: string;
}

export const MarketingNavMenu: React.FC<MarketingNavMenuProps> = ({
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
        justifyContent="center"
        h="64px"
        minH="64px"
        m={0}
        p={0}
        border="none"
        cursor="pointer"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        fontFamily="body"
        fontSize="14px"
        fontWeight="medium"
        lineHeight="16px"
        borderRadius={0}
      >
        <Flex
          align="center"
          gap={1}
          px="10px"
          py="4px"
          color={open ? "slate.10" : navColor}
          bg={open ? "indigo.900" : "transparent"}
          transition="background 150ms ease, color 150ms ease"
          _hover={{
            color: open ? "slate.10" : navHoverColor,
            bg: open ? "indigo.900" : "transparent",
          }}
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
        </Flex>
      </Box>

      {open && (
        <Box
          position="absolute"
          top="calc(100% + 4px)"
          left={0}
          w="max-content"
          maxW="calc(100vw - 48px)"
          bg="white"
          border="1px solid"
          borderColor="slate.30"
          borderRadius={0}
          zIndex={110}
          boxShadow="0 12px 40px rgba(17, 24, 39, 0.12)"
          role="menu"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          overflow="hidden"
        >
          <Box
            px={6}
            py={3}
            bg="slate.10"
            borderBottom="1px solid"
            borderColor="slate.30"
          >
            <Text
              fontFamily="body"
              fontSize="14px"
              fontWeight="medium"
              lineHeight="16px"
              color="slate.50"
              m={0}
            >
              {label}
            </Text>
          </Box>
          <Flex direction="column" align="stretch" py={1}>
            {items.map((item) => (
              <Box
                key={item.id}
                asChild
                display="block"
                px={6}
                py={3}
                textDecoration="none"
                _hover={{ bg: "slate.10", textDecoration: "none" }}
              >
                <Link
                  to={item.path}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  <Text
                    fontFamily="body"
                    fontSize="14px"
                    fontWeight="medium"
                    lineHeight="16px"
                    color="indigo.900"
                    m={0}
                    whiteSpace="nowrap"
                  >
                    {item.title}
                  </Text>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};
