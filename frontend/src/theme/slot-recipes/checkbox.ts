import { defineSlotRecipe } from "@chakra-ui/react";

export const checkboxSlotRecipe = defineSlotRecipe({
  className: "rengo-checkbox",
  slots: ["root", "control", "indicator", "label"],
  base: {
    root: {
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      cursor: "pointer",
      gap: "2",
      m: "4px",
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.6,
      },
    },
    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      bg: "bg.surface",
      _hover: {
        bg: "bg.muted",
      },
      _focus: {
        borderColor: "primary.focusRing",
        outline: "1px solid",
        outlineColor: "primary.focusRing",
        outlineOffset: "2px",
      },
      _selected: {
        borderColor: "primary.focusRing",
        outline: "1px solid",
        outlineColor: "primary.focusRing",
        outlineOffset: "2px",
      },
      _checked: {
        bg: "primary.solid !important",
        color: "bg.surface !important",
        borderColor: "border.muted !important",
        _hover: {
          bg: "bg.muted !important",
          color: "primary.solid !important",
          borderColor: "primary.solid !important",
        },
      },
      _indeterminate: {
        bg: "primary.solid",
        borderColor: "primary.solid",
        color: "white",
      },
      _invalid: {
        borderColor: "red.solid",
        _focus: {
          borderColor: "red.focusRing",
          outlineColor: "red.focusRing",
        },
      },
      _disabled: {
        bg: "bg.disabled",
        borderColor: "border.disabled",
        color: "fg.disabled",
        cursor: "not-allowed",
      },
    },
    indicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      fontSize: "0.65em",
      color: "currentColor",
      opacity: 0,
      _checked: {
        opacity: 1,
      },
      _indeterminate: {
        opacity: 1,
      },
    },
    label: {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      color: "fg.default",
      userSelect: "none",
      _disabled: {
        color: "fg.muted",
      },
    },
  },

  variants: {
    size: {
      xs: {
        control: {
          width: "12px",
          height: "12px",
        },
        label: {
          fontSize: "12px",
          lineHeight: "16px",
        },
      },
      sm: {
        control: {
          width: "14px",
          height: "14px",
        },
        label: {
          fontSize: "13px",
          lineHeight: "18px",
        },
      },
      md: {
        control: {
          width: "16px",
          height: "16px",
        },
        label: {
          fontSize: "14px",
          lineHeight: "20px",
        },
      },
      lg: {
        control: {
          width: "20px",
          height: "20px",
        },
        label: {
          fontSize: "16px",
          lineHeight: "24px",
        },
      },
    },
    variant: {
      solid: {},
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
  },
});
