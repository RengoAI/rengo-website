import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Logo } from "@/components/logo/logo";
import { hoverFade } from "@/components/site/site-styles";
import { chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const RouterLink = chakra(Link);

const LINKS = [
  { label: "Careers", to: rootRoute({}).careers({}).$ },
  { label: "Privacy", to: rootRoute({}).legal({}).privacyPolicy({}).$ },
  { label: "Terms", to: rootRoute({}).legal({}).termsOfService({}).$ },
];

/**
 * Closing band. On the same 16-column grid as the nav and the sections.
 * Below `lg` the wordmark, links and copyright stack vertically.
 */
export const SiteFooter: React.FC = () => (
  <Section
    as="footer"
    rhythm="none"
    py={{ base: "64px", md: "80px", lg: "110px" }}
    bg="site.bg.footer"
    borderTop="1px solid"
    borderTopColor="border.muted"
  >
    <Grid alignItems="center" rowGap={{ base: "32px", lg: "gridGutter" }}>
      <GridCol span={{ base: 16, lg: 4 }} display="flex" alignItems="center">
        <Link
          to={rootRoute({}).$}
          aria-label="Rengo AI home"
          style={{ display: "flex", textDecoration: "none" }}
        >
          <Logo color="indigo.900" />
        </Link>
      </GridCol>
      <GridCol as="nav" aria-label="Footer" span={{ base: 16, lg: 8 }}>
        <chakra.ul
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gap={{ base: "12px", md: "20px" }}
        >
          {LINKS.map((link) => (
            <chakra.li key={link.label}>
              <RouterLink
                to={link.to}
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
      </GridCol>
      <GridCol
        span={{ base: 16, lg: 4 }}
        display="flex"
        justifyContent={{ base: "flex-start", lg: "flex-end" }}
      >
        <Text textStyle="label" color="site.fg" whiteSpace="nowrap">
          © 2026 Rengo AI, Inc.
        </Text>
      </GridCol>
    </Grid>
  </Section>
);
