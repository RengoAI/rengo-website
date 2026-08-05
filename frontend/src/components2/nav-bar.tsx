import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { C, F, PAGE_MAX_W, sectionPx, V2Heading } from "./new-site-tokens";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = "Solutions" | "Security" | "Team";
const NAV_ITEMS: NavItem[] = ["Solutions", "Security", "Team"];

// ─── NavLink ──────────────────────────────────────────────────────────────────
function NavLink({
  label, active, onClick,
}: {
  label: NavItem; active: boolean; onClick: () => void;
}) {
  return (
    <Box
      as="button"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="3px"
      onClick={onClick}
      cursor="pointer"
      outline="none"
      bg="transparent"
      border="none"
      p="0"
      minH="44px"
      justifyContent="center"
      color={active ? C.indigo2 : C.grey60}
      _hover={{ color: C.indigo1 }}
      transition="color 120ms ease"
    >
      <Text
        fontFamily={F.sans}
        fontSize="12px"
        fontWeight={active ? "600" : "500"}
        color="inherit"
        lineHeight="1"
        textTransform="capitalize"
        userSelect="none"
      >
        {label}
      </Text>
      <Box
        w="3px" h="3px"
        borderRadius="full"
        bg={C.indigo4}
        opacity={active ? 1 : 0}
        transition="opacity 150ms ease"
      />
    </Box>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
export function NavBar() {
  const [active, setActive]     = useState<NavItem | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY > 8) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg   = scrolled ? "rgba(245, 245, 246, 0.92)" : C.grey10;
  const navBlur = scrolled ? "blur(12px)" : "blur(2px)";

  return (
    <>
      {/* Outer: full-bleed background + chrome */}
      <Box
        as="nav"
        position="fixed"
        top="0" left="0" right="0"
        zIndex="100"
        w="full"
        borderBottomWidth="1px"
        borderBottomColor={scrolled ? C.grey30 : C.grey20}
        bg={navBg}
        backdropFilter={navBlur}
        boxShadow={scrolled ? "0 1px 12px rgba(36,49,85,0.07)" : "none"}
        transition="background 200ms ease, box-shadow 200ms ease, border-color 200ms ease"
      >
        {/* Inner: constrained column — aligns with all section content */}
        <Flex
          maxW={PAGE_MAX_W}
          mx="auto"
          px={sectionPx}
          pt="12px" pb="9px"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo */}
          <V2Heading as="p" variant="h5Regular" color={C.indigo1}>
            Rengo AI
          </V2Heading>

          {/* Desktop nav links */}
          <Flex gap="20px" alignItems="center" display={{ base: "none", md: "flex" }}>
            {NAV_ITEMS.map((label) => (
              <NavLink
                key={label}
                label={label}
                active={active === label}
                onClick={() => setActive(active === label ? null : label)}
              />
            ))}
          </Flex>

          {/* Desktop CTA */}
          <Box
            as="a"
            bg={C.indigo1}
            borderRadius="2px"
            px="8px"
            cursor="pointer"
            display={{ base: "none", md: "block" }}
            _hover={{ opacity: 0.85 }}
            transition="opacity 120ms ease"
          >
            <Text fontFamily={F.sans} fontSize="12px" lineHeight="19.5px" color="white">
              Request Access →
            </Text>
          </Box>

          {/* Mobile hamburger */}
          <Box
            as="button"
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="center"
            w="44px" h="44px"
            cursor="pointer"
            bg="transparent"
            border="none"
            color={C.indigo1}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Box>
        </Flex>
      </Box>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <Box
          position="fixed"
          top="35px" left="0" right="0"
          zIndex="99"
          display={{ base: "block", md: "none" }}
          bg={navBg}
          backdropFilter={navBlur}
          borderBottomWidth="1px"
          borderBottomColor={C.grey20}
          boxShadow="0 4px 16px rgba(36,49,85,0.1)"
        >
          {/* Inner: same constrained column */}
          <Box maxW={PAGE_MAX_W} mx="auto" px={sectionPx} pb="20px" display="flex" flexDir="column">
            {NAV_ITEMS.map((label) => (
              <Box
                key={label}
                as="button"
                textAlign="left"
                minH="44px"
                px="0"
                bg="transparent"
                border="none"
                borderBottomWidth="1px"
                borderBottomColor={C.grey20}
                cursor="pointer"
                onClick={() => {
                  setActive(active === label ? null : label);
                  setMenuOpen(false);
                }}
              >
                <Text
                  fontFamily={F.sans}
                  fontSize="14px"
                  fontWeight={active === label ? "600" : "500"}
                  color={active === label ? C.indigo2 : C.grey60}
                >
                  {label}
                </Text>
              </Box>
            ))}
            <Box
              as="a"
              mt="16px"
              bg={C.indigo1}
              borderRadius="2px"
              px="16px" py="12px"
              cursor="pointer"
              textAlign="center"
              onClick={() => setMenuOpen(false)}
            >
              <Text fontFamily={F.sans} fontSize="14px" color="white">
                Request Access →
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
