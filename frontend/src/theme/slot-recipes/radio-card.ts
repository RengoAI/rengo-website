import { defineSlotRecipe } from "@chakra-ui/react";

export const radioCardRecipe = defineSlotRecipe({
  className: "chakra-radio-card",
  slots: [
    "root",
    "item",
    "label",
    "itemText",
    "itemDescription",
    "itemControl",
    "itemIndicator",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      isolation: "isolate",
    },
    item: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      borderRadius: "l2",
      bg: "bg.surface",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "border.DEFAULT",
      _focus: {
        outline: "none",
        borderColor: "primary.700",
        boxShadow: "0 0 0 1px var(--shadow-color)",
        boxShadowColor: "primary.700",
      },
      _disabled: {
        opacity: "0.8",
        borderColor: "border.disabled",
      },
      _checked: {
        zIndex: "1",
      },
    },
    label: {
      display: "inline-flex",
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: {
        opacity: "0.5",
      },
    },
    itemText: {
      fontWeight: "medium",
      flex: "1",
    },
    itemDescription: {
      opacity: "0.64",
      textStyle: "sm",
    },
    itemControl: {
      display: "inline-flex",
      flex: "1",
      pos: "relative",
      rounded: "inherit",
      justifyContent: "var(--radio-card-justify)",
      alignItems: "var(--radio-card-align)",
      _disabled: {
        bg: "bg.muted",
      },
    },
    itemIndicator: {
      bg: "primary.700",
      color: "bg.surface",
    },
  },

  variants: {
    size: {
      sm: {
        item: {
          textStyle: "sm",
        },
        itemControl: {
          padding: "3",
          gap: "1.5",
        },
        itemAddon: {
          px: "3",
          py: "1.5",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          bg: "primary.700",
          color: "bg.surface",
        },
      },
      md: {
        item: {
          textStyle: "sm",
        },
        itemControl: {
          padding: "4",
          gap: "2.5",
        },
        itemAddon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          bg: "primary.700",
          color: "bg.surface",
        },
      },
      lg: {
        item: {
          textStyle: "md",
        },
        itemControl: {
          padding: "4",
          gap: "3.5",
        },
        itemAddon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          bg: "primary.700",
          color: "bg.surface",
        },
      },
    },

    variant: {
      outline: {
        item: {
          borderWidth: "1px",
          borderColor: "border.DEFAULT",
          _checked: {
            borderColor: "primary.700",
            bg: "primary.50",
          },
        },
        itemIndicator: {
          bg: "bg.surface",
          color: "bg.surface",
          _checked: {
            bg: "primary.700",
            color: "bg.surface",
          },
        },
      },

      solid: {
        item: {
          borderWidth: "1px",
          borderColor: "border.DEFAULT",
          _checked: {
            bg: "primary.700",
            color: "bg.surface",
            borderColor: "primary.700",
          },
        },
        itemIndicator: {
          bg: "bg.surface",
          color: "primary.700",
        },
      },
    },

    justify: {
      start: {
        item: { "--radio-card-justify": "flex-start" },
      },
      end: {
        item: { "--radio-card-justify": "flex-end" },
      },
      center: {
        item: { "--radio-card-justify": "center" },
      },
    },

    align: {
      start: {
        item: { "--radio-card-align": "flex-start" },
        itemControl: { textAlign: "start" },
      },
      end: {
        item: { "--radio-card-align": "flex-end" },
        itemControl: { textAlign: "end" },
      },
      center: {
        item: { "--radio-card-align": "center" },
        itemControl: { textAlign: "center" },
      },
    },

    orientation: {
      vertical: {
        itemControl: { flexDirection: "column" },
      },
      horizontal: {
        itemControl: { flexDirection: "row" },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
    align: "start",
    orientation: "horizontal",
  },
});
