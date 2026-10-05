import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { chakra, Text } from "@chakra-ui/react";
import React from "react";

const LINKS = ["Product", "Solutions", "Team", "Privacy", "Terms"];

/** Closing band. On the same 16-column grid as the nav and the sections. */
export const SiteFooter: React.FC = () => (
  <Section
    as="footer"
    rhythm="none"
    py="110px"
    bg="site.bg.footer"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="site.border"
  >
    <Grid alignItems="center">
      <GridCol span={4} display="flex" alignItems="center">
        <Text
          fontFamily="heading"
          fontSize="0.875rem"
          fontWeight={500}
          letterSpacing="-0.05em"
          lineHeight="1"
          textTransform="lowercase"
          color="site.fg.DEFAULT"
          whiteSpace="nowrap"
        >
          rengo_ai
        </Text>
      </GridCol>
      <GridCol
        span={8}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        gap="24px"
      >
        {LINKS.map((link) => (
          <chakra.a
            key={link}
            href="#"
            textStyle="body.sm"
            letterSpacing="0"
            lineHeight="1.5"
            color="site.fg.DEFAULT"
            whiteSpace="nowrap"
            cursor="pointer"
            transition="opacity 150ms ease"
            _hover={{ opacity: 0.6 }}
          >
            {link}
          </chakra.a>
        ))}
      </GridCol>
      <GridCol span={4} display="flex" justifyContent="flex-end">
        <Text textStyle="mono" color="site.fg.DEFAULT" whiteSpace="nowrap">
          © 2026 Rengo AI
        </Text>
      </GridCol>
    </Grid>
  </Section>
);
