import { defineTokens } from "@chakra-ui/react";
import { transparentize } from "color2k";

// Assuming colors is properly imported and contains token values
// Note: You'll need to adjust the import and reference accordingly

export const shadows = defineTokens.shadows({
  bottomBar: {
    value: "0px -2px 8px -2px rgba(16, 24, 40, 0.1)",
  },
  outline: {
    value: "inset 0 0 0 2px {colors.primary.200}",
  },
  press: {
    value: `inset 0px 4px 6px ${transparentize("#101828", 1 - 0.1)}`,
  },
  tableHover: {
    value: "0px 0px 8px 0px {colors.gray.200}",
  },
  tableHoverActive: {
    value: "0px 0px 8px 0px {colors.gray.100}",
  },
  tableHoverFocus: {
    value: "0px 0px 0px 2px {colors.primary.200}",
  },
  lg: {
    value:
      "0px 12px 16px -4px rgba(16, 24, 40, 0.05), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
  },
  xs: {
    value: "0px 1px 2px rgba(16, 24, 40, 0.05)",
  },
  xsFocusedPrimary100: {
    value: "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF",
  },
  // Modern shadow effects using theme colors
  glass: {
    value: "0 8px 32px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)",
  },
  modern: {
    value:
      "0 4px 20px rgba(16, 24, 40, 0.08), 0 1px 3px rgba(16, 24, 40, 0.04)",
  },
  modernHover: {
    value:
      "0 8px 30px rgba(16, 24, 40, 0.12), 0 2px 6px rgba(16, 24, 40, 0.06)",
  },
  elevated: {
    value:
      "0 10px 40px rgba(16, 24, 40, 0.1), 0 2px 8px rgba(16, 24, 40, 0.06)",
  },
  depth: {
    value:
      "0 25px 50px rgba(16, 24, 40, 0.15), 0 5px 15px rgba(16, 24, 40, 0.08)",
  },
  // Primary color glow effects
  primaryGlow: {
    value: "0 0 20px rgba(0, 120, 212, 0.3), 0 0 8px rgba(0, 120, 212, 0.1)",
  },
  primaryGlowHover: {
    value: "0 0 30px rgba(0, 120, 212, 0.4), 0 0 12px rgba(0, 120, 212, 0.15)",
  },
  // Success, warning, error glows
  successGlow: {
    value: "0 0 20px rgba(34, 197, 94, 0.3), 0 0 8px rgba(34, 197, 94, 0.1)",
  },
  warningGlow: {
    value: "0 0 20px rgba(247, 144, 9, 0.3), 0 0 8px rgba(247, 144, 9, 0.1)",
  },
  errorGlow: {
    value: "0 0 20px rgba(240, 68, 56, 0.3), 0 0 8px rgba(240, 68, 56, 0.1)",
  },
  // Soft inner shadows for glass effect
  innerGlass: {
    value:
      "inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
  },
});
