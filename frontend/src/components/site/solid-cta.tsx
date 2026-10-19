import { ArrowLink, type ArrowLinkProps } from "@/components/site/arrow-link";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/** The hover's colour change: a gentle ease in and out, fill and label
 * together. */
const HOVER_EASE = "300ms ease-in-out";

const TONE_BG = {
  dark: "site.bg.dark",
  light: "site.bg.raised",
  secondary: "site.bg.tint",
} as const;

const TONE_HOVER = {
  dark: { bg: "site.bg.tintSky" },
  light: { opacity: 0.88 },
  // Two steps down the silver ramp from the resting fill.
  secondary: { bg: "silver.300" },
} as const;

/**
 * Filled CTA in the v3 shape, in a dark, a light or a secondary tone. The
 * dark tone lightens to Sky on hover, its label turning dark. The
 * secondary tone starts on silver 200 and darkens on hover.
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
    transition={`opacity ${HOVER_EASE}, background-color ${HOVER_EASE}`}
    _hover={TONE_HOVER[tone]}
    {...rest}
  >
    <ArrowLink
      color={tone === "dark" ? "site.fg.onDark" : "site.fg.strong"}
      transition={`color ${HOVER_EASE}`}
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
