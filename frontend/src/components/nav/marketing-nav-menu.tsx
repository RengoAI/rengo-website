import { marketingLayoutBorderColor } from "@/components/layout/marketing-frame";
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
    // Long enough to forgive the pointer clipping a corner on its way from the
    // trigger down into the panel, short enough not to feel stuck open.
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
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
          color={open ? "accent.link" : navColor}
          bg="transparent"
          transition="color 150ms ease"
          _hover={{
            color: "accent.link",
            bg: "transparent",
          }}
        >
          {label}
          <Box
            as="span"
            display="inline-flex"
            color={open ? "accent.link" : "slate.40"}
            transition="transform 200ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms ease"
            transform={open ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <ChevronDown size={14} strokeWidth={2} />
          </Box>
        </Flex>
      </Box>

      {/*
        Kept mounted so opening and closing can both animate; `hidden` keeps it
        out of the accessibility tree and off the pointer while closed. The nav
        is transparent over the hero's moving gradient now, so the panel eases
        in and sits on a translucent, blurred ground rather than appearing
        instantly as a hard white rectangle.
      */}
      <Box
        position="absolute"
        top="calc(100% - 1px)"
        left={0}
        w="max-content"
        minW="210px"
        maxW="calc(100vw - 48px)"
        bg="white/85"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor={marketingLayoutBorderColor}
        borderRadius="md"
        zIndex={110}
        boxShadow="0 16px 40px rgba(17, 24, 39, 0.10)"
        role="menu"
        aria-hidden={!open}
        hidden={!open}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        overflow="hidden"
        opacity={open ? 1 : 0}
        transform={open ? "translateY(0)" : "translateY(-4px)"}
        pointerEvents={open ? "auto" : "none"}
        transition="opacity 160ms ease, transform 160ms ease"
        css={{
          // `hidden` sets `display: none`, which would skip the transition —
          // the attribute is kept for semantics and overridden for layout.
          "&[hidden]": { display: "block" },
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        <Flex direction="column" align="stretch">
          {items.map((item) => (
            <Box
              key={item.id}
              asChild
              display="block"
              px={7}
              py={3}
              textDecoration="none"
              transition="background-color 120ms ease, color 120ms ease"
              _hover={{ bg: "primary.25", textDecoration: "none" }}
            >
              <Link
                to={item.path}
                role="menuitem"
                tabIndex={open ? undefined : -1}
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
    </Box>
  );
};
