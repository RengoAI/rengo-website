import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { DotAutomata } from "@/components/site/dot-automata";
import { DotSheet } from "@/components/site/mesh-field";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const OUTRO_DOT = "#E1E7EF";

/**
 * The closing "Ready to make your data your alpha?" band that every rebrand
 * page ends on, just above the footer. Over its dot sheet, clusters of the
 * hero's dots and squares grow, run a cellular automaton and fade
 * (`DotAutomata`), keeping clear of the headline and button.
 */
export const SiteOutro: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Box
      ref={ref}
      as="section"
      position="relative"
      bg="site.bg.surface"
      overflow="hidden"
      aria-labelledby="outro-heading"
    >
      {/* On the plain surface the sheet's blend would wash out, so its dots
        are drawn straight, in the pale blue-grey they read as on silver. */}
      <DotSheet dot={OUTRO_DOT} />
      <DotAutomata avoid={ref} />
      <Section
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
              id="outro-heading"
              textStyle="d1"
              color="site.fg.strong"
              maxW="496px"
              textAlign="center"
              data-automata-avoid
            >
              Ready to make your data{" "}
              <Box as="span" color="site.accent">
                your alpha?
              </Box>
            </Text>
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="206px"
              h="49px"
              px="12px"
              py="6px"
              borderRadius="4px"
              className="group"
              bg="site.bg.darkRaised"
              cursor="pointer"
              transition="background 150ms ease"
              // Like the hero and nav buttons: lightens to the footer's
              // silver on hover, its label turning dark.
              _hover={{ bg: "site.bg.tint" }}
              data-automata-avoid
            >
              <ArrowLink
                w="full"
                justifyContent="space-between"
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
            </Box>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
