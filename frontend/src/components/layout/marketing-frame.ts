/** Side ruled gutters on md+ (inside the capped marketing frame). */
export const MARKETING_GUTTER_WIDTH = "80px";

/**
 * Width of the center column between ruled gutters — Mintlify
 * `--grid-max-width` (1088px).
 */
export const MARKETING_CONTENT_WIDTH = "1088px";

/**
 * Max width of the full frame (gutters + center column). Keeps the **1088px**
 * content band while leaving room for 80px ruled gutters on each side.
 */
export const MARKETING_MAX_FRAME_WIDTH = "1248px";

/**
 * Horizontal inset from the viewport — Mintlify `--grid-margin`
 * (16px base, 32px from `lg` / 64rem).
 */
export const marketingPageMarginX = { base: 4, lg: 8 } as const;

/**
 * Mintlify `px-7` (28px) — horizontal inset for section body content from the
 * content column rim (between ruled gutters).
 */
export const marketingContentPaddingX = { base: 7, md: 7 } as const;

/**
 * Hairlines for nav, ruled frame gutters, and section dividers — between
 * `slate.20` and {@link marketingCardBorderColor} on `slate.10` surfaces.
 */
export const marketingLayoutBorderColor = "slate.25";

/** Bento tiles, cards, and other boxed content on marketing pages. */
export const marketingCardBorderColor = "slate.30";

/**
 * Section headings: pull the title block to the content rim so the accent
 * stays flush with the left border (independent of title text inset below).
 */
export const sectionHeadingMarginLeft = {
  /** Mobile shell has `border-left`; sit accent on that line. */
  base: "calc(-1 * var(--chakra-spacing-7) - 1px)",
  md: -marketingContentPaddingX.md,
} as const;

/**
 * Title text inset after the rim accent — larger than body padding so headings
 * breathe more while the accent remains on the column border.
 */
export const sectionHeadingTextPl = { base: 9, md: 9 } as const;
