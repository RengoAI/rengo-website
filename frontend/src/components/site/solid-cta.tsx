import { ArrowLink, type ArrowLinkProps } from "@/components/site/arrow-link";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

const TONE_BG = {
  dark: "site.bg.dark",
  light: "site.bg.raised",
  secondary: "site.bg.tint",
} as const;

const TONE_HOVER = {
  dark: { bg: "site.bg.tint" },
  light: { opacity: 0.88 },
  // Two steps down the silver ramp from the resting fill.
  secondary: { bg: "silver.300" },
} as const;

/**
 * Filled CTA in the v3 shape, in a dark, a light or a secondary tone. The
 * dark tone lightens to the footer's silver on hover, its label turning dark.
 * The secondary tone starts on that silver and darkens on hover.
 *
 * With `href` it renders as a link, since it navigates; without, a button.
 * `labelProps` restyles the label, e.g. for the outro's larger CTA.
 */
export const SolidCta: React.FC<
  {
    tone?: "dark" | "light" | "secondary";
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
    bg={TONE_BG[tone]}
    display="inline-flex"
    alignItems="center"
    cursor="pointer"
    transition="opacity 150ms ease, background-color 150ms ease"
    _hover={TONE_HOVER[tone]}
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
