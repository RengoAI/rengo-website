import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  className: "rengo-text",
  variants: {
    variant: {
      h1: {
        fontSize: "4xl",
        fontWeight: "400",
        lineHeight: "3rem",
        textColor: "gray.800",
      },
      h2: {
        fontSize: "3xl",
        fontWeight: "400",
        lineHeight: "2.4375rem",
        textColor: "gray.800",
      },
      h3: {
        fontSize: "2xl",
        fontWeight: "400",
        lineHeight: "1.8125rem",
        textColor: "gray.800",
      },
      h4: {
        fontSize: "xl",
        fontWeight: "400",
        lineHeight: "1.5rem",
        textColor: "gray.800",
      },
      h5: {
        fontSize: "lg",
        fontWeight: "400",
        lineHeight: "1.375rem",
        textColor: "gray.800",
      },
      h6: {
        fontSize: "md",
        fontWeight: "400",
        lineHeight: "1.25rem",
        textColor: "gray.800",
      },
      overline: {
        fontSize: "xs",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        lineHeight: "0.9375rem",
        textColor: "gray.500",
      },
      body: {
        fontSize: "sm",
        fontWeight: "400",
        lineHeight: "1.25rem",
      },
      bodyMedium: {
        fontSize: "sm",
        fontWeight: "500",
        lineHeight: "1.25rem",
      },
      bodySemibold: {
        fontSize: "sm",
        fontWeight: "600",
        lineHeight: "1.25rem",
      },
      bodyBold: {
        fontSize: "sm",
        fontWeight: "700",
        lineHeight: "1.25rem",
      },
      labelLarge: {
        fontSize: "md",
        fontWeight: "500",
        lineHeight: "1.5rem",
        color: "gray.500",
      },
      label: {
        fontSize: "sm",
        fontWeight: "500",
        lineHeight: "1.25rem",
        color: "gray.500",
      },
      labelSmall: {
        fontSize: "xs",
        fontWeight: "500",
        lineHeight: "1rem",
        color: "gray.500",
      },
      labelXSmall: {
        fontSize: "xs",
        fontWeight: "500",
        lineHeight: "0.875rem",
        color: "gray.500",
      },
      small: {
        fontSize: "xs",
        fontWeight: "400",
        lineHeight: "1rem",
      },
      smallMedium: {
        fontSize: "xs",
        fontWeight: "500",
        lineHeight: "1rem",
      },
      smallSemibold: {
        fontSize: "xs",
        fontWeight: "600",
        lineHeight: "1rem",
      },
      smallBold: {
        fontSize: "xs",
        fontWeight: "700",
        lineHeight: "1rem",
      },
      caption: {
        fontSize: "xs",
        fontWeight: "400",
        lineHeight: "normal",
      },
      helper: {
        fontSize: "xs",
        textColor: "gray.600",
      },
      error: {
        fontSize: "sm",
        color: "red.600",
      },
      helperLink: {
        fontSize: "xs",
        color: "blue.600",
        textDecoration: "underline",
      },
    },
  },

  defaultVariants: {
    variant: "body",
  },
});
