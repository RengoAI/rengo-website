import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const RouterLink = chakra(Link);

const LINKS = [
  { label: "Product", to: rootRoute({}).solutions({}).$ },
  { label: "Team", to: rootRoute({}).aboutV3({}).$ },
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
    // The use-case accordion's hover fill (silver 200).
    bg="site.bg.tint"
  >
    <Grid alignItems="center" rowGap={{ base: "32px", lg: "gridGutter" }}>
      <GridCol span={{ base: 16, lg: 4 }} display="flex" alignItems="center">
        <Text
          fontFamily="heading"
          fontSize="0.875rem"
          fontWeight={500}
          letterSpacing="-0.05em"
          lineHeight="1"
          textTransform="lowercase"
          color="site.fg"
          whiteSpace="nowrap"
        >
          rengo_ai
        </Text>
      </GridCol>
      <GridCol as="nav" aria-label="Footer" span={{ base: 16, lg: 8 }}>
        <chakra.ul
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent={{ base: "flex-start", lg: "center" }}
          gap={{ base: "12px", md: "24px" }}
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
                transition="opacity 150ms ease"
                _hover={{ opacity: 0.6 }}
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
          © 2026 Rengo AI
        </Text>
      </GridCol>
    </Grid>
  </Section>
);
