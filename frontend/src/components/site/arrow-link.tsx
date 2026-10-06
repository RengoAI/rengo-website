import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * The recurring "label  →" link, and the label inside every button. Set in
 * Geist like the rest of the interface type.
 *
 * The gap between label and arrow is wide and deliberate; in Figma it is
 * literally spelled with runs of spaces.
 */
export type ArrowLinkProps = Omit<BoxProps, "as"> & {
  href?: string;
  underline?: boolean;
  /** Space between label and arrow. */
  gap?: BoxProps["gap"];
};

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  children,
  href,
  underline = false,
  gap = "24px",
  ...rest
}) => (
  <Box
    as={href ? "a" : "span"}
    {...(href ? { href } : {})}
    display="inline-flex"
    alignItems="center"
    gap={gap}
    textStyle="body.sm"
    textDecoration={underline ? "underline" : "none"}
    textUnderlineOffset="3px"
    cursor="pointer"
    whiteSpace="nowrap"
    transition="opacity 150ms ease"
    _hover={{ opacity: 0.65 }}
    {...rest}
  >
    <Box as="span">{children}</Box>
    <Box as="span" aria-hidden>
      →
    </Box>
  </Box>
);
