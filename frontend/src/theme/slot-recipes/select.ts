import { defineSlotRecipe } from "@chakra-ui/react";

export const selectSlotRecipe = defineSlotRecipe({
  className: "rengo-select",
  slots: [
    "root",
    "control",
    "trigger",
    "content",
    "item",
    "itemText",
    "itemIndicator",
    "valueText",
    "indicator",
    "clearTrigger",
  ],

  base: {
    control: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      width: "100%",
      minWidth: "unset",
      fontSize: "14px",
      fontWeight: "400",
      borderWidth: "1px",
      borderRadius: "4px",
      borderColor: "border.muted",
      bg: "white",
      cursor: "pointer",
      _focus: {
        borderColor: "primary.focusRing",
        outlineColor: "primary.focusRing",
        outlineWidth: "1px",
        outlineOffset: "1px",
      },
      _invalid: {
        borderColor: "error.600",
      },

      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      "&[data-state=open]": {
        borderColor: "primary.focusRing",
        outlineColor: "primary.focusRing",
        outlineWidth: "1px",
        outlineOffset: "1px",
      },
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      px: "16px",
      py: "13px",
      fontSize: "inherit",
      fontWeight: "inherit",
      bg: "transparent",
      border: "none",
      cursor: "inherit",
      _focus: {
        outline: "none",
      },
    },
    content: {
      bg: "white",
      border: "1px solid",
      borderColor: "border.muted",
      borderRadius: "4px",
      boxShadow: "lg",
      zIndex: "dropdown",
      maxHeight: "300px",
      overflowY: "auto",
      py: "2",
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: "16px",
      py: "8px",
      fontSize: "14px",
      cursor: "pointer",
      _hover: {
        bg: "gray.50",
      },
      _highlighted: {
        bg: "primary.50",
        color: "primary.700",
      },
      _selected: {
        bg: "primary.100",
        color: "primary.800",
        fontWeight: "500",
      },
    },
    itemText: {
      flex: 1,
      textAlign: "left",
    },
    itemIndicator: {
      opacity: 0,
      _selected: {
        opacity: 1,
      },
    },
    valueText: {
      flex: 1,
      textAlign: "left",
      fontWeight: "400",
      color: "inherit",
    },
    indicator: {
      ml: "2",
      color: "gray.400",
      _disabled: {
        opacity: 0.6,
      },
    },
    clearTrigger: {
      mr: "1",
    },
  },

  variants: {
    size: {
      xs: {
        control: {
          height: "32px",
          fontSize: "12px",
        },
        trigger: {
          px: "12px",
          py: "6px",
          fontSize: "12px",
        },
        item: {
          px: "12px",
          py: "6px",
          fontSize: "12px",
        },
      },
      sm: {
        control: {
          height: "36px",
          fontSize: "14px",
        },
        trigger: {
          px: "14px",
          py: "7px",
          fontSize: "14px",
        },
        item: {
          px: "14px",
          py: "7px",
          fontSize: "14px",
        },
      },
      md: {
        control: {
          height: "48px",
          fontSize: "14px",
        },
        trigger: {
          px: "16px",
          py: "13px",
          fontSize: "14px",
        },
        item: {
          px: "16px",
          py: "8px",
          fontSize: "14px",
        },
      },
      lg: {
        control: {
          height: "56px",
          fontSize: "16px",
          borderRadius: "6px",
        },
        trigger: {
          px: "20px",
          py: "16px",
          fontSize: "16px",
        },
        item: {
          px: "20px",
          py: "10px",
          fontSize: "16px",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});
