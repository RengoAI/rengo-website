import { Box } from "@chakra-ui/react";
import React from "react";

interface TeamLogo {
  name: string;
  logo: string;
  /** Rendered width in px; tuned per-logo so optical weight stays even. */
  width: number;
}

/** Broader-team pedigree, matching the "We know the work" deck slide. */
const TEAM_LOGOS: readonly TeamLogo[] = [
  { name: "Microsoft", logo: "/logos/microsoft.png", width: 124 },
  { name: "Marshall Wace", logo: "/logos/marshall-wace.png", width: 148 },
  { name: "Goldman Sachs", logo: "/logos/goldman_sachs.png", width: 116 },
  { name: "Maybern", logo: "/logos/maybern.png", width: 132 },
  { name: "Blend", logo: "/logos/blend.png", width: 92 },
] as const;

export const TeamLogoGrid: React.FC = () => (
  <Box
    display="grid"
    gridTemplateColumns={{
      base: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
    }}
    gap={{ base: 8, md: 10 }}
  >
    {TEAM_LOGOS.map((logo) => (
      <Box
        key={logo.name}
        minH="132px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={6}
      >
        <img
          src={logo.logo}
          alt={logo.name}
          loading="lazy"
          decoding="async"
          style={{
            width: `${logo.width}px`,
            height: "auto",
            maxWidth: "100%",
            // Grayscale keeps the rail neutral against the marketing palette,
            // matching the deck's treatment of the same logos.
            filter: "grayscale(1)",
            opacity: 0.72,
            display: "block",
          }}
        />
      </Box>
    ))}
  </Box>
);
