import { Grid, type GridProps } from "@/components/layout/grid";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * A full-bleed horizontal band carrying the global 36px gutter.
 *
 * Every content section, the nav, and the footer sit in one of these so their
 * left and right edges agree. Sections are intentionally full-width — the
 * design has no centered max-width column — so background colour can run edge
 * to edge while the content stays inset.
 *
 * Pass `grid` to put the children straight onto the 16-column grid.
 */
export type SectionProps = BoxProps & {
  /** Wrap children in the 16-column `Grid`. */
  grid?: boolean;
  /** Forwarded to the inner `Grid` when `grid` is set. */
  gridProps?: GridProps;
};

export const Section: React.FC<SectionProps> = ({
  grid = false,
  gridProps,
  children,
  ...rest
}) => (
  <Box as="section" w="full" px="gutter" {...rest}>
    {grid ? <Grid {...gridProps}>{children}</Grid> : children}
  </Box>
);
