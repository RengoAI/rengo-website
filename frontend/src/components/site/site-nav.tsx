import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";

const LINKS = ["Solutions", "Resources", "Team"];

/**
 * Sticky top bar. Sits on the same 16-column grid as every content band, so
 * the wordmark lines up with the left edge of the sections below it.
 */
export const SiteNav: React.FC = () => (
  <Section
    as="nav"
    rhythm="none"
    position="sticky"
    top={0}
    zIndex={10}
    bg="site.bg.surface"
    backdropFilter="blur(2px)"
    py="16px"
    minH="52px"
  >
    <Grid alignItems="center">
      <GridCol span={12} display="flex" alignItems="center" gap="40px" minW={0}>
        <Text
          fontFamily="heading"
          fontSize="0.875rem"
          fontWeight={500}
          letterSpacing="-0.05em"
          lineHeight="1"
          textTransform="lowercase"
          color="site.fg.strong"
          whiteSpace="nowrap"
        >
          rengo_ai
        </Text>
        <Box display="flex" alignItems="center" gap="20px">
          {LINKS.map((link) => (
            <chakra.a
              key={link}
              href="#"
              textStyle="label"
              fontWeight={500}
              letterSpacing="0"
              textTransform="capitalize"
              color="site.fg.strong"
              whiteSpace="nowrap"
              cursor="pointer"
              transition="opacity 150ms ease"
              _hover={{ opacity: 0.6 }}
            >
              {link}
            </chakra.a>
          ))}
        </Box>
      </GridCol>
      <GridCol span={4} display="flex" justifyContent="flex-end">
        <ArrowLink
          href="#"
          color="site.fg.strong"
          letterSpacing="-0.01em"
          lineHeight="1.2"
        >
          Get started
        </ArrowLink>
      </GridCol>
    </Grid>
  </Section>
);
