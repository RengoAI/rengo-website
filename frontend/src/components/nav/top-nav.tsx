import { Logo } from "@/components/logo/logo";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const TOP_NAV_HEIGHT = 64;

const NAVY = "#0C1D34";

const DARK_HERO_PATHS = ["/", "/security", "/careers", "/company", "/product/portfolio-monitoring"];

export const AppTopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkHero = DARK_HERO_PATHS.includes(location.pathname);
  const [overHero, setOverHero] = useState(isDarkHero);

  useEffect(() => {
    setOverHero(isDarkHero);
    if (!isDarkHero) return;
    const onScroll = () =>
      setOverHero(window.scrollY < window.innerHeight - 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDarkHero]);

  const navColor = overHero ? "whiteAlpha.900" : "gray.700";
  const navHoverColor = overHero ? "whiteAlpha.500" : NAVY;

  return (
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
      px={20}
      py={2}
      borderBottom="1px solid"
      borderColor={overHero ? "whiteAlpha.100" : "border.muted"}
      bg={overHero ? NAVY : "white"}
      style={{ transition: "background 200ms ease, border-color 200ms ease" }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo color={overHero ? "white" : "primary.700"} />
      </Link>

      <Flex as="nav" gap={1}>
        <Button
          variant="ghost"
          size="sm"
          color={navColor}
          _hover={{ bg: "transparent", color: navHoverColor }}
        >
          Product
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color={navColor}
          _hover={{ bg: "transparent", color: navHoverColor }}
          onClick={() => navigate("/security")}
        >
          Security
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color={navColor}
          _hover={{ bg: "transparent", color: navHoverColor }}
          onClick={() => navigate("/company")}
        >
          Company
        </Button>
      </Flex>

      <Flex gap={2} alignItems="center">
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
    </Box>
  );
};
