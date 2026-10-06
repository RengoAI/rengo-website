import {
  GRID_COLUMNS,
  GRID_GUTTER,
  SECTION_GUTTER,
} from "@/theme/tokens/layout";

/**
 * The 16-column grid, as numbers, so procedural art can register against the
 * same column lines the DOM uses. Valid for anything that spans the full
 * width of a `Section` — i.e. a full-bleed canvas behind the hero.
 */
const INSET = parseFloat(SECTION_GUTTER);
const GAP = parseFloat(GRID_GUTTER);

export type GridGeometry = {
  /** Width of one column, excluding the gutter. */
  colW: number;
  /** Column plus gutter — the repeat distance of the grid. */
  pitch: number;
  /** Left edge of column `c` (1-indexed). `c = 17` is the right edge + gap. */
  colLeft: (c: number) => number;
  /** Centre of the gutter *before* column `c` — the line between columns. */
  seam: (c: number) => number;
  inset: number;
  gap: number;
};

export const gridGeometry = (width: number): GridGeometry => {
  const pitch = (width - INSET * 2 + GAP) / GRID_COLUMNS;
  const colLeft = (c: number) => INSET + pitch * (c - 1);
  return {
    colW: pitch - GAP,
    pitch,
    colLeft,
    seam: (c) => colLeft(c) - GAP / 2,
    inset: INSET,
    gap: GAP,
  };
};

/**
 * The same `colLeft`, as a CSS length, for absolutely positioned DOM
 * annotations that have to sit on a column line drawn by a canvas.
 */
export const cssColLeft = (c: number) =>
  `calc(${SECTION_GUTTER} + (100% - ${INSET * 2}px + ${GRID_GUTTER}) * ${
    (c - 1) / GRID_COLUMNS
  })`;
