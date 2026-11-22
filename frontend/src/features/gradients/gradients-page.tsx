import { Section } from "@/components/layout/section";
import {
  LIGHT_FAMILIES,
  LIGHT_VARIANTS,
  LightField,
  type LightFieldVariant,
} from "@/components/site/light-field";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { StatementBand } from "@/components/site/statement-band";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/*
 * Every variant of the site's gradient component (LightField), numbered so
 * picks can be named. Internal: a working page, not linked from the site.
 */

type Shape = "strip" | "band";

/** One option, numbered and named: the variant as a strip-shaped tile, or
 * as a wide statement band with the landing's line over it. */
const Tile: React.FC<{
  n: number;
  variant: LightFieldVariant;
  shape: Shape;
}> = ({ n, variant, shape }) => (
  <Box as="figure" display="flex" flexDirection="column" gap="10px">
    {shape === "strip" ? (
      <LightField variant={variant} borderRadius="4px" aspectRatio="3 / 4" />
    ) : (
      <Box position="relative" borderRadius="4px" overflow="hidden">
        <LightField variant={variant} aspectRatio="16 / 7" />
        <Text
          position="absolute"
          inset={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          textStyle="d1"
          fontSize={{ base: "1rem", md: "1.375rem", lg: "1.75rem" }}
          lineHeight="1.1"
          color="site.fg.heading"
        >
          AI is only as reliable as
          <Box as="span" color="site.highlight">
            the information it works from
          </Box>
        </Text>
      </Box>
    )}
    <Box as="figcaption">
      <Text textStyle="body.sm" color="site.fg">
        <Box as="span" fontWeight={500} color="site.highlight" mr="8px">
          {n}
        </Box>
        {LIGHT_VARIANTS[variant].name}
      </Text>
      <Text textStyle="label" color="site.fg.muted" fontFamily="mono">
        {variant}
      </Text>
    </Box>
  </Box>
);

export const GradientsPage: React.FC = () => {
  const [ground, setGround] = React.useState<"wash" | "paper">("wash");
  const [shape, setShape] = React.useState<Shape>("strip");
  let n = 0;
  return (
    <>
      <Section
        {...(ground === "wash"
          ? TESTIMONIAL_WASHES.midReversed
          : { bg: "site.bg.surface", bgImage: "none" })}
        pt="120px"
      >
        <Box display="flex" flexDirection="column" gap="12px" mb="48px">
          <Text as="h1" textStyle="h3" color="site.fg.heading">
            Gradient options
          </Text>
          <Text textStyle="body.sm" color="site.fg" maxW="560px">
            Every variant of the site's gradient component, LightField: blurred
            light with grain, after ode.com, in the site's colours, with each
            variant's name for use in code. See them as strips, or as the wide
            statement band with its line over them.
          </Text>
          <Box display="flex" gap="8px" mt="8px" flexWrap="wrap">
            {(["strip", "band"] as const).map((v) => (
              <Box
                as="button"
                key={v}
                onClick={() => setShape(v)}
                px="12px"
                h="28px"
                borderRadius="4px"
                textStyle="label"
                fontWeight={500}
                bg={shape === v ? "site.bg.dark" : "rgba(255, 255, 255, 0.6)"}
                color={shape === v ? "site.fg.onDark" : "site.fg"}
              >
                {v === "strip" ? "As strips" : "As full statement bands"}
              </Box>
            ))}
            <Box w="16px" />
            {(["wash", "paper"] as const).map((g) => (
              <Box
                as="button"
                key={g}
                onClick={() => setGround(g)}
                px="12px"
                h="28px"
                borderRadius="4px"
                textStyle="label"
                fontWeight={500}
                bg={ground === g ? "site.bg.dark" : "rgba(255, 255, 255, 0.6)"}
                color={ground === g ? "site.fg.onDark" : "site.fg"}
              >
                {g === "wash" ? "On the approach wash" : "On the page"}
              </Box>
            ))}
          </Box>
        </Box>
        {shape === "strip" && (
          <Box display="flex" flexDirection="column" gap="64px">
            {LIGHT_FAMILIES.map((family) => (
              <Box
                key={family.title}
                display="flex"
                flexDirection="column"
                gap="20px"
              >
                <Box>
                  <Text as="h2" textStyle="h5" color="site.fg.heading">
                    {family.title}
                  </Text>
                  <Text textStyle="body.sm" color="site.fg.muted">
                    {family.note}
                  </Text>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns={
                    shape === "strip"
                      ? {
                          base: "repeat(2, 1fr)",
                          md: "repeat(3, 1fr)",
                          lg: "repeat(5, 1fr)",
                        }
                      : { base: "1fr", lg: "repeat(2, 1fr)" }
                  }
                  gap="20px"
                >
                  {family.variants.map((variant) => {
                    n += 1;
                    return (
                      <Tile
                        key={variant}
                        n={n}
                        variant={variant}
                        shape={shape}
                      />
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Section>
      {/* Every variant as the landing's statement band, full width, with its
      scroll reveal. */}
      {shape === "band" &&
        LIGHT_FAMILIES.flatMap((family) => family.variants).map(
          (variant, i) => (
            <Box key={variant} position="relative">
              <Box
                position="absolute"
                top="16px"
                left="var(--site-gutter, 40px)"
                zIndex={2}
                px="10px"
                py="4px"
                borderRadius="4px"
                bg="rgba(255, 255, 255, 0.75)"
              >
                <Text textStyle="body.sm" color="site.fg">
                  <Box
                    as="span"
                    fontWeight={500}
                    color="site.highlight"
                    mr="8px"
                  >
                    {i + 1}
                  </Box>
                  {LIGHT_VARIANTS[variant].name}
                  <Box
                    as="span"
                    color="site.fg.muted"
                    ml="8px"
                    fontFamily="mono"
                  >
                    {variant}
                  </Box>
                </Text>
              </Box>
              <StatementBand
                lead="AI is only as reliable as"
                point="the information it works from"
                light={variant}
              />
            </Box>
          ),
        )}
    </>
  );
};
