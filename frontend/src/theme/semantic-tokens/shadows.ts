import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticShadows = defineSemanticTokens.shadows({
  // Modern shadow effects for different elevations
  modern: {
    sm: {
      value: {
        _light: "{shadows.modern}",
        _dark: "{shadows.modern}",
      },
    },
    md: {
      value: {
        _light: "{shadows.modernHover}",
        _dark: "{shadows.modernHover}",
      },
    },
    lg: {
      value: {
        _light: "{shadows.elevated}",
        _dark: "{shadows.elevated}",
      },
    },
    xl: {
      value: {
        _light: "{shadows.depth}",
        _dark: "{shadows.depth}",
      },
    },
  },

  // Glass morphism effects
  glass: {
    surface: {
      value: {
        _light: "{shadows.glass}",
        _dark: "{shadows.glass}",
      },
    },
    inner: {
      value: {
        _light: "{shadows.innerGlass}",
        _dark: "{shadows.innerGlass}",
      },
    },
  },

  // Color-specific glows
  glow: {
    primary: {
      value: {
        _light: "{shadows.primaryGlow}",
        _dark: "{shadows.primaryGlow}",
      },
    },
    primaryHover: {
      value: {
        _light: "{shadows.primaryGlowHover}",
        _dark: "{shadows.primaryGlowHover}",
      },
    },
    success: {
      value: {
        _light: "{shadows.successGlow}",
        _dark: "{shadows.successGlow}",
      },
    },
    warning: {
      value: {
        _light: "{shadows.warningGlow}",
        _dark: "{shadows.warningGlow}",
      },
    },
    error: {
      value: {
        _light: "{shadows.errorGlow}",
        _dark: "{shadows.errorGlow}",
      },
    },
  },
});
