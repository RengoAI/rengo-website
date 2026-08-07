import { rootRoute } from "@/app/app-routes";
import { Logo } from "@/components/logo/logo";
import { MobileNavDrawer } from "@/components/nav/mobile-nav-drawer";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import {
  TOP_NAV_HEIGHT,
  topNavCtaStyles,
  topNavLinkStyles,
  topNavRowProps,
} from "@/components/nav/nav-styles";
import { SolutionsNavMenu } from "@/components/nav/solutions-nav-menu";
import { SOLUTIONS } from "@/features/solutions/solutions";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export { TOP_NAV_HEIGHT };

// The landing hero is light under the marketing refresh, so `/` is
// deliberately absent here — it uses the light nav treatment instead.
const DARK_HERO_PATHS = [
  rootRoute({}).careers({}).$,
  rootRoute({}).company({}).$,
  ...SOLUTIONS.map((solution) => solution.path),
];

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
      setOverHero(window.scrollY < window.innerHeight - TOP_NAV_HEIGHT);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDarkHero]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navColor = overHero ? "whiteAlpha.900" : "indigo.900";
  const navHoverColor = overHero ? "whiteAlpha.500" : "indigo.700";

  const navItems = [
    {
      label: "Solutions",
      children: SOLUTIONS.map((solution) => ({
        label: solution.title,
        path: solution.path,
        description: solution.description,
        icon: solution.icon,
      })),
    },
    { label: "Company", path: rootRoute({}).company({}).$ },
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
        borderBottom="1px solid"
        borderColor={overHero ? "whiteAlpha.100" : "slate.30"}
        bg={overHero ? "primary.800" : "slate.10"}
        style={{ transition: "background 200ms ease, border-color 200ms ease" }}
      >
        <Flex w="full" align="stretch" {...topNavRowProps}>
          <Box
            display={{ base: "none", md: "block" }}
            w={MARKETING_GUTTER_WIDTH}
            flexShrink={0}
          />
          <Flex
            flex="1"
            minW={0}
            px={marketingContentPaddingX}
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo color={overHero ? "white" : "indigo.900"} homeLink />

            {/* Desktop nav */}
            <Flex
              as="nav"
              gap="6px"
              display={{ base: "none", md: "flex" }}
              align="center"
            >
              <SolutionsNavMenu
                overHero={overHero}
                navColor={navColor}
                navHoverColor={navHoverColor}
              />
              <Button
                variant="ghost"
                color={navColor}
                _hover={{ bg: "transparent", color: navHoverColor }}
                onClick={() => navigate(rootRoute({}).company({}).$)}
                {...topNavLinkStyles}
              >
                Company
              </Button>
            </Flex>

            {/* Desktop CTAs */}
            <Flex
              gap="6px"
              alignItems="center"
              display={{ base: "none", md: "flex" }}
            >
              <Button
                variant="ghost"
                color={navColor}
                _hover={{ bg: "transparent", color: navHoverColor }}
                onClick={() => window.open("https://app.rengoai.com/", "_blank")}
                {...topNavCtaStyles}
                h="34px"
                minH="34px"
              >
                Log in
              </Button>
              <Button
                bg={overHero ? "white" : "indigo.900"}
                color={overHero ? "primary.800" : "slate.10"}
                _hover={{ bg: overHero ? "gray.100" : "indigo.700" }}
                onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
                {...topNavCtaStyles}
                borderRadius={0}
              >
                Get Started
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
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
            w={MARKETING_GUTTER_WIDTH}
            flexShrink={0}
          />
        </Flex>
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
