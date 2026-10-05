import { Grid, type GridProps } from "@/components/layout/grid";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * A full-bleed horizontal band carrying the global gutters: 36px left/right,
 * 100px top/bottom.
 *
 * Every content section, the nav, and the footer sit in one of these so their
 * edges agree. Sections are intentionally full-width — the design has no
 * centered max-width column — so background colour can run edge to edge while
 * the content stays inset.
 *
 * Pass `grid` to put the children straight onto the 16-column grid.
 */
export type SectionProps = BoxProps & {
  /** Wrap children in the 16-column `Grid`. */
  grid?: boolean;
  /** Forwarded to the inner `Grid` when `grid` is set. */
  gridProps?: GridProps;
  /**
   * Vertical rhythm. `default` 100px, `tight` 80px, `compact` 60px, `none`
   * for bands that manage their own (the nav, the footer).
   */
  rhythm?: "default" | "tight" | "compact" | "none";
};

const RHYTHM = {
  default: "gutterY",
  tight: "gutterYTight",
  compact: "gutterYCompact",
  none: undefined,
} as const;

export const Section: React.FC<SectionProps> = ({
  grid = false,
  gridProps,
  rhythm = "default",
  children,
  ...rest
}) => (
  <Box as="section" w="full" px="gutter" py={RHYTHM[rhythm]} {...rest}>
    {grid ? <Grid {...gridProps}>{children}</Grid> : children}
  </Box>
);
