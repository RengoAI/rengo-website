import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * The recurring "label  →" link. Always set in Serrif — in this design the
 * arrow links are the one piece of interface type that uses the display face,
 * which is what makes them read as editorial rather than as buttons.
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
    // textStyle carries its own fontFamily, so the display face has to be set
    // after it or the body face wins.
    textStyle="body.sm"
    fontFamily="display"
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
