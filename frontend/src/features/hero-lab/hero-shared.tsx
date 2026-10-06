import { ArrowLink } from "@/components/site/arrow-link";
import { colors } from "@/theme/tokens/colors";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * Raw palette values for canvas drawing, read from the tokens so the
 * procedural art can't drift from the rest of the page. Canvas can't resolve
 * Chakra tokens, so the hex has to come out here.
 */
export const INK = {
  canvas0: colors.canvas[0].value,
  canvas100: colors.canvas[100].value,
  canvas200: colors.canvas[200].value,
  canvas400: colors.canvas[400].value,
  canvas500: colors.canvas[500].value,
  rengo300: colors.rengo[300].value,
  rengo400: colors.rengo[400].value,
  rengo500: colors.rengo[500].value,
  rengo600: colors.rengo[600].value,
  rengo700: colors.rengo[700].value,
  sky: colors.sky.value,
  silver100: colors.silver[100].value,
  silver200: colors.silver[200].value,
  silver300: colors.silver[300].value,
  silver400: colors.silver[400].value,
  silver500: colors.silver[500].value,
  soot200: colors.soot[200].value,
  soot300: colors.soot[300].value,
  soot400: colors.soot[400].value,
  soot500: colors.soot[500].value,
  soot700: colors.soot[700].value,
  soot800: colors.soot[800].value,
  crimson: colors.crimson.value,
};

/** Hero copy, shared verbatim so the four designs compare on form alone. */
export const HEADLINE = "Building your intelligent data layer";
export const DESCRIPTION =
  "We’re the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm’s knowledge.";

/** The maroon underscore that closes the headline on the live page. */
export const Cursor: React.FC = () => (
  <Box as="span" color="site.accent">
    _
  </Box>
);

/**
 * Hero height: one viewport under the sticky nav, held between a floor that
 * keeps the art legible and a ceiling that keeps it from going sparse on
 * tall screens.
 */
export const HERO_BOX: BoxProps = {
  as: "section",
  position: "relative",
  h: "calc(100svh - 52px)",
  minH: "720px",
  maxH: "940px",
  overflow: "hidden",
};

/** Full-bleed canvas behind a hero. */
export const CanvasFill = React.forwardRef<HTMLCanvasElement, BoxProps>(
  (props, ref) => (
    <Box
      as="canvas"
      ref={ref}
      position="absolute"
      inset={0}
      w="full"
      h="full"
      display="block"
      aria-hidden
      {...props}
    />
  ),
);
CanvasFill.displayName = "CanvasFill";

/** Filled CTA in the v3 shape, in a dark or a light tone. */
export const SolidCta: React.FC<{ tone?: "dark" | "light" } & BoxProps> = ({
  tone = "dark",
  children = "Get started",
  ...rest
}) => (
  <Box
    as="button"
    h="40px"
    px="14px"
    borderRadius="2px"
    bg={tone === "dark" ? "site.bg.dark" : "site.bg.raised"}
    display="inline-flex"
    alignItems="center"
    cursor="pointer"
    transition="opacity 150ms ease"
    _hover={{ opacity: 0.88 }}
    {...rest}
  >
    <ArrowLink
      color={tone === "dark" ? "site.fg.onDark" : "site.fg.strong"}
      fontWeight={300}
      gap="40px"
      _hover={{}}
    >
      {children}
    </ArrowLink>
  </Box>
);
