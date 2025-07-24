import { defineSlotRecipe } from "@chakra-ui/react";

export const alertRecipe = defineSlotRecipe({
  className: "rengo-alert",
  slots: ["root", "title", "description", "icon"],

  base: {
    root: {
      display: "flex",
      flexShrink: 0,
      borderWidth: "1px",
      borderRadius: "8px",
      py: "11px",
      alignItems: "flex-start",
      "& a": {
        fontWeight: "bold",
        textDecoration: "underline",
        whiteSpace: "nowrap",
        pl: "8px",
        flex: "inherit",
        _hover: {
          textDecorationColor: "currentColor",
        },
        _active: {
          opacity: 0.5,
        },
      },
    },
    title: {
      fontSize: "16px",
      fontWeight: "semibold",
      flexGrow: 1,
    },
    description: {
      flexGrow: 1,
      lineHeight: "20px",
      whiteSpace: "pre-wrap",
    },
    icon: {
      margin: 0,
      width: "16px",
      height: "16px",
      marginRight: "8px",
      "& > *": {
        width: "16px !important",
        height: "16px !important",
      },
    },
  },

  variants: {
    status: {
      info: {
        root: {
          borderColor: "blue.300",
          bg: "blue.25",
        },
        title: { color: "blue.900" },
        description: { color: "blue.900" },
        icon: { color: "blue.900" },
      },
      error: {
        root: {
          borderColor: "error.300",
          bg: "error.25",
        },
        title: { color: "error.700" },
        description: { color: "error.700" },
        icon: { color: "error.600" },
      },
      warning: {
        root: {
          borderColor: "warning.200",
          bg: "warning.25",
        },
        title: { color: "warning.900" },
        description: { color: "warning.900" },
        icon: { color: "warning.900" },
      },
      gray: {
        root: {
          borderColor: "gray.200",
          bg: "gray.25",
        },
        title: { color: "gray.700" },
        description: { color: "gray.700" },
        icon: { color: "gray.500" },
      },
    },
    size: {
      sm: {
        root: {
          p: "8px",
          borderRadius: "4px",
        },
        icon: {
          width: "16px",
          height: "18px",
          marginTop: "2px",
          marginRight: "8px",
        },
      },
      md: {
        root: {
          py: "11px",
        },
        icon: {
          width: "16px",
          height: "16px",
          marginRight: "8px",
        },
      },
    },
    interactive: {
      true: {
        root: {
          cursor: "pointer",
          _active: {
            bg: "blue.100",
          },
        },
      },
    },
  },

  defaultVariants: {
    status: "info",
    size: "md",
    interactive: false,
  },
});
