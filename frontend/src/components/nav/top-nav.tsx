import { Logo } from "@/components/logo/logo";
import { MobileNavDrawer } from "@/components/nav/mobile-nav-drawer";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TOP_NAV_HEIGHT = 64;

const NAVY = "#0C1D34";

const DARK_HERO_PATHS = ["/", "/security", "/careers", "/company", "/product/portfolio-monitoring"];

export const AppTopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkHero = DARK_HERO_PATHS.includes(location.pathname);
  const [overHero, setOverHero] = useState(isDarkHero);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setOverHero(isDarkHero);
    if (!isDarkHero) return;
    const onScroll = () =>
      setOverHero(window.scrollY < window.innerHeight - 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDarkHero]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navColor = overHero ? "whiteAlpha.900" : "gray.700";
  const navHoverColor = overHero ? "whiteAlpha.500" : NAVY;

  const navItems = [
    { label: "Product", path: "/product/portfolio-monitoring" },
    { label: "Security", path: "/security" },
    { label: "Company", path: "/company" },
  ];

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 20 }}
        py={2}
        borderBottom="1px solid"
        borderColor={overHero ? "whiteAlpha.100" : "border.muted"}
        bg={overHero ? NAVY : "white"}
        style={{ transition: "background 200ms ease, border-color 200ms ease" }}
      >
        <Logo color={overHero ? "white" : "primary.700"} homeLink />

        {/* Desktop nav */}
        <Flex as="nav" gap={1} display={{ base: "none", md: "flex" }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              color={navColor}
              _hover={{ bg: "transparent", color: navHoverColor }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Flex>

        {/* Desktop CTAs */}
        <Flex gap={2} alignItems="center" display={{ base: "none", md: "flex" }}>
          <Button
            variant="ghost"
            size="sm"
            color={navColor}
            _hover={{ bg: "transparent", color: navHoverColor }}
            onClick={() => window.open("https://app.rengoai.com/", "_blank")}
          >
            Log in
          </Button>
          <Button
            borderRadius="md"
            bg={overHero ? "white" : "primary.700"}
            color={overHero ? NAVY : "white"}
            size="sm"
            _hover={{ bg: overHero ? "gray.100" : "primary.800" }}
            onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
          >
            See a demo
          </Button>
        </Flex>

        {/* Mobile hamburger */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          variant="ghost"
          size="sm"
          color={overHero ? "white" : "gray.700"}
          _hover={{ bg: "transparent" }}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={22} />
        </IconButton>
      </Box>

      <MobileNavDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        navItems={navItems}
        onNavigate={(path) => navigate(path)}
      />
    </>
  );
};
