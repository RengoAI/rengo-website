import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { AutomataGrid } from "@/components/site/automata-grid";
import { CONTACT_HREF } from "@/features/hero-lab/hero-shared";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The closing "Ready to make your data your alpha?" band that every rebrand
 * page ends on, just above the footer. Behind the copy, across the whole
 * band, the /solutions grid of squares runs as a cellular automaton, with
 * new patches seeded sporadically.
 */
export const SiteOutro: React.FC = () => (
  <Box
    as="section"
    position="relative"
    bg="site.bg.surface"
    overflow="hidden"
    aria-labelledby="outro-heading"
  >
    <AutomataGrid />
    <Section
      as="div"
      rhythm="none"
      position="relative"
      zIndex={1}
      py={{ base: "100px", md: "140px", lg: "188px" }}
    >
      <Grid>
        <GridCol
          span={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={{ base: "40px", md: "60px" }}
        >
          <Text
            as="h2"
            id="outro-heading"
            textStyle="d1"
            color="site.fg.strong"
            maxW="496px"
            textAlign="center"
          >
            Ready to make your data{" "}
            <Box as="span" color="site.highlight">
              your alpha?
            </Box>
          </Text>
          <chakra.a
            href={CONTACT_HREF}
            display="flex"
            alignItems="center"
            h="49px"
            px="16px"
            py="6px"
            borderRadius="4px"
            className="group"
            bg="site.bg.darkRaised"
            cursor="pointer"
            transition="background 150ms ease"
            // Like the hero and nav buttons: lightens to the footer's
            // silver on hover, its label turning dark.
            _hover={{ bg: "site.bg.tint" }}
          >
            {/* Hugs its label: a set 20px to the arrow, about half the
                  gap the old fixed 206px width left. */}
            <ArrowLink
              gap="20px"
              fontSize="1.25rem"
              fontWeight={300}
              lineHeight="21px"
              letterSpacing="0"
              color="canvas.50"
              transition="color 150ms ease"
              _groupHover={{ color: "site.fg.strong" }}
            >
              Get in touch
            </ArrowLink>
          </chakra.a>
        </GridCol>
      </Grid>
    </Section>
  </Box>
);
