import { defineSlotRecipe } from "@chakra-ui/react";

export const inputSlotRecipe = defineSlotRecipe({
  className: "rengo-input",
  slots: ["root", "control"],

  base: {
    root: {
      position: "relative",
      width: "100%",
    },
    control: {
      width: "100%",
      minWidth: "unset",
      lineHeight: "20px",
      fontSize: "14px",
      fontWeight: "400",
      borderWidth: "1px",
      borderRadius: "4px",
      borderColor: "border.muted",
      bg: "white",
      _focus: {
        borderColor: "primary.focusRing",
        outline: "none",
      },
      _placeholder: {
        color: "gray.400",
        fontWeight: "400",
        opacity: 1,
      },
      _invalid: {
        borderColor: "error.600",
      },
      _disabled: {
        opacity: 1,
      },
      _readOnly: {
        color: "gray.700",
        bg: "gray.50",
      },
      "&[type=date][data-blank]": {
        opacity: 0,
        _focus: {
          opacity: 1,
        },
      },
      "&:is(select)": {
        width: "100%",
      },
      "&[data-na]": {
        opacity: 1,
        borderColor: "gray.100",
        bg: "gray.100",
        color: "transparent",
        _placeholder: {
          color: "transparent",
        },
      },
      "&[inputmode=numeric]": {
        fontVariantNumeric: "lining-nums tabular-nums",
      },
    },
  },

  variants: {
    visual: {
      simple: {}, // Base styles are already applied
      "simple-table": {
        control: {
          border: 0,
          height: "100%",
          paddingInline: "16px",
          py: 0,
          bg: "none",
          borderRadius: 0,
          _readOnly: {
            cursor: "default",
          },
        },
      },
    },
    size: {
      xs: {
        control: {
          height: "32px",
          px: "8px",
        },
      },
      sm: {
        control: {
          height: "36px",
          py: "12px",
          px: "16px",
          fontSize: "14px",
          fontWeight: "400",
        },
      },
      md: {
        control: {
          height: "48px",
          py: "12px",
          px: "16px",
        },
      },
      lg: {
        control: {
          borderRadius: 0,
        },
      },
    },
  },

  defaultVariants: {
    visual: "simple",
    size: "md",
  },
});
