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

/** Padding inside the center column (between ruled gutters on md+). */
export const marketingContentPaddingX = { base: 4, md: 5 } as const;
