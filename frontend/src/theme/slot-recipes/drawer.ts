import { zIndices } from "@/theme/z-indices";
import { defineSlotRecipe } from "@chakra-ui/react";

export const drawerRecipe = defineSlotRecipe({
  className: "rengo-drawer",
  slots: [
    "root",
    "overlay",
    "content",
    "header",
    "body",
    "footer",
    "closeButton",
  ],

  base: {
    root: {
      position: "fixed",
      inset: 0,
      zIndex: zIndices.drawer,
      pointerEvents: "none",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      overflow: "auto",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "drawerOverlay",
      pointerEvents: "auto",
    },
    content: {
      position: "fixed",
      right: 2,
      top: 0,
      pointerEvents: "auto",
      background: "bg.surface",
      boxShadow: "lg",
      display: "flex",
      flexDirection: "column",
      maxHeight: "100vh",
    },
    header: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      gap: "2",
      padding: "24px",
      flexShrink: 0,
    },
    body: {
      pb: 8,
      overflowY: "auto",
      flex: 1,
      minHeight: 0,
    },
    footer: {
      padding: "24px",
    },
    closeButton: {
      top: "16px",
      right: "16px",
    },
  },

  variants: {
    variant: {
      floating: {
        content: {
          margin: "72px 8px 8px 8px",
          borderRadius: 8,
          height: "calc(100vh - 80px)",
          maxHeight: "calc(100vh - 80px)",
        },
        header: {
          textStyle: "h4",
        },
      },
      fullscreen: {
        content: {
          margin: 0,
          borderRadius: 0,
        },
      },
    },
    size: {
      sm: {
        content: {
          maxWidth: "360px",
        },
      },
      md: {
        content: {
          maxWidth: "504px",
        },
      },
      lg: {
        content: {
          maxWidth: "700px",
        },
      },
      full: {
        content: {
          position: "fixed",
          top: "-20px",
          left: "40px",
          right: "40px",
          borderRadius: 8,
          width: "auto",
          height: "auto",
          maxHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          margin: "0",
          overflowY: "auto",
        },
      },
      fullscreen: {
        root: {
          position: "fixed",
          inset: 0,
          zIndex: zIndices.drawer,
          pointerEvents: "none",
          justifyContent: "center",
          alignItems: "center",
        },
        overlay: {
          position: "fixed",
          inset: 0,
          background: "drawerOverlay",
          zIndex: zIndices.drawer,
          pointerEvents: "auto",
        },
        content: {
          position: "fixed",
          inset: 0,
          borderRadius: 0,
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "auto",
        },
        header: {
          flexShrink: 0,
        },
        body: {
          flex: 1,
          overflowY: "auto",
        },
        footer: {
          flexShrink: 0,
        },
        closeButton: {
          position: "fixed",
          top: "24px",
          right: "24px",
        },
      },
    },
  },

  defaultVariants: {
    variant: "floating",
    size: "md",
  },
});
