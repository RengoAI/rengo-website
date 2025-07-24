import { defineSlotRecipe } from "@chakra-ui/react";

export const toastRecipe = defineSlotRecipe({
  className: "rengo-toast",
  slots: [
    "root",
    "title",
    "description",
    "indicator",
    "closeTrigger",
    "actionTrigger",
  ],

  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "3",
      p: "4",
      minW: "sm",
      borderRadius: "md",
      border: "1px solid",
      backdropFilter: "blur(8px)",
      boxShadow: "lg",
      transition: "all 0.2s ease-in-out",
      position: "relative",
      overflow: "hidden",
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "inherit",
        opacity: 0.9,
        zIndex: -1,
      },
    },
    title: {
      fontSize: "sm",
      fontWeight: "semibold",
      lineHeight: "shorter",
      color: "inherit",
    },
    description: {
      fontSize: "sm",
      lineHeight: "base",
      color: "inherit",
      opacity: 0.9,
      mt: "1",
    },
    indicator: {
      width: "24px",
      height: "24px",
      flexShrink: 0,
    },
    closeTrigger: {
      position: "absolute",
      top: "2",
      right: "2",
      width: "6",
      height: "6",
      borderRadius: "sm",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      opacity: 0.6,
      _hover: {
        opacity: 1,
        bg: "blackAlpha.100",
      },
      "& svg": {
        width: "4",
        height: "4",
      },
    },
    actionTrigger: {
      ml: "auto",
      fontSize: "sm",
      fontWeight: "medium",
      px: "3",
      py: "1.5",
      borderRadius: "sm",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      border: "1px solid",
      borderColor: "currentColor",
      bg: "transparent",
      _hover: {
        bg: "currentColor",
        color: "white",
      },
    },
  },

  variants: {
    status: {
      success: {
        root: {
          bg: { base: "bg.surface !important", _dark: "gray.800 !important" },
          borderColor: {
            base: "success.700 !important",
            _dark: "success.700 !important",
          },
          color: {
            base: "success.700 !important",
            _dark: "success.100 !important",
          },
        },
        title: {
          color: {
            base: "success.700 !important",
            _dark: "success.100 !important",
          },
        },
        description: {
          color: {
            base: "success.700 !important",
            _dark: "success.100 !important",
          },
        },
        indicator: {
          color: {
            base: "success.700 !important",
            _dark: "success.100 !important",
          },
        },
      },
      error: {
        root: {
          bg: { base: "bg.surface !important", _dark: "gray.800 !important" },
          borderColor: {
            base: "error.600 !important",
            _dark: "error.700 !important",
          },
          color: {
            base: "error.900 !important",
            _dark: "error.100 !important",
          },
        },
        title: {
          color: {
            base: "error.600 !important",
            _dark: "error.100 !important",
          },
        },
        description: {
          color: {
            base: "error.600 !important",
            _dark: "error.100 !important",
          },
        },
        indicator: {
          color: {
            base: "error.600 !important",
            _dark: "error.100 !important",
          },
        },
      },
      warning: {
        root: {
          bg: { base: "bg.surface !important", _dark: "gray.800 !important" },
          borderColor: {
            base: "warning.500 !important",
            _dark: "warning.700 !important",
          },
          color: {
            base: "warning.900 !important",
            _dark: "warning.100 !important",
          },
        },
        title: {
          color: {
            base: "warning.500 !important",
            _dark: "warning.100 !important",
          },
        },
        description: {
          color: {
            base: "warning.300 !important",
            _dark: "warning.100 !important",
          },
        },
        indicator: {
          color: {
            base: "warning.500 !important",
            _dark: "warning.100 !important",
          },
        },
      },
      info: {
        root: {
          bg: { base: "bg.surface !important", _dark: "gray.800 !important" },
          borderColor: {
            base: "primary.500 !important",
            _dark: "primary.700 !important",
          },
          color: {
            base: "primary.900 !important",
            _dark: "primary.100 !important",
          },
        },
        title: {
          color: {
            base: "primary.500 !important",
            _dark: "v.100 !important",
          },
        },
        description: {
          color: {
            base: "primary.300 !important",
            _dark: "primary.100 !important",
          },
        },
        indicator: {
          color: {
            base: "primary.500 !important",
            _dark: "primary.100 !important",
          },
        },
      },
      loading: {
        root: {
          bg: { base: "gray.50", _dark: "gray.800" },
          borderColor: { base: "gray.200", _dark: "gray.600" },
          color: { base: "gray.900", _dark: "gray.100" },
        },
      },
    },

    size: {
      sm: {
        root: {
          p: "3",
          minW: "xs",
        },
        title: {
          fontSize: "xs",
        },
        description: {
          fontSize: "xs",
        },
        indicator: {
          width: "20px",
          height: "20px",
        },
      },
      md: {
        root: {
          p: "4",
          minW: "sm",
        },
        title: {
          fontSize: "sm",
        },
        description: {
          fontSize: "sm",
        },
        indicator: {
          width: "24px",
          height: "24px",
        },
      },
      lg: {
        root: {
          p: "5",
          minW: "md",
        },
        title: {
          fontSize: "md",
        },
        description: {
          fontSize: "sm",
        },
        indicator: {
          width: "28px",
          height: "28px",
        },
      },
    },

    variant: {
      solid: {
        root: {
          borderWidth: "1px",
        },
      },
      subtle: {
        root: {
          borderWidth: "0",
          bg: { base: "blackAlpha.50", _dark: "whiteAlpha.50" },
          backdropFilter: "blur(12px)",
        },
      },
      outline: {
        root: {
          bg: "transparent",
          borderWidth: "1px",
          backdropFilter: "blur(8px)",
        },
      },
    },

    dismissible: {
      true: {
        root: {
          pr: "10",
        },
      },
      false: {
        closeTrigger: {
          display: "none",
        },
      },
    },
  },

  compoundVariants: [
    {
      status: "loading",
      css: {
        indicator: {
          animation: "spin 1s linear infinite",
        },
      },
    },
  ],

  defaultVariants: {
    status: "info",
    size: "md",
    variant: "solid",
    dismissible: true,
  },
});
