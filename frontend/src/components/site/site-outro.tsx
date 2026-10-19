import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { AutomataGrid } from "@/components/site/automata-grid";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { CTA_SHADOW } from "@/components/site/site-styles";
import { SolidCta } from "@/components/site/solid-cta";
import { prefersReducedMotion } from "@/shared/utils/motion";
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

/** The heading box's padding past the line, px. */
const OUTRO_HEADING_PAD_X = 24;
const OUTRO_HEADING_PAD_Y = 16;

const DEFAULT_HEADING = (
  <>
    Ready to make your data{" "}
    <Box as="span" color="site.highlight">
      your alpha?
    </Box>
  </>
);

/**
 * The closing band: a centred line and the Book a call button, over the
 * /solutions grid of squares running as a cellular automaton. The landing
 * ends on "Ready to make your data your alpha?". Careers uses the same band
 * as its hero.
 */
export const SiteOutro: React.FC<{
  /** Replaces the closing line. */
  heading?: React.ReactNode;
  /** `h1` when this band is the page hero. */
  headingAs?: "h1" | "h2";
  /** Button label. The landing books a call; careers jumps to the roles. */
  cta?: string;
  ctaHref?: string;
  /** Fill the viewport, the way the landing hero does. Careers uses this. */
  fill?: boolean;
}> = ({
  heading = DEFAULT_HEADING,
  headingAs = "h2",
  cta = "Book a call",
  ctaHref = CONTACT_HREF,
  fill = false,
}) => {
  // An in-page target scrolls into view instead of jumping. The landing
  // button is a mailto, so it is left alone.
  const scrollToTarget = (event: React.MouseEvent) => {
    if (!ctaHref.startsWith("#")) return;
    const target = document.querySelector(ctaHref);
    if (!(target instanceof HTMLElement)) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    history.pushState(null, "", ctaHref);
  };

  return (
    <Box
      as="section"
      position="relative"
      // The footer's grey, so the outro runs into it.
      bg="site.bg.footer"
      overflow="hidden"
      h={fill ? "100svh" : undefined}
      display={fill ? "flex" : undefined}
      alignItems={fill ? "center" : undefined}
      aria-labelledby="outro-heading"
    >
      <AutomataGrid />
      <Section
        as="div"
        rhythm="none"
        position="relative"
        zIndex={1}
        w={fill ? "full" : undefined}
        py={fill ? 0 : { base: "100px", md: "140px", lg: "188px" }}
      >
        <Grid>
          <GridCol
            span={16}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ base: "40px", md: "60px" }}
          >
            {/* On a box of the band's own grey, so no squares run behind
              the line. The negative margins take the padding back out, so
              the layout is unchanged. */}
            <Text
              as={headingAs}
              id="outro-heading"
              textStyle="d1"
              color="site.fg.strong"
              maxW={`calc(496px + ${2 * OUTRO_HEADING_PAD_X}px)`}
              textAlign="center"
              bg="site.bg.footer"
              borderRadius="4px"
              px={`${OUTRO_HEADING_PAD_X}px`}
              py={`${OUTRO_HEADING_PAD_Y}px`}
              mx={`-${OUTRO_HEADING_PAD_X}px`}
              my={`-${OUTRO_HEADING_PAD_Y}px`}
            >
              {heading}
            </Text>
            {/* The hero and nav button, larger and on soot: lightens to Sky
              on hover, its label turning dark. Hugs its
              label, a set 20px to the arrow. */}
            <SolidCta
              href={ctaHref}
              onClick={ctaHref.startsWith("#") ? scrollToTarget : undefined}
              display="flex"
              h="49px"
              px="16px"
              py="6px"
              bg="site.bg.darkRaised"
              boxShadow={CTA_SHADOW}
              labelProps={OUTRO_LABEL}
            >
              {cta}
            </SolidCta>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
