import { rootRoute } from "@/app/app-routes";
import { Section } from "@/components/layout/section";
import { Logo } from "@/components/logo/logo";
import { GRAIN_TILE, hoverFade } from "@/components/site/site-styles";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

const RouterLink = chakra(Link);

const LINKS = [
  { label: "Blog", to: rootRoute({}).blog({}).$ },
  { label: "Careers", to: rootRoute({}).careers({}).$ },
  { label: "Privacy", to: rootRoute({}).legal({}).privacyPolicy({}).$ },
  { label: "Terms", to: rootRoute({}).legal({}).termsOfService({}).$ },
];

/**
 * Closing band: the wordmark, the links and the copyright. On phones they
 * stack in a left-aligned column; from tablets up they sit in one row,
 * spread across the band and centred on each other.
 */
export const SiteFooter: React.FC = () => (
  <Section
    as="footer"
    rhythm="none"
    // One slim row, like ode.com's 86px band: 20px above and below the
    // links' 44px tap height.
    py={{ base: "32px", md: "20px" }}
    bg="site.bg.footer"
    // The hero's grain.
    bgImage={GRAIN_TILE}
    bgSize="200px 200px"
    borderTop="1px solid"
    // The nav's hairline.
    borderTopColor="site.border"
  >
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent={{ md: "space-between" }}
      gap={{ base: "16px", md: "gridGutter" }}
    >
      <Link
        to={rootRoute({}).$}
        aria-label="Rengo AI home"
        style={{ display: "flex", textDecoration: "none" }}
      >
        <Logo color="indigo.900" />
      </Link>
      <chakra.nav aria-label="Footer">
        <chakra.ul
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          // The links' 44px tap height spaces them on phones.
          gap={{ base: 0, md: "20px" }}
        >
          {LINKS.map((link) => (
            <chakra.li key={link.label}>
              <RouterLink
                to={link.to}
                // 44px tall, a comfortable tap target, whatever the text.
                display="inline-flex"
                alignItems="center"
                minH="44px"
                textStyle="body.sm"
                letterSpacing="0"
                lineHeight="1.5"
                color="site.fg"
                whiteSpace="nowrap"
                cursor="pointer"
                {...hoverFade}
              >
                {link.label}
              </RouterLink>
            </chakra.li>
          ))}
        </chakra.ul>
      </chakra.nav>
      <Text textStyle="label" color="site.fg" whiteSpace="nowrap">
        © 2026 Rengo AI, Inc.
      </Text>
    </Box>
  </Section>
);
