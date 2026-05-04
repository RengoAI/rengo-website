import { Box } from "@chakra-ui/react";
import React from "react";

interface TeamLogo {
  name: string;
  logo: string;
  framed?: boolean;
  width?: number;
  frameWidth?: number;
  frameHeight?: number;
  imageWidth?: number;
  objectPosition?: string;
}

const TEAM_LOGOS: readonly TeamLogo[] = [
  { name: "Microsoft", logo: "/logos/microsoft.png", framed: true },
  { name: "Blend", logo: "/logos/blend.png", width: 92 },
  { name: "Marshall Wace", logo: "/logos/marshall-wace.png", width: 158 },
  {
    name: "Maybern",
    logo: "/logos/maybern.png",
    framed: true,
    frameWidth: 150,
    frameHeight: 42,
    imageWidth: 220,
    objectPosition: "top left",
  },
] as const;

export const TeamLogoGrid: React.FC = () => (
  <Box
    display="grid"
    gridTemplateColumns={{
      base: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)",
    }}
    borderTop="1px solid"
    borderLeft="1px solid"
    borderColor="border.muted"
  >
    {TEAM_LOGOS.map((logo) => (
      <Box
        key={logo.name}
        minH="132px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRight="1px solid"
        borderBottom="1px solid"
        borderColor="border.muted"
        px={6}
      >
        {logo.framed ? (
          <Box
            w={`${logo.frameWidth ?? 170}px`}
            h={`${logo.frameHeight ?? 58}px`}
            overflow="hidden"
            position="relative"
            opacity={0.66}
          >
            <img
              src={logo.logo}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              style={{
                width: `${logo.imageWidth ?? 170}px`,
                height: `${logo.imageWidth ?? 170}px`,
                objectFit: "cover",
                objectPosition: logo.objectPosition ?? "top center",
                display: "block",
              }}
            />
          </Box>
        ) : (
          <img
            src={logo.logo}
            alt={logo.name}
            loading="lazy"
            decoding="async"
            width={logo.width}
            style={{
              width: logo.width ? `${logo.width}px` : "auto",
              height: "auto",
              opacity: 0.8,
              display: "block",
            }}
          />
        )}
      </Box>
    ))}
  </Box>
);
