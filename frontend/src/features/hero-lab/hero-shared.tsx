import { NAV_H } from "@/components/site/site-constants";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/** Hero copy, shared verbatim so the four designs compare on form alone. */
export const HEADLINE = "Building your intelligent data layer";
export const DESCRIPTION =
  "We’re the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm’s knowledge.";

/** The blue underscore that closes the headline. */
export const Cursor: React.FC = () => (
  <Box as="span" color="site.highlight">
    _
  </Box>
);

/** Floor and ceiling on the hero's height, px. */
const HERO_MIN_H = 720;
const HERO_MAX_H = 940;

/** Extra height on the live /v3 hero, past one viewport. */
const UNDER_NAV_EXTRA = 40;

/**
 * Hero height: one viewport under the sticky nav, held between a floor that
 * keeps the art legible and a ceiling that keeps it from going sparse on
 * tall screens.
 *
 * `underNav` is for a hero that runs up behind an overlaid nav: taller by
 * the nav's height, so its copy sits as it did below the nav, plus
 * UNDER_NAV_EXTRA, which runs a little past the fold. `shorten` takes px off
 * the height, floor and ceiling alike.
 */
export const heroBox = (underNav = false, shorten = 0): BoxProps => {
  const h = underNav ? `100svh + ${UNDER_NAV_EXTRA}px` : `100svh - ${NAV_H}px`;
  const extra = (underNav ? NAV_H + UNDER_NAV_EXTRA : 0) - shorten;
  return {
    as: "section",
    position: "relative",
    h: shorten ? `calc(${h} - ${shorten}px)` : `calc(${h})`,
    minH: `${HERO_MIN_H + extra}px`,
    maxH: `${HERO_MAX_H + extra}px`,
    overflow: "hidden",
  };
};
