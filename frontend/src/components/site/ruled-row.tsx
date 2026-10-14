import { Grid, type GridProps } from "@/components/layout/grid";
import { dottedTop } from "@/components/site/site-styles";
import React from "react";

/**
 * The rows' dotted rules: silver 250, between the site default (silver 300)
 * and silver 200.
 */
export const RULED_ROW_RULE = "site.border.dashedSubtle";

/**
 * One row of a ruled list: a row on the 16-column grid, hung off a dotted
 * rule along its top edge, that tints on hover. Stacked, the rules read as
 * one ruled block. The use-case accordion and the careers roles share it.
 */
export const RuledRow: React.FC<GridProps> = (props) => (
  <Grid
    rowGap="12px"
    py="24px"
    {...dottedTop(RULED_ROW_RULE)}
    transition="background 150ms ease"
    _hover={{ bg: "site.bg.tint" }}
    {...props}
  />
);
