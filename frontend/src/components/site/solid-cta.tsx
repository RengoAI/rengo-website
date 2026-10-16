import { ArrowLink, type ArrowLinkProps } from "@/components/site/arrow-link";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * Filled CTA in the v3 shape, in a dark or a light tone. The dark tone
 * lightens to the footer's silver on hover, its label turning dark.
 *
 * With `href` it renders as a link, since it navigates; without, a button.
 * `labelProps` restyles the label, e.g. for the outro's larger CTA.
 */
export const SolidCta: React.FC<
  {
    tone?: "dark" | "light";
    href?: string;
    labelProps?: ArrowLinkProps;
  } & BoxProps
> = ({
  tone = "dark",
  children = "Get started",
  href,
  labelProps,
  ...rest
}) => (
  <Box
    {...(href ? { as: "a", href } : { as: "button", type: "button" })}
    h="40px"
    px="14px"
    borderRadius="4px"
    className="group"
    bg={tone === "dark" ? "site.bg.dark" : "site.bg.raised"}
    display="inline-flex"
    alignItems="center"
    cursor="pointer"
    transition="opacity 150ms ease, background-color 150ms ease"
    _hover={tone === "dark" ? { bg: "site.bg.tint" } : { opacity: 0.88 }}
    {...rest}
  >
    <ArrowLink
      color={tone === "dark" ? "site.fg.onDark" : "site.fg.strong"}
      transition="color 150ms ease"
      _groupHover={tone === "dark" ? { color: "site.fg.strong" } : undefined}
      fontWeight={300}
      gap="20px"
      _hover={{}}
      {...labelProps}
    >
      {children}
    </ArrowLink>
  </Box>
);
