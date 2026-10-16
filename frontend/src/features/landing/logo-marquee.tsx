import { Box, Image } from "@chakra-ui/react";
import React from "react";

/**
 * The logo strip, drifting slowly right to left on a loop. Two copies of the
 * strip sit end to end and the track slides by one copy's width, so the
 * second lands exactly where the first began. The ends fade out, so logos
 * ease in on the right and out on the left rather than being cut off.
 */
export const LogoMarquee: React.FC = () => (
  <Box
    w="full"
    overflow="hidden"
    css={{
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
    // The blend sits here rather than on the images: the track's transform
    // would isolate them, and they'd blend against nothing and show their
    // black. The logos are white; at this opacity plus-lighter lands them on
    // roughly soot.500, the same grey as the label.
    mixBlendMode="plus-lighter"
    opacity={0.32}
  >
    <Box
      display="flex"
      w="max-content"
      animation="marquee 40s linear infinite"
      _motionReduce={{ animation: "none" }}
    >
      {[0, 1].map((copy) => (
        <Image
          key={copy}
          src="/img/rebrand/logos-strip.png"
          alt={copy === 0 ? "Logos of institutions the team has worked at" : ""}
          aria-hidden={copy === 1 || undefined}
          h={{ base: "40px", lg: "74px" }}
          w="auto"
          maxW="none"
          flexShrink={0}
        />
      ))}
    </Box>
  </Box>
);
