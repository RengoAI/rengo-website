import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

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
