import { defineSlotRecipe } from "@chakra-ui/react";

export const tooltipRecipe = defineSlotRecipe({
  className: "rengo-tooltip",
  slots: ["root", "trigger", "positioner", "content", "arrow", "arrowTip"],

  base: {
    root: {
      display: "inline-block",
    },
    trigger: {
      display: "inline-block",
    },
    positioner: {},
    content: {
      bg: "bg.surface",
      color: "fg.subtle",
      fontSize: "sm",
      p: "2",
      borderRadius: "md",
      boxShadow: "md",
      maxWidth: "320px",
      zIndex: "tooltip",
      _dark: {
        bg: "gray.300",
        color: "gray.900",
      },
    },
    arrow: {},
    arrowTip: {
      bg: "gray.700",
      _dark: {
        bg: "gray.300",
      },
    },
  },

  variants: {
    variant: {
      default: {
        content: {
          bg: "bg.surface",
          color: "primary.700",
        },
        arrowTip: {
          bg: "gray.700",
          _dark: {
            bg: "gray.300",
          },
        },
      },
    },
    size: {
      sm: {
        content: {
          fontSize: "xs",
          px: "1.5",
          py: "0.5",
          maxWidth: "200px",
        },
      },
      md: {
        content: {
          fontSize: "sm",
          px: "2",
          py: "1",
          maxWidth: "320px",
        },
      },
      lg: {
        content: {
          fontSize: "md",
          px: "3",
          py: "2",
          maxWidth: "400px",
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});
