import { ArrowLink, type ArrowLinkProps } from "@/components/site/arrow-link";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/** The hover's colour change: a gentle ease in and out, fill and label
 * together. */
const HOVER_EASE = "300ms ease-in-out";

/*
 * The tones are the Business Overview's ink: navy for the primary, its
 * tints for the secondary, white on dark bands. Each hover steps within its
 * own family (navy to slate, haze to line, white to tint), and the label
 * keeps its colour, so nothing flips. Accents (the highlight blue, the
 * crimson) stay off buttons.
 */
const TONE_BG = {
  dark: "overview.navy",
  light: "site.bg.raised",
  secondary: "overview.haze",
} as const;

const TONE_HOVER = {
  dark: { bg: "overview.slate" },
  light: { bg: "overview.tint" },
  secondary: { bg: "overview.line" },
} as const;

/** The label: white on navy, navy on the light tones. */
const TONE_INK = {
  dark: "site.fg.onDark",
  light: "overview.navy",
  secondary: "overview.navy",
} as const;

/**
 * Filled CTA in the v3 shape, in a dark (primary), a light or a secondary
 * tone, in the Business Overview's colours (above).
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
    transition={`background-color ${HOVER_EASE}`}
    _hover={TONE_HOVER[tone]}
    {...rest}
  >
    <ArrowLink
      color={TONE_INK[tone]}
      fontWeight={300}
      gap="20px"
      _hover={{}}
      {...labelProps}
    >
      {children}
    </ArrowLink>
  </Box>
);
