/** Fixed header height (56px row + 1px border). */
import { marketingControlBorderRadius } from "@/components/layout/marketing-frame";

export const TOP_NAV_HEIGHT = 57;

export const topNavRowProps = {
  py: 0,
  minH: "56px",
  h: "56px",
} as const;

/** Desktop nav links / dropdown triggers (14px medium, 4×10 padding, full 56px row). */
export const topNavLinkStyles = {
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "medium",
  lineHeight: "16px",
  h: "56px",
  minH: "56px",
  py: "4px",
  px: "10px",
  m: 0,
  borderRadius: 0,
} as const;

/** Header CTAs (14px, 8×14, 34px tall). */
export const topNavCtaStyles = {
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "medium",
  lineHeight: "16px",
  h: "34px",
  minH: "34px",
  px: "14px",
  py: "8px",
  m: 0,
  borderRadius: marketingControlBorderRadius,
} as const;
