import { Box, type BoxProps } from "@chakra-ui/react";

import { C, PAGE_MAX_W, sectionPx, sectionPy } from "./new-site-tokens";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SectionLayoutProps {
  children: React.ReactNode;
  /** Semantic element for the outer box. Default: "section" */
  as?: any;
  /** Full-bleed background color on the outer box */
  bg?: string;
  /** Vertical padding on the center content box. Default: sectionPy */
  py?: any;
  /** Color of the 1px rail lines. Default: C.grey30 */
  railColor?: string;
  /** Draw a 1px top border on the outer box (horizontal section divider). Default: true */
  showTopBorder?: boolean;
  /** Show left/right spacers with vertical rail borders. Default: true */
  showRails?: boolean;
  /** Extra props forwarded to the outer full-bleed Box (can override any default) */
  outerProps?: BoxProps;
  /** Extra props forwarded to the center content Box (can override py/px) */
  contentProps?: BoxProps;
}

// ─── SectionLayout ────────────────────────────────────────────────────────────
/**
 * Three-column section shell that implements the page grid-line system:
 *
 *   ┌── outer (w=full, borderTop, bg) ──────────────────────────────────────┐
 *   │  ┌── inner row (maxW=PAGE_MAX_W, mx=auto, display=flex) ────────────┐ │
 *   │  │  [left spacer | border-right]  [content]  [right spacer | border-left]  │ │
 *   │  └──────────────────────────────────────────────────────────────────┘ │
 *   └────────────────────────────────────────────────────────────────────────┘
 *
 * - Spacer widths match `sectionPx` so content aligns with the nav bar exactly.
 * - Rail borders are hidden at `base` (mobile) and appear from `md` up.
 * - Set `showTopBorder={false}` on the first section (nav already provides the divider).
 * - Set `showRails={false}` for sections that only need horizontal lines (e.g. security badges).
 */
export function SectionLayout({
  children,
  as = "section",
  bg,
  py = sectionPy,
  railColor = C.grey30,
  showTopBorder = true,
  showRails = true,
  outerProps,
  contentProps,
}: SectionLayoutProps) {
  return (
    // Outer: full-bleed bg + horizontal top divider
    <Box
      as={as}
      w="full"
      bg={bg}
      {...(showTopBorder
        ? { borderTopWidth: "1px", borderTopColor: railColor }
        : {})}
      {...outerProps}
    >
      {/* Inner row: constrained width, flex so spacers sit alongside content */}
      <Box maxW={PAGE_MAX_W} mx="auto" display="flex" alignItems="stretch">

        {/* Left spacer — carries the vertical left rail */}
        {showRails && (
          <Box
            flexShrink={0}
            w={sectionPx}
            borderRightWidth={{ base: "0", md: "1px" } as any}
            borderRightColor={railColor}
            aria-hidden={true}
          />
        )}

        {/* Center content — no border, no extra x-padding when rails are on */}
        <Box
          flex="1 0 0"
          minW="0"
          py={py}
          {...(!showRails ? { px: sectionPx } : {})}
          {...contentProps}
        >
          <Box p="1.25rem">
            {children}
          </Box>
        </Box>

        {/* Right spacer — carries the vertical right rail */}
        {showRails && (
          <Box
            flexShrink={0}
            w={sectionPx}
            borderLeftWidth={{ base: "0", md: "1px" } as any}
            borderLeftColor={railColor}
            aria-hidden={true}
          />
        )}

      </Box>
    </Box>
  );
}
