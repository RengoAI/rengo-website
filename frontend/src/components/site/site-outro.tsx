import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { AutomataGrid } from "@/components/site/automata-grid";
import { CONTACT_HREF, NAV_H } from "@/components/site/site-constants";
import { SolidCta } from "@/components/site/solid-cta";
import { SCREEN_WASH } from "@/components/site/site-wash";
import { prefersReducedMotion } from "@/shared/utils/motion";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** The heading box's padding past the line, px. */
const OUTRO_HEADING_PAD_X = 24;
const OUTRO_HEADING_PAD_Y = 16;

const DEFAULT_HEADING = (
  <>
    Ready to make your data{" "}
    <Box as="span" color="site.highlight" whiteSpace="nowrap">
      your alpha?
    </Box>
  </>
);

/**
 * The closing band: a centred line and the Book a call button, over the
 * /solutions grid of squares running as a cellular automaton, or, on the
 * company pages, the site's colour wash. The landing ends on "Ready to make
 * your data your alpha?" over the automaton. Careers uses the same band as
 * its hero, over the wash.
 */
export const SiteOutro: React.FC<{
  /** Replaces the closing line. */
  heading?: React.ReactNode;
  /** `h1` when this band is the page hero. */
  headingAs?: "h1" | "h2";
  /** Button label. The landing books a call; careers jumps to the roles. */
  cta?: string;
  ctaHref?: string;
  /**
   * Fill the viewport, the way the landing hero does: `true` when the band
   * sits under the overlaid nav at the top of the page (careers), or
   * "below-nav" when it's scrolled to under the sticky nav (the landing's
   * close), so it fills the screen left under the bar.
   */
  fill?: boolean | "below-nav";
  /**
   * What's behind the line: the automaton (the product's voice, the
   * default) or the colour wash the blog uses (the company pages').
   */
  backdrop?: "automata" | "wash";
}> = ({
  heading = DEFAULT_HEADING,
  headingAs = "h2",
  cta = "Book a call",
  ctaHref = CONTACT_HREF,
  fill = false,
  backdrop = "automata",
}) => {
  const wash = backdrop === "wash";
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
      // The footer's grey, so the outro runs into it; or the wash.
      {...(wash ? SCREEN_WASH : { bg: "site.bg.footer" })}
      overflow="hidden"
      // A minimum, so content still fits on a very short screen.
      minH={
        fill === "below-nav"
          ? `calc(100svh - ${NAV_H}px)`
          : fill
            ? "100svh"
            : undefined
      }
      display={fill ? "flex" : undefined}
      alignItems={fill ? "center" : undefined}
      aria-labelledby="outro-heading"
    >
      {!wash && <AutomataGrid />}
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
            // The heading box overlaps 16px of this; with the line's own
            // leading, the button sits about 20px under the letters.
            gap="24px"
          >
            {/* On a box of the band's own grey, so no squares run behind
              the line. The negative margins take the padding back out, so
              the layout is unchanged. */}
            <Text
              as={headingAs}
              id="outro-heading"
              textStyle="d1"
              // d2's 40px on tablets, a size under d1's 60px; d1 from lg.
              fontSize={{ base: "2.5rem", md: "2.5rem", lg: "3.75rem" }}
              color="site.fg.strong"
              maxW={`calc(496px + ${2 * OUTRO_HEADING_PAD_X}px)`}
              textAlign="center"
              // Masks the squares behind the line; the wash needs no mask.
              bg={wash ? "transparent" : "site.bg.footer"}
              borderRadius="4px"
              px={`${OUTRO_HEADING_PAD_X}px`}
              py={`${OUTRO_HEADING_PAD_Y}px`}
              mx={`-${OUTRO_HEADING_PAD_X}px`}
              my={`-${OUTRO_HEADING_PAD_Y}px`}
            >
              {heading}
            </Text>
            {/* The hero's button, exactly: the site has one button, flat and
              compact like the app's. */}
            <SolidCta
              href={ctaHref}
              onClick={ctaHref.startsWith("#") ? scrollToTarget : undefined}
              h="27px"
              labelProps={{ gap: "8px" }}
            >
              {cta}
            </SolidCta>
          </GridCol>
        </Grid>
      </Section>
    </Box>
  );
};
