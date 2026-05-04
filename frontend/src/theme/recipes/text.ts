import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  className: "rengo-text",
  variants: {
    variant: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: "400",
        lineHeight: "3rem",
        textColor: "gray.800",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: "400",
        lineHeight: "2.4375rem",
        textColor: "gray.800",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: "400",
        lineHeight: "1.8125rem",
        textColor: "gray.800",
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: "400",
        lineHeight: "1.5rem",
        textColor: "gray.800",
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: "400",
        lineHeight: "1.375rem",
        textColor: "gray.800",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.25rem",
        textColor: "gray.800",
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        lineHeight: "0.9375rem",
        textColor: "gray.500",
      },
      body: {
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.25rem",
      },
      bodyMedium: {
        fontSize: "0.875rem",
        fontWeight: "500",
        lineHeight: "1.25rem",
      },
      bodySemibold: {
        fontSize: "0.875rem",
        fontWeight: "600",
        lineHeight: "1.25rem",
      },
      bodyBold: {
        fontSize: "0.875rem",
        fontWeight: "700",
        lineHeight: "1.25rem",
      },
      labelLarge: {
        fontSize: "1rem",
        fontWeight: "500",
        lineHeight: "1.5rem",
        color: "gray.500",
      },
      label: {
        fontSize: "0.875rem",
        fontWeight: "500",
        lineHeight: "1.25rem",
        color: "gray.500",
      },
      labelSmall: {
        fontSize: "0.75rem",
        fontWeight: "500",
        lineHeight: "1rem",
        color: "gray.500",
      },
      labelXSmall: {
        fontSize: "0.625rem",
        fontWeight: "500",
        lineHeight: "0.875rem",
        color: "gray.500",
      },
      small: {
        fontSize: "0.75rem",
        fontWeight: "400",
        lineHeight: "1rem",
      },
      smallMedium: {
        fontSize: "0.75rem",
        fontWeight: "500",
        lineHeight: "1rem",
      },
      smallSemibold: {
        fontSize: "0.75rem",
        fontWeight: "600",
        lineHeight: "1rem",
      },
      smallBold: {
        fontSize: "0.75rem",
        fontWeight: "700",
        lineHeight: "1rem",
      },
      caption: {
        fontSize: "0.625rem",
        fontWeight: "400",
        lineHeight: "normal",
      },
      helper: {
        fontSize: "0.75rem",
        textColor: "gray.600",
      },
      error: {
        fontSize: "0.875rem",
        color: "red.600",
      },
      helperLink: {
        fontSize: "0.75rem",
        color: "blue.600",
        textDecoration: "underline",
      },
    },
  },

  defaultVariants: {
    variant: "body",
  },
});
