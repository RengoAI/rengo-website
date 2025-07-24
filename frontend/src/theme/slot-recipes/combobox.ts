import { defineSlotRecipe } from "@chakra-ui/react";

export const comboboxSlotRecipe = defineSlotRecipe({
  className: "rengo-combobox",
  slots: [
    "root",
    "control",
    "input",
    "trigger",
    "content",
    "item",
    "itemText",
    "itemIndicator",
    "searchIcon",
    "clearTrigger",
    "dropdown",
    "emptyState",
    "loadingState",
    "groupLabel",
    "indicatorGroup",
    "positioner",
    "empty",
    "itemGroup",
    "itemGroupLabel",
  ],

  base: {
    root: {
      position: "relative",
      width: "100%",
    },
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
      _hover: {
        borderColor: "border.default",
      },
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
        _hover: {
          borderColor: "border.muted",
        },
      },
      _readOnly: {
        bg: "gray.50",
        cursor: "default",
        _hover: {
          borderColor: "border.muted",
        },
      },
      "&[data-state=open]": {
        borderColor: "primary.focusRing",
        outlineColor: "primary.focusRing",
        outlineWidth: "1px",
        outlineOffset: "1px",
      },
    },
    input: {
      width: "100%",
      height: "100%",
      px: "16px",
      fontSize: "inherit",
      fontWeight: "inherit",
      bg: "transparent",
      border: "none",
      outline: "none",
      cursor: "inherit",
      _placeholder: {
        color: "gray.400",
        fontWeight: "400",
        opacity: 1,
      },
      _focus: {
        outline: "none",
        boxShadow: "none",
      },
      _disabled: {
        cursor: "not-allowed",
      },
      _readOnly: {
        cursor: "default",
      },
    },
    indicatorGroup: {
      display: "flex",
      alignItems: "center",
      gap: "1",
      px: "2",
    },
    searchIcon: {
      position: "absolute",
      left: "3",
      top: "50%",
      transform: "translateY(-50%)",
      color: "gray.400",
      pointerEvents: "none",
      zIndex: 1,
    },
    trigger: {
      color: "gray.400",
      fontSize: "xs",
      display: "flex",
      alignItems: "center",
      gap: "1",
    },
    clearTrigger: {
      color: "gray.400",
      cursor: "pointer",
      _hover: {
        color: "gray.600",
      },
      fontSize: "xs",
      pointerEvents: "auto",
    },
    positioner: {
      zIndex: "dropdown",
    },
    content: {
      bg: "white",
      border: "1px solid",
      borderColor: "border.muted",
      borderRadius: "4px",
      boxShadow: "lg",
      maxHeight: "300px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0",
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: "16px",
      py: "8px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.1s",
      _hover: {
        bg: "gray.100",
      },
      _highlighted: {
        bg: "gray.100",
      },
      _selected: {
        bg: "primary.50",
        color: "primary.700",
      },
      _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: {
          bg: "transparent",
        },
      },
    },
    itemText: {
      flex: 1,
      textAlign: "left",
    },
    itemIndicator: {
      opacity: 0,
      color: "primary.600",
      _selected: {
        opacity: 1,
      },
    },
    itemGroup: {
      display: "flex",
      flexDirection: "column",
    },
    itemGroupLabel: {
      px: "16px",
      py: "8px",
      fontSize: "sm",
      fontWeight: "medium",
      color: "gray.600",
      bg: "gray.50",
    },
    empty: {
      p: "16px",
      textAlign: "center",
      color: "gray.500",
      fontSize: "14px",
    },
    emptyState: {
      p: "16px",
      textAlign: "center",
      color: "gray.500",
      fontSize: "14px",
    },
    loadingState: {
      p: "16px",
      textAlign: "center",
      color: "gray.500",
      fontSize: "14px",
    },
  },

  variants: {
    size: {
      xs: {
        control: {
          height: "32px",
        },
        input: {
          px: "16px",
        },
      },
      sm: {
        control: {
          height: "36px",
        },
        input: {
          py: "7px",
          fontSize: "14px",
          fontWeight: "400",
        },
      },
      md: {
        control: {
          height: "48px",
        },
        input: {
          py: "13px",
          px: "16px",
        },
      },
      lg: {
        control: {
          height: "56px",
        },
        input: {
          py: "17px",
          px: "16px",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});
