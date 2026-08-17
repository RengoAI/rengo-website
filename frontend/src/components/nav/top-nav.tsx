import { Logo } from "@/components/logo/logo";
import { MarketingCtaButton } from "@/components/ui/marketing-cta-button";
import { MobileNavDrawer } from "@/components/nav/mobile-nav-drawer";
import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
  marketingLayoutBorderColor,
} from "@/components/layout/marketing-frame";
import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import {
  TOP_NAV_HEIGHT,
  topNavCtaStyles,
  topNavRowProps,
} from "@/components/nav/nav-styles";
import { ResourcesNavMenu } from "@/components/nav/resources-nav-menu";
import { SolutionsNavMenu } from "@/components/nav/solutions-nav-menu";
import { COMPANY_LINKS } from "@/features/company/company-links";
import {
  SOLUTIONS_PATH,
  SOLUTION_CAPABILITIES,
} from "@/features/solutions/solutions";
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
      children: SOLUTION_CAPABILITIES.map((c) => ({
        label: c.title,
        path: `${SOLUTIONS_PATH}/${c.slug}`,
      })),
    },
    {
      label: "Resources",
      children: COMPANY_LINKS.map((link) => ({
        label: link.title,
        path: link.path,
      })),
    },
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
        borderColor={marketingLayoutBorderColor}
        bg="slate.10/90"
        style={{ transition: "background 200ms ease, border-color 200ms ease" }}
      >
        <MarketingPageWidth>
          <Flex w="full" align="stretch" {...topNavRowProps}>
            <Box
              display={{ base: "none", md: "block" }}
              w={MARKETING_GUTTER_WIDTH}
              flexShrink={0}
              borderRightWidth="1px"
              borderRightStyle="solid"
              borderRightColor={marketingLayoutBorderColor}
            />
            <Box
              flex="1"
              minW={0}
              px={marketingContentPaddingX}
              display="grid"
              gridTemplateColumns={{ base: "1fr auto", md: "1fr auto 1fr" }}
              alignItems="center"
            >
              <Flex justify="flex-start" minW={0}>
                <Logo color="indigo.900" homeLink />
              </Flex>

              <Flex
                as="nav"
                gap="6px"
                display={{ base: "none", md: "flex" }}
                align="center"
                justify="center"
              >
                <SolutionsNavMenu
                  navColor={navColor}
                  navHoverColor={navHoverColor}
                />
                <ResourcesNavMenu
                  navColor={navColor}
                  navHoverColor={navHoverColor}
                />
              </Flex>

              <Flex justify="flex-end" minW={0}>
                <Flex
                  gap="6px"
                  alignItems="center"
                  display={{ base: "none", md: "flex" }}
                >
                  <Button
                    variant="ghost"
                    color={navColor}
                    onClick={() =>
                      window.open("https://app.rengoai.com/", "_blank")
                    }
                    {...topNavCtaStyles}
                    h="34px"
                    minH="34px"
                    border="1px solid"
                    borderColor="slate.30"
                    _hover={{
                      bg: "transparent",
                      color: navHoverColor,
                      borderColor: "slate.40",
                    }}
                  >
                    Log in
                  </Button>
                  <MarketingCtaButton
                    size="sm"
                    onClick={() =>
                      window.open("mailto:sales@rengoai.com", "_blank")
                    }
                  >
                    Get Started
                  </MarketingCtaButton>
                </Flex>

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
            </Box>
            <Box
              display={{ base: "none", md: "block" }}
              w={MARKETING_GUTTER_WIDTH}
              flexShrink={0}
              borderLeftWidth="1px"
              borderLeftStyle="solid"
              borderLeftColor={marketingLayoutBorderColor}
            />
          </Flex>
        </MarketingPageWidth>
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
