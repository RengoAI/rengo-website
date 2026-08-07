import { ctaButtonHoverProps } from "@/components/ui/button-arrow-label";
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

export const AppTopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Every marketing hero is light under the refresh, so the nav no longer
  // swaps treatments per route.
  const navColor = "indigo.900";
  const navHoverColor = "indigo.700";

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
        borderColor="slate.30"
        bg="slate.10"
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
            <Logo color="indigo.900" homeLink />

            {/* Desktop nav */}
            <Flex
              as="nav"
              gap="6px"
              display={{ base: "none", md: "flex" }}
              align="center"
            >
              <SolutionsNavMenu
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
                onClick={() =>
                  window.open("https://app.rengoai.com/", "_blank")
                }
                {...topNavCtaStyles}
                h="34px"
                minH="34px"
              >
                Log in
              </Button>
              <Button
                bg="indigo.900"
                color="slate.10"
                onClick={() =>
                  window.open("mailto:sales@rengoai.com", "_blank")
                }
                {...topNavCtaStyles}
                borderRadius={0}
                {...ctaButtonHoverProps}
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
              color="indigo.900"
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
