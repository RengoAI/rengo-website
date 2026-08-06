import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { C, F, PAGE_MAX_W, sectionPx, V2Heading } from "./new-site-tokens";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = "Solutions" | "Security" | "Team";

/** Each nav item may optionally route to a path instead of toggling local state */
type NavItemConfig = { label: NavItem; to?: string };

const NAV_ITEMS: NavItemConfig[] = [
  { label: "Solutions", to: "/next/solutions" },
  { label: "Security",  to: "/next/security" },
  { label: "Team" },
];

// ─── NavLink ──────────────────────────────────────────────────────────────────
function NavLink({
  label, active, darkNav, onClick,
}: {
  label: NavItem; active: boolean; darkNav: boolean; onClick: () => void;
}) {
  const idleColor   = darkNav ? C.grey30   : C.grey60;
  const activeColor = darkNav ? "white"    : C.indigo2;
  const hoverColor  = darkNav ? "white"    : C.indigo1;

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
      color={active ? activeColor : idleColor}
      _hover={{ color: hoverColor }}
      transition="color 120ms ease"
    >
      <Text
        fontFamily={F.sans}
        fontSize="14px"
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
export function NavBar({ darkNav = false }: { darkNav?: boolean }) {
  const [localActive, setLocalActive] = useState<NavItem | null>(null);
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY > 8) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Derive active item from route
  const routeActive: NavItem | null =
    location.pathname.startsWith("/next/solutions") ? "Solutions" :
    location.pathname.startsWith("/next/security")  ? "Security"  : null;
  const active = routeActive ?? localActive;

  // Bg: dark indigo when darkNav+unscrolled, blurred when scrolled
  const navBg = scrolled
    ? (darkNav ? "rgba(33, 48, 68, 0.92)" : "rgba(245, 245, 246, 0.92)")
    : (darkNav ? C.indigo1 : C.grey10);
  const navBlur   = scrolled ? "blur(12px)" : "blur(2px)";
  const borderCol = scrolled
    ? C.grey30
    : (darkNav ? "rgba(255,255,255,0.08)" : C.grey20);
  const logoColor      = darkNav ? C.grey30  : C.indigo1;
  const hamburgerColor = darkNav ? C.grey30  : C.indigo1;

  const handleNavClick = (cfg: NavItemConfig) => {
    if (cfg.to) {
      navigate(cfg.to);
    } else {
      setLocalActive(localActive === cfg.label ? null : cfg.label);
    }
    setMenuOpen(false);
  };

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
        borderBottomColor={borderCol}
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
          {/* Logo — navigates home */}
          <V2Heading
            as="button"
            variant="h5Regular"
            color={logoColor}
            cursor="pointer"
            bg="transparent"
            border="none"
            p="0"
            _hover={{ opacity: 0.8 }}
            transition="opacity 120ms ease"
            onClick={() => navigate("/next")}
          >
            Rengo AI
          </V2Heading>

          {/* Desktop nav links */}
          <Flex gap="20px" alignItems="center" display={{ base: "none", md: "flex" }}>
            {NAV_ITEMS.map((cfg) => (
              <NavLink
                key={cfg.label}
                label={cfg.label}
                active={active === cfg.label}
                darkNav={darkNav}
                onClick={() => handleNavClick(cfg)}
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
            color={hamburgerColor}
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
          borderBottomColor={darkNav ? "rgba(255,255,255,0.1)" : C.grey20}
          boxShadow="0 4px 16px rgba(36,49,85,0.1)"
        >
          {/* Inner: same constrained column */}
          <Box maxW={PAGE_MAX_W} mx="auto" px={sectionPx} pb="20px" display="flex" flexDir="column">
            {NAV_ITEMS.map((cfg) => (
              <Box
                key={cfg.label}
                as="button"
                textAlign="left"
                minH="44px"
                px="0"
                bg="transparent"
                border="none"
                borderBottomWidth="1px"
                borderBottomColor={darkNav ? "rgba(255,255,255,0.08)" : C.grey20}
                cursor="pointer"
                onClick={() => handleNavClick(cfg)}
              >
                <Text
                  fontFamily={F.sans}
                  fontSize="14px"
                  fontWeight={active === cfg.label ? "600" : "500"}
                  color={active === cfg.label
                    ? (darkNav ? "white" : C.indigo2)
                    : (darkNav ? C.grey30 : C.grey60)}
                >
                  {cfg.label}
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
