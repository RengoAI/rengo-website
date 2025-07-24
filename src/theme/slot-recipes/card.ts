import { defineSlotRecipe } from "@chakra-ui/react";

export const cardRecipe = defineSlotRecipe({
  className: "rengo-card",
  slots: ["root", "header", "title", "description", "body", "footer"],

  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "md",
      boxShadow: "sm",
      overflow: "hidden",
      border: "1px solid",
      bg: "bg.surface",
      borderColor: { base: "gray.200", _dark: "gray.875" },
      transition: "all 0.2s ease-in-out",
      margin: "4",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      px: "4",
      py: "3",
    },
    title: {
      fontSize: "14px",
      fontWeight: "normal",
    },
    description: {
      fontSize: "sm",
      color: "gray.500",
      mt: "1",
    },
    body: {
      px: "4",
      py: "3",
      flex: "1",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      px: "4",
      py: "3",
      gap: "2",
    },
  },

  variants: {
    variant: {
      elevated: {
        root: {
          boxShadow: "md",
          border: "none",
          _hover: {
            boxShadow: "lg",
          },
        },
      },
      table: {
        root: {
          boxShadow: "md",
          border: "none",
        },
        body: {
          px: 0,
        },
      },
      outline: {
        root: {
          boxShadow: "none",
          borderWidth: "1px",
          borderColor: "gray.200",
        },
      },
      filled: {
        root: {
          boxShadow: "none",
          bg: "gray.50",
          borderColor: "gray.50",
        },
      },
      unstyled: {
        root: {
          bg: "none",
          boxShadow: "none",
          borderRadius: 0,
          border: "none",
        },
        header: { p: 0 },
        body: { p: 0 },
        footer: { p: 0 },
      },
      divider: {
        header: {
          borderBottom: "1px solid",
          borderColor: "gray.200",
        },
        footer: {
          borderTop: "1px solid",
          borderColor: "gray.200",
        },
      },
    },

    size: {
      sm: {
        root: { minW: "xs" },
        header: { p: "3" },
        body: { p: "3" },
        footer: { p: "3" },
        title: { fontSize: "sm" },
      },
      md: {
        root: { minW: "sm" },
        header: { p: "4" },
        body: { p: "4" },
        footer: { p: "4" },
        title: { fontSize: "md" },
      },
      lg: {
        root: { minW: "md" },
        header: { p: "6" },
        body: { p: "6" },
        footer: { p: "6" },
        title: { fontSize: "lg" },
      },
    },

    colorScheme: {
      primary: {},
      gray: {},
      error: {},
    },
  },

  compoundVariants: [
    {
      variant: "filled",
      colorScheme: "primary",
      css: {
        root: {
          bg: "primary.50",
          borderColor: "primary.50",
        },
      },
    },
    {
      variant: "filled",
      colorScheme: "gray",
      css: {
        root: {
          bg: "gray.50",
          borderColor: "gray.50",
        },
      },
    },
    {
      variant: "filled",
      colorScheme: "error",
      css: {
        root: {
          bg: "error.50",
          borderColor: "error.50",
        },
      },
    },
    {
      variant: "outline",
      colorScheme: "primary",
      css: {
        root: {
          borderColor: "primary.200",
        },
      },
    },
    {
      variant: "outline",
      colorScheme: "error",
      css: {
        root: {
          borderColor: "error.200",
        },
      },
    },
    {
      variant: "divider",
      colorScheme: "primary",
      css: {
        header: {
          borderColor: "primary.200",
        },
        footer: {
          borderColor: "primary.200",
        },
      },
    },
    {
      variant: "table",
      colorScheme: "primary",
      css: {
        root: {
          bg: "primary.50",
        },
      },
    },
  ],

  defaultVariants: {
    variant: "elevated",
    size: "md",
    colorScheme: "gray",
  },
});
