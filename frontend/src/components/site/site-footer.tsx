import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { chakra, Text } from "@chakra-ui/react";
import React from "react";

const LINKS = ["Product", "Team", "Privacy", "Terms"];

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
    borderWidth="1px"
    borderStyle="solid"
    borderColor="site.border"
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
      <GridCol
        as="ul"
        listStyleType="none"
        span={{ base: 16, lg: 8 }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent={{ base: "flex-start", lg: "center" }}
        gap={{ base: "12px", md: "24px" }}
      >
        {LINKS.map((link) => (
          <chakra.li key={link}>
            <chakra.a
              href="#"
              textStyle="body.sm"
              letterSpacing="0"
              lineHeight="1.5"
              color="site.fg"
              whiteSpace="nowrap"
              cursor="pointer"
              transition="opacity 150ms ease"
              _hover={{ opacity: 0.6 }}
            >
              {link}
            </chakra.a>
          </chakra.li>
        ))}
      </GridCol>
      <GridCol
        span={{ base: 16, lg: 4 }}
        display="flex"
        justifyContent={{ base: "flex-start", lg: "flex-end" }}
      >
        <Text textStyle="mono" color="site.fg" whiteSpace="nowrap">
          © 2026 Rengo AI
        </Text>
      </GridCol>
    </Grid>
  </Section>
);
