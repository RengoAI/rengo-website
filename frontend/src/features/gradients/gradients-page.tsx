import { Section } from "@/components/layout/section";
import {
  LIGHT_FAMILIES,
  LIGHT_VARIANTS,
  LightField,
  type LightFieldVariant,
} from "@/components/site/light-field";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/*
 * Every variant of the site's gradient component (LightField), numbered so
 * picks can be named. Internal: a working page, not linked from the site.
 */

/** One option: the variant in a strip-shaped tile, numbered and named. */
const Tile: React.FC<{ n: number; variant: LightFieldVariant }> = ({
  n,
  variant,
}) => (
  <Box as="figure" display="flex" flexDirection="column" gap="10px">
    <LightField variant={variant} borderRadius="4px" aspectRatio="3 / 4" />
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
  let n = 0;
  return (
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
          light with grain, after ode.com, in the site's colours. Each tile is a
          strip-shaped crop, with the variant's name for use in code.
        </Text>
        <Box display="flex" gap="8px" mt="8px">
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
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap="20px"
            >
              {family.variants.map((variant) => {
                n += 1;
                return <Tile key={variant} n={n} variant={variant} />;
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
};
