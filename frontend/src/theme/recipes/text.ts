import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  className: "rengo-text",
  variants: {
    variant: {
      h1: {
        fontSize: "40px",
        fontWeight: "400",
        lineHeight: "48px",
        textColor: "gray.800",
      },
      h2: {
        fontSize: "32px",
        fontWeight: "400",
        lineHeight: "39px",
        textColor: "gray.800",
      },
      h3: {
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "29px",
        textColor: "gray.800",
      },
      h4: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "24px",
        textColor: "gray.800",
      },
      h5: {
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "22px",
        textColor: "gray.800",
      },
      h6: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "20px",
        textColor: "gray.800",
      },
      overline: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        lineHeight: "15px",
        textColor: "gray.500",
      },
      body: {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
      },
      bodySemibold: {
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
      },
      bodyBold: {
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "20px",
      },
      labelLarge: {
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px",
        color: "gray.500",
      },
      label: {
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        color: "gray.500",
      },
      labelSmall: {
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "16px",
        color: "gray.500",
      },
      small: {
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "16px",
      },
      smallSemibold: {
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "16px",
      },
      smallBold: {
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "16px",
      },
      caption: {
        fontSize: "10px",
        fontWeight: "400",
        lineHeight: "normal",
      },
      helper: {
        fontSize: "12px",
        textColor: "gray.600",
      },
      error: {
        fontSize: "14px",
        color: "red.600",
      },
      helperLink: {
        fontSize: "12px",
        color: "blue.600",
        textDecoration: "underline",
      },
    },
  },

  defaultVariants: {
    variant: "body",
  },
});
