import { defineSlotRecipe } from "@chakra-ui/react";

export const progressRecipe = defineSlotRecipe({
  className: "rengo-progress",
  slots: ["root", "track", "range", "label", "valueText"],

  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1",
    },
    track: {
      bg: "gray.200",
      borderRadius: "full",
      overflow: "hidden",
      position: "relative",
    },
    range: {
      bg: "primary.500",
      height: "100%",
      transition: "width 0.3s ease",
      borderRadius: "full",
    },
    label: {
      fontSize: "sm",
      fontWeight: "medium",
      color: "gray.700",
    },
    valueText: {
      fontSize: "sm",
      color: "gray.500",
      textAlign: "right",
    },
  },

  variants: {
    size: {
      xs: {
        track: { height: "1" },
        label: { fontSize: "xs" },
        valueText: { fontSize: "xs" },
      },
      sm: {
        track: { height: "2" },
        label: { fontSize: "sm" },
        valueText: { fontSize: "sm" },
      },
      md: {
        track: { height: "3" },
        label: { fontSize: "md" },
        valueText: { fontSize: "md" },
      },
      lg: {
        track: { height: "4" },
        label: { fontSize: "lg" },
        valueText: { fontSize: "lg" },
      },
    },

    variant: {
      solid: {
        range: {
          bg: "primary.500",
        },
      },
      subtle: {
        track: {
          bg: "gray.100",
        },
        range: {
          bg: "primary.200",
        },
      },
      outline: {
        track: {
          bg: "transparent",
          border: "1px solid",
          borderColor: "gray.200",
        },
        range: {
          bg: "primary.500",
        },
      },
    },

    colorScheme: {
      primary: {
        range: {
          bg: "primary.500",
        },
      },
      gray: {
        range: {
          bg: "gray.500",
        },
      },
      green: {
        range: {
          bg: "green.500",
        },
      },
      blue: {
        range: {
          bg: "blue.500",
        },
      },
      red: {
        range: {
          bg: "red.500",
        },
      },
      yellow: {
        range: {
          bg: "yellow.500",
        },
      },
    },

    striped: {
      true: {
        range: {
          backgroundImage:
            "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
          backgroundSize: "1rem 1rem",
        },
      },
    },

    animated: {
      true: {
        range: {
          animation: "progress-stripes 1s linear infinite",
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: "subtle",
      colorScheme: "green",
      css: {
        track: { bg: "green.50" },
        range: { bg: "green.400" },
      },
    },
    {
      variant: "subtle",
      colorScheme: "blue",
      css: {
        track: { bg: "blue.50" },
        range: { bg: "blue.400" },
      },
    },
    {
      variant: "subtle",
      colorScheme: "red",
      css: {
        track: { bg: "red.50" },
        range: { bg: "red.400" },
      },
    },
    {
      variant: "subtle",
      colorScheme: "yellow",
      css: {
        track: { bg: "yellow.50" },
        range: { bg: "yellow.400" },
      },
    },
  ],

  defaultVariants: {
    size: "md",
    variant: "solid",
    colorScheme: "primary",
  },
});
