import { Section } from "@/components/layout/section";
import { GRAIN_TILE } from "@/components/site/site-styles";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/*
 * A gallery of gradient options for the landing's graphics, after ode.com:
 * blurred light on paper, with grain, never drawn. Each tile is numbered so
 * picks can be named. Internal: a working page, not linked from the site.
 *
 * The shapes are real elements blurred with CSS filters (blobs, beams, fog
 * squares), which gives the soft organic edges ode.com has; plain CSS
 * gradients only make ellipses.
 */

// The site's colours, as RGB for alpha.
const SKY = "176, 199, 235"; // colors.sky
const STEEL = "143, 169, 188"; // overview.steel
const SLATE = "53, 86, 109"; // overview.slate
const BLUE = "41, 109, 219"; // site.highlight
const BLUSH = "170, 72, 103"; // colors.crimson
const MIST = "rgb(225, 233, 239)";
const PAPER = "#F8F8F8";

type Shape = {
  /** Centre, as % of the tile. */
  x: number;
  y: number;
  /** Size, as % of the tile's width and height. */
  w: number;
  h: number;
  /** RGB triple and alpha. */
  rgb: string;
  a: number;
  /** Blur, px. */
  blur: number;
  /** Degrees. */
  rotate?: number;
  /** Corner rounding: a blob, a soft square or a beam. */
  radius?: string;
};

type Variant = { name: string; base: string; shapes: Shape[] };

const BLOB = "50%";
const SQUARE = "18%";
const BEAM = "999px";

const FAMILIES: { title: string; note: string; variants: Variant[] }[] = [
  {
    title: "Pools",
    note: "What the strips use now: the blog's wash, pooled differently per step.",
    variants: [
      {
        name: "Small pool",
        base: MIST,
        shapes: [
          {
            x: 25,
            y: 22,
            w: 70,
            h: 45,
            rgb: SKY,
            a: 0.9,
            blur: 40,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Low beam",
        base: MIST,
        shapes: [
          {
            x: 55,
            y: 42,
            w: 120,
            h: 22,
            rgb: SKY,
            a: 0.95,
            blur: 30,
            radius: BEAM,
          },
          {
            x: 10,
            y: 88,
            w: 50,
            h: 35,
            rgb: BLUSH,
            a: 0.18,
            blur: 40,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Broad pool",
        base: MIST,
        shapes: [
          {
            x: 55,
            y: 38,
            w: 90,
            h: 60,
            rgb: SKY,
            a: 0.95,
            blur: 45,
            radius: BLOB,
          },
          {
            x: 85,
            y: 95,
            w: 55,
            h: 35,
            rgb: BLUSH,
            a: 0.2,
            blur: 40,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Full sky",
        base: MIST,
        shapes: [
          {
            x: 60,
            y: 15,
            w: 140,
            h: 75,
            rgb: SKY,
            a: 1,
            blur: 50,
            radius: BLOB,
          },
          {
            x: 15,
            y: 92,
            w: 60,
            h: 40,
            rgb: BLUSH,
            a: 0.22,
            blur: 40,
            radius: BLOB,
          },
        ],
      },
    ],
  },
  {
    title: "Beams",
    note: "ode.com's hero: a long soft shaft of light at an angle.",
    variants: [
      {
        name: "Sky beam, rising",
        base: PAPER,
        shapes: [
          {
            x: 50,
            y: 55,
            w: 130,
            h: 16,
            rgb: SKY,
            a: 1,
            blur: 22,
            rotate: -24,
            radius: BEAM,
          },
        ],
      },
      {
        name: "Blush beam",
        base: PAPER,
        shapes: [
          {
            x: 50,
            y: 50,
            w: 130,
            h: 18,
            rgb: BLUSH,
            a: 0.28,
            blur: 24,
            rotate: -18,
            radius: BEAM,
          },
        ],
      },
      {
        name: "Crossed beams",
        base: PAPER,
        shapes: [
          {
            x: 50,
            y: 45,
            w: 130,
            h: 14,
            rgb: SKY,
            a: 1,
            blur: 22,
            rotate: -28,
            radius: BEAM,
          },
          {
            x: 50,
            y: 60,
            w: 120,
            h: 12,
            rgb: BLUSH,
            a: 0.25,
            blur: 22,
            rotate: 16,
            radius: BEAM,
          },
        ],
      },
      {
        name: "Steel beam, low",
        base: MIST,
        shapes: [
          {
            x: 45,
            y: 72,
            w: 140,
            h: 20,
            rgb: STEEL,
            a: 0.75,
            blur: 26,
            rotate: -8,
            radius: BEAM,
          },
        ],
      },
      {
        name: "Tapered beam",
        base: PAPER,
        shapes: [
          {
            x: 35,
            y: 58,
            w: 70,
            h: 26,
            rgb: SKY,
            a: 0.9,
            blur: 30,
            rotate: -20,
            radius: BEAM,
          },
          {
            x: 70,
            y: 44,
            w: 70,
            h: 9,
            rgb: SKY,
            a: 1,
            blur: 14,
            rotate: -20,
            radius: BEAM,
          },
        ],
      },
    ],
  },
  {
    title: "Fog squares",
    note: "ode.com's tab panel: a soft square of colour fogging out to paper.",
    variants: [
      {
        name: "Sky fog",
        base: PAPER,
        shapes: [
          {
            x: 52,
            y: 55,
            w: 75,
            h: 70,
            rgb: SKY,
            a: 1,
            blur: 36,
            radius: SQUARE,
          },
        ],
      },
      {
        name: "Steel fog",
        base: PAPER,
        shapes: [
          {
            x: 52,
            y: 55,
            w: 75,
            h: 70,
            rgb: STEEL,
            a: 0.9,
            blur: 36,
            radius: SQUARE,
          },
        ],
      },
      {
        name: "Fog off the corner",
        base: PAPER,
        shapes: [
          {
            x: 68,
            y: 70,
            w: 85,
            h: 80,
            rgb: STEEL,
            a: 0.85,
            blur: 34,
            radius: SQUARE,
          },
        ],
      },
      {
        name: "Deep fog",
        base: PAPER,
        shapes: [
          {
            x: 52,
            y: 55,
            w: 80,
            h: 75,
            rgb: SKY,
            a: 1,
            blur: 36,
            radius: SQUARE,
          },
          {
            x: 55,
            y: 58,
            w: 40,
            h: 38,
            rgb: BLUE,
            a: 0.35,
            blur: 34,
            radius: SQUARE,
          },
        ],
      },
      {
        name: "Slate fog",
        base: MIST,
        shapes: [
          {
            x: 50,
            y: 50,
            w: 70,
            h: 65,
            rgb: SLATE,
            a: 0.45,
            blur: 40,
            radius: SQUARE,
          },
        ],
      },
    ],
  },
  {
    title: "Blobs",
    note: "ode.com's haze behind copy: an off-centre organic shape.",
    variants: [
      {
        name: "Blush blob",
        base: PAPER,
        shapes: [
          {
            x: 40,
            y: 45,
            w: 70,
            h: 80,
            rgb: BLUSH,
            a: 0.25,
            blur: 30,
            rotate: -20,
            radius: "60% 40% 55% 45%",
          },
        ],
      },
      {
        name: "Sky blob",
        base: PAPER,
        shapes: [
          {
            x: 55,
            y: 45,
            w: 75,
            h: 75,
            rgb: SKY,
            a: 1,
            blur: 30,
            rotate: 15,
            radius: "55% 45% 40% 60%",
          },
        ],
      },
      {
        name: "Blob pair",
        base: PAPER,
        shapes: [
          {
            x: 38,
            y: 40,
            w: 60,
            h: 55,
            rgb: SKY,
            a: 1,
            blur: 30,
            radius: "55% 45% 40% 60%",
          },
          {
            x: 68,
            y: 68,
            w: 45,
            h: 45,
            rgb: BLUSH,
            a: 0.22,
            blur: 30,
            radius: "45% 55% 60% 40%",
          },
        ],
      },
      {
        name: "Tall blob",
        base: MIST,
        shapes: [
          {
            x: 50,
            y: 50,
            w: 45,
            h: 95,
            rgb: SKY,
            a: 1,
            blur: 32,
            rotate: 10,
            radius: "50% 50% 45% 55%",
          },
        ],
      },
      {
        name: "Small blob, high",
        base: PAPER,
        shapes: [
          {
            x: 70,
            y: 25,
            w: 45,
            h: 40,
            rgb: SKY,
            a: 1,
            blur: 26,
            radius: BLOB,
          },
        ],
      },
    ],
  },
  {
    title: "Horizons and meshes",
    note: "Wider light: a band across, a dawn, a corner glow, several colours meeting.",
    variants: [
      {
        name: "Horizon band",
        base: PAPER,
        shapes: [
          {
            x: 50,
            y: 55,
            w: 160,
            h: 30,
            rgb: SKY,
            a: 0.95,
            blur: 40,
            radius: BEAM,
          },
        ],
      },
      {
        name: "Dawn",
        base: PAPER,
        shapes: [
          {
            x: 50,
            y: 10,
            w: 160,
            h: 55,
            rgb: SKY,
            a: 1,
            blur: 45,
            radius: BLOB,
          },
          {
            x: 50,
            y: 100,
            w: 140,
            h: 45,
            rgb: BLUSH,
            a: 0.2,
            blur: 45,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Corner glow",
        base: PAPER,
        shapes: [
          {
            x: 95,
            y: 5,
            w: 110,
            h: 90,
            rgb: SKY,
            a: 1,
            blur: 50,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Mesh",
        base: MIST,
        shapes: [
          {
            x: 25,
            y: 25,
            w: 70,
            h: 60,
            rgb: SKY,
            a: 1,
            blur: 40,
            radius: BLOB,
          },
          {
            x: 80,
            y: 40,
            w: 55,
            h: 55,
            rgb: STEEL,
            a: 0.6,
            blur: 40,
            radius: BLOB,
          },
          {
            x: 45,
            y: 85,
            w: 70,
            h: 45,
            rgb: BLUSH,
            a: 0.18,
            blur: 40,
            radius: BLOB,
          },
          {
            x: 60,
            y: 55,
            w: 40,
            h: 35,
            rgb: "255, 255, 255",
            a: 0.7,
            blur: 30,
            radius: BLOB,
          },
        ],
      },
      {
        name: "Blue core",
        base: MIST,
        shapes: [
          {
            x: 50,
            y: 50,
            w: 100,
            h: 90,
            rgb: SKY,
            a: 1,
            blur: 45,
            radius: BLOB,
          },
          {
            x: 50,
            y: 52,
            w: 35,
            h: 30,
            rgb: BLUE,
            a: 0.3,
            blur: 30,
            radius: BLOB,
          },
        ],
      },
    ],
  },
];

/** One option: its shapes blurred on its base, under the site's grain. */
const Tile: React.FC<{ n: number; variant: Variant }> = ({ n, variant }) => (
  <Box as="figure" display="flex" flexDirection="column" gap="10px">
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="4px"
      aspectRatio="3 / 4"
      bg={variant.base}
      // Keeps the blurs inside the tile's rounded corners.
      isolation="isolate"
    >
      {variant.shapes.map((s, i) => (
        <Box
          key={i}
          aria-hidden
          position="absolute"
          left={`${s.x - s.w / 2}%`}
          top={`${s.y - s.h / 2}%`}
          w={`${s.w}%`}
          h={`${s.h}%`}
          borderRadius={s.radius ?? BLOB}
          bg={`rgba(${s.rgb}, ${s.a})`}
          transform={s.rotate ? `rotate(${s.rotate}deg)` : undefined}
          filter={`blur(${s.blur}px)`}
        />
      ))}
      <Box
        aria-hidden
        position="absolute"
        inset={0}
        bgImage={GRAIN_TILE}
        bgSize="200px 200px"
      />
    </Box>
    <Text as="figcaption" textStyle="body.sm" color="site.fg">
      <Box as="span" fontWeight={500} color="site.highlight" mr="8px">
        {n}
      </Box>
      {variant.name}
    </Text>
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
          Blurred light with grain, after ode.com, in the site's colours: sky,
          steel, slate, the highlight blue and a blush of crimson. Each tile is
          a strip-shaped crop. Name the numbers you like.
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
        {FAMILIES.map((family) => (
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
                return <Tile key={variant.name} n={n} variant={variant} />;
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
};
