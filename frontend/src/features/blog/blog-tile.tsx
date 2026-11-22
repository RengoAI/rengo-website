import {
  LightField,
  type LightFieldVariant,
} from "@/components/site/light-field";
import type { Post } from "@/features/blog/posts";
import { type BoxProps } from "@chakra-ui/react";
import React from "react";

/**
 * Each tile's light: one of the spheres. A post picks one by its slug, so a
 * tile never changes between visits and neighbours differ.
 */
const SPHERES: LightFieldVariant[] = [
  "sphereLow",
  "sphereRight",
  "sphereLeft",
  "sphereLowRight",
];

const sphereFor = (slug: string) =>
  SPHERES[
    [...slug].reduce((sum, c) => (sum * 31 + c.charCodeAt(0)) >>> 0, 7) %
      SPHERES.length
  ];

/**
 * A post's art for the index, after Ode's press tiles: a square of mist
 * with a soft sphere of blue rising in it, under the site's grain.
 */
export const PostTile: React.FC<{ post: Post } & BoxProps> = ({
  post,
  ...props
}) => <LightField variant={sphereFor(post.slug)} aspectRatio={1} {...props} />;
