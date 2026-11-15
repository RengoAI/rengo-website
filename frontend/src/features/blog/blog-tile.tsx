import { GRAIN_TILE } from "@/components/site/site-styles";
import type { Post } from "@/features/blog/posts";
import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

const SKY = "176, 199, 235";
const MIST = "225, 233, 239";
const BLUSH = "170, 72, 103";
const DEEP = "41, 109, 219"; // site.highlight

/**
 * Each tile's light: where the sphere of blue sits and how it's tinted. A
 * post picks one by its slug, so a tile never changes between visits and
 * neighbours differ.
 */
const LIGHTS = [
  { x: 50, y: 82, tint: DEEP, glow: BLUSH },
  { x: 72, y: 62, tint: DEEP, glow: SKY },
  { x: 28, y: 72, tint: DEEP, glow: SKY },
  { x: 62, y: 92, tint: DEEP, glow: BLUSH },
] as const;

const lightFor = (slug: string) =>
  LIGHTS[
    [...slug].reduce((sum, c) => (sum * 31 + c.charCodeAt(0)) >>> 0, 7) %
      LIGHTS.length
  ];

/**
 * A post's art for the index, after Ode's press tiles: a square of mist
 * with a soft sphere of blue rising in it, under the site's grain.
 */
export const PostTile: React.FC<{ post: Post } & BoxProps> = ({
  post,
  ...props
}) => {
  const { x, y, tint, glow } = lightFor(post.slug);
  return (
    <Box
      position="relative"
      aspectRatio={1}
      overflow="hidden"
      bg={`rgb(${MIST})`}
      bgImage={[
        GRAIN_TILE,
        `radial-gradient(circle at ${x}% ${y}%, rgba(${tint}, 0.6) 0%, rgba(${tint}, 0.28) 30%, transparent 60%)`,
        `radial-gradient(ellipse 80% 60% at ${100 - x}% 0%, rgba(${glow}, 0.18) 0%, transparent 70%)`,
        `linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 60%)`,
      ].join(", ")}
      bgSize="200px 200px, auto, auto, auto"
      bgRepeat="repeat, no-repeat, no-repeat, no-repeat"
      aria-hidden
      {...props}
    />
  );
};
