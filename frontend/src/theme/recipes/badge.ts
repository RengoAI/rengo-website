import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  className: "rengo-badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    letterSpacing: "0.025em",
    borderRadius: "lg",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease-in-out",
  },

  variants: {
    variant: {
      solid: {
        color: "white",
      },
      subtle: {
        color: "inherit",
      },
      outline: {
        bg: "transparent",
        borderWidth: "0.5px",
        borderStyle: "solid",
      },
      surface: {
        bg: "bg.surface",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        color: "fg.default",
        boxShadow: "xs",
      },
    },

    size: {
      xs: {
        fontSize: "10px",
        px: "1.5",
        py: "0.5",
        minH: "4",
        minW: "4",
      },
      sm: {
        fontSize: "11px",
        px: "2",
        py: "1",
        minH: "5",
        minW: "5",
      },
      md: {
        fontSize: "12px",
        px: "2.5",
        py: "1",
        minH: "6",
        minW: "6",
      },
      lg: {
        fontSize: "13px",
        px: "3",
        py: "1.5",
        minH: "7",
        minW: "7",
      },
    },

    colorScheme: {
      primary: {},
      gray: {},
      green: {},
      blue: {},
      red: {},
      yellow: {},
      orange: {},
      purple: {},
      teal: {},
      cyan: {},
    },
  },

  compoundVariants: [
    // Primary color scheme
    {
      variant: "solid",
      colorScheme: "primary",
      css: {
        bg: "primary.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "primary",
      css: {
        bg: "primary.50",
        color: "primary.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "primary",
      css: {
        borderColor: "primary.600",
        color: "primary.600",
      },
    },

    // Gray color scheme
    {
      variant: "solid",
      colorScheme: "gray",
      css: {
        bg: "gray.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "gray",
      css: {
        bg: "gray.100",
        color: "gray.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "gray",
      css: {
        borderColor: "gray.600",
        color: "gray.600",
      },
    },

    // Green color scheme
    {
      variant: "solid",
      colorScheme: "green",
      css: {
        bg: "green.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "green",
      css: {
        bg: "green.50",
        color: "green.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "green",
      css: {
        borderColor: "green.600",
        color: "green.600",
      },
    },

    // Blue color scheme
    {
      variant: "solid",
      colorScheme: "blue",
      css: {
        bg: "blue.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "blue",
      css: {
        bg: "blue.50",
        color: "blue.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "blue",
      css: {
        borderColor: "blue.600",
        color: "blue.600",
      },
    },

    // Red color scheme
    {
      variant: "solid",
      colorScheme: "red",
      css: {
        bg: "red.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "red",
      css: {
        bg: "red.50",
        color: "red.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "red",
      css: {
        borderColor: "red.600",
        color: "red.600",
      },
    },

    // Yellow color scheme
    {
      variant: "solid",
      colorScheme: "yellow",
      css: {
        bg: "yellow.500",
        color: "black",
      },
    },
    {
      variant: "subtle",
      colorScheme: "yellow",
      css: {
        bg: "yellow.50",
        color: "yellow.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "yellow",
      css: {
        borderColor: "yellow.500",
        color: "yellow.600",
      },
    },

    // Orange color scheme
    {
      variant: "solid",
      colorScheme: "orange",
      css: {
        bg: "orange.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "orange",
      css: {
        bg: "orange.50",
        color: "orange.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "orange",
      css: {
        borderColor: "orange.600",
        color: "orange.600",
      },
    },

    // Purple color scheme
    {
      variant: "solid",
      colorScheme: "purple",
      css: {
        bg: "purple.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "purple",
      css: {
        bg: "purple.50",
        color: "purple.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "purple",
      css: {
        borderColor: "purple.600",
        color: "purple.600",
      },
    },

    // Teal color scheme
    {
      variant: "solid",
      colorScheme: "teal",
      css: {
        bg: "teal.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "teal",
      css: {
        bg: "teal.50",
        color: "teal.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "teal",
      css: {
        borderColor: "teal.600",
        color: "teal.600",
      },
    },

    // Cyan color scheme
    {
      variant: "solid",
      colorScheme: "cyan",
      css: {
        bg: "cyan.600",
        color: "white",
      },
    },
    {
      variant: "subtle",
      colorScheme: "cyan",
      css: {
        bg: "cyan.50",
        color: "cyan.700",
      },
    },
    {
      variant: "outline",
      colorScheme: "cyan",
      css: {
        borderColor: "cyan.600",
        color: "cyan.600",
      },
    },
  ],

  defaultVariants: {
    variant: "solid",
    size: "md",
    colorScheme: "primary",
  },
});
