/** Fixed header height (64px row + 0.5rem bottom padding + 1px border). */
import { marketingControlBorderRadius } from "@/components/layout/marketing-frame";

export const TOP_NAV_HEIGHT = 73;

export const topNavRowProps = {
  pt: 0,
  pb: "0.5rem",
  minH: "72px",
  h: "72px",
} as const;

/** Desktop nav links / dropdown triggers (14px light, 4×10 padding, full 64px row). */
export const topNavLinkStyles = {
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "light",
  lineHeight: "16px",
  h: "64px",
  minH: "64px",
  py: "4px",
  px: "10px",
  m: 0,
  borderRadius: 0,
} as const;

/** Header CTAs (14px, 8×14, 34px tall). */
export const topNavCtaStyles = {
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "light",
  lineHeight: "16px",
  h: "34px",
  minH: "34px",
  px: "14px",
  py: "8px",
  m: 0,
  borderRadius: marketingControlBorderRadius,
} as const;
