import { GRID_COLUMNS } from "@/theme/tokens/layout";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * The 16-column site grid.
 *
 * Anything that needs to line up with the rest of the page goes inside a
 * `Grid` and claims its width with `GridCol span=`, rather than setting its
 * own width. Pair with `Section` for the horizontal gutter:
 *
 * ```tsx
 * <Section grid>
 *   <GridCol span={{ base: 16, md: 12 }}>…</GridCol>
 *   <GridCol span={{ base: 16, md: 4 }}>…</GridCol>
 * </Section>
 * ```
 */
export type GridProps = BoxProps;

export const Grid: React.FC<GridProps> = ({ children, ...rest }) => (
  <Box
    display="grid"
    gridTemplateColumns={`repeat(${GRID_COLUMNS}, minmax(0, 1fr))`}
    gap="gridGutter"
    w="full"
    {...rest}
  >
    {children}
  </Box>
);

/** A column count, either flat or per-breakpoint. */
type Span =
  | number
  | Partial<Record<"base" | "sm" | "md" | "lg" | "xl", number>>;

/**
 * `span N` alone leaves the implicit start line in place, which lets an item
 * auto-place after its sibling. The `/ span N` half pins the size so a item
 * never gets stretched to fill a trailing gap.
 */
const spanValue = (n: number) => `span ${n} / span ${n}`;

const toGridColumn = (span: Span) =>
  typeof span === "number"
    ? spanValue(span)
    : Object.fromEntries(
        Object.entries(span).map(([breakpoint, n]) => [
          breakpoint,
          spanValue(n),
        ]),
      );

export type GridColProps = Omit<BoxProps, "gridColumn"> & {
  /** Columns to occupy, out of 16. Defaults to the full width. */
  span?: Span;
  /** 1-indexed column to start at. Omit to auto-place. */
  start?: BoxProps["gridColumnStart"];
};

export const GridCol: React.FC<GridColProps> = ({
  span = GRID_COLUMNS,
  start,
  children,
  ...rest
}) => (
  <Box gridColumn={toGridColumn(span)} gridColumnStart={start} {...rest}>
    {children}
  </Box>
);
