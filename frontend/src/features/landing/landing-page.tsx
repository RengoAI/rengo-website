import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { PulseGrid } from "@/components/pulse-grid";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const FIRM_TYPES = [
  "Private Equity",
  "Venture Capital",
  "Private Credit",
  "Growth Equity",
  "Family Offices",
  "Fund of Funds",
];

const marqueeScroll = "marquee-scroll";

const LandingHeroBackground: React.FC = () => (
  <>
    <PulseGrid
      id="a2-hero"
      tone="navy"
      density="quiet"
      width={1280}
      height={900}
      cols={22}
      rows={26}
      showHeaderRow={false}
      tintColor="var(--rengo-colors-primary-650)"
      greenColor="var(--rengo-colors-brand-highlight)"
      fadeBottom={false}
    />
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      style={{
        background:
          "linear-gradient(to right, color-mix(in srgb, var(--rengo-colors-primary-900) 92%, transparent) 0%, color-mix(in srgb, var(--rengo-colors-primary-800) 78%, transparent) 38%, color-mix(in srgb, var(--rengo-colors-primary-800) 40%, transparent) 65%, color-mix(in srgb, var(--rengo-colors-primary-800) 15%, transparent) 100%)",
      }}
    />
    <Box
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      h="200px"
      pointerEvents="none"
      style={{
        background:
          "linear-gradient(to bottom, transparent, var(--rengo-colors-primary-800) 100%)",
      }}
    />
  </>
);

const FirmsStrip: React.FC = () => (
  <Box as="section" borderBottom="1px solid" borderColor="border.muted" py={8}>
    <style>{`@keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    <PageContainer>
      <Text
        fontFamily={EDICT}
        fontSize="xs"
        color="gray.500"
        letterSpacing="0.08em"
        textTransform="uppercase"
        mb={8}
      >
        Built with leading firms across
      </Text>
    </PageContainer>
    <Box
      w="full"
      overflow="hidden"
      css={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <Box
        display="flex"
        css={{
          gap: "64px",
          animation: `${marqueeScroll} 40s linear infinite`,
          width: "max-content",
          whiteSpace: "nowrap",
        }}
      >
        {Array(4)
          .fill(FIRM_TYPES)
          .flat()
          .map((label, i) => (
            <Text
              key={i}
              as="span"
              fontSize="1rem"
              color="primary.700"
              opacity={0.3}
              fontWeight={400}
              letterSpacing="-0.01em"
            >
              {label}
            </Text>
          ))}
      </Box>
    </Box>
  </Box>
);

export const LandingPage: React.FC = () => (
  <Box fontFamily="body">
    <PageHero
      align="left"
      eyebrow="Built for private markets"
      headline="Portfolio Intelligence"
      subtext="Purpose built AI trusted by leading asset managers to organize portfolio data into a single, searchable source of truth for firm operations."
      subtextMaxW="580px"
      ctaLabel="See a demo"
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      background={<LandingHeroBackground />}
    />
    <FirmsStrip />
  </Box>
);
