import { Box } from "@chakra-ui/react";
import { MeshGradient } from "@paper-design/shaders-react";
import React from "react";

// Mesh-gradient stops, fed to a WebGL renderer that only takes concrete color
// values, so these can't be theme tokens. Paper Design export, shared with the
// app's sign-in background (RengoAI/rengo#3540) so the two read as one surface.
const MESH_COLORS = ["#A0C0EE", "#D7E4F5", "#FEFEFE"];

interface MeshGradientWashProps {
  /** Faint by default so copy stays legible over it. */
  opacity?: number;
}

/**
 * The soft animated wash used behind marketing surfaces. Purely decorative:
 * aria-hidden and inert to the pointer, so it never interferes with the
 * content layered above it.
 */
export const MeshGradientWash: React.FC<MeshGradientWashProps> = ({
  opacity = 0.5,
}) => (
  <Box
    aria-hidden
    position="absolute"
    inset={0}
    overflow="hidden"
    pointerEvents="none"
  >
    <MeshGradient
      speed={0.4}
      scale={1}
      distortion={0.8}
      swirl={0.83}
      grainMixer={0.03}
      grainOverlay={0.1}
      colors={MESH_COLORS}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    />
  </Box>
);
