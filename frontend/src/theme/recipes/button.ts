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
      borderColor: "transparent",
      outlineColor: "transparent",
      outlineWidth: "0px",
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
      transparent: {
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
        _focus: {
          borderWidth: "1px",
          borderColor: "gray.200",
          boxShadow: "none",
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
        color: "primary.700",
        textDecoration: "underline",
        cursor: "pointer",
        transitionProperty: "none",
        _hover: {
          color: "primary.700",
          textDecoration: "underline",
          bg: "transparent",
        },
        _active: {
          color: "primary.600",
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
          borderColor: "transparent",
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
      toolbarIcon: {
        py: "5px",
        px: "8px",
        minHeight: "32px",
        height: "unset",
      },
      toolbarNarrowIcon: {
        py: "5px",
        px: "6px",
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
      transparent: {},
      green: {},
      red: {},
      yellow: {},
    },
  },

  // Compound variants for combinations
  compoundVariants: [
    // Primary + Solid
    {
      variant: "solid",
      colorScheme: "primary",
      css: {
        bg: "primary.600",
        borderColor: "primary.700",
        color: "white",
        _hover: {
          color: "gray.100",
          bg: "primary.700",
          borderColor: "transparent",
        },
        _focus: {
          color: "white",
          bg: "primary.600",
          borderColor: "primary.700",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "primary.800",
          shadow: "inset 0px 4px 7px primary.100",
        },
        "&[data-state=open]": {
          bg: "primary.800",
          borderColor: "primary.700",
        },
        _disabled: {
          opacity: 0.5,
          bg: "primary.500",
          borderColor: "primary.500",
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
          borderColor: "transparent",
          color: "gray.800",
          outlineColor: "transparent",
          outlineWidth: "0px",
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
        bg: "cyan.50",
        borderColor: "cyan.100",
        color: "cyan.900",
        _hover: {
          color: "cyan.900",
          bg: "cyan.100",
        },
        _focus: {
          color: "cyan.900",
          bg: "cyan.100",
          borderColor: "transparent",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "cyan.100",
          shadow: "inset 0px 4px 6px rgba(2, 39, 21, 0.2)",
        },
        _disabled: {
          opacity: 0.5,
          bg: "primary.50",
          borderColor: "primary.300",
          color: "primary.600",
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
          outlineColor: "transparent",
          outlineWidth: "0px",
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
        color: "cyan.600",
        _hover: {
          bg: "cyan.50",
          color: "cyan.600",
        },
        _active: {
          bg: "cyan.100",
          color: "cyan.800",
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

    // Green + Solid
    {
      variant: "solid",
      colorScheme: "green",
      css: {
        bg: "green.200",
        borderColor: "green.200",
        color: "black",
        _hover: {
          color: "black",
          bg: "green.300",
          borderColor: "green.300",
        },
        _focus: {
          color: "black",
          bg: "green.200",
          borderColor: "transparent",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "green.300",
          shadow: "inset 0px 4px 7px green.100",
        },
        _disabled: {
          opacity: 0.5,
          bg: "green.200",
          borderColor: "green.200",
        },
      },
    },

    // Green + Outline
    {
      variant: "outline",
      colorScheme: "green",
      css: {
        bg: "transparent",
        borderColor: "green.300",
        color: "green.700",
        _hover: {
          bg: "green.50",
          borderColor: "green.400",
          color: "green.800",
        },
        _focus: {
          bg: "green.50",
          borderColor: "green.300",
          color: "green.700",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "green.100",
          borderColor: "green.400",
          color: "green.800",
        },
        _disabled: {
          opacity: 0.5,
          bg: "transparent",
          borderColor: "green.200",
          color: "green.400",
        },
      },
    },

    // Green + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "green",
      css: {
        color: "green.600",
        _hover: {
          bg: "green.50",
          color: "green.700",
        },
        _active: {
          bg: "green.100",
          color: "green.800",
        },
        _disabled: {
          opacity: 0.5,
          color: "green.600",
          bg: "unset",
        },
      },
    },

    // Red + Solid
    {
      variant: "solid",
      colorScheme: "red",
      css: {
        bg: "red.600",
        borderColor: "red.600",
        color: "white",
        _hover: {
          color: "white",
          bg: "red.700",
          borderColor: "red.700",
        },
        _focus: {
          color: "white",
          bg: "red.600",
          borderColor: "transparent",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "red.700",
          shadow: "inset 0px 4px 7px red.100",
        },
        _disabled: {
          opacity: 0.5,
          bg: "red.500",
          borderColor: "red.500",
        },
      },
    },

    // Red + Outline
    {
      variant: "outline",
      colorScheme: "red",
      css: {
        bg: "transparent",
        borderColor: "red.700",
        color: "red.700",
        _hover: {
          bg: "red.50",
          borderColor: "red.700",
          color: "red.800",
        },
        _focus: {
          bg: "red.50",
          borderColor: "red.600",
          color: "red.700",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "red.100",
          borderColor: "red.700",
          color: "red.800",
        },
        _disabled: {
          opacity: 0.5,
          bg: "transparent",
          borderColor: "red.300",
          color: "red.400",
        },
      },
    },

    // Red + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "red",
      css: {
        color: "red.600",
        _hover: {
          bg: "red.50",
          color: "red.700",
        },
        _active: {
          bg: "red.100",
          color: "red.800",
        },
        _disabled: {
          opacity: 0.5,
          color: "red.600",
          bg: "unset",
        },
      },
    },

    // Yellow + Solid
    {
      variant: "solid",
      colorScheme: "yellow",
      css: {
        bg: "yellow.100",
        borderColor: "yellow.200",
        color: "gray.900",
        _hover: {
          color: "gray.900",
          bg: "yellow.200",
          borderColor: "yellow.200",
        },
        _focus: {
          color: "gray.900",
          bg: "yellow.100",
          borderColor: "transparent",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "yellow.200",
          shadow: "inset 0px 4px 7px yellow.50",
        },
        _disabled: {
          opacity: 0.5,
          bg: "yellow.50",
          borderColor: "yellow.50",
        },
      },
    },

    // Yellow + Outline
    {
      variant: "outline",
      colorScheme: "yellow",
      css: {
        bg: "transparent",
        borderColor: "yellow.500",
        color: "yellow.700",
        _hover: {
          bg: "yellow.50",
          borderColor: "yellow.600",
          color: "yellow.800",
        },
        _focus: {
          bg: "yellow.50",
          borderColor: "yellow.500",
          color: "yellow.700",
          outlineColor: "transparent",
          outlineWidth: "0px",
          outlineOffset: "0px",
          boxShadow: "none",
        },
        _active: {
          bg: "yellow.100",
          borderColor: "yellow.600",
          color: "yellow.800",
        },
        _disabled: {
          opacity: 0.5,
          bg: "transparent",
          borderColor: "yellow.200",
          color: "yellow.400",
        },
      },
    },

    // Yellow + Subtle/Ghost
    {
      variant: ["subtle", "ghost"],
      colorScheme: "yellow",
      css: {
        color: "yellow.600",
        _hover: {
          bg: "yellow.50",
          color: "yellow.700",
        },
        _active: {
          bg: "yellow.100",
          color: "yellow.800",
        },
        _disabled: {
          opacity: 0.5,
          color: "yellow.400",
          bg: "unset",
        },
      },
    },

    {
      variant: ["subtle", "ghost"],
      colorScheme: "transparent",
      css: {
        color: "inherit",
        _hover: {
          bg: "inherit",
          color: "inherit",
        },
        _active: {
          bg: "inherit",
          color: "inherit",
        },
        _disabled: {
          opacity: "inherit",
          color: "inherit",
          bg: "inherit",
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
