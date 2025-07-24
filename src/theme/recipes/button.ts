import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  className: "rengo-btn",
  base: {
    margin: "4px 0 4px 0",
    minWidth: "min-content",
    transitionProperty: "common",
    transitionDuration: "normal",
    textDecoration: "none",
    fontWeight: "medium",
    cursor: "pointer",
    _hover: {
      textDecoration: "none",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
      _hover: {
        bg: "inherit",
      },
      _active: {
        shadow: "none",
      },
    },
    _focus: {
      borderColor: "primary.focusRing",
      outlineColor: "primary.focusRing",
      outlineWidth: "1px",
      outlineOffset: "0px",
      boxShadow: "none",
    },
    overflow: "hidden",
  },

  variants: {
    // Define the variant prop
    variant: {
      ghostDarken: {
        bg: "transparent",
        color: "gray.400",
        "& svg": {
          color: "gray.400",
        },
        _hover: {
          bg: "transparent",
          color: { base: "gray.800", _dark: "gray.400" },
          "& svg": {
            color: { base: "gray.800", _dark: "gray.400" },
          },
        },
        _active: {
          bg: "transparent",
        },
      },
      solid: {
        borderWidth: "1px",
        borderRadius: "6px",
      },
      subtle: {
        p: "2px",
        height: "unset",
        minHeight: "unset",
        borderRadius: "4px",
      },
      text: {
        textDecoration: "underline",
        _hover: {
          textDecoration: "underline",
        },
        _disabled: {
          cursor: "not-allowed",
          "& svg": {
            color: "gray.300",
          },
        },
        overflow: "hidden",
      },
      ghost: {
        borderRadius: "6px",
        bg: "transparent",
        cursor: "pointer",
        _hover: {
          bg: "bg.subtle",
        },
        _active: {
          bg: "bg.subtle",
        },
      },
      outline: {
        borderRadius: "6px",
        bg: "transparent",
        borderWidth: "1px",
        borderColor: "gray.200",
        _hover: {
          bg: "bg.subtle",
        },
        _active: {
          bg: "bg.surface",
        },
      },
      link: {
        bg: "transparent",
        border: "none",
        padding: "0",
        margin: "0",
        minWidth: "auto",
        height: "auto",
        minHeight: "auto",
        fontWeight: "normal",
        color: "primary.600",
        textDecoration: "underline",
        cursor: "pointer",
        _hover: {
          color: "primary.700",
          textDecoration: "underline",
          bg: "transparent",
        },
        _active: {
          color: "primary.800",
          bg: "transparent",
        },
        _disabled: {
          color: "gray.400",
          cursor: "not-allowed",
          textDecoration: "none",
          _hover: {
            color: "gray.400",
            textDecoration: "none",
          },
        },
      },
      destructive: {
        borderRadius: "6px",
        bg: "transparent",
        borderWidth: "1px",
        borderColor: "red.600",
        color: "red.600",
        _hover: {
          bg: "red.50",
          borderColor: "red.700",
          color: "red.700",
        },
        _active: {
          bg: "red.100",
          borderColor: "red.800",
          color: "red.800",
        },
        _focus: {
          borderColor: "error.600",
          outlineColor: "error.600",
          outlineWidth: "1px",
          outlineOffset: "0px",
        },
        _disabled: {
          borderColor: "red.300",
          color: "red.300",
          cursor: "not-allowed",
          _hover: {
            bg: "transparent",
            borderColor: "red.300",
            color: "red.300",
          },
        },
      },
      select: {
        borderRadius: "4px",
        borderWidth: "1px",
        backgroundColor: "white",
        borderColor: "gray.300",
        color: "gray.700",
        width: "100%",
        height: "48px",
        pr: "12px",
        _focusVisible: {
          borderColor: "primary.400",
          outline: "none",
          boxShadow: "none",
        },
        _active: {
          borderColor: "primary.400",
        },
        _invalid: {
          backgroundColor: "red.50",
          borderColor: "red.600",
          color: "red.600",
        },
        _disabled: {
          cursor: "not-allowed",
          borderColor: "gray.300",
        },
      },
    },

    // Define the size prop
    size: {
      xxs: {
        py: "3px",
        px: "10px",
        minHeight: "16px",
        height: "unset",
      },
      xs: {
        py: "5px",
        px: "12px",
        minHeight: "32px",
        height: "unset",
      },
      sm: {
        py: "7px",
        px: "14px",
        fontSize: "14px",
        minHeight: "32px",
        height: "unset",
      },
      md: {
        py: "9px",
        px: "16px",
        fontSize: "14px",
        minHeight: "40px",
        height: "unset",
      },
      lg: {
        py: "11px",
        px: "18px",
        fontSize: "16px",
        minHeight: "40px",
        height: "unset",
      },
      xxsIcon: {
        p: "0",
        borderRadius: "2px",
        width: "16px",
        height: "16px",
        "& svg": {
          width: "16px",
          height: "16px",
        },
      },
      xsIcon: {
        py: "5px",
        px: "11px",
      },
      smIcon: {
        width: "24px",
        height: "24px",
        "& svg": {
          width: "20px",
          height: "20px",
        },
      },
      mdIcon: {
        minWidth: "40px",
        minHeight: "40px",
      },
      tableboxIcon: {
        width: "28px",
        height: "28px",
        "& svg": {
          width: "20px",
          height: "20px",
        },
      },
      tablerowIcon: {
        "& svg": {
          width: "24px",
          height: "24px",
        },
      },
    },

    // Define the colorScheme prop
    colorScheme: {
      primary: {},
      secondary: {},
      tertiary: {},
      destructive: {},
      edit: {},
    },
  },

  // Compound variants for combinations
  compoundVariants: [
    // Primary + Solid
    {
      variant: "solid",
      colorScheme: "primary",
      css: {
        bg: "primary.700",
        borderColor: "primary.700",
        color: "white",
        _hover: {
          color: "white",
          bg: "primary.800",
          borderColor: "primary.800",
        },
        _focus: {
          color: "white",
          bg: "primary.800",
          borderColor: "primary.focusRing",
          outlineColor: "primary.focusRing",
          outlineWidth: "1px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "primary.700",
          shadow: "inset 0px 4px 7px primary.100",
        },
        _disabled: {
          opacity: 0.5,
          bg: "primary.600",
          borderColor: "primary.600",
        },
      },
    },

    // Secondary + Solid
    {
      variant: "solid",
      colorScheme: "secondary",
      css: {
        bg: "white",
        borderColor: "gray.300",
        color: "gray.700",
        _hover: {
          bg: "gray.100",
          borderColor: "gray.300",
          color: "gray.800",
        },
        _focus: {
          bg: "gray.100",
          borderColor: "primary.focusRing",
          color: "gray.800",
          outlineColor: "primary.focusRing",
          outlineWidth: "1px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "gray.100",
          borderColor: "gray.300",
          color: "gray.800",
          shadow: "inset 0px 4px 6px rgba(16, 24, 40, 0.1)",
        },
        _disabled: {
          bg: "white",
          borderColor: "gray.200",
          color: "gray.300",
        },
      },
    },

    // Tertiary + Solid
    {
      variant: "solid",
      colorScheme: "tertiary",
      css: {
        bg: "teal.25",
        borderColor: "teal.100",
        color: "teal.900",
        _hover: {
          color: "teal.900",
          bg: "teal.50",
        },
        _focus: {
          color: "teal.900",
          bg: "teal.50",
          borderColor: "primary.focusRing",
          outlineColor: "primary.focusRing",
          outlineWidth: "1px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "teal.50",
          shadow: "inset 0px 4px 6px rgba(2, 39, 21, 0.2)",
        },
        _disabled: {
          opacity: 0.5,
          bg: "primary.50",
          borderColor: "primary.300",
          color: "primary.800",
        },
      },
    },

    // Destructive + Solid
    {
      variant: "solid",
      colorScheme: "destructive",
      css: {
        bg: "error.25",
        borderColor: "error.200",
        color: "error.700",
        _hover: {
          color: "error.700",
          bg: "error.100",
          borderColor: "error.300",
        },
        _focus: {
          color: "error.700",
          bg: "error.100",
          borderColor: "error.600",
          outlineColor: "error.600",
          outlineWidth: "1px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "error.100",
          borderColor: "error.300",
          shadow: "inset 0px 4px 6px rgba(122, 39, 26, 0.15)",
        },
        _disabled: {
          opacity: 0.5,
          bg: "error.50",
          borderColor: "error.200",
          color: "error.700",
        },
      },
    },

    // Primary + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "primary",
      css: {
        color: "gray.500",
        _hover: {
          color: "gray.500",
          bg: "gray.50",
        },
        _active: {
          bg: "gray.50",
          color: "gray.700",
        },
        _disabled: {
          opacity: 0.5,
          color: "gray.500",
          bg: "unset",
        },
      },
    },

    // Edit + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "edit",
      css: {
        color: "teal.600",
        _hover: {
          bg: "teal.25",
          color: "teal.600",
        },
        _active: {
          bg: "teal.50",
          color: "teal.800",
        },
        _disabled: {
          opacity: 0.5,
          color: "blue.600",
          bg: "unset",
        },
      },
    },

    // Destructive + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "destructive",
      css: {
        color: "error.600",
        _hover: {
          bg: "error.25",
          color: "error.600",
        },
        _active: {
          bg: "error.50",
          color: "error.800",
        },
        _disabled: {
          opacity: 0.5,
          color: "error.600",
          bg: "unset",
        },
      },
    },
  ],

  // Default values
  defaultVariants: {
    variant: "solid",
    size: "md",
    colorScheme: "primary",
  },
});
