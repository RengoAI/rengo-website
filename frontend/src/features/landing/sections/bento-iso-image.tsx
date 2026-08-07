import { Image } from "@chakra-ui/react";
import React from "react";

type BentoIsoImageProps = {
  src: string;
  maxH?: string;
  maxW?: string;
};

/** Isometric block art shared across bento tiles. */
export const BentoIsoImage: React.FC<BentoIsoImageProps> = ({
  src,
  maxH = "217px",
  maxW = "240px",
}) => (
  <Image
    src={src}
    alt=""
    aria-hidden
    maxH={maxH}
    maxW={maxW}
    w="auto"
    h="auto"
    objectFit="contain"
    css={{ mixBlendMode: "color-burn" }}
  />
);
