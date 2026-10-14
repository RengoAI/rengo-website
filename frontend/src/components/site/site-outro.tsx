import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { AutomataGrid } from "@/components/site/automata-grid";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** The CTA's label, a size up from the other buttons'. */
const OUTRO_LABEL = {
  fontSize: "1.25rem",
  lineHeight: "21px",
  letterSpacing: "0",
  color: "canvas.50",
  _hover: { opacity: 0.65 },
} as const;

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
    // The footer's grey, so the outro runs into it.
    bg="site.bg.footer"
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
          {/* The hero and nav button, larger and on soot: lightens to the
              footer's silver on hover, its label turning dark. Hugs its
              label, a set 20px to the arrow. */}
          <SolidCta
            href={CONTACT_HREF}
            display="flex"
            h="49px"
            px="16px"
            py="6px"
            bg="site.bg.darkRaised"
            labelProps={OUTRO_LABEL}
          >
            Get in touch
          </SolidCta>
        </GridCol>
      </Grid>
    </Section>
  </Box>
);
