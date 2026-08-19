import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  className: "rengo-text",
  variants: {
    variant: {
      h1: {
        fontFamily: "heading",
        fontSize: "4rem",
        fontWeight: "light",
        letterSpacing: "-0.05em",
        lineHeight: "4.25rem",
        textColor: "gray.800",
      },
      h2: {
        fontFamily: "heading",
        fontSize: "2rem",
        fontWeight: "light",
        letterSpacing: "-0.06em",
        lineHeight: "2.4375rem",
        textColor: "gray.800",
      },
      h3: {
        fontFamily: "heading",
        fontSize: "2xl",
        fontWeight: "normal",
        lineHeight: "1.8125rem",
        textColor: "gray.800",
      },
      h4: {
        fontFamily: "heading",
        fontSize: "xl",
        fontWeight: "normal",
        lineHeight: "1.5rem",
        textColor: "gray.800",
      },
      h5: {
        fontFamily: "heading",
        fontSize: "lg",
        fontWeight: "normal",
        lineHeight: "1.375rem",
        textColor: "gray.800",
      },
      h6: {
        fontFamily: "heading",
        fontSize: "md",
        fontWeight: "normal",
        lineHeight: "1.25rem",
        textColor: "gray.800",
      },
      overline: {
        fontSize: "xs",
        fontWeight: "semibold",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        lineHeight: "0.9375rem",
        textColor: "gray.500",
      },
      body: {
        fontSize: "sm",
        fontWeight: "normal",
        lineHeight: "1.25rem",
      },
      bodyMedium: {
        fontSize: "sm",
        fontWeight: "medium",
        lineHeight: "1.25rem",
      },
      bodySemibold: {
        fontSize: "sm",
        fontWeight: "semibold",
        lineHeight: "1.25rem",
      },
      bodyBold: {
        fontSize: "sm",
        fontWeight: "bold",
        lineHeight: "1.25rem",
      },
      labelLarge: {
        fontSize: "md",
        fontWeight: "medium",
        lineHeight: "1.5rem",
        color: "gray.500",
      },
      label: {
        fontSize: "sm",
        fontWeight: "medium",
        lineHeight: "1.25rem",
        color: "gray.500",
      },
      labelSmall: {
        fontSize: "xs",
        fontWeight: "medium",
        lineHeight: "1rem",
        color: "gray.500",
      },
      labelXSmall: {
        fontSize: "xs",
        fontWeight: "medium",
        lineHeight: "0.875rem",
        color: "gray.500",
      },
      small: {
        fontSize: "xs",
        fontWeight: "normal",
        lineHeight: "1rem",
      },
      smallMedium: {
        fontSize: "xs",
        fontWeight: "medium",
        lineHeight: "1rem",
      },
      smallSemibold: {
        fontSize: "xs",
        fontWeight: "semibold",
        lineHeight: "1rem",
      },
      smallBold: {
        fontSize: "xs",
        fontWeight: "bold",
        lineHeight: "1rem",
      },
      caption: {
        fontSize: "xs",
        fontWeight: "normal",
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
