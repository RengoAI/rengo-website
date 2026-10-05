import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: {
      value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
    },
    surface: {
      value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
    },
    extraSubtle: {
      value: { _light: "{colors.gray.25}", _dark: "{colors.gray.950}" },
    },
    subtle: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.gray.900}" },
    },
    extraMuted: {
      value: { _light: "{colors.gray.75}", _dark: "{colors.gray.800}" },
    },
    muted: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    inverted: {
      value: { _light: "{colors.black}", _dark: "{colors.white}" },
    },
    panel: {
      value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
    },
    red: {
      value: { _light: "{colors.red.50}", _dark: "{colors.red.950}" },
    },
    warning: {
      value: { _light: "{colors.orange.50}", _dark: "{colors.orange.950}" },
    },
    success: {
      value: { _light: "{colors.green.50}", _dark: "{colors.green.950}" },
    },
    info: {
      value: { _light: "{colors.blue.50}", _dark: "{colors.blue.950}" },
    },
  },
  fg: {
    DEFAULT: {
      value: { _light: "{colors.black}", _dark: "{colors.gray.50}" },
    },
    muted: {
      value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    subtle: {
      value: { _light: "{colors.gray.500}", _dark: "{colors.gray.500}" },
    },
    inverted: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.black}" },
    },
    red: {
      value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { _light: "{colors.orange.600}", _dark: "{colors.orange.300}" },
    },
    success: {
      value: { _light: "{colors.green.600}", _dark: "{colors.green.300}" },
    },
    info: {
      value: { _light: "{colors.blue.600}", _dark: "{colors.blue.300}" },
    },
  },
  border: {
    DEFAULT: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    muted: {
      value: { _light: "{colors.gray.125}", _dark: "{colors.gray.800}" },
    },
    subtle: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.950}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
    },
    inverted: {
      value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
    },
    red: {
      value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { _light: "{colors.orange.500}", _dark: "{colors.orange.400}" },
    },
    success: {
      value: { _light: "{colors.green.500}", _dark: "{colors.green.400}" },
    },
    info: {
      value: { _light: "{colors.blue.500}", _dark: "{colors.blue.400}" },
    },
  },

  gray: {
    contrast: {
      value: { _light: "{colors.white}", _dark: "{colors.black}" },
    },
    fg: {
      value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
    },
    subtle: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    muted: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
    },
    solid: {
      value: { _light: "{colors.gray.900}", _dark: "{colors.white}" },
    },
    focusRing: {
      value: { _light: "{colors.primary.700}", _dark: "{colors.primary.700}" },
    },
  },

  red: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.red.700}", _dark: "{colors.red.300}" },
    },
    subtle: {
      value: { _light: "{colors.red.100}", _dark: "{colors.red.900}" },
    },
    muted: {
      value: { _light: "{colors.red.200}", _dark: "{colors.red.800}" },
    },
    emphasized: {
      value: { _light: "{colors.red.300}", _dark: "{colors.red.700}" },
    },
    solid: {
      value: { _light: "{colors.red.600}", _dark: "{colors.red.600}" },
    },
    focusRing: {
      value: { _light: "{colors.red.600}", _dark: "{colors.red.600}" },
    },
  },

  orange: {
    contrast: {
      value: { _light: "white", _dark: "black" },
    },
    fg: {
      value: { _light: "{colors.orange.700}", _dark: "{colors.orange.300}" },
    },
    subtle: {
      value: { _light: "{colors.orange.100}", _dark: "{colors.orange.900}" },
    },
    muted: {
      value: { _light: "{colors.orange.200}", _dark: "{colors.orange.800}" },
    },
    emphasized: {
      value: { _light: "{colors.orange.300}", _dark: "{colors.orange.700}" },
    },
    solid: {
      value: { _light: "{colors.orange.600}", _dark: "{colors.orange.500}" },
    },
    focusRing: {
      value: { _light: "{colors.orange.600}", _dark: "{colors.orange.500}" },
    },
  },

  green: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.green.700}", _dark: "{colors.green.300}" },
    },
    subtle: {
      value: { _light: "{colors.green.100}", _dark: "{colors.green.900}" },
    },
    muted: {
      value: { _light: "{colors.green.200}", _dark: "{colors.green.800}" },
    },
    emphasized: {
      value: { _light: "{colors.green.300}", _dark: "{colors.green.700}" },
    },
    solid: {
      value: { _light: "{colors.green.600}", _dark: "{colors.green.600}" },
    },
    focusRing: {
      value: { _light: "{colors.green.600}", _dark: "{colors.green.600}" },
    },
  },

  blue: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.blue.700}", _dark: "{colors.blue.300}" },
    },
    subtle: {
      value: { _light: "{colors.blue.100}", _dark: "{colors.blue.900}" },
    },
    muted: {
      value: { _light: "{colors.blue.200}", _dark: "{colors.blue.800}" },
    },
    emphasized: {
      value: { _light: "{colors.blue.300}", _dark: "{colors.blue.700}" },
    },
    solid: {
      value: { _light: "{colors.blue.600}", _dark: "{colors.blue.600}" },
    },
    focusRing: {
      value: { _light: "{colors.blue.600}", _dark: "{colors.blue.600}" },
    },
  },

  yellow: {
    contrast: {
      value: { _light: "black", _dark: "black" },
    },
    fg: {
      value: { _light: "{colors.yellow.800}", _dark: "{colors.yellow.300}" },
    },
    subtle: {
      value: { _light: "{colors.yellow.100}", _dark: "{colors.yellow.900}" },
    },
    muted: {
      value: { _light: "{colors.yellow.200}", _dark: "{colors.yellow.800}" },
    },
    emphasized: {
      value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.700}" },
    },
    solid: {
      value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.300}" },
    },
    focusRing: {
      value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.300}" },
    },
  },

  purple: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.purple.700}", _dark: "{colors.purple.300}" },
    },
    subtle: {
      value: { _light: "{colors.purple.100}", _dark: "{colors.purple.900}" },
    },
    muted: {
      value: { _light: "{colors.purple.200}", _dark: "{colors.purple.800}" },
    },
    emphasized: {
      value: { _light: "{colors.purple.300}", _dark: "{colors.purple.700}" },
    },
    solid: {
      value: { _light: "{colors.purple.600}", _dark: "{colors.purple.600}" },
    },
    focusRing: {
      value: { _light: "{colors.purple.600}", _dark: "{colors.purple.600}" },
    },
  },

  pink: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.pink.700}", _dark: "{colors.pink.300}" },
    },
    subtle: {
      value: { _light: "{colors.pink.100}", _dark: "{colors.pink.900}" },
    },
    muted: {
      value: { _light: "{colors.pink.200}", _dark: "{colors.pink.800}" },
    },
    emphasized: {
      value: { _light: "{colors.pink.300}", _dark: "{colors.pink.700}" },
    },
    solid: {
      value: { _light: "{colors.pink.600}", _dark: "{colors.pink.600}" },
    },
    focusRing: {
      value: { _light: "{colors.pink.600}", _dark: "{colors.pink.600}" },
    },
  },

  cyan: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.cyan.700}", _dark: "{colors.cyan.300}" },
    },
    subtle: {
      value: { _light: "{colors.cyan.100}", _dark: "{colors.cyan.900}" },
    },
    muted: {
      value: { _light: "{colors.cyan.200}", _dark: "{colors.cyan.800}" },
    },
    emphasized: {
      value: { _light: "{colors.cyan.300}", _dark: "{colors.cyan.700}" },
    },
    solid: {
      value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.600}" },
    },
    focusRing: {
      value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.600}" },
    },
  },

  primary: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.primary.700}", _dark: "{colors.primary.300}" },
    },
    subtle: {
      value: { _light: "{colors.primary.50}", _dark: "{colors.primary.900}" },
    },
    muted: {
      value: { _light: "{colors.primary.100}", _dark: "{colors.primary.800}" },
    },
    emphasized: {
      value: { _light: "{colors.primary.200}", _dark: "{colors.primary.700}" },
    },
    solid: {
      value: { _light: "{colors.primary.700}", _dark: "{colors.primary.700}" },
    },
    focusRing: {
      value: { _light: "{colors.primary.700}", _dark: "{colors.primary.700}" },
    },
  },

  // Modern gradient semantic tokens
  gradient: {
    primary: {
      value: {
        _light: "{colors.gradients.primary}",
        _dark: "{colors.gradients.primary}",
      },
    },
    primaryLight: {
      value: {
        _light: "{colors.gradients.primaryLight}",
        _dark: "{colors.gradients.primaryLight}",
      },
    },
    secondary: {
      value: {
        _light: "{colors.gradients.secondary}",
        _dark: "{colors.gradients.secondary}",
      },
    },
    success: {
      value: {
        _light: "{colors.gradients.success}",
        _dark: "{colors.gradients.success}",
      },
    },
    warning: {
      value: {
        _light: "{colors.gradients.warning}",
        _dark: "{colors.gradients.warning}",
      },
    },
    red: {
      value: {
        _light: "{colors.gradients.error}",
        _dark: "{colors.gradients.error}",
      },
    },
    glass: {
      value: {
        _light: "{colors.gradients.glass}",
        _dark: "{colors.gradients.glassDark}",
      },
    },
    background: {
      value: {
        _light: "{colors.gradients.background}",
        _dark: "{colors.gradients.backgroundDark}",
      },
    },
  },

  // Glass morphism semantic tokens
  glass: {
    light: {
      value: {
        _light: "{colors.glass.light}",
        _dark: "{colors.glass.medium}",
      },
    },
    medium: {
      value: {
        _light: "{colors.glass.medium}",
        _dark: "{colors.glass.dark}",
      },
    },
    surface: {
      value: {
        _light: "{colors.glass.surface}",
        _dark: "{colors.glass.overlay}",
      },
    },
  },

  // -----------------------------------------------------------------------
  // Rebrand semantics (Figma: Rengo Marketing Site).
  //
  // Namespaced under `site` so the marketing surfaces can move without
  // disturbing the app's existing bg/fg/border semantics.
  //
  // These are deliberately mode-flat. The design's dark bands are a
  // compositional choice — a dark section sits next to a light one on the
  // same page — not a colour mode, so the `onDark` variants are explicit
  // rather than something `_dark` would swap in.
  // -----------------------------------------------------------------------
  site: {
    bg: {
      /** The page itself. */
      page: { value: "{colors.canvas.200}" },
      /** Sections and nav that sit a step above the page. */
      surface: { value: "{colors.canvas.100}" },
      /** Cards lifted off a surface. */
      raised: { value: "{colors.canvas.0}" },
      /** Footer band. */
      footer: { value: "{colors.canvas.50}" },
      /** Recessed chips and wells. */
      inset: { value: "{colors.canvas.300}" },
      /** The dark bands: performance, security, logos. */
      dark: { value: "{colors.soot.700}" },
      /** Controls on a dark band. */
      darkRaised: { value: "{colors.soot.800}" },
      /** Cool tinted band — testimonials. */
      tint: { value: "{colors.silver.200}" },
      /** Brighter blue band. */
      tintSky: { value: "{colors.sky}" },
      /** Filled brand surface — primary buttons. */
      brand: { value: "{colors.rengo.500}" },
    },
    fg: {
      /** Body copy. */
      DEFAULT: { value: "{colors.soot.700}" },
      /** Headings. */
      strong: { value: "{colors.soot.800}" },
      /** Secondary copy. */
      muted: { value: "{colors.soot.500}" },
      /** Captions, metadata. */
      subtle: { value: "{colors.soot.400}" },
      /** Type on a dark band. */
      onDark: { value: "{colors.canvas.0}" },
      onDarkMuted: { value: "{colors.soot.300}" },
      onDarkSubtle: { value: "{colors.soot.400}" },
      /** Type on a filled brand surface. */
      onBrand: { value: "{colors.canvas.0}" },
    },
    border: {
      /** Solid hairline. */
      DEFAULT: { value: "{colors.canvas.500}" },
      /** The dashed rule that separates cards and rows. */
      dashed: { value: "{colors.silver.300}" },
      /** Same rule, over a tinted band. */
      dashedOnTint: { value: "{colors.silver.400}" },
      /** Same rule, over a dark band — lifted so it still reads. */
      dashedOnDark: { value: "{colors.soot.500}" },
      /** Solid hairline on a dark band. */
      onDark: { value: "{colors.soot.600}" },
    },
    /** Maroon. The emphasised phrase, one rule, one glyph — sparing. */
    accent: { value: "{colors.crimson}" },
    /** Rengo blue. Links, primary actions. */
    brand: { value: "{colors.rengo.500}" },
  },
});
