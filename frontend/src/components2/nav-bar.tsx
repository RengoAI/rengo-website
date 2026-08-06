import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Sun, X } from "lucide-react";

import { C, F, PAGE_MAX_W, sectionPx } from "./new-site-tokens";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = "Solutions" | "Security" | "Team";

/** Each nav item may optionally route to a path instead of toggling local state */
type NavItemConfig = { label: NavItem; to?: string };

const NAV_ITEMS: NavItemConfig[] = [
  { label: "Solutions", to: "/next/solutions" },
  { label: "Security",  to: "/next/security" },
  { label: "Team" },
];

/**
 * Height of the floating nav pill + its top offset.
 * Import this in page files to set the correct spacer height.
 *   Nav pill:    ~60px  (py=8 × 2 + NavLink minH=44)
 *   Top offset:   8px
 *   Breathing:    8px
 *   ──────────────────
 *   Total:        76px
 */
export const NAV_SPACER_H = "76px";

// ─── NavLink — untouched ──────────────────────────────────────────────────────
function NavLink({
  label, active, darkNav, onClick,
}: {
  label: NavItem; active: boolean; darkNav: boolean; onClick: () => void;
}) {
  const idleColor   = darkNav ? C.grey30 : C.grey60;
  const activeColor = darkNav ? "white"  : C.indigo2;
  const hoverColor  = darkNav ? "white"  : C.indigo1;

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

  // Frosted-glass colours — always applied, no scroll transition on bg
  const navBg     = darkNav ? "rgba(33,48,68,0.92)"    : "rgba(255,255,255,0.9)";
  const borderCol = darkNav ? "rgba(255,255,255,0.12)" : C.grey30;
  const logoColor = darkNav ? C.grey30 : C.indigo1;

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
      {/* ── Floating pill ── fixed, 8px from all edges so rounded corners show */}
      <Box
        as="nav"
        position="fixed"
        top="8px" left="8px" right="8px"
        zIndex={1000}
        bg={navBg}
        backdropFilter="blur(2px)"
        borderWidth="1px"
        borderColor={borderCol}
        borderRadius="6px"
        boxShadow={scrolled ? "0 4px 20px rgba(36,49,85,0.08)" : "none"}
        transition="box-shadow 200ms ease"
      >
        <Flex
          maxW={PAGE_MAX_W}
          mx="auto"
          px={sectionPx}
          py="8px"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo: sun icon + "rengo" lowercase */}
          <Flex
            as="button"
            gap="4px"
            alignItems="center"
            cursor="pointer"
            bg="transparent"
            border="none"
            p="0"
            color={logoColor}
            _hover={{ opacity: 0.8 }}
            transition="opacity 120ms ease"
            onClick={() => navigate("/next")}
          >
            <Box w="10px" h="10px" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
              <Sun size={10} />
            </Box>
            <Text
              fontFamily={F.sans}
              fontWeight="500"
              fontSize="16px"
              letterSpacing="-0.8px"
              lineHeight="1"
              color="inherit"
            >
              rengo
            </Text>
          </Flex>

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
            borderRadius="4px"
            h="24px"
            px="8px"
            cursor="pointer"
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            _hover={{ opacity: 0.85 }}
            transition="opacity 120ms ease"
          >
            <Text fontFamily={F.sans} fontSize="14px" lineHeight="1" color="white" whiteSpace="nowrap">
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
            color={logoColor}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Box>
        </Flex>
      </Box>

      {/* Mobile slide-down menu — starts just below the floating pill */}
      {menuOpen && (
        <Box
          position="fixed"
          top="72px" left="8px" right="8px"
          zIndex={999}
          display={{ base: "block", md: "none" }}
          bg={navBg}
          backdropFilter="blur(12px)"
          borderWidth="1px"
          borderColor={borderCol}
          borderRadius="6px"
          boxShadow="0 4px 16px rgba(36,49,85,0.1)"
        >
          <Box maxW={PAGE_MAX_W} mx="auto" px={sectionPx} py="8px" display="flex" flexDir="column">
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
                    ? (darkNav ? "white"  : C.indigo2)
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
              borderRadius="4px"
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
